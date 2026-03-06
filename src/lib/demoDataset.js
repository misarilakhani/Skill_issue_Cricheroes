// A fully-featured demo dataset using standard column names
// Used as fallback if no CSV/JSON is found in /public/dataset/

export const demoDataset = [
    // Virat Kohli - T20
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-11-15", runs_scored: 82, balls_faced: 53, strike_rate: 154.7, match_phase: "Death", is_chasing: true, required_run_rate: 9.5, opposition_team: "Pakistan" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-11-10", runs_scored: 50, balls_faced: 40, strike_rate: 125.0, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "England" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-11-05", runs_scored: 12, balls_faced: 10, strike_rate: 120.0, match_phase: "Powerplay", is_chasing: true, required_run_rate: 8.0, opposition_team: "South Africa" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-30", runs_scored: 101, balls_faced: 61, strike_rate: 165.5, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "Afghanistan" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-25", runs_scored: 33, balls_faced: 28, strike_rate: 117.8, match_phase: "Middle", is_chasing: true, required_run_rate: 7.5, opposition_team: "New Zealand" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-20", runs_scored: 75, balls_faced: 45, strike_rate: 166.6, match_phase: "Death", is_chasing: true, required_run_rate: 10.2, opposition_team: "Australia" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-15", runs_scored: 21, balls_faced: 20, strike_rate: 105.0, match_phase: "Powerplay", is_chasing: false, required_run_rate: null, opposition_team: "Sri Lanka" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-10", runs_scored: 8, balls_faced: 5, strike_rate: 160.0, match_phase: "Death", is_chasing: true, required_run_rate: 12.0, opposition_team: "Bangladesh" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-10-05", runs_scored: 62, balls_faced: 42, strike_rate: 147.6, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "Netherlands" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-09-30", runs_scored: 45, balls_faced: 35, strike_rate: 128.5, match_phase: "Middle", is_chasing: true, required_run_rate: 8.5, opposition_team: "Ireland" },
    { player_name: "Virat Kohli", format: "T20", match_date: "2023-09-25", runs_scored: 15, balls_faced: 14, strike_rate: 107.1, match_phase: "Powerplay", is_chasing: false, required_run_rate: null, opposition_team: "West Indies" },

    // Jasprit Bumrah - T20
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-11-15", wickets_taken: 3, overs_bowled: 4, runs_conceded: 20, economy_rate: 5.0, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "Pakistan" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-11-10", wickets_taken: 1, overs_bowled: 4, runs_conceded: 28, economy_rate: 7.0, match_phase: "Middle", is_chasing: true, required_run_rate: 9.0, opposition_team: "England" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-11-05", wickets_taken: 4, overs_bowled: 4, runs_conceded: 16, economy_rate: 4.0, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "South Africa" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-10-30", wickets_taken: 0, overs_bowled: 4, runs_conceded: 35, economy_rate: 8.75, match_phase: "Powerplay", is_chasing: true, required_run_rate: 7.5, opposition_team: "Afghanistan" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-10-25", wickets_taken: 2, overs_bowled: 4, runs_conceded: 22, economy_rate: 5.5, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "New Zealand" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-10-20", wickets_taken: 1, overs_bowled: 4, runs_conceded: 30, economy_rate: 7.5, match_phase: "Middle", is_chasing: true, required_run_rate: 8.2, opposition_team: "Australia" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-10-15", wickets_taken: 3, overs_bowled: 3, runs_conceded: 12, economy_rate: 4.0, match_phase: "Powerplay", is_chasing: false, required_run_rate: null, opposition_team: "Sri Lanka" },
    { player_name: "Jasprit Bumrah", format: "T20", match_date: "2023-10-10", wickets_taken: 2, overs_bowled: 4, runs_conceded: 24, economy_rate: 6.0, match_phase: "Death", is_chasing: true, required_run_rate: 10.0, opposition_team: "Bangladesh" },

    // MS Dhoni - T20
    { player_name: "MS Dhoni", format: "T20", match_date: "2023-11-20", runs_scored: 24, balls_faced: 10, strike_rate: 240.0, match_phase: "Death", is_chasing: true, required_run_rate: 14.5, opposition_team: "RCB" },
    { player_name: "MS Dhoni", format: "T20", match_date: "2023-11-16", runs_scored: 45, balls_faced: 25, strike_rate: 180.0, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "MI" },
    { player_name: "MS Dhoni", format: "T20", match_date: "2023-11-12", runs_scored: 12, balls_faced: 8, strike_rate: 150.0, match_phase: "Death", is_chasing: true, required_run_rate: 12.0, opposition_team: "KKR" },
    { player_name: "MS Dhoni", format: "T20", match_date: "2023-11-08", runs_scored: 60, balls_faced: 35, strike_rate: 171.4, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "RR" },
    { player_name: "MS Dhoni", format: "T20", match_date: "2023-11-04", runs_scored: 5, balls_faced: 6, strike_rate: 83.3, match_phase: "Powerplay", is_chasing: true, required_run_rate: 8.0, opposition_team: "SRH" },

    // Rohit Sharma - T20
    { player_name: "Rohit Sharma", format: "T20", match_date: "2023-11-20", runs_scored: 85, balls_faced: 45, strike_rate: 188.8, match_phase: "Powerplay", is_chasing: false, required_run_rate: null, opposition_team: "CSK" },
    { player_name: "Rohit Sharma", format: "T20", match_date: "2023-11-16", runs_scored: 15, balls_faced: 12, strike_rate: 125.0, match_phase: "Powerplay", is_chasing: true, required_run_rate: 9.0, opposition_team: "RCB" },
    { player_name: "Rohit Sharma", format: "T20", match_date: "2023-11-12", runs_scored: 68, balls_faced: 38, strike_rate: 178.9, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "DC" },
    { player_name: "Rohit Sharma", format: "T20", match_date: "2023-11-08", runs_scored: 105, balls_faced: 55, strike_rate: 190.9, match_phase: "Middle", is_chasing: true, required_run_rate: 10.5, opposition_team: "PBKS" },

    // Hardik Pandya - T20
    { player_name: "Hardik Pandya", format: "T20", match_date: "2023-11-20", runs_scored: 40, balls_faced: 20, strike_rate: 200.0, wickets_taken: 1, overs_bowled: 3, runs_conceded: 22, economy_rate: 7.33, match_phase: "Death", is_chasing: true, required_run_rate: 11.0, opposition_team: "DC" },
    { player_name: "Hardik Pandya", format: "T20", match_date: "2023-11-15", runs_scored: 10, balls_faced: 8, strike_rate: 125.0, wickets_taken: 2, overs_bowled: 4, runs_conceded: 30, economy_rate: 7.5, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "KKR" },
    { player_name: "Hardik Pandya", format: "T20", match_date: "2023-11-10", runs_scored: 65, balls_faced: 30, strike_rate: 216.6, wickets_taken: 0, overs_bowled: 2, runs_conceded: 18, economy_rate: 9.0, match_phase: "Death", is_chasing: true, required_run_rate: 13.5, opposition_team: "RR" },
    { player_name: "Hardik Pandya", format: "T20", match_date: "2023-11-05", runs_scored: 22, balls_faced: 15, strike_rate: 146.6, wickets_taken: 3, overs_bowled: 4, runs_conceded: 25, economy_rate: 6.25, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "CSK" },

    // Rookie Player - T20 (few innings to test low confidence)
    { player_name: "Rookie Player", format: "T20", match_date: "2023-11-15", runs_scored: 10, balls_faced: 8, strike_rate: 125.0, match_phase: "Middle", is_chasing: false, required_run_rate: null, opposition_team: "Pakistan" },
    { player_name: "Rookie Player", format: "T20", match_date: "2023-11-10", runs_scored: 5, balls_faced: 12, strike_rate: 41.6, match_phase: "Powerplay", is_chasing: true, required_run_rate: 8.0, opposition_team: "England" },
    { player_name: "Rookie Player", format: "T20", match_date: "2023-11-05", runs_scored: 25, balls_faced: 18, strike_rate: 138.8, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "South Africa" },

    // Tailender - T20 (High probability of Weak suitability for batting)
    { player_name: "Tailender Player", format: "T20", match_date: "2023-11-15", runs_scored: 2, balls_faced: 8, strike_rate: 25.0, match_phase: "Death", is_chasing: true, required_run_rate: 12.0, opposition_team: "Australia" },
    { player_name: "Tailender Player", format: "T20", match_date: "2023-11-10", runs_scored: 0, balls_faced: 5, strike_rate: 0.0, match_phase: "Death", is_chasing: false, required_run_rate: null, opposition_team: "South Africa" },
    { player_name: "Tailender Player", format: "T20", match_date: "2023-11-05", runs_scored: 5, balls_faced: 10, strike_rate: 50.0, match_phase: "Death", is_chasing: true, required_run_rate: 7.0, opposition_team: "Pakistan" },
];
