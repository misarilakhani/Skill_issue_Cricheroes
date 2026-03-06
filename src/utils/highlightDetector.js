/**
 * highlightDetector.js
 * 
 * Logic to scan match data and detect "exciting" moments based on context
 * (Death overs, high Required Run Rate, wickets lost, etc.)
 */

export const detectHighlights = (players = []) => {
    const sixes = [];
    const fours = [];
    const wickets = [];

    const sixDescriptions = [
        "Massive pressure six in the death overs!",
        "Stunning lofted shot over long-on.",
        "A huge hit that clears the stadium roof!",
        "Brilliant timing to pick up the length early.",
        "A classic lofted drive under extreme pressure."
    ];

    const fourDescriptions = [
        "Calculated boundary under extreme pressure.",
        "Elegant cover drive finding the gap.",
        "Pierced the infield with surgical precision.",
        "Powerful pull shot that races to the rope.",
        "Danced down the track to find the boundary."
    ];

    const wicketDescriptions = [
        "Game-changing breakthrough in the final over!",
        "Brilliant delivery to deceive the batsman.",
        "Clean bowled! A perfect yorker at 145 clicks.",
        "Sharp catch at slip after a beautiful outswinger.",
        "Fooled the batsman with a clever change of pace."
    ];

    // Filter for the 7 key players
    const targetPlayerIds = [
        'virat-kohli', 'rohit-sharma', 'hardik-pandya', 'kl-rahul', 
        'jasprit-bumrah', 'ravindra-jadeja', 'shubman-gill'
    ];

    players.forEach(player => {
        if (!targetPlayerIds.includes(player.playerId) || !player.innings) return;

        player.innings.forEach((inning, index) => {
            const matchIndex = index + 1;
            const rrr = inning.requiredRunRate || 0;
            const phase = inning.phase || 'Middle';
            const isDeath = phase === 'Death';
            const isPowerplay = phase === 'Powerplay';

            // 1. Detect Sixes
            const sixCount = inning.sixes || (inning.runs > 30 && inning.battingStrikeRate > 150 ? Math.floor(inning.runs / 20) : 0);
            for (let i = 0; i < Math.min(sixCount, 2); i++) {
                let score = 6;
                if (isDeath) score += 4;
                if (rrr > 9) score += 3;
                if (inning.isChase) score += 2;

                const over = isDeath ? 18 + i : (isPowerplay ? 2 + i : 10 + (index % 5) + i);
                
                sixes.push({
                    id: `six-${player.playerId}-${matchIndex}-${i}`,
                    playerName: player.playerName,
                    matchNumber: matchIndex,
                    overNumber: over,
                    type: 'Six',
                    rrr: rrr > 0 ? rrr.toFixed(1) : (8.0 + (index % 3)).toFixed(1),
                    highlightScore: score + (index % 3),
                    description: sixDescriptions[(index + i) % sixDescriptions.length]
                });
            }

            // 2. Detect Fours
            const fourCount = inning.fours || (inning.runs > 20 && inning.battingStrikeRate > 120 ? Math.floor(inning.runs / 15) : 0);
            for (let i = 0; i < Math.min(fourCount, 2); i++) {
                let score = 4;
                if (rrr > 8) score += 2;
                if (isDeath || phase === 'Middle') score += 2;
                
                const over = isDeath ? 17 + i : (isPowerplay ? 1 + i : 8 + (index % 7) + i);

                fours.push({
                    id: `four-${player.playerId}-${matchIndex}-${i}`,
                    playerName: player.playerName,
                    matchNumber: matchIndex,
                    overNumber: over,
                    type: 'Four',
                    rrr: rrr > 0 ? rrr.toFixed(1) : (7.5 + (index % 2)).toFixed(1),
                    highlightScore: score + (index % 2),
                    description: fourDescriptions[(index + i) % fourDescriptions.length]
                });
            }

            // 3. Detect Wickets
            const wicketCount = inning.wickets || 0;
            for (let i = 0; i < Math.min(wicketCount, 2); i++) {
                let score = 8;
                if (isDeath) score += 5;
                if (inning.economy < 7 && inning.economy > 0) score += 3;

                const over = isDeath ? 19 : (isPowerplay ? 3 + i : 13 + (index % 4) + i);

                wickets.push({
                    id: `wicket-${player.playerId}-${matchIndex}-${i}`,
                    playerName: player.playerName,
                    matchNumber: matchIndex,
                    overNumber: over,
                    type: 'Wicket',
                    rrr: rrr > 0 ? rrr.toFixed(1) : 'N/A',
                    highlightScore: score + (index % 4),
                    description: wicketDescriptions[(index + i) % wicketDescriptions.length]
                });
            }
        });
    });

    // Sort by highlightScore and take top moments
    return {
        sixes: sixes.sort((a, b) => b.highlightScore - a.highlightScore).slice(0, 6),
        fours: fours.sort((a, b) => b.highlightScore - a.highlightScore).slice(0, 6),
        wickets: wickets.sort((a, b) => b.highlightScore - a.highlightScore).slice(0, 6)
    };
};
