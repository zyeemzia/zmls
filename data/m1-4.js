window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m1",
 "order": 1,
 "code": "Ground",
 "title": "Foundations: Framing and the Maths of Machine Learning",
 "subtitle": "Ground every model in a clear problem and the linear algebra, calculus and probability it relies on",
 "outcomes": [
  "Explain what machine learning is, its main families and the end-to-end workflow",
  "Frame a business problem as an ML task with a target, timing, metric and baseline",
  "Compute dot products, norms, cosine similarity and matrix–vector products",
  "Compute gradients, apply the chain rule and run gradient descent steps by hand",
  "Apply Bayes' rule and descriptive statistics to reason about data and model outputs"
 ],
 "lessons": [
  {
   "id": "m1-l1",
   "title": "What Machine Learning Is and How Projects Flow",
   "subtitle": "From hand-written rules to learned patterns, and the workflow every ML project follows",
   "minutes": 22,
   "objectives": [
    "Explain what machine learning is and how it differs from rule-based software",
    "Distinguish supervised, unsupervised, self-supervised and reinforcement learning",
    "Describe the end-to-end ML workflow and where most effort really goes",
    "Name the eight stages of the ZMLS Model Pathway"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Most software follows rules that a developer wrote down: if the balance is below zero, block the transfer. **Machine learning (ML)** turns that around. Instead of writing the rules, you show the computer many examples and let an algorithm find a rule that fits them. The result, a **model**, is then used to make predictions on new cases it has never seen."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "Machine learning is the practice of building systems that improve at a task by learning patterns from data, rather than by following rules written explicitly for every case. A trained model is a function that maps inputs (features) to outputs (predictions), with parameters estimated from examples.",
     "title": "Machine learning"
    },
    {
     "type": "compare",
     "title": "Rule-based software versus machine learning",
     "columns": [
      {
       "title": "Rule-based software",
       "items": [
        "A person writes the logic",
        "Inputs + rules → outputs",
        "Transparent and predictable",
        "Breaks when cases are too many or too fuzzy to list",
        "Example: VAT calculation"
       ]
      },
      {
       "title": "Machine learning",
       "items": [
        "An algorithm estimates the logic from examples",
        "Inputs + known outputs → learned rules (the model)",
        "Handles messy, high-dimensional patterns",
        "Only as good as its data; can fail silently",
        "Example: spotting fraudulent wallet transfers"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "The main families of machine learning",
     "head": [
      "Family",
      "What the data looks like",
      "Typical tasks",
      "Example"
     ],
     "rows": [
      [
       "Supervised learning",
       "Inputs with known answers (labels)",
       "Regression, classification",
       "Predict a garment order's delivery delay in days"
      ],
      [
       "Unsupervised learning",
       "Inputs only, no labels",
       "Clustering, dimensionality reduction, anomaly detection",
       "Group mobile money agents by transaction behaviour"
      ],
      [
       "Self-supervised learning",
       "Labels created from the data itself",
       "Pre-training language and image models",
       "Predict the masked word in a Bangla sentence"
      ],
      [
       "Reinforcement learning",
       "Actions, states and delayed rewards",
       "Sequential decisions, control",
       "Adjust air-conditioning set points in a hospital to cut energy use"
      ]
     ]
    },
    {
     "type": "flow",
     "title": "The machine learning workflow",
     "items": [
      {
       "label": "Frame",
       "text": "Decision, target, metric, baseline"
      },
      {
       "label": "Collect",
       "text": "Find and label the data"
      },
      {
       "label": "Prepare",
       "text": "Clean, split, engineer features"
      },
      {
       "label": "Train",
       "text": "Fit candidate models"
      },
      {
       "label": "Evaluate",
       "text": "Honest test on unseen data"
      },
      {
       "label": "Deploy",
       "text": "Serve predictions to users"
      },
      {
       "label": "Monitor",
       "text": "Watch quality and drift, retrain"
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "In real projects, framing the problem and preparing data usually take far more time than choosing an algorithm. A simple model on clean, well-understood data almost always beats a sophisticated model on data nobody has checked.",
     "title": "Where the time actually goes"
    },
    {
     "type": "framework",
     "title": "The ZMLS Model Pathway: eight stages",
     "items": [
      {
       "label": "1",
       "title": "Ground",
       "text": "Frame the problem and learn the maths that every model relies on."
      },
      {
       "label": "2",
       "title": "Prepare",
       "text": "Turn raw data into clean, leak-free features."
      },
      {
       "label": "3",
       "title": "Fit",
       "text": "Train linear and logistic models with gradient descent and regularisation."
      },
      {
       "label": "4",
       "title": "Evaluate",
       "text": "Measure honestly with splits, cross-validation and the right metrics."
      },
      {
       "label": "5",
       "title": "Ensemble",
       "text": "Use trees, forests and boosting, the workhorses of tabular data."
      },
      {
       "label": "6",
       "title": "Discover",
       "text": "Find structure without labels; recommend and learn from rewards."
      },
      {
       "label": "7",
       "title": "Deep",
       "text": "Build neural networks: CNNs, sequence models and transformers."
      },
      {
       "label": "8",
       "title": "Deploy",
       "text": "Ship, monitor and govern models responsibly in production."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Your first model in a few lines",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_iris",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.linear_model import LogisticRegression",
      "X, y = load_iris(return_X_y=True)",
      "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)",
      "model = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)",
      "print(f\"test accuracy: {model.score(X_te, y_te):.3f}\")",
      "# output: test accuracy: 0.978"
     ],
     "note": "The whole workflow in miniature: load data, hold some back, fit on the rest, then score on the held-back part. Real projects add framing, cleaning, validation and monitoring around these lines."
    },
    {
     "type": "scenario",
     "situation": "A university registrar in Chattogram wants to automatically flag students who have not paid fees by the deadline. The rule is fixed by policy and the payment data is complete. A vendor proposes an ML model. What should you recommend?",
     "options": [
      {
       "text": "A clustering model to group students by payment habits first",
       "feedback": "Clustering might be interesting for other questions, but it does not answer a yes/no policy check that is already fully defined.",
       "best": false
      },
      {
       "text": "An ML classifier, because it can learn the pattern from past payments",
       "feedback": "The pattern does not need to be learned: policy already defines it. A model could only approximate a rule you already know exactly.",
       "best": false
      },
      {
       "text": "A deep neural network, because more capacity gives higher accuracy",
       "feedback": "Capacity does not help when a deterministic rule gives 100% correct answers. This adds risk for no gain.",
       "best": false
      },
      {
       "text": "A simple rule or database query, because the logic is known exactly",
       "feedback": "Correct. When the rule is known, stable and complete, ML adds cost, opacity and failure modes without adding value.",
       "best": true
      }
     ],
     "title": "Is ML the right tool?"
    },
    {
     "type": "checklist",
     "title": "Signs that machine learning fits the problem",
     "items": [
      "The rules are too many, too fuzzy or too changeable to write by hand",
      "There is a pattern to learn, and enough examples that show it",
      "Labels or feedback exist, or can be created at reasonable cost",
      "Some prediction errors are tolerable and can be managed",
      "The decision is repeated often enough to justify building and running a model",
      "Someone owns the decision and will act on the predictions"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of one repeated decision in your organisation. Is it rule-based today? What examples, labels and feedback would you need for a model to help, and what would a wrong prediction cost?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Machine learning",
       "def": "Building systems that improve at a task by learning patterns from data instead of following hand-written rules."
      },
      {
       "term": "Model",
       "def": "A function with learned parameters that maps input features to a prediction."
      },
      {
       "term": "Feature",
       "def": "An input variable used by a model, such as age, transaction amount or pixel intensity."
      },
      {
       "term": "Label",
       "def": "The known answer attached to a training example in supervised learning, also called the target."
      },
      {
       "term": "Supervised learning",
       "def": "Learning a mapping from inputs to known outputs using labelled examples."
      },
      {
       "term": "Unsupervised learning",
       "def": "Finding structure, groups or unusual points in data that has no labels."
      },
      {
       "term": "Self-supervised learning",
       "def": "Learning from labels generated automatically from the data itself, such as predicting a hidden word."
      },
      {
       "term": "Reinforcement learning",
       "def": "Learning a policy of actions by trial and error to maximise long-term reward."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What does a trained machine learning model fundamentally represent?",
       "options": [
        "A function with parameters estimated from examples that maps inputs to predictions",
        "A database that stores every training example and searches them one by one at prediction time",
        "A set of rules written by domain experts and stored as configuration",
        "A visual dashboard summarising historical performance of the business"
       ],
       "answer": 0,
       "explain": "A model is a learned function. Some methods keep training data (such as nearest neighbours), but the general idea is parameters estimated from data, not hand-written rules or reports."
      },
      {
       "q": "A hospital wants to group patients by similar admission patterns without any predefined categories. Which family of learning fits?",
       "options": [
        "Supervised regression",
        "Reinforcement learning",
        "Unsupervised learning",
        "Supervised classification"
       ],
       "answer": 2,
       "explain": "There are no labels, and the aim is to find structure, which is unsupervised learning such as clustering."
      },
      {
       "q": "Which stage of the ML workflow usually consumes the most effort in practice?",
       "options": [
        "Choosing between algorithms of similar accuracy",
        "Framing the problem and preparing the data",
        "Writing the final project presentation",
        "Tuning the learning rate of the final model"
       ],
       "answer": 1,
       "explain": "Data work and framing dominate real projects; algorithm choice is usually a smaller part of the effort."
      },
      {
       "q": "Pre-training a language model by predicting masked words in sentences is an example of which approach?",
       "options": [
        "Reinforcement learning",
        "Unsupervised k-means clustering",
        "Rule-based programming",
        "Self-supervised learning"
       ],
       "answer": 3,
       "explain": "The labels (the hidden words) come from the data itself, which defines self-supervised learning."
      },
      {
       "q": "In the first-model example, why is part of the data held back with a train/test split?",
       "options": [
        "To make training faster by using fewer rows",
        "To remove outliers and duplicate rows from the training data automatically before fitting",
        "To allow the model to memorise the test answers",
        "To estimate how the model performs on cases it has not seen during training"
       ],
       "answer": 3,
       "explain": "The held-back test set gives an honest estimate of performance on new data; scoring on training data would be optimistic."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l2",
   "title": "Framing Machine Learning Problems",
   "subtitle": "Turn a business question into a prediction target, a metric and a baseline",
   "minutes": 24,
   "objectives": [
    "Translate a business decision into a well-defined ML task",
    "Define the target, the unit of prediction and the moment of prediction",
    "Choose a success metric linked to business value",
    "Set a baseline that any model must beat"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Most failed ML projects fail before any model is trained. The team predicts the wrong thing, at the wrong time, for a decision nobody will change. **Framing** is the discipline of pinning down exactly what will be predicted, for whom, when, and how the prediction will change an action."
    },
    {
     "type": "steps",
     "title": "Seven questions that frame an ML problem",
     "items": [
      {
       "title": "Decision",
       "text": "Which action will change because of the prediction? If no action changes, stop here."
      },
      {
       "title": "Target",
       "text": "What exactly is predicted? Write the label definition precisely, for example 'no wallet transaction in the next 30 days'."
      },
      {
       "title": "Unit",
       "text": "One prediction per what: customer, transaction, machine, day, or customer-day?"
      },
      {
       "title": "Timing",
       "text": "When is the prediction made, and what data is genuinely available at that moment?"
      },
      {
       "title": "Task type",
       "text": "Regression, binary or multi-class classification, ranking, forecasting or clustering."
      },
      {
       "title": "Metric",
       "text": "How will success be measured offline, and which business measure should move?"
      },
      {
       "title": "Baseline",
       "text": "What does a simple rule or the current process achieve today?"
      }
     ]
    },
    {
     "type": "table",
     "title": "From business question to ML task",
     "head": [
      "Business question",
      "ML task",
      "Target",
      "Useful metric"
     ],
     "rows": [
      [
       "Which wallet users will stop using the app?",
       "Binary classification",
       "No transaction in next 30 days (yes/no)",
       "Recall at a fixed contact budget, lift"
      ],
      [
       "How many shirts will each line produce tomorrow?",
       "Regression / forecasting",
       "Units produced per line per day",
       "Mean absolute error in units"
      ],
      [
       "Which loan applicants are likely to default?",
       "Binary classification with probabilities",
       "Default within 12 months",
       "AUC, calibration, expected loss"
      ],
      [
       "Which products should we show this shopper?",
       "Ranking / recommendation",
       "Click or purchase on shown items",
       "Precision@k, NDCG, revenue per session"
      ],
      [
       "Which emergency cases need urgent review?",
       "Multi-class classification",
       "Triage category assigned by a senior clinician",
       "Recall on the most urgent class"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "We often cannot measure what we care about, so we predict a **proxy**. 'Past spending on healthcare' is a poor proxy for 'need for care' if some groups have historically had less access. A model will optimise the proxy faithfully, including its biases. Always write down how the proxy differs from the real goal.",
     "title": "Beware proxy targets"
    },
    {
     "type": "formula",
     "title": "Putting a value on predictions",
     "items": [
      {
       "name": "Net value of acting on a model",
       "expr": "Value = TP × benefit − (TP + FP) × cost_action − FN × cost_missed",
       "meaning": "TP, FP and FN are counts of true positives, false positives and false negatives at the chosen threshold. Every contacted case (TP + FP) costs money to act on."
      },
      {
       "name": "Worked example",
       "expr": "TP = 300, FP = 700, FN = 200; benefit = 2,000 BDT, action cost = 100 BDT, missed cost = 0",
       "meaning": "Value = 300 × 2,000 − 1,000 × 100 = 600,000 − 100,000 = 500,000 BDT for one campaign."
      },
      {
       "name": "Lift",
       "expr": "Lift = precision in targeted group ÷ base rate",
       "meaning": "If 30% of contacted users would churn but the base rate is 10%, lift = 0.30 ÷ 0.10 = 3: targeting is three times better than random."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Two layers of success",
     "columns": [
      {
       "title": "Model metric (offline)",
       "items": [
        "Measured on held-out data",
        "Accuracy, AUC, MAE, F1, NDCG",
        "Fast to compute, good for comparing models",
        "Can improve while business value stays flat"
       ]
      },
      {
       "title": "Business metric (online)",
       "items": [
        "Measured after deployment",
        "Retention, revenue, cost saved, lives helped",
        "Slow, noisy, needs an experiment or careful comparison",
        "The reason the project exists"
       ]
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "**Majority class**: predict the most common label for everyone; accuracy equals the base rate.",
      "**Mean or median**: for regression, predict the training mean (for squared error) or median (for absolute error).",
      "**Last value / seasonal naive**: for forecasting, predict yesterday's value or last week's same day.",
      "**Simple rule**: the heuristic the business already uses, such as 'no login for 14 days'.",
      "A model that cannot clearly beat these baselines is not ready, however complex it is."
     ],
     "title": "Baselines you should always compute"
    },
    {
     "type": "template",
     "title": "ML problem framing canvas",
     "purpose": "Agree the problem definition with the decision owner before collecting data or training anything.",
     "columns": [
      "Decision and owner",
      "Prediction target (exact definition)",
      "Unit and timing",
      "Data available at prediction time",
      "Offline metric and target",
      "Business metric",
      "Baseline"
     ],
     "example": [
      [
       "Retention team (Head of CRM) chooses whom to call",
       "No wallet transaction in the 30 days after the scoring date",
       "Active customer, scored every Monday",
       "Last 90 days of transactions, KYC tier, device data",
       "Recall ≥ 0.55 at top 5% contacted",
       "30-day retention of contacted users",
       "Rule: no login for 14 days (recall 0.31)"
      ]
     ],
     "rows": 5
    },
    {
     "type": "case",
     "title": "Framing churn for a mobile financial service",
     "context": "A Dhaka-based mobile money provider wants to 'use AI to reduce churn'. The data team has three years of transactions. Marketing can call 20,000 customers a month and offer a small cashback. An analyst has already trained a model that predicts whether a customer will close their account, reaching 99% accuracy. Fewer than 1% of customers formally close accounts; many more simply go silent.",
     "questions": [
      "What is wrong with the existing target and the 99% figure?",
      "How would you define a better target, unit and timing?",
      "Which metric and baseline would you use, given the call capacity?"
     ],
     "answer": "Formal closure is rare and is not how most customers leave, so the target misses the real behaviour; 99% accuracy is roughly what predicting 'never closes' would score. A better target is inactivity, for example no transaction in the 30 days after a weekly scoring date, per active customer, using only data up to that date. Because only 20,000 calls a month are possible, measure recall or precision within the top-ranked 20,000 (or lift at that cut-off), compare against a simple inactivity rule, and plan an A/B test to confirm that calls actually improve retention."
    },
    {
     "type": "scenario",
     "situation": "A garment factory in Gazipur wants to predict whether each export order will ship late. One proposed feature is 'number of days the order spent in final inspection'. Predictions are needed when the order is accepted. What should you do with this feature?",
     "options": [
      {
       "text": "Keep it, because it is strongly correlated with lateness",
       "feedback": "Strong correlation is exactly what makes leaked features dangerous: the model will lean on information that will not exist in production.",
       "best": false
      },
      {
       "text": "Exclude it, because it is not known at the moment the prediction is made",
       "feedback": "Correct. Inspection time is only known near the end of production. Using it would leak future information and give a model that looks excellent offline but cannot work at order acceptance.",
       "best": true
      },
      {
       "text": "Replace missing values of it with the average",
       "feedback": "At acceptance time the value is not missing by accident, it does not exist yet. Imputing it hides the leak rather than fixing it.",
       "best": false
      },
      {
       "text": "Keep it but scale it to the range 0 to 1",
       "feedback": "Scaling does not change the timing problem. The value is still unavailable when predictions are needed.",
       "best": false
      }
     ],
     "title": "Choosing the prediction moment"
    },
    {
     "type": "reflection",
     "prompt": "Pick an ML idea from your own work. Write the exact target definition in one sentence, including the time window. Who will act on the prediction, and what will they do differently?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Problem framing",
       "def": "Defining the decision, target, unit, timing, metric and baseline before building a model."
      },
      {
       "term": "Target variable",
       "def": "The quantity or category a supervised model is trained to predict."
      },
      {
       "term": "Proxy target",
       "def": "A measurable stand-in for the real goal; it can carry bias or diverge from what truly matters."
      },
      {
       "term": "Unit of prediction",
       "def": "The entity and grain for which one prediction is made, such as customer-week or transaction."
      },
      {
       "term": "Prediction time",
       "def": "The moment a prediction is made; only data available at that moment may be used as features."
      },
      {
       "term": "Baseline",
       "def": "A simple reference result, such as the majority class or the current rule, that a model must beat."
      },
      {
       "term": "Lift",
       "def": "How much more often the target occurs in a model-selected group than in the population as a whole."
      },
      {
       "term": "Base rate",
       "def": "The overall proportion of positive cases in the population."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A model predicts loan default with 97% accuracy, and 3% of past loans defaulted. What is the most important first check?",
       "options": [
        "Increase the number of features to raise accuracy further",
        "Compare it with the baseline of predicting 'no default' for everyone",
        "Deploy it quickly because 97% is above the usual target",
        "Retrain it on a larger network to reach 99%"
       ],
       "answer": 1,
       "explain": "Predicting 'no default' for everyone also scores 97%. Without beating the majority-class baseline, the model may have learned nothing useful."
      },
      {
       "q": "Which question should be answered FIRST when framing an ML project?",
       "options": [
        "Which algorithm has given the best accuracy on similar problems elsewhere?",
        "How many GPUs will the training need?",
        "Which decision or action will change because of the prediction?",
        "Which programming language should the team use?"
       ],
       "answer": 2,
       "explain": "If no action changes, the model has no value. Algorithm and tooling choices come later."
      },
      {
       "q": "A retention campaign contacts 500 customers, of whom 200 are true churners who are saved. Each saved customer is worth 1,500 BDT and every contact costs 100 BDT. What is the net value?",
       "options": [
        "250,000 BDT",
        "300,000 BDT",
        "270,000 BDT",
        "200,000 BDT"
       ],
       "answer": 0,
       "explain": "Value = 200 × 1,500 − 500 × 100 = 300,000 − 50,000 = 250,000 BDT. Every contact costs money, including the 200 true positives."
      },
      {
       "q": "A team predicts 'healthcare spending' as a stand-in for 'healthcare need'. What is the main risk?",
       "options": [
        "Spending data is always too small and too noisy to train any reliable model at all",
        "The proxy can encode unequal access, so the model may under-serve some groups",
        "Regression cannot be used for healthcare questions",
        "The model will be too slow to serve predictions"
       ],
       "answer": 1,
       "explain": "Proxy targets can diverge from the real goal and carry historical bias into the model's decisions."
      },
      {
       "q": "For a daily demand forecast, which is a sensible baseline?",
       "options": [
        "Predict zero demand every day",
        "Use a deep neural network as the baseline",
        "Predict the largest value ever recorded",
        "Predict the value from the same weekday last week"
       ],
       "answer": 3,
       "explain": "A seasonal naive forecast is a simple, strong baseline for daily data with weekly patterns."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l3",
   "title": "Vectors, Matrices and Similarity",
   "subtitle": "The linear algebra that sits inside every dataset, model and embedding",
   "minutes": 24,
   "objectives": [
    "Represent examples as vectors and datasets as matrices",
    "Compute dot products, norms, distances and cosine similarity by hand",
    "Read matrix shapes and explain what a matrix–vector product does in a model",
    "Use NumPy for basic vector and matrix operations"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "To a model, every example is a list of numbers. A customer becomes `[age, monthly_txns, avg_amount, days_since_login]`; an image becomes thousands of pixel values; a sentence becomes an **embedding** of a few hundred numbers. Linear algebra is the language for working with these lists efficiently."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **vector** is an ordered list of numbers, such as x = (3, 4). A **matrix** is a rectangular grid of numbers. A dataset with n examples and d features is usually stored as an n × d matrix X, one row per example and one column per feature.",
     "title": "Vector and matrix"
    },
    {
     "type": "formula",
     "title": "Core vector operations",
     "items": [
      {
       "name": "Dot product",
       "expr": "a · b = a₁b₁ + a₂b₂ + … + a_d b_d",
       "meaning": "Multiplies matching entries and adds them. A linear model's raw score is a dot product: w · x + b."
      },
      {
       "name": "Euclidean norm (length)",
       "expr": "‖x‖ = √(x₁² + x₂² + … + x_d²)",
       "meaning": "For x = (3, 4): ‖x‖ = √(9 + 16) = √25 = 5."
      },
      {
       "name": "Euclidean distance",
       "expr": "d(a, b) = ‖a − b‖",
       "meaning": "For a = (1, 2) and b = (4, 6): √(3² + 4²) = 5."
      },
      {
       "name": "Cosine similarity",
       "expr": "cos θ = (a · b) ÷ (‖a‖ ‖b‖)",
       "meaning": "Compares direction, not length. Ranges from −1 (opposite) to 1 (same direction)."
      },
      {
       "name": "Worked cosine",
       "expr": "a = (1, 2, 2), b = (2, 0, 1): a · b = 4, ‖a‖ = 3, ‖b‖ = √5 ≈ 2.236",
       "meaning": "cos θ = 4 ÷ (3 × 2.236) ≈ 0.596, a moderate similarity."
      }
     ]
    },
    {
     "type": "table",
     "title": "Shapes you will meet constantly",
     "head": [
      "Object",
      "Shape",
      "Meaning"
     ],
     "rows": [
      [
       "Data matrix X",
       "n × d",
       "n examples (rows), d features (columns)"
      ],
      [
       "Weight vector w",
       "d × 1",
       "One weight per feature in a linear model"
      ],
      [
       "Predictions ŷ = Xw + b",
       "n × 1",
       "One score per example"
      ],
      [
       "Weight matrix W in a neural layer",
       "d_in × d_out",
       "Maps d_in inputs to d_out outputs"
      ],
      [
       "Embedding table",
       "vocabulary size × embedding size",
       "One learned vector per word, item or user"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Matrix–vector product",
     "items": [
      {
       "name": "Definition",
       "expr": "(Xw)ᵢ = Σⱼ Xᵢⱼ wⱼ",
       "meaning": "Each output entry is the dot product of one row of X with w."
      },
      {
       "name": "Worked example",
       "expr": "X = [[1, 2], [3, 4]], w = (0.5, −1)",
       "meaning": "Row 1: 1 × 0.5 + 2 × (−1) = −1.5; row 2: 3 × 0.5 + 4 × (−1) = −2.5; so Xw = (−1.5, −2.5)."
      },
      {
       "name": "Shape rule",
       "expr": "(n × d) times (d × k) gives (n × k)",
       "meaning": "Inner dimensions must match; the outer ones give the result's shape."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Vectors and matrices in NumPy",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "a, b = np.array([1, 2, 2]), np.array([2, 0, 1])",
      "print(a @ b, np.linalg.norm(a))",
      "# output: 4 3.0",
      "cos = a @ b / (np.linalg.norm(a) * np.linalg.norm(b))",
      "print(round(cos, 3))",
      "# output: 0.596",
      "X = np.array([[1, 2], [3, 4]]); w = np.array([0.5, -1])",
      "print(X @ w, X.shape)",
      "# output: [-1.5 -2.5] (2, 2)"
     ],
     "note": "The @ operator performs dot products and matrix multiplication. Vectorised operations like these are far faster than Python loops on large data."
    },
    {
     "type": "compare",
     "title": "Euclidean distance or cosine similarity?",
     "columns": [
      {
       "title": "Euclidean distance",
       "items": [
        "Sensitive to magnitude and scale",
        "Natural for physical measurements and scaled tabular features",
        "Used by k-means and k-nearest neighbours by default",
        "Needs features on comparable scales"
       ]
      },
      {
       "title": "Cosine similarity",
       "items": [
        "Ignores length, compares direction",
        "Natural for text, embeddings and counts",
        "Common in semantic search and recommenders",
        "Two documents of different length can still match well"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "If one feature is 'monthly income in taka' (tens of thousands) and another is 'number of children' (0 to 5), Euclidean distance is dominated by income. Standardise features first, or the 'nearest' neighbours are really just 'similar income'.",
     "title": "Scale before you measure distance"
    },
    {
     "type": "keypoints",
     "items": [
      "Linear and logistic regression compute w · x + b for every example.",
      "A neural network layer is a matrix multiplication followed by a non-linear function.",
      "Embeddings place words, products or users as vectors; similar items have high cosine similarity.",
      "PCA finds new directions (vectors) that capture the most variance in a matrix.",
      "GPUs are fast at ML because they are fast at matrix multiplication."
     ],
     "title": "Why linear algebra matters in ML"
    },
    {
     "type": "scenario",
     "situation": "A Dhaka law firm builds search over thousands of contracts of very different lengths. Each document is turned into an embedding vector. Long contracts produce vectors with larger norms. Which similarity measure should the search use to compare a query with documents?",
     "options": [
      {
       "text": "Cosine similarity, because it compares direction and ignores vector length",
       "feedback": "Correct. Cosine similarity removes the effect of vector magnitude, so a short and a long contract about the same topic can still match closely.",
       "best": true
      },
      {
       "text": "Euclidean distance on the raw vectors",
       "feedback": "Differences in length inflate distances between documents on the same topic, which hurts ranking.",
       "best": false
      },
      {
       "text": "Count of shared words only",
       "feedback": "Word overlap ignores the semantic information captured by embeddings and misses synonyms.",
       "best": false
      },
      {
       "text": "Raw dot product, because larger values mean more relevant documents",
       "feedback": "Raw dot products reward large norms, so long documents would rank high regardless of topic.",
       "best": false
      }
     ],
     "title": "Similarity for document search"
    },
    {
     "type": "reflection",
     "prompt": "Choose a dataset you know. Write one example as a feature vector. Which features have very different scales, and how would that affect a distance-based method?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Vector",
       "def": "An ordered list of numbers representing one example, a set of weights or an embedding."
      },
      {
       "term": "Matrix",
       "def": "A rectangular array of numbers; a dataset is commonly an n × d matrix."
      },
      {
       "term": "Dot product",
       "def": "The sum of products of matching entries of two vectors; the core of linear model scores."
      },
      {
       "term": "Norm",
       "def": "The length of a vector; the Euclidean (L2) norm is the square root of the sum of squares."
      },
      {
       "term": "Cosine similarity",
       "def": "The dot product of two vectors divided by the product of their norms; measures directional similarity."
      },
      {
       "term": "Euclidean distance",
       "def": "The straight-line distance between two points: the norm of their difference."
      },
      {
       "term": "Embedding",
       "def": "A learned dense vector that represents an item such as a word, product or user so that similar items are close."
      },
      {
       "term": "Vectorisation",
       "def": "Writing computations as whole-array operations rather than loops, for speed and clarity."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the Euclidean norm of x = (6, 8)?",
       "options": [
        "10",
        "14",
        "100",
        "48"
       ],
       "answer": 0,
       "explain": "√(36 + 64) = √100 = 10."
      },
      {
       "q": "X has shape 500 × 12 and w has shape 12 × 1. What is the shape of Xw?",
       "options": [
        "12 × 12",
        "12 × 500",
        "500 × 1",
        "500 × 12"
       ],
       "answer": 2,
       "explain": "Inner dimensions (12) match and the result takes the outer dimensions: 500 × 1."
      },
      {
       "q": "Two vectors point in exactly opposite directions. What is their cosine similarity?",
       "options": [
        "0",
        "1",
        "−1",
        "It depends on their lengths"
       ],
       "answer": 2,
       "explain": "Opposite directions give cos 180° = −1 regardless of length."
      },
      {
       "q": "Why should features usually be standardised before using k-nearest neighbours?",
       "options": [
        "Otherwise features with large numeric ranges dominate the distance",
        "Standardisation adds new information to the data",
        "k-nearest neighbours cannot read negative numbers",
        "It converts categorical columns into numbers automatically, so no encoding is needed"
       ],
       "answer": 0,
       "explain": "Distance sums squared differences, so large-scale features swamp the rest unless scales are made comparable."
      },
      {
       "q": "What is the dot product of a = (2, −1, 3) and b = (1, 4, 2)?",
       "options": [
        "8",
        "−4",
        "12",
        "4"
       ],
       "answer": 3,
       "explain": "2 × 1 + (−1) × 4 + 3 × 2 = 2 − 4 + 6 = 4."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l4",
   "title": "Derivatives, Gradients and the Chain Rule",
   "subtitle": "How models know which way to adjust their parameters",
   "minutes": 24,
   "objectives": [
    "Explain a derivative as a rate of change and compute simple derivatives",
    "Compute a gradient of a function of several variables",
    "Apply the chain rule to a composed function",
    "Carry out gradient descent steps by hand and check a gradient numerically"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Training a model means finding parameters that make a **loss** (the error) as small as possible. Calculus tells us, for each parameter, whether increasing it would raise or lower the loss and by how much. That information is the **gradient**, and almost every modern training method is built on it."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "The **derivative** f′(x) is the slope of f at x: how fast f changes when x changes a little. For a function of several parameters, the **gradient** ∇f is the vector of partial derivatives, one per parameter. It points in the direction of steepest increase; moving against it reduces the function fastest.",
     "title": "Derivative and gradient"
    },
    {
     "type": "formula",
     "title": "Derivatives you need",
     "items": [
      {
       "name": "Power rule",
       "expr": "d/dx xⁿ = n xⁿ⁻¹",
       "meaning": "d/dx x² = 2x; at x = 3 the slope is 6."
      },
      {
       "name": "Constant multiple and sum",
       "expr": "d/dx [a·f + g] = a·f′ + g′",
       "meaning": "Derivatives can be taken term by term."
      },
      {
       "name": "Exponential and log",
       "expr": "d/dx eˣ = eˣ;  d/dx ln x = 1/x",
       "meaning": "These appear in logistic regression and cross-entropy loss."
      },
      {
       "name": "Sigmoid",
       "expr": "σ(z) = 1 ÷ (1 + e⁻ᶻ);  σ′(z) = σ(z)(1 − σ(z))",
       "meaning": "At z = 0, σ = 0.5 and σ′ = 0.25, the steepest point of the curve."
      },
      {
       "name": "Chain rule",
       "expr": "d/dx f(g(x)) = f′(g(x)) · g′(x)",
       "meaning": "For (3x + 1)²: 2(3x + 1) × 3 = 6(3x + 1). Backpropagation is the chain rule applied layer by layer."
      }
     ]
    },
    {
     "type": "formula",
     "title": "A gradient by hand",
     "items": [
      {
       "name": "Function",
       "expr": "f(w₁, w₂) = w₁² + 3w₂²",
       "meaning": "A simple bowl-shaped loss with two parameters."
      },
      {
       "name": "Partial derivatives",
       "expr": "∂f/∂w₁ = 2w₁;  ∂f/∂w₂ = 6w₂",
       "meaning": "Treat the other parameter as a constant when differentiating."
      },
      {
       "name": "Gradient at (1, 2)",
       "expr": "∇f = (2 × 1, 6 × 2) = (2, 12)",
       "meaning": "The loss rises much faster along w₂, so w₂ gets the larger correction."
      }
     ]
    },
    {
     "type": "steps",
     "title": "Gradient descent by hand: minimise f(w) = (w − 3)²",
     "items": [
      {
       "title": "Derivative",
       "text": "f′(w) = 2(w − 3). Start at w₀ = 0 with learning rate η = 0.1."
      },
      {
       "title": "Step 1",
       "text": "Gradient = 2(0 − 3) = −6. Update: w₁ = 0 − 0.1 × (−6) = 0.6."
      },
      {
       "title": "Step 2",
       "text": "Gradient = 2(0.6 − 3) = −4.8. Update: w₂ = 0.6 + 0.48 = 1.08."
      },
      {
       "title": "Step 3",
       "text": "Gradient = 2(1.08 − 3) = −3.84. Update: w₃ = 1.08 + 0.384 = 1.464."
      },
      {
       "title": "Pattern",
       "text": "Each step closes 20% of the remaining gap to the minimum at w = 3, so progress slows as the slope flattens."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Checking a derivative numerically",
     "device": "Python notebook",
     "lines": [
      "def f(w): return (w - 3) ** 2",
      "def grad(w): return 2 * (w - 3)",
      "h = 1e-5",
      "numeric = (f(0.6 + h) - f(0.6 - h)) / (2 * h)",
      "print(round(numeric, 4), grad(0.6))",
      "# output: -4.8 -4.8",
      "w = 0.0",
      "for _ in range(50): w -= 0.1 * grad(w)",
      "print(round(w, 4))",
      "# output: 3.0"
     ],
     "note": "A central-difference check confirms that a hand-written gradient is correct. Fifty steps of gradient descent bring w to the minimum at 3."
    },
    {
     "type": "compare",
     "title": "What the learning rate does",
     "columns": [
      {
       "title": "Too small",
       "items": [
        "Tiny steps",
        "Training is slow",
        "May stop early far from the minimum"
       ]
      },
      {
       "title": "About right",
       "items": [
        "Loss falls steadily",
        "Converges in reasonable time",
        "Often found by trying values on a log scale"
       ]
      },
      {
       "title": "Too large",
       "items": [
        "Overshoots the minimum",
        "Loss oscillates or explodes",
        "On (w − 3)², any η > 1 diverges"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A neural network is a long chain of functions: multiply, add, apply an activation, repeat. The chain rule lets us compute the gradient of the final loss with respect to every weight by passing derivatives backwards through the chain. That procedure is **backpropagation**, and automatic differentiation libraries do it for you.",
     "title": "Why the chain rule matters so much"
    },
    {
     "type": "scenario",
     "situation": "A data scientist trains a regression model with gradient descent. The loss goes 120, 340, 1,900, 25,000 and then shows as infinity. The code and data look correct. What is the most likely fix?",
     "options": [
      {
       "text": "Add more features so the model has more capacity",
       "feedback": "Capacity is not the problem. The optimiser is unstable, which more features will not fix.",
       "best": false
      },
      {
       "text": "Train for more epochs so it eventually settles",
       "feedback": "A diverging run does not settle; more epochs only push the numbers further towards overflow.",
       "best": false
      },
      {
       "text": "Reduce the learning rate, for example by a factor of 10",
       "feedback": "Correct. A loss that grows with each step is the classic sign of overshooting: steps are too large for the curvature of the loss.",
       "best": true
      },
      {
       "text": "Increase the learning rate so it escapes the bad region",
       "feedback": "Larger steps make overshooting worse; the loss would explode faster.",
       "best": false
      }
     ],
     "title": "Diverging training loss"
    },
    {
     "type": "reflection",
     "prompt": "In your own words, explain to a colleague why moving against the gradient reduces the loss. Use a hill-walking analogy and say what the learning rate corresponds to."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Derivative",
       "def": "The instantaneous rate of change of a function with respect to its input; the slope of the curve."
      },
      {
       "term": "Partial derivative",
       "def": "The derivative of a multi-variable function with respect to one variable, holding the others fixed."
      },
      {
       "term": "Gradient",
       "def": "The vector of partial derivatives of a function; it points in the direction of steepest increase."
      },
      {
       "term": "Chain rule",
       "def": "The rule for differentiating composed functions: multiply the outer derivative by the inner derivative."
      },
      {
       "term": "Loss function",
       "def": "A function that measures how wrong a model's predictions are; training tries to minimise it."
      },
      {
       "term": "Learning rate",
       "def": "The step size used when updating parameters in the direction opposite to the gradient."
      },
      {
       "term": "Gradient check",
       "def": "Comparing an analytic gradient with a numerical finite-difference estimate to catch bugs."
      },
      {
       "term": "Sigmoid",
       "def": "The S-shaped function 1 ÷ (1 + e⁻ᶻ) that maps any real number into the interval (0, 1)."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the derivative of f(x) = 4x³?",
       "options": [
        "4x²",
        "12x²",
        "12x³",
        "3x⁴"
       ],
       "answer": 1,
       "explain": "Power rule: 4 × 3 × x² = 12x²."
      },
      {
       "q": "For f(w₁, w₂) = 2w₁² + w₂², what is the gradient at (1, 3)?",
       "options": [
        "(4, 6)",
        "(2, 9)",
        "(4, 3)",
        "(2, 6)"
       ],
       "answer": 0,
       "explain": "∂f/∂w₁ = 4w₁ = 4 and ∂f/∂w₂ = 2w₂ = 6."
      },
      {
       "q": "Minimising f(w) = (w − 5)² from w = 1 with learning rate 0.25, what is w after one step?",
       "options": [
        "2",
        "1.5",
        "3",
        "5"
       ],
       "answer": 2,
       "explain": "Gradient = 2(1 − 5) = −8; w = 1 − 0.25 × (−8) = 3."
      },
      {
       "q": "Which statement about the sigmoid derivative is correct?",
       "options": [
        "It equals 1 everywhere, so gradients never shrink",
        "It equals σ(z)(1 − σ(z)) and peaks at 0.25 when z = 0",
        "It is largest when z is very large and positive, so big scores learn fastest",
        "It is undefined at z = 0"
       ],
       "answer": 1,
       "explain": "σ′ = σ(1 − σ), maximised at σ = 0.5, giving 0.25; it shrinks towards 0 for large |z|."
      },
      {
       "q": "What does backpropagation fundamentally rely on?",
       "options": [
        "Random search over weight values",
        "Sorting the training data by loss",
        "Closed-form matrix inversion for every layer",
        "The chain rule applied through the layers of a network"
       ],
       "answer": 3,
       "explain": "Backpropagation propagates derivatives backwards using the chain rule."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l5",
   "title": "Probability and Statistics for Machine Learning",
   "subtitle": "Uncertainty, Bayes' rule and the distributions behind data and models",
   "minutes": 26,
   "objectives": [
    "Use conditional probability and Bayes' rule, including base rates",
    "Compute and interpret mean, variance, standard deviation and percentiles",
    "Recognise common distributions and where they appear in ML",
    "Distinguish correlation from causation in model results"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Data is noisy and the future is uncertain, so ML is fundamentally about probability. Classifiers output probabilities, losses are often negative log-likelihoods, and evaluation is a statistical estimate. A few core ideas cover most of what a practitioner needs."
    },
    {
     "type": "formula",
     "title": "Probability essentials",
     "items": [
      {
       "name": "Conditional probability",
       "expr": "P(A | B) = P(A and B) ÷ P(B)",
       "meaning": "The probability of A given that B is known to have happened."
      },
      {
       "name": "Bayes' rule",
       "expr": "P(A | B) = P(B | A) × P(A) ÷ P(B)",
       "meaning": "Turns 'how likely is the evidence if A is true' into 'how likely is A given the evidence'."
      },
      {
       "name": "Total probability",
       "expr": "P(B) = P(B | A)P(A) + P(B | not A)P(not A)",
       "meaning": "Used for the denominator of Bayes' rule."
      },
      {
       "name": "Expectation",
       "expr": "E[X] = Σ x · P(x)",
       "meaning": "The long-run average value. A model's expected cost uses the same idea."
      }
     ]
    },
    {
     "type": "steps",
     "title": "Worked Bayes example: a screening test",
     "items": [
      {
       "title": "Facts",
       "text": "A condition affects 1% of patients. The test detects 90% of true cases (sensitivity) and wrongly flags 5% of healthy patients."
      },
      {
       "title": "True positives",
       "text": "P(+ and condition) = 0.90 × 0.01 = 0.009."
      },
      {
       "title": "False positives",
       "text": "P(+ and healthy) = 0.05 × 0.99 = 0.0495."
      },
      {
       "title": "All positives",
       "text": "P(+) = 0.009 + 0.0495 = 0.0585."
      },
      {
       "title": "Answer",
       "text": "P(condition | +) = 0.009 ÷ 0.0585 ≈ 0.154. Only about 15% of positive results are real cases, because the condition is rare."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "The same arithmetic applies to fraud alerts, intrusion detection and defect detection. When positives are rare, even an accurate detector produces mostly false alarms. Always check the base rate before judging a model's precision.",
     "title": "The base-rate trap"
    },
    {
     "type": "formula",
     "title": "Describing data",
     "items": [
      {
       "name": "Mean",
       "expr": "x̄ = (1/n) Σ xᵢ",
       "meaning": "For 4, 8, 6, 2: x̄ = 20 ÷ 4 = 5."
      },
      {
       "name": "Variance (sample)",
       "expr": "s² = Σ(xᵢ − x̄)² ÷ (n − 1)",
       "meaning": "Squared deviations 1, 9, 1, 9 sum to 20; s² = 20 ÷ 3 ≈ 6.67."
      },
      {
       "name": "Standard deviation",
       "expr": "s = √s²",
       "meaning": "√6.67 ≈ 2.58, in the same units as the data."
      },
      {
       "name": "z-score",
       "expr": "z = (x − x̄) ÷ s",
       "meaning": "For x = 8: (8 − 5) ÷ 2.58 ≈ 1.16 standard deviations above the mean."
      }
     ]
    },
    {
     "type": "table",
     "title": "Distributions you will meet",
     "head": [
      "Distribution",
      "Describes",
      "Where it appears in ML"
     ],
     "rows": [
      [
       "Bernoulli",
       "One yes/no trial with probability p",
       "Binary labels; logistic regression's output"
      ],
      [
       "Binomial",
       "Number of successes in n trials",
       "Count of conversions in a campaign"
      ],
      [
       "Normal (Gaussian)",
       "Symmetric bell curve with mean μ and spread σ",
       "Measurement noise; linear regression assumptions; weight initialisation"
      ],
      [
       "Poisson",
       "Counts of events in a fixed interval",
       "Calls per hour at a hospital helpdesk; defects per batch"
      ],
      [
       "Uniform",
       "All values in a range equally likely",
       "Random search over hyperparameters"
      ],
      [
       "Long-tailed (e.g. log-normal)",
       "Many small values, a few huge ones",
       "Transaction amounts, incomes, page views"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Summary statistics and Bayes in Python",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "x = np.array([4, 8, 6, 2])",
      "print(x.mean(), round(x.std(ddof=1), 2), np.percentile(x, 50))",
      "# output: 5.0 2.58 5.0",
      "prior, sens, fpr = 0.01, 0.90, 0.05",
      "posterior = sens * prior / (sens * prior + fpr * (1 - prior))",
      "print(round(posterior, 3))",
      "# output: 0.154"
     ],
     "note": "ddof=1 gives the sample standard deviation (dividing by n − 1). NumPy's default, ddof=0, divides by n."
    },
    {
     "type": "compare",
     "title": "Correlation is not causation",
     "columns": [
      {
       "title": "What a model learns",
       "items": [
        "Associations present in historical data",
        "Feature X helps predict Y",
        "Good for forecasting and ranking"
       ]
      },
      {
       "title": "What a decision often needs",
       "items": [
        "The effect of changing X on Y",
        "Requires experiments or causal methods",
        "Needed for pricing, policy or treatment choices"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Across a year, ice-cream sales and drowning incidents rise together, because both increase in hot weather. A model can use ice-cream sales to predict drownings, but banning ice cream would not save swimmers. Before acting on a feature's importance, ask whether it causes the outcome or merely travels with it.",
     "title": "Ice cream and drowning"
    },
    {
     "type": "scenario",
     "situation": "A payments company deploys a fraud detector that catches 95% of fraud and flags 2% of legitimate transactions. Fraud is 1 in 1,000 transactions. The operations manager expects most flagged transactions to be fraud. What should you tell her?",
     "options": [
      {
       "text": "About 95% of flags will be legitimate, so plan review capacity and customer friction accordingly",
       "feedback": "Correct. Per 100,000 transactions: 95 frauds caught and about 1,998 false alarms, so precision is roughly 95 ÷ 2,093 ≈ 4.5%.",
       "best": true
      },
      {
       "text": "The detector is useless and should be switched off immediately",
       "feedback": "It still raises the fraud rate among flags from 0.1% to about 4.5%, a 45-fold lift. It needs a second-stage review, not removal.",
       "best": false
      },
      {
       "text": "About 50% of flags will be fraud, because errors balance out",
       "feedback": "There is no balancing effect; the exact figure follows from Bayes' rule and is far below 50%.",
       "best": false
      },
      {
       "text": "About 95% of flags will be real fraud, matching the detection rate",
       "feedback": "This confuses P(flag | fraud) with P(fraud | flag). The base rate is very low, so false alarms dominate.",
       "best": false
      }
     ],
     "title": "Interpreting a fraud alert rate"
    },
    {
     "type": "reflection",
     "prompt": "Find one statistic you report regularly (an average, a rate or a percentage). Is the distribution skewed? Would the median or a percentile tell a more honest story?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Conditional probability",
       "def": "The probability of an event given that another event has occurred, written P(A | B)."
      },
      {
       "term": "Bayes' rule",
       "def": "A formula that updates a prior probability using evidence: P(A | B) = P(B | A)P(A) ÷ P(B)."
      },
      {
       "term": "Prior",
       "def": "The probability of a hypothesis before seeing the current evidence; in classification, often the base rate."
      },
      {
       "term": "Posterior",
       "def": "The updated probability of a hypothesis after taking the evidence into account."
      },
      {
       "term": "Variance",
       "def": "The average squared deviation from the mean; a measure of spread."
      },
      {
       "term": "Standard deviation",
       "def": "The square root of the variance, in the original units of the data."
      },
      {
       "term": "Normal distribution",
       "def": "The symmetric bell-shaped distribution defined by a mean and a standard deviation."
      },
      {
       "term": "Percentile",
       "def": "The value below which a given percentage of observations fall; the 50th percentile is the median."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A disease affects 2% of people. A test has 80% sensitivity and a 10% false positive rate. Roughly what is P(disease | positive)?",
       "options": [
        "About 80%",
        "About 2%",
        "About 50%",
        "About 14%"
       ],
       "answer": 3,
       "explain": "0.8 × 0.02 = 0.016; 0.1 × 0.98 = 0.098; 0.016 ÷ 0.114 ≈ 0.14."
      },
      {
       "q": "What is the sample variance of 1, 3, 5?",
       "options": [
        "2.67",
        "4",
        "3",
        "2"
       ],
       "answer": 1,
       "explain": "Mean 3; squared deviations 4, 0, 4 sum to 8; 8 ÷ (3 − 1) = 4."
      },
      {
       "q": "Which distribution best describes the number of calls a hospital helpdesk receives per hour?",
       "options": [
        "Bernoulli",
        "Uniform",
        "Poisson",
        "Normal with negative values"
       ],
       "answer": 2,
       "explain": "Poisson models counts of independent events in a fixed interval."
      },
      {
       "q": "A feature strongly predicts loan default. What can you safely conclude?",
       "options": [
        "It is associated with default in this data, but that does not show it causes default",
        "Changing the feature for a customer will change their default risk by the same amount",
        "It must be removed because correlated features are unfair",
        "The model has proven a causal mechanism"
       ],
       "answer": 0,
       "explain": "Predictive association is not causation; causal claims need experiments or causal analysis."
      },
      {
       "q": "Transaction amounts are heavily right-skewed. Which summary best describes a typical transaction?",
       "options": [
        "The mean",
        "The median",
        "The maximum",
        "The variance"
       ],
       "answer": 1,
       "explain": "In skewed data, a few huge values pull the mean upwards; the median is more representative."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m2",
 "order": 2,
 "code": "Prepare",
 "title": "Data Preparation and Feature Engineering",
 "subtitle": "Turn raw, messy data into clean, leak-free features a model can learn from",
 "outcomes": [
  "Assess data sources, label quality and representativeness before modelling",
  "Clean missing values, outliers and duplicates without destroying signal or leaking information",
  "Encode categorical features and scale numeric ones appropriately for each model family",
  "Engineer point-in-time features from dates, behaviour, ratios and text",
  "Build pipelines that handle imbalance and feature selection safely"
 ],
 "lessons": [
  {
   "id": "m2-l1",
   "title": "Data Sourcing, Labelling and Quality",
   "subtitle": "Where training data comes from, how labels are made and how to know if they can be trusted",
   "minutes": 24,
   "objectives": [
    "Identify common data sources and the risks each brings",
    "Design a labelling process with clear guidelines and quality checks",
    "Measure label agreement with Cohen's kappa",
    "Profile a dataset for the main dimensions of data quality"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A model can never be better than the data it learns from. Before any cleaning or feature work, a practitioner asks three questions: **where did this data come from, how were the labels made, and does it represent the cases the model will face?** Problems found here are cheap to fix; problems found after deployment are not."
    },
    {
     "type": "table",
     "title": "Common data sources and their typical risks",
     "head": [
      "Source",
      "Examples",
      "Typical risks"
     ],
     "rows": [
      [
       "Operational systems",
       "Core banking, ERP, hospital records, point-of-sale",
       "Fields reused for other purposes, silent schema changes, missing history"
      ],
      [
       "Event and log data",
       "App clicks, wallet transactions, machine sensors",
       "Duplicates, clock skew, bot traffic, huge volume"
      ],
      [
       "Human labelling",
       "Annotated X-rays, tagged complaints, reviewed fraud cases",
       "Inconsistent guidelines, fatigue, labeller bias"
      ],
      [
       "Surveys and forms",
       "Customer feedback, field surveys in rural districts",
       "Self-selection, missing answers, leading questions"
      ],
      [
       "External and open data",
       "Weather, census, public datasets",
       "Licence limits, different definitions, stale updates"
      ],
      [
       "Synthetic data",
       "Simulated transactions, generated text",
       "May not reflect real-world edge cases or noise"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Building a reliable labelling process",
     "items": [
      {
       "title": "Write guidelines",
       "text": "Define each label with examples, counter-examples and rules for edge cases."
      },
      {
       "title": "Pilot",
       "text": "Have several labellers label the same small batch, then discuss disagreements."
      },
      {
       "title": "Measure agreement",
       "text": "Compute agreement such as Cohen's kappa; refine guidelines until it is acceptable."
      },
      {
       "title": "Label at scale",
       "text": "Use trained labellers, with a share of items labelled twice for ongoing checks."
      },
      {
       "title": "Audit",
       "text": "A senior reviewer samples labels regularly; track error types and labeller drift."
      },
      {
       "title": "Version",
       "text": "Store labels with guideline version, labeller and date so you can trace changes."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Measuring label agreement",
     "items": [
      {
       "name": "Observed agreement",
       "expr": "p_o = items where both labellers agree ÷ total items",
       "meaning": "Raw agreement can look high just by chance when one label dominates."
      },
      {
       "name": "Chance agreement (two labels)",
       "expr": "p_e = p₁(yes) × p₂(yes) + p₁(no) × p₂(no)",
       "meaning": "Probability the two labellers would agree if they labelled at random with their own rates."
      },
      {
       "name": "Cohen's kappa",
       "expr": "κ = (p_o − p_e) ÷ (1 − p_e)",
       "meaning": "1 means perfect agreement, 0 means no better than chance."
      },
      {
       "name": "Worked example",
       "expr": "p_o = 0.85; each labeller says 'urgent' 50% of the time, so p_e = 0.25 + 0.25 = 0.5",
       "meaning": "κ = (0.85 − 0.5) ÷ (1 − 0.5) = 0.70, usually read as substantial agreement."
      }
     ]
    },
    {
     "type": "framework",
     "title": "Six dimensions of data quality",
     "items": [
      {
       "label": "Q1",
       "title": "Completeness",
       "text": "Are required values present? What share of each column is missing?"
      },
      {
       "label": "Q2",
       "title": "Validity",
       "text": "Do values follow rules and formats, such as dates that exist and ages above zero?"
      },
      {
       "label": "Q3",
       "title": "Accuracy",
       "text": "Do values match reality? Spot-check against a trusted source."
      },
      {
       "label": "Q4",
       "title": "Consistency",
       "text": "Do the same facts agree across tables and systems?"
      },
      {
       "label": "Q5",
       "title": "Timeliness",
       "text": "Is the data fresh enough, and are timestamps reliable?"
      },
      {
       "label": "Q6",
       "title": "Uniqueness",
       "text": "Are records duplicated, for example the same transaction logged twice?"
      }
     ]
    },
    {
     "type": "cli",
     "title": "A first data profile with pandas",
     "device": "Python notebook",
     "lines": [
      "import pandas as pd",
      "df = pd.DataFrame({'age': [34, None, 29, 41, 29], 'district': ['Dhaka', 'Sylhet', None, 'Dhaka', None],",
      "                   'amount': [1200, 560, 560, 98000, 560]})",
      "print(df.isna().sum().to_dict())",
      "# output: {'age': 1, 'district': 2, 'amount': 0}",
      "print(df.duplicated().sum(), df['amount'].median())",
      "# output: 1 560.0",
      "print(df['district'].fillna('Unknown').value_counts().sort_index().to_dict())",
      "# output: {'Dhaka': 2, 'Sylhet': 1, 'Unknown': 2}"
     ],
     "note": "Count missing values per column, exact duplicate rows and category frequencies before anything else. The 98,000 amount also deserves a question: is it real or a data entry error?"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A million rows from Dhaka users tell you little about rural users in Rangpur. Check that the training data covers the populations, devices, seasons and conditions the model will meet. Missing groups lead to models that work well on average but fail for exactly the people who were left out.",
     "title": "Representativeness beats volume"
    },
    {
     "type": "scenario",
     "situation": "Two nurses label 400 triage notes as 'urgent' or 'routine'. They agree on 88% of notes, but kappa is only 0.35 because nearly all notes are routine. The project lead wants to start labelling 50,000 notes. What should happen next?",
     "options": [
      {
       "text": "Train the model first and let it decide the ambiguous cases",
       "feedback": "A model trained on inconsistent labels learns the inconsistency. Label quality must be fixed upstream.",
       "best": false
      },
      {
       "text": "Use only one nurse to avoid disagreements",
       "feedback": "Disagreement would still exist; it would just be invisible. One labeller's personal threshold becomes the model's definition.",
       "best": false
      },
      {
       "text": "Review the disagreements, sharpen the definition of 'urgent', and re-pilot before scaling",
       "feedback": "Correct. Low kappa with high raw agreement means the labellers mostly agree on easy routine cases and disagree on the rare urgent ones, which are the cases that matter.",
       "best": true
      },
      {
       "text": "Start labelling now, since 88% agreement is high",
       "feedback": "Raw agreement is inflated by the dominant routine class. Scaling now would bake inconsistent urgent labels into the dataset.",
       "best": false
      }
     ],
     "title": "A labelling disagreement"
    },
    {
     "type": "checklist",
     "title": "Data readiness checklist",
     "items": [
      "The source, owner and refresh process of each table are documented",
      "The label definition is written down and matches the problem framing",
      "Label agreement has been measured on a pilot sample",
      "Missing values, duplicates and invalid values have been profiled",
      "The data covers the populations and conditions the model will serve",
      "Personal data is minimised and access is approved",
      "Licences and consent allow the intended use"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of a dataset you rely on. Who created the labels or key fields, under what instructions, and how would you find out whether they are consistent?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Data provenance",
       "def": "A record of where data came from and how it was transformed on the way to the model."
      },
      {
       "term": "Annotation guidelines",
       "def": "Written rules and examples that tell labellers how to assign each label consistently."
      },
      {
       "term": "Inter-annotator agreement",
       "def": "The degree to which independent labellers assign the same labels to the same items."
      },
      {
       "term": "Cohen's kappa",
       "def": "An agreement statistic for two labellers that corrects for agreement expected by chance."
      },
      {
       "term": "Data profiling",
       "def": "Systematic summary of a dataset's columns, types, ranges, missing values and duplicates."
      },
      {
       "term": "Representativeness",
       "def": "How well a dataset reflects the population and conditions where the model will be used."
      },
      {
       "term": "Label noise",
       "def": "Errors or inconsistencies in the target labels of a training set."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Two labellers agree on 90% of items and chance agreement is 0.6. What is Cohen's kappa?",
       "options": [
        "0.75",
        "0.90",
        "0.30",
        "0.50"
       ],
       "answer": 0,
       "explain": "κ = (0.9 − 0.6) ÷ (1 − 0.6) = 0.3 ÷ 0.4 = 0.75."
      },
      {
       "q": "Why can raw percentage agreement be misleading?",
       "options": [
        "It ignores the number of labellers' working hours",
        "It can only be computed for numeric labels",
        "When one label dominates, labellers agree often by chance alone",
        "It always underestimates true agreement, because labellers are usually stricter than needed"
       ],
       "answer": 2,
       "explain": "With a dominant class, two careless labellers would still agree on most items; kappa corrects for this."
      },
      {
       "q": "Which data quality dimension does 'the same transaction appears twice in the log' violate?",
       "options": [
        "Timeliness",
        "Uniqueness",
        "Validity",
        "Completeness"
       ],
       "answer": 1,
       "explain": "Duplicate records break uniqueness and can bias both training and evaluation."
      },
      {
       "q": "A credit model is trained only on applicants who were approved in the past. What is the main concern?",
       "options": [
        "The dataset will be too large to process",
        "Approved applicants never have missing values, so imputation will not be needed",
        "Labels for approved applicants are always noisy",
        "The data does not represent rejected applicants the model will now score"
       ],
       "answer": 3,
       "explain": "Outcomes are only known for approved loans, so the training data is not representative of all applicants, a form of selection bias."
      },
      {
       "q": "What should be stored alongside each label for traceability?",
       "options": [
        "Only the final model's prediction",
        "A screenshot of the labelling tool for every item",
        "The labeller's salary band",
        "The guideline version, labeller and date"
       ],
       "answer": 3,
       "explain": "Versioned guidelines, labeller identity and timestamps let you trace and fix label problems later."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l2",
   "title": "Cleaning Data: Missing Values, Outliers and Duplicates",
   "subtitle": "Decide carefully what to fix, what to flag and what to leave alone",
   "minutes": 24,
   "objectives": [
    "Diagnose why values are missing and choose a suitable strategy",
    "Detect outliers with the IQR rule and decide how to treat them",
    "Remove duplicates and fix invalid values safely",
    "Fit cleaning steps on training data only to avoid leakage"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Cleaning is not about making data look tidy. It is about making it **truthful and usable** without destroying signal. A missing value can be informative, an outlier can be the fraud you want to catch, and an over-eager fix can leak test information into training."
    },
    {
     "type": "table",
     "title": "Why values go missing",
     "head": [
      "Mechanism",
      "Meaning",
      "Example",
      "Implication"
     ],
     "rows": [
      [
       "Missing completely at random (MCAR)",
       "Missingness unrelated to anything",
       "A sensor drops readings randomly due to a loose cable",
       "Simple imputation is reasonably safe"
      ],
      [
       "Missing at random (MAR)",
       "Missingness depends on other observed columns",
       "Older patients skip an online form field more often",
       "Impute using related columns"
      ],
      [
       "Missing not at random (MNAR)",
       "Missingness depends on the missing value itself",
       "High earners decline to state income",
       "Missingness carries signal; add an indicator and model it"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Options for missing values",
     "columns": [
      {
       "title": "Drop",
       "items": [
        "Drop rows: only if few rows and missingness is random",
        "Drop columns: if mostly empty and not useful",
        "Risk: bias and lost data"
       ]
      },
      {
       "title": "Impute",
       "items": [
        "Median for skewed numbers, mean for symmetric",
        "Most frequent or 'Unknown' for categories",
        "Model-based (k-NN, iterative) for related columns",
        "Always fit on training data only"
       ]
      },
      {
       "title": "Flag",
       "items": [
        "Add a binary 'was_missing' column",
        "Lets the model learn if missingness matters",
        "Cheap and often powerful",
        "Tree models can also handle missing values natively"
       ]
      }
     ]
    },
    {
     "type": "formula",
     "title": "Detecting outliers",
     "items": [
      {
       "name": "Interquartile range",
       "expr": "IQR = Q3 − Q1",
       "meaning": "The spread of the middle 50% of the data."
      },
      {
       "name": "Tukey fences",
       "expr": "lower = Q1 − 1.5 × IQR;  upper = Q3 + 1.5 × IQR",
       "meaning": "Points outside the fences are flagged as potential outliers."
      },
      {
       "name": "Worked example",
       "expr": "Q1 = 400, Q3 = 1,000 BDT, so IQR = 600",
       "meaning": "Fences are 400 − 900 = −500 and 1,000 + 900 = 1,900 BDT. A 98,000 BDT transfer is flagged for review."
      },
      {
       "name": "z-score rule",
       "expr": "|z| = |x − mean| ÷ std > 3",
       "meaning": "Works for roughly normal data; unreliable for skewed data because the outliers inflate the std themselves."
      }
     ]
    },
    {
     "type": "flow",
     "title": "Deciding what to do with an outlier",
     "items": [
      {
       "label": "Detect",
       "text": "IQR, z-score or domain limits"
      },
      {
       "label": "Investigate",
       "text": "Error, rare-but-real, or the target itself?"
      },
      {
       "label": "Fix errors",
       "text": "Correct or remove impossible values"
      },
      {
       "label": "Keep real extremes",
       "text": "Cap, log-transform or use robust models"
      },
      {
       "label": "Document",
       "text": "Record the rule and how many rows it touched"
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "In a fraud model for a mobile financial service, unusually large transfers at 3 a.m. from a new device are exactly the pattern of interest. Deleting outliers would delete the fraud. In contrast, an age of 212 years in a hospital record is an entry error and should be corrected or set to missing.",
     "title": "When the outlier is the point"
    },
    {
     "type": "cli",
     "title": "Imputation without leakage",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.impute import SimpleImputer",
      "X_train = np.array([[1.0], [2.0], [np.nan], [100.0]])",
      "X_test = np.array([[np.nan], [3.0]])",
      "imp = SimpleImputer(strategy='median', add_indicator=True).fit(X_train)",
      "print(imp.transform(X_test).tolist())",
      "# output: [[2.0, 1.0], [3.0, 0.0]]"
     ],
     "note": "The median (2.0) is learned from the training rows only and then applied to the test rows. add_indicator=True appends a 'was missing' flag column."
    },
    {
     "type": "keypoints",
     "items": [
      "**Duplicates**: remove exact duplicates; for near-duplicates (same customer, different spelling) use matching rules.",
      "**Invalid values**: enforce ranges and formats; convert impossible values to missing rather than guessing.",
      "**Inconsistent categories**: unify 'Dhaka', 'dhaka ' and 'DHK' with a mapping table.",
      "**Units and time zones**: convert everything to one unit and one time standard before joining.",
      "**Keep raw data**: clean into a new version so every step can be reproduced and reversed."
     ],
     "title": "Other cleaning steps that matter"
    },
    {
     "type": "scenario",
     "situation": "An analyst fills missing blood pressure values with the mean of the full dataset, then splits into training and test sets. Validation results look slightly better than expected. What is the issue?",
     "options": [
      {
       "text": "Mean imputation is never allowed in medical data",
       "feedback": "Mean or median imputation can be acceptable; the problem here is where the statistic was computed.",
       "best": false
      },
      {
       "text": "There is no issue because imputation does not use the labels",
       "feedback": "Leakage is not only about labels. Using test feature distributions during preparation still lets test information shape training.",
       "best": false
      },
      {
       "text": "The test set should be imputed with zeros instead",
       "feedback": "Zero is not a realistic blood pressure and would distort the test data; the issue is leakage, not the fill value.",
       "best": false
      },
      {
       "text": "The imputation used test-set statistics, a mild form of leakage; fit the imputer on training data only",
       "feedback": "Correct. Any statistic learned from data, including means for imputation, must come from the training split and be applied to validation and test data.",
       "best": true
      }
     ],
     "title": "Imputing before splitting"
    },
    {
     "type": "template",
     "title": "Cleaning log",
     "purpose": "Record every cleaning rule so the pipeline is reproducible and reviewers can judge its effect.",
     "columns": [
      "Step",
      "Column",
      "Rule",
      "Rows affected",
      "Reason",
      "Fitted on"
     ],
     "example": [
      [
       "C-03",
       "monthly_income",
       "Impute median; add was_missing flag",
       "1,842 (6.1%)",
       "Missing more often for self-employed (MAR)",
       "Training split only"
      ],
      [
       "C-04",
       "age",
       "Values < 0 or > 110 set to missing",
       "37",
       "Data entry errors",
       "Rule, not fitted"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "Look at one column in your data with missing values. What is the most likely reason they are missing, and would a 'was missing' flag carry useful signal?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Imputation",
       "def": "Filling missing values with estimates such as the median, the most frequent value or a model prediction."
      },
      {
       "term": "Missing indicator",
       "def": "A binary feature recording whether a value was originally missing."
      },
      {
       "term": "MCAR",
       "def": "Missing completely at random: missingness unrelated to any data, observed or not."
      },
      {
       "term": "MNAR",
       "def": "Missing not at random: missingness depends on the unobserved value itself."
      },
      {
       "term": "Outlier",
       "def": "An observation far from most others; it may be an error or a genuine rare event."
      },
      {
       "term": "Interquartile range (IQR)",
       "def": "The difference between the 75th and 25th percentiles; a robust measure of spread."
      },
      {
       "term": "Winsorising",
       "def": "Capping extreme values at chosen percentiles instead of removing them."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Q1 = 20 and Q3 = 50. What is the upper Tukey fence?",
       "options": [
        "80",
        "95",
        "75",
        "65"
       ],
       "answer": 1,
       "explain": "IQR = 30; upper fence = 50 + 1.5 × 30 = 95."
      },
      {
       "q": "High-income respondents often skip the income question. What type of missingness is this?",
       "options": [
        "Missing completely at random",
        "Missing at random",
        "Missing not at random",
        "Not missing at all"
       ],
       "answer": 2,
       "explain": "Missingness depends on the value that is missing, which is MNAR."
      },
      {
       "q": "Where should an imputer's statistics, such as the median, be computed?",
       "options": [
        "On the training split only",
        "On the full dataset before splitting",
        "On the test split only",
        "On a random half of the test split"
       ],
       "answer": 0,
       "explain": "Learning statistics from validation or test data leaks information about them into training."
      },
      {
       "q": "In a fraud dataset, several transfers are 50 times larger than typical. What is the BEST first step?",
       "options": [
        "Delete them because they distort the mean",
        "Investigate whether they are errors or genuine rare events before deciding",
        "Replace them with the median amount so the model is not distorted by extremes",
        "Multiply all amounts by a constant"
       ],
       "answer": 1,
       "explain": "Extreme values may be exactly the fraud signal. Investigate first, then fix errors and keep genuine extremes."
      },
      {
       "q": "Why add a missing-indicator column alongside imputation?",
       "options": [
        "To make the dataset smaller",
        "Because models cannot read imputed values unless a flag tells them which ones changed",
        "To remove the need for a test set",
        "So the model can learn whether the fact of missingness predicts the target"
       ],
       "answer": 3,
       "explain": "Missingness often carries signal, especially when it is not random."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l3",
   "title": "Encoding Categories and Scaling Numbers",
   "subtitle": "Turn strings into numbers and put features on comparable scales",
   "minutes": 22,
   "objectives": [
    "Choose between one-hot, ordinal and target encoding",
    "Apply standardisation, min–max scaling and log transforms correctly",
    "Know which models need scaling and which do not",
    "Handle unseen and rare categories safely"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Most algorithms work on numbers, and many assume those numbers are on similar scales. **Encoding** converts categories such as district or device type into numbers; **scaling** puts numeric features on comparable ranges. Both look mechanical, but the wrong choice can mislead a model or leak information."
    },
    {
     "type": "table",
     "title": "Encoding options for categorical features",
     "head": [
      "Method",
      "How it works",
      "Good for",
      "Watch out for"
     ],
     "rows": [
      [
       "One-hot",
       "One binary column per category",
       "Nominal categories with few levels (payment method)",
       "Many columns for high-cardinality features"
      ],
      [
       "Ordinal",
       "Map ordered levels to integers",
       "Truly ordered categories (education level, risk grade)",
       "Implies order and equal spacing; wrong for nominal data in linear models"
      ],
      [
       "Target (mean) encoding",
       "Replace category with a smoothed mean of the target",
       "High-cardinality features (merchant ID, upazila)",
       "Leakage unless computed out-of-fold"
      ],
      [
       "Frequency encoding",
       "Replace category with its count or share",
       "High-cardinality features where popularity matters",
       "Different categories can share the same value"
      ],
      [
       "Hashing",
       "Hash categories into a fixed number of columns",
       "Huge, changing vocabularies",
       "Collisions; hard to interpret"
      ],
      [
       "Learned embeddings",
       "Dense vectors learned by a neural network",
       "Very high cardinality with lots of data",
       "Needs a neural model and enough data"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Scaling and encoding formulas",
     "items": [
      {
       "name": "Standardisation",
       "expr": "z = (x − μ) ÷ σ",
       "meaning": "Mean 0, standard deviation 1. With μ = 50,000 and σ = 20,000 BDT, an income of 90,000 becomes 2.0."
      },
      {
       "name": "Min–max scaling",
       "expr": "x′ = (x − min) ÷ (max − min)",
       "meaning": "Maps to [0, 1]. With min 0 and max 200, the value 50 becomes 0.25. Sensitive to outliers."
      },
      {
       "name": "Log transform",
       "expr": "x′ = log(1 + x)",
       "meaning": "Compresses long right tails such as transaction amounts; log1p handles zeros."
      },
      {
       "name": "Smoothed target encoding",
       "expr": "enc = (n × mean_cat + m × mean_global) ÷ (n + m)",
       "meaning": "With n = 4 rows, category mean 0.5, global mean 0.1 and m = 10: (2 + 1) ÷ 14 ≈ 0.214. Rare categories shrink towards the global mean."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Does the model need scaled features?",
     "columns": [
      {
       "title": "Scaling matters",
       "items": [
        "Linear and logistic regression with regularisation",
        "k-nearest neighbours and k-means",
        "Support vector machines",
        "Neural networks",
        "PCA"
       ]
      },
      {
       "title": "Scaling barely matters",
       "items": [
        "Decision trees",
        "Random forests",
        "Gradient-boosted trees",
        "Rule-based models"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "One-hot encoding and scaling together",
     "device": "Python notebook",
     "lines": [
      "import pandas as pd",
      "from sklearn.compose import ColumnTransformer",
      "from sklearn.preprocessing import OneHotEncoder, StandardScaler",
      "df = pd.DataFrame({'channel': ['app', 'agent', 'app', 'ussd'], 'amount': [100.0, 300.0, 500.0, 700.0]})",
      "ct = ColumnTransformer([('cat', OneHotEncoder(handle_unknown='ignore'), ['channel']),",
      "                        ('num', StandardScaler(), ['amount'])], sparse_threshold=0)",
      "out = ct.fit_transform(df)",
      "print(ct.get_feature_names_out().tolist())",
      "# output: ['cat__channel_agent', 'cat__channel_app', 'cat__channel_ussd', 'num__amount']",
      "print(out[0].round(3).tolist())",
      "# output: [0.0, 1.0, 0.0, -1.342]",
      "print(ct.transform(pd.DataFrame({'channel': ['bank'], 'amount': [400.0]})).tolist())",
      "# output: [[0.0, 0.0, 0.0, 0.0]]"
     ],
     "note": "handle_unknown='ignore' turns an unseen category ('bank') into all zeros instead of crashing in production. StandardScaler uses the population standard deviation (about 223.6), so 100 becomes (100 − 400) ÷ 223.6 ≈ −1.342."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If a category's target mean is computed on all training rows, each row's own label contributes to its feature, and the model learns to trust a value that will not behave the same way on new data. Compute target encodings within cross-validation folds (each row encoded using other folds only) and add smoothing for rare categories.",
     "title": "Target encoding leaks unless done out-of-fold"
    },
    {
     "type": "keypoints",
     "items": [
      "Fit encoders and scalers on training data only; apply the fitted object to validation, test and production data.",
      "Group rare categories (for example under 1% of rows) into 'Other' to reduce noise.",
      "Decide in advance what happens to unseen categories in production.",
      "Use ordinal encoding for nominal categories only with tree models, where the arbitrary order does little harm.",
      "Keep the fitted transformers with the model; they are part of it."
     ],
     "title": "Practical rules"
    },
    {
     "type": "scenario",
     "situation": "A microfinance lender in Bangladesh wants to use the borrower's upazila (about 480 sub-districts) in a logistic regression default model. Some upazilas have only a handful of loans. Which approach is most suitable?",
     "options": [
      {
       "text": "Plain target encoding using each upazila's default rate on all training rows",
       "feedback": "Without out-of-fold computation and smoothing, small upazilas leak their own labels and get extreme, noisy values.",
       "best": false
      },
      {
       "text": "Smoothed target encoding computed out-of-fold, with rare upazilas shrunk towards the global rate",
       "feedback": "Correct. This captures each area's risk in one column, avoids hundreds of sparse columns and controls leakage and noise for small groups.",
       "best": true
      },
      {
       "text": "Drop the feature because it has too many categories",
       "feedback": "Location can carry real signal about risk; high cardinality is a reason to encode carefully, not to discard it.",
       "best": false
      },
      {
       "text": "Ordinal encoding with upazilas numbered alphabetically",
       "feedback": "Alphabetical numbers imply a meaningless order; a linear model would treat upazila 400 as 'more' than upazila 10.",
       "best": false
      }
     ],
     "title": "Encoding 480 upazilas"
    },
    {
     "type": "reflection",
     "prompt": "List the categorical columns in a dataset you know. For each, note its number of levels, whether it is ordered, and which encoding you would use with a linear model and with a tree model."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "One-hot encoding",
       "def": "Representing a categorical value as a set of binary columns, one per category."
      },
      {
       "term": "Ordinal encoding",
       "def": "Mapping ordered categories to integers that preserve their order."
      },
      {
       "term": "Target encoding",
       "def": "Replacing a category with a statistic of the target, such as its smoothed mean, for that category."
      },
      {
       "term": "High cardinality",
       "def": "A categorical feature with a very large number of distinct values."
      },
      {
       "term": "Standardisation",
       "def": "Rescaling a feature to mean 0 and standard deviation 1."
      },
      {
       "term": "Min–max scaling",
       "def": "Rescaling a feature linearly into a fixed range, usually 0 to 1."
      },
      {
       "term": "Log transform",
       "def": "Applying a logarithm to compress large values and reduce right skew."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A feature has mean 40 and standard deviation 8. What is the standardised value of 52?",
       "options": [
        "1.5",
        "12",
        "0.67",
        "−1.5"
       ],
       "answer": 0,
       "explain": "(52 − 40) ÷ 8 = 1.5."
      },
      {
       "q": "Which model is least affected by whether features are scaled?",
       "options": [
        "k-nearest neighbours",
        "A neural network",
        "A random forest",
        "Regularised logistic regression"
       ],
       "answer": 2,
       "explain": "Tree splits depend on the order of values, not their scale."
      },
      {
       "q": "Why is plain target encoding on all training rows risky?",
       "options": [
        "It produces too many columns",
        "It only works for numeric features",
        "Each row's own label influences its feature value, leaking the target",
        "It cannot represent more than ten categories"
       ],
       "answer": 2,
       "explain": "Computing encodings out-of-fold prevents a row's label from shaping its own feature."
      },
      {
       "q": "A category has 2 rows with target mean 1.0; global mean is 0.2; smoothing m = 8. What is the smoothed encoding?",
       "options": [
        "0.36",
        "1.00",
        "0.20",
        "0.60"
       ],
       "answer": 0,
       "explain": "(2 × 1.0 + 8 × 0.2) ÷ (2 + 8) = 3.6 ÷ 10 = 0.36."
      },
      {
       "q": "What does handle_unknown='ignore' in a one-hot encoder achieve?",
       "options": [
        "Unknown categories are silently dropped from the training set before the encoder is fitted",
        "Missing values are imputed with the mode",
        "Rare categories are merged automatically",
        "Unseen categories in production become all-zero columns instead of causing an error"
       ],
       "answer": 3,
       "explain": "It makes the encoder robust to categories that did not appear during training."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l4",
   "title": "Feature Engineering",
   "subtitle": "Create inputs that make the pattern easy for a model to see",
   "minutes": 26,
   "objectives": [
    "Engineer features from dates, aggregates, ratios and text",
    "Use domain knowledge to design meaningful features",
    "Build time-windowed aggregates without looking into the future",
    "Judge when feature engineering beats a more complex model"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A model can only use what it is given. **Feature engineering** reshapes raw data into inputs that expose the pattern: a ratio instead of two raw numbers, a weekday instead of a timestamp, a 30-day transaction count instead of a raw log. On tabular problems, good features often matter more than the choice of algorithm."
    },
    {
     "type": "table",
     "title": "Feature patterns that work again and again",
     "head": [
      "Pattern",
      "Raw data",
      "Engineered feature",
      "Why it helps"
     ],
     "rows": [
      [
       "Date parts",
       "Transaction timestamp",
       "Hour, weekday, month, is_holiday, days to Eid",
       "Exposes daily, weekly and festival cycles"
      ],
      [
       "Recency, frequency, monetary",
       "Transaction log",
       "Days since last txn, txns in 30 days, total amount in 30 days",
       "Summarises behaviour per customer"
      ],
      [
       "Ratios",
       "Debt, income",
       "Debt-to-income ratio",
       "Puts values in context; linear models cannot multiply or divide inputs themselves"
      ],
      [
       "Differences and trends",
       "Monthly usage",
       "This month − average of previous 3 months",
       "Captures change, often more predictive than level"
      ],
      [
       "Interactions",
       "Age, product type",
       "Age × product indicator",
       "Lets linear models express combined effects"
      ],
      [
       "Text signals",
       "Complaint text",
       "Length, keyword flags, TF-IDF or embeddings",
       "Turns unstructured text into numbers"
      ],
      [
       "Geography",
       "Latitude, longitude",
       "Distance to nearest branch or hospital",
       "Encodes access and travel effort"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Feature formulas worth knowing",
     "items": [
      {
       "name": "Cyclical encoding",
       "expr": "hour_sin = sin(2π × hour ÷ 24);  hour_cos = cos(2π × hour ÷ 24)",
       "meaning": "Places 23:00 next to 00:00. At hour 6: sin = 1, cos = 0."
      },
      {
       "name": "Ratio",
       "expr": "debt_to_income = monthly_debt ÷ monthly_income",
       "meaning": "25,000 ÷ 100,000 = 0.25. Guard against division by zero."
      },
      {
       "name": "TF-IDF weight",
       "expr": "tfidf(t, d) = tf(t, d) × log(N ÷ df(t))",
       "meaning": "A word in 10 of 1,000 documents gets idf = ln(100) ≈ 4.6; a word in every document gets 0."
      },
      {
       "name": "Polynomial term",
       "expr": "x², x₁ × x₂",
       "meaning": "Adds curvature or interaction to a linear model."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Every aggregate must be computed using only data available **before** the prediction time. A '30-day transaction count' for a scoring date of 1 March must use 30 January to 28 February, never data from March. Building features from a table that has already been updated with later events is one of the most common causes of leakage.",
     "title": "Point-in-time correctness"
    },
    {
     "type": "cli",
     "title": "Point-in-time aggregates in pandas",
     "device": "Python notebook",
     "lines": [
      "import pandas as pd",
      "tx = pd.DataFrame({'cust': ['A', 'A', 'A', 'B'], 'amount': [500, 700, 900, 300],",
      "                   'date': pd.to_datetime(['2026-02-01', '2026-02-20', '2026-03-05', '2026-02-25'])})",
      "cutoff = pd.Timestamp('2026-03-01')",
      "window = tx[(tx.date < cutoff) & (tx.date >= cutoff - pd.Timedelta(days=30))]",
      "feat = window.groupby('cust').amount.agg(['count', 'sum'])",
      "print(feat.to_dict('index'))",
      "# output: {'A': {'count': 2, 'sum': 1200}, 'B': {'count': 1, 'sum': 300}}"
     ],
     "note": "The 5 March transaction is excluded because it happened after the cut-off. The 30-day window starts on 30 January, so the 1 February transaction is included."
    },
    {
     "type": "steps",
     "title": "A feature engineering loop",
     "items": [
      {
       "title": "Start from hypotheses",
       "text": "Ask domain experts what drives the outcome; write each idea as a candidate feature."
      },
      {
       "title": "Check availability",
       "text": "Confirm each feature can be computed at prediction time in production."
      },
      {
       "title": "Build and validate",
       "text": "Compute the feature, look at its distribution and its relationship with the target."
      },
      {
       "title": "Measure value",
       "text": "Compare cross-validated performance with and without the feature group."
      },
      {
       "title": "Keep it simple",
       "text": "Drop features that add little; every feature has a maintenance and monitoring cost."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A power plant in Chattogram wanted to predict turbine faults. Raw vibration readings gave a weak model. An engineer suggested features for the change in vibration over the last hour and the temperature difference between inlet and outlet. With these two features, a simple gradient-boosted model detected most faults hours earlier than before.",
     "title": "Domain knowledge wins"
    },
    {
     "type": "case",
     "title": "Features for a hospital readmission model",
     "context": "A private hospital in Dhaka wants to predict, at discharge, which patients will be readmitted within 30 days. The first model uses age, sex, ward and length of stay and reaches an AUC of 0.64. The data warehouse also holds diagnosis codes, laboratory results with timestamps, medication lists, previous admissions and follow-up appointment bookings. One analyst proposes adding 'number of outpatient visits in the 30 days after discharge' because it is highly predictive.",
     "questions": [
      "Which proposed feature must be rejected, and why?",
      "Suggest four engineered features likely to add signal at discharge time.",
      "How would you test whether the new features genuinely help?"
     ],
     "answer": "Outpatient visits after discharge happen after the prediction moment, so the feature leaks the future and must be rejected. Useful point-in-time features include the number of admissions in the previous 12 months, days since the last admission, count of chronic conditions from diagnosis codes, whether the last laboratory values before discharge were abnormal, number of medications at discharge, and whether a follow-up appointment was booked before the patient left. Test them by comparing cross-validated AUC (and calibration) with and without each feature group using identical folds, with all aggregates computed only from data timestamped before discharge, then confirm on a later time period held out as a test set."
    },
    {
     "type": "scenario",
     "situation": "A team's churn model has plateaued. One proposal is to move from gradient boosting to a large neural network. Another is to spend two weeks building behavioural features such as recency, trend in monthly usage and failed transaction counts. Data is tabular, 200,000 customers. What is the better next step?",
     "options": [
      {
       "text": "Switch to the large neural network first, since deep learning is more powerful",
       "feedback": "Neural networks rarely beat boosted trees on moderate-sized tabular data, and they do not create missing behavioural signals.",
       "best": false
      },
      {
       "text": "Build the behavioural features and measure their effect with cross-validation",
       "feedback": "Correct. On tabular data, well-designed features usually add more than a change of algorithm, and the gain can be measured directly.",
       "best": true
      },
      {
       "text": "Remove all existing features and start again from raw columns",
       "feedback": "Throwing away working features adds risk and cost without a clear reason.",
       "best": false
      },
      {
       "text": "Collect five more years of history before doing anything",
       "feedback": "More history may help later, but the cheaper, faster lever of better features is available now.",
       "best": false
      }
     ],
     "title": "Choosing between effort options"
    },
    {
     "type": "reflection",
     "prompt": "For a prediction you care about, write down three features an expert in that domain would expect to matter but that are not raw columns in your data. How would you compute each at prediction time?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Feature engineering",
       "def": "Creating new input variables from raw data to make patterns easier for a model to learn."
      },
      {
       "term": "RFM features",
       "def": "Recency, frequency and monetary features summarising customer behaviour over a window."
      },
      {
       "term": "Cyclical encoding",
       "def": "Representing periodic values such as hour or month with sine and cosine so the ends of the cycle are close."
      },
      {
       "term": "Interaction feature",
       "def": "A feature that combines two or more features, such as their product, to capture joint effects."
      },
      {
       "term": "TF-IDF",
       "def": "A text weighting that increases with a word's frequency in a document and decreases with its frequency across documents."
      },
      {
       "term": "Point-in-time correctness",
       "def": "Computing features only from data that existed at the moment of prediction."
      },
      {
       "term": "Aggregation window",
       "def": "The time span, such as the last 30 days, over which a feature is summarised."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why encode hour of day with sine and cosine?",
       "options": [
        "To reduce the number of rows",
        "So that 23:00 and 00:00 are represented as close together",
        "Because most models cannot read integer values such as 23 or 0 directly",
        "To remove the need for a test set"
       ],
       "answer": 1,
       "explain": "Cyclical encoding preserves the circular nature of time; raw 23 and 0 look far apart."
      },
      {
       "q": "A word appears in 100 of 10,000 documents. What is its idf using natural log?",
       "options": [
        "About 4.6",
        "About 2.0",
        "100",
        "About 0.01"
       ],
       "answer": 0,
       "explain": "ln(10,000 ÷ 100) = ln(100) ≈ 4.6."
      },
      {
       "q": "For a scoring date of 1 June, which transactions may feed a '7-day count' feature?",
       "options": [
        "Transactions from 1 June to 7 June",
        "All transactions in June",
        "Transactions from 25 May up to 31 May",
        "Transactions from 25 May to 7 June inclusive"
       ],
       "answer": 2,
       "explain": "Only data before the prediction time may be used; the window ends just before the scoring date."
      },
      {
       "q": "Why can a debt-to-income ratio help a logistic regression more than debt and income separately?",
       "options": [
        "Ratios always have lower variance",
        "A linear model cannot form the ratio from the two raw inputs on its own",
        "Logistic regression only accepts one input",
        "Raw values are always leaked"
       ],
       "answer": 1,
       "explain": "Linear models add weighted inputs; they cannot divide one input by another, so the ratio must be supplied."
      },
      {
       "q": "What is the most reliable way to judge whether a new feature group is worth keeping?",
       "options": [
        "Check whether the feature names sound relevant to the business experts on the team",
        "Count how many features the model has",
        "Look at training accuracy only",
        "Compare cross-validated performance with and without the feature group"
       ],
       "answer": 3,
       "explain": "A controlled comparison on validation data measures the real contribution of the features."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l5",
   "title": "Pipelines, Imbalance and Feature Selection",
   "subtitle": "Package preparation safely, handle rare classes and keep only features that earn their place",
   "minutes": 24,
   "objectives": [
    "Build a preprocessing and model pipeline that prevents leakage",
    "Choose strategies for imbalanced classes, including class weights and resampling",
    "Apply filter, wrapper and embedded feature selection methods",
    "Explain why resampling must only touch training data"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "By now the preparation steps are many: impute, encode, scale, engineer, select. Doing them by hand in a notebook invites mistakes, especially leakage. A **pipeline** chains every step with the model so that one `fit` learns everything from training data and one `predict` applies it consistently everywhere."
    },
    {
     "type": "flow",
     "title": "A typical tabular pipeline",
     "items": [
      {
       "label": "Raw columns",
       "text": "Numeric, categorical, text"
      },
      {
       "label": "Impute",
       "text": "Median, most frequent, indicators"
      },
      {
       "label": "Encode and scale",
       "text": "One-hot, target encoding, standardise"
      },
      {
       "label": "Select",
       "text": "Drop weak or redundant features"
      },
      {
       "label": "Model",
       "text": "Fit estimator"
      },
      {
       "label": "Predict",
       "text": "Same steps applied in production"
      }
     ]
    },
    {
     "type": "cli",
     "title": "A leak-free pipeline with cross-validation",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import make_classification",
      "from sklearn.pipeline import make_pipeline",
      "from sklearn.preprocessing import StandardScaler",
      "from sklearn.linear_model import LogisticRegression",
      "from sklearn.model_selection import cross_val_score",
      "X, y = make_classification(n_samples=600, n_features=10, weights=[0.9], random_state=7)",
      "pipe = make_pipeline(StandardScaler(), LogisticRegression(class_weight='balanced'))",
      "scores = cross_val_score(pipe, X, y, cv=5, scoring='roc_auc')",
      "print(round(scores.mean(), 3))",
      "# output: 0.872"
     ],
     "note": "The scaler is refitted inside each fold on that fold's training part only, so no validation information leaks. class_weight='balanced' up-weights the rare positive class (about 10% of rows)."
    },
    {
     "type": "formula",
     "title": "Imbalance arithmetic",
     "items": [
      {
       "name": "Balanced class weight",
       "expr": "w_c = n ÷ (k × n_c)",
       "meaning": "n rows, k classes, n_c rows in class c. With 1,000 rows, 900 negatives and 100 positives: w_neg = 1,000 ÷ 1,800 ≈ 0.56, w_pos = 1,000 ÷ 200 = 5."
      },
      {
       "name": "Effect",
       "expr": "Each positive counts about 9 times as much as a negative in the loss",
       "meaning": "5 ÷ 0.56 ≈ 9, matching the 9:1 ratio of the classes."
      },
      {
       "name": "Imbalance ratio",
       "expr": "IR = n_majority ÷ n_minority",
       "meaning": "900 ÷ 100 = 9. Above about 10, plain accuracy becomes almost meaningless."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Ways to handle imbalanced classes",
     "columns": [
      {
       "title": "Change the loss",
       "items": [
        "Class weights or cost-sensitive learning",
        "No data is duplicated or thrown away",
        "Usually the first thing to try"
       ]
      },
      {
       "title": "Change the data",
       "items": [
        "Random undersampling of the majority",
        "Random oversampling or synthetic samples (e.g. SMOTE) of the minority",
        "Apply to training folds only, never to validation or test"
       ]
      },
      {
       "title": "Change the decision",
       "items": [
        "Keep probabilities, move the threshold",
        "Choose the threshold from costs or capacity",
        "Evaluate with precision, recall, PR-AUC"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If you oversample the minority class and then split, copies of the same minority example land in both training and test sets. The model 'recognises' them and test scores become wildly optimistic. Resample inside the training fold only, and evaluate on data with the real class balance.",
     "title": "Never resample before splitting"
    },
    {
     "type": "table",
     "title": "Feature selection approaches",
     "head": [
      "Approach",
      "How it works",
      "Examples",
      "Trade-off"
     ],
     "rows": [
      [
       "Filter",
       "Score each feature independently of a model",
       "Correlation, mutual information, chi-square, variance threshold",
       "Fast, but ignores interactions"
      ],
      [
       "Wrapper",
       "Search feature subsets by training models",
       "Recursive feature elimination, forward selection",
       "Can find good subsets, but costly and prone to overfitting the validation set"
      ],
      [
       "Embedded",
       "Selection happens during training",
       "L1 (lasso) regularisation, tree-based importance",
       "Efficient; tied to one model type"
      ]
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Less overfitting when data is limited relative to the number of features.",
      "Faster training and prediction, lower serving cost.",
      "Fewer data pipelines to maintain and monitor for drift.",
      "Easier explanations for users, auditors and regulators.",
      "But: never select features using the test set, or the selection itself leaks."
     ],
     "title": "Why fewer features can be better"
    },
    {
     "type": "scenario",
     "situation": "A student oversampled the fraud class with synthetic examples until it was 50% of the data, then ran a train/test split. Recall on the test set is 0.99 and precision 0.98. In production, precision drops to 0.08. What went wrong?",
     "options": [
      {
       "text": "The fraud labels in production must be wrong",
       "feedback": "The evaluation design explains the gap fully; there is no evidence that production labels changed.",
       "best": false
      },
      {
       "text": "The model needed more synthetic samples to generalise",
       "feedback": "More synthetic data would make the evaluation even less realistic.",
       "best": false
      },
      {
       "text": "Resampling before splitting put near-copies of training examples in the test set and changed its class balance",
       "feedback": "Correct. The test set no longer reflected reality: synthetic neighbours of training points were easy to recognise, and a 50% fraud rate inflates precision compared with the real, very low rate.",
       "best": true
      },
      {
       "text": "Precision always falls in production by about this amount",
       "feedback": "A drop from 0.98 to 0.08 is not normal; it is a symptom of a flawed evaluation.",
       "best": false
      }
     ],
     "title": "Suspiciously good results"
    },
    {
     "type": "checklist",
     "title": "Pipeline hygiene checklist",
     "items": [
      "All preprocessing is inside the pipeline and fitted on training data only",
      "Resampling, if used, is applied only within training folds",
      "Feature selection is done inside cross-validation, not on the full dataset",
      "Validation and test sets keep the real-world class balance",
      "The fitted pipeline (not just the model) is saved and versioned",
      "The same pipeline object is used for batch scoring and online serving"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Does your current workflow have any preparation step done outside the model pipeline? What could leak, and how would you move it inside?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Pipeline",
       "def": "A chained sequence of preprocessing steps and a model that is fitted and applied as one object."
      },
      {
       "term": "Class imbalance",
       "def": "A situation where one class is much rarer than another in the target."
      },
      {
       "term": "Class weight",
       "def": "A multiplier on the loss for examples of a class, used to make rare classes count more."
      },
      {
       "term": "Oversampling",
       "def": "Duplicating or synthesising minority-class examples in the training data."
      },
      {
       "term": "Undersampling",
       "def": "Removing majority-class examples from the training data to balance classes."
      },
      {
       "term": "SMOTE",
       "def": "A technique that creates synthetic minority examples by interpolating between neighbouring minority points."
      },
      {
       "term": "Feature selection",
       "def": "Choosing a subset of features to improve generalisation, speed or interpretability."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "With 2,000 rows, 1,800 negatives and 200 positives, what is the balanced class weight for positives?",
       "options": [
        "10",
        "0.56",
        "9",
        "5"
       ],
       "answer": 3,
       "explain": "w = n ÷ (k × n_c) = 2,000 ÷ (2 × 200) = 5."
      },
      {
       "q": "When should oversampling be applied?",
       "options": [
        "To the full dataset before the split",
        "Only to the training portion, inside each training fold",
        "To the test set only",
        "To both training and test sets equally, so that their class balance matches"
       ],
       "answer": 1,
       "explain": "Resampling before the split contaminates the evaluation with copies and an unrealistic class balance."
      },
      {
       "q": "Which is an embedded feature selection method?",
       "options": [
        "Pearson correlation with the target",
        "Exhaustive forward selection",
        "L1 (lasso) regularisation",
        "Variance threshold"
       ],
       "answer": 2,
       "explain": "Lasso drives some coefficients to exactly zero during training, so selection is part of fitting."
      },
      {
       "q": "What is the main benefit of wrapping preprocessing and the model in one pipeline?",
       "options": [
        "Preprocessing is learned from training data in each fold and applied identically everywhere",
        "It makes models more accurate in every case",
        "It removes the need for any validation data, because the pipeline checks its own performance",
        "It automatically chooses the best algorithm"
       ],
       "answer": 0,
       "explain": "Pipelines prevent leakage and keep training and serving transformations consistent."
      },
      {
       "q": "Why is plain accuracy a weak metric on a dataset with 1% positives?",
       "options": [
        "Accuracy cannot be computed for binary labels",
        "Predicting the majority class for everyone already scores 99%",
        "Accuracy always rewards false positives",
        "Accuracy is only defined for regression"
       ],
       "answer": 1,
       "explain": "With heavy imbalance, accuracy hides whether the model finds any positives at all."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m3",
 "order": 3,
 "code": "Fit",
 "title": "Supervised Learning: Linear Models and Optimisation",
 "subtitle": "Fit linear and logistic models with gradient descent, control them with regularisation and know the classic alternatives",
 "outcomes": [
  "Fit and interpret linear regression, including R² and residual checks",
  "Train models with gradient descent and diagnose training from loss curves",
  "Build logistic regression classifiers and interpret probabilities and odds ratios",
  "Apply ridge, lasso and elastic net and tune their strength with cross-validation",
  "Recognise when k-NN, naive Bayes or SVMs are sensible choices"
 ],
 "lessons": [
  {
   "id": "m3-l1",
   "title": "Linear Regression and Least Squares",
   "subtitle": "The simplest useful model: fit a straight line, read its coefficients and check its assumptions",
   "minutes": 26,
   "objectives": [
    "Write the linear regression model and its mean squared error loss",
    "Fit a one-feature line by hand and compute R²",
    "Interpret coefficients carefully, including with correlated features",
    "Check residuals for the main assumptions"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**Linear regression** predicts a number as a weighted sum of features plus an intercept. It is fast, transparent and surprisingly strong when features are well engineered. It is also the foundation for logistic regression, regularisation and even the layers of a neural network."
    },
    {
     "type": "formula",
     "title": "The model and its loss",
     "items": [
      {
       "name": "Prediction",
       "expr": "ŷ = w₁x₁ + w₂x₂ + … + w_d x_d + b = w · x + b",
       "meaning": "Each weight says how much the prediction changes when its feature rises by one unit, holding the others fixed."
      },
      {
       "name": "Mean squared error",
       "expr": "MSE = (1/n) Σ (yᵢ − ŷᵢ)²",
       "meaning": "Squaring punishes large errors heavily and makes the loss smooth and convex."
      },
      {
       "name": "Normal equation",
       "expr": "w = (XᵀX)⁻¹ Xᵀ y",
       "meaning": "Closed-form least-squares solution (with a column of ones for the intercept). Exact, but expensive for very many features."
      },
      {
       "name": "Coefficient of determination",
       "expr": "R² = 1 − SS_res ÷ SS_tot",
       "meaning": "Share of the target's variance explained. 1 is perfect; 0 is no better than predicting the mean."
      }
     ]
    },
    {
     "type": "steps",
     "title": "Fitting a line by hand: points (1, 2), (2, 4), (3, 5)",
     "items": [
      {
       "title": "Means",
       "text": "x̄ = 2, ȳ = 11 ÷ 3 ≈ 3.667."
      },
      {
       "title": "Slope",
       "text": "w = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)² = (1.667 + 0 + 1.333) ÷ 2 = 1.5."
      },
      {
       "title": "Intercept",
       "text": "b = ȳ − w x̄ = 3.667 − 3 = 0.667, so ŷ = 1.5x + 0.667."
      },
      {
       "title": "Residuals",
       "text": "Predictions 2.167, 3.667, 5.167 give residuals −0.167, 0.333, −0.167; SS_res ≈ 0.167."
      },
      {
       "title": "R²",
       "text": "SS_tot = 2.778 + 0.111 + 1.778 ≈ 4.667, so R² = 1 − 0.167 ÷ 4.667 ≈ 0.964."
      }
     ]
    },
    {
     "type": "cli",
     "title": "The same fit in code",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.linear_model import LinearRegression",
      "X = np.array([[1], [2], [3]]); y = np.array([2, 4, 5])",
      "lr = LinearRegression().fit(X, y)",
      "print(round(lr.coef_[0], 3), round(lr.intercept_, 3), round(lr.score(X, y), 3))",
      "# output: 1.5 0.667 0.964",
      "Xb = np.c_[np.ones(3), X]",
      "print(np.linalg.solve(Xb.T @ Xb, Xb.T @ y).round(3).tolist())",
      "# output: [0.667, 1.5]"
     ],
     "note": "The normal equation gives the same intercept and slope. Solving the linear system is more stable than computing the matrix inverse explicitly."
    },
    {
     "type": "table",
     "title": "Assumptions and how to check them",
     "head": [
      "Assumption",
      "What it means",
      "How to check",
      "If violated"
     ],
     "rows": [
      [
       "Linearity",
       "The target changes linearly with each feature",
       "Plot residuals against predictions and features",
       "Add transforms, polynomial terms or use trees"
      ],
      [
       "Independent errors",
       "One example's error does not predict another's",
       "Check residuals over time or by group",
       "Use time-series methods or grouped models"
      ],
      [
       "Constant variance",
       "Errors have similar spread everywhere",
       "Residual spread should not fan out",
       "Log-transform the target or use weighted loss"
      ],
      [
       "Few extreme points",
       "No single point dominates the fit",
       "Look for high-leverage points",
       "Investigate, use robust loss such as Huber"
      ],
      [
       "Low multicollinearity",
       "Features are not near-copies of each other",
       "Correlation matrix, variance inflation factor",
       "Drop or combine features; use ridge regularisation"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A coefficient of 1,200 BDT on 'has smartphone' in a wallet-spend model means that, among otherwise similar customers in this data, smartphone owners spend 1,200 BDT more on average. It does not mean giving someone a smartphone raises spending by 1,200 BDT. With correlated features, coefficients can also swing wildly or flip sign between samples.",
     "title": "Coefficients are not causal effects"
    },
    {
     "type": "compare",
     "title": "When linear regression shines and when it struggles",
     "columns": [
      {
       "title": "Shines",
       "items": [
        "Relationships are roughly additive and linear",
        "You need transparent, auditable coefficients",
        "Data is small or moderate",
        "As a strong, fast baseline"
       ]
      },
      {
       "title": "Struggles",
       "items": [
        "Strong non-linear effects and interactions",
        "Many correlated features without regularisation",
        "Heavy outliers in the target",
        "Targets that are counts or bounded (consider other models)"
       ]
      }
     ]
    },
    {
     "type": "scenario",
     "situation": "A model predicting electricity use in Dhaka apartments includes both 'floor area in square feet' and 'number of rooms', which are strongly correlated. The coefficient on rooms is negative, and the facilities manager says 'more rooms cannot reduce electricity use'. What is the best response?",
     "options": [
      {
       "text": "Remove the negative sign by forcing all coefficients to be positive",
       "feedback": "Constraining signs hides the issue and may worsen predictions without understanding why the sign appeared.",
       "best": false
      },
      {
       "text": "Conclude that adding rooms reduces electricity use",
       "feedback": "That is a causal claim the regression does not support, especially with collinear features.",
       "best": false
      },
      {
       "text": "Discard linear regression and switch to a neural network",
       "feedback": "The issue is interpretation and collinearity, which a more complex model does not solve.",
       "best": false
      },
      {
       "text": "Explain that with correlated features the coefficient reflects rooms at fixed floor area, and consider ridge or combining the features",
       "feedback": "Correct. Holding floor area fixed, more rooms means smaller rooms, which may genuinely use less. Collinearity also makes the estimate unstable, so regularisation or feature redesign helps.",
       "best": true
      }
     ],
     "title": "A puzzling coefficient"
    },
    {
     "type": "reflection",
     "prompt": "Choose a numeric outcome in your work, such as delivery time or monthly sales. Write a linear model with three features. What sign do you expect for each coefficient, and what could make the fitted sign differ?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Linear regression",
       "def": "A model that predicts a numeric target as a weighted sum of features plus an intercept."
      },
      {
       "term": "Least squares",
       "def": "Fitting parameters by minimising the sum of squared differences between predictions and targets."
      },
      {
       "term": "Residual",
       "def": "The difference between an observed value and the model's prediction for it."
      },
      {
       "term": "R² (coefficient of determination)",
       "def": "The proportion of variance in the target explained by the model relative to predicting the mean."
      },
      {
       "term": "Normal equation",
       "def": "The closed-form least-squares solution w = (XᵀX)⁻¹Xᵀy."
      },
      {
       "term": "Multicollinearity",
       "def": "Strong correlation among features that makes individual coefficients unstable and hard to interpret."
      },
      {
       "term": "Intercept",
       "def": "The model's prediction when all features are zero; the bias term b."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A model is ŷ = 3x + 2. What is the residual for the point x = 4, y = 15?",
       "options": [
        "1",
        "−1",
        "14",
        "3"
       ],
       "answer": 0,
       "explain": "ŷ = 14, residual = y − ŷ = 15 − 14 = 1."
      },
      {
       "q": "SS_res = 20 and SS_tot = 80. What is R²?",
       "options": [
        "0.25",
        "4",
        "0.75",
        "0.80"
       ],
       "answer": 2,
       "explain": "R² = 1 − 20 ÷ 80 = 0.75."
      },
      {
       "q": "Residuals fan out as predictions grow larger. Which assumption is violated?",
       "options": [
        "Independence of features",
        "Constant variance of errors",
        "Linearity of the intercept term",
        "Normality of the features"
       ],
       "answer": 1,
       "explain": "A fan shape shows the error spread grows with the level, violating constant variance; a log target often helps."
      },
      {
       "q": "Why can coefficients become unstable when two features are highly correlated?",
       "options": [
        "Correlated features always have missing values",
        "Least squares cannot be computed at all when two features are present",
        "The intercept becomes undefined",
        "The model cannot tell which of the two features deserves the credit"
       ],
       "answer": 3,
       "explain": "With collinearity, many weight combinations fit nearly equally well, so small data changes swing the individual coefficients."
      },
      {
       "q": "Which statement about R² is correct?",
       "options": [
        "R² can never be negative on any dataset",
        "R² of 0.9 proves the model is causal",
        "R² measures classification accuracy",
        "An R² of 0 means the model does no better than predicting the mean"
       ],
       "answer": 3,
       "explain": "R² compares with the mean predictor; on test data it can even be negative if the model is worse than the mean."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l2",
   "title": "Gradient Descent in Practice",
   "subtitle": "How models are actually trained when there is no closed-form answer",
   "minutes": 24,
   "objectives": [
    "Derive the gradient of MSE for a linear model",
    "Run gradient descent steps and explain batch, stochastic and mini-batch variants",
    "Compare common optimisers and learning-rate schedules",
    "Diagnose training problems from loss curves"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The normal equation works for linear regression, but most models (logistic regression, neural networks, boosted trees' leaf updates) have no tidy closed form. **Gradient descent** is the general method: compute how the loss changes with each parameter, take a small step downhill, repeat."
    },
    {
     "type": "formula",
     "title": "Gradient descent for linear regression",
     "items": [
      {
       "name": "Update rule",
       "expr": "θ ← θ − η ∇L(θ)",
       "meaning": "θ is any parameter, η the learning rate, ∇L the gradient of the loss."
      },
      {
       "name": "Gradient for a weight",
       "expr": "∂MSE/∂w = (2/n) Σ (ŷᵢ − yᵢ) xᵢ",
       "meaning": "Errors are weighted by their feature values and averaged."
      },
      {
       "name": "Gradient for the intercept",
       "expr": "∂MSE/∂b = (2/n) Σ (ŷᵢ − yᵢ)",
       "meaning": "The average error, doubled."
      },
      {
       "name": "Worked first step",
       "expr": "Data (1, 2), (2, 4), (3, 5); w = b = 0; η = 0.1",
       "meaning": "Errors −2, −4, −5. ∂w = (2/3)(−25) ≈ −16.67, ∂b = (2/3)(−11) ≈ −7.33. New w ≈ 1.667, b ≈ 0.733."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Gradient descent from scratch",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "x = np.array([1., 2., 3.]); y = np.array([2., 4., 5.])",
      "w, b, lr = 0.0, 0.0, 0.1",
      "for step in range(2000):",
      "    err = (w * x + b) - y",
      "    w -= lr * 2 * np.mean(err * x)",
      "    b -= lr * 2 * np.mean(err)",
      "    if step == 0: print(round(w, 3), round(b, 3))",
      "print(round(w, 3), round(b, 3))",
      "# output: 1.667 0.733",
      "# output: 1.5 0.667"
     ],
     "note": "After one step the values match the hand calculation; after 2,000 steps they reach the least-squares solution found in the previous lesson."
    },
    {
     "type": "compare",
     "title": "Batch, stochastic and mini-batch",
     "columns": [
      {
       "title": "Batch",
       "items": [
        "Gradient from all n examples each step",
        "Smooth, accurate steps",
        "Slow and memory-heavy on large data"
       ]
      },
      {
       "title": "Stochastic (SGD)",
       "items": [
        "Gradient from one example per step",
        "Very noisy but cheap steps",
        "Noise can help escape poor regions"
       ]
      },
      {
       "title": "Mini-batch",
       "items": [
        "Gradient from a batch, e.g. 32–1,024 examples",
        "Balances noise and speed; fits GPU hardware",
        "The default in modern deep learning"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Common optimisers",
     "head": [
      "Optimiser",
      "Idea",
      "When used"
     ],
     "rows": [
      [
       "SGD",
       "Plain gradient steps",
       "Simple models; with care, strong results in vision"
      ],
      [
       "SGD with momentum",
       "Keeps a running average of past gradients to smooth and speed up progress",
       "Deep networks, ravine-shaped losses"
      ],
      [
       "RMSProp",
       "Scales each parameter's step by recent gradient size",
       "Recurrent networks, noisy problems"
      ],
      [
       "Adam / AdamW",
       "Momentum plus per-parameter scaling; AdamW decouples weight decay",
       "Default for most neural networks and transformers"
      ]
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Search on a log scale, for example 1e-4, 3e-4, 1e-3, 3e-3, 1e-2.",
      "A short **warm-up** followed by gradual decay (step, cosine) is common for deep networks.",
      "Standardise features first: unscaled features create stretched loss surfaces and slow, zig-zagging descent.",
      "Shuffle data every epoch so mini-batches are representative.",
      "Track training and validation loss every epoch; save the best checkpoint."
     ],
     "title": "Learning-rate practice"
    },
    {
     "type": "table",
     "title": "Reading loss curves",
     "head": [
      "What you see",
      "Likely cause",
      "What to try"
     ],
     "rows": [
      [
       "Loss explodes or becomes NaN",
       "Learning rate too high, bad input values",
       "Lower the learning rate, check for NaNs and scale inputs"
      ],
      [
       "Loss decreases very slowly",
       "Learning rate too low, unscaled features",
       "Raise the learning rate, standardise features"
      ],
      [
       "Loss plateaus early at a high value",
       "Model too simple or bug in data",
       "Check labels and features, add capacity"
      ],
      [
       "Training loss falls, validation loss rises",
       "Overfitting",
       "Regularise, early-stop, get more data"
      ],
      [
       "Loss jumps around without trend",
       "Batch too small or learning rate too high",
       "Larger batches, lower learning rate"
      ]
     ]
    },
    {
     "type": "scenario",
     "situation": "A team trains logistic regression with gradient descent on features including 'annual turnover in taka' (up to 10⁹) and 'number of employees' (up to 500). Training needs thousands of epochs and still oscillates. What should they try first?",
     "options": [
      {
       "text": "Standardise the features before training",
       "feedback": "Correct. Wildly different scales stretch the loss surface so one learning rate is too big for some directions and too small for others. Standardising usually fixes this immediately.",
       "best": true
      },
      {
       "text": "Use batch size 1 for more updates",
       "feedback": "Noisier updates on a badly scaled problem make oscillation worse.",
       "best": false
      },
      {
       "text": "Remove the employee count feature",
       "feedback": "Dropping a useful feature avoids the symptom but loses signal; scaling fixes the cause.",
       "best": false
      },
      {
       "text": "Switch to a much deeper model",
       "feedback": "The issue is the optimisation geometry, not model capacity.",
       "best": false
      }
     ],
     "title": "Slow convergence"
    },
    {
     "type": "checklist",
     "title": "Training debugging checklist",
     "items": [
      "Can the model overfit a tiny batch of 10–50 examples? If not, look for a bug",
      "Inputs are scaled and contain no NaN or infinite values",
      "Labels are aligned with inputs after shuffling and joins",
      "Learning rate has been checked on a log-scale sweep",
      "Training and validation loss are both plotted per epoch",
      "Random seeds are fixed for reproducible comparisons"
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Gradient descent",
       "def": "An iterative method that updates parameters in the direction opposite to the gradient of the loss."
      },
      {
       "term": "Epoch",
       "def": "One full pass through the training data."
      },
      {
       "term": "Mini-batch",
       "def": "A small subset of training examples used to compute one gradient update."
      },
      {
       "term": "Stochastic gradient descent",
       "def": "Gradient descent using one or a few examples per update, giving noisy but cheap steps."
      },
      {
       "term": "Momentum",
       "def": "An optimiser technique that accumulates past gradients to smooth and accelerate updates."
      },
      {
       "term": "Adam",
       "def": "An adaptive optimiser combining momentum with per-parameter step sizes based on recent gradient magnitudes."
      },
      {
       "term": "Learning-rate schedule",
       "def": "A planned change of the learning rate during training, such as warm-up then decay."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "For one example with x = 2, y = 5 and current prediction ŷ = 3, what is the MSE gradient with respect to w (n = 1)?",
       "options": [
        "8",
        "−8",
        "−4",
        "−2"
       ],
       "answer": 1,
       "explain": "2 × (ŷ − y) × x = 2 × (−2) × 2 = −8."
      },
      {
       "q": "Which variant is the usual default for training neural networks?",
       "options": [
        "Full-batch gradient descent",
        "Exhaustive grid search over weights",
        "Mini-batch gradient descent",
        "The normal equation"
       ],
       "answer": 2,
       "explain": "Mini-batches balance gradient noise and hardware efficiency."
      },
      {
       "q": "Training loss falls steadily while validation loss starts rising. What is happening?",
       "options": [
        "The model is starting to overfit the training data",
        "The learning rate is too low for the validation data",
        "The model is underfitting",
        "The data has no labels"
       ],
       "answer": 0,
       "explain": "Diverging training and validation curves signal overfitting."
      },
      {
       "q": "Why does standardising features speed up gradient descent?",
       "options": [
        "It reduces the number of training examples",
        "It makes the loss surface more evenly shaped, so one learning rate suits all directions",
        "It removes the need to choose a learning rate, because every feature then moves equally fast",
        "It converts regression into classification"
       ],
       "answer": 1,
       "explain": "Unequal scales create elongated contours that cause zig-zagging."
      },
      {
       "q": "A quick sanity test before a long training run is to check whether the model can…",
       "options": [
        "Score 100% on the test set",
        "Train without any loss function",
        "Run one epoch with a learning rate of zero to check speed",
        "Overfit a tiny subset of the training data"
       ],
       "answer": 3,
       "explain": "If a model cannot memorise a handful of examples, there is probably a bug in the data or code."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l3",
   "title": "Logistic Regression and Classification",
   "subtitle": "Turn a linear score into a probability and train it with log loss",
   "minutes": 26,
   "objectives": [
    "Explain the sigmoid link and interpret probabilities and log-odds",
    "Compute log loss for individual predictions",
    "Interpret coefficients as odds ratios",
    "Extend to multiple classes with softmax"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Many business questions are yes/no: will this customer default, is this transaction fraud, does this X-ray show pneumonia? **Logistic regression** takes the same linear score as linear regression and squeezes it into a probability between 0 and 1. It remains one of the most used models in banking, insurance and healthcare because it is fast, well calibrated and explainable."
    },
    {
     "type": "formula",
     "title": "From score to probability",
     "items": [
      {
       "name": "Linear score (log-odds)",
       "expr": "z = w · x + b",
       "meaning": "z can be any real number; it is the log of the odds of the positive class."
      },
      {
       "name": "Sigmoid",
       "expr": "p = σ(z) = 1 ÷ (1 + e⁻ᶻ)",
       "meaning": "For z = 0.8: p = 1 ÷ (1 + 0.449) ≈ 0.690."
      },
      {
       "name": "Odds",
       "expr": "odds = p ÷ (1 − p)",
       "meaning": "p = 0.8 gives odds of 4, read as 4 to 1."
      },
      {
       "name": "Odds ratio of a coefficient",
       "expr": "OR = e^w",
       "meaning": "w = 0.4 gives e^0.4 ≈ 1.49: each unit increase in the feature multiplies the odds by about 1.49."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Log loss (binary cross-entropy)",
     "items": [
      {
       "name": "Definition",
       "expr": "L = −[y ln p + (1 − y) ln(1 − p)]",
       "meaning": "Averaged over examples. It heavily punishes confident wrong answers."
      },
      {
       "name": "Correct and confident",
       "expr": "y = 1, p = 0.9: L = −ln 0.9 ≈ 0.105",
       "meaning": "Small loss."
      },
      {
       "name": "Hesitant",
       "expr": "y = 1, p = 0.69: L = −ln 0.69 ≈ 0.371",
       "meaning": "Moderate loss."
      },
      {
       "name": "Confident and wrong",
       "expr": "y = 0, p = 0.95: L = −ln 0.05 ≈ 3.0",
       "meaning": "Huge loss, which is why log loss rewards honest probabilities."
      },
      {
       "name": "Gradient",
       "expr": "∂L/∂w = (p − y) x",
       "meaning": "The same neat 'error times input' form as linear regression."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Multi-class: softmax",
     "items": [
      {
       "name": "Softmax",
       "expr": "pₖ = e^{zₖ} ÷ Σⱼ e^{zⱼ}",
       "meaning": "Turns K scores into K probabilities that sum to 1."
      },
      {
       "name": "Worked example",
       "expr": "z = (2, 1, 0): e² ≈ 7.389, e¹ ≈ 2.718, e⁰ = 1; sum ≈ 11.107",
       "meaning": "p ≈ (0.665, 0.245, 0.090)."
      },
      {
       "name": "Cross-entropy",
       "expr": "L = −ln p_true",
       "meaning": "If the true class is the first one, L = −ln 0.665 ≈ 0.408."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Sigmoid, log loss and a fitted classifier",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.datasets import load_breast_cancer",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.pipeline import make_pipeline",
      "from sklearn.preprocessing import StandardScaler",
      "from sklearn.linear_model import LogisticRegression",
      "from sklearn.metrics import log_loss",
      "print(round(1 / (1 + np.exp(-0.8)), 3), round(-np.log(0.69), 3))",
      "# output: 0.69 0.371",
      "X, y = load_breast_cancer(return_X_y=True)",
      "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)",
      "clf = make_pipeline(StandardScaler(), LogisticRegression(C=1.0)).fit(X_tr, y_tr)",
      "p = clf.predict_proba(X_te)[:, 1]",
      "print(round(log_loss(y_te, p), 3), round(clf.score(X_te, y_te), 3))",
      "# output: 0.068 0.986"
     ],
     "note": "predict_proba returns probabilities; score reports accuracy at the default 0.5 threshold. Report both: probabilities matter for ranking and risk decisions."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "A model outputs probabilities; the cut-off that turns them into actions is chosen from costs and capacity. A bank may decline loans above 0.30 default probability, while a hospital may send any patient above 0.10 for a second review. The default 0.5 is rarely the right choice for imbalanced problems.",
     "title": "The threshold is a business decision"
    },
    {
     "type": "case",
     "title": "A transparent credit scorecard",
     "context": "A non-bank lender in Bangladesh serving small shopkeepers must explain every declined application to the regulator and the customer. The data science team has 40,000 past loans with 8% defaults. A gradient-boosted model scores AUC 0.81; a logistic regression on carefully binned features scores 0.78. The credit committee must choose a model for launch.",
     "questions": [
      "What are the arguments for launching with logistic regression?",
      "How should the decision threshold be set?",
      "How could the team still benefit from the stronger model?"
     ],
     "answer": "Logistic regression gives coefficients that convert directly into points per feature range, simple reason codes for declines, stable behaviour and easy validation by the regulator; a 0.03 AUC gap may be worth less than explainability and lower model risk. The threshold should come from expected profit and loss: compare the margin earned on good loans with the loss on defaults and choose the cut-off that maximises value within the lender's risk appetite, checking approval rates across groups. The boosted model can be used as a challenger in shadow mode, to suggest new features or interactions to add to the scorecard, or to review borderline cases, and can be adopted later if it proves stable and explainable."
    },
    {
     "type": "scenario",
     "situation": "In a logistic regression for loan default, the coefficient on 'number of late payments in the last year' is 0.7. A manager asks what this means. Which explanation is correct?",
     "options": [
      {
       "text": "Each late payment adds 0.7 percentage points to the default probability",
       "feedback": "The effect on probability depends on the starting point because of the sigmoid; the coefficient is on the log-odds scale.",
       "best": false
      },
      {
       "text": "Each late payment raises the default probability by 70%",
       "feedback": "Neither the probability nor the odds rises by 70%; the odds roughly double.",
       "best": false
      },
      {
       "text": "The model is 70% sure that late payers default",
       "feedback": "Coefficients are not confidence levels.",
       "best": false
      },
      {
       "text": "Each additional late payment multiplies the odds of default by about e^0.7 ≈ 2, other features held fixed",
       "feedback": "Correct. Coefficients act on the log-odds; exponentiating gives an odds ratio of about 2.01.",
       "best": true
      }
     ],
     "title": "Interpreting a coefficient"
    },
    {
     "type": "reflection",
     "prompt": "Think of a yes/no decision in your organisation. What would a false positive and a false negative cost? Where would you set the probability threshold, and who should agree to it?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Logistic regression",
       "def": "A linear classifier that maps a weighted sum of features through the sigmoid to give a probability."
      },
      {
       "term": "Log-odds (logit)",
       "def": "The natural log of p ÷ (1 − p); logistic regression models it as a linear function of features."
      },
      {
       "term": "Odds ratio",
       "def": "The factor by which the odds change for a one-unit increase in a feature: e raised to its coefficient."
      },
      {
       "term": "Log loss",
       "def": "Binary cross-entropy; the average negative log probability assigned to the true class."
      },
      {
       "term": "Softmax",
       "def": "A function that converts a vector of scores into probabilities that sum to one."
      },
      {
       "term": "Decision threshold",
       "def": "The probability cut-off above which a case is assigned to the positive class."
      },
      {
       "term": "Calibration",
       "def": "How well predicted probabilities match observed frequencies, for example 30% predicted means about 30% happen."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is σ(0)?",
       "options": [
        "0.5",
        "0",
        "1",
        "0.25"
       ],
       "answer": 0,
       "explain": "1 ÷ (1 + e⁰) = 1 ÷ 2 = 0.5."
      },
      {
       "q": "A coefficient is ln 3 ≈ 1.099. What happens to the odds when the feature increases by one?",
       "options": [
        "They increase by 1.099",
        "They increase by 3%",
        "They triple",
        "They are unchanged"
       ],
       "answer": 2,
       "explain": "Odds ratio = e^1.099 = 3."
      },
      {
       "q": "Which prediction gives the larger log loss for a true label of 0?",
       "options": [
        "p = 0.1",
        "p = 0.3",
        "p = 0.9",
        "p = 0.5"
       ],
       "answer": 2,
       "explain": "Loss = −ln(1 − p); for p = 0.9 it is −ln 0.1 ≈ 2.30, the largest."
      },
      {
       "q": "Softmax scores are (0, 0, 0) for three classes. What are the probabilities?",
       "options": [
        "1/3 each",
        "0 each",
        "1, 0, 0",
        "0.5, 0.25, 0.25"
       ],
       "answer": 0,
       "explain": "Equal scores give equal probabilities."
      },
      {
       "q": "Why is 0.5 often a poor threshold for a fraud model?",
       "options": [
        "Probabilities above 0.5 are impossible for rare classes",
        "Logistic regression cannot output values below 0.5",
        "Thresholds must always equal the base rate",
        "Costs and class balance usually make a different cut-off more valuable"
       ],
       "answer": 3,
       "explain": "The threshold should reflect error costs and capacity, not a default value."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l4",
   "title": "Regularisation: Ridge, Lasso and Elastic Net",
   "subtitle": "Control complexity so models generalise instead of memorising",
   "minutes": 24,
   "objectives": [
    "Explain overfitting and how penalties reduce it",
    "Compare L1 and L2 penalties and their effects on coefficients",
    "Tune the regularisation strength with cross-validation",
    "Relate λ, alpha and C across common libraries"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A model with many features can fit the training data almost perfectly, including its noise. **Regularisation** adds a penalty for large weights to the loss, trading a little training accuracy for much better behaviour on new data. It is the single most useful tool for linear models with many features."
    },
    {
     "type": "formula",
     "title": "Penalised losses",
     "items": [
      {
       "name": "Ridge (L2)",
       "expr": "Loss = MSE + λ Σ wⱼ²",
       "meaning": "Shrinks all weights smoothly towards zero; handles correlated features well."
      },
      {
       "name": "Lasso (L1)",
       "expr": "Loss = MSE + λ Σ |wⱼ|",
       "meaning": "Can set weights exactly to zero, performing feature selection."
      },
      {
       "name": "Elastic net",
       "expr": "Loss = MSE + λ [α Σ |wⱼ| + (1 − α) Σ wⱼ²]",
       "meaning": "Mixes both; selects groups of correlated features more stably than lasso alone (α here is the mixing ratio)."
      },
      {
       "name": "Ridge with one feature, no intercept",
       "expr": "w = Σ xᵢyᵢ ÷ (Σ xᵢ² + λ)",
       "meaning": "With Σxy = 20 and Σx² = 10: least squares gives w = 2; λ = 10 gives w = 20 ÷ 20 = 1."
      },
      {
       "name": "Library naming",
       "expr": "λ is 'alpha' in many regression APIs; logistic regression often uses C = 1 ÷ λ",
       "meaning": "Larger alpha means stronger penalty; larger C means weaker penalty."
      }
     ]
    },
    {
     "type": "compare",
     "title": "L1 versus L2",
     "columns": [
      {
       "title": "L1 (lasso)",
       "items": [
        "Many coefficients become exactly zero",
        "Built-in feature selection",
        "Unstable choice among correlated features",
        "Good when few features truly matter"
       ]
      },
      {
       "title": "L2 (ridge)",
       "items": [
        "All coefficients shrink, few reach zero",
        "Spreads weight across correlated features",
        "Stable and smooth",
        "Good when many features each matter a little"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "Ridge and lasso compared",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import make_regression",
      "from sklearn.linear_model import LinearRegression, Ridge, Lasso",
      "from sklearn.model_selection import cross_val_score",
      "X, y = make_regression(n_samples=60, n_features=30, n_informative=5, noise=10, random_state=3)",
      "for m in [LinearRegression(), Ridge(alpha=10.0), Lasso(alpha=1.0)]:",
      "    r2 = cross_val_score(m, X, y, cv=5, scoring='r2').mean()",
      "    nz = (abs(m.fit(X, y).coef_) > 1e-6).sum()",
      "    print(type(m).__name__, round(r2, 3), nz)",
      "# output: LinearRegression 0.97 30",
      "# output: Ridge 0.758 30",
      "# output: Lasso 0.988 10"
     ],
     "note": "Only 5 of 30 features carry signal and there are just 60 rows. Lasso zeroes out 20 coefficients and gives the best cross-validated R²; ridge keeps all 30 and, at this strength, over-shrinks the real effects. The penalty strength always needs tuning."
    },
    {
     "type": "steps",
     "title": "Tuning regularisation strength",
     "items": [
      {
       "title": "Scale features",
       "text": "Penalties compare weights directly, so features must be on similar scales."
      },
      {
       "title": "Search a log grid",
       "text": "Try λ (alpha) values such as 0.001, 0.01, 0.1, 1, 10, 100."
      },
      {
       "title": "Cross-validate",
       "text": "For each value, average the validation score over folds."
      },
      {
       "title": "Pick and simplify",
       "text": "Choose the best value, or the simplest model within one standard error of the best."
      },
      {
       "title": "Refit and test once",
       "text": "Refit on all training data and evaluate once on the untouched test set."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A penalty encodes a belief that small weights are more likely than large ones. Ridge corresponds to assuming weights follow a normal distribution centred on zero; lasso to a sharper, Laplace-shaped belief that many weights are exactly or nearly zero. More data lets the evidence override the prior, which is why regularisation matters most for small datasets.",
     "title": "Regularisation as a prior belief"
    },
    {
     "type": "scenario",
     "situation": "A demand model for a supermarket chain has 300 features, many of them overlapping (sales last week, last 2 weeks, last 4 weeks, by store and by region). Lasso keeps a different small set of features each time the data is resampled, which worries the business. What is the best adjustment?",
     "options": [
      {
       "text": "Use elastic net or ridge so correlated features share weight more stably",
       "feedback": "Correct. Lasso tends to pick one feature from a correlated group somewhat arbitrarily; adding an L2 component stabilises the selection.",
       "best": true
      },
      {
       "text": "Remove regularisation entirely",
       "feedback": "An unpenalised model with 300 correlated features would overfit and have even less stable coefficients.",
       "best": false
      },
      {
       "text": "Select features using the test set to make them stable",
       "feedback": "Using the test set for selection leaks information and invalidates the evaluation.",
       "best": false
      },
      {
       "text": "Increase the lasso penalty until only one feature remains",
       "feedback": "A single feature would underfit badly and the choice of that feature would still be unstable.",
       "best": false
      }
     ],
     "title": "Many correlated features"
    },
    {
     "type": "template",
     "title": "Regularisation tuning log",
     "purpose": "Record each regularisation experiment so the chosen strength is justified and reproducible.",
     "columns": [
      "Run",
      "Model",
      "Penalty and strength",
      "CV metric (mean ± sd)",
      "Non-zero features",
      "Notes"
     ],
     "example": [
      [
       "R-07",
       "Logistic regression",
       "L1, C = 0.1",
       "AUC 0.812 ± 0.011",
       "23 of 140",
       "Chosen: within 1 SE of best, far simpler"
      ],
      [
       "R-08",
       "Logistic regression",
       "L2, C = 1.0",
       "AUC 0.818 ± 0.010",
       "140 of 140",
       "Best score, harder to explain"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "Look at a model you have built or used. Was its regularisation strength tuned or left at a default? Which features would you expect lasso to drop, and would the business be comfortable with that?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Overfitting",
       "def": "When a model learns noise in the training data and performs worse on new data."
      },
      {
       "term": "Regularisation",
       "def": "Adding a penalty or constraint during training to reduce model complexity and overfitting."
      },
      {
       "term": "Ridge regression",
       "def": "Linear regression with an L2 penalty on the sum of squared weights."
      },
      {
       "term": "Lasso",
       "def": "Linear regression with an L1 penalty on the sum of absolute weights; can zero out features."
      },
      {
       "term": "Elastic net",
       "def": "A penalty combining L1 and L2 terms."
      },
      {
       "term": "Hyperparameter",
       "def": "A setting chosen before training, such as the regularisation strength, rather than learned from data."
      },
      {
       "term": "Weight decay",
       "def": "Shrinking weights a little at every update; equivalent to L2 regularisation for plain gradient descent."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which penalty can set coefficients exactly to zero?",
       "options": [
        "L2 (ridge)",
        "L1 (lasso)",
        "No penalty",
        "Dropout"
       ],
       "answer": 1,
       "explain": "The L1 penalty's sharp corner at zero lets optimisation land exactly on zero."
      },
      {
       "q": "With Σxy = 30 and Σx² = 15, what is the one-feature ridge weight (no intercept) when λ = 15?",
       "options": [
        "1",
        "2",
        "0.5",
        "1.5"
       ],
       "answer": 0,
       "explain": "w = 30 ÷ (15 + 15) = 1; without the penalty it would be 2."
      },
      {
       "q": "In a logistic regression API where C = 1 ÷ λ, what does increasing C do?",
       "options": [
        "Strengthens regularisation",
        "Changes the loss to MSE",
        "Weakens regularisation",
        "Removes the intercept"
       ],
       "answer": 2,
       "explain": "C is the inverse of the penalty strength."
      },
      {
       "q": "Why must features be scaled before applying ridge or lasso?",
       "options": [
        "Penalties only work on integers",
        "The penalty treats all weights alike, so feature units would decide which are shrunk",
        "Scaling removes outliers automatically",
        "Unscaled features make the penalised loss non-convex, so the optimiser cannot find the minimum"
       ],
       "answer": 1,
       "explain": "A feature in large units needs a small weight and is barely penalised; scaling puts features on equal footing."
      },
      {
       "q": "How should the regularisation strength be chosen?",
       "options": [
        "By maximising training accuracy",
        "By testing every candidate value on the held-out test set",
        "By always using the library default",
        "By cross-validation on the training data"
       ],
       "answer": 3,
       "explain": "Cross-validation estimates generalisation for each value without touching the test set."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l5",
   "title": "Other Classic Learners: k-NN, Naive Bayes and SVMs",
   "subtitle": "Three more supervised methods every practitioner should recognise",
   "minutes": 24,
   "objectives": [
    "Explain how k-nearest neighbours predicts and how k affects it",
    "Compute a naive Bayes posterior for a simple text example",
    "Describe the margin, hinge loss and kernels in support vector machines",
    "Choose a sensible model family for a given problem"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Linear and logistic regression are not the only classic tools. **k-nearest neighbours** predicts from similar past examples, **naive Bayes** applies Bayes' rule with a strong simplifying assumption, and **support vector machines** find the widest possible gap between classes. Each is still useful as a baseline or in niche settings."
    },
    {
     "type": "framework",
     "title": "Three classic learners at a glance",
     "items": [
      {
       "label": "kNN",
       "title": "k-nearest neighbours",
       "text": "Find the k closest training examples and vote (classification) or average (regression). No training phase; prediction can be slow."
      },
      {
       "label": "NB",
       "title": "Naive Bayes",
       "text": "Assume features are independent given the class, multiply simple probabilities, pick the most probable class. Fast and strong for text."
      },
      {
       "label": "SVM",
       "title": "Support vector machine",
       "text": "Find the boundary with the widest margin between classes; kernels allow curved boundaries."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Worked calculations",
     "items": [
      {
       "name": "k-NN vote",
       "expr": "k = 5 neighbours: 3 'default', 2 'repay'",
       "meaning": "Predict 'default' with an estimated probability of 3 ÷ 5 = 0.6."
      },
      {
       "name": "Naive Bayes score",
       "expr": "P(class | x) ∝ P(class) × Π P(xⱼ | class)",
       "meaning": "Multiply the prior by each feature's likelihood, then normalise."
      },
      {
       "name": "Spam example",
       "expr": "Spam: 0.4 × 0.5 × 0.1 = 0.020;  Ham: 0.6 × 0.05 × 0.3 = 0.009",
       "meaning": "For an email with 'offer' and 'meeting': P(spam) = 0.020 ÷ 0.029 ≈ 0.69."
      },
      {
       "name": "SVM margin",
       "expr": "margin width = 2 ÷ ‖w‖",
       "meaning": "With w = (3, 4), ‖w‖ = 5, so the margin is 0.4. Smaller weights mean a wider margin."
      },
      {
       "name": "Hinge loss",
       "expr": "L = max(0, 1 − y f(x)) with y ∈ {−1, +1}",
       "meaning": "y = +1, f(x) = 0.3 gives 0.7; f(x) = 1.5 gives 0, because it is beyond the margin."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Choosing k in k-NN",
     "columns": [
      {
       "title": "Small k (e.g. 1)",
       "items": [
        "Very flexible, follows noise",
        "Low bias, high variance",
        "Sensitive to mislabelled points"
       ]
      },
      {
       "title": "Large k (e.g. 50)",
       "items": [
        "Smooth, stable predictions",
        "Higher bias, lower variance",
        "Can blur genuine local patterns"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "Comparing three learners with cross-validation",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_breast_cancer",
      "from sklearn.model_selection import cross_val_score",
      "from sklearn.pipeline import make_pipeline",
      "from sklearn.preprocessing import StandardScaler",
      "from sklearn.neighbors import KNeighborsClassifier",
      "from sklearn.naive_bayes import GaussianNB",
      "from sklearn.svm import SVC",
      "X, y = load_breast_cancer(return_X_y=True)",
      "models = {'kNN': make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=7)),",
      "          'NB': GaussianNB(), 'SVM': make_pipeline(StandardScaler(), SVC(C=1.0))}",
      "for name, m in models.items():",
      "    print(name, round(cross_val_score(m, X, y, cv=5).mean(), 3))",
      "# output: kNN 0.97",
      "# output: NB 0.939",
      "# output: SVM 0.974"
     ],
     "note": "k-NN and SVM need scaled features; naive Bayes does not. On this small, clean dataset all three are strong, so simplicity, speed and explainability may decide."
    },
    {
     "type": "table",
     "title": "Which classic model when?",
     "head": [
      "Model",
      "Strengths",
      "Weaknesses",
      "Typical use"
     ],
     "rows": [
      [
       "Linear / logistic regression",
       "Fast, explainable, calibrated probabilities",
       "Needs engineered non-linearities",
       "Credit scoring, baselines, regulated settings"
      ],
      [
       "k-NN",
       "No training, adapts to local patterns",
       "Slow at prediction, needs scaling, struggles in high dimensions",
       "Small datasets, similarity search, baselines"
      ],
      [
       "Naive Bayes",
       "Very fast, works with little data, good for text",
       "Independence assumption; probabilities often over-confident",
       "Spam and complaint routing, quick text baselines"
      ],
      [
       "SVM",
       "Strong on medium-sized, high-dimensional data",
       "Slow on very large data, probabilities need extra calibration",
       "Text classification, bioinformatics, small image tasks"
      ],
      [
       "Tree ensembles (next module)",
       "Top accuracy on tabular data, little preprocessing",
       "Less transparent, larger models",
       "Most tabular business problems"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "In high dimensions, almost all points are far from each other and distances become similar, so 'nearest' neighbours are not very near. Distance-based methods such as k-NN weaken as the number of features grows unless the data truly lies on a lower-dimensional structure. Feature selection or dimensionality reduction helps.",
     "title": "The curse of dimensionality"
    },
    {
     "type": "scenario",
     "situation": "A telecom operator wants a quick first model to route customer complaints (in Bangla and English) into eight categories. There are 3,000 labelled messages and results are needed within a week. What is the most sensible first model?",
     "options": [
      {
       "text": "k-NN on raw character counts without scaling",
       "feedback": "Raw high-dimensional counts make distances unreliable, and k-NN is slow to serve.",
       "best": false
      },
      {
       "text": "Wait until 100,000 messages are labelled",
       "feedback": "A baseline now provides value and helps decide where labelling effort is most needed.",
       "best": false
      },
      {
       "text": "TF-IDF features with a naive Bayes or linear classifier as a fast baseline",
       "feedback": "Correct. With little labelled text and a tight deadline, a sparse text representation with naive Bayes or logistic regression is quick, cheap and often surprisingly strong.",
       "best": true
      },
      {
       "text": "Train a transformer from scratch on the 3,000 messages",
       "feedback": "Training from scratch needs vast data; 3,000 messages are far too few, and a week is too short.",
       "best": false
      }
     ],
     "title": "Routing Bangla and English complaints"
    },
    {
     "type": "template",
     "title": "Model comparison sheet",
     "purpose": "Compare candidate model families on the same folds and record the non-accuracy factors that often decide the choice.",
     "columns": [
      "Model",
      "CV metric (mean ± sd)",
      "Train time",
      "Predict time per 1,000 rows",
      "Explainability",
      "Decision"
     ],
     "example": [
      [
       "Logistic regression (L2)",
       "AUC 0.861 ± 0.012",
       "4 s",
       "2 ms",
       "High: coefficients and reason codes",
       "Baseline and fallback"
      ],
      [
       "SVM (RBF kernel)",
       "AUC 0.868 ± 0.015",
       "9 min",
       "180 ms",
       "Low",
       "Rejected: small gain, slow, opaque"
      ]
     ],
     "rows": 5
    },
    {
     "type": "reflection",
     "prompt": "For a classification problem you know, which of k-NN, naive Bayes, SVM and logistic regression would you try first, and what would make you switch?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "k-nearest neighbours",
       "def": "A method that predicts from the labels or values of the k most similar training examples."
      },
      {
       "term": "Naive Bayes",
       "def": "A probabilistic classifier that assumes features are conditionally independent given the class."
      },
      {
       "term": "Support vector machine",
       "def": "A classifier that finds the boundary maximising the margin between classes."
      },
      {
       "term": "Margin",
       "def": "The distance between the decision boundary and the closest training points of each class."
      },
      {
       "term": "Hinge loss",
       "def": "The SVM loss max(0, 1 − y f(x)), zero for points correctly classified beyond the margin."
      },
      {
       "term": "Kernel trick",
       "def": "Computing similarities as if data were mapped into a higher-dimensional space, without building that space explicitly."
      },
      {
       "term": "Curse of dimensionality",
       "def": "The set of problems, such as distances losing meaning, that arise as the number of features grows."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "With k = 7, the neighbours are 4 'fraud' and 3 'legitimate'. What does k-NN predict?",
       "options": [
        "Legitimate, because it is the majority class overall",
        "Fraud, with probability 1.0",
        "No prediction, because k must be even",
        "Fraud, with estimated probability about 0.57"
       ],
       "answer": 3,
       "explain": "4 of 7 votes give 'fraud' and a probability estimate of 4 ÷ 7 ≈ 0.57."
      },
      {
       "q": "An SVM has weight vector w = (6, 8). What is the margin width 2 ÷ ‖w‖?",
       "options": [
        "0.4",
        "0.2",
        "2",
        "0.1"
       ],
       "answer": 1,
       "explain": "‖w‖ = 10, so 2 ÷ 10 = 0.2."
      },
      {
       "q": "What is the hinge loss for y = −1 and f(x) = 0.5?",
       "options": [
        "0.5",
        "0",
        "1.5",
        "−0.5"
       ],
       "answer": 2,
       "explain": "max(0, 1 − (−1)(0.5)) = max(0, 1.5) = 1.5."
      },
      {
       "q": "What is the 'naive' assumption in naive Bayes?",
       "options": [
        "Features are independent of each other given the class",
        "All classes have equal prior probability",
        "Every feature is normally distributed",
        "The data contains no missing values"
       ],
       "answer": 0,
       "explain": "The model multiplies per-feature likelihoods, which is valid only under conditional independence."
      },
      {
       "q": "Why does k-NN often weaken with hundreds of raw features?",
       "options": [
        "k-NN cannot store that many columns",
        "Distances become less informative in high dimensions",
        "It needs labels for every feature",
        "It requires a GPU once there are more than 100 features to compare"
       ],
       "answer": 1,
       "explain": "The curse of dimensionality makes points roughly equidistant, so neighbours stop being meaningful."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m4",
 "order": 4,
 "code": "Evaluate",
 "title": "Evaluation: Measuring Models Honestly",
 "subtitle": "Split, cross-validate and measure with the right metrics, then guard against overfitting and leakage",
 "outcomes": [
  "Design train, validation and test splits and cross-validation that mirror deployment",
  "Choose and compute regression metrics that match the cost of errors",
  "Evaluate classifiers with confusion matrices, ROC and PR curves, thresholds and calibration",
  "Diagnose bias and variance and tune hyperparameters efficiently",
  "Detect and prevent data leakage and run reproducible, fair experiments"
 ],
 "lessons": [
  {
   "id": "m4-l1",
   "title": "Splits and Cross-Validation",
   "subtitle": "Estimate real-world performance honestly before a model meets real users",
   "minutes": 24,
   "objectives": [
    "Explain the separate roles of training, validation and test sets",
    "Apply k-fold, stratified, grouped and time-based cross-validation",
    "Report a cross-validated score with its spread",
    "Choose a split that mirrors how the model will be used"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A model's score on the data it was trained on says almost nothing about how it will perform tomorrow. Evaluation is the craft of **simulating the future** with data the model has not seen, in a way that matches how predictions will actually be made."
    },
    {
     "type": "table",
     "title": "Three datasets, three jobs",
     "head": [
      "Set",
      "Used for",
      "Typical share",
      "Golden rule"
     ],
     "rows": [
      [
       "Training",
       "Fitting model parameters",
       "60–80%",
       "The model may see it as often as it likes"
      ],
      [
       "Validation",
       "Choosing features, models and hyperparameters",
       "10–20% (or cross-validation folds)",
       "Used repeatedly, so it slowly becomes optimistic"
      ],
      [
       "Test",
       "One final, unbiased estimate",
       "10–20%",
       "Touched once, at the end; never used to make choices"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Cross-validation schemes",
     "columns": [
      {
       "title": "k-fold and stratified k-fold",
       "items": [
        "Split data into k folds; each fold is validation once",
        "Stratified keeps class proportions in every fold",
        "Default for independent rows"
       ]
      },
      {
       "title": "Group k-fold",
       "items": [
        "All rows of a group (patient, customer, factory) stay in one fold",
        "Prevents the model from recognising the same entity",
        "Essential when entities repeat"
       ]
      },
      {
       "title": "Time-series split",
       "items": [
        "Train on the past, validate on the next period",
        "Expanding or rolling windows",
        "Mandatory for forecasting and drifting data"
       ]
      }
     ]
    },
    {
     "type": "formula",
     "title": "Summarising cross-validation",
     "items": [
      {
       "name": "CV estimate",
       "expr": "score_CV = (1/k) Σ score_i",
       "meaning": "Fold scores 0.80, 0.82, 0.78, 0.84, 0.81 give a mean of 0.81."
      },
      {
       "name": "Spread",
       "expr": "s = √[Σ(score_i − mean)² ÷ (k − 1)]",
       "meaning": "Deviations −0.01, 0.01, −0.03, 0.03, 0 give s = √(0.002 ÷ 4) ≈ 0.022."
      },
      {
       "name": "Standard error",
       "expr": "SE ≈ s ÷ √k",
       "meaning": "0.022 ÷ √5 ≈ 0.010. Report 0.81 ± 0.01, and treat smaller differences between models with caution."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Seeing how splitters behave",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.model_selection import GroupKFold, TimeSeriesSplit",
      "X = np.arange(8).reshape(-1, 1)",
      "groups = ['p1', 'p1', 'p2', 'p2', 'p3', 'p3', 'p4', 'p4']",
      "for tr, va in GroupKFold(n_splits=2).split(X, groups=groups):",
      "    print(sorted({groups[i] for i in va}))",
      "# output: ['p2', 'p4']",
      "# output: ['p1', 'p3']",
      "for tr, va in TimeSeriesSplit(n_splits=3).split(X):",
      "    print(tr.tolist(), va.tolist())",
      "# output: [0, 1] [2, 3]",
      "# output: [0, 1, 2, 3] [4, 5]",
      "# output: [0, 1, 2, 3, 4, 5] [6, 7]"
     ],
     "note": "GroupKFold never splits a patient across folds. TimeSeriesSplit always validates on rows that come after the training rows."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If the model will score **new customers**, validate on customers it has never seen (group split). If it will predict **next month**, validate on a later period (time split). A random split in these cases measures a skill the model will never be asked to use, and the score will be too high.",
     "title": "Match the split to deployment"
    },
    {
     "type": "keypoints",
     "items": [
      "Use stratified folds for classification, especially with rare classes.",
      "Use 5 or 10 folds for small and medium data; a single hold-out is fine for very large data.",
      "Put every preprocessing step inside the pipeline that is cross-validated.",
      "For tuning plus an unbiased estimate on small data, use **nested cross-validation**: an inner loop tunes, an outer loop scores.",
      "Lock the test set away early and record when it was used."
     ],
     "title": "Practical rules"
    },
    {
     "type": "scenario",
     "situation": "A Chattogram hospital builds a model to predict complications from visit records. Most patients have 5–20 visits. A random 5-fold split gives AUC 0.93. The model will be used for new patients. What should the team do?",
     "options": [
      {
       "text": "Evaluate on the training set to double-check",
       "feedback": "Training-set scores are even more optimistic.",
       "best": false
      },
      {
       "text": "Re-evaluate with group k-fold so each patient's visits are in only one fold",
       "feedback": "Correct. With random splits, the model sees other visits of the same patient during training and partly recognises the person, which will not happen with new patients.",
       "best": true
      },
      {
       "text": "Keep the random split, since 5 folds already average out noise",
       "feedback": "Averaging does not remove the systematic optimism caused by the same patients appearing on both sides.",
       "best": false
      },
      {
       "text": "Use 20 folds instead of 5 for a more precise estimate",
       "feedback": "More folds do not fix the leakage of patient identity between training and validation.",
       "best": false
      }
     ],
     "title": "Patients with many visits"
    },
    {
     "type": "template",
     "title": "Evaluation plan",
     "purpose": "Agree how the model will be judged before any experiments, so results cannot be cherry-picked.",
     "columns": [
      "Item",
      "Decision",
      "Reason"
     ],
     "example": [
      [
       "Split strategy",
       "Time-based: train on Jan 2024–Jun 2025, validate Jul–Dec 2025, test Jan–Mar 2026",
       "Model will predict future months"
      ],
      [
       "Primary metric",
       "Recall at the top 5% of scores",
       "Matches review team capacity"
      ]
     ],
     "rows": 7
    },
    {
     "type": "reflection",
     "prompt": "How will your model be used: for new entities, for future periods, or both? Write down the split you would use and what a random split would get wrong."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Training set",
       "def": "The data used to fit a model's parameters."
      },
      {
       "term": "Validation set",
       "def": "Data used to compare models and tune hyperparameters during development."
      },
      {
       "term": "Test set",
       "def": "Held-out data used once for a final, unbiased estimate of performance."
      },
      {
       "term": "k-fold cross-validation",
       "def": "Splitting data into k parts and training k times, each time validating on a different part."
      },
      {
       "term": "Stratified sampling",
       "def": "Splitting so that each subset keeps the overall class proportions."
      },
      {
       "term": "Group k-fold",
       "def": "Cross-validation that keeps all rows of the same group together in one fold."
      },
      {
       "term": "Nested cross-validation",
       "def": "An outer cross-validation loop for scoring wrapped around an inner loop for tuning."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Fold scores are 0.70, 0.74, 0.72, 0.76, 0.68. What is the CV mean?",
       "options": [
        "0.72",
        "0.74",
        "0.70",
        "0.76"
       ],
       "answer": 0,
       "explain": "Sum 3.60 ÷ 5 = 0.72."
      },
      {
       "q": "Which split suits a model that forecasts next quarter's sales?",
       "options": [
        "Random 80/20 split of all rows",
        "Stratified k-fold by store",
        "Train on earlier periods and validate on later ones",
        "Leave-one-out cross-validation on rows shuffled at random"
       ],
       "answer": 2,
       "explain": "Forecasts must be validated on the future relative to training data."
      },
      {
       "q": "Why should the test set be used only once?",
       "options": [
        "It is usually too small to give a stable estimate more than once",
        "Each use to make a choice makes its estimate optimistic",
        "Libraries delete it after one use",
        "It contains no labels"
       ],
       "answer": 1,
       "explain": "Choosing based on test results turns it into another validation set."
      },
      {
       "q": "A model scores customers it has never seen before. Rows include several transactions per customer. Which scheme fits?",
       "options": [
        "Plain k-fold on transactions",
        "Time-series split by row number only",
        "No validation, just a test set",
        "Group k-fold by customer"
       ],
       "answer": 3,
       "explain": "Grouping keeps each customer's rows together so validation mimics new customers."
      },
      {
       "q": "What does nested cross-validation provide?",
       "options": [
        "Faster training than a single split",
        "A larger training set",
        "Automatic feature engineering",
        "An unbiased score for a whole procedure that includes tuning"
       ],
       "answer": 3,
       "explain": "The outer loop scores the complete tune-then-fit process on data the tuning never saw."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l2",
   "title": "Regression Metrics",
   "subtitle": "MAE, RMSE, MAPE and R²: what each one rewards and when it misleads",
   "minutes": 20,
   "objectives": [
    "Compute MAE, MSE, RMSE, MAPE and R² by hand",
    "Choose a regression metric that matches the cost of errors",
    "Recognise the pitfalls of percentage errors",
    "Use quantile loss when over- and under-prediction cost differently"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every regression metric summarises the errors differently, and the choice changes which model looks best. Choose the metric that matches **how errors cost money, time or safety** in the real decision, then use the same metric for tuning and reporting."
    },
    {
     "type": "formula",
     "title": "Regression metrics with a worked example",
     "items": [
      {
       "name": "Data",
       "expr": "actual = (10, 20, 30, 40); predicted = (12, 19, 33, 36)",
       "meaning": "Errors are +2, −1, +3, −4."
      },
      {
       "name": "Mean absolute error",
       "expr": "MAE = (1/n) Σ |yᵢ − ŷᵢ|",
       "meaning": "(2 + 1 + 3 + 4) ÷ 4 = 2.5 units."
      },
      {
       "name": "Mean squared error",
       "expr": "MSE = (1/n) Σ (yᵢ − ŷᵢ)²",
       "meaning": "(4 + 1 + 9 + 16) ÷ 4 = 7.5 squared units."
      },
      {
       "name": "Root mean squared error",
       "expr": "RMSE = √MSE",
       "meaning": "√7.5 ≈ 2.74 units; always ≥ MAE, more so when errors vary in size."
      },
      {
       "name": "Mean absolute percentage error",
       "expr": "MAPE = (100/n) Σ |yᵢ − ŷᵢ| ÷ |yᵢ|",
       "meaning": "(20% + 5% + 10% + 10%) ÷ 4 = 11.25%. Undefined when any actual is 0."
      },
      {
       "name": "Quantile (pinball) loss",
       "expr": "L_τ = τ(y − ŷ) if y ≥ ŷ, else (1 − τ)(ŷ − y)",
       "meaning": "With τ = 0.9, under-predicting by 10 costs 9 while over-predicting by 10 costs 1."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Checking the arithmetic",
     "device": "Python notebook",
     "lines": [
      "from sklearn.metrics import mean_absolute_error, mean_squared_error, mean_absolute_percentage_error",
      "y, p = [10, 20, 30, 40], [12, 19, 33, 36]",
      "mse = mean_squared_error(y, p)",
      "print(mean_absolute_error(y, p), mse, round(mse ** 0.5, 3))",
      "# output: 2.5 7.5 2.739",
      "print(round(mean_absolute_percentage_error(y, p), 4))",
      "# output: 0.1125"
     ],
     "note": "The library returns MAPE as a fraction (0.1125), not a percentage. Always check the units a function reports."
    },
    {
     "type": "table",
     "title": "Which metric when?",
     "head": [
      "Metric",
      "Rewards",
      "Good for",
      "Watch out"
     ],
     "rows": [
      [
       "MAE",
       "Being close in typical cases",
       "Delivery times, staffing",
       "Optimised by the median, not the mean"
      ],
      [
       "RMSE",
       "Avoiding large errors",
       "Energy load, where big misses are costly",
       "Dominated by a few outliers"
      ],
      [
       "MAPE",
       "Small relative errors",
       "Comparing series of different sizes",
       "Explodes near zero; punishes over-forecasts more than under-forecasts"
      ],
      [
       "R²",
       "Explaining variance vs the mean",
       "Quick comparison on one dataset",
       "Not comparable across datasets; says nothing about error size"
      ],
      [
       "Quantile loss",
       "Correct upper or lower bound",
       "Safety stock, capacity planning",
       "Need one model or output per quantile"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "For a power plant forecasting next-day load in Chattogram, under-forecasting forces expensive emergency purchases while over-forecasting wastes some fuel. Optimising the 0.8 or 0.9 quantile, rather than the mean, builds that asymmetry directly into the model.",
     "title": "Asymmetric costs in a power plant"
    },
    {
     "type": "compare",
     "title": "Mean versus median prediction",
     "columns": [
      {
       "title": "Minimising squared error",
       "items": [
        "Best constant prediction is the mean",
        "Pulled by extreme values",
        "Natural for symmetric noise"
       ]
      },
      {
       "title": "Minimising absolute error",
       "items": [
        "Best constant prediction is the median",
        "Robust to extreme values",
        "Natural for skewed targets such as amounts"
       ]
      }
     ]
    },
    {
     "type": "scenario",
     "situation": "A pharmacy chain forecasts daily sales for 3,000 products. Many slow-moving medicines sell 0 units on most days. The team proposes MAPE as the single headline metric. What is the main problem?",
     "options": [
      {
       "text": "MAPE is too lenient on large errors",
       "feedback": "The bigger issue is that it cannot be computed when actual sales are zero.",
       "best": false
      },
      {
       "text": "MAPE can only be used for classification",
       "feedback": "MAPE is a regression metric; the issue is zeros in the actuals.",
       "best": false
      },
      {
       "text": "MAPE requires the data to be normally distributed",
       "feedback": "MAPE makes no distributional assumption; its problem is division by small or zero actuals.",
       "best": false
      },
      {
       "text": "MAPE is undefined or explodes on days with zero actual sales",
       "feedback": "Correct. Division by zero makes MAPE unusable for intermittent demand. Use MAE, a scaled error, or a weighted absolute percentage error over totals instead.",
       "best": true
      }
     ],
     "title": "Forecasting pharmacy demand"
    },
    {
     "type": "checklist",
     "title": "Before reporting a regression result",
     "items": [
      "The metric matches the business cost of errors",
      "A naive baseline (mean, median or last value) is reported alongside",
      "Errors are broken down by important segments, not just averaged",
      "Units are clear: absolute, squared or percentage",
      "Large individual errors have been inspected, not just summarised"
     ]
    },
    {
     "type": "reflection",
     "prompt": "For a number your team forecasts, is under-prediction or over-prediction more costly? Which metric or quantile would reflect that?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "MAE",
       "def": "Mean absolute error: the average size of errors, in the target's units."
      },
      {
       "term": "MSE",
       "def": "Mean squared error: the average squared error, sensitive to large mistakes."
      },
      {
       "term": "RMSE",
       "def": "Root mean squared error: the square root of MSE, back in the target's units."
      },
      {
       "term": "MAPE",
       "def": "Mean absolute percentage error: average error as a percentage of the actual value."
      },
      {
       "term": "Quantile loss",
       "def": "An asymmetric loss that trains a model to predict a chosen percentile of the target."
      },
      {
       "term": "Prediction interval",
       "def": "A range expected to contain the actual value with a stated probability."
      },
      {
       "term": "Intermittent demand",
       "def": "A demand series with many zero periods, common for slow-moving products."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Errors are 3, −3, 3, −3. What is the MAE?",
       "options": [
        "0",
        "3",
        "9",
        "6"
       ],
       "answer": 1,
       "explain": "Absolute errors are all 3, so the mean is 3."
      },
      {
       "q": "Errors are 0, 0, 0, 8. What is the RMSE?",
       "options": [
        "2",
        "8",
        "4",
        "16"
       ],
       "answer": 2,
       "explain": "MSE = 64 ÷ 4 = 16; RMSE = 4. MAE would be only 2, showing RMSE's sensitivity to large errors."
      },
      {
       "q": "Which constant prediction minimises MAE on a skewed target?",
       "options": [
        "The median",
        "The mean",
        "The maximum",
        "Zero"
       ],
       "answer": 0,
       "explain": "Absolute loss is minimised by the median."
      },
      {
       "q": "Why is MAPE unsuitable when some actual values are zero?",
       "options": [
        "It ignores negative errors, so over-forecasts and under-forecasts look the same",
        "It divides by the actual value, which makes the error undefined",
        "It always equals RMSE",
        "It requires classification labels"
       ],
       "answer": 1,
       "explain": "Division by zero breaks the metric."
      },
      {
       "q": "A team wants a forecast that is rarely too low, because shortages are dangerous. What should they optimise?",
       "options": [
        "The mean using MSE",
        "The median of the target, trained with MAE",
        "R² on the training set",
        "A high quantile such as the 0.9 quantile"
       ],
       "answer": 3,
       "explain": "A high quantile places the prediction above most outcomes, so it is rarely too low."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l3",
   "title": "Classification Metrics and Thresholds",
   "subtitle": "Confusion matrices, precision, recall, ROC and PR curves, and calibration",
   "minutes": 26,
   "objectives": [
    "Build a confusion matrix and compute precision, recall, F1 and specificity",
    "Interpret ROC-AUC and PR-AUC, and know when each is more informative",
    "Choose a threshold from costs or capacity",
    "Check whether predicted probabilities are calibrated"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A classifier's errors come in two kinds that rarely cost the same. Missing a fraudulent transfer and blocking a genuine one are different failures with different owners. Good evaluation keeps the two kinds apart and then chooses a **threshold** that balances them for the business."
    },
    {
     "type": "table",
     "title": "The confusion matrix (positive = fraud)",
     "head": [
      "Actual class",
      "Predicted fraud",
      "Predicted legitimate"
     ],
     "rows": [
      [
       "Actually fraud",
       "True positive (TP) = 80",
       "False negative (FN) = 40"
      ],
      [
       "Actually legitimate",
       "False positive (FP) = 20",
       "True negative (TN) = 860"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Metrics from the matrix above",
     "items": [
      {
       "name": "Accuracy",
       "expr": "(TP + TN) ÷ total",
       "meaning": "(80 + 860) ÷ 1,000 = 0.94, flattering because most cases are legitimate."
      },
      {
       "name": "Precision",
       "expr": "TP ÷ (TP + FP)",
       "meaning": "80 ÷ 100 = 0.80: of the flagged transfers, 80% are fraud."
      },
      {
       "name": "Recall (sensitivity)",
       "expr": "TP ÷ (TP + FN)",
       "meaning": "80 ÷ 120 ≈ 0.667: two-thirds of fraud is caught."
      },
      {
       "name": "Specificity",
       "expr": "TN ÷ (TN + FP)",
       "meaning": "860 ÷ 880 ≈ 0.977 of legitimate transfers pass untouched."
      },
      {
       "name": "F1 score",
       "expr": "2 × precision × recall ÷ (precision + recall)",
       "meaning": "2 × 0.8 × 0.667 ÷ 1.467 ≈ 0.727, the harmonic mean."
      },
      {
       "name": "Brier score",
       "expr": "(1/n) Σ (pᵢ − yᵢ)²",
       "meaning": "Mean squared error of probabilities; 0 is perfect. Rewards calibrated, sharp predictions."
      }
     ]
    },
    {
     "type": "compare",
     "title": "ROC curve versus precision–recall curve",
     "columns": [
      {
       "title": "ROC and ROC-AUC",
       "items": [
        "Plots recall against false positive rate at every threshold",
        "AUC = probability a random positive scores above a random negative",
        "0.5 is random, 1.0 is perfect",
        "Can look excellent when positives are very rare"
       ]
      },
      {
       "title": "Precision–recall and PR-AUC",
       "items": [
        "Plots precision against recall",
        "Baseline equals the positive rate (e.g. 0.01)",
        "Shows the false-alarm burden directly",
        "Preferred for rare-event problems such as fraud and disease"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "Metrics and threshold choice in code",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.metrics import confusion_matrix, precision_score, recall_score, roc_auc_score",
      "y = np.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1])",
      "p = np.array([0.1, 0.2, 0.15, 0.3, 0.45, 0.6, 0.4, 0.7, 0.8, 0.9])",
      "for t in (0.5, 0.35):",
      "    pred = (p >= t).astype(int)",
      "    print(t, confusion_matrix(y, pred).ravel().tolist(), round(precision_score(y, pred), 3), recall_score(y, pred))",
      "# output: 0.5 [5, 1, 1, 3] 0.75 0.75",
      "# output: 0.35 [4, 2, 0, 4] 0.667 1.0",
      "print(round(roc_auc_score(y, p), 3))",
      "# output: 0.917"
     ],
     "note": "ravel() returns TN, FP, FN, TP. Lowering the threshold from 0.5 to 0.35 catches every positive but doubles the false alarms. AUC does not depend on the threshold."
    },
    {
     "type": "steps",
     "title": "Choosing a threshold",
     "items": [
      {
       "title": "List the costs",
       "text": "Cost of a false positive (e.g. a 50 BDT manual review) and of a false negative (e.g. an average 8,000 BDT fraud loss)."
      },
      {
       "title": "Note capacity",
       "text": "The review team can handle 400 alerts a day."
      },
      {
       "title": "Sweep thresholds",
       "text": "On validation data, compute TP, FP and FN at many thresholds."
      },
      {
       "title": "Score each threshold",
       "text": "Expected cost = FP × 50 + FN × 8,000, subject to alerts ≤ 400 a day."
      },
      {
       "title": "Pick, then confirm",
       "text": "Choose the lowest-cost feasible threshold, confirm on the test set and monitor in production."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "If a model says 0.2 for a group of patients, about 20% of them should have the outcome. Boosted trees, SVMs and over-trained networks are often mis-calibrated. Check with a reliability plot (predicted versus observed rate per bin) and fix with Platt scaling or isotonic regression fitted on validation data.",
     "title": "Calibration matters for decisions"
    },
    {
     "type": "scenario",
     "situation": "A screening model for a rare condition (0.5% prevalence) has ROC-AUC 0.95. The clinical lead wants to know whether it is good enough. Which additional evidence is MOST useful?",
     "options": [
      {
       "text": "The training-set ROC-AUC",
       "feedback": "Training scores are optimistic and say nothing new about clinical usefulness.",
       "best": false
      },
      {
       "text": "The number of features in the model",
       "feedback": "Model size does not tell clinicians how many flagged patients will truly have the condition.",
       "best": false
      },
      {
       "text": "The precision–recall curve and the precision at the recall level the clinic needs",
       "feedback": "Correct. With 0.5% prevalence, even a high AUC can mean most positives are false alarms. PR analysis shows the real workload and yield.",
       "best": true
      },
      {
       "text": "Accuracy at the 0.5 threshold",
       "feedback": "Accuracy will be around 99.5% even for a useless model that predicts 'healthy' for everyone.",
       "best": false
      }
     ],
     "title": "Rare disease screening"
    },
    {
     "type": "template",
     "title": "Threshold decision record",
     "purpose": "Document how and why a probability threshold was chosen, so it can be reviewed and revisited when costs or capacity change.",
     "columns": [
      "Model and version",
      "Cost of FP",
      "Cost of FN",
      "Capacity limit",
      "Chosen threshold",
      "Expected precision / recall",
      "Approved by"
     ],
     "example": [
      [
       "Fraud scorer v3.2",
       "50 BDT review",
       "8,000 BDT average loss",
       "400 alerts per day",
       "0.62",
       "0.41 / 0.78 on validation",
       "Head of fraud operations"
      ]
     ],
     "rows": 4
    },
    {
     "type": "reflection",
     "prompt": "For a classifier you know, estimate the cost of a false positive and of a false negative. What would a threshold based on those costs look like compared with 0.5?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Confusion matrix",
       "def": "A table counting true positives, false positives, false negatives and true negatives."
      },
      {
       "term": "Precision",
       "def": "The share of predicted positives that are truly positive."
      },
      {
       "term": "Recall",
       "def": "The share of actual positives that the model correctly identifies; also called sensitivity."
      },
      {
       "term": "F1 score",
       "def": "The harmonic mean of precision and recall."
      },
      {
       "term": "ROC-AUC",
       "def": "The area under the curve of true positive rate against false positive rate; the probability a random positive outranks a random negative."
      },
      {
       "term": "PR-AUC",
       "def": "The area under the precision–recall curve; informative for rare positive classes."
      },
      {
       "term": "Reliability diagram",
       "def": "A plot of predicted probability against observed frequency used to check calibration."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "TP = 30, FP = 10, FN = 20. What is recall?",
       "options": [
        "0.6",
        "0.75",
        "0.4",
        "0.67"
       ],
       "answer": 0,
       "explain": "Recall = 30 ÷ (30 + 20) = 0.6. Precision would be 0.75."
      },
      {
       "q": "Precision = 0.5 and recall = 1.0. What is F1?",
       "options": [
        "About 0.750",
        "About 0.500",
        "About 0.667",
        "Exactly 1.0"
       ],
       "answer": 2,
       "explain": "2 × 0.5 × 1 ÷ 1.5 ≈ 0.667."
      },
      {
       "q": "What does a ROC-AUC of 0.5 indicate?",
       "options": [
        "Perfect ranking",
        "50% accuracy at every threshold",
        "Ranking no better than random",
        "Perfect calibration"
       ],
       "answer": 2,
       "explain": "AUC 0.5 means a positive is as likely as not to outrank a negative."
      },
      {
       "q": "Lowering the decision threshold usually…",
       "options": [
        "Increases recall and reduces precision",
        "Increases both precision and recall",
        "Reduces recall and increases precision",
        "Has no effect on the confusion matrix"
       ],
       "answer": 0,
       "explain": "More cases are flagged, catching more positives but adding false positives."
      },
      {
       "q": "A model predicts 0.8 for 100 loans and 40 of them default. What does this show?",
       "options": [
        "The model is perfectly calibrated",
        "The model is under-confident",
        "Calibration cannot be judged from this, because it needs the whole score range",
        "The model is over-confident in that range and poorly calibrated"
       ],
       "answer": 3,
       "explain": "Calibrated predictions of 0.8 should see about 80 defaults, not 40."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l4",
   "title": "Bias, Variance and Tuning",
   "subtitle": "Diagnose underfitting and overfitting, read learning curves and search hyperparameters efficiently",
   "minutes": 24,
   "objectives": [
    "Explain the bias–variance trade-off and its decomposition",
    "Diagnose underfitting and overfitting from training and validation scores",
    "Use learning and validation curves to decide what to do next",
    "Choose between grid, random and Bayesian hyperparameter search"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every model error has three sources: **bias** from assumptions too simple to capture the pattern, **variance** from sensitivity to the particular training sample, and **noise** that no model can remove. Knowing which one dominates tells you whether to add complexity, add data or add regularisation."
    },
    {
     "type": "formula",
     "title": "The bias–variance decomposition (squared error)",
     "items": [
      {
       "name": "Expected error",
       "expr": "E[(y − ŷ)²] = Bias² + Variance + Irreducible noise",
       "meaning": "Averaged over many possible training sets."
      },
      {
       "name": "Bias",
       "expr": "Bias = E[ŷ] − f(x)",
       "meaning": "How far the average model is from the truth. High for over-simple models."
      },
      {
       "name": "Variance",
       "expr": "Variance = E[(ŷ − E[ŷ])²]",
       "meaning": "How much predictions change between training sets. High for over-flexible models."
      },
      {
       "name": "Worked example",
       "expr": "Bias² = 4, variance = 9, noise = 2",
       "meaning": "Expected MSE = 15. Halving variance (to 4.5) gives 10.5; removing all bias gives only 11."
      }
     ]
    },
    {
     "type": "table",
     "title": "Diagnosing from training and validation scores",
     "head": [
      "Pattern",
      "Diagnosis",
      "What helps"
     ],
     "rows": [
      [
       "Training poor, validation poor (similar)",
       "High bias: underfitting",
       "More features, more flexible model, less regularisation, train longer"
      ],
      [
       "Training excellent, validation much worse",
       "High variance: overfitting",
       "More data, stronger regularisation, simpler model, early stopping, bagging"
      ],
      [
       "Both good, small gap",
       "Good fit",
       "Confirm on test set; check segments"
      ],
      [
       "Validation better than training",
       "Often regularisation such as dropout, or a leak or easy validation set",
       "Check the split before celebrating"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Learning curves: what more data will do",
     "columns": [
      {
       "title": "High-bias learning curve",
       "items": [
        "Training and validation scores converge quickly",
        "Both plateau at a poor level",
        "More data will not help much",
        "Change the model or features"
       ]
      },
      {
       "title": "High-variance learning curve",
       "items": [
        "Large gap between training and validation",
        "Validation still rising as data grows",
        "More data is likely to help",
        "So will regularisation"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "A validation curve for tree depth",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import make_classification",
      "from sklearn.model_selection import validation_curve",
      "from sklearn.tree import DecisionTreeClassifier",
      "X, y = make_classification(n_samples=800, n_features=20, n_informative=6, flip_y=0.1, random_state=1)",
      "depths = [1, 3, 5, 10, 20]",
      "tr, va = validation_curve(DecisionTreeClassifier(random_state=0), X, y, param_name='max_depth', param_range=depths, cv=5)",
      "for d, a, b in zip(depths, tr.mean(1), va.mean(1)):",
      "    print(d, round(a, 2), round(b, 2))",
      "# output: 1 0.79 0.78",
      "# output: 3 0.88 0.84",
      "# output: 5 0.93 0.84",
      "# output: 10 0.99 0.84",
      "# output: 20 1.0 0.83"
     ],
     "note": "A depth-1 tree underfits: both scores are low. From depth 3 the validation score stops improving while the training score climbs to a perfect 1.0, a widening gap that signals memorisation. Prefer the simplest depth near the validation peak, here about 3."
    },
    {
     "type": "table",
     "title": "Hyperparameter search strategies",
     "head": [
      "Strategy",
      "How it works",
      "Strength",
      "Weakness"
     ],
     "rows": [
      [
       "Grid search",
       "Try every combination of listed values",
       "Simple, exhaustive on small grids",
       "Explodes combinatorially; wastes trials on unimportant parameters"
      ],
      [
       "Random search",
       "Sample combinations from ranges",
       "Covers important parameters better for the same budget",
       "Can miss narrow optima"
      ],
      [
       "Bayesian optimisation",
       "Builds a model of score versus settings and picks promising trials",
       "Efficient when each trial is expensive",
       "More complex; sequential by nature"
      ],
      [
       "Successive halving / early stopping of trials",
       "Start many trials cheaply, keep the best, give them more budget",
       "Very efficient for neural networks and boosting",
       "Early results may mislead"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Tune the few hyperparameters that matter most (learning rate, regularisation strength, tree depth, number of estimators), use log-scaled ranges for rates and penalties, fix a budget before starting, and record every trial. Most gains come from the first 20–50 well-chosen trials.",
     "title": "Search smart, not wide"
    },
    {
     "type": "scenario",
     "situation": "A model for predicting machine failures in a textile mill shows training AUC 0.99 and validation AUC 0.74. The learning curve shows validation AUC still rising steadily as more data is added. Labelling more failure events is feasible over the next quarter. What is the BEST plan?",
     "options": [
      {
       "text": "Collect more labelled data and add regularisation in the meantime",
       "feedback": "Correct. A large gap with a rising validation curve indicates high variance that more data and regularisation will both reduce.",
       "best": true
      },
      {
       "text": "Stop work because 0.74 is the ceiling",
       "feedback": "The rising validation curve suggests the ceiling has not been reached.",
       "best": false
      },
      {
       "text": "Use a more complex model to raise training AUC to 1.0",
       "feedback": "Training performance is already near perfect; more complexity increases variance.",
       "best": false
      },
      {
       "text": "Tune on the test set to find better settings",
       "feedback": "Using the test set for tuning invalidates the final estimate.",
       "best": false
      }
     ],
     "title": "Next step after a learning curve"
    },
    {
     "type": "reflection",
     "prompt": "Think of the last model you tuned. Which hyperparameters did you search, how many trials did you run, and how did you know when to stop?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Bias",
       "def": "Error from overly simple assumptions that make a model systematically miss the true pattern."
      },
      {
       "term": "Model variance",
       "def": "Error from a model's sensitivity to the specific training sample it saw."
      },
      {
       "term": "Irreducible error",
       "def": "Noise in the target that no model can remove."
      },
      {
       "term": "Underfitting",
       "def": "When a model is too simple to capture the pattern, so training and validation scores are both poor."
      },
      {
       "term": "Learning curve",
       "def": "A plot of training and validation performance against training set size."
      },
      {
       "term": "Validation curve",
       "def": "A plot of training and validation performance against one hyperparameter's value."
      },
      {
       "term": "Random search",
       "def": "Hyperparameter tuning by sampling settings at random from defined ranges."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Bias² = 1, variance = 6 and noise = 3. What is the expected squared error?",
       "options": [
        "7",
        "10",
        "9",
        "16"
       ],
       "answer": 1,
       "explain": "1 + 6 + 3 = 10."
      },
      {
       "q": "Training accuracy 0.62 and validation accuracy 0.60 on a problem where experts reach 0.90. What is the likely issue?",
       "options": [
        "High bias (underfitting)",
        "High variance (overfitting)",
        "Data leakage",
        "Perfect fit"
       ],
       "answer": 0,
       "explain": "Both scores are low and close together, so the model is too simple."
      },
      {
       "q": "Which change typically reduces variance?",
       "options": [
        "Deeper trees with no limits",
        "Removing the validation set",
        "Stronger regularisation",
        "Adding many random features"
       ],
       "answer": 2,
       "explain": "Regularisation constrains the model, making it less sensitive to the training sample."
      },
      {
       "q": "Why does random search often beat grid search for the same number of trials?",
       "options": [
        "It always finds the global optimum",
        "It tries more distinct values of the parameters that really matter",
        "It needs no validation data",
        "It trains each model faster"
       ],
       "answer": 1,
       "explain": "A grid repeats the same few values of each parameter; random sampling explores each dimension more widely."
      },
      {
       "q": "A learning curve shows training and validation scores already converged at a low level. Will more data help much?",
       "options": [
        "Yes, more data always fixes low scores",
        "Yes, but only if the test set is enlarged at the same time",
        "No, the model must be deleted",
        "Probably not; change the model or features"
       ],
       "answer": 3,
       "explain": "Converged low curves signal high bias, which more data alone rarely fixes."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l5",
   "title": "Leakage and Experiment Hygiene",
   "subtitle": "Find the information that should not be there, and make results reproducible",
   "minutes": 26,
   "objectives": [
    "Recognise the main types of data leakage",
    "Detect leakage with practical checks",
    "Run experiments that are reproducible and fairly compared",
    "Decide whether a difference between models is real"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**Leakage** happens when information that will not be available at prediction time sneaks into training or evaluation. Leaky models look brilliant in the notebook and fail in production. It is the most common and most expensive mistake in applied ML, and it is entirely preventable."
    },
    {
     "type": "table",
     "title": "Types of leakage",
     "head": [
      "Type",
      "What happens",
      "Example"
     ],
     "rows": [
      [
       "Target leakage",
       "A feature is derived from or recorded after the outcome",
       "'Collections call made' used to predict loan default"
      ],
      [
       "Temporal leakage",
       "Training uses data from after the prediction time",
       "Random split on a time series; future prices in features"
      ],
      [
       "Group leakage",
       "The same entity appears in training and validation",
       "Images of the same patient in both sets"
      ],
      [
       "Preprocessing leakage",
       "Statistics or selections learned on all data",
       "Scaling, imputation or feature selection before the split"
      ],
      [
       "Proxy leakage",
       "An artefact correlates with the label by accident",
       "Scans from the intensive care unit carry a scanner marker that the model learns"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Leakage you can measure: feature selection on pure noise",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.feature_selection import SelectKBest, f_classif",
      "from sklearn.linear_model import LogisticRegression",
      "from sklearn.model_selection import cross_val_score",
      "from sklearn.pipeline import make_pipeline",
      "rng = np.random.default_rng(0)",
      "X = rng.normal(size=(100, 5000)); y = rng.integers(0, 2, 100)",
      "X_sel = SelectKBest(f_classif, k=20).fit_transform(X, y)",
      "print('leaky', round(cross_val_score(LogisticRegression(), X_sel, y, cv=5).mean(), 2))",
      "# output: leaky 0.85",
      "pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())",
      "print('honest', round(cross_val_score(pipe, X, y, cv=5).mean(), 2))",
      "# output: honest 0.48"
     ],
     "note": "The features and labels are random, so the true accuracy is 50%. Selecting features on all rows first produces an impressive but meaningless 85%. Putting selection inside the pipeline gives the honest answer."
    },
    {
     "type": "keypoints",
     "items": [
      "**Too good to be true**: a score far above published or expert benchmarks deserves suspicion, not celebration.",
      "**Feature importance review**: if one feature dominates, ask exactly when and how it is recorded.",
      "**Timestamp audit**: for every feature, confirm it is available before the prediction time.",
      "**Entity overlap**: count customers, patients or devices that appear in both training and validation.",
      "**Shadow test**: score live data for a few weeks before go-live and compare with offline estimates."
     ],
     "title": "Practical leakage checks"
    },
    {
     "type": "case",
     "title": "The model that read the scanner",
     "context": "A team built a pneumonia detector from 40,000 chest X-rays across three hospitals and reached AUC 0.96. On images from a fourth hospital, AUC dropped to 0.71. Investigation showed that one hospital had a much higher pneumonia rate, used a different portable scanner and printed a distinctive text marker in the corner of each image. The training split was random across images, and some patients had several images.",
     "questions": [
      "What forms of leakage or shortcut learning are present?",
      "How should the evaluation have been designed?",
      "What changes would make the model more trustworthy?"
     ],
     "answer": "The model likely learned the hospital and scanner marker as a proxy for pneumonia (proxy leakage or shortcut learning), and patients with several images appeared in both training and validation (group leakage). Evaluation should group by patient and hold out whole hospitals, testing on a site never seen in training. Fixes include cropping or masking text markers, normalising image appearance across scanners, balancing or stratifying by site, checking saliency maps for attention on non-clinical regions, and requiring acceptable performance on each external site before deployment."
    },
    {
     "type": "framework",
     "title": "Experiment hygiene essentials",
     "items": [
      {
       "label": "E1",
       "title": "Version everything",
       "text": "Data snapshot, code commit, environment and configuration for every run."
      },
      {
       "label": "E2",
       "title": "Fix seeds",
       "text": "Make splits and training reproducible so differences come from changes, not luck."
      },
      {
       "label": "E3",
       "title": "Same folds",
       "text": "Compare models on identical folds so paired differences are meaningful."
      },
      {
       "label": "E4",
       "title": "Log all trials",
       "text": "Record failures too; selective reporting hides how many attempts were made."
      },
      {
       "label": "E5",
       "title": "One test",
       "text": "Use the test set once, at the end, for the chosen model only."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Is the improvement real?",
     "items": [
      {
       "name": "Paired fold differences",
       "expr": "dᵢ = score_Bᵢ − score_Aᵢ for each fold i",
       "meaning": "Use the same folds for both models so fold difficulty cancels out."
      },
      {
       "name": "Mean and spread",
       "expr": "d̄ = mean(dᵢ);  SE = s_d ÷ √k",
       "meaning": "Differences 0.010, 0.006, 0.012, 0.004, 0.008 give d̄ = 0.008 and s_d ≈ 0.0032, so SE ≈ 0.0014."
      },
      {
       "name": "Rule of thumb",
       "expr": "Treat d̄ as real if it is well above 2 × SE and worth its cost",
       "meaning": "Here 0.008 > 0.0028, so B is consistently better; whether 0.008 matters is a business question."
      }
     ]
    },
    {
     "type": "scenario",
     "situation": "A default model's most important feature is 'number of reminder SMS sent'. Reminders are sent only after a payment is missed. The model will score applications at approval time. What should you do?",
     "options": [
      {
       "text": "Keep it, because it is genuinely predictive",
       "feedback": "It is predictive because it is part of the outcome, not a cause available at decision time.",
       "best": false
      },
      {
       "text": "Remove the feature, because it is recorded after the outcome process has started and is unavailable at approval",
       "feedback": "Correct. This is target leakage: reminders are a consequence of missed payments and do not exist when the loan is approved.",
       "best": true
      },
      {
       "text": "Cap the feature at 5 reminders to reduce its influence",
       "feedback": "Capping does not make future information available at approval time.",
       "best": false
      },
      {
       "text": "Keep it only in the test set",
       "feedback": "Using a feature in evaluation but not in training would break the model; the feature must go entirely.",
       "best": false
      }
     ],
     "title": "A collections feature"
    },
    {
     "type": "checklist",
     "title": "Leakage review before sign-off",
     "items": [
      "Every feature has a documented source and availability time",
      "No feature is created by, or after, the outcome process",
      "Splits respect time order and entity groups",
      "All preprocessing and selection steps are inside the cross-validated pipeline",
      "The top features have been reviewed with a domain expert",
      "Offline scores are compared with a shadow run on live data"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Review the top five features of a model you know. For each, can you state exactly when the value is recorded relative to the moment of prediction?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Data leakage",
       "def": "Information unavailable at prediction time that enters training or evaluation and inflates results."
      },
      {
       "term": "Target leakage",
       "def": "A feature that is derived from, or recorded after, the outcome being predicted."
      },
      {
       "term": "Temporal leakage",
       "def": "Using data from after the prediction time in features or training."
      },
      {
       "term": "Shortcut learning",
       "def": "A model relying on a spurious cue, such as a scanner marker, instead of the real signal."
      },
      {
       "term": "Shadow deployment",
       "def": "Running a model on live data without acting on its predictions, to compare with expectations."
      },
      {
       "term": "Reproducibility",
       "def": "The ability to rerun an experiment and obtain the same results from the same inputs."
      },
      {
       "term": "Paired comparison",
       "def": "Comparing two models on exactly the same folds or examples so shared difficulty cancels out."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which is an example of target leakage in a churn model?",
       "options": [
        "Using the customer's tenure in months",
        "Using the number of logins in the 30 days before scoring",
        "Using the customer's plan type",
        "Using 'account closure form submitted' as a feature"
       ],
       "answer": 3,
       "explain": "A closure form is part of the outcome itself and is recorded after the churn decision."
      },
      {
       "q": "Scaling features on the full dataset before cross-validation is an example of…",
       "options": [
        "Target leakage",
        "Preprocessing leakage",
        "Group leakage",
        "Label noise in validation"
       ],
       "answer": 1,
       "explain": "Statistics from validation rows influenced training."
      },
      {
       "q": "Paired fold differences have mean 0.002 and standard error 0.004. What should you conclude?",
       "options": [
        "Model B is clearly better",
        "Model A is clearly better",
        "The difference is not reliably distinguishable from zero",
        "The folds must have been different"
       ],
       "answer": 2,
       "explain": "A mean smaller than its standard error is well within noise."
      },
      {
       "q": "Why should two candidate models be evaluated on identical folds?",
       "options": [
        "So that differences in fold difficulty cancel out in the comparison",
        "So that both models train faster",
        "Because libraries require it",
        "So that the test set can be reused for tuning without becoming optimistic"
       ],
       "answer": 0,
       "explain": "Paired comparison removes shared variation and makes small differences detectable."
      },
      {
       "q": "A model's offline AUC is 0.99, far above anything published for the problem. What is the BEST first reaction?",
       "options": [
        "Deploy immediately",
        "Audit the top features and the split for leakage",
        "Publish the result",
        "Add more features and train for longer to try to reach 1.0"
       ],
       "answer": 1,
       "explain": "Results that are too good to be true usually are; check for leakage first."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m1",
  "q": "A bank in Dhaka asks for an ML model to decide whether customers qualify for a statutory fee waiver. The eligibility rules are fixed in regulation and every input is in the core banking system. What should the ML lead recommend?",
  "options": [
   "Train a gradient-boosted classifier on past waiver decisions",
   "Implement the regulation directly as deterministic business rules",
   "Collect a year of new data before deciding on an approach",
   "Build a model on past decisions and use the regulation's rules only to explain its output"
  ],
  "answer": 1,
  "explain": "When rules are known, complete and stable, ML only approximates them and adds opacity and error. A trained classifier would copy past mistakes; waiting or layering rules on a model adds cost with no benefit."
 },
 {
  "module": "m1",
  "q": "A telecom churn model reaches 98% accuracy. Monthly churn is 2%. The sponsor wants to deploy it immediately. What should you check FIRST?",
  "options": [
   "Whether it beats the majority-class baseline at finding churners",
   "Whether a deeper model with more features can push overall accuracy from 98% to 99%",
   "Whether the model can be retrained daily",
   "Whether the dashboard can display accuracy in real time"
  ],
  "answer": 0,
  "explain": "Predicting 'no churn' for all customers already scores 98%. The model's value is in finding churners, so compare recall, precision or lift against the baseline before anything else."
 },
 {
  "module": "m1",
  "q": "A garment exporter wants to predict late shipments at the time an order is accepted. A candidate feature is 'final inspection duration'. How should the team treat it?",
  "options": [
   "Keep it because it has the highest correlation with lateness",
   "Exclude it, since it is only known near the end of production",
   "Impute it with the historical average at prediction time",
   "Keep it but apply a log transform to reduce skew"
  ],
  "answer": 1,
  "explain": "Features must be available at prediction time. Inspection duration leaks future information; imputing or transforming it does not change that."
 },
 {
  "module": "m1",
  "q": "A team compares customer embedding vectors whose lengths vary widely with account age, but the direction encodes behaviour. Which similarity measure suits finding customers with similar behaviour?",
  "options": [
   "Raw dot product between the embedding vectors",
   "Cosine similarity between the embedding vectors",
   "Euclidean distance on the unscaled vectors",
   "Difference between the vectors' norms"
  ],
  "answer": 1,
  "explain": "Cosine similarity compares direction and removes the effect of length. Dot products and raw Euclidean distance are distorted by norm differences, and norms alone ignore direction."
 },
 {
  "module": "m1",
  "q": "During training, a model's loss falls slowly but steadily and is still decreasing after many epochs, far above the expected minimum. Data and gradients have been checked. What is the most reasonable adjustment?",
  "options": [
   "Reduce the learning rate by a factor of ten so that each update is more precise",
   "Try a larger learning rate, such as three or ten times the current one",
   "Remove half of the training data",
   "Stop training and declare the model converged"
  ],
  "answer": 1,
  "explain": "Steady but very slow progress suggests steps are too small. Shrinking the learning rate slows it further; cutting data does not help; the model has clearly not converged."
 },
 {
  "module": "m1",
  "q": "A fraud model flags transactions with 90% sensitivity and a 1% false positive rate. Fraud occurs in 0.2% of transactions. Approximately what fraction of flagged transactions are fraudulent?",
  "options": [
   "About 90%",
   "About 99%",
   "About 50%",
   "About 15%"
  ],
  "answer": 3,
  "explain": "Per 100,000: 180 frauds caught, 998 false alarms. Precision ≈ 180 ÷ 1,178 ≈ 15%. Low base rates make false alarms dominate."
 },
 {
  "module": "m1",
  "q": "An analyst shows that districts with more mobile money agents have higher school enrolment and proposes adding agents to raise enrolment. What is the main flaw?",
  "options": [
   "The sample of districts is too large to be reliable",
   "The association may be driven by a common factor such as income or urbanisation",
   "Enrolment cannot be predicted with regression",
   "Agent counts must be standardised before any analysis of enrolment can be trusted"
  ],
  "answer": 1,
  "explain": "Correlation does not establish causation. Wealthier or more urban districts may have both more agents and higher enrolment; an experiment or causal analysis is needed."
 },
 {
  "module": "m1",
  "q": "A hospital wants to predict bed demand per ward per day for the next week. Which baseline should a model be required to beat?",
  "options": [
   "The same weekday's demand from the previous week for each ward",
   "A constant prediction of zero beds",
   "The maximum demand ever observed in the hospital",
   "A random number between the minimum and maximum demand"
  ],
  "answer": 0,
  "explain": "A seasonal naive forecast is a strong, honest baseline for daily data with weekly patterns. The other options are straw men that any model would beat."
 },
 {
  "module": "m2",
  "q": "A hospital is labelling chest X-rays as 'pneumonia' or 'normal'. Two radiologists agree on 92% of images, but kappa is 0.41. What does this MOST likely indicate?",
  "options": [
   "Their labels are excellent, because 92% agreement shows labelling can scale safely",
   "Kappa is invalid for medical images",
   "They agree on the common normal images but often disagree on pneumonia",
   "One radiologist must be labelling at random"
  ],
  "answer": 2,
  "explain": "High raw agreement with modest kappa is typical when one class dominates: agreement on easy majority cases hides disagreement on the minority class that matters. Guidelines need refining before scaling."
 },
 {
  "module": "m2",
  "q": "In a loan dataset, self-employed applicants leave the 'monthly income' field blank far more often than salaried applicants. Which handling is MOST appropriate for a gradient-boosted model?",
  "options": [
   "Impute with a training-set statistic and add a 'was missing' indicator feature",
   "Drop all rows with missing income before training",
   "Fill blanks with zero income for every applicant",
   "Fill blanks using the median income of the test set so that test rows look realistic"
  ],
  "answer": 0,
  "explain": "Missingness here is informative, so an indicator preserves the signal while imputation keeps the rows. Dropping rows biases the sample, zero is a false value, and test-set statistics leak."
 },
 {
  "module": "m2",
  "q": "A data engineer standardises all features using the mean and standard deviation of the complete dataset, then performs cross-validation. What is the problem?",
  "options": [
   "Standardisation is unnecessary for any model",
   "Cross-validation cannot be used with standardised data, so a single split is required",
   "Validation folds influenced the scaling statistics, a form of leakage",
   "The mean should be replaced by the maximum value"
  ],
  "answer": 2,
  "explain": "Statistics must be learned on the training part of each fold. Putting the scaler inside a pipeline fixes this automatically."
 },
 {
  "module": "m2",
  "q": "A team wants to add 'merchant ID' (35,000 distinct values) to a logistic regression fraud model. Which encoding is MOST suitable?",
  "options": [
   "One-hot encoding with a separate binary column for every one of the 35,000 merchants",
   "Ordinal encoding using merchant ID numbers",
   "Dropping the column because IDs are never useful",
   "Out-of-fold smoothed target encoding or frequency encoding"
  ],
  "answer": 3,
  "explain": "Very high cardinality makes one-hot sparse and unwieldy, and ordinal IDs impose a meaningless order. Careful target or frequency encoding captures merchant risk compactly."
 },
 {
  "module": "m2",
  "q": "A customer's 'transactions in the last 30 days' feature is computed from a table that already includes transactions after the scoring date. Offline AUC is 0.97, production AUC is 0.71. What is the root cause?",
  "options": [
   "The production data has more customers than training",
   "AUC is not a valid metric for churn",
   "The feature was not point-in-time correct and leaked future behaviour",
   "The model was trained for too many epochs"
  ],
  "answer": 2,
  "explain": "Using events after the prediction moment gives the model information it will not have in production, inflating offline results."
 },
 {
  "module": "m2",
  "q": "A fraud team oversampled the minority class to 50% and then split into training and test sets. Test precision is 0.97. What should they do to obtain a trustworthy estimate?",
  "options": [
   "Increase oversampling to 70% fraud",
   "Report recall only, since precision is unreliable whenever classes are imbalanced",
   "Evaluate on the training set to confirm",
   "Split first, resample only training data, and test at the real fraud rate"
  ],
  "answer": 3,
  "explain": "Resampling before the split leaks near-duplicates into the test set and distorts the class balance, inflating precision."
 },
 {
  "module": "m2",
  "q": "Which feature would MOST help a linear model capture that risk rises when debt is large relative to income?",
  "options": [
   "A debt-to-income ratio feature",
   "Debt and income standardised separately",
   "The logarithm of income only",
   "A one-hot encoding of the applicant's district"
  ],
  "answer": 0,
  "explain": "A linear model adds weighted inputs and cannot form a ratio itself; the ratio must be engineered."
 },
 {
  "module": "m2",
  "q": "A team ran feature selection using correlation with the target on the full dataset, then cross-validated a model on the selected features. Why might the reported score be optimistic?",
  "options": [
   "Selection used validation rows, so the chosen features fit those rows by chance",
   "Correlation cannot be computed on numeric features",
   "Cross-validation always underestimates performance, so the true score is even higher",
   "Fewer features always lower accuracy"
  ],
  "answer": 0,
  "explain": "Any data-driven step, including feature selection, must happen within each training fold or it leaks information from the validation data."
 },
 {
  "module": "m3",
  "q": "A regression model for garment order lead time has training R² of 0.93 and test R² of 0.41. The model uses 220 features and 1,500 orders. What is the MOST appropriate next step?",
  "options": [
   "Add polynomial terms for every feature so the model can raise its test R² further",
   "Apply regularisation and tune its strength with cross-validation",
   "Report the training R² because it uses more data",
   "Remove the test set and train on all orders"
  ],
  "answer": 1,
  "explain": "A large gap with many features relative to rows signals overfitting. Regularisation tuned by cross-validation reduces variance; adding terms makes it worse and the other options hide the problem."
 },
 {
  "module": "m3",
  "q": "A logistic regression for hospital readmission has a coefficient of 0.69 on 'prior admissions in the last year'. How should a clinician interpret it?",
  "options": [
   "Each extra prior admission roughly doubles the odds, other features held fixed",
   "Each extra admission adds 69 percentage points to the patient's readmission probability",
   "The model is 69% confident that frequent patients return",
   "Readmission probability is 0.69 for anyone with an admission"
  ],
  "answer": 0,
  "explain": "Coefficients act on log-odds; e^0.69 ≈ 2, so the odds roughly double. They are not probability increments or confidence levels."
 },
 {
  "module": "m3",
  "q": "Training a model with gradient descent, the loss goes up after each epoch and turns into NaN. Inputs are standardised and contain no missing values. What should be changed FIRST?",
  "options": [
   "Add more hidden layers",
   "Lower the learning rate",
   "Increase the number of epochs",
   "Remove the intercept term"
  ],
  "answer": 1,
  "explain": "A loss that grows and overflows is the signature of steps that are too large. Capacity and epochs do not fix an unstable optimiser."
 },
 {
  "module": "m3",
  "q": "A churn dataset has 150 candidate features, and the business wants a model that uses as few as possible for easy monitoring. Which approach fits BEST?",
  "options": [
   "Ridge regression with a very large penalty",
   "L1-regularised logistic regression with strength tuned by cross-validation",
   "Unregularised logistic regression with all 150 features, then remove those with small coefficients",
   "k-nearest neighbours with k = 1"
  ],
  "answer": 1,
  "explain": "L1 drives many weights to exactly zero, giving a sparse model. Ridge shrinks but rarely removes features, unregularised models keep everything, and k-NN uses every feature in its distances."
 },
 {
  "module": "m3",
  "q": "A data scientist uses gradient descent on features with very different units, and training zig-zags slowly. Which change MOST directly addresses the cause?",
  "options": [
   "Use a deeper network with more parameters",
   "Shuffle the rows in a different order",
   "Standardise the features to comparable scales",
   "Switch the loss from MSE to log loss"
  ],
  "answer": 2,
  "explain": "Unequal scales distort the loss surface so a single learning rate cannot suit all directions; standardising fixes the geometry."
 },
 {
  "module": "m3",
  "q": "A model outputs softmax scores z = (1, 1, 1, 1) for four product categories. What does this indicate?",
  "options": [
   "The model is certain of the first class",
   "The softmax is broken, because scores for different classes must always differ",
   "The model is completely uncertain, assigning 0.25 to each class",
   "Each class has probability 1"
  ],
  "answer": 2,
  "explain": "Equal scores produce equal probabilities that sum to one: 0.25 each."
 },
 {
  "module": "m3",
  "q": "A team needs a quick spam filter for SMS messages with only 2,000 labelled examples and must deploy on low-cost hardware. Which first model is MOST sensible?",
  "options": [
   "Multinomial naive Bayes on word count features",
   "A large transformer trained from scratch",
   "k-NN with k = 1 on raw message text",
   "A deep convolutional network on pixel images of messages"
  ],
  "answer": 0,
  "explain": "Naive Bayes on counts is fast, needs little data and runs cheaply. The alternatives need far more data or compute, or rely on weak distance measures."
 },
 {
  "module": "m4",
  "q": "A model predicting monthly electricity demand for Dhaka feeders is validated with a random 80/20 split across 2019–2025 and reports MAPE of 3%. It will forecast the next six months. What is the MAIN flaw in this evaluation?",
  "options": [
   "Random splitting lets the model learn from periods after those it is validated on",
   "MAPE cannot be used for electricity demand",
   "Six years of data are too few for any forecast",
   "An 80/20 split is too small for time series; a 70/30 random split would be accurate"
  ],
  "answer": 0,
  "explain": "Forecasts must be validated on later periods than training. A random split leaks future patterns and overstates accuracy; the metric choice and ratio are secondary."
 },
 {
  "module": "m4",
  "q": "A clinic's model detects a disease with 1% prevalence. At the chosen threshold, recall is 0.90 and the false positive rate is 0.05. The director asks what share of flagged patients actually have the disease. What is the BEST estimate?",
  "options": [
   "About 90%",
   "About 95%",
   "About 50%",
   "About 15%"
  ],
  "answer": 3,
  "explain": "Per 10,000 patients: 90 true positives and 495 false positives, so precision ≈ 90 ÷ 585 ≈ 15%."
 },
 {
  "module": "m4",
  "q": "Two fraud models have ROC-AUC 0.97 and 0.96. Fraud is 0.1% of transactions and the review team can examine 500 alerts a day. Which comparison is MOST decision-relevant?",
  "options": [
   "The difference in ROC-AUC alone, since it summarises performance across all thresholds",
   "Overall accuracy at a 0.5 threshold",
   "Precision and recall among the top 500 scores per day for each model",
   "The training loss of each model"
  ],
  "answer": 2,
  "explain": "With extreme imbalance and fixed capacity, what matters is how many frauds each model finds within the alerts the team can handle."
 },
 {
  "module": "m4",
  "q": "A team tuned 300 hyperparameter combinations using the test set to pick the best and reports its test score. What is wrong?",
  "options": [
   "300 combinations are too few for a reliable search, so at least 1,000 should be tried",
   "The test set was used to make choices, so its score is optimistically biased",
   "Hyperparameters should never be tuned at all",
   "The test set should be larger than the training set"
  ],
  "answer": 1,
  "explain": "Selecting on the test set turns it into a validation set. A separate untouched test set, or nested cross-validation, is needed for an unbiased estimate."
 },
 {
  "module": "m4",
  "q": "A model shows training RMSE 2.1 and validation RMSE 2.3, while a simple expert rule achieves 1.4. What does this suggest?",
  "options": [
   "The model overfits, so it needs stronger regularisation and fewer features",
   "The validation set is leaking into training",
   "The model should be deployed as it is",
   "The model underfits; it needs better features or more flexibility"
  ],
  "answer": 3,
  "explain": "Close training and validation errors that are both worse than a simple rule indicate high bias."
 },
 {
  "module": "m4",
  "q": "A churn model's most important feature is 'retention offer accepted'. Offers are made only to customers who have already asked to leave. The model scores customers monthly. What should the team conclude?",
  "options": [
   "It is a strong driver and should be kept",
   "It should be log-transformed to reduce dominance",
   "It should be used only in the validation set",
   "The feature leaks the outcome and must be removed"
  ],
  "answer": 3,
  "explain": "Offers follow a request to leave, so the feature encodes the outcome process. It is target leakage regardless of transformation."
 },
 {
  "module": "m4",
  "q": "Over five identical folds, model B beats model A by 0.004, 0.006, 0.005, 0.003 and 0.007 AUC. What is the MOST accurate conclusion?",
  "options": [
   "B is consistently better; whether the gain is worth its cost is a business call",
   "The difference is random noise, because any gain smaller than 0.01 AUC is not meaningful",
   "A is better because its results are more stable",
   "No conclusion is possible without the test set"
  ],
  "answer": 0,
  "explain": "Every paired difference is positive with low spread, so the gain is consistent; its practical value depends on costs."
 },
 {
  "module": "m4",
  "q": "A pneumonia model trained on images from three hospitals performs much worse at a fourth hospital. Which evaluation design would have revealed this risk earlier?",
  "options": [
   "Leave-one-hospital-out validation",
   "Random k-fold across all images",
   "Stratified k-fold by label",
   "Evaluating on the training images"
  ],
  "answer": 0,
  "explain": "Holding out whole hospitals tests generalisation to new sites and exposes reliance on site-specific cues."
 }
]);
