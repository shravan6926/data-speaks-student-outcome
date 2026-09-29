# Data Speaks: Student Dropout Prediction and Academic Success Analysis

A responsive, project-first showcase for the college Educational Data Mining project. It uses the real figures and the supplied Logistic Regression model.

## Project overview

The project analyzes 4,424 students and 37 dataset columns (36 input features + the `Target` variable) with three outcomes: Dropout, Enrolled and Graduate.

The showcase covers:

- Dataset overview
- Preprocessing and cleaning
- Exploratory Data Analysis
- Classification and model comparison
- Confusion matrix
- K-Means clustering (K = 4)
- PCA (11 selected features → 5 components, ~89.95% variance retained)
- Key findings
- Local student outcome prediction
- Conclusion

## Folder structure

```text
Data-Speaks-Website/
├── frontend/
│   ├── public/figures/       # Real project figures used by the page
│   ├── src/main.jsx
│   ├── src/styles.css
│   ├── index.html
│   └── package.json
├── backend/
│   ├── app.py                # FastAPI prediction API
│   └── requirements.txt
├── assets/
│   └── figures/              # Original copies of the supplied figures
├── models/
│   └── student_outcome_logistic_regression.pkl
├── data/
│   └── README.md             # Place data.csv here if desired
└── README.md
```

## Required software

- Python 3.10+ recommended
- Node.js 18+ and npm

## Run locally

### 1. Start the backend

From `Data-Speaks-Website/backend`:

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

The API runs at `http://127.0.0.1:8000`.

The supplied pickle was created with scikit-learn 1.6.1. The backend requirements intentionally pin that version so the saved pipeline can be loaded consistently.

### 2. Start the frontend

In a second terminal, from `Data-Speaks-Website/frontend`:

```bash
npm install
npm run dev
```

Open the local Vite address shown in the terminal (normally `http://localhost:5173`).

## Prediction

The prediction page calls:

```text
POST /api/predict
```

The saved Logistic Regression pipeline is loaded from:

```text
models/student_outcome_logistic_regression.pkl
```

The original project classification pipeline uses 30 inputs: 18 categorical features and 12 numerical features. For a compact student-facing interface, the website exposes the 12 numerical inputs and fills the categorical inputs with the most common values from the supplied dataset. This still calls the actual saved project pipeline.

The six second-semester fields are part of the project's 11-feature K-Means/PCA analysis, but they are not in the classification feature lists used to train the saved Logistic Regression pipeline.

## Dataset and assets

If you want the backend to recompute defaults from the raw dataset, place the original semicolon-separated CSV at:

```text
data/data.csv
```

The supplied project figures are already copied into both:

```text
assets/figures/
frontend/public/figures/
```

To replace a figure later, update the matching file in `frontend/public/figures/`.

## Notes

- This package is local-only.
- No deployment configuration is included.
- No Git repository, remote, CI/CD setup or GitHub connection is included.
- No external API/service is required for the prediction flow.
- The prediction is a data-driven estimate, not a definitive statement about an individual student's future.
