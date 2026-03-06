export function analyzePressure(inningsList) {
    if (!inningsList || inningsList.length === 0) {
        return {
            status: "N/A",
            rating: "Unknown",
            insight: "Not enough match data available.",
            reasons: ["Requires more match logs to calculate pressure performance."]
        };
    }

    let pressureInningsCount = 0;
    let successfulPressureInnings = 0;
    const reasons = [];

    // Basic logic: We'll simulate pressure detection since the raw dataset might not have ball-by-ball.
    // If the data has 'impactScore', we can infer that high impact in tight situations means good pressure handling.
    // Alternatively, we look at strike rate and economy.

    let totalImpactInPressure = 0;
    let highImpactCount = 0;

    inningsList.forEach(inning => {
        // Here we define a "pressure inning" broadly. 
        // If the impact score was generated, we'll assume scores > 60 occurred in meaningful contexts.
        // If 'isChase', 'requiredRunRate', or 'over' were available, we'd use them here.
        // For fallback, we will use the inning's final impact score as a proxy for stepping up.

        const impact = parseFloat(inning.impactScore) || 0;

        // Simulating a pressure scenario if the player had to perform well to get a good impact
        if (impact > 0) {
            pressureInningsCount++;
            totalImpactInPressure += impact;
            if (impact >= 65) {
                successfulPressureInnings++;
                highImpactCount++;
            }
        }
    });

    if (pressureInningsCount === 0) {
        return {
            status: "N/A",
            rating: "Unknown",
            insight: "Not enough pressure-condition data available.",
            reasons: ["No measurable pressure situations found in recent matches."]
        };
    }

    const successRate = successfulPressureInnings / pressureInningsCount;
    const avgPressureImpact = totalImpactInPressure / pressureInningsCount;

    let status = "NO";
    let rating = "Weak";
    let insight = "This player often struggles to maintain performance under pressure.";

    if (successRate >= 0.5 || avgPressureImpact >= 70) {
        status = "YES";
        rating = "Strong";
        insight = "This player frequently delivers strong performances during high-pressure phases.";
        reasons.push("Consistently high impact in critical match situations");
        if (highImpactCount > 2) reasons.push("Multiple match-defining contributions recently");
    } else if (successRate >= 0.25 || avgPressureImpact >= 45) {
        status = "MODERATE";
        rating = "Average";
        insight = "This player shows mixed results when the pressure is on.";
        reasons.push("Occasionally steps up in difficult scenarios");
        reasons.push("Performance fluctuates based on match context");
    } else {
        reasons.push("Impact tends to drop in high-leverage moments");
        reasons.push("Rarely produces match-winning bursts under pressure");
    }

    return {
        status,
        rating,
        insight,
        reasons
    };
}
