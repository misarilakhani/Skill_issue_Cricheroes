Here is where you place your hackathon dataset!

The application expects ONE of the following file names:
1) data.json
2) data.csv

If BOTH are present, it will prefer data.json.
If NEITHER are present, it will gracefully fall back to a built-in demo dataset.

If your dataset uses different column names than standard ones (e.g. 'runs_scored' instead of 'runs'), open `src/lib/datasetMapping.js` and modify the values there to match your dataset's column headers exactly.
