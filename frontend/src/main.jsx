import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const FIG = (name) => `/figures/${name}`;

const numericInputs = [
  ["Previous qualification (grade)", 133.1, 95, 190, "Prior qualification grade"],
  ["Admission grade", 126.1, 95, 190, "Admission grade"],
  ["Age at enrollment", 20, 17, 70, "Age at enrollment"],
  ["Curricular units 1st sem (credited)", 0, 0, 20, "1st-semester credited units"],
  ["Curricular units 1st sem (enrolled)", 6, 0, 26, "1st-semester enrolled units"],
  ["Curricular units 1st sem (evaluations)", 8, 0, 45, "1st-semester evaluations"],
  ["Curricular units 1st sem (approved)", 5, 0, 26, "1st-semester approved units"],
  ["Curricular units 1st sem (grade)", 12.29, 0, 18.875, "1st-semester grade"],
  ["Curricular units 1st sem (without evaluations)", 0, 0, 12, "1st-semester units without evaluation"],
  ["Unemployment rate", 11.1, 7.6, 16.2, "Unemployment rate"],
  ["Inflation rate", 1.4, -0.8, 3.7, "Inflation rate"],
  ["GDP", 0.32, -4.06, 3.51, "GDP"],
];

const modelTable = [
  ["Logistic Regression", "73.9%", "72.4%"],
  ["Random Forest", "73.0%", "70.2%"],
  ["Tuned Random Forest", "71.5%", "64.8%"],
  ["Balanced Logistic Regression", "69.9%", "71.2%"],
];

const clusterRows = [
  ["0", "778", "17.6%", "Low performance", "81.75% Dropout"],
  ["1", "1,871", "42.3%", "Intermediate", "45.54% Graduate"],
  ["2", "240", "5.4%", "High engagement", "66.25% Graduate"],
  ["3", "1,535", "34.7%", "Strong performance", "73.09% Graduate"],
];

function App() {
  const [values, setValues] = useState(Object.fromEntries(numericInputs.map(([k, v]) => [k, v])));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const update = (key, value) => setValues(v => ({ ...v, [key]: value }));

  async function predict() {
    setLoading(true);
    setApiError("");
    setPrediction(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ features: values })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Prediction failed.");
      setPrediction(data);
    } catch (err) {
      setApiError(err.message + " Start the local FastAPI backend first.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="topbar">
        <a className="brand" href="#home">DATA <span>SPEAKS</span></a>
        <nav>
          {[
            ["Project","#project"],["Dataset","#dataset"],["EDA","#eda"],["Methodology","#methodology"],
            ["Results","#results"],["Clustering","#clustering"],["PCA","#pca"],["Prediction","#prediction"],["Conclusion","#conclusion"]
          ].map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Educational Data Mining · College Project</p>
            <h1>Data Speaks: <span>Student Dropout Prediction</span> and Academic Success Analysis</h1>
            <p className="lead">
              An end-to-end data science study of 4,424 students, combining exploratory analysis,
              classification, K-Means clustering and PCA to understand student outcomes.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#project">Explore the Project</a>
              <a className="btn ghost" href="#results">Explore Results</a>
              <a className="btn ghost" href="#prediction">Try Prediction</a>
            </div>
          </div>
          <div className="pipeline-card">
            <p className="mini-label">PROJECT PIPELINE</p>
            {["DATA","PREPROCESSING","EDA","ML","CLUSTERING","PCA","INSIGHTS","PREDICTION"].map((x,i) =>
              <React.Fragment key={x}>
                <div className="pipeline-step"><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>
                {i < 7 && <div className="pipeline-line" />}
              </React.Fragment>
            )}
          </div>
        </section>

        <section id="project" className="section">
          <div className="section-head"><p className="eyebrow">01 · PROJECT</p><h2>One project, three questions.</h2></div>
          <div className="question-grid">
            <article><span>01</span><h3>Can outcomes be predicted?</h3><p>Classification predicts Dropout, Enrolled, or Graduate from demographic, academic and enrollment characteristics.</p></article>
            <article><span>02</span><h3>What student profiles exist?</h3><p>K-Means groups students using 11 academic and enrollment features without using the target during clustering.</p></article>
            <article><span>03</span><h3>What structure is visible?</h3><p>PCA compresses those 11 standardized features into five components for compact analysis and visualization.</p></article>
          </div>
          <div className="story">
            <div><p className="eyebrow">WHY IT MATTERS</p><h3>Student outcomes reflect multiple academic and enrollment signals.</h3></div>
            <p>The project studies these signals together rather than treating dropout, continued enrollment and graduation as isolated labels. The result is a single workflow that provides both predictive and descriptive insight.</p>
          </div>
        </section>

        <section id="dataset" className="section alt">
          <div className="section-head"><p className="eyebrow">02 · DATASET</p><h2>The dataset behind the story.</h2><p>“Predict Students’ Dropout and Academic Success” contains demographic, academic and enrollment-related information.</p></div>
          <div className="stat-grid">
            <Stat n="4,424" label="Students" />
            <Stat n="36" label="Input features" />
            <Stat n="37" label="Total columns" />
            <Stat n="3" label="Target classes" />
          </div>
          <div className="dataset-bottom">
            <div className="class-list">
              <p className="mini-label">TARGET</p>
              <div className="class-pill"><i className="dot dropout"/>Dropout</div>
              <div className="class-pill"><i className="dot enrolled"/>Enrolled</div>
              <div className="class-pill"><i className="dot graduate"/>Graduate</div>
            </div>
            <div>
              <p className="mini-label">FEATURE CATEGORIES</p>
              <div className="tag-row"><span>Demographic</span><span>Academic</span><span>Enrollment</span><span>Semester performance</span></div>
              <p className="muted">Examples include age at enrollment, previous qualification and admission grade, curricular-unit enrollment/evaluation/approval, semester grades, scholarship status and other student characteristics.</p>
            </div>
          </div>
        </section>

        <section id="methodology" className="section">
          <div className="section-head"><p className="eyebrow">03 · PREPROCESSING & METHODOLOGY</p><h2>From raw records to model-ready data.</h2></div>
          <div className="method-grid">
            {[
              ["01","Inspect","head(), columns, info(), describe(), shape, data types and unique values."],
              ["02","Clean","0 missing values and 0 duplicate records were found."],
              ["03","Encode","Categorical variables were transformed with One-Hot Encoding."],
              ["04","Scale","Numerical variables were standardized with StandardScaler."],
              ["05","Split","Training and test subsets were created with stratification and a 20% test set."],
              ["06","Pipeline","ColumnTransformer fitted preprocessing only on training data to avoid leakage."]
            ].map(([n,t,d]) => <article className="method-card" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
          </div>
          <div className="feature-note">
            <div><p className="mini-label">CLUSTERING + PCA FEATURES</p><strong>11 academic & enrollment features</strong></div>
            <p>Age at enrollment, previous qualification grade, admission grade, first- and second-semester enrollment, evaluations, approved courses and grades. These 11 features were standardized before K-Means and PCA.</p>
          </div>
        </section>

        <section id="eda" className="section alt">
          <div className="section-head"><p className="eyebrow">04 · EDA</p><h2>What the exploratory analysis shows.</h2><p>Real figures from the project are used throughout this page; each visual is paired with the project’s interpretation.</p></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig1_target_distribution.png")} title="Target distribution" text="Graduate is the largest outcome group, while Enrolled is the smallest. The three target categories are all represented in the dataset."/>
            <Figure src={FIG("fig2_first_semester_grade.png")} title="First-semester grade by outcome" text="Students who eventually graduated generally show higher first-semester grades, while Dropout students tend to have lower grades."/>
          </div>
        </section>

        <section id="results" className="section">
          <div className="section-head"><p className="eyebrow">05 · CLASSIFICATION</p><h2>Predicting the student outcome.</h2><p>The final supervised task is multiclass prediction: Dropout, Enrolled, or Graduate.</p></div>
          <div className="result-highlight">
            <div><p className="mini-label">FINAL MODEL</p><strong>Logistic Regression</strong><span>Selected for overall predictive performance and interpretability.</span></div>
            <div className="big-metric"><b>73.9%</b><span>test accuracy</span></div>
            <div className="big-metric"><b>72.4%</b><span>weighted F1-score</span></div>
          </div>
          <div className="table-wrap">
            <table><thead><tr><th>Model</th><th>Accuracy</th><th>Weighted F1</th></tr></thead><tbody>
              {modelTable.map(r => <tr key={r[0]} className={r[0]==="Logistic Regression" ? "selected" : ""}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
            </tbody></table>
          </div>
          <div className="figure-grid one">
            <Figure src={FIG("fig3_confusion_matrix.png")} title="Final Logistic Regression — confusion matrix" text="Rows are actual outcomes and columns are predicted outcomes. The matrix shows substantial correct identification for Dropout and Graduate; Enrolled is comparatively harder to distinguish."/>
          </div>
        </section>

        <section id="clustering" className="section alt">
          <div className="section-head"><p className="eyebrow">06 · K-MEANS</p><h2>Four academic profiles emerge.</h2><p>The Elbow Method supported K = 4. The target was not used to form clusters; it was compared afterward to interpret the resulting groups.</p></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig4_elbow_method.png")} title="Elbow method" text="Inertia falls as K increases, with the reduction becoming less pronounced after approximately four clusters. The project therefore selected K = 4."/>
            <div className="cluster-table-wrap">
              <table><thead><tr><th>Cluster</th><th>Students</th><th>Share</th><th>Profile</th><th>Key outcome</th></tr></thead>
              <tbody>{clusterRows.map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>)}</tbody></table>
            </div>
          </div>
          <div className="cluster-cards">
            <Cluster n="0" title="Low performance" text="Very low approved-course counts and semester grades; 81.75% of students are Dropout."/>
            <Cluster n="1" title="Intermediate" text="The largest group, with moderate academic engagement and mixed outcomes; 45.54% are Graduate."/>
            <Cluster n="2" title="High engagement" text="Smallest group, with strong enrollment, evaluation and course completion; 66.25% are Graduate."/>
            <Cluster n="3" title="Strong performance" text="High semester grades and course approval; 73.09% are Graduate."/>
          </div>
          <p className="callout">Interpretation: these are associations in the dataset, not causal claims. Cluster labels are simply K-Means labels.</p>
        </section>

        <section id="pca" className="section">
          <div className="section-head"><p className="eyebrow">07 · PCA</p><h2>11 dimensions → 5 components.</h2><p>PCA creates a compact representation of the selected academic and enrollment feature space while retaining most of its variance.</p></div>
          <div className="pca-metrics"><div><b>47.73%</b><span>PC1 variance</span></div><div><b>75.85%</b><span>First 3 components</span></div><div><b>89.95%</b><span>First 5 components</span></div></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig5_pca_variance.png")} title="Cumulative explained variance" text="The first five components retain approximately 89.95% of total variance, so five components were selected as the compact representation."/>
            <Figure src={FIG("fig6_pca_by_target.png")} title="PCA by student outcome" text="The outcome groups show some structure, but substantial overlap remains. The three outcomes are not completely separable using the reduced representation alone."/>
          </div>
          <div className="figure-grid one">
            <Figure src={FIG("fig7_pca_by_cluster.png")} title="PCA by K-Means cluster" text="Clusters occupy distinguishable regions in the reduced feature space, providing a complementary view of similarity in academic and enrollment characteristics."/>
          </div>
        </section>

        <section className="section alt">
          <div className="section-head"><p className="eyebrow">08 · KEY FINDINGS</p><h2>The project in six signals.</h2></div>
          <div className="findings">
            <Finding n="01" t="Academic performance matters" d="The analysis found strong association between academic performance, course completion and student outcomes."/>
            <Finding n="02" t="73.9% test accuracy" d="The selected Logistic Regression model achieved 73.9% accuracy and 72.4% weighted F1 on the test set."/>
            <Finding n="03" t="Enrolled is harder to classify" d="The confusion matrix shows greater overlap for the Enrolled category than for Dropout and Graduate."/>
            <Finding n="04" t="Four profiles" d="K-Means identified four groups with substantially different academic characteristics and outcome distributions."/>
            <Finding n="05" t="Cluster 0 stands out" d="81.75% of Cluster 0 students are Dropout, alongside very low course approval and semester grades."/>
            <Finding n="06" t="PCA keeps most information" d="Five components retain approximately 89.95% of variance from the selected 11 features."/>
          </div>
        </section>

        <section id="prediction" className="section prediction-section">
          <div className="section-head"><p className="eyebrow">09 · STUDENT OUTCOME PREDICTION</p><h2>Try the saved project model.</h2><p>This local demo sends your inputs to the actual saved Logistic Regression pipeline supplied with the project.</p></div>
          <div className="prediction-layout">
            <div className="prediction-form">
              <div className="form-note"><strong>Compact demo inputs</strong><span>The classification pipeline was trained on 30 input features: 18 categorical + 12 numerical. To keep the interface usable, this form exposes the 12 numerical model inputs and fills the categorical inputs with their most common dataset values.</span></div>
              <div className="input-grid">
                {numericInputs.map(([key, value, min, max, label]) => (
                  <label key={key}><span>{label}</span><input type="number" step="any" min={min} max={max} value={values[key]} onChange={e=>update(key, Number(e.target.value))}/><small>{key}</small></label>
                ))}
              </div>
              <button className="btn primary predict-btn" onClick={predict} disabled={loading}>{loading ? "Running model…" : "Predict Student Outcome"}</button>
              {apiError && <div className="error">{apiError}</div>}
            </div>
            <div className="prediction-result">
              {!prediction && <div className="empty-result"><span>MODEL RESULT</span><h3>Your prediction will appear here.</h3><p>Use the inputs on the left, then run the local prediction API.</p></div>}
              {prediction && <div className="result-ready"><span>MODEL PREDICTION</span><h3>{prediction.prediction}</h3><p>{prediction.message}</p><div className="prob-grid">{Object.entries(prediction.probabilities).map(([k,v])=><div key={k}><span>{k}</span><b>{(v*100).toFixed(1)}%</b></div>)}</div></div>}
              <div className="limitation">This prediction is a data-driven estimate from the trained project model, not a definitive statement about an individual student's future.</div>
            </div>
          </div>
        </section>

        <section id="conclusion" className="section conclusion">
          <div className="section-head"><p className="eyebrow">10 · CONCLUSION</p><h2>What the project accomplished.</h2></div>
          <div className="conclusion-grid">
            <p>The study combined exploratory data analysis, classification, K-Means clustering and PCA to obtain both predictive and descriptive insights from 4,424 students.</p>
            <p>Logistic Regression provided the selected classification result at 73.9% accuracy and 72.4% weighted F1, while the confusion matrix highlighted the greater difficulty of the Enrolled class.</p>
            <p>K-Means revealed four academic profiles with substantially different outcome distributions, including a low-performance cluster strongly associated with Dropout and strong-performance groups with higher Graduate proportions.</p>
            <p>PCA reduced the selected 11-feature space to five components while retaining approximately 89.95% of the variance, making the structure easier to visualize.</p>
          </div>
          <div className="final-takeaway"><span>FINAL TAKEAWAY</span><strong>Predictive modeling + clustering + dimensionality reduction provide a fuller view of student outcomes than any single technique alone.</strong></div>
        </section>
      </main>

      <footer><div><strong>DATA SPEAKS</strong><span>Student Dropout Prediction and Academic Success Analysis</span></div><span>Local project showcase · No deployment included</span></footer>
    </div>
  );
}

function Stat({n,label}) { return <div className="stat"><b>{n}</b><span>{label}</span></div> }
function Figure({src,title,text}) { return <figure><img src={src} alt={title}/><figcaption><h3>{title}</h3><p>{text}</p></figcaption></figure> }
function Cluster({n,title,text}) { return <article className="cluster-card"><span>CLUSTER {n}</span><h3>{title}</h3><p>{text}</p></article> }
function Finding({n,t,d}) { return <article><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article> }

createRoot(document.getElementById("root")).render(<App />);
