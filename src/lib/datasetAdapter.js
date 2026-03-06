import { standardizeRow, datasetMappingConfig } from './datasetMapping';

/**
 * Aggregates highly granular ball-by-ball play-by-play data (from cricsheet or similar)
 * into a per-player per-match summary row.
 * 
 * Specifically looks for columns like: match_id, innings, ball, striker, bowler, runs_off_bat, extras, wicket_type
 */
export function aggregateBallByBall(rawData) {
    if (!rawData || rawData.length === 0) return [];

    const matchId = rawData[0].match_id || rawData[0].matchId || 'UnknownMatch';
    const date = rawData[0].start_date || rawData[0].date || new Date().toISOString().split('T')[0];
    const format = "T20"; // Forcing T20 default for this MVP unless we see a format column

    // player_name -> stats config
    const playerStatsMap = new Map();

    const getOrCreatePlayer = (name, team) => {
        if (!playerStatsMap.has(name)) {
            playerStatsMap.set(name, {
                [datasetMappingConfig.playerName]: name,
                [datasetMappingConfig.playerId]: name.toLowerCase().replace(/\s+/g, '-'),
                [datasetMappingConfig.matchId]: matchId,
                [datasetMappingConfig.date]: date,
                [datasetMappingConfig.format]: format,
                [datasetMappingConfig.team]: team || 'Unknown',
                [datasetMappingConfig.opposition]: 'Unknown', // We'll try to infer this later
                [datasetMappingConfig.runs]: 0,
                [datasetMappingConfig.balls]: 0,
                [datasetMappingConfig.wickets]: 0,
                [datasetMappingConfig.runsConceded]: 0,
                fours: 0,
                sixes: 0,
                validBowledBalls: 0, // Internal counter to calculate overs
                [datasetMappingConfig.phase]: 'Middle', // Defaulting phase for simplicity in MVP
            });
        }
        return playerStatsMap.get(name);
    };

    // First pass, collect team names to figure out opposition
    const teams = new Set();
    rawData.forEach(row => {
        if (row.batting_team) teams.add(row.batting_team);
        if (row.bowling_team) teams.add(row.bowling_team);
    });
    const teamArray = Array.from(teams);

    rawData.forEach(row => {
        // Safe parsing for numericals
        const runsOffBat = parseInt(row.runs_off_bat) || 0;
        const wides = parseInt(row.wides) || 0;
        const noballs = parseInt(row.noballs) || 0;
        const extras = parseInt(row.extras) || 0;

        // Sometimes total runs conceded is just runs off bat + wide/nb
        // Let's rely on standard extras logic: bowler pays for runs off bat + wides + noballs
        const runsConcededThisBall = runsOffBat + wides + noballs;
        const isLegalDelivery = wides === 0 && noballs === 0;

        const battingTeam = row.batting_team || '';
        const bowlingTeam = row.bowling_team || '';

        // Opponent mapping
        const oppBatting = bowlingTeam || (teamArray.find(t => t !== battingTeam) || 'Unknown');
        const oppBowling = battingTeam || (teamArray.find(t => t !== bowlingTeam) || 'Unknown');

        // BATTING STATS (Striker)
        if (row.striker) {
            const batter = getOrCreatePlayer(row.striker, battingTeam);
            batter[datasetMappingConfig.opposition] = oppBatting;
            batter[datasetMappingConfig.runs] += runsOffBat;

            if (runsOffBat === 4) batter.fours += 1;
            if (runsOffBat === 6) batter.sixes += 1;

            if (wides === 0) {
                // Wides don't count as a ball faced
                batter[datasetMappingConfig.balls] += 1;
            }
        }

        // BOWLING STATS (Bowler)
        if (row.bowler) {
            const bowler = getOrCreatePlayer(row.bowler, bowlingTeam);
            bowler[datasetMappingConfig.opposition] = oppBowling;
            bowler[datasetMappingConfig.runsConceded] += runsConcededThisBall;
            if (isLegalDelivery) {
                bowler.validBowledBalls += 1;
            }

            // Wickets
            if (row.player_dismissed && row.player_dismissed !== '') {
                // Exclude run outs for bowler's wicket credit
                const wicketType = String(row.wicket_type).toLowerCase();
                if (!wicketType.includes('run out') && !wicketType.includes('retired')) {
                    bowler[datasetMappingConfig.wickets] += 1;
                }
            }
        }
    });

    // Finalize calculated fields like overs and strike rate
    const finalPlayersArray = Array.from(playerStatsMap.values()).map(p => {
        // Calculate overs (e.g. 20 balls = 3.2 overs)
        const completeOvers = Math.floor(p.validBowledBalls / 6);
        const partialOvers = p.validBowledBalls % 6;
        p[datasetMappingConfig.overs] = parseFloat(`${completeOvers}.${partialOvers}`);

        // Strike rate
        if (p[datasetMappingConfig.balls] > 0) {
            p[datasetMappingConfig.battingStrikeRate] = parseFloat(((p[datasetMappingConfig.runs] / p[datasetMappingConfig.balls]) * 100).toFixed(2));
        }

        // Economy
        if (p[datasetMappingConfig.overs] > 0) {
            // Recalculate decimal overs out of 1 for accurate economy (e.g., 3.2 overs = 3.333 overs)
            const exactOvers = completeOvers + (partialOvers / 6);
            p[datasetMappingConfig.economy] = parseFloat((p[datasetMappingConfig.runsConceded] / exactOvers).toFixed(2));
        }

        // We clean up internal fields mostly, though standardizer handles it anyway
        delete p.validBowledBalls;

        return p;
    });

    return finalPlayersArray;
}
