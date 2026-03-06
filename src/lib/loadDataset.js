import Papa from 'papaparse';
import { standardizeRow } from './datasetMapping';
import { demoDataset } from './demoDataset';
import { aggregateBallByBall } from './datasetAdapter';

/**
 * Loads and processes the dataset.
 * Tries JSON first, then CSV, then falls back to built-in demo data.
 */
export async function loadDataset() {
    let combinedPlayersMap = new Map();
    let combinedFormats = new Set();

    const mergeData = (dataObj) => {
        if (!dataObj || !dataObj.players || !dataObj.formats) return;
        dataObj.formats.forEach(f => combinedFormats.add(f));
        dataObj.players.forEach(p => {
            if (!combinedPlayersMap.has(p.playerName)) {
                combinedPlayersMap.set(p.playerName, { ...p, innings: [...p.innings] });
            } else {
                combinedPlayersMap.get(p.playerName).innings.push(...p.innings);
            }
        });
    };

    try {
        // 1. Always load demo data to guarantee a rich history base
        console.log("Loading base demo dataset...");
        mergeData(processDataset(demoDataset, 'demo'));

        // 2. Try loading custom dataset
        try {
            let response = await fetch('/dataset/data.json');
            if (response.ok) {
                const jsonObj = await response.json();
                console.log("Successfully loaded local JSON dataset.");
                mergeData(processDataset(jsonObj.players || jsonObj, 'json'));
            } else {
                response = await fetch('/dataset/data.csv');
                if (response.ok) {
                    const csvText = await response.text();
                    await new Promise((resolve) => {
                        Papa.parse(csvText, {
                            header: true,
                            skipEmptyLines: true,
                            complete: (results) => {
                                console.log("Successfully loaded local CSV dataset.");
                                mergeData(processDataset(results.data, 'csv'));
                                resolve();
                            }
                        });
                    });
                }
            }
        } catch (e) {
            console.warn("Could not load custom dataset", e);
        }

        // Finalize merging
        const finalPlayers = Array.from(combinedPlayersMap.values()).map(player => {
            player.innings.sort((a, b) => new Date(b.date) - new Date(a.date));
            return player;
        });

        finalPlayers.sort((a, b) => a.playerName.localeCompare(b.playerName));

        return {
            players: finalPlayers,
            formats: Array.from(combinedFormats).sort()
        };

    } catch (error) {
        console.error("Fatal error loading dataset:", error);
        return { players: [], formats: [] };
    }
}

/**
 * Groups raw rows by player and formats them into our internal structure.
 */
function processDataset(rawData, sourceType) {
    if (!Array.isArray(rawData) || rawData.length === 0) {
        return { players: [], formats: [] };
    }

    // Check for ball-by-ball data format
    let dataToProcess = rawData;
    if (rawData[0] && rawData[0].ball !== undefined && rawData[0].striker !== undefined) {
        console.log("Detected ball-by-ball dataset, aggregating...");
        dataToProcess = aggregateBallByBall(rawData);
    }

    const playersMap = new Map();
    const formatSet = new Set();

    dataToProcess.forEach(rawRow => {
        // Standardize the row using our config (unless it's already the demo dataset which might be pre-formatted)
        const row = sourceType === 'demo' && rawRow.playerName ? rawRow : standardizeRow(rawRow);

        if (!row.playerName || row.playerName === "Unknown Player") return; // Skip invalid rows

        formatSet.add(row.format);

        if (!playersMap.has(row.playerName)) {
            playersMap.set(row.playerName, {
                playerId: row.playerId || row.playerName.toLowerCase().replace(/\s+/g, '-'),
                playerName: row.playerName,
                innings: []
            });
        }

        // Add match to player's innings
        playersMap.get(row.playerName).innings.push({
            matchId: row.matchId,
            date: row.date,
            format: row.format,
            runs: row.runs,
            balls: row.balls,
            battingStrikeRate: row.battingStrikeRate,
            wickets: row.wickets,
            overs: row.overs,
            runsConceded: row.runsConceded,
            economy: row.economy,
            phase: row.phase,
            requiredRunRate: row.requiredRunRate,
            isChase: row.isChase,
            team: row.team,
            opposition: row.opposition,
            result: row.result
        });
    });

    // Convert map to array and sort innings by date (newest first for our logic later)
    const players = Array.from(playersMap.values()).map(player => {
        player.innings.sort((a, b) => new Date(b.date) - new Date(a.date));
        return player;
    });

    // Sort players alphabetically
    players.sort((a, b) => a.playerName.localeCompare(b.playerName));

    return {
        players,
        formats: Array.from(formatSet).filter(f => f && f !== "Unknown").sort()
    };
}
