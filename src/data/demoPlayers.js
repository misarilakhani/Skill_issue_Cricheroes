// Fallback demo dataset for when Supabase is unavailable
// Each player now has 10 matches to meet the minimum requirement
export const demoPlayers = [
    { 
        playerId: "virat-kohli", 
        playerName: "Virat Kohli", 
        team: "RCB",
        innings: [
            { format: "T20", date: "2023-11-15", runs: 82, balls: 53, battingStrikeRate: 154.7, opposition: "Pakistan", phase: "Death", isChase: true, requiredRunRate: 9.5 },
            { format: "T20", date: "2023-11-10", runs: 50, balls: 40, battingStrikeRate: 125.0, opposition: "England", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-11-05", runs: 35, balls: 25, battingStrikeRate: 140.0, opposition: "South Africa", phase: "Powerplay", isChase: true, requiredRunRate: 8.2 },
            { format: "T20", date: "2023-10-28", runs: 62, balls: 44, battingStrikeRate: 140.9, opposition: "Netherlands", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-23", runs: 82, balls: 53, battingStrikeRate: 154.7, opposition: "Pakistan", phase: "Death", isChase: true, requiredRunRate: 10.5 },
            { format: "T20", date: "2023-10-15", runs: 12, balls: 11, battingStrikeRate: 109.1, opposition: "Australia", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-05", runs: 44, balls: 31, battingStrikeRate: 141.9, opposition: "New Zealand", phase: "Middle", isChase: true, requiredRunRate: 7.5 },
            { format: "T20", date: "2023-09-25", runs: 70, balls: 48, battingStrikeRate: 145.8, opposition: "Sri Lanka", phase: "Death", isChase: false },
            { format: "T20", date: "2023-09-15", runs: 18, balls: 15, battingStrikeRate: 120.0, opposition: "Bangladesh", phase: "Middle", isChase: true, requiredRunRate: 6.0 },
            { format: "T20", date: "2023-09-05", runs: 55, balls: 38, battingStrikeRate: 144.7, opposition: "Afghanistan", phase: "Powerplay", isChase: false }
        ]
    },
    { 
        playerId: "rohit-sharma", 
        playerName: "Rohit Sharma", 
        team: "MI",
        innings: [
            { format: "T20", date: "2023-11-20", runs: 85, balls: 45, battingStrikeRate: 188.8, opposition: "CSK", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-11-16", runs: 15, balls: 12, battingStrikeRate: 125.0, opposition: "RCB", phase: "Powerplay", isChase: true, requiredRunRate: 9.0 },
            { format: "T20", date: "2023-11-12", runs: 40, balls: 22, battingStrikeRate: 181.8, opposition: "GT", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-11-08", runs: 28, balls: 18, battingStrikeRate: 155.6, opposition: "LSG", phase: "Powerplay", isChase: true, requiredRunRate: 8.5 },
            { format: "T20", date: "2023-11-04", runs: 53, balls: 32, battingStrikeRate: 165.6, opposition: "PBKS", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-30", runs: 74, balls: 40, battingStrikeRate: 185.0, opposition: "SRH", phase: "Powerplay", isChase: true, requiredRunRate: 10.2 },
            { format: "T20", date: "2023-10-25", runs: 10, balls: 8, battingStrikeRate: 125.0, opposition: "DC", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-20", runs: 66, balls: 38, battingStrikeRate: 173.7, opposition: "RR", phase: "Powerplay", isChase: true, requiredRunRate: 9.8 },
            { format: "T20", date: "2023-10-15", runs: 33, balls: 20, battingStrikeRate: 165.0, opposition: "KKR", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-10", runs: 48, balls: 28, battingStrikeRate: 171.4, opposition: "RCB", phase: "Powerplay", isChase: true, requiredRunRate: 7.0 }
        ]
    },
    { 
        playerId: "hardik-pandya", 
        playerName: "Hardik Pandya", 
        team: "MI",
        innings: [
            { format: "T20", date: "2023-11-20", runs: 40, balls: 20, battingStrikeRate: 200.0, wickets: 1, overs: 3, economy: 7.33, opposition: "DC", phase: "Death", isChase: true, requiredRunRate: 11.0 },
            { format: "T20", date: "2023-11-15", runs: 25, balls: 15, battingStrikeRate: 166.7, wickets: 2, overs: 4, economy: 8.0, opposition: "CSK", phase: "Death", isChase: false },
            { format: "T20", date: "2023-11-10", runs: 12, balls: 8, battingStrikeRate: 150.0, wickets: 0, overs: 2, economy: 9.5, opposition: "RCB", phase: "Middle", isChase: true, requiredRunRate: 9.5 },
            { format: "T20", date: "2023-11-05", runs: 55, balls: 30, battingStrikeRate: 183.3, wickets: 1, overs: 3, economy: 6.5, opposition: "GT", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-30", runs: 5, balls: 4, battingStrikeRate: 125.0, wickets: 3, overs: 4, economy: 5.5, opposition: "LSG", phase: "Powerplay", isChase: true, requiredRunRate: 7.0 },
            { format: "T20", date: "2023-10-25", runs: 33, balls: 18, battingStrikeRate: 183.3, wickets: 1, overs: 2, economy: 10.0, opposition: "PBKS", phase: "Death", isChase: false },
            { format: "T20", date: "2023-10-20", runs: 28, balls: 14, battingStrikeRate: 200.0, wickets: 0, overs: 4, economy: 7.8, opposition: "SRH", phase: "Middle", isChase: true, requiredRunRate: 12.0 },
            { format: "T20", date: "2023-10-15", runs: 18, balls: 10, battingStrikeRate: 180.0, wickets: 2, overs: 3, economy: 7.0, opposition: "RR", phase: "Death", isChase: false },
            { format: "T20", date: "2023-10-10", runs: 42, balls: 25, battingStrikeRate: 168.0, wickets: 0, overs: 2, economy: 11.5, opposition: "KKR", phase: "Middle", isChase: true, requiredRunRate: 8.8 },
            { format: "T20", date: "2023-10-05", runs: 15, balls: 7, battingStrikeRate: 214.3, wickets: 1, overs: 4, economy: 6.2, opposition: "DC", phase: "Powerplay", isChase: false }
        ]
    },
    { 
        playerId: "kl-rahul", 
        playerName: "KL Rahul", 
        team: "LSG",
        innings: [
            { format: "T20", date: "2023-11-22", runs: 55, balls: 42, battingStrikeRate: 130.9, opposition: "GT", phase: "Middle", isChase: true, requiredRunRate: 8.5 },
            { format: "T20", date: "2023-11-18", runs: 72, balls: 50, battingStrikeRate: 144.0, opposition: "MI", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-11-14", runs: 10, balls: 12, battingStrikeRate: 83.3, opposition: "CSK", phase: "Powerplay", isChase: true, requiredRunRate: 7.5 },
            { format: "T20", date: "2023-11-10", runs: 45, balls: 35, battingStrikeRate: 128.6, opposition: "RCB", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-11-05", runs: 61, balls: 44, battingStrikeRate: 138.6, opposition: "SRH", phase: "Powerplay", isChase: true, requiredRunRate: 9.8 },
            { format: "T20", date: "2023-11-01", runs: 22, balls: 18, battingStrikeRate: 122.2, opposition: "GT", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-28", runs: 88, balls: 55, battingStrikeRate: 160.0, opposition: "DC", phase: "Powerplay", isChase: true, requiredRunRate: 10.5 },
            { format: "T20", date: "2023-10-24", runs: 30, balls: 25, battingStrikeRate: 120.0, opposition: "PBKS", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-20", runs: 15, balls: 18, battingStrikeRate: 83.3, opposition: "RR", phase: "Powerplay", isChase: true, requiredRunRate: 6.5 },
            { format: "T20", date: "2023-10-15", runs: 52, balls: 38, battingStrikeRate: 136.8, opposition: "KKR", phase: "Middle", isChase: false }
        ]
    },
    { 
        playerId: "jasprit-bumrah", 
        playerName: "Jasprit Bumrah", 
        team: "MI",
        innings: [
            { format: "T20", date: "2023-11-20", runs: 0, balls: 0, wickets: 3, overs: 4, economy: 5.25, opposition: "DC", phase: "Death", isChase: false },
            { format: "T20", date: "2023-11-15", runs: 0, balls: 0, wickets: 2, overs: 4, economy: 6.0, opposition: "CSK", phase: "Powerplay", isChase: true },
            { format: "T20", date: "2023-11-10", runs: 0, balls: 0, wickets: 1, overs: 4, economy: 7.5, opposition: "RCB", phase: "Death", isChase: false },
            { format: "T20", date: "2023-11-05", runs: 0, balls: 0, wickets: 4, overs: 4, economy: 4.5, opposition: "GT", phase: "Powerplay", isChase: true },
            { format: "T20", date: "2023-10-30", runs: 0, balls: 0, wickets: 0, overs: 4, economy: 8.8, opposition: "LSG", phase: "Death", isChase: false },
            { format: "T20", date: "2023-10-25", runs: 0, balls: 0, wickets: 2, overs: 4, economy: 5.5, opposition: "PBKS", phase: "Middle", isChase: true },
            { format: "T20", date: "2023-10-20", runs: 0, balls: 0, wickets: 3, overs: 4, economy: 6.2, opposition: "SRH", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-15", runs: 0, balls: 0, wickets: 1, overs: 4, economy: 7.0, opposition: "RR", phase: "Death", isChase: true },
            { format: "T20", date: "2023-10-10", runs: 0, balls: 0, wickets: 2, overs: 4, economy: 5.8, opposition: "KKR", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-05", runs: 0, balls: 0, wickets: 0, overs: 4, economy: 9.5, opposition: "DC", phase: "Death", isChase: true }
        ]
    },
    { 
        playerId: "ravindra-jadeja", 
        playerName: "Ravindra Jadeja", 
        team: "CSK",
        innings: [
            { format: "T20", date: "2023-11-20", runs: 25, balls: 12, wickets: 2, overs: 4, economy: 6.5, opposition: "MI", phase: "Middle", isChase: true, requiredRunRate: 9.5 },
            { format: "T20", date: "2023-11-15", runs: 12, balls: 10, wickets: 1, overs: 4, economy: 7.2, opposition: "RCB", phase: "Death", isChase: false },
            { format: "T20", date: "2023-11-10", runs: 45, balls: 25, wickets: 0, overs: 3, economy: 8.5, opposition: "GT", phase: "Middle", isChase: true, requiredRunRate: 11.0 },
            { format: "T20", date: "2023-11-05", runs: 18, balls: 12, wickets: 3, overs: 4, economy: 5.75, opposition: "LSG", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-30", runs: 10, balls: 8, wickets: 1, overs: 4, economy: 6.8, opposition: "PBKS", phase: "Powerplay", isChase: true, requiredRunRate: 8.2 },
            { format: "T20", date: "2023-10-25", runs: 30, balls: 15, wickets: 2, overs: 4, economy: 7.5, opposition: "SRH", phase: "Death", isChase: false },
            { format: "T20", date: "2023-10-20", runs: 22, balls: 14, wickets: 0, overs: 4, economy: 9.0, opposition: "RR", phase: "Middle", isChase: true, requiredRunRate: 10.5 },
            { format: "T20", date: "2023-10-15", runs: 15, balls: 10, wickets: 2, overs: 3, economy: 6.0, opposition: "KKR", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-10", runs: 8, balls: 5, wickets: 1, overs: 4, economy: 8.2, opposition: "DC", phase: "Death", isChase: true, requiredRunRate: 14.0 },
            { format: "T20", date: "2023-10-05", runs: 40, balls: 20, wickets: 0, overs: 4, economy: 7.8, opposition: "GT", phase: "Middle", isChase: false }
        ]
    },
    { 
        playerId: "shubman-gill", 
        playerName: "Shubman Gill", 
        team: "GT",
        innings: [
            { format: "T20", date: "2023-11-20", runs: 92, balls: 58, battingStrikeRate: 158.6, opposition: "CSK", phase: "Powerplay", isChase: true, requiredRunRate: 8.8 },
            { format: "T20", date: "2023-11-15", runs: 45, balls: 30, battingStrikeRate: 150.0, opposition: "MI", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-11-10", runs: 104, balls: 60, battingStrikeRate: 173.3, opposition: "RCB", phase: "Powerplay", isChase: true, requiredRunRate: 10.2 },
            { format: "T20", date: "2023-11-05", runs: 33, balls: 25, battingStrikeRate: 132.0, opposition: "LSG", phase: "Middle", isChase: false },
            { format: "T20", date: "2023-10-30", runs: 67, balls: 42, battingStrikeRate: 159.5, opposition: "PBKS", phase: "Powerplay", isChase: true, requiredRunRate: 9.5 },
            { format: "T20", date: "2023-10-25", runs: 12, balls: 10, battingStrikeRate: 120.0, opposition: "SRH", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-20", runs: 58, balls: 38, battingStrikeRate: 152.6, opposition: "RR", phase: "Powerplay", isChase: true, requiredRunRate: 7.8 },
            { format: "T20", date: "2023-10-15", runs: 80, balls: 52, battingStrikeRate: 153.8, opposition: "KKR", phase: "Powerplay", isChase: false },
            { format: "T20", date: "2023-10-10", runs: 25, balls: 20, battingStrikeRate: 125.0, opposition: "DC", phase: "Middle", isChase: true, requiredRunRate: 11.2 },
            { format: "T20", date: "2023-10-05", runs: 44, balls: 32, battingStrikeRate: 137.5, opposition: "CSK", phase: "Powerplay", isChase: false }
        ]
    }
];
