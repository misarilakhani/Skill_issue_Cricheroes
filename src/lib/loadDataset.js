import supabase from '../services/supabaseClient';
import { demoPlayers } from '../data/demoPlayers';

/**
 * Loads metadata (players and formats) for the initial selection.
 * Fetches from Supabase 'ipl_match_data' table.
 */
export async function loadDataset() {
    try {
        console.log("Fetching player metadata from Supabase...");
        
        if (!supabase) {
            throw new Error("Supabase client not initialized. Check .env variables.");
        }

        // Fetch unique player names and formats
        const { data, error } = await supabase
            .from('ipl_match_data')
            .select('player_name, format');

        if (error || !data || data.length === 0) {
            throw new Error(error?.message || "No data returned from Supabase");
        }

        const playersMap = new Map();
        const formatsSet = new Set();

        data.forEach(row => {
            if (row.format) formatsSet.add(row.format);
            if (!playersMap.has(row.player_name)) {
                playersMap.set(row.player_name, {
                    playerId: row.player_name.toLowerCase().replace(/\s+/g, '-'),
                    playerName: row.player_name,
                    innings: [] // Detailed innings will be fetched on demand
                });
            }
        });

        return {
            players: Array.from(playersMap.values()).sort((a, b) => a.playerName.localeCompare(b.playerName)),
            formats: Array.from(formatsSet).sort()
        };

    } catch (error) {
        console.warn("Supabase fetch failed, falling back to demoPlayers:", error.message);
        
        // Fallback to local demoPlayers
        const formatsSet = new Set();
        demoPlayers.forEach(p => {
            p.innings.forEach(i => formatsSet.add(i.format));
        });

        return {
            players: demoPlayers,
            formats: Array.from(formatsSet).sort()
        };
    }
}
