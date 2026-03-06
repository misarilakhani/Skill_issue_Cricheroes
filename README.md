# Cricket Impact MVP

A beautiful, responsive React + Vite application that calculates and visualizes a "Player Impact Score" (0-100) based on cricket match datasets.

## Features
- **Supabase Integration**: Fetches real-time IPL match data from a remote database.
- **Dynamic Calculation**: Detailed player history is fetched on-demand during impact analysis.
- **Fallback Mode**: Includes a built-in `demoPlayers.js` fallback to ensure the app works even without a DB connection.
- **Impact Algorithm**: Rolling weighted score based on Performance, Context, and Pressure.
- **Premium UI**: Dark mode, glassmorphism, Recharts trendlines, and animated Impact Meter.

## Quick Start
You'll need Node.js installed on your machine.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Local Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production / Deployment**
   ```bash
   npm run build
   ```

## Setup & Environment Variables

To connect the application to your Supabase instance, create a `.env` file in the root directory with the following:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Data Structure

The application expects a Supabase table named `ipl_match_data` with columns representing match statistics (player_name, runs, balls, strike_rate, etc.).

## Deployment (Vercel/Netlify)
1. Push this repository to GitHub.
2. Link the repository to your Vercel or Netlify account.
3. The build command is `npm run build` and the output directory is `dist`.
4. It will deploy perfectly out-of-the-box.

