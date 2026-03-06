# Cricket Impact MVP

A beautiful, responsive React + Vite application that calculates and visualizes a "Player Impact Score" (0-100) based on cricket match datasets.

## Features
- **No Backend**: Runs entirely in the browser.
- **Auto Dataset Loading**: Drop your `data.csv` or `data.json` into `/public/dataset/` and it will automatically parse them.
- **Robust Adapter**: Maps custom dataset columns to internal models easily using `src/lib/datasetMapping.js`.
- **Impact Algorithm**: Rolling 10-innings weighted score based on Performance, Context (Phase/Economy), and Pressure (Chases/Death overs).
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

## Handling Datasets
By default, the app will look for a dataset in `public/dataset/data.json` or `public/dataset/data.csv`.
If neither is found, it will gracefully load a small, built-in demo dataset so the app won't crash during presentations!

### Changing Column Names
If the Hackathon organizers provide a CSV with different column names entirely (e.g., `Batter Runs` instead of `runs_scored`), open the file `src/lib/datasetMapping.js`. 
Update the right-side string values to perfectly match the headers in your CSV. No other code changes are needed!

## Deployment (Vercel/Netlify)
1. Push this repository to GitHub.
2. Link the repository to your Vercel or Netlify account.
3. The build command is `npm run build` and the output directory is `dist`.
4. It will deploy perfectly out-of-the-box.

Built for the Hackathon! 🏏
