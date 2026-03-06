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
    const score = (pressure * 0.4) + (context * 0.3) + (striking * 0.3);

    if (requiredRunRate > 12 || (oversRemaining < 5 && wicketsLost > 5)) {
        // High pressure scenario
        if (pressure > 80 && striking > 70) {
            suitability = 'Strong';
            insight = "This player thrives in extreme pressure. Their high clutch rating and ability to find boundaries make them ideal for this chase.";
        } else if (pressure < 50) {
            suitability = 'Low';
            insight = "This player's impact dips in high-pressure situations. They might struggle to maintain the required rate under these conditions.";
        } else {
            suitability = 'Moderate';
            insight = "A decent option, though they'll need support. Their pressure handling is reliable but not elite.";
        }
    } else if (target > 200) {
        // High scoring scenario
        if (striking > 80 || performance > 80) {
            suitability = 'Strong';
            insight = "An explosive performer. Their raw power and consistency in high-scoring games make them perfect for this target.";
        } else {
            suitability = 'Moderate';
            insight = "Best used as a stabilizer. They can contribute, but might not be the primary aggressor for a 200+ target.";
        }
    } else {
        // Standard scenario
        if (performance > 60) {
            suitability = 'Strong';
            insight = "A highly reliable performer across all scenarios. Their overall impact metrics suggest they'll handle this comfortably.";
        } else {
            suitability = 'Moderate';
            insight = "A solid utility player for this situation.";
        }
    }

    return { suitability, insight };
}
