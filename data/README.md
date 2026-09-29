# Data placeholder

Place the project dataset here if you want the backend to recompute dataset-derived defaults:

- `data.csv` — the original semicolon-separated project dataset.

The website package does not require the raw dataset for the static showcase, but the
prediction API uses it to build default categorical values when present.

The trained model belongs in `models/student_outcome_logistic_regression.pkl`.
