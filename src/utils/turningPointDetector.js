/**
 * Detects the moment where the player's performance significantly influenced match momentum.
 */
export function detectTurningPoint(res) {
    if (!res || !res.recentInnings || res.recentInnings.length === 0) return null;

    // Find the inning with the highest impact score
    // In our logic, impactScore is already calculated for each inning
    const sortedInnings = [...res.recentInnings].sort((a, b) => b.impactScore - a.impactScore);
    const turningPointInning = sortedInnings[0];

    // If the impact score is too low, we might not consider it a "turning point"
    if (turningPointInning.impactScore < 60) {
        return null;
    }

    return {
        over: turningPointInning.over || turningPointInning.phase === 'Death' ? '18-20' : 'N/A',
        runs: turningPointInning.runs || 0,
        requiredRunRate: turningPointInning.requiredRunRate || 'N/A',
        insight: turningPointInning.impactScore > 85 
            ? "This moment was a massive game-changer, swinging the momentum entirely in the team's favor."
            : "This moment significantly increased the player's match impact and put the opposition under pressure."
    };
}
