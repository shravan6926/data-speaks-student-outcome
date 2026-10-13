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
  ["0", "778", "17.6%", "Low performance", "Not provided", "81.75%"],
  ["1", "1,871", "42.3%", "Intermediate", "45.54%", "29.24%"],
  ["2", "240", "5.4%", "High engagement", "66.25%", "Not provided"],
  ["3", "1,535", "34.7%", "Strong performance", "73.09%", "Not provided"],
];

const teamMembers = [
  {
    name: "Shravan Pawar",
    photo: null,
    biography: "A simple Biography",
    contribution: "Team Leader, worked in project workflow, data processing, classification, PCA, visualisation and providing framework to the website",
  },
  {
    name: "Prajyot Satarde",
    photo: null,
    biography: "A simple Biography",
    contribution: "Worked in Core conceptual portion and made the frontend for the website",
  },
  {
    name: "Shubham Adhav",
    photo: null,
    biography: "A simple Biography",
    contribution: "Worked in analysing the data and processing the proper algorithms for the topic",
  },
  {
    name: "Shankar",
    photo: null,
    biography: "A simple Biography",
    contribution: "Helped the team to have proper data preprocessing and clustering",
  },
  {
    name: "Manasa Osogulla",
    photo: null,
    biography: "A simple Biography",
    contribution: "Managed the team to have a proper visualisation about the project",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("project");
  const [values, setValues] = useState(Object.fromEntries(numericInputs.map(([k, v]) => [k, v])));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const update = (key, value) => setValues(v => ({ ...v, [key]: value }));
  const selectTab = tab => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  async function predict() {
    setLoading(true);
    setApiError("");
    setPrediction(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
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
        <button className="brand" type="button" onClick={() => selectTab("project")}>DATA <span>SPEAKS</span></button>
        <nav className="tab-nav" aria-label="Primary navigation">
          {[
            ["Project", "project"],
            ["Results", "results"],
            ["Team", "team"]
          ].map(([label, tab]) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              aria-current={activeTab === tab ? "page" : undefined}
              onClick={() => selectTab(tab)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero section" hidden={activeTab !== "project"}>
          <div className="hero-copy">
            <p className="eyebrow">Educational Data Mining · College Project</p>
            <h1>Data Speaks: <span>Student Dropout Prediction</span> and Academic Success Analysis</h1>
            <p className="lead">
              How can student data help us understand dropout, continued enrollment, and academic success?
              This project investigates student outcomes through data exploration, classification, clustering,
              and dimensionality reduction.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#project">Project overview</a>
              <button className="btn ghost" type="button" onClick={() => selectTab("results")}>Explore Results</button>
              <button className="btn ghost" type="button" onClick={() => selectTab("results")}>View Results & Prediction</button>
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

        <section id="project" className="section" hidden={activeTab !== "project"}>
          <div className="section-head"><p className="eyebrow">PROJECT OVERVIEW</p><h2>Why study student outcomes?</h2><p>Dropout and academic success are important educational outcomes. Understanding how student characteristics relate to those outcomes can help describe patterns in the data, while the analysis itself cannot establish why an individual student succeeds or leaves.</p></div>
          <div className="question-grid">
            <article><span>01</span><h3>Compare outcomes</h3><p>Evaluate classification approaches for the Dropout, Enrolled, and Graduate categories.</p></article>
            <article><span>02</span><h3>Explore student profiles</h3><p>Use K-Means to group students by selected academic and enrollment features, then describe the groups.</p></article>
            <article><span>03</span><h3>Summarize feature structure</h3><p>Use PCA to reduce the selected feature space and visualize patterns in the data.</p></article>
          </div>
          <div className="story">
            <div><p className="eyebrow">PROJECT SIGNIFICANCE</p><h3>Prediction and description answer different questions.</h3></div>
            <p>Classification compares predictive performance, while clustering and PCA offer descriptive views of student similarities and feature structure. Together, these methods provide complementary perspectives on the same outcomes without implying causal effects.</p>
          </div>
        </section>

        <section id="dataset" className="section alt" hidden={activeTab !== "project"}>
          <div className="section-head"><p className="eyebrow">DATASET OVERVIEW</p><h2>4,424 student records.</h2><p>The dataset contains demographic, academic, and enrollment-related information, with three target classes.</p></div>
          <div className="stat-grid">
            <Stat n="4,424" label="Students" />
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

        <section id="methodology" className="section" hidden={activeTab !== "project"}>
          <div className="section-head"><p className="eyebrow">METHODOLOGY</p><h2>One workflow, three analytical approaches.</h2><p>Quality checks and preprocessing prepared the data for classification, clustering, PCA, and evaluation.</p></div>
          <div className="method-grid">
            {[
              ["01","Check data quality","Inspect records, columns, data types, missing values, and duplicate records."],
              ["02","Preprocess","One-Hot Encode categorical features and standardize numerical features for classification."],
              ["03","Classify","Train and compare four classification models for the three target classes."],
              ["04","Cluster","Apply K-Means to 11 selected academic and enrollment features without using the target."],
              ["05","Reduce dimensions","Apply PCA to the same selected 11-feature space for analysis and visualization."],
              ["06","Evaluate","Compare classification metrics and examine the resulting figures and group patterns."]
            ].map(([n,t,d]) => <article className="method-card" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}
          </div>
          <div className="feature-note">
            <div><p className="mini-label">CLUSTERING + PCA FEATURES</p><strong>11 academic & enrollment features</strong></div>
            <p>The selected feature set covers age at enrollment, qualification and admission grades, and first- and second-semester enrollment, evaluations, approved courses, and grades.</p>
          </div>
          <div className="limitation-note"><strong>Limitations</strong><p>The findings describe patterns and associations in this dataset; they do not show causal effects or guarantee outcomes for individuals. The prediction demo exposes 12 numerical inputs and fills the remaining categorical inputs with their most common dataset values.</p></div>
        </section>

        <section id="eda" className="section alt" hidden={activeTab !== "results"}>
          <div className="section-head"><p className="eyebrow">A · DATASET EXPLORATION</p><h2>Explore the target and first-semester grades.</h2></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig1_target_distribution.png")} title="Target distribution" text="Graduate is the largest group in the plotted distribution, followed by Dropout; Enrolled is the smallest group."/>
            <Figure src={FIG("fig2_first_semester_grade.png")} title="First-semester grade by outcome" text="The median first-semester grade is higher for Graduate than for Enrolled and Dropout. Dropout grades show a wider spread, including many values at zero."/>
          </div>
        </section>

        <section id="classification" className="section" hidden={activeTab !== "results"}>
          <div className="section-head"><p className="eyebrow">B · CLASSIFICATION RESULTS</p><h2>Comparing four classification models.</h2><p>The supervised task predicts Dropout, Enrolled, or Graduate.</p></div>
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
          <p className="result-explanation">Logistic Regression had the strongest overall results in this comparison, leading in both accuracy and weighted F1, and was selected with interpretability as an additional consideration.</p>
          <div className="figure-grid one">
            <Figure src={FIG("fig3_confusion_matrix.png")} title="Final Logistic Regression — confusion matrix" text="Rows are actual outcomes and columns are predicted outcomes. Dropout and Graduate are reasonably well distinguished, while Enrolled is more difficult to classify."/>
          </div>
        </section>

        <section id="clustering" className="section alt" hidden={activeTab !== "results"}>
          <div className="section-head"><p className="eyebrow">C · K-MEANS CLUSTERING</p><h2>Four groups from academic and enrollment features.</h2><p>The elbow curve supported K = 4. The target was not used to construct the clusters; it was compared afterward to help interpret them.</p></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig4_elbow_method.png")} title="Elbow method" text="The reduction in inertia becomes less pronounced around K = 4, supporting the selection of four clusters."/>
            <div className="cluster-table-wrap">
              <table><thead><tr><th>Cluster</th><th>Students</th><th>Share</th><th>Interpretation</th><th>Graduate</th><th>Dropout</th></tr></thead>
              <tbody>{clusterRows.map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td></tr>)}</tbody></table>
            </div>
          </div>
          <p className="callout">Cluster 1 contains the largest share of students, while Cluster 2 contains the smallest. The reported outcome proportions differ across clusters; these are associations used to describe groups, not causal effects. Outcome values not included in the project findings are marked “Not provided.”</p>
        </section>

        <section id="pca" className="section" hidden={activeTab !== "results"}>
          <div className="section-head"><p className="eyebrow">D · PCA & DIMENSIONALITY REDUCTION</p><h2>11 features reduced to five components.</h2><p>PCA summarizes selected academic and enrollment features for dimensionality reduction and visualization; it is not a separate prediction model.</p></div>
          <div className="pca-metrics"><div><b>47.73%</b><span>PC1 variance</span></div><div><b>75.85%</b><span>First 3 components</span></div><div><b>89.95%</b><span>First 5 components</span></div></div>
          <div className="figure-grid two">
            <Figure src={FIG("fig5_pca_variance.png")} title="Cumulative explained variance" text="The first five components retain approximately 89.95% of total variance, so five components were selected as the compact representation."/>
            <Figure src={FIG("fig6_pca_by_target.png")} title="PCA by student outcome" text="The target classes overlap in the reduced feature space, so the first components do not separate the three outcomes into completely distinct groups."/>
          </div>
          <div className="figure-grid one">
            <Figure src={FIG("fig7_pca_by_cluster.png")} title="PCA by K-Means cluster" text="Clusters occupy distinguishable regions in the reduced feature space, providing a complementary view of similarity in academic and enrollment characteristics."/>
          </div>
        </section>

        <section className="section alt" hidden={activeTab !== "results"}>
          <div className="section-head"><p className="eyebrow">E · KEY FINDINGS & CONCLUSION</p><h2>Three complementary views of student outcomes.</h2></div>
          <div className="findings">
            <Finding n="01" t="Classification" d="Logistic Regression had the best accuracy (73.9%) and weighted F1 (72.4%) among the four compared models; Enrolled remained harder to distinguish."/>
            <Finding n="02" t="Clustering" d="K-Means produced four groups with different reported outcome proportions. Those associations help describe the clusters but do not establish causes."/>
            <Finding n="03" t="PCA" d="Five components retained approximately 89.95% of the variance in the selected 11 features, supporting compact visualization."/>
          </div>
          <div className="final-takeaway"><span>CONCLUSION & LIMITATIONS</span><strong>Classification, clustering, and PCA provide complementary predictive and descriptive insights, but results are limited to patterns in this dataset and should not be interpreted as causal or individual guarantees.</strong></div>
        </section>

        <section id="prediction" className="section prediction-section" hidden={activeTab !== "results"}>
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

        <section className="section team-section" hidden={activeTab !== "team"}>
          <div className="team-intro">
            <div className="team-intro-copy">
              <p className="eyebrow">MEET THE TEAM</p>
              <h1>The People Behind <span>Data Speaks</span></h1>
              <p>We are a team exploring how data science and machine learning can help us understand student dropout patterns and academic success. Through data analysis, predictive modeling, clustering, and visualization, we worked together to turn student data into meaningful insights.</p>
            </div>
            <div className="team-intro-note">
              <span>PROJECT APPROACH</span>
              <strong>Data analysis<br />to meaningful insights</strong>
              <i aria-hidden="true" />
            </div>
          </div>
          <div className="team-profiles">
            <div className="team-section-heading">
              <div><p className="eyebrow">PROJECT CONTRIBUTORS</p><h2>Meet the people</h2></div>
              <p>Member details can be added to the team profile data in the project source.</p>
            </div>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <article className="team-card" key={`${member.name}-${index}`}>
                  <div className="team-portrait">
                    {member.photo ? (
                      <img src={member.photo} alt={`${member.name} portrait`} />
                    ) : (
                      <div className="team-photo-placeholder" role="img" aria-label="Photo coming soon">
                        <span>PORTRAIT</span>
                        <strong>DS</strong>
                        <small>Photo coming soon</small>
                      </div>
                    )}
                  </div>
                  <div className="team-card-content">
                    <p className="eyebrow">TEAM MEMBER</p>
                    <h3>{member.name}</h3>
                    <div className="team-detail">
                      <span>BIOGRAPHY</span>
                      <p>{member.biography}</p>
                    </div>
                    <div className="team-detail">
                      <span>PROJECT CONTRIBUTION</span>
                      <p>{member.contribution}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="team-editor-note">Team member names, biographies, and project contributions are listed above. Add portrait photos when the team has approved images available.</p>
          </div>
        </section>
      </main>

      <footer><div><strong>DATA SPEAKS</strong><span>Student Dropout Prediction and Academic Success Analysis</span></div><span>Local project showcase · No deployment included</span></footer>
    </div>
  );
}

function Stat({n,label}) { return <div className="stat"><b>{n}</b><span>{label}</span></div> }
function Figure({src,title,text}) { return <figure><img src={src} alt={title}/><figcaption><h3>{title}</h3><p>{text}</p></figcaption></figure> }
function Finding({n,t,d}) { return <article><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article> }

createRoot(document.getElementById("root")).render(<App />);
