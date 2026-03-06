/**
 * Calculates a player's Impact Score (0-100) based on their last N innings.
 * Uses a rolling window with recency weighting.
 */

const MAX_INNINGS = 30;

// Weights for recency (idx 0 is newest)
// We provide an array, and fallback to 0.1 for older innings
const RECENCY_WEIGHTS = [1.0, 0.9, 0.8, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15];

export function calculateImpact(player) {
    if (!player || !player.innings || player.innings.length === 0) {
        return {
            status: 'no_data',
            score: 0,
            confidence: 'none',
            breakdown: { performance: 0, context: 0, pressure: 0 },
            recentInnings: [],
            drivers: ["No match data available for this player."]
        };
    }

    // Take up to the last MAX_INNINGS (assuming they are pre-sorted newest first)
    const recentInnings = player.innings.slice(0, MAX_INNINGS);
    const isLowConfidence = recentInnings.length < 5;

    let totalWeightedImpact = 0;
    let totalWeight = 0;

    let totalPerf = 0;
    let totalCtx = 0;
    let totalPress = 0;

    let topPerformances = [];

    let totalStrikeRate = 0;
    let inningsWithBalls = 0;
    let totalEconomy = 0;
    let inningsWithOvers = 0;
    let impacts = [];

    recentInnings.forEach((inning, idx) => {
        const weight = RECENCY_WEIGHTS[idx] || 0.1;

        // 1. Performance Score (0-100)
        const perfScore = calculatePerformance(inning);

        // 2. Context Score (0-100)
        const ctxScore = calculateContext(inning);

        // 3. Pressure Score (0-100)
        const pressureScore = calculatePressure(inning);

        // Combine for this inning (Weights: Perf 50%, Ctx 25%, Pressure 25%)
        const inningImpact = (perfScore * 0.5) + (ctxScore * 0.25) + (pressureScore * 0.25);

        // Add to rolling window
        totalWeightedImpact += (inningImpact * weight);
        totalWeight += weight;

        // For breakdown averages (unweighted for simplicity of display)
        totalPerf += perfScore;
        totalCtx += ctxScore;
        totalPress += pressureScore;

        // Save for insights
        topPerformances.push({
            date: inning.date,
            impact: inningImpact,
            runs: inning.runs,
            wickets: inning.wickets
        });

        if (inning.balls > 0) {
            totalStrikeRate += inning.battingStrikeRate || 0;
            inningsWithBalls++;
        }
        if (inning.overs > 0) {
            totalEconomy += inning.economy || 0;
            inningsWithOvers++;
        }
        impacts.push(inningImpact);
    });

    const finalScore = Math.round(totalWeightedImpact / totalWeight);
    const avgPerf = Math.round(totalPerf / recentInnings.length);
    const avgCtx = Math.round(totalCtx / recentInnings.length);
    const avgPress = Math.round(totalPress / recentInnings.length);

    // Normalize striking (100 SR = 20, 150 SR = 80, 200 SR = 100)
    let strikingScore = 0;
    if (inningsWithBalls > 0) {
        const avgStrikeRate = totalStrikeRate / inningsWithBalls;
        strikingScore = Math.min(100, Math.max(0, (avgStrikeRate - 60) * 1.25));
    }

    // Normalize economy (12 Econ = 0, 7 Econ = 60, 5 Econ = 100)
    let economyScore = 0;
    if (inningsWithOvers > 0) {
        const avgEconomyRate = totalEconomy / inningsWithOvers;
        economyScore = Math.min(100, Math.max(0, 100 - ((avgEconomyRate - 5) * 15)));
    }

    // Consistency (100 - standard deviation of impacts, scaled)
    const avgImpact = impacts.reduce((sum, val) => sum + val, 0) / (impacts.length || 1);
    const variance = impacts.reduce((sum, val) => sum + Math.pow(val - avgImpact, 2), 0) / (impacts.length || 1);
    const stdDev = Math.sqrt(variance);
    const consistencyScore = Math.min(100, Math.max(0, 100 - (stdDev * 1.5)));

    // Normalize final score to ensure it fits 0-100 cleanly
    const normalizedScore = Math.max(0, Math.min(100, finalScore));

    return {
        status: 'success',
        score: normalizedScore,
        confidence: isLowConfidence ? 'low' : 'high',
        breakdown: {
            performance: avgPerf,
            context: avgCtx,
            pressure: avgPress,
            consistency: Math.round(consistencyScore),
            striking: Math.round(strikingScore),
            economy: Math.round(economyScore)
        },
        recentInnings: recentInnings.map((inn, i) => ({
            ...inn,
            impactScore: Math.round((calculatePerformance(inn) * 0.5) + (calculateContext(inn) * 0.25) + (calculatePressure(inn) * 0.25))
        })).reverse(), // Reverse for charting (oldest to newest left-to-right)
        drivers: generateDrivers(normalizedScore, avgPerf, avgCtx, avgPress, recentInnings.length),
        isLowConfidence
    };
}

// Sub-metrics (Heuristics for MVP)

function calculatePerformance(inning) {
    let score = 50; // Baseline

    // Batting contribution
    if (inning.runs > 0) {
        score += (inning.runs * 0.5); // 50 runs = +25
        if (inning.battingStrikeRate > 150) score += 10;
        else if (inning.battingStrikeRate > 120) score += 5;
        else if (inning.battingStrikeRate < 100 && inning.balls > 10) score -= 10;
    }

    // Bowling contribution
    if (inning.wickets > 0) {
        score += (inning.wickets * 12); // 3 wkts = +36
    }
    if (inning.overs > 0) {
        if (inning.economy < 6.0) score += 15;
        else if (inning.economy < 8.0) score += 5;
        else if (inning.economy > 10.0) score -= 10;
    }

    return Math.max(0, Math.min(100, score));
}

function calculateContext(inning) {
    let score = 50;

    // Reward performing in harder phases
    if (inning.phase === "Death") score += 15;
    if (inning.phase === "Powerplay") score += 5;

    // Reward performing against good opposition (if we had rankings, but for MVP we just baseline)
    // Let's just use strike rate / economy as a proxy for "dominating the context"
    if (inning.runs > 30 && inning.battingStrikeRate > 160) score += 20;
    if (inning.wickets >= 2 && inning.economy <= 6) score += 20;

    return Math.max(0, Math.min(100, score));
}

function calculatePressure(inning) {
    let score = 50;

    if (inning.isChase) {
        score += 10; // Chasing is inherently higher pressure
        // If high required run rate during chase
        if (inning.requiredRunRate > 10) score += 20;
        else if (inning.requiredRunRate > 8) score += 10;
    }

    // Performing in a win (if result is available, say it was a close match)
    // For MVP, if they got wkts/runs in Death overs, it was high pressure
    if (inning.phase === "Death" && (inning.wickets > 0 || inning.runs > 20)) {
        score += 20;
    }

    return Math.max(0, Math.min(100, score));
}

function generateDrivers(total, perf, ctx, press, inningsCount) {
    const drivers = [];

    if (inningsCount < 5) {
        drivers.push(`High volatility: Score is based on only ${inningsCount} recent innings.`);
    }

    if (perf > 70) {
        drivers.push("Elite raw performance numbers (runs/wickets) in recent matches.");
    } else if (perf < 40) {
        drivers.push("Struggling with raw output (low impact runs or expensive overs) recently.");
    }

    if (press > 65) {
        drivers.push("Excels in high-pressure situations like run chases and death overs.");
    }

    if (ctx > 65) {
        drivers.push("Consistently accelerates scoring or controls run rate in crucial match phases.");
    }

    if (drivers.length === 0) {
        if (total >= 50) drivers.push("Delivering solid, average baseline performances consistently.");
        else drivers.push("Current form is slightly below the neutral baseline.");
    }

    return drivers.slice(0, 3); // Max 3 reasons
}
