export const datasetMappingConfig = {
    // Map standard fields to column names in your CSV or JSON keys
    // Change these values if your hackathon dataset uses different names

    // Player identification
    playerId: "player_id",
    playerName: "player_name",

    // Match context
    matchId: "match_id",
    date: "match_date",
    format: "format", // "T20", "ODI", "Test"

    // Batting stats
    runs: "runs_scored",
    balls: "balls_faced",
    battingStrikeRate: "strike_rate",

    // Bowling stats
    wickets: "wickets_taken",
    overs: "overs_bowled",
    runsConceded: "runs_conceded",
    economy: "economy_rate",

    // Match situation proxies (Optional but good for context/pressure)
    phase: "match_phase", // e.g., "Powerplay", "Middle", "Death"
    requiredRunRate: "required_run_rate",
    isChase: "is_chasing",

    // Team info (Optional)
    team: "team_name",
    opposition: "opposition_team",
    result: "match_result",
};

/**
 * Standardizes a raw dataset row into our internal model based on the mapping above.
 * This ensures the rest of the app doesn't break if column names change.
 */
export function standardizeRow(rawRow) {
    const getVal = (key) => {
        const rawKey = datasetMappingConfig[key];
        const val = rawRow[rawKey];
        // Convert numerical strings to numbers where appropriate
        if (val !== undefined && val !== null && val !== "") {
            const num = Number(val);
            if (!isNaN(num)) return num;
        }
        return val;
    };

    return {
        playerId: getVal("playerId") || `unknown-${Math.random()}`,
        playerName: getVal("playerName") || "Unknown Player",
        matchId: getVal("matchId") || `match-${Math.random()}`,
        date: getVal("date") || new Date().toISOString().split('T')[0],
        format: getVal("format") || "Unknown",

        // Core stats default to 0 if missing
        runs: getVal("runs") || 0,
        balls: getVal("balls") || 0,
        battingStrikeRate: getVal("battingStrikeRate") || 0,

        wickets: getVal("wickets") || 0,
        overs: getVal("overs") || 0,
        runsConceded: getVal("runsConceded") || 0,
        economy: getVal("economy") || 0,

        // Context
        phase: getVal("phase") || "Middle",
        requiredRunRate: getVal("requiredRunRate") || null,
        isChase: getVal("isChase") === true || String(getVal("isChase")).toLowerCase() === "true" || getVal("isChase") === 1,

        team: getVal("team") || "Unknown",
        opposition: getVal("opposition") || "Unknown",
        result: getVal("result") || "Unknown",
    };
}
