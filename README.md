# Commodity Derivatives Intelligence — Hackathon MVP

## Run it
Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

Check production build:
```bash
npm run build
npm run preview
```

## Project structure
```text
commodity-derivatives-intelligence/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── data/sampleData.js
    └── utils/csv.js
```

## Data safety
Built-in values are synthetic demo data, NOT actual MCX prices. Lot sizes and quote units in `src/data/sampleData.js` are unverified placeholders. Do not use this prototype for live trading or investment decisions. Normalized prices, spreads, signals and backtests are deliberately not calculated until official contract specs, quote conventions, reliable data and execution assumptions are verified.

## CSV import
The Data Lab accepts a cleaned CSV with required columns `Date,Symbol,Close` and optional `Volume,OpenInterest,Expiry`. Use ISO dates (`YYYY-MM-DD`) where possible. This simple importer does not parse every raw MCX bhavcopy layout automatically; clean and verify the source columns first.
