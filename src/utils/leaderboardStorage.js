/**
 * Handles persistence for the Impact Leaderboard.
 */
const LEADERBOARD_KEY = 'impact_leaderboard';

export function saveToLeaderboard(playerData) {
    try {
        const leaderboard = getLeaderboard();
        
        // Check if player already exists
        const existingIndex = leaderboard.findIndex(p => p.playerName === playerData.playerName);
        
        if (existingIndex !== -1) {
            // Update if the new score is higher
            if (playerData.impactScore > leaderboard[existingIndex].impactScore) {
                leaderboard[existingIndex] = {
                    ...playerData,
                    timestamp: new Date().toISOString()
                };
            }
        } else {
            // Add new entry
            leaderboard.push({
                ...playerData,
                timestamp: new Date().toISOString()
            });
        }

        // Sort by impact score descending
        leaderboard.sort((a, b) => b.impactScore - a.impactScore);

        // Limit to top 10 for leaderboard
        const top10 = leaderboard.slice(0, 10);

        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
    } catch (e) {
        console.error("Failed to save to leaderboard", e);
    }
}

export function getLeaderboard() {
    try {
        const data = localStorage.getItem(LEADERBOARD_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}
