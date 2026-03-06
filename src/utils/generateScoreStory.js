export function generateScoreStory(result) {
    if (!result || !result.breakdown) {
        return {
            title: "Story Behind the Score",
            points: ["Insufficient data to generate a story."],
            summary: "More match data is needed for a detailed analysis."
        };
    }

    const { performance, context, pressure } = result.breakdown;
    const points = [];

    // Performance analysis
    if (performance >= 75) {
        points.push("Exceptional core performance strongly boosted the impact rating.");
    } else if (performance >= 50) {
        points.push("Solid foundation of runs/wickets provided a good base score.");
    } else {
        points.push("Below-average core performance limited the overall impact.");
    }

    // Context analysis
    if (context >= 75) {
        points.push("Contributions were highly valuable in the context of the match scenarios.");
    } else if (context >= 50) {
        points.push("Match context added a moderate positive influence to the score.");
    } else {
        points.push("Contributions often came in less critical match phases.");
    }

    // Pressure analysis
    if (pressure >= 75) {
        points.push("Thrived in high-pressure situations, significantly raising the final impact.");
    } else if (pressure >= 50) {
        points.push("Maintained relatively stable performance during pressure moments.");
    } else {
        points.push("Struggled slightly when match pressure intensified.");
    }

    // Recent form / Consistency (using drivers as a secondary indicator if available)
    if (result.drivers && result.drivers.length > 0) {
        const topDriver = result.drivers[0].toLowerCase();
        if (topDriver.includes("consistent") || topDriver.includes("reliable")) {
            points.push("Recent innings consistency strongly supported the final rating.");
        } else if (topDriver.includes("explosive") || topDriver.includes("strike rate")) {
            points.push("High-impact bursts of scoring were a key factor.");
        } else if (topDriver.includes("wicket") || topDriver.includes("economy")) {
            points.push("Crucial breakthroughs and tight bowling shaped the impact.");
        }
    }

    // Generate summary
    let summary = "";
    const totalScore = result.score || 0;

    if (totalScore >= 80) {
        summary = "This player had an immense, match-defining influence on recent games.";
    } else if (totalScore >= 60) {
        summary = "This player provided strong, reliable contributions when needed.";
    } else if (totalScore >= 40) {
        summary = "This player had a moderate impact, showing flashes of quality.";
    } else {
        summary = "This player's recent contextual influence has been relatively subdued.";
    }

    return {
        title: "Story Behind the Score",
        points: points,
        summary: summary
    };
}
