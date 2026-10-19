window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.meta = {
  "code": "ZMLS",
  "brand": "ZyeemZia™",
  "name": "Machine Learning Specialization",
  "full": "ZyeemZia™ Machine Learning Specialization",
  "short": "ZMLS",
  "domain": "zmls.zyeemzia.com",
  "pdf": "ZMLS-Book.pdf",
  "storeKey": "zmls.v1",
  "tagline": "From first principles to models in production.",
  "lead": "A practical, professional machine learning specialization: the maths that matters, problem framing, data preparation, linear models and gradient descent, honest evaluation, trees and boosting, unsupervised learning, recommenders, reinforcement learning, deep learning and transformers, and the MLOps and responsible-ML practice needed to run models in the real world.",
  "signature": {
    "type": "path",
    "name": "The ZMLS Model Pathway",
    "centerSub": "Model Pathway",
    "caption": "Follow one model along eight stages: ground it in framing and maths, prepare its data, fit it, evaluate it honestly, strengthen it with ensembles, discover structure beyond labels, go deep with neural networks and deploy it responsibly."
  },
  "hours": "90–110",
  "level": "Professional",
  "audience": [
    "Software engineers and data analysts moving into machine learning",
    "Data scientists who want rigorous evaluation and production skills",
    "Graduates in CSE, EEE, statistics and mathematics",
    "Technical product managers and team leads who oversee ML projects"
  ],
  "passMark": 80,
  "distinctionMark": 90,
  "examSize": 40,
  "examMinutes": 60,
  "capstone": {
    "title": "Capstone: Take one model along the ZMLS Model Pathway",
    "brief": "Choose a real prediction problem from your work or a realistic public dataset (for example: churn for a mobile financial service in Dhaka, late-shipment risk for a garment exporter, readmission risk for a hospital, or load forecasting for a power utility). Take it through all eight stages of the ZMLS Model Pathway and produce a reproducible project that a reviewer can rerun and an operations team could run.",
    "deliverables": [
      "Problem framing canvas: decision, target, unit, timing, metric and baseline",
      "Data report: sources, label quality, profiling, cleaning log and leakage review",
      "Feature pipeline with point-in-time features, encoding and scaling inside one fitted pipeline",
      "Baseline and linear or logistic model with regularisation tuned by cross-validation",
      "Evaluation plan and results: split design, metrics, threshold choice, calibration and error analysis by segment",
      "Tree-ensemble model (random forest or gradient boosting) with explanation of key drivers",
      "One unsupervised, recommendation or deep learning component justified for the problem",
      "Model comparison sheet with a reasoned final choice",
      "Deployment and monitoring plan: serving pattern, release strategy, drift checks and retraining triggers",
      "Model card with fairness checks, limitations, privacy and governance notes"
    ],
    "rubric": [
      { "criterion": "Framing", "levels": ["Target or metric unclear", "Clear target, metric and baseline", "Decision-linked metric with value estimate and stakeholder sign-off"] },
      { "criterion": "Data & features", "levels": ["Raw data used as is", "Cleaned data and sensible features", "Point-in-time features, documented cleaning and leakage review"] },
      { "criterion": "Modelling", "levels": ["Single untuned model", "Baseline plus tuned candidates", "Well-justified models with regularisation and clear trade-offs"] },
      { "criterion": "Evaluation", "levels": ["Training score or random split only", "Appropriate split, metrics and threshold", "Deployment-matched validation, calibration and segment analysis"] },
      { "criterion": "Ensembles & beyond", "levels": ["Not attempted", "Working ensemble or advanced component", "Tuned, explained and compared fairly with simpler models"] },
      { "criterion": "Reproducibility", "levels": ["Results cannot be rerun", "Code and data versions recorded", "One-command pipeline with fixed seeds and tests"] },
      { "criterion": "Deployment & monitoring", "levels": ["Not considered", "Serving and monitoring plan", "Release strategy, drift thresholds, owners and rollback"] },
      { "criterion": "Responsible ML", "levels": ["Not addressed", "Model card with basic checks", "Measured fairness, privacy and risk controls proportionate to impact"] }
    ]
  },
  "certificate": {
    "title": "Certificate of Achievement",
    "statement": "has successfully completed all modules of the ZyeemZia™ Machine Learning Specialization and passed the ZMLS certification exam",
    "skills": [
      "Problem framing & ML maths",
      "Data preparation & features",
      "Supervised models & evaluation",
      "Ensembles, unsupervised & deep learning",
      "MLOps & responsible ML"
    ]
  },
  "disclaimer": "ZMLS is an independent certification programme created and issued by ZyeemZia. It is not affiliated with, endorsed by, sponsored by or equivalent to any course, specialization or certification from DeepLearning.AI, Stanford University, Coursera, Google, AWS (Amazon Web Services), Microsoft or any other company, university or certifying body. All product names and trademarks belong to their respective owners. Code examples use widely available open-source Python libraries for teaching purposes.",
  "studyPlan": [
    ["Weeks 1–2", "m1 Ground", "Frame your capstone problem; maths drills on vectors, gradients and Bayes"],
    ["Week 3", "m2 Prepare", "Profile and clean the data, build point-in-time features"],
    ["Weeks 4–5", "m3 Fit", "Baseline, linear and logistic models, regularisation tuning"],
    ["Week 6", "m4 Evaluate", "Evaluation plan, thresholds, calibration and leakage review"],
    ["Week 7", "m5 Ensemble", "Random forest and gradient boosting with explanations"],
    ["Weeks 8–9", "m6 Discover", "Clustering, PCA, anomaly detection or a recommender component"],
    ["Weeks 10–11", "m7 Deep", "Neural network, CNN or transformer experiment"],
    ["Week 12", "m8 Deploy", "Deployment and monitoring plan, model card, practice and certification exam"]
  ]
};
