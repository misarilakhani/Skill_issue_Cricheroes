/**
 * Evaluates whether a player is suitable for a specific match scenario.
 */
export function evaluateScenario(res, scenario) {
    if (!res || !res.breakdown) return null;

    const { target, oversRemaining, requiredRunRate, wicketsLost } = scenario;
    const { pressure, context, performance, striking } = res.breakdown;

    let suitability = 'Moderate';
    let insight = '';

    // Logic for suitability
    // Determine the scenario archetypes based on the user's input:
    const isHighTarget = target > 180;
    const isHighPressure = requiredRunRate >= 9.5 || (oversRemaining <= 5 && requiredRunRate > 8);
    const isCollapse = wicketsLost >= 4 && oversRemaining >= 10;
    
    if (isCollapse) {
        // Early wickets lost / Rebuilding phase
        const canAnchor = performance > 65 || (context > 70 && pressure > 65);
        
        if (canAnchor && context > 75 && pressure > 70) {
            suitability = 'Strong';
            insight = "An excellent crisis manager. Their high context and pressure scores show they can rebuild an innings after a collapse without panicking.";
        } else if (performance < 60 || context < 55) {
            suitability = 'Low';
            insight = "Highly vulnerable in a collapse. They lack the historical stability or performance to anchor an innings under this much pressure.";
        } else {
            suitability = 'Moderate';
            insight = "Can stabilize the innings for a short period, but might struggle to bat deep without support from the other end.";
        }
    } else if (isHighPressure) {
        // High pressure chase / slog
        const strikingNeeded = Math.min(95, (requiredRunRate * 8.5));
        
        if (pressure > 75 && striking > strikingNeeded) {
            suitability = 'Strong';
            insight = "A clutch performer. They thrive on the pressure of a steep run rate and can find boundaries when needed most.";
        } else if (striking < (strikingNeeded - 25) || pressure < 60) {
            suitability = 'Low';
            insight = "The required intensity is far beyond their historical strike rate and pressure limits. High risk of falling behind the rate.";
        } else {
            suitability = 'Moderate';
            insight = "Capable of holding their nerve, but you will likely need an explosive hitter at the other end to keep up with the rate.";
        }
    } else if (isHighTarget) {
        // High scoring scenario / flat deck
        if (striking > 80 || performance > 85) {
            suitability = 'Strong';
            insight = "Perfect for setting or chasing big totals. Their metrics align perfectly with the need for quick, massive runs.";
        } else if (striking < 60 || performance < 65) {
            suitability = 'Low';
            insight = "Insufficient aggression. Their natural game doesn't ideally suit a scenario demanding constant, relentless attack.";
        } else {
            suitability = 'Moderate';
            insight = "A safe accumulator. They will keep the scoreboard ticking and rotate strike, but may not provide explosive acceleration.";
        }
    } else {
        // Standard scenario
        if (performance > 70 && context > 65) {
            suitability = 'Strong';
            insight = "Highly reliable when the pressure is off. They can confidently dictate the terms of the game and anchor the team.";
        } else if (performance < 60) {
            suitability = 'Low';
            insight = "Even in favorable conditions, their overall performance metrics suggest they are a high-risk option right now.";
        } else {
            suitability = 'Moderate';
            insight = "A steady contributor. Expect them to play a supporting role without taking unnecessary risks.";
        }
    }

    return { suitability, insight };
}
