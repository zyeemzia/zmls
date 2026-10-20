window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m5",
 "order": 5,
 "code": "Ensemble",
 "title": "Trees and Ensembles: The Workhorses of Tabular Data",
 "subtitle": "Grow decision trees, combine them in random forests and gradient boosting, and explain what they learn",
 "outcomes": [
  "Build and control decision trees using impurity measures and complexity limits",
  "Apply bagging and random forests and use out-of-bag estimates",
  "Train and tune gradient boosting models with early stopping",
  "Interpret ensembles with permutation importance, Shapley attributions and dependence plots",
  "Choose a tabular model family based on accuracy, explainability, cost and risk"
 ],
 "lessons": [
  {
   "id": "m5-l1",
   "title": "Decision Trees",
   "subtitle": "Learn a flowchart of questions from data, and know why single trees overfit",
   "minutes": 24,
   "objectives": [
    "Explain how a tree chooses splits using Gini impurity, entropy or variance reduction",
    "Compute impurity and information gain for a split by hand",
    "Control tree complexity with depth and leaf-size limits",
    "Describe the strengths and weaknesses of single trees"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **decision tree** predicts by asking a sequence of yes/no questions about the features: is the petal width at most 0.8 cm? Is the customer's tenure under six months? Each answer leads down a branch until a **leaf** gives the prediction. Trees capture non-linear effects and interactions automatically and are easy to read, which is why they underpin the most successful tabular methods."
    },
    {
     "type": "formula",
     "title": "How a tree scores a split",
     "items": [
      {
       "name": "Gini impurity",
       "expr": "G = 1 − Σₖ pₖ²",
       "meaning": "Node with 6 positives and 4 negatives: 1 − (0.6² + 0.4²) = 1 − 0.52 = 0.48."
      },
      {
       "name": "Entropy",
       "expr": "H = −Σₖ pₖ log₂ pₖ",
       "meaning": "Same node: −0.6 log₂ 0.6 − 0.4 log₂ 0.4 ≈ 0.442 + 0.529 = 0.971 bits."
      },
      {
       "name": "Weighted child impurity",
       "expr": "Σ (n_child ÷ n_parent) × impurity_child",
       "meaning": "Split into left (4+, 0−) and right (2+, 4−): Gini = 0.4 × 0 + 0.6 × 0.444 ≈ 0.267."
      },
      {
       "name": "Gain",
       "expr": "Gain = impurity_parent − weighted impurity_children",
       "meaning": "Gini decrease = 0.48 − 0.267 ≈ 0.213. Information gain with entropy = 0.971 − 0.6 × 0.918 ≈ 0.420."
      },
      {
       "name": "Regression trees",
       "expr": "Split to minimise Σ (y − ȳ_leaf)² in the children",
       "meaning": "Each leaf predicts the mean of its training targets."
      }
     ]
    },
    {
     "type": "flow",
     "title": "How a tree is grown",
     "items": [
      {
       "label": "Start",
       "text": "All training rows in the root"
      },
      {
       "label": "Search",
       "text": "Try every feature and threshold"
      },
      {
       "label": "Split",
       "text": "Choose the largest impurity decrease"
      },
      {
       "label": "Recurse",
       "text": "Repeat in each child"
      },
      {
       "label": "Stop",
       "text": "Depth, leaf size or no gain"
      },
      {
       "label": "Predict",
       "text": "Majority class or mean in the leaf"
      }
     ]
    },
    {
     "type": "cli",
     "title": "A readable two-level tree",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_iris",
      "from sklearn.tree import DecisionTreeClassifier, export_text",
      "X, y = load_iris(return_X_y=True)",
      "tree = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X, y)",
      "print(export_text(tree, feature_names=['sepal_len', 'sepal_wid', 'petal_len', 'petal_wid']))",
      "# output: |--- petal_wid <= 0.80",
      "# output: |   |--- class: 0",
      "# output: |--- petal_wid >  0.80",
      "# output: |   |--- petal_wid <= 1.75",
      "# output: |   |   |--- class: 1",
      "# output: |   |--- petal_wid >  1.75",
      "# output: |   |   |--- class: 2"
     ],
     "note": "Two questions about petal width separate the three species almost perfectly. A domain expert can read and challenge every rule."
    },
    {
     "type": "tree",
     "title": "The fitted iris tree, drawn",
     "root": {
      "label": "Petal width ≤ 0.80 cm?",
      "children": [
       {
        "label": "Yes",
        "text": "Leaf: setosa (class 0)"
       },
       {
        "label": "No: petal width ≤ 1.75 cm?",
        "children": [
         {
          "label": "Yes",
          "text": "Leaf: versicolor (class 1)"
         },
         {
          "label": "No",
          "text": "Leaf: virginica (class 2)"
         }
        ]
       }
      ]
     },
     "caption": "Each internal node is one learned question and each leaf a prediction. Reading the tree from the root shows exactly why a flower received its class."
    },
    {
     "type": "compare",
     "title": "Strengths and weaknesses of a single tree",
     "columns": [
      {
       "title": "Strengths",
       "items": [
        "Readable rules",
        "Handles non-linearity and interactions",
        "No scaling needed; mixed feature types",
        "Fast to train and predict"
       ]
      },
      {
       "title": "Weaknesses",
       "items": [
        "High variance: small data changes give a different tree",
        "Overfits easily if grown deep",
        "Step-shaped predictions; poor extrapolation",
        "Greedy splits may miss the best overall tree"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Key hyperparameters",
     "head": [
      "Setting",
      "Effect of increasing it",
      "Typical starting range"
     ],
     "rows": [
      [
       "max_depth",
       "More complex tree, higher variance",
       "3–10"
      ],
      [
       "min_samples_leaf",
       "Smoother predictions, lower variance",
       "5–100 rows, or 1% of data"
      ],
      [
       "min_impurity_decrease",
       "Fewer, more meaningful splits",
       "Small values such as 0.001"
      ],
      [
       "ccp_alpha (cost-complexity pruning)",
       "Prunes weak branches after growing",
       "Choose by cross-validation"
      ],
      [
       "class_weight",
       "More attention to rare classes",
       "'balanced' for imbalanced data"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A regression tree predicts the average of training rows in a leaf, so it can never predict beyond the range it has seen. If house prices in a growing Dhaka neighbourhood rise above any training price, a tree will cap its predictions at the old maximum. Linear models, or trees on detrended targets, behave better when extrapolation is unavoidable.",
     "title": "Trees do not extrapolate"
    },
    {
     "type": "scenario",
     "situation": "A bank trains a decision tree for small business loan approvals. Retraining on a new month of data produces a completely different top split and very different rules, which confuses loan officers. Accuracy is similar both times. What is the best response?",
     "options": [
      {
       "text": "Grow the tree deeper so it captures every pattern",
       "feedback": "Deeper trees have even higher variance and are less stable.",
       "best": false
      },
      {
       "text": "Retrain daily so that the rules change more smoothly",
       "feedback": "More frequent retraining does not reduce the tree's sensitivity to the sample; rules would still jump.",
       "best": false
      },
      {
       "text": "Constrain the tree (depth, minimum leaf size) or move to an ensemble while keeping explanations",
       "feedback": "Correct. Single deep trees have high variance. Limits make them more stable; ensembles average many trees for stable predictions, explained with tools such as permutation importance.",
       "best": true
      },
      {
       "text": "Remove the validation set so that more data is used",
       "feedback": "Losing the ability to evaluate does not address instability.",
       "best": false
      }
     ],
     "title": "An unstable tree"
    },
    {
     "type": "reflection",
     "prompt": "Sketch a three-level decision tree for a decision you make often, such as approving a leave request. Which question goes at the top, and why would a tree learned from data perhaps choose differently?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Decision tree",
       "def": "A model that predicts by applying a sequence of feature-based splits ending in leaves."
      },
      {
       "term": "Gini impurity",
       "def": "1 − Σ pₖ²; the probability of mislabelling a random item if labelled by the node's class distribution."
      },
      {
       "term": "Entropy",
       "def": "−Σ pₖ log₂ pₖ; a measure of uncertainty in a node's class distribution."
      },
      {
       "term": "Information gain",
       "def": "The reduction in entropy achieved by a split."
      },
      {
       "term": "Leaf",
       "def": "A terminal node of a tree that holds the prediction."
      },
      {
       "term": "Pruning",
       "def": "Removing branches that add little predictive value to reduce overfitting."
      },
      {
       "term": "Greedy algorithm",
       "def": "An algorithm that makes the best local choice at each step without revisiting it."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "A tree asks a sequence of yes/no questions chosen greedily to reduce impurity (Gini or entropy).",
      "Trees handle non-linearity, interactions and mixed feature types without scaling.",
      "Single trees have high variance; limit depth and leaf size or prune.",
      "Regression trees cannot predict outside the range of their training targets."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the Gini impurity of a node with 5 positives and 5 negatives?",
       "options": [
        "0.5",
        "0",
        "1",
        "0.25"
       ],
       "answer": 0,
       "explain": "1 − (0.5² + 0.5²) = 0.5, the maximum for two classes."
      },
      {
       "q": "What is the entropy of a pure node?",
       "options": [
        "1",
        "0.5",
        "0",
        "Undefined"
       ],
       "answer": 2,
       "explain": "All items belong to one class, so there is no uncertainty."
      },
      {
       "q": "A parent has Gini 0.5. The weighted Gini of its children is 0.3. What is the Gini decrease?",
       "options": [
        "0.8",
        "0.2",
        "0.15",
        "0.3"
       ],
       "answer": 1,
       "explain": "0.5 − 0.3 = 0.2."
      },
      {
       "q": "Which change makes a decision tree less likely to overfit?",
       "options": [
        "Increasing the maximum depth",
        "Removing all stopping rules",
        "Using a smaller training set so each leaf sees fewer rows",
        "Increasing the minimum number of samples per leaf"
       ],
       "answer": 3,
       "explain": "Larger leaves average more rows, giving smoother, lower-variance predictions."
      },
      {
       "q": "Why can a regression tree not predict values above its training maximum?",
       "options": [
        "Trees always use a sigmoid output",
        "Trees require standardised targets",
        "Trees can only perform classification",
        "Each leaf predicts an average of training targets"
       ],
       "answer": 3,
       "explain": "Averages of training targets cannot exceed the largest training target."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l2",
   "title": "Bagging and Random Forests",
   "subtitle": "Average many decorrelated trees to cut variance",
   "minutes": 24,
   "objectives": [
    "Explain bootstrap sampling and why averaging reduces variance",
    "Describe how random forests decorrelate trees with feature sampling",
    "Use out-of-bag error as a built-in validation estimate",
    "Tune the few random forest settings that matter"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A single deep tree is accurate on average but erratic. **Bagging** (bootstrap aggregating) trains many trees on different random resamples of the data and averages them; their individual errors partly cancel. A **random forest** adds one more twist: each split considers only a random subset of features, which makes the trees less alike and the average even more stable."
    },
    {
     "type": "formula",
     "title": "Why averaging works",
     "items": [
      {
       "name": "Variance of an average",
       "expr": "Var(avg) = ρσ² + (1 − ρ)σ² ÷ B",
       "meaning": "σ² is one tree's variance, ρ the correlation between trees, B the number of trees."
      },
      {
       "name": "Worked example",
       "expr": "σ² = 1, ρ = 0.3, B = 100",
       "meaning": "0.3 + 0.7 ÷ 100 = 0.307: averaging cuts variance by about two-thirds."
      },
      {
       "name": "The lesson",
       "expr": "As B grows, Var → ρσ²",
       "meaning": "More trees cannot remove correlated error; lowering ρ through feature sampling is what makes forests strong."
      },
      {
       "name": "Bootstrap coverage",
       "expr": "P(row included) = 1 − (1 − 1/n)ⁿ ≈ 0.632",
       "meaning": "Each bootstrap sample contains about 63% of distinct rows; the other 37% are 'out of bag' for that tree."
      }
     ]
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Variance of a forest's average as trees are added (σ² = 1)",
     "labels": [
      "1",
      "2",
      "5",
      "10",
      "25",
      "50",
      "100",
      "500"
     ],
     "yLabel": "Variance of the average",
     "series": [
      {
       "name": "Correlation ρ = 0.7",
       "values": [
        1.0,
        0.85,
        0.76,
        0.73,
        0.712,
        0.706,
        0.703,
        0.701
       ]
      },
      {
       "name": "Correlation ρ = 0.3",
       "values": [
        1.0,
        0.65,
        0.44,
        0.37,
        0.328,
        0.314,
        0.307,
        0.301
       ]
      }
     ],
     "caption": "Computed from Var = ρσ² + (1 − ρ)σ² ÷ B (x-axis: number of trees). Adding trees quickly reaches a floor equal to ρ; only decorrelating the trees, for example with a smaller max_features, lowers that floor."
    },
    {
     "type": "steps",
     "title": "How a random forest is built",
     "items": [
      {
       "title": "Bootstrap",
       "text": "For each of B trees, draw n rows with replacement."
      },
      {
       "title": "Random features per split",
       "text": "At each split, consider only a random subset of features, often √d for classification."
      },
      {
       "title": "Grow deep trees",
       "text": "Trees are usually grown deep with little pruning; averaging controls variance."
      },
      {
       "title": "Aggregate",
       "text": "Classification: average predicted probabilities (or majority vote). Regression: average predictions."
      },
      {
       "title": "Out-of-bag check",
       "text": "Score each row using only trees that did not see it, giving a free validation estimate."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Random forest with out-of-bag scoring",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_breast_cancer",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.tree import DecisionTreeClassifier",
      "from sklearn.ensemble import RandomForestClassifier",
      "X, y = load_breast_cancer(return_X_y=True)",
      "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)",
      "tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)",
      "rf = RandomForestClassifier(n_estimators=300, oob_score=True, random_state=0).fit(X_tr, y_tr)",
      "print(round(tree.score(X_te, y_te), 3), round(rf.oob_score_, 3), round(rf.score(X_te, y_te), 3))",
      "# output: 0.902 0.962 0.944"
     ],
     "note": "The forest beats the single tree on the test set, and its out-of-bag estimate (0.962) is close to the test score without using any separate validation data."
    },
    {
     "type": "table",
     "title": "Random forest settings that matter",
     "head": [
      "Setting",
      "What it does",
      "Guidance"
     ],
     "rows": [
      [
       "n_estimators",
       "Number of trees",
       "More is never worse for accuracy, only slower; 200–1,000 is common"
      ],
      [
       "max_features",
       "Features tried at each split",
       "Lower values decorrelate trees; √d (classification) or d/3 (regression) are good defaults"
      ],
      [
       "min_samples_leaf",
       "Minimum rows per leaf",
       "Raise for noisy data or to calibrate probabilities better"
      ],
      [
       "max_depth",
       "Tree depth limit",
       "Often left unlimited; limit for speed or memory"
      ],
      [
       "class_weight",
       "Weights for rare classes",
       "'balanced' or 'balanced_subsample' for imbalanced problems"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Random forest versus single tree",
     "columns": [
      {
       "title": "Single tree",
       "items": [
        "One readable set of rules",
        "High variance",
        "Fast, tiny model"
       ]
      },
      {
       "title": "Random forest",
       "items": [
        "Hundreds of trees, not readable directly",
        "Much lower variance, strong accuracy",
        "Robust defaults; little tuning needed",
        "Larger memory and slower prediction"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "An agricultural extension programme in northern Bangladesh used a random forest to predict which villages were at high risk of rice blast in the coming fortnight, using weather, humidity, crop stage and past outbreaks. With little tuning, the forest outperformed the earlier rule of thumb, and out-of-bag estimates allowed the small team to validate without sacrificing scarce labelled seasons.",
     "title": "Crop disease risk across districts"
    },
    {
     "type": "scenario",
     "situation": "A forest with 500 trees and max_features set to all features performs only slightly better than a single tree. A colleague suggests raising the number of trees to 5,000. What is the more promising change?",
     "options": [
      {
       "text": "Reduce max_features so that trees consider different features and become less correlated",
       "feedback": "Correct. With all features available at every split, trees choose similar splits and are highly correlated; averaging then removes little variance.",
       "best": true
      },
      {
       "text": "Increase to 5,000 trees",
       "feedback": "Extra trees barely help once the average has converged; the correlated part of the variance remains.",
       "best": false
      },
      {
       "text": "Turn off bootstrapping",
       "feedback": "Without bootstrapping and with all features, trees become even more alike.",
       "best": false
      },
      {
       "text": "Prune every tree to depth 1",
       "feedback": "Stumps would add heavy bias; the issue is correlation, not depth.",
       "best": false
      }
     ],
     "title": "More trees or different trees?"
    },
    {
     "type": "reflection",
     "prompt": "Where in your work would a model that is accurate but not directly readable be acceptable? What explanation would stakeholders need instead?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Bootstrap sample",
       "def": "A sample of n rows drawn with replacement from a dataset of n rows."
      },
      {
       "term": "Bagging",
       "def": "Training models on bootstrap samples and averaging their predictions to reduce variance."
      },
      {
       "term": "Random forest",
       "def": "A bagged ensemble of decision trees where each split considers a random subset of features."
      },
      {
       "term": "Out-of-bag (OOB) score",
       "def": "Accuracy estimated for each row using only trees that did not include it in their bootstrap sample."
      },
      {
       "term": "max_features",
       "def": "The number of features randomly considered at each split in a random forest."
      },
      {
       "term": "Ensemble",
       "def": "A model that combines the predictions of several models."
      },
      {
       "term": "Decorrelation",
       "def": "Making ensemble members' errors less similar so that averaging cancels more of them."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Bagging averages trees trained on bootstrap samples, cutting variance.",
      "Random feature subsets at each split decorrelate trees, which lowers the error floor.",
      "More trees stabilise predictions but cannot remove error shared by correlated trees.",
      "The out-of-bag score gives a built-in validation estimate."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Roughly what share of distinct rows appears in one bootstrap sample of a large dataset?",
       "options": [
        "About 50%",
        "About 63%",
        "100%",
        "About 37%"
       ],
       "answer": 1,
       "explain": "1 − (1 − 1/n)ⁿ approaches 1 − 1/e ≈ 0.632."
      },
      {
       "q": "With σ² = 4, ρ = 0.5 and B = 50 trees, what is the variance of the average?",
       "options": [
        "4",
        "0.08",
        "2.04",
        "2.5"
       ],
       "answer": 2,
       "explain": "0.5 × 4 + 0.5 × 4 ÷ 50 = 2 + 0.04 = 2.04."
      },
      {
       "q": "What is the main purpose of random feature selection at each split?",
       "options": [
        "To make trees less correlated",
        "To speed up prediction only",
        "To guarantee interpretability",
        "To remove the need for bootstrapping"
       ],
       "answer": 0,
       "explain": "Lower correlation means averaging cancels more error."
      },
      {
       "q": "How is the out-of-bag estimate computed?",
       "options": [
        "By evaluating on the test set",
        "Each row is scored by trees whose bootstrap samples did not include it",
        "By scoring each row with every tree",
        "By cross-validating each tree separately on its own bootstrap sample and averaging"
       ],
       "answer": 1,
       "explain": "OOB uses each tree's left-out rows as a built-in validation set."
      },
      {
       "q": "Which statement about adding more trees to a random forest is correct?",
       "options": [
        "It always causes overfitting",
        "It turns the forest into a single tree",
        "It increases the variance of the average, because each extra tree adds its own noise",
        "It stabilises predictions but cannot remove error shared by correlated trees"
       ],
       "answer": 3,
       "explain": "Variance approaches ρσ²; more trees do not cause overfitting in the usual sense."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l3",
   "title": "Gradient Boosting",
   "subtitle": "Build trees in sequence, each fixing the errors of the ones before",
   "minutes": 26,
   "objectives": [
    "Explain boosting as stage-wise fitting of residuals or negative gradients",
    "Carry out a boosting update by hand",
    "Tune learning rate, number of trees, depth and early stopping",
    "Compare boosting with random forests and know when each fits"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Random forests build independent trees in parallel and average them. **Gradient boosting** builds small trees one after another; each new tree is trained to correct what the current ensemble still gets wrong. With careful tuning it is usually the most accurate method for tabular data, and modern histogram-based implementations train quickly on millions of rows."
    },
    {
     "type": "formula",
     "title": "The boosting update",
     "items": [
      {
       "name": "Additive model",
       "expr": "F_m(x) = F_{m−1}(x) + η · h_m(x)",
       "meaning": "F_m is the ensemble after m trees, h_m the new tree, η the learning rate (shrinkage)."
      },
      {
       "name": "What the tree fits (squared error)",
       "expr": "rᵢ = yᵢ − F_{m−1}(xᵢ)",
       "meaning": "For squared error, the negative gradient is simply the residual."
      },
      {
       "name": "General losses",
       "expr": "rᵢ = −∂L(yᵢ, F)/∂F",
       "meaning": "For log loss, the negative gradient is y − p, the gap between the label and the predicted probability."
      },
      {
       "name": "Worked example",
       "expr": "F₀ = mean = 10; a row has y = 14; the tree predicts 4 for its leaf; η = 0.1",
       "meaning": "F₁ = 10 + 0.1 × 4 = 10.4. The new residual is 3.6, and the next tree keeps chipping away."
      }
     ]
    },
    {
     "type": "flow",
     "title": "Boosting, round by round",
     "items": [
      {
       "label": "Start",
       "text": "Constant prediction, e.g. the mean"
      },
      {
       "label": "Residuals",
       "text": "Compute what is still wrong"
      },
      {
       "label": "Fit a small tree",
       "text": "Depth 3–8 on the residuals"
      },
      {
       "label": "Shrink and add",
       "text": "Add η × tree to the ensemble"
      },
      {
       "label": "Check validation",
       "text": "Stop when it stops improving"
      }
     ]
    },
    {
     "type": "table",
     "title": "Hyperparameters that matter",
     "head": [
      "Setting",
      "Effect",
      "Typical guidance"
     ],
     "rows": [
      [
       "learning_rate (η)",
       "Size of each tree's contribution",
       "0.01–0.1; smaller needs more trees but often generalises better"
      ],
      [
       "n_estimators / max_iter",
       "Number of boosting rounds",
       "Set high and use early stopping on validation data"
      ],
      [
       "max_depth or max_leaf_nodes",
       "Complexity of each tree and interactions captured",
       "Depth 3–8 or 15–63 leaves"
      ],
      [
       "subsample / colsample",
       "Row and feature sampling per tree",
       "0.5–0.9 adds randomness and reduces overfitting"
      ],
      [
       "L1/L2 leaf regularisation, min child weight",
       "Limits extreme leaf values",
       "Raise for noisy data"
      ],
      [
       "early_stopping rounds",
       "Stop when validation stalls",
       "10–100 rounds of patience"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Histogram-based boosting with early stopping",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import make_classification",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.ensemble import HistGradientBoostingClassifier",
      "X, y = make_classification(n_samples=5000, n_features=20, n_informative=8, random_state=0)",
      "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)",
      "gb = HistGradientBoostingClassifier(learning_rate=0.1, max_iter=1000, early_stopping=True,",
      "                                    validation_fraction=0.1, n_iter_no_change=20, random_state=0).fit(X_tr, y_tr)",
      "print(gb.n_iter_, round(gb.score(X_te, y_te), 3))",
      "# output: 104 0.952"
     ],
     "note": "Although up to 1,000 rounds were allowed, training stopped after 104 because the internal validation score stopped improving. Early stopping chooses the number of trees for you."
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Training and validation loss over boosting rounds (illustrative)",
     "labels": [
      "50",
      "100",
      "150",
      "200",
      "250",
      "300",
      "350",
      "400"
     ],
     "yLabel": "Log loss",
     "series": [
      {
       "name": "Training",
       "values": [
        0.45,
        0.33,
        0.27,
        0.23,
        0.2,
        0.17,
        0.15,
        0.13
       ]
      },
      {
       "name": "Validation",
       "values": [
        0.47,
        0.37,
        0.34,
        0.335,
        0.336,
        0.34,
        0.345,
        0.35
       ]
      }
     ],
     "caption": "Illustrative numbers (x-axis: boosting round). Training loss keeps falling, but validation loss flattens and then creeps up; early stopping keeps the model from about round 200."
    },
    {
     "type": "compare",
     "title": "Random forest versus gradient boosting",
     "columns": [
      {
       "title": "Random forest",
       "items": [
        "Trees built independently, in parallel",
        "Reduces variance by averaging deep trees",
        "Strong with almost no tuning",
        "Hard to overfit by adding trees"
       ]
      },
      {
       "title": "Gradient boosting",
       "items": [
        "Trees built sequentially",
        "Reduces bias by correcting errors step by step",
        "Usually more accurate, but needs tuning",
        "Can overfit if run too long; use early stopping"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "title": "Still the tabular default",
     "text": "For small and medium tabular data, gradient-boosted trees remain the strong default baseline. Current libraries handle missing values and categorical features natively and can train on GPUs. Newer options, including pre-trained tabular models that predict from training examples supplied in context, can be competitive on small datasets: treat them as extra candidates compared on the same folds, not as automatic replacements."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Fix a moderate learning rate (0.05–0.1) with early stopping, tune tree complexity (depth or leaves) and minimum leaf size, then row and feature sampling, then regularisation. Finally, lower the learning rate and let early stopping add more trees for a last small gain. Keep the validation scheme fixed throughout.",
     "title": "A dependable tuning order"
    },
    {
     "type": "case",
     "title": "Forecasting late shipments for a garment exporter",
     "context": "A Narayanganj knitwear exporter wants to predict at order acceptance whether an order will ship late. There are 18,000 historical orders with 60 features (buyer, product type, fabric, quantity, lead time, factory load, season, supplier history). A logistic regression baseline scores AUC 0.74. A random forest scores 0.80. A first boosting model with default settings scores 0.79 on validation but 0.99 on training.",
     "questions": [
      "What does the gap in the boosting results suggest, and how would you address it?",
      "Which validation design suits this problem?",
      "How would you decide between the forest and a tuned boosting model?"
     ],
     "answer": "The 0.99 versus 0.79 gap suggests the boosted model is overfitting: too many rounds or too complex trees. Use early stopping, a smaller learning rate, shallower trees or fewer leaves, a larger minimum leaf size and row and feature subsampling. Because orders are predicted in time and buyers repeat, validate with a time-based split (train on older orders, validate on later ones), and check buyer overlap. Compare the tuned boosting model and the forest on identical folds with the business metric (for example recall of late orders at the capacity of the expediting team), then weigh accuracy gains against stability, training time and the explanations the planning team needs."
    },
    {
     "type": "scenario",
     "situation": "A team halves the learning rate of a boosting model from 0.1 to 0.05 but keeps the number of trees fixed at 300, and validation performance drops. What is the most likely explanation?",
     "options": [
      {
       "text": "The trees became deeper automatically",
       "feedback": "Depth is controlled separately; the learning rate does not change it.",
       "best": false
      },
      {
       "text": "With smaller steps, 300 trees are no longer enough; allow more rounds with early stopping",
       "feedback": "Correct. Learning rate and number of trees trade off: halving η roughly doubles the rounds needed to reach the same fit.",
       "best": true
      },
      {
       "text": "The validation set must have leaked",
       "feedback": "Nothing in the change suggests leakage; the model is simply under-trained.",
       "best": false
      },
      {
       "text": "A smaller learning rate always hurts boosting",
       "feedback": "A smaller rate usually generalises as well or better, provided enough trees are added.",
       "best": false
      }
     ],
     "title": "Learning rate and trees"
    },
    {
     "type": "reflection",
     "prompt": "Think of a tabular prediction problem in your organisation. Would you start with a random forest or gradient boosting, and what would make you switch?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Gradient boosting",
       "def": "An ensemble method that adds trees sequentially, each fitted to the negative gradient of the loss of the current model."
      },
      {
       "term": "Shrinkage",
       "def": "Scaling each new tree's contribution by a learning rate below 1 to improve generalisation."
      },
      {
       "term": "Pseudo-residual",
       "def": "The negative gradient of the loss for each row, which the next boosting tree is trained to predict; for squared error it equals the ordinary residual."
      },
      {
       "term": "Early stopping",
       "def": "Halting training when a validation metric stops improving for a set number of rounds."
      },
      {
       "term": "Histogram-based boosting",
       "def": "Boosting that bins feature values into histograms to find splits quickly on large data."
      },
      {
       "term": "Weak learner",
       "def": "A simple model, such as a shallow tree, that is only slightly better than chance on its own."
      },
      {
       "term": "Subsampling",
       "def": "Training each tree on a random fraction of rows or features to add diversity and reduce overfitting."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Boosting adds shallow trees in sequence, each fitting what the ensemble still gets wrong.",
      "The learning rate and the number of rounds trade off; set rounds high and use early stopping.",
      "Tune tree complexity and sampling before fine-tuning the learning rate.",
      "Gradient-boosted trees remain the strong default for tabular data; compare any newcomer fairly."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Current prediction is 50, target 60, the new tree predicts the residual exactly, and η = 0.2. What is the updated prediction?",
       "options": [
        "52",
        "60",
        "50.2",
        "62"
       ],
       "answer": 0,
       "explain": "50 + 0.2 × 10 = 52."
      },
      {
       "q": "For squared-error loss, what does each new tree in gradient boosting fit?",
       "options": [
        "The original target values",
        "Random noise",
        "The residuals of the current ensemble",
        "The predictions made by the previous tree"
       ],
       "answer": 2,
       "explain": "The negative gradient of squared error is the residual."
      },
      {
       "q": "Which pairing is MOST typical of boosting?",
       "options": [
        "A few very deep trees built in parallel",
        "One large tree pruned heavily",
        "Many shallow trees built in sequence",
        "Independent trees on bootstrap samples only"
       ],
       "answer": 2,
       "explain": "Boosting adds many small trees, each correcting the last."
      },
      {
       "q": "Why is early stopping important in gradient boosting?",
       "options": [
        "Boosting can keep fitting noise if run for too many rounds",
        "It makes each tree deeper",
        "It removes the need for a learning rate",
        "It guarantees a calibrated model"
       ],
       "answer": 0,
       "explain": "Validation-based stopping chooses the round count before overfitting sets in."
      },
      {
       "q": "For log loss, what is the negative gradient for a row with label 1 and predicted probability 0.7?",
       "options": [
        "0.7",
        "−0.3",
        "1.7",
        "0.3"
       ],
       "answer": 3,
       "explain": "y − p = 1 − 0.7 = 0.3."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l4",
   "title": "Interpreting and Choosing Tabular Models",
   "subtitle": "Explain what drives predictions and pick the right model for the job",
   "minutes": 26,
   "objectives": [
    "Compare impurity, permutation and Shapley-based importance",
    "Use partial dependence and individual conditional expectation plots",
    "Apply monotonic constraints where domain logic demands them",
    "Choose a model family using accuracy, explainability, cost and risk"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Ensembles are accurate but not readable as a whole. **Interpretation tools** reveal which features matter, how they affect predictions and why a single case received its score. These are essential for debugging, for winning stakeholder trust and for regulators who expect reasons for decisions such as loan refusals."
    },
    {
     "type": "table",
     "title": "Global and local explanation tools",
     "head": [
      "Tool",
      "Question it answers",
      "Caveats"
     ],
     "rows": [
      [
       "Impurity (gain) importance",
       "Which features did the trees split on most?",
       "Biased towards high-cardinality and continuous features; computed on training data"
      ],
      [
       "Permutation importance",
       "How much does the validation score drop if this feature is shuffled?",
       "Correlated features share and hide importance"
      ],
      [
       "Shapley-value attributions",
       "How much did each feature push this prediction up or down?",
       "Can be slow; explains the model, not the real world"
      ],
      [
       "Partial dependence (PD)",
       "How does the average prediction change as one feature varies?",
       "Averages can hide opposite effects in subgroups"
      ],
      [
       "Individual conditional expectation (ICE)",
       "How does one case's prediction change as one feature varies?",
       "Many lines; read alongside PD"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Attribution arithmetic",
     "items": [
      {
       "name": "Permutation importance",
       "expr": "PI_j = score(original) − score(feature j shuffled)",
       "meaning": "If AUC falls from 0.86 to 0.79 when income is shuffled, its importance is 0.07."
      },
      {
       "name": "Additive explanation",
       "expr": "f(x) = φ₀ + Σⱼ φⱼ",
       "meaning": "φ₀ is the average prediction; each φⱼ is a feature's contribution for this case."
      },
      {
       "name": "Worked example",
       "expr": "φ₀ = 0.10 default rate; φ_late = +0.12, φ_income = −0.04, φ_tenure = −0.03",
       "meaning": "Prediction = 0.10 + 0.12 − 0.04 − 0.03 = 0.15. Late payments are the main reason this applicant scores high."
      }
     ]
    },
    {
     "type": "chart",
     "kind": "bar",
     "title": "Why one applicant scored 0.17 (illustrative Shapley contributions)",
     "labels": [
      "Base value",
      "Late payments",
      "Utilisation",
      "Tenure",
      "Income",
      "Prediction"
     ],
     "yLabel": "Default probability",
     "series": [
      {
       "name": "Contribution",
       "values": [
        0.08,
        0.1,
        0.04,
        -0.03,
        -0.02,
        0.17
       ]
      }
     ],
     "caption": "Illustrative values. The base value plus the signed contributions (0.08 + 0.10 + 0.04 − 0.03 − 0.02) equals the prediction, so each bar is a reason that can be reported to the applicant or a reviewer."
    },
    {
     "type": "cli",
     "title": "Permutation importance on validation data",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_breast_cancer",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.ensemble import RandomForestClassifier",
      "from sklearn.inspection import permutation_importance",
      "data = load_breast_cancer()",
      "X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, test_size=0.25, random_state=0, stratify=data.target)",
      "rf = RandomForestClassifier(n_estimators=300, random_state=0).fit(X_tr, y_tr)",
      "r = permutation_importance(rf, X_te, y_te, n_repeats=10, random_state=0)",
      "top = r.importances_mean.argsort()[::-1][:3]",
      "print([data.feature_names[i] for i in top])",
      "# output: ['worst perimeter', 'worst area', 'worst concave points']"
     ],
     "note": "Importance is measured on held-out data, so it reflects what the model relies on to generalise. Perimeter, area and radius are strongly correlated size measurements, so they share importance and each may look smaller than the group really is."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A Shapley plot showing that 'district' raises predicted default does not prove that living there causes default; it shows how the model uses the feature. Explanations are excellent for debugging and accountability, but causal claims still need experiments or causal analysis.",
     "title": "Explanations describe the model, not the world"
    },
    {
     "type": "keypoints",
     "items": [
      "Many domains have logic everyone agrees on: more late payments should never lower predicted default risk.",
      "Boosting libraries can enforce that a prediction only rises (or only falls) with a feature.",
      "Constraints prevent odd, unfair-looking reversals caused by noise in sparse regions.",
      "They usually cost little accuracy and greatly increase stakeholder trust.",
      "Document each constraint and the reason for it."
     ],
     "title": "Monotonic constraints"
    },
    {
     "type": "table",
     "title": "Choosing a model family for tabular data",
     "head": [
      "Need",
      "Good first choice",
      "Why"
     ],
     "rows": [
      [
       "Strict explainability, regulated decision",
       "Logistic regression or scorecard; constrained boosting with explanations",
       "Reasons for every decision, stable behaviour"
      ],
      [
       "Best accuracy on medium-to-large tabular data",
       "Gradient boosting with early stopping",
       "Captures non-linearity and interactions efficiently"
      ],
      [
       "Strong result with minimal tuning",
       "Random forest",
       "Robust defaults, OOB validation"
      ],
      [
       "Tiny dataset",
       "Regularised linear model",
       "Low variance"
      ],
      [
       "Extrapolation beyond training range",
       "Linear model or trees on detrended target",
       "Trees cannot extrapolate"
      ],
      [
       "Very low latency on edge devices",
       "Small tree ensemble or linear model",
       "Fast and compact"
      ]
     ]
    },
    {
     "type": "scenario",
     "situation": "A microfinance institution uses gradient boosting to score loan applications. A borrower in Bogura who was declined asks why. What is the most appropriate response mechanism?",
     "options": [
      {
       "text": "Tell the borrower the model is too complex to explain",
       "feedback": "This fails basic fairness and accountability expectations and often regulatory requirements.",
       "best": false
      },
      {
       "text": "Retrain the model without the borrower's data and compare",
       "feedback": "Retraining is expensive and does not explain the decision that was actually made.",
       "best": false
      },
      {
       "text": "Show the global feature importance chart for the whole model",
       "feedback": "Global importance describes the model overall, not why this specific person was declined.",
       "best": false
      },
      {
       "text": "Generate reason codes from the case's Shapley-style attributions, reviewed for plain-language clarity",
       "feedback": "Correct. Local attributions identify the factors that pushed this applicant's score up most, which can be translated into clear reasons and checked by staff.",
       "best": true
      }
     ],
     "title": "Explaining a declined loan"
    },
    {
     "type": "template",
     "title": "Model explanation card",
     "purpose": "Summarise how a deployed tabular model behaves, for reviewers, auditors and support staff.",
     "columns": [
      "Item",
      "Content"
     ],
     "example": [
      [
       "Top drivers (permutation importance, validation data)",
       "Late payments 12m, utilisation ratio, tenure, income band"
      ],
      [
       "Constraints applied",
       "Monotonic increasing in late payments and utilisation"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "Who would ask for explanations of a model in your organisation: customers, managers, auditors or regulators? What form of explanation would each of them actually understand?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Feature importance",
       "def": "A score of how much a model relies on a feature for its predictions."
      },
      {
       "term": "Permutation importance",
       "def": "The drop in a model's score when one feature's values are randomly shuffled."
      },
      {
       "term": "Shapley values",
       "def": "Attributions from cooperative game theory that fairly divide a prediction among features."
      },
      {
       "term": "Partial dependence plot",
       "def": "A plot of the average model prediction as one feature varies, others averaged out."
      },
      {
       "term": "ICE plot",
       "def": "Individual conditional expectation: one line per case showing how its prediction changes with a feature."
      },
      {
       "term": "Monotonic constraint",
       "def": "A rule that forces a model's prediction to move in only one direction as a feature increases."
      },
      {
       "term": "Reason code",
       "def": "A plain-language statement of a top factor behind an individual model decision."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Use permutation importance on validation data for global importance; gain importance is biased.",
      "Shapley attributions explain single predictions additively; partial dependence and ICE plots show shape.",
      "Explanations describe how the model uses features, not what causes the outcome.",
      "Monotonic constraints encode agreed domain logic and prevent odd reversals.",
      "Choose a model family by accuracy, explainability, cost and risk together."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Baseline AUC is 0.82; after shuffling 'tenure' it is 0.76. What is the permutation importance?",
       "options": [
        "0.76",
        "0.06",
        "0.82",
        "1.58"
       ],
       "answer": 1,
       "explain": "0.82 − 0.76 = 0.06."
      },
      {
       "q": "φ₀ = 0.2 and contributions are +0.15, −0.05 and +0.02. What is the prediction?",
       "options": [
        "0.32",
        "0.12",
        "0.2",
        "0.42"
       ],
       "answer": 0,
       "explain": "0.2 + 0.15 − 0.05 + 0.02 = 0.32."
      },
      {
       "q": "Why can impurity-based importance be misleading?",
       "options": [
        "It is always computed on the test set",
        "It only works for linear models, so tree ensembles must use coefficients instead",
        "It favours high-cardinality and continuous features and uses training data",
        "It cannot rank more than five features"
       ],
       "answer": 2,
       "explain": "Features with many possible split points get chosen more often, even if they generalise poorly."
      },
      {
       "q": "What does a monotonic constraint guarantee?",
       "options": [
        "The model is causal",
        "Predictions move in only one direction as the constrained feature increases",
        "The model's probabilities are perfectly calibrated for every value of the feature",
        "The feature has the highest importance"
       ],
       "answer": 1,
       "explain": "It enforces shape, not causality or calibration."
      },
      {
       "q": "Two correlated features each show low permutation importance. What is a likely explanation?",
       "options": [
        "Both features are useless",
        "The model is underfitting",
        "Permutation importance only works for categorical features, not numeric ones",
        "Shuffling one leaves the other to carry the same information"
       ],
       "answer": 3,
       "explain": "Correlated features mask each other; group them and permute together."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m6",
 "order": 6,
 "code": "Discover",
 "title": "Beyond Labels: Unsupervised Learning, Recommendation and Reinforcement",
 "subtitle": "Find structure without labels, recommend what people need and learn from rewards",
 "outcomes": [
  "Cluster data with k-means and alternatives, choose k and turn clusters into segments",
  "Reduce dimensionality with PCA and use non-linear maps appropriately",
  "Detect anomalies and build feedback loops that improve detection",
  "Design and evaluate recommender systems, including cold start",
  "Explain reinforcement learning, bandits and when RL is practical and safe"
 ],
 "lessons": [
  {
   "id": "m6-l1",
   "title": "Clustering",
   "subtitle": "Find natural groups in unlabelled data and judge whether they are useful",
   "minutes": 26,
   "objectives": [
    "Run the k-means algorithm by hand and explain its objective",
    "Choose the number of clusters with inertia and silhouette scores",
    "Compare k-means, hierarchical clustering, DBSCAN and Gaussian mixtures",
    "Turn clusters into actionable, validated segments"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Much of the world's data has no labels. **Clustering** groups similar records together so that people can see structure: types of customers, patterns of machine behaviour, kinds of patients. Clusters are not ground truth; they are a lens. Their value depends on whether they lead to better decisions."
    },
    {
     "type": "formula",
     "title": "k-means in numbers",
     "items": [
      {
       "name": "Objective (inertia)",
       "expr": "J = Σᵢ ‖xᵢ − μ_c(i)‖²",
       "meaning": "Sum of squared distances from each point to its assigned cluster centre. k-means tries to minimise it."
      },
      {
       "name": "Assignment step",
       "expr": "c(i) = argmin_k ‖xᵢ − μ_k‖",
       "meaning": "Each point joins its nearest centre."
      },
      {
       "name": "Update step",
       "expr": "μ_k = mean of points assigned to cluster k",
       "meaning": "Centres move to the average of their members; repeat until assignments stop changing."
      },
      {
       "name": "Worked iteration",
       "expr": "Points 1, 2, 6, 8; starting centres 1 and 8",
       "meaning": "Assign {1, 2} and {6, 8}; new centres 1.5 and 7; inertia = 0.25 + 0.25 + 1 + 1 = 2.5."
      },
      {
       "name": "Silhouette of a point",
       "expr": "s = (b − a) ÷ max(a, b)",
       "meaning": "a = mean distance within its cluster, b = mean distance to the nearest other cluster. For point 1: a = 1, b = (5 + 7) ÷ 2 = 6, so s = 5 ÷ 6 ≈ 0.83."
      }
     ]
    },
    {
     "type": "cycle",
     "title": "The k-means loop",
     "center": "Repeat until stable",
     "items": [
      {
       "label": "Place k centres",
       "text": "Smart random start (k-means++), several restarts"
      },
      {
       "label": "Assign points",
       "text": "Each point joins its nearest centre"
      },
      {
       "label": "Move centres",
       "text": "Each centre moves to the mean of its points"
      },
      {
       "label": "Check change",
       "text": "Stop when assignments no longer change"
      }
     ],
     "caption": "Each turn can only lower inertia, so the loop always settles, but possibly in a poor local minimum. That is why libraries run several restarts and keep the best."
    },
    {
     "type": "cli",
     "title": "Choosing k with silhouette scores",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import make_blobs",
      "from sklearn.cluster import KMeans",
      "from sklearn.metrics import silhouette_score",
      "X, _ = make_blobs(n_samples=500, centers=4, cluster_std=1.0, random_state=42)",
      "for k in [2, 3, 4, 5, 6]:",
      "    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)",
      "    print(k, round(km.inertia_), round(silhouette_score(X, km.labels_), 3))",
      "# output: 2 15737 0.596",
      "# output: 3 3426 0.761",
      "# output: 4 949 0.791",
      "# output: 5 856 0.665",
      "# output: 6 769 0.561"
     ],
     "note": "Inertia always falls as k rises, so look for the 'elbow' where gains flatten (here after k = 4). The silhouette score peaks at k = 4, matching the four groups that generated the data."
    },
    {
     "type": "chart",
     "kind": "bar",
     "title": "Silhouette score by number of clusters (from the code above)",
     "labels": [
      "k = 2",
      "k = 3",
      "k = 4",
      "k = 5",
      "k = 6"
     ],
     "yLabel": "Mean silhouette",
     "series": [
      {
       "name": "Silhouette",
       "values": [
        0.596,
        0.761,
        0.791,
        0.665,
        0.561
       ]
      }
     ],
     "caption": "The score peaks at k = 4, the number of groups that generated the data. On real data the peak is rarely this clear, so combine it with whether the segments are useful."
    },
    {
     "type": "table",
     "title": "Clustering methods compared",
     "head": [
      "Method",
      "Finds",
      "Needs",
      "Watch out"
     ],
     "rows": [
      [
       "k-means",
       "Round, similar-sized clusters",
       "k in advance; scaled numeric features",
       "Sensitive to outliers and initialisation; use several restarts"
      ],
      [
       "Hierarchical (agglomerative)",
       "A tree of nested clusters (dendrogram)",
       "A linkage rule (Ward, average, complete)",
       "Slow on large data; cut the tree to choose clusters"
      ],
      [
       "DBSCAN",
       "Dense regions of any shape; labels sparse points as noise",
       "Radius ε and minimum points",
       "Struggles when densities vary; ε is hard to set in high dimensions"
      ],
      [
       "Gaussian mixture",
       "Overlapping, elliptical clusters with soft membership",
       "Number of components",
       "Can overfit; check with information criteria such as BIC"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Clustering uses distances, so feature scaling and feature choice decide the result. Clustering customers on raw 'annual spend in taka' and 'number of children' will simply sort them by spend. Decide what similarity should mean for the business, select features that express it, then standardise.",
     "title": "Scale and choose features first"
    },
    {
     "type": "steps",
     "title": "From clusters to segments people can use",
     "items": [
      {
       "title": "Define the purpose",
       "text": "For example: tailor training for mobile money agents."
      },
      {
       "title": "Select and scale features",
       "text": "Transaction volume, cash-in/cash-out ratio, active hours, customer count, float shortages."
      },
      {
       "title": "Cluster and compare",
       "text": "Try several k and methods; check silhouette and stability across resamples."
      },
      {
       "title": "Profile",
       "text": "Describe each cluster with averages and typical examples; give it a plain name."
      },
      {
       "title": "Validate with experts",
       "text": "Field managers confirm the groups make sense and suggest actions."
      },
      {
       "title": "Act and measure",
       "text": "Pilot a different intervention per segment and track outcomes."
      }
     ]
    },
    {
     "type": "case",
     "title": "Segmenting mobile money agents",
     "context": "A mobile financial service has 180,000 agents across Bangladesh. Head office wants to stop sending the same training and float-management messages to everyone. The analytics team has 12 months of agent data: daily transaction counts, cash-in and cash-out values, float top-ups, shortages, location type (urban, peri-urban, rural) and agent tenure.",
     "questions": [
      "Which features would you use, and how would you prepare them?",
      "How would you decide the number of segments?",
      "How would you show the segments add business value?"
     ],
     "answer": "Use behavioural features that relate to the decision, such as average daily transactions, cash-in/cash-out ratio, float shortage frequency, peak-hour share and tenure; log-transform skewed volumes and standardise everything, keeping location type for profiling rather than clustering if the aim is behaviour-based groups. Compare k from about 3 to 8 using silhouette, inertia and stability across bootstrap samples, then choose a number field teams can act on (often 4–6). Profile and name each segment, review with regional managers, and run a pilot in which each segment receives tailored training or float alerts while a control group receives the standard messages, measuring shortages, transaction growth and agent churn."
    },
    {
     "type": "scenario",
     "situation": "A hospital clusters patients by length of stay, number of procedures and age. One cluster contains 8% of patients with very long stays. A manager wants to label it 'high-risk patients' in the electronic record. What is the best response?",
     "options": [
      {
       "text": "Rerun k-means until the cluster disappears",
       "feedback": "Changing the analysis to hide a pattern is not validation.",
       "best": false
      },
      {
       "text": "Profile and validate the cluster with clinicians before naming it or using it in care decisions",
       "feedback": "Correct. Clusters describe similarity in the chosen features, not clinical risk. Experts must confirm what the group represents before it influences care.",
       "best": true
      },
      {
       "text": "Use the cluster as a training label for a supervised risk model",
       "feedback": "Clusters are not ground-truth outcomes; using them as labels would build a model of the clustering, not of risk.",
       "best": false
      },
      {
       "text": "Label it immediately, since the data clearly separated it",
       "feedback": "Clear separation in three features does not establish clinical risk, and a wrong label could bias treatment.",
       "best": false
      }
     ],
     "title": "Interpreting a cluster"
    },
    {
     "type": "reflection",
     "prompt": "What groups exist in your organisation's customers, assets or users? Which features would define 'similar' for the decision you care about?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Clustering",
       "def": "Grouping unlabelled records so that items in the same group are more similar than items in different groups."
      },
      {
       "term": "k-means",
       "def": "A clustering algorithm that alternates between assigning points to the nearest centre and moving centres to their members' mean."
      },
      {
       "term": "Inertia",
       "def": "The sum of squared distances from points to their cluster centres; the k-means objective."
      },
      {
       "term": "Silhouette score",
       "def": "A measure from −1 to 1 of how well each point fits its own cluster compared with the nearest other cluster."
      },
      {
       "term": "DBSCAN",
       "def": "A density-based clustering method that finds arbitrarily shaped clusters and marks sparse points as noise."
      },
      {
       "term": "Dendrogram",
       "def": "A tree diagram showing how hierarchical clustering merges groups."
      },
      {
       "term": "Gaussian mixture model",
       "def": "A probabilistic model that represents data as a blend of several normal distributions with soft memberships."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Clusters are a lens, not ground truth; judge them by the decisions they improve.",
      "k-means suits round, similar-sized clusters on scaled features; DBSCAN finds odd shapes and noise.",
      "Inertia always falls with k; use the elbow, silhouette and business usefulness together.",
      "Feature choice and scaling define what \"similar\" means."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Points 2, 4, 10, 12 with starting centres 2 and 12. What are the centres after one k-means iteration?",
       "options": [
        "3 and 11",
        "2 and 12",
        "4 and 10",
        "7 and 7"
       ],
       "answer": 0,
       "explain": "Assign {2, 4} and {10, 12}; means are 3 and 11."
      },
      {
       "q": "A point has a = 2 and b = 8. What is its silhouette?",
       "options": [
        "0.25",
        "6",
        "0.75",
        "−0.75"
       ],
       "answer": 2,
       "explain": "(8 − 2) ÷ 8 = 0.75."
      },
      {
       "q": "Why should you not pick k purely by minimising inertia?",
       "options": [
        "Inertia is undefined for any k above 3 clusters",
        "Inertia always decreases as k increases",
        "Inertia increases with k",
        "Inertia ignores distances"
       ],
       "answer": 1,
       "explain": "With k = n, inertia is zero; use the elbow, silhouette, stability and business usefulness."
      },
      {
       "q": "Which method can find crescent-shaped clusters and flag outliers as noise?",
       "options": [
        "k-means",
        "Linear regression",
        "PCA",
        "DBSCAN"
       ],
       "answer": 3,
       "explain": "Density-based clustering is not limited to round clusters."
      },
      {
       "q": "What is the best evidence that customer segments are valuable?",
       "options": [
        "The silhouette score is above 0.5",
        "There are exactly five segments",
        "The clusters have similar sizes",
        "Tailored actions for each segment improve outcomes compared with a control group"
       ],
       "answer": 3,
       "explain": "Business value is shown by better decisions, ideally tested against a control."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l2",
   "title": "PCA and Dimensionality Reduction",
   "subtitle": "Compress many correlated features into a few informative directions",
   "minutes": 24,
   "objectives": [
    "Explain what principal components are and how variance is explained",
    "Compute explained variance ratios from eigenvalues",
    "Use PCA for compression, noise reduction and visualisation",
    "Know when to use t-SNE or UMAP, and their limits"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Datasets often have many features that move together: dozens of sensor readings on one turbine, hundreds of pixels in an image, survey questions that measure the same attitude. **Principal component analysis (PCA)** finds new axes, ordered by how much variation they capture, so that a few components can summarise many correlated features."
    },
    {
     "type": "formula",
     "title": "PCA essentials",
     "items": [
      {
       "name": "Centre the data",
       "expr": "X_c = X − μ",
       "meaning": "Subtract each feature's mean (and usually standardise)."
      },
      {
       "name": "Covariance matrix",
       "expr": "C = X_cᵀ X_c ÷ (n − 1)",
       "meaning": "A d × d matrix of how features vary together."
      },
      {
       "name": "Principal components",
       "expr": "C v = λ v",
       "meaning": "Eigenvectors v are the new directions; eigenvalues λ are the variance along each one."
      },
      {
       "name": "Explained variance ratio",
       "expr": "EVR_k = λ_k ÷ Σ λ",
       "meaning": "Eigenvalues 4, 1 and 0.5 give 4 ÷ 5.5 ≈ 72.7% for the first component and (4 + 1) ÷ 5.5 ≈ 90.9% for the first two."
      },
      {
       "name": "Projection",
       "expr": "z = Wᵀ (x − μ)",
       "meaning": "W holds the top k eigenvectors as columns; z is the compressed k-dimensional representation."
      }
     ]
    },
    {
     "type": "cli",
     "title": "How many components keep 95% of the variance?",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_digits",
      "from sklearn.decomposition import PCA",
      "X, _ = load_digits(return_X_y=True)",
      "pca = PCA(n_components=0.95).fit(X)",
      "print(X.shape[1], pca.n_components_, round(pca.explained_variance_ratio_[:2].sum(), 3))",
      "# output: 64 29 0.285"
     ],
     "note": "Images of handwritten digits have 64 pixel features, but 29 components retain 95% of the variance. The first two components alone keep only 28.5%, so a 2-D plot hides a lot of structure."
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Explained variance by component (illustrative)",
     "labels": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
     ],
     "unit": "%",
     "yLabel": "Variance explained",
     "series": [
      {
       "name": "Each component",
       "values": [
        38,
        22,
        14,
        9,
        6,
        4,
        3,
        2,
        1,
        1
       ]
      },
      {
       "name": "Cumulative",
       "values": [
        38,
        60,
        74,
        83,
        89,
        93,
        96,
        98,
        99,
        100
       ]
      }
     ],
     "caption": "Illustrative numbers (x-axis: component number). The first few components carry most of the variance; here 5 components keep 89% and 6 keep 93%, so a 90–95% rule suggests keeping 6."
    },
    {
     "type": "compare",
     "title": "Uses of dimensionality reduction",
     "columns": [
      {
       "title": "PCA (linear)",
       "items": [
        "Compression and faster training",
        "Removing correlated, redundant features",
        "Noise reduction by dropping small components",
        "Can be inverted to reconstruct data"
       ]
      },
      {
       "title": "t-SNE and UMAP (non-linear)",
       "items": [
        "2-D or 3-D maps for visual exploration",
        "Preserve local neighbourhoods well",
        "Distances between far-apart clusters are not meaningful",
        "Not for use as model features without care"
       ]
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Standardise features first, unless they share units and scale on purpose.",
      "Fit PCA on training data only, inside the pipeline, like any other preprocessing step.",
      "Choose the number of components by cumulative explained variance (for example 90–95%) or by downstream validation score.",
      "Components are combinations of all features, so they are harder to explain than original features.",
      "PCA captures linear structure only; curved structure needs non-linear methods or autoencoders."
     ],
     "title": "Practical tips"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A combined-cycle plant in Chattogram records 140 sensor channels per turbine, many of them strongly correlated temperatures and pressures. Engineers used PCA on a period of healthy operation: about 12 components captured 97% of the variance. In live operation, a rising reconstruction error (the part of a reading that the 12 components cannot explain) gave early warning of unusual behaviour, which leads naturally into anomaly detection.",
     "title": "Condition monitoring in a power plant"
    },
    {
     "type": "scenario",
     "situation": "A data scientist applies PCA to the full dataset, keeps 20 components and then cross-validates a classifier on them. Results look good. What is the main methodological issue?",
     "options": [
      {
       "text": "PCA cannot be used before a classifier",
       "feedback": "PCA can be a useful preprocessing step; the issue is where it was fitted.",
       "best": false
      },
      {
       "text": "PCA must be applied to the labels as well",
       "feedback": "PCA is applied to features; labels are not transformed.",
       "best": false
      },
      {
       "text": "PCA was fitted on all rows, so validation data influenced the components; fit it inside the cross-validated pipeline",
       "feedback": "Correct. Like scaling or feature selection, PCA learns from data and must be fitted on training folds only.",
       "best": true
      },
      {
       "text": "20 components is always too many",
       "feedback": "The right number depends on the data and is chosen by validation, not by a fixed rule.",
       "best": false
      }
     ],
     "title": "PCA before a classifier"
    },
    {
     "type": "checklist",
     "title": "Using PCA responsibly",
     "items": [
      "Features are standardised unless they share meaningful units",
      "PCA is fitted on training data only, inside the pipeline",
      "The number of components is chosen by explained variance or validation score",
      "The loss of interpretability is acceptable for the use case",
      "2-D maps from t-SNE or UMAP are used for exploration, not as evidence of distances",
      "Component loadings are inspected to understand what each component captures"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which of your datasets has many correlated features? What would you lose and gain by replacing them with a handful of principal components?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Dimensionality reduction",
       "def": "Representing data with fewer features while preserving as much useful information as possible."
      },
      {
       "term": "Principal component analysis",
       "def": "A linear method that finds orthogonal directions of maximum variance in the data."
      },
      {
       "term": "Principal component",
       "def": "A new axis formed as a weighted combination of the original features."
      },
      {
       "term": "Eigenvalue",
       "def": "In PCA, the amount of variance captured along a principal component."
      },
      {
       "term": "Explained variance ratio",
       "def": "The share of total variance captured by a component."
      },
      {
       "term": "Reconstruction error",
       "def": "The difference between original data and its reconstruction from a reduced representation."
      },
      {
       "term": "t-SNE",
       "def": "A non-linear technique that maps high-dimensional data to two or three dimensions for visualisation, preserving local neighbourhoods."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "PCA finds orthogonal directions of maximum variance and keeps the few that matter.",
      "Standardise first and fit PCA inside the pipeline on training data only.",
      "Choose components by cumulative explained variance or by downstream validation score.",
      "t-SNE and UMAP are for visual exploration; distances and gap sizes in them are not reliable."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Eigenvalues are 6, 3 and 1. What share of variance do the first two components explain?",
       "options": [
        "60%",
        "90%",
        "30%",
        "100%"
       ],
       "answer": 1,
       "explain": "(6 + 3) ÷ 10 = 0.9."
      },
      {
       "q": "Why standardise before PCA on features with different units?",
       "options": [
        "PCA cannot handle negative numbers",
        "It doubles the number of components available, so more variance can be explained",
        "Otherwise features with large numeric ranges dominate the components",
        "It removes the need to centre the data"
       ],
       "answer": 2,
       "explain": "Variance depends on units, so unscaled large-range features take over."
      },
      {
       "q": "What does a principal component represent?",
       "options": [
        "A direction of maximum variance, orthogonal to earlier components",
        "A cluster of similar rows",
        "A single original feature, chosen because it has the highest correlation with the target",
        "A decision boundary between classes"
       ],
       "answer": 0,
       "explain": "Components are ordered directions of maximum variance."
      },
      {
       "q": "A t-SNE map shows two clusters far apart. What can you safely conclude?",
       "options": [
        "The clusters are exactly as far apart in the original data as the map shows",
        "Points in each cluster are locally similar; the gap size is not reliable",
        "The data has exactly two classes",
        "PCA would show the same picture"
       ],
       "answer": 1,
       "explain": "t-SNE preserves local neighbourhoods but distorts global distances."
      },
      {
       "q": "Which use of PCA is most appropriate?",
       "options": [
        "Making a model's features easier to explain to auditors and regulators",
        "Creating labels for supervised learning",
        "Encoding categorical variables",
        "Compressing many correlated sensor readings before modelling"
       ],
       "answer": 3,
       "explain": "PCA excels at compressing correlated numeric features; it reduces interpretability."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l3",
   "title": "Anomaly Detection",
   "subtitle": "Find the rare, the strange and the dangerous when labels are scarce",
   "minutes": 24,
   "objectives": [
    "Distinguish point, contextual and collective anomalies",
    "Apply statistical, isolation-based, density-based and reconstruction methods",
    "Evaluate anomaly detectors with precision at k and analyst feedback",
    "Design a detection workflow that learns from investigated alerts"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Fraud, equipment faults, network intrusions and data-entry errors share two traits: they are **rare**, and they are **different**. Labels are usually scarce, so anomaly detection often starts unsupervised, scoring how unusual each record is, and becomes supervised as investigators confirm cases."
    },
    {
     "type": "table",
     "title": "Kinds of anomaly",
     "head": [
      "Type",
      "Meaning",
      "Example"
     ],
     "rows": [
      [
       "Point anomaly",
       "A single record is unusual on its own",
       "A 5,00,000 BDT wallet transfer from a student account"
      ],
      [
       "Contextual anomaly",
       "Unusual given its context, normal elsewhere",
       "35 °C in a hospital cold store, normal outdoors in summer"
      ],
      [
       "Collective anomaly",
       "A sequence or group is unusual, each item may not be",
       "Fifty small transfers to new recipients within ten minutes"
      ]
     ]
    },
    {
     "type": "table",
     "title": "Detection methods",
     "head": [
      "Method",
      "Idea",
      "Good for"
     ],
     "rows": [
      [
       "Statistical rules (z-score, IQR, control charts)",
       "Flag values far from typical",
       "Single metrics, fast baselines"
      ],
      [
       "Isolation forest",
       "Anomalies are isolated by fewer random splits",
       "Tabular data, many features, fast"
      ],
      [
       "Local outlier factor",
       "Compares a point's local density with its neighbours'",
       "Clusters of different density"
      ],
      [
       "Reconstruction error (PCA, autoencoders)",
       "Normal data reconstructs well; anomalies do not",
       "Sensor and image data"
      ],
      [
       "Supervised classifier",
       "Learns from confirmed anomalies",
       "When enough labelled cases exist"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Scoring and evaluating anomalies",
     "items": [
      {
       "name": "Isolation idea",
       "expr": "score ↑ as average path length E[h(x)] ↓",
       "meaning": "Points that random trees isolate in few splits get high anomaly scores."
      },
      {
       "name": "Reconstruction error",
       "expr": "e = ‖x − x̂‖²",
       "meaning": "x̂ is the reconstruction from PCA or an autoencoder trained on normal data."
      },
      {
       "name": "Precision at k",
       "expr": "P@k = confirmed anomalies in top k ÷ k",
       "meaning": "If analysts review the top 50 alerts and confirm 12, P@50 = 0.24."
      },
      {
       "name": "Recall at k",
       "expr": "R@k = confirmed anomalies in top k ÷ all known anomalies",
       "meaning": "With 20 known frauds in the period, R@50 = 12 ÷ 20 = 0.6."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Isolation forest on planted anomalies",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.ensemble import IsolationForest",
      "rng = np.random.default_rng(1)",
      "X = np.vstack([rng.normal(0, 1, size=(990, 2)), rng.uniform(-6, 6, size=(10, 2))])",
      "y = np.r_[np.zeros(990), np.ones(10)]",
      "iso = IsolationForest(n_estimators=200, random_state=0).fit(X)",
      "score = -iso.score_samples(X)",
      "top20 = np.argsort(score)[::-1][:20]",
      "print('anomalies in top 20:', int(y[top20].sum()))",
      "# output: anomalies in top 20: 5"
     ],
     "note": "Ten anomalies were drawn uniformly over a wide square; some happened to land inside the normal cloud and are genuinely indistinguishable. Precision at 20 is 0.25, recall 0.5, which is typical: detectors rank cases for human review rather than give final answers."
    },
    {
     "type": "cycle",
     "title": "A detection loop that improves over time",
     "center": "Better alerts",
     "items": [
      {
       "label": "Score",
       "text": "Unsupervised detector ranks records"
      },
      {
       "label": "Triage",
       "text": "Analysts review the top alerts"
      },
      {
       "label": "Label",
       "text": "Record confirmed and false alarms"
      },
      {
       "label": "Learn",
       "text": "Train a supervised model on labels"
      },
      {
       "label": "Combine",
       "text": "Blend both scores; tune to capacity"
      },
      {
       "label": "Monitor",
       "text": "Track precision and new patterns"
      }
     ],
     "caption": "Each pass turns analyst decisions into labels, so the system moves from purely unsupervised scoring towards a supervised model tuned to review capacity."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "A transaction that is unusual for the whole population may be normal for that customer. Features that compare a record with the entity's own history (amount ÷ customer's 90-day median, new device, new recipient, unusual hour for this customer) often matter more than the choice of algorithm.",
     "title": "Context beats cleverness"
    },
    {
     "type": "matrix",
     "title": "Triage: where each alert should go",
     "x": "Anomaly score (low → high)",
     "y": "Potential impact (low → high)",
     "quadrants": [
      {
       "title": "Rules and watchlists",
       "items": [
        "Known high-impact patterns",
        "Low score but must not be missed"
       ]
      },
      {
       "title": "Investigate first",
       "items": [
        "Top of the analyst queue",
        "Full context attached"
       ]
      },
      {
       "title": "Ignore or sample",
       "items": [
        "Random audit sample only"
       ]
      },
      {
       "title": "Batch review",
       "items": [
        "Daily review or auto-close known benign patterns"
       ]
      }
     ],
     "caption": "Ranking by score alone mixes trivial oddities with costly ones. Combining score with impact keeps scarce analyst time on the top-right cell."
    },
    {
     "type": "scenario",
     "situation": "An anomaly detector on pump sensors produces 300 alerts a day. Operators can review 20 and have started ignoring all alerts. What is the best improvement?",
     "options": [
      {
       "text": "Rank alerts by score, show only the top 20 with context, and use operator feedback to retrain and tune",
       "feedback": "Correct. Matching alert volume to capacity and learning from feedback restores trust and improves precision over time.",
       "best": true
      },
      {
       "text": "Lower the threshold so that even more anomalies are caught",
       "feedback": "More alerts would deepen alert fatigue and the important ones would still be ignored.",
       "best": false
      },
      {
       "text": "Send all 300 alerts to senior management instead",
       "feedback": "Escalating volume does not create review capacity or improve precision.",
       "best": false
      },
      {
       "text": "Switch the detector off until a perfect model is available",
       "feedback": "No detector is perfect; removing it loses all early warning.",
       "best": false
      }
     ],
     "title": "Sensor alerts at a water treatment plant"
    },
    {
     "type": "reflection",
     "prompt": "Where in your organisation could rare events be caught earlier? How many alerts per day could people realistically review, and how would their feedback be captured?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Anomaly detection",
       "def": "Identifying records that differ markedly from the majority of the data."
      },
      {
       "term": "Contextual anomaly",
       "def": "A value that is unusual only given its context, such as time, place or entity."
      },
      {
       "term": "Collective anomaly",
       "def": "A group or sequence of records that is unusual together."
      },
      {
       "term": "Isolation forest",
       "def": "An ensemble that scores anomalies by how few random splits are needed to isolate a point."
      },
      {
       "term": "Local outlier factor",
       "def": "A score comparing a point's local density with that of its neighbours."
      },
      {
       "term": "Autoencoder",
       "def": "A neural network trained to reconstruct its input through a narrow bottleneck; poor reconstruction suggests an anomaly."
      },
      {
       "term": "Alert fatigue",
       "def": "The tendency of people to ignore alerts when too many are false or irrelevant."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Anomalies are rare and different: point, contextual or collective.",
      "Start unsupervised (isolation forest, reconstruction error), then learn from analyst labels.",
      "Compare each record with its own entity history, not only with the population.",
      "Rank alerts to fit review capacity, and measure precision at that capacity."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Analysts review the top 40 alerts and confirm 10. What is precision at 40?",
       "options": [
        "0.25",
        "0.40",
        "0.10",
        "4.00"
       ],
       "answer": 0,
       "explain": "10 ÷ 40 = 0.25."
      },
      {
       "q": "Why does an isolation forest give anomalies high scores?",
       "options": [
        "They have the largest feature values",
        "They always belong to the minority class label, which the forest is told in advance",
        "They are separated from other points with fewer random splits",
        "They have the most neighbours"
       ],
       "answer": 2,
       "explain": "Short average path lengths in random trees indicate easy isolation."
      },
      {
       "q": "A cold-store temperature of 30 °C is normal outdoors but alarming in the store. What kind of anomaly is it?",
       "options": [
        "Point",
        "Collective",
        "Contextual",
        "Not an anomaly"
       ],
       "answer": 2,
       "explain": "It is unusual only in its context."
      },
      {
       "q": "An autoencoder is trained on normal machine vibration. How does it flag anomalies?",
       "options": [
        "Abnormal inputs reconstruct poorly, giving high reconstruction error",
        "It predicts the failure date directly",
        "It clusters inputs into exactly two groups",
        "It outputs class labels from supervised training"
       ],
       "answer": 0,
       "explain": "Reconstruction error rises for patterns it has not learned."
      },
      {
       "q": "What is the most valuable use of analyst decisions on alerts?",
       "options": [
        "Deleting them once the alert is closed",
        "Using them only for staff performance reviews",
        "Ignoring them, because an unsupervised detector cannot learn from labels",
        "Turning them into labels to train and tune detection models"
       ],
       "answer": 3,
       "explain": "Feedback converts an unsupervised start into an improving supervised system."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l4",
   "title": "Recommender Systems",
   "subtitle": "Suggest the right item to the right person, and measure whether it helps",
   "minutes": 26,
   "objectives": [
    "Compare popularity, content-based and collaborative filtering approaches",
    "Explain matrix factorisation and compute a predicted rating",
    "Evaluate recommendations with precision@k, recall@k and NDCG",
    "Handle cold start, implicit feedback and feedback loops"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Recommenders decide what millions of people see: products in an online shop, videos, news, courses, even loan offers. They work with a large, sparse matrix of **users × items**, where only a tiny fraction of entries (purchases, clicks, ratings) are known, and they try to fill in the rest."
    },
    {
     "type": "table",
     "title": "Main approaches",
     "head": [
      "Approach",
      "How it works",
      "Strength",
      "Weakness"
     ],
     "rows": [
      [
       "Popularity",
       "Recommend the most popular items, perhaps by segment",
       "Strong baseline, no cold-start problem for users",
       "Not personal; reinforces popular items"
      ],
      [
       "Content-based",
       "Recommend items similar to what the user liked, using item attributes or embeddings",
       "Works for new items with descriptions",
       "Narrow, 'more of the same' suggestions"
      ],
      [
       "Collaborative filtering",
       "Use patterns of many users: people who liked X also liked Y",
       "Discovers non-obvious links",
       "Cold start for new users and items"
      ],
      [
       "Hybrid and two-stage",
       "Retrieve candidates cheaply, then rank them with a richer model",
       "Scales to huge catalogues, uses all signals",
       "More engineering complexity"
      ]
     ]
    },
    {
     "type": "text",
     "text": "Large catalogues use **two stages**. **Retrieval** narrows millions of items to a few hundred candidates, often with a two-tower model that embeds users and items in the same vector space and an **approximate nearest-neighbour (ANN)** index that finds the closest item vectors in milliseconds. **Ranking** then scores those candidates with a richer model and many features, and a final re-ranking step adds diversity, freshness and business rules."
    },
    {
     "type": "topology",
     "title": "A two-stage recommender in production",
     "nodes": [
      {
       "id": "vi",
       "kind": "db",
       "label": "Vector index",
       "sub": "item embeddings",
       "x": 1,
       "y": 1
      },
      {
       "id": "fs",
       "kind": "db",
       "label": "Feature store",
       "sub": "user and item features",
       "x": 3.5,
       "y": 1
      },
      {
       "id": "log",
       "kind": "storage",
       "label": "Event log",
       "sub": "impressions, clicks",
       "x": 6,
       "y": 1
      },
      {
       "id": "ret",
       "kind": "process",
       "label": "Retrieval",
       "sub": "~500 candidates",
       "x": 1,
       "y": 3
      },
      {
       "id": "rank",
       "kind": "model",
       "label": "Ranking model",
       "sub": "scores candidates",
       "x": 3.5,
       "y": 3
      },
      {
       "id": "rr",
       "kind": "process",
       "label": "Re-ranking",
       "sub": "diversity, rules",
       "x": 6,
       "y": 3
      },
      {
       "id": "app",
       "kind": "phone",
       "label": "Shopping app",
       "sub": "user session",
       "x": 3.5,
       "y": 5.5
      }
     ],
     "links": [
      {
       "a": "app",
       "b": "ret",
       "label": "request"
      },
      {
       "a": "ret",
       "b": "vi",
       "label": "ANN search"
      },
      {
       "a": "ret",
       "b": "rank",
       "label": "candidates"
      },
      {
       "a": "rank",
       "b": "fs",
       "label": "features"
      },
      {
       "a": "rank",
       "b": "rr",
       "label": "scores"
      },
      {
       "a": "rr",
       "b": "app",
       "label": "top 10"
      },
      {
       "a": "app",
       "b": "log",
       "label": "clicks",
       "style": "dashed"
      },
      {
       "a": "log",
       "b": "fs",
       "label": "training",
       "style": "dashed"
      }
     ],
     "caption": "Cheap retrieval keeps latency low, the ranking model spends compute only on candidates, and logged impressions and clicks feed the next training run. Logging what was shown, not just what was clicked, is what makes later evaluation possible."
    },
    {
     "type": "formula",
     "title": "Collaborative filtering arithmetic",
     "items": [
      {
       "name": "Matrix factorisation",
       "expr": "r̂_ui = μ + b_u + b_i + p_u · q_i",
       "meaning": "μ global mean, b_u user bias, b_i item bias, p_u and q_i learned factor vectors."
      },
      {
       "name": "Worked prediction",
       "expr": "μ = 3.5, b_u = 0.3, b_i = −0.2, p_u = (1.0, 0.5), q_i = (0.8, −0.4)",
       "meaning": "p_u · q_i = 0.8 − 0.2 = 0.6, so r̂ = 3.5 + 0.3 − 0.2 + 0.6 = 4.2."
      },
      {
       "name": "Item–item cosine",
       "expr": "sim(i, j) = (rᵢ · rⱼ) ÷ (‖rᵢ‖ ‖rⱼ‖)",
       "meaning": "Compares two items by the users who interacted with them."
      },
      {
       "name": "Precision@k",
       "expr": "relevant items in top k ÷ k",
       "meaning": "3 relevant in the top 5 gives 0.6."
      },
      {
       "name": "DCG@k and NDCG",
       "expr": "DCG = Σ relᵢ ÷ log₂(i + 1);  NDCG = DCG ÷ ideal DCG",
       "meaning": "Rewards placing relevant items near the top of the list."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Item–item similarity on a tiny interaction matrix",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "# rows = users, columns = courses: Python, Statistics, Excel, Design",
      "R = np.array([[1, 1, 0, 0], [1, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 1]])",
      "norms = np.linalg.norm(R, axis=0)",
      "S = (R.T @ R) / np.outer(norms, norms)",
      "print(S[0].round(2).tolist())",
      "# output: [1.0, 0.82, 0.5, 0.0]",
      "user = np.array([1, 0, 0, 0])",
      "scores = S @ user; scores[user == 1] = -1",
      "print(int(scores.argmax()))",
      "# output: 1"
     ],
     "note": "A learner who took Python is recommended Statistics (column 1), the course most often taken by the same people. Design shares no learners with Python, so its similarity is 0."
    },
    {
     "type": "compare",
     "title": "Explicit versus implicit feedback",
     "columns": [
      {
       "title": "Explicit",
       "items": [
        "Ratings, likes, reviews",
        "Clear preference signal",
        "Sparse: few people rate",
        "Self-selection bias"
       ]
      },
      {
       "title": "Implicit",
       "items": [
        "Clicks, views, purchases, watch time",
        "Plentiful",
        "Absence is ambiguous: not seen or not liked?",
        "Needs weighting and negative sampling"
       ]
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "**Cold start**: new users and items have no history; use content features, popularity by segment, or onboarding questions.",
      "**Feedback loops**: items shown more get clicked more and are shown even more; add exploration and diversity.",
      "**Popularity bias**: niche items starve; re-rank for diversity and coverage.",
      "**Offline–online gap**: offline metrics on past logs reflect what the old system showed; confirm with A/B tests.",
      "**Business rules**: stock, margins, fairness to sellers and safety filters sit on top of the model."
     ],
     "title": "Problems every recommender meets"
    },
    {
     "type": "scenario",
     "situation": "A university e-learning platform in Dhaka wants recommendations for first-year students who have just enrolled and have no activity yet. Collaborative filtering is planned. What is the best approach for these new users?",
     "options": [
      {
       "text": "Show random courses until each student has 50 interactions",
       "feedback": "Random suggestions waste early engagement and drive students away.",
       "best": false
      },
      {
       "text": "Use collaborative filtering only; it will work from the first day",
       "feedback": "With no interactions, there is nothing to collaborate on for these users.",
       "best": false
      },
      {
       "text": "Wait until the end of the first semester before recommending",
       "feedback": "Students need guidance most at the start; simple signals are available immediately.",
       "best": false
      },
      {
       "text": "Start with content and context: programme, chosen modules and popular courses among similar students, then blend in collaborative filtering as activity grows",
       "feedback": "Correct. New users have no interaction history, so collaborative filtering alone cannot help. Programme-based popularity and content features bridge the cold start.",
       "best": true
      }
     ],
     "title": "Recommending courses to new students"
    },
    {
     "type": "template",
     "title": "Recommender evaluation plan",
     "purpose": "Agree offline and online measures, guardrails and baselines before launching a recommender.",
     "columns": [
      "Measure",
      "Type",
      "Target or guardrail",
      "Baseline",
      "How measured"
     ],
     "example": [
      [
       "Recall@20 of next-week purchases",
       "Offline",
       "≥ 0.25",
       "Popularity by category: 0.17",
       "Time-split holdout of the last 4 weeks"
      ],
      [
       "Revenue per session",
       "Online",
       "+3% vs control",
       "Current homepage",
       "Two-week A/B test, 50/50 split"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "Where does your organisation decide what to show or offer to people? Which feedback signals do you have, and what feedback loop could a recommender create?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Recommender system",
       "def": "A system that predicts which items a user is likely to find relevant and ranks them."
      },
      {
       "term": "Collaborative filtering",
       "def": "Recommending from patterns in many users' interactions, without needing item content."
      },
      {
       "term": "Content-based filtering",
       "def": "Recommending items whose attributes resemble those a user liked before."
      },
      {
       "term": "Matrix factorisation",
       "def": "Representing users and items as low-dimensional vectors whose dot product predicts interaction."
      },
      {
       "term": "Cold start",
       "def": "The difficulty of recommending for new users or items that have little or no interaction history."
      },
      {
       "term": "Implicit feedback",
       "def": "Behavioural signals such as clicks or purchases used as indirect evidence of preference."
      },
      {
       "term": "NDCG",
       "def": "Normalised discounted cumulative gain: a ranking metric that rewards relevant items placed near the top."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Recommenders fill in a sparse user × item matrix from explicit or implicit feedback.",
      "Popularity is a strong baseline; content-based methods solve item cold start; collaborative filtering finds non-obvious links.",
      "At scale, embedding-based retrieval with ANN search feeds a richer ranking model.",
      "Watch feedback loops and popularity bias; confirm offline gains with online experiments."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "μ = 4.0, b_u = −0.5, b_i = 0.2 and p_u · q_i = 0.3. What is the predicted rating?",
       "options": [
        "4.5",
        "4.0",
        "3.5",
        "4.3"
       ],
       "answer": 1,
       "explain": "4.0 − 0.5 + 0.2 + 0.3 = 4.0."
      },
      {
       "q": "Two relevant items appear in a top-10 list. What is precision@10?",
       "options": [
        "0.2",
        "0.1",
        "2",
        "0.5"
       ],
       "answer": 0,
       "explain": "2 ÷ 10 = 0.2."
      },
      {
       "q": "Which approach handles brand-new items with good descriptions best?",
       "options": [
        "Pure collaborative filtering",
        "Popularity of past items only",
        "Content-based filtering",
        "User–user similarity"
       ],
       "answer": 2,
       "explain": "Content features exist before any interactions do."
      },
      {
       "q": "Why is a missing click ambiguous in implicit feedback?",
       "options": [
        "Clicks are always random",
        "The user may not have seen the item rather than disliked it",
        "Missing values usually mean that the item was out of stock at the time",
        "It proves the user disliked the item"
       ],
       "answer": 1,
       "explain": "Absence of interaction mixes 'not exposed' with 'not interested'."
      },
      {
       "q": "A recommender keeps showing the same popular products, and their sales grow while others shrink. What is this?",
       "options": [
        "Cold start caused by new products joining",
        "Data leakage",
        "Underfitting",
        "A feedback loop with popularity bias"
       ],
       "answer": 3,
       "explain": "Exposure drives clicks, which drive more exposure; exploration and diversity help."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l5",
   "title": "Reinforcement Learning: An Introduction",
   "subtitle": "Learning to act by trial, error and reward",
   "minutes": 26,
   "objectives": [
    "Describe agents, environments, states, actions, rewards and policies",
    "Compute discounted returns and a Q-learning update",
    "Explain the exploration–exploitation trade-off and multi-armed bandits",
    "Judge when reinforcement learning is practical and safe"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Supervised learning is told the right answer. **Reinforcement learning (RL)** is not: an agent takes actions, sees what happens and receives rewards, and must discover which actions lead to the most reward over time. RL powers game-playing systems, robotics, some recommendation and pricing systems, and the fine-tuning of language models from human preferences."
    },
    {
     "type": "cycle",
     "title": "The reinforcement learning loop",
     "center": "Agent and environment",
     "items": [
      {
       "label": "State",
       "text": "What the agent observes now"
      },
      {
       "label": "Action",
       "text": "What it chooses to do"
      },
      {
       "label": "Environment",
       "text": "The world responds"
      },
      {
       "label": "Reward",
       "text": "A number saying how good that was"
      },
      {
       "label": "Next state",
       "text": "The loop repeats"
      },
      {
       "label": "Learn",
       "text": "Update the policy to get more reward"
      }
     ],
     "caption": "The agent never sees the right answer, only rewards that may arrive late. Learning means adjusting the policy so that, over many turns of this loop, total discounted reward rises."
    },
    {
     "type": "formula",
     "title": "Core RL quantities",
     "items": [
      {
       "name": "Discounted return",
       "expr": "G_t = r_{t+1} + γ r_{t+2} + γ² r_{t+3} + …",
       "meaning": "γ between 0 and 1 discounts future rewards. Rewards 1, 0, 2 with γ = 0.9 give 1 + 0 + 2 × 0.81 = 2.62."
      },
      {
       "name": "Action value",
       "expr": "Q(s, a) = expected return after taking a in s and following the policy",
       "meaning": "Tells the agent how good each action is in each state."
      },
      {
       "name": "Q-learning update",
       "expr": "Q(s, a) ← Q(s, a) + α [r + γ max_a′ Q(s′, a′) − Q(s, a)]",
       "meaning": "Move the estimate towards the reward plus the best estimated future value."
      },
      {
       "name": "Worked update",
       "expr": "Q = 2, r = 1, γ = 0.9, max Q(s′, ·) = 3, α = 0.5",
       "meaning": "Target = 1 + 2.7 = 3.7; new Q = 2 + 0.5 × 1.7 = 2.85."
      },
      {
       "name": "ε-greedy policy",
       "expr": "With probability ε explore at random, otherwise take the best-known action",
       "meaning": "ε = 0.1 means one action in ten is exploratory."
      }
     ]
    },
    {
     "type": "cli",
     "title": "An ε-greedy bandit learning which offer works best",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "rng = np.random.default_rng(0)",
      "true_rates = [0.05, 0.11, 0.08]          # unknown conversion rate of three offers",
      "counts, values = np.zeros(3), np.zeros(3)",
      "for t in range(5000):",
      "    a = rng.integers(3) if rng.random() < 0.1 else int(values.argmax())",
      "    reward = float(rng.random() < true_rates[a])",
      "    counts[a] += 1",
      "    values[a] += (reward - values[a]) / counts[a]",
      "print(counts.astype(int).tolist(), values.round(3).tolist())",
      "# output: [712, 4049, 239] [0.049, 0.105, 0.075]"
     ],
     "note": "The agent spends most of its trials on the offer with the highest estimated conversion while still exploring the others occasionally. This is a multi-armed bandit, the simplest RL setting, with no states, only actions and rewards."
    },
    {
     "type": "compare",
     "title": "Bandits versus full reinforcement learning",
     "columns": [
      {
       "title": "Multi-armed bandit",
       "items": [
        "No state, or simple context",
        "Each action's reward comes immediately",
        "Used for adaptive A/B tests, offers, headlines",
        "Practical and widely deployed"
       ]
      },
      {
       "title": "Full RL (sequential decisions)",
       "items": [
        "Actions change future states",
        "Rewards may be delayed many steps",
        "Used in robotics, control, games, operations",
        "Needs simulators or very safe exploration"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "An agent optimises exactly the reward it is given. Reward a call-centre routing agent for 'short calls' and it may learn to transfer difficult customers away. Specify rewards that reflect the true goal, add constraints for safety, and test in simulation before any real-world exploration.",
     "title": "Reward design is everything"
    },
    {
     "type": "callout",
     "kind": "insight",
     "title": "Reward learning in language models",
     "text": "Reinforcement learning ideas also shape modern chat models. After pre-training, models are tuned on human or model-generated preference comparisons, either by training a reward model and optimising against it with RL (RLHF) or with direct preference methods such as DPO that learn from the preference pairs without a separate reward model. The same warning applies: the model optimises the measured preference, which can reward confident or flattering answers over correct ones."
    },
    {
     "type": "table",
     "title": "When is RL a sensible choice?",
     "head": [
      "Question",
      "Favourable answer",
      "If not"
     ],
     "rows": [
      [
       "Are decisions sequential, with actions affecting the future?",
       "Yes",
       "Supervised learning or bandits are simpler"
      ],
      [
       "Is there a simulator or a safe way to explore?",
       "Yes, e.g. a building energy simulator",
       "Exploration may be too costly or dangerous"
      ],
      [
       "Can the goal be expressed as a reward?",
       "Clearly and measurably",
       "The agent may game a poor proxy"
      ],
      [
       "Is there enough interaction data or compute?",
       "Yes",
       "Classical control or heuristics may win"
      ]
     ]
    },
    {
     "type": "scenario",
     "situation": "A hospital in Sylhet wants to reduce chiller energy use with RL that adjusts set points every 15 minutes. Operating theatres must stay within strict temperature and humidity limits. What is the most responsible plan?",
     "options": [
      {
       "text": "Reward the agent only for lower energy use",
       "feedback": "Without constraints or penalties for comfort and safety breaches, the agent would simply turn cooling down.",
       "best": false
      },
      {
       "text": "Train and test in a calibrated building simulator with hard safety limits, then deploy gradually with human override",
       "feedback": "Correct. A simulator allows exploration without risk, constraints protect patients, and staged deployment with override builds confidence.",
       "best": true
      },
      {
       "text": "Let the agent explore freely on the live system so that it learns faster",
       "feedback": "Random exploration could breach theatre limits and endanger patients.",
       "best": false
      },
      {
       "text": "Use supervised learning to copy the current manual settings",
       "feedback": "Imitation can be a useful start, but it cannot improve beyond current practice and ignores the stated goal.",
       "best": false
      }
     ],
     "title": "Air-conditioning control in a hospital"
    },
    {
     "type": "template",
     "title": "Reward design worksheet",
     "purpose": "Make the goal, reward, constraints and failure modes of an RL or bandit system explicit before training.",
     "columns": [
      "Element",
      "Definition",
      "How it could be gamed",
      "Safeguard"
     ],
     "example": [
      [
       "Reward",
       "Energy saved per hour (kWh)",
       "Let theatres warm up to save energy",
       "Large penalty for any breach of temperature or humidity limits"
      ],
      [
       "Action space",
       "Chiller set point 6–10 °C in 0.5 °C steps",
       "Rapid oscillation wears equipment",
       "Limit changes to one step per 15 minutes"
      ]
     ],
     "rows": 5
    },
    {
     "type": "reflection",
     "prompt": "Name one sequential decision in your field, such as inventory reordering or treatment scheduling. What would the state, actions and reward be, and what could go wrong if the reward were slightly mis-specified?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Agent",
       "def": "The learner and decision-maker in reinforcement learning."
      },
      {
       "term": "Environment",
       "def": "Everything the agent interacts with, which responds to actions with new states and rewards."
      },
      {
       "term": "Policy",
       "def": "The agent's rule for choosing actions given a state."
      },
      {
       "term": "Discount factor",
       "def": "The parameter γ that sets how much future rewards count relative to immediate ones."
      },
      {
       "term": "Q-learning",
       "def": "An algorithm that learns action values by bootstrapping from the best estimated next-state value."
      },
      {
       "term": "Exploration–exploitation trade-off",
       "def": "Balancing trying new actions to learn against using the best-known action to earn reward."
      },
      {
       "term": "Multi-armed bandit",
       "def": "A simplified RL problem with actions and immediate rewards but no state transitions."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "RL learns a policy from rewards through trial and error; rewards may be delayed.",
      "Bandits handle immediate-reward choices and are widely practical; full RL suits sequential decisions with a simulator.",
      "Balance exploration and exploitation, for example with ε-greedy.",
      "An agent optimises exactly the reward given: design it carefully, add constraints and test in simulation.",
      "Preference optimisation (RLHF, DPO) applies the same ideas, and the same risks, to language models."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Rewards 2, 2, 2 with γ = 0.5. What is the discounted return from the first step?",
       "options": [
        "6",
        "3",
        "2.5",
        "3.5"
       ],
       "answer": 3,
       "explain": "2 + 2 × 0.5 + 2 × 0.25 = 3.5."
      },
      {
       "q": "Q = 5, r = 0, γ = 1, max Q(s′, ·) = 4, α = 0.5. What is the new Q?",
       "options": [
        "5",
        "4.5",
        "4",
        "2.5"
       ],
       "answer": 1,
       "explain": "Target = 0 + 4 = 4; new Q = 5 + 0.5 × (4 − 5) = 4.5."
      },
      {
       "q": "What does ε = 0.2 in an ε-greedy policy mean?",
       "options": [
        "The agent is 20% accurate",
        "Rewards are discounted by 20%",
        "About 20% of actions are chosen at random to explore",
        "The learning rate is 0.2"
       ],
       "answer": 2,
       "explain": "ε is the exploration probability."
      },
      {
       "q": "Which problem suits a multi-armed bandit best?",
       "options": [
        "Choosing which of four promotional messages to show to maximise clicks",
        "Controlling a robot arm through a long sequence of moves to pick up parcels",
        "Clustering customers into segments",
        "Predicting house prices from features"
       ],
       "answer": 0,
       "explain": "Actions with immediate rewards and no state transitions fit a bandit."
      },
      {
       "q": "Why is a simulator so valuable in RL?",
       "options": [
        "It removes the need for a reward",
        "The agent can explore and fail safely and cheaply before acting in the real world",
        "It guarantees that the learned policy will be optimal when transferred to reality",
        "It turns RL into supervised learning"
       ],
       "answer": 1,
       "explain": "Exploration in the real world can be costly or dangerous."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m7",
 "order": 7,
 "code": "Deep",
 "title": "Neural Networks and Deep Learning",
 "subtitle": "Build intuition for neural networks, CNNs, sequence models and transformers, and train them well",
 "outcomes": [
  "Compute forward passes and parameter counts for neural networks",
  "Train deep networks stably with backpropagation, normalisation and regularisation",
  "Apply convolutional networks and transfer learning to image problems",
  "Model sequences with embeddings, recurrent networks and lag features",
  "Explain attention and transformers and choose how to adapt foundation models"
 ],
 "lessons": [
  {
   "id": "m7-l1",
   "title": "Neurons, Layers and Activations",
   "subtitle": "How a neural network turns inputs into predictions, one layer at a time",
   "minutes": 24,
   "objectives": [
    "Describe a neuron as a weighted sum followed by an activation",
    "Compute a forward pass through a small network by hand",
    "Compare common activation functions and output layers",
    "Count the parameters of a fully connected network"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **neural network** is a stack of simple steps. Each layer multiplies its inputs by a weight matrix, adds a bias and applies a non-linear **activation**. Stack enough layers and the network can represent remarkably complex functions, from recognising a crack in a fabric image to translating a Bangla sentence."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A neuron computes z = w · x + b and outputs a = g(z), where g is an activation function. A **layer** applies many neurons to the same input at once, which is a single matrix multiplication: a = g(xW + b).",
     "title": "Artificial neuron"
    },
    {
     "type": "formula",
     "title": "Building blocks",
     "items": [
      {
       "name": "Layer",
       "expr": "h = g(x W + b)",
       "meaning": "x has d_in values, W is d_in × d_out, b has d_out values."
      },
      {
       "name": "ReLU",
       "expr": "ReLU(z) = max(0, z)",
       "meaning": "Simple, fast and the default in hidden layers; gradients do not shrink for positive z."
      },
      {
       "name": "Sigmoid and tanh",
       "expr": "σ(z) = 1 ÷ (1 + e⁻ᶻ);  tanh(z) ∈ (−1, 1)",
       "meaning": "Used for gates and binary outputs; saturate for large |z|, which slows learning in deep stacks."
      },
      {
       "name": "Softmax output",
       "expr": "pₖ = e^{zₖ} ÷ Σ e^{zⱼ}",
       "meaning": "For multi-class outputs; pairs with cross-entropy loss."
      },
      {
       "name": "Parameter count (dense layer)",
       "expr": "d_in × d_out + d_out",
       "meaning": "A 784 → 128 → 10 network has 784 × 128 + 128 = 100,480 plus 128 × 10 + 10 = 1,290, so 101,770 parameters."
      }
     ]
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Three activation functions side by side",
     "labels": [
      "−3",
      "−2",
      "−1",
      "0",
      "1",
      "2",
      "3"
     ],
     "yLabel": "Output",
     "series": [
      {
       "name": "ReLU",
       "values": [
        0,
        0,
        0,
        0,
        1,
        2,
        3
       ]
      },
      {
       "name": "Sigmoid",
       "values": [
        0.047,
        0.119,
        0.269,
        0.5,
        0.731,
        0.881,
        0.953
       ]
      },
      {
       "name": "tanh",
       "values": [
        -0.995,
        -0.964,
        -0.762,
        0.0,
        0.762,
        0.964,
        0.995
       ]
      }
     ],
     "caption": "Computed values (x-axis: input z). Sigmoid and tanh flatten at both ends, so their gradients vanish for large |z|; ReLU keeps a constant slope for positive inputs, which is why it trains deep stacks more easily."
    },
    {
     "type": "steps",
     "title": "A forward pass by hand",
     "items": [
      {
       "title": "Input",
       "text": "x = (1, 2)."
      },
      {
       "title": "Hidden layer",
       "text": "W₁ = [[0.5, −1], [1, 0.5]], b₁ = (0, −1). xW₁ = (1 × 0.5 + 2 × 1, 1 × (−1) + 2 × 0.5) = (2.5, 0). Adding b₁ gives (2.5, −1)."
      },
      {
       "title": "ReLU",
       "text": "h = (max(0, 2.5), max(0, −1)) = (2.5, 0)."
      },
      {
       "title": "Output layer",
       "text": "W₂ = (1, −2), b₂ = 0.5: z = 2.5 × 1 + 0 × (−2) + 0.5 = 3.0."
      },
      {
       "title": "Sigmoid",
       "text": "p = σ(3.0) ≈ 0.953, the predicted probability of the positive class."
      }
     ]
    },
    {
     "type": "topology",
     "title": "The worked forward pass as a network",
     "nodes": [
      {
       "id": "x1",
       "kind": "process",
       "label": "x₁ = 1",
       "sub": "input",
       "x": 0,
       "y": 1
      },
      {
       "id": "x2",
       "kind": "process",
       "label": "x₂ = 2",
       "sub": "input",
       "x": 0,
       "y": 5
      },
      {
       "id": "h1",
       "kind": "process",
       "label": "h₁ = 2.5",
       "sub": "ReLU(2.5 + 0)",
       "x": 3.5,
       "y": 1
      },
      {
       "id": "h2",
       "kind": "process",
       "label": "h₂ = 0",
       "sub": "ReLU(0 − 1)",
       "x": 3.5,
       "y": 5
      },
      {
       "id": "out",
       "kind": "model",
       "label": "p ≈ 0.953",
       "sub": "σ(3.0); bias 0.5",
       "x": 7,
       "y": 3
      }
     ],
     "links": [
      {
       "a": "x1",
       "b": "h1",
       "label": "w = 0.5"
      },
      {
       "a": "x1",
       "b": "h2",
       "aEnd": "w = −1"
      },
      {
       "a": "x2",
       "b": "h1",
       "aEnd": "w = 1"
      },
      {
       "a": "x2",
       "b": "h2",
       "label": "w = 0.5"
      },
      {
       "a": "h1",
       "b": "out",
       "label": "w = 1"
      },
      {
       "a": "h2",
       "b": "out",
       "label": "w = −2"
      }
     ],
     "caption": "Each arrow is one weight from the matrices W₁ and W₂, and each hidden node adds its bias before ReLU. Because h₂ is zero, its −2 weight contributes nothing to this prediction."
    },
    {
     "type": "cli",
     "title": "The same forward pass in NumPy",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "x = np.array([1.0, 2.0])",
      "W1 = np.array([[0.5, -1.0], [1.0, 0.5]]); b1 = np.array([0.0, -1.0])",
      "h = np.maximum(0, x @ W1 + b1)",
      "W2 = np.array([1.0, -2.0]); b2 = 0.5",
      "p = 1 / (1 + np.exp(-(h @ W2 + b2)))",
      "print(h.tolist(), round(float(p), 3))",
      "# output: [2.5, 0.0] 0.953"
     ],
     "note": "Deep learning frameworks do exactly this, at scale and on GPUs, and also compute the gradients automatically."
    },
    {
     "type": "compare",
     "title": "Why non-linear activations are essential",
     "columns": [
      {
       "title": "Without activations",
       "items": [
        "Stacking layers gives xW₁W₂ = xW",
        "Any depth collapses into one linear model",
        "Cannot represent curves or interactions"
       ]
      },
      {
       "title": "With activations",
       "items": [
        "Each layer bends and folds the space",
        "Depth builds features of increasing abstraction",
        "Can approximate very complex functions"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Matching the output layer to the task",
     "head": [
      "Task",
      "Output layer",
      "Loss"
     ],
     "rows": [
      [
       "Regression",
       "One linear unit (no activation)",
       "MSE or MAE"
      ],
      [
       "Binary classification",
       "One sigmoid unit",
       "Binary cross-entropy"
      ],
      [
       "Multi-class (one label)",
       "K units with softmax",
       "Categorical cross-entropy"
      ],
      [
       "Multi-label (several labels)",
       "K sigmoid units",
       "Binary cross-entropy per label"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Neural networks shine on **unstructured data** (images, audio, text) and very large datasets, where they learn features themselves. On ordinary tabular business data of modest size, gradient-boosted trees usually match or beat them with less tuning. Choose by data type and evidence, not fashion.",
     "title": "When to reach for deep learning"
    },
    {
     "type": "scenario",
     "situation": "A hospital wants one model that tags each chest X-ray with any of 14 findings; an image can show several findings at once. Which output design is correct?",
     "options": [
      {
       "text": "One softmax over 14 classes",
       "feedback": "Softmax forces probabilities to sum to one, implying exactly one finding per image.",
       "best": false
      },
      {
       "text": "14 ReLU outputs trained with MSE",
       "feedback": "ReLU outputs are not probabilities and MSE is a poor fit for yes/no labels.",
       "best": false
      },
      {
       "text": "One linear output predicting the number of findings",
       "feedback": "That loses which findings are present.",
       "best": false
      },
      {
       "text": "14 sigmoid outputs trained with binary cross-entropy for each finding",
       "feedback": "Correct. Findings are not mutually exclusive, so each needs its own independent probability.",
       "best": true
      }
     ],
     "title": "Choosing an output layer"
    },
    {
     "type": "reflection",
     "prompt": "Explain, as if to a manager, why a neural network needs non-linear activations. Use the idea of bending or folding a sheet of paper."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Neural network",
       "def": "A model built from layers of weighted sums and non-linear activations, trained by gradient descent."
      },
      {
       "term": "Neuron",
       "def": "A unit that computes a weighted sum of inputs plus a bias and applies an activation function."
      },
      {
       "term": "Activation function",
       "def": "A non-linear function, such as ReLU or sigmoid, applied to a neuron's weighted sum."
      },
      {
       "term": "ReLU",
       "def": "Rectified linear unit: max(0, z); the standard hidden-layer activation."
      },
      {
       "term": "Hidden layer",
       "def": "A layer between the input and output whose values are learned intermediate features."
      },
      {
       "term": "Forward pass",
       "def": "Computing a network's output from its input by applying each layer in turn."
      },
      {
       "term": "Multi-label classification",
       "def": "A task where each example can belong to several classes at once."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "A layer is a matrix multiplication plus bias followed by a non-linear activation.",
      "Without activations, any depth collapses into one linear model.",
      "ReLU-family activations are the default in hidden layers; match the output layer and loss to the task.",
      "A dense layer has d_in × d_out + d_out parameters.",
      "On modest tabular data, gradient-boosted trees usually beat neural networks."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is ReLU(−3)?",
       "options": [
        "0",
        "−3",
        "3",
        "1"
       ],
       "answer": 0,
       "explain": "ReLU returns max(0, z)."
      },
      {
       "q": "How many parameters does a dense layer from 100 inputs to 20 outputs have, including biases?",
       "options": [
        "2,000",
        "120",
        "2,020",
        "2,100"
       ],
       "answer": 2,
       "explain": "100 × 20 + 20 = 2,020."
      },
      {
       "q": "Why does a network of linear layers without activations add no power over one linear layer?",
       "options": [
        "Linear layers cannot be trained",
        "The composition of linear maps is itself a linear map",
        "Linear layers have no parameters",
        "Linear layers can only be trained on image data, not on tabular data"
       ],
       "answer": 1,
       "explain": "xW₁W₂ equals xW for W = W₁W₂."
      },
      {
       "q": "Which output is right for predicting one of five mutually exclusive product categories?",
       "options": [
        "Five sigmoid units, one per category",
        "One ReLU unit",
        "One linear unit",
        "Five units with softmax"
       ],
       "answer": 3,
       "explain": "Mutually exclusive classes need probabilities that sum to one."
      },
      {
       "q": "On a 20,000-row tabular credit dataset, which model family is usually a strong first choice?",
       "options": [
        "A very deep convolutional network",
        "A transformer trained from scratch",
        "A recurrent network",
        "Gradient-boosted trees"
       ],
       "answer": 3,
       "explain": "Boosted trees usually lead on modest tabular data; deep learning excels on unstructured data."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l2",
   "title": "Training Deep Networks",
   "subtitle": "Backpropagation, initialisation, normalisation and the regularisers that make deep learning work",
   "minutes": 26,
   "objectives": [
    "Explain backpropagation and compute a gradient for a single neuron",
    "Recognise vanishing and exploding gradients and their remedies",
    "Apply dropout, weight decay, data augmentation and early stopping",
    "Set up a sensible training run and read its curves"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Training a deep network means running gradient descent on millions of parameters. **Backpropagation** computes all the gradients efficiently by applying the chain rule from the output back to the input. Around it sits a toolbox of practical techniques that keep training stable and stop the network from memorising its data."
    },
    {
     "type": "formula",
     "title": "Backpropagation for one sigmoid neuron with log loss",
     "items": [
      {
       "name": "Forward",
       "expr": "z = w x + b;  p = σ(z);  L = −[y ln p + (1 − y) ln(1 − p)]",
       "meaning": "One input, one weight, one example."
      },
      {
       "name": "Key result",
       "expr": "∂L/∂z = p − y",
       "meaning": "The sigmoid and log-loss derivatives combine neatly."
      },
      {
       "name": "Chain rule",
       "expr": "∂L/∂w = (p − y) x;  ∂L/∂b = p − y",
       "meaning": "Multiply by the derivative of z with respect to each parameter."
      },
      {
       "name": "Worked example",
       "expr": "x = 2, w = 0.5, b = 0, y = 1",
       "meaning": "z = 1, p ≈ 0.731, ∂L/∂w = (0.731 − 1) × 2 ≈ −0.538. A step with η = 0.1 raises w to about 0.554."
      }
     ]
    },
    {
     "type": "table",
     "title": "Keeping gradients healthy",
     "head": [
      "Problem",
      "Symptom",
      "Remedies"
     ],
     "rows": [
      [
       "Vanishing gradients",
       "Early layers barely learn; loss plateaus",
       "ReLU-family activations, careful initialisation (He or Xavier), residual connections, normalisation layers"
      ],
      [
       "Exploding gradients",
       "Loss jumps to NaN",
       "Lower learning rate, gradient clipping, normalisation, check inputs"
      ],
      [
       "Dead ReLUs",
       "Many units always output 0",
       "Lower learning rate, leaky ReLU variants, better initialisation"
      ],
      [
       "Internal scale drift",
       "Training is slow and sensitive to the learning rate",
       "Batch normalisation (vision) or layer normalisation (transformers)"
      ]
     ]
    },
    {
     "type": "framework",
     "title": "The regularisation toolbox",
     "items": [
      {
       "label": "R1",
       "title": "Weight decay",
       "text": "Penalise large weights (L2); AdamW applies it cleanly."
      },
      {
       "label": "R2",
       "title": "Dropout",
       "text": "Randomly zero a fraction of units during training, e.g. 20–50%; surviving activations are scaled by 1 ÷ keep probability."
      },
      {
       "label": "R3",
       "title": "Data augmentation",
       "text": "Create realistic variants: flips, crops, lighting changes for images; noise or time shifts for audio and sensors."
      },
      {
       "label": "R4",
       "title": "Early stopping",
       "text": "Keep the checkpoint with the best validation score and stop when it stops improving."
      },
      {
       "label": "R5",
       "title": "Transfer learning",
       "text": "Start from weights pre-trained on large data so that far less task data is needed."
      }
     ]
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Overfitting in accuracy curves (illustrative)",
     "labels": [
      "2",
      "4",
      "6",
      "8",
      "10",
      "12",
      "15"
     ],
     "unit": "%",
     "yLabel": "Accuracy",
     "series": [
      {
       "name": "Training",
       "values": [
        70,
        84,
        91,
        95,
        97,
        98,
        99
       ]
      },
      {
       "name": "Validation",
       "values": [
        68,
        80,
        88,
        86,
        85,
        84,
        83
       ]
      }
     ],
     "caption": "Illustrative numbers (x-axis: epoch). Validation accuracy peaks early while training accuracy keeps rising: keep the best checkpoint, then use augmentation, dropout, weight decay or a pre-trained start to close the gap."
    },
    {
     "type": "cli",
     "title": "A small neural network with early stopping",
     "device": "Python notebook",
     "lines": [
      "from sklearn.datasets import load_digits",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.preprocessing import StandardScaler",
      "from sklearn.pipeline import make_pipeline",
      "from sklearn.neural_network import MLPClassifier",
      "X, y = load_digits(return_X_y=True)",
      "X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)",
      "net = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(64,), early_stopping=True,",
      "                                                    max_iter=500, random_state=0)).fit(X_tr, y_tr)",
      "print(net[-1].n_iter_, round(net.score(X_te, y_te), 3))",
      "# output: 42 0.962"
     ],
     "note": "early_stopping holds back 10% of the training data internally and stops when its score stops improving, here after 42 epochs. Larger image and text models use dedicated deep learning frameworks, but the training ideas are the same."
    },
    {
     "type": "steps",
     "title": "A sensible first training run",
     "items": [
      {
       "title": "Baseline",
       "text": "Train a simple model first so you know what 'good' means."
      },
      {
       "title": "Overfit a small batch",
       "text": "Confirm the network can drive training loss near zero on a few examples."
      },
      {
       "title": "Standard recipe",
       "text": "AdamW, learning rate around 1e-3 (lower for fine-tuning), mini-batches of 32–256, ReLU or GELU activations."
      },
      {
       "title": "Regularise",
       "text": "Add augmentation, dropout or weight decay once the model overfits."
      },
      {
       "title": "Track",
       "text": "Log training and validation loss and metrics every epoch, plus learning rate and gradient norms."
      },
      {
       "title": "Select",
       "text": "Keep the best validation checkpoint; evaluate once on the test set."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Training large networks costs money, time and energy. Start small, use pre-trained models, train in mixed precision (16-bit formats where the hardware supports them), stop runs early when they are clearly worse, and record accelerator-hours and, where available, energy per experiment. A model that is 0.2% better but needs ten times the compute may not be worth it.",
     "title": "Compute and carbon are real costs"
    },
    {
     "type": "scenario",
     "situation": "A garment defect classifier trained on 3,000 images reaches 99% training accuracy by epoch 15, while validation accuracy peaks at 88% at epoch 6 and then declines. What is the best combination of next steps?",
     "options": [
      {
       "text": "Train for 50 more epochs to let validation recover",
       "feedback": "Validation is already declining; more epochs deepen overfitting.",
       "best": false
      },
      {
       "text": "Remove dropout to increase capacity",
       "feedback": "Removing regularisation increases overfitting.",
       "best": false
      },
      {
       "text": "Use the epoch-6 checkpoint, add image augmentation and consider starting from a pre-trained backbone",
       "feedback": "Correct. The model is overfitting a small dataset; early stopping, augmentation and transfer learning are the standard remedies.",
       "best": true
      },
      {
       "text": "Raise the learning rate tenfold",
       "feedback": "A higher learning rate does not address overfitting and may destabilise training.",
       "best": false
      }
     ],
     "title": "Validation loss rising"
    },
    {
     "type": "reflection",
     "prompt": "Recall a model whose training you watched. Which signs (loss curves, gradient norms, validation scores) told you it was going well or badly, and which of the techniques above would you try first next time?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Backpropagation",
       "def": "The algorithm that computes gradients of the loss for every weight by applying the chain rule backwards through the network."
      },
      {
       "term": "Vanishing gradient",
       "def": "Gradients shrinking towards zero as they pass back through many layers, so early layers learn slowly."
      },
      {
       "term": "Gradient clipping",
       "def": "Limiting the size of gradients during training to prevent unstable, exploding updates."
      },
      {
       "term": "Dropout",
       "def": "A regulariser that randomly disables a fraction of units during each training step."
      },
      {
       "term": "Batch normalisation",
       "def": "Normalising layer activations across a mini-batch to stabilise and speed up training."
      },
      {
       "term": "Data augmentation",
       "def": "Creating modified copies of training examples to improve robustness and reduce overfitting."
      },
      {
       "term": "Checkpoint",
       "def": "A saved copy of model weights at a point in training."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Backpropagation applies the chain rule to compute every gradient efficiently.",
      "Healthy gradients need good initialisation, ReLU-family activations, normalisation and residual connections.",
      "Regularise with weight decay, dropout, augmentation, early stopping and transfer learning.",
      "Start from a standard recipe (AdamW, sensible learning rate) and track curves every epoch.",
      "Record compute and energy; small gains may not justify large costs."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "For a sigmoid neuron with log loss, p = 0.2, y = 1 and x = 3. What is ∂L/∂w?",
       "options": [
        "2.4",
        "−2.4",
        "−0.8",
        "0.6"
       ],
       "answer": 1,
       "explain": "(p − y) × x = (0.2 − 1) × 3 = −2.4."
      },
      {
       "q": "With dropout keep probability 0.8, by what factor are surviving activations scaled during training?",
       "options": [
        "0.80",
        "0.20",
        "1.25",
        "5.00"
       ],
       "answer": 2,
       "explain": "1 ÷ 0.8 = 1.25 keeps the expected activation unchanged."
      },
      {
       "q": "Training loss suddenly becomes NaN. Which remedy is MOST relevant?",
       "options": [
        "Lower the learning rate and apply gradient clipping",
        "Add more layers",
        "Remove the validation set",
        "Increase dropout to 90% so fewer weights are updated at each step"
       ],
       "answer": 0,
       "explain": "NaN losses typically come from exploding updates."
      },
      {
       "q": "What do residual (skip) connections mainly help with?",
       "options": [
        "Reducing the dataset size",
        "Letting gradients flow through very deep networks",
        "Converting regression to classification",
        "Removing the need for activations"
       ],
       "answer": 1,
       "explain": "Skip paths give gradients a short route back to early layers."
      },
      {
       "q": "A model trained on 1,500 labelled X-rays overfits badly. Which approach usually helps most?",
       "options": [
        "Train a much larger network from random weights so it can learn every detail",
        "Remove augmentation to keep images realistic",
        "Use the test set for early stopping",
        "Fine-tune a network pre-trained on a large image dataset, with augmentation"
       ],
       "answer": 3,
       "explain": "Transfer learning plus augmentation reduces the data needed."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l3",
   "title": "Convolutional Neural Networks",
   "subtitle": "Learn visual features with filters that slide across images",
   "minutes": 24,
   "objectives": [
    "Explain convolution, filters, stride, padding and pooling",
    "Compute convolution output sizes and parameter counts",
    "Describe how CNNs build features from edges to objects",
    "Apply transfer learning and augmentation to small image datasets"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Images have structure: nearby pixels are related, and the same pattern (an edge, a stitch, a crack) can appear anywhere. A **convolutional neural network (CNN)** uses small filters that slide across the image, sharing the same weights at every position. That makes CNNs efficient and naturally good at finding patterns wherever they occur."
    },
    {
     "type": "formula",
     "title": "Convolution arithmetic",
     "items": [
      {
       "name": "Output size",
       "expr": "out = ⌊(n + 2p − k) ÷ s⌋ + 1",
       "meaning": "Input 32, kernel 3, padding 1, stride 1: (32 + 2 − 3) ÷ 1 + 1 = 32 ('same' size)."
      },
      {
       "name": "With stride 2",
       "expr": "(32 + 2 − 3) ÷ 2 + 1 = 16 (rounded down)",
       "meaning": "Stride 2 halves the spatial size."
      },
      {
       "name": "Max pooling 2 × 2",
       "expr": "out = n ÷ 2",
       "meaning": "Keeps the strongest response in each 2 × 2 block: 32 → 16."
      },
      {
       "name": "Conv layer parameters",
       "expr": "(k × k × C_in + 1) × C_out",
       "meaning": "3 × 3 filters on an RGB input with 64 filters: (27 + 1) × 64 = 1,792."
      },
      {
       "name": "Dense comparison",
       "expr": "A dense layer from a 32 × 32 × 3 image to 64 units",
       "meaning": "3,072 × 64 + 64 = 196,672 parameters: weight sharing makes convolution about 110 times cheaper here."
      }
     ]
    },
    {
     "type": "cli",
     "title": "A vertical-edge filter in NumPy",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "img = np.array([[0, 0, 9, 9]] * 4, dtype=float)   # dark left, bright right",
      "k = np.array([[-1, 1], [-1, 1]], dtype=float)     # responds to left-to-right brightening",
      "out = np.array([[(img[i:i+2, j:j+2] * k).sum() for j in range(3)] for i in range(3)])",
      "print(out.tolist())",
      "# output: [[0.0, 18.0, 0.0], [0.0, 18.0, 0.0], [0.0, 18.0, 0.0]]"
     ],
     "note": "The filter responds strongly only where brightness changes from left to right, marking the edge. A CNN learns thousands of such filters from data instead of having them designed by hand."
    },
    {
     "type": "layers",
     "title": "How a CNN builds understanding (top layer first)",
     "items": [
      {
       "label": "Classifier head",
       "parts": [
        "Dense or pooling layers",
        "Class probabilities: 'hole', 'stain', 'OK'"
       ]
      },
      {
       "label": "Deep layers",
       "parts": [
        "Object parts and whole patterns",
        "Large receptive field"
       ]
      },
      {
       "label": "Middle layers",
       "parts": [
        "Textures and motifs",
        "Combinations of edges"
       ]
      },
      {
       "label": "Early layers",
       "parts": [
        "Edges, colours, simple gradients",
        "Small receptive field"
       ]
      },
      {
       "label": "Input",
       "parts": [
        "Pixels: height × width × channels"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Training from scratch versus transfer learning",
     "columns": [
      {
       "title": "From scratch",
       "items": [
        "Random initial weights",
        "Needs tens of thousands to millions of images",
        "Long training, more compute",
        "Only for very different image types with huge data"
       ]
      },
      {
       "title": "Transfer learning",
       "items": [
        "Start from a network pre-trained on a large image collection",
        "Replace the head; fine-tune some or all layers",
        "Works with hundreds to a few thousand images",
        "The default for most business image tasks"
       ]
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Augment with transformations that preserve the label: flips, small rotations, crops, brightness changes.",
      "Do not augment in ways that change meaning (flipping text, or rotating images where orientation matters).",
      "Split by source (camera, factory line, hospital, patient) to avoid leakage between near-identical images.",
      "Check model attention with saliency maps to catch shortcuts such as watermarks or rulers.",
      "Collect hard examples from production and add them to the training set."
     ],
     "title": "Image data practice"
    },
    {
     "type": "sequence",
     "title": "A defect model on the factory line",
     "actors": [
      "Line camera",
      "Edge model",
      "Inspector",
      "Training data store"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "Image of the next fabric section"
      },
      {
       "from": 1,
       "to": 1,
       "label": "Score defect classes",
       "note": "on-device, no network needed"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Alert: 'hole', p = 0.91, with crop"
      },
      {
       "from": 2,
       "to": 1,
       "label": "Confirm or reject",
       "reply": true
      },
      {
       "from": 1,
       "to": 3,
       "label": "Store image and verdict",
       "note": "hard examples for retraining"
      }
     ],
     "caption": "The model assists the inspector rather than replacing them, and every confirmed or rejected alert becomes a new label. Rejected alerts are the most valuable examples for the next training run."
    },
    {
     "type": "case",
     "title": "Fabric defect detection on a factory line",
     "context": "A knitwear factory in Gazipur inspects fabric rolls by eye. Inspectors miss about 15% of defects late in shifts. The factory has a camera over the line and 2,400 labelled images (1,900 'OK', 500 with holes, stains or broken yarn), all from one machine, taken over two weeks.",
     "questions": [
      "How would you build the first model?",
      "What are the main risks in the data, and how would you reduce them?",
      "How should the model be used on the line?"
     ],
     "answer": "Fine-tune a pre-trained CNN with a new head for the defect classes (or a detection model if defect location matters), using augmentation that matches real variation (brightness, small shifts, slight blur), class weights for the rarer defect types, and a validation split by date or roll to avoid near-duplicate images. Risks: one machine and two weeks mean limited variation in lighting, fabric colour and yarn, so collect images from other machines, shifts and fabric types and check performance per fabric. Use the model to flag likely defects for inspectors rather than replace them, set the threshold for high recall, and feed confirmed misses and false alarms back into training."
    },
    {
     "type": "scenario",
     "situation": "A team randomly splits 10,000 frames extracted from 50 inspection videos into training and test sets. Test accuracy is 99.5%, but the model fails on new videos. What went wrong?",
     "options": [
      {
       "text": "Consecutive frames from the same video were in both sets; split by video instead",
       "feedback": "Correct. Neighbouring frames are almost identical, so the test set measured memorisation rather than generalisation to new footage.",
       "best": true
      },
      {
       "text": "99.5% shows the model is ready, and the new videos must be faulty",
       "feedback": "The gap points to a flawed split, not faulty production data.",
       "best": false
      },
      {
       "text": "Images should have been converted to grayscale",
       "feedback": "Colour handling does not explain near-perfect test scores on near-duplicate frames.",
       "best": false
      },
      {
       "text": "The model needed more convolution layers",
       "feedback": "Capacity was not the problem; the evaluation was.",
       "best": false
      }
     ],
     "title": "Leakage in an image split"
    },
    {
     "type": "reflection",
     "prompt": "Where could image models help in your organisation, for example in inspection, documents or medical imaging? How many labelled images exist, and how would you split them to avoid near-duplicates across sets?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Convolutional neural network",
       "def": "A neural network that uses learned filters slid across the input to detect local patterns."
      },
      {
       "term": "Filter (kernel)",
       "def": "A small matrix of weights convolved with the input to produce a feature map."
      },
      {
       "term": "Stride",
       "def": "The step size by which a filter moves across the input."
      },
      {
       "term": "Padding",
       "def": "Adding border values around the input so filters can cover the edges and control output size."
      },
      {
       "term": "Pooling",
       "def": "Downsampling a feature map, for example by taking the maximum in each small block."
      },
      {
       "term": "Receptive field",
       "def": "The region of the input image that influences a given unit in a network."
      },
      {
       "term": "Transfer learning",
       "def": "Reusing a model trained on one task as the starting point for another."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Convolutions share small filters across positions, making CNNs efficient for images.",
      "Output size = ⌊(n + 2p − k) ÷ s⌋ + 1; parameters = (k × k × C_in + 1) × C_out.",
      "Transfer learning from a pre-trained backbone is the default for business image tasks.",
      "Augment only in label-preserving ways, and split by source to avoid near-duplicate leakage.",
      "Check saliency maps for shortcuts and feed hard production examples back into training."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Input 28, kernel 5, padding 0, stride 1. What is the output size?",
       "options": [
        "24",
        "28",
        "23",
        "14"
       ],
       "answer": 0,
       "explain": "(28 − 5) ÷ 1 + 1 = 24."
      },
      {
       "q": "How many parameters does a conv layer with 32 filters of size 3 × 3 on a 16-channel input have?",
       "options": [
        "4,608",
        "512",
        "4,640",
        "9,248"
       ],
       "answer": 2,
       "explain": "(3 × 3 × 16 + 1) × 32 = 145 × 32 = 4,640."
      },
      {
       "q": "Why are CNNs efficient for images?",
       "options": [
        "They ignore most pixels and only look at the centre of each image",
        "They require no training",
        "The same filter weights are shared across all positions",
        "They use only one layer"
       ],
       "answer": 2,
       "explain": "Weight sharing cuts parameters and detects patterns anywhere."
      },
      {
       "q": "Which augmentation is inappropriate for classifying handwritten digits?",
       "options": [
        "Horizontal flips that turn some digits into different shapes",
        "Small rotations of a few degrees",
        "Slight changes in stroke thickness",
        "Small shifts in position"
       ],
       "answer": 0,
       "explain": "Flips can change meaning, for example making digits unreadable or ambiguous."
      },
      {
       "q": "A company has 900 labelled product photos. What is usually the best starting point?",
       "options": [
        "Train a large CNN from random weights",
        "Use k-means on raw pixels",
        "Use linear regression on pixel values",
        "Fine-tune a pre-trained CNN"
       ],
       "answer": 3,
       "explain": "Pre-trained features make small datasets workable."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l4",
   "title": "Sequence Models and Embeddings",
   "subtitle": "Model text, time series and other ordered data",
   "minutes": 24,
   "objectives": [
    "Explain tokens and embeddings as learned representations",
    "Describe how recurrent networks carry state through a sequence",
    "Explain why LSTMs and GRUs were introduced",
    "Frame time-series forecasting as a supervised learning problem"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Text, speech, sensor streams, transaction histories and clinical notes are **sequences**: order matters. Sequence models read one element at a time, or all at once with attention, and carry information from earlier positions to later ones. Before any of that, discrete items such as words must become vectors."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **token** is a unit of text, often a word piece: 'unhappiness' might become 'un', 'happi', 'ness'. An **embedding** maps each token (or user, product or merchant) to a dense vector of, say, 256 numbers. The vectors are learned so that items used in similar contexts end up close together.",
     "title": "Tokens and embeddings"
    },
    {
     "type": "formula",
     "title": "Recurrent networks",
     "items": [
      {
       "name": "Simple RNN step",
       "expr": "h_t = tanh(W_x x_t + W_h h_{t−1} + b)",
       "meaning": "The hidden state h_t summarises everything seen so far."
      },
      {
       "name": "Worked example",
       "expr": "W_x = 0.5, W_h = 0.8, b = 0, inputs 1, 0, 0",
       "meaning": "h₁ = tanh(0.5) ≈ 0.462; h₂ = tanh(0.8 × 0.462) ≈ 0.354; h₃ ≈ 0.276. The memory of the first input fades step by step."
      },
      {
       "name": "Why memory fades",
       "expr": "∂h_t/∂h_{t−k} involves k repeated factors of W_h and tanh′",
       "meaning": "Products of many factors below 1 vanish, so plain RNNs forget long-range information."
      },
      {
       "name": "Gated units (LSTM, GRU)",
       "expr": "Gates in (0, 1) decide what to keep, forget and output",
       "meaning": "A protected memory path lets information travel across hundreds of steps."
      }
     ]
    },
    {
     "type": "cli",
     "title": "A recurrent state fading over time",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "Wx, Wh, h = 0.5, 0.8, 0.0",
      "for x in [1.0, 0.0, 0.0]:",
      "    h = np.tanh(Wx * x + Wh * h)",
      "    print(round(float(h), 3))",
      "# output: 0.462",
      "# output: 0.354",
      "# output: 0.276"
     ],
     "note": "With no new input, the state shrinks at each step. Over long sequences this fading, and the matching vanishing gradients, is what gated units and attention were designed to overcome."
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "A simple RNN forgetting its first input",
     "labels": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8"
     ],
     "yLabel": "Hidden state h_t",
     "series": [
      {
       "name": "h_t",
       "values": [
        0.462,
        0.354,
        0.276,
        0.217,
        0.172,
        0.137,
        0.109,
        0.087
       ]
      }
     ],
     "caption": "Computed with W_x = 0.5, W_h = 0.8 and inputs 1, 0, 0, … (x-axis: time step). The memory of the first input shrinks at every step; gated units and attention were designed to keep it."
    },
    {
     "type": "table",
     "title": "Sequence model families",
     "head": [
      "Family",
      "How it reads",
      "Strengths",
      "Limits"
     ],
     "rows": [
      [
       "Bag of words / TF-IDF + linear model",
       "Ignores order",
       "Fast, strong baseline for classification",
       "Misses word order and context"
      ],
      [
       "RNN, LSTM, GRU",
       "One step at a time, carrying state",
       "Natural for streams; small models",
       "Hard to parallelise; long-range limits"
      ],
      [
       "1-D convolutions",
       "Sliding filters over time",
       "Fast; good for local patterns in signals",
       "Limited long-range context unless deep"
      ],
      [
       "Transformers",
       "All positions at once with attention",
       "Long context, highly parallel, scale well",
       "Compute grows with sequence length; data-hungry from scratch"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Forecasting as supervised learning",
     "items": [
      {
       "title": "Choose horizon and grain",
       "text": "For example, daily sales per store, predicted 7 days ahead."
      },
      {
       "title": "Build lag features",
       "text": "Sales 7, 14 and 28 days ago; rolling means and trends, computed only from the past."
      },
      {
       "title": "Add known-future features",
       "text": "Calendar, holidays such as Eid, planned promotions, weather forecasts."
      },
      {
       "title": "Train and validate in time order",
       "text": "Rolling-origin evaluation: train up to a date, forecast the next window, move forward."
      },
      {
       "title": "Compare with baselines",
       "text": "Seasonal naive and simple exponential smoothing must be beaten."
      }
     ]
    },
    {
     "type": "timeline",
     "title": "Rolling-origin evaluation for a 7-day forecast",
     "items": [
      {
       "when": "Fold 1",
       "label": "Train to 31 Jan",
       "text": "Forecast 1–7 Feb and score it."
      },
      {
       "when": "Fold 2",
       "label": "Train to 7 Feb",
       "text": "Forecast 8–14 Feb."
      },
      {
       "when": "Fold 3",
       "label": "Train to 14 Feb",
       "text": "Forecast 15–21 Feb."
      },
      {
       "when": "Fold 4",
       "label": "Train to 21 Feb",
       "text": "Forecast 22–28 Feb."
      }
     ],
     "caption": "The training origin moves forward and the model is always scored on the window just after it, exactly as it will be used. Average the fold errors and compare them with a seasonal naive baseline."
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A distribution company forecasting hourly feeder load found that gradient-boosted trees on lag, calendar and temperature features beat an LSTM trained on raw sequences, at a fraction of the cost. The LSTM helped only after the team added the same calendar and weather inputs. Engineering the right inputs mattered more than the architecture.",
     "title": "Electricity load in Dhaka"
    },
    {
     "type": "scenario",
     "situation": "A payments company has 400,000 merchants and wants a fraud model to capture which merchants behave similarly. One-hot encoding would create 400,000 sparse columns. What is a better representation?",
     "options": [
      {
       "text": "Use the merchant's name length as a feature",
       "feedback": "Name length is unrelated to behaviour.",
       "best": false
      },
      {
       "text": "Number the merchants 1 to 400,000 and use that number as a feature",
       "feedback": "Arbitrary IDs imply a meaningless order and carry no similarity information.",
       "best": false
      },
      {
       "text": "Learn merchant embeddings from transaction sequences or co-occurrence and use them as features",
       "feedback": "Correct. Dense embeddings place similar merchants close together in a compact vector that downstream models can use.",
       "best": true
      },
      {
       "text": "Drop merchant information entirely",
       "feedback": "Merchant behaviour is often strongly predictive of fraud.",
       "best": false
      }
     ],
     "title": "Representing merchants"
    },
    {
     "type": "template",
     "title": "Forecast feature register",
     "purpose": "List every input to a forecasting model with its availability at prediction time, so that no future information slips in.",
     "columns": [
      "Feature",
      "Type",
      "Computed from",
      "Known at forecast time?",
      "Notes"
     ],
     "example": [
      [
       "sales_lag_7",
       "Lag",
       "Actual sales 7 days before the target date",
       "Yes, if horizon ≤ 7 days",
       "Use lag ≥ horizon for longer forecasts"
      ],
      [
       "is_eid_week",
       "Known future",
       "Published holiday calendar",
       "Yes",
       "Check moon-sighting date changes"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "Which sequences does your organisation record (texts, logs, transactions, readings)? Would a model need long-range context, or would well-chosen lag features be enough?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Token",
       "def": "A unit of text, such as a word or word piece, processed by a language model."
      },
      {
       "term": "Tokeniser",
       "def": "The component that splits raw text into tokens and maps them to integer IDs."
      },
      {
       "term": "Recurrent neural network",
       "def": "A network that processes a sequence step by step while maintaining a hidden state."
      },
      {
       "term": "LSTM",
       "def": "Long short-term memory: a recurrent unit with gates that control what is remembered and forgotten."
      },
      {
       "term": "GRU",
       "def": "Gated recurrent unit: a simpler gated recurrent cell similar in purpose to an LSTM."
      },
      {
       "term": "Hidden state",
       "def": "The vector a recurrent network carries forward that summarises the sequence so far."
      },
      {
       "term": "Lag feature",
       "def": "A feature equal to the value of a series a fixed number of steps in the past."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Tokens and other discrete items become dense, learned embedding vectors.",
      "Plain RNNs forget long-range information; LSTMs, GRUs and attention address this.",
      "Forecasting works well as supervised learning with lag and known-future features.",
      "Validate forecasts in time order and always beat a seasonal naive baseline."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "With W_x = 1, W_h = 0.5, b = 0 and h₀ = 0, what is h₁ for input x₁ = 0? (tanh(0) = 0)",
       "options": [
        "0.5",
        "0",
        "1",
        "0.462"
       ],
       "answer": 1,
       "explain": "tanh(1 × 0 + 0.5 × 0) = tanh(0) = 0."
      },
      {
       "q": "Why were LSTMs and GRUs introduced?",
       "options": [
        "To preserve information and gradients over long sequences",
        "To process images faster",
        "To remove the need for large amounts of labelled training data",
        "To replace embeddings"
       ],
       "answer": 0,
       "explain": "Gates protect a memory path against vanishing gradients."
      },
      {
       "q": "What property do well-trained word embeddings have?",
       "options": [
        "Every word has a vector of all zeros except for a single one",
        "Vectors are sorted alphabetically",
        "Words used in similar contexts have similar vectors",
        "Vectors equal the word's length"
       ],
       "answer": 2,
       "explain": "Embeddings capture distributional similarity."
      },
      {
       "q": "For a daily forecast made on 1 March, which feature is NOT allowed?",
       "options": [
        "Sales on 22 February",
        "Actual sales on 3 March",
        "Whether 5 March is a public holiday",
        "The 7-day average up to 28 February"
       ],
       "answer": 1,
       "explain": "Future actuals are unknown at prediction time; known-future calendar facts are fine."
      },
      {
       "q": "Which evaluation suits a time-series forecasting model?",
       "options": [
        "Random k-fold over all days",
        "Training-set accuracy",
        "Leave-one-out cross-validation on shuffled days",
        "Rolling-origin evaluation in time order"
       ],
       "answer": 3,
       "explain": "Forecasts must be tested on periods after the training data."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l5",
   "title": "Transformers, Attention and Foundation Models",
   "subtitle": "The architecture behind modern language and vision models, and how to adapt, ground, align and shrink them",
   "minutes": 34,
   "objectives": [
    "Explain self-attention and compute it for a tiny example",
    "Describe encoder, decoder and encoder–decoder transformers and their uses",
    "Explain pre-training, fine-tuning and parameter-efficient adaptation",
    "Decide between a classic model, a fine-tuned transformer and a large foundation model"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The **transformer** replaced recurrence with **attention**: every position in a sequence looks at every other position and decides how much each matters. Because all positions are processed in parallel, transformers train efficiently on enormous datasets. Pre-trained transformers, often called **foundation models**, now underpin translation, search, chat assistants and many vision systems."
    },
    {
     "type": "formula",
     "title": "Scaled dot-product attention",
     "items": [
      {
       "name": "Queries, keys, values",
       "expr": "Q = XW_Q;  K = XW_K;  V = XW_V",
       "meaning": "Each token produces a query (what it looks for), a key (what it offers) and a value (what it passes on)."
      },
      {
       "name": "Attention",
       "expr": "Attention(Q, K, V) = softmax(QKᵀ ÷ √d_k) V",
       "meaning": "Scores compare each query with every key; softmax turns scores into weights; the output is a weighted mix of values."
      },
      {
       "name": "Worked example",
       "expr": "Tokens (1, 0), (0, 1), (1, 1) with Q = K = V = X, d_k = 2",
       "meaning": "Token 3's scores are (1, 1, 2) ÷ √2 ≈ (0.71, 0.71, 1.41); softmax gives (0.248, 0.248, 0.503); output ≈ (0.752, 0.752)."
      },
      {
       "name": "Why divide by √d_k",
       "expr": "Keeps dot products in a range where softmax is not saturated",
       "meaning": "Large scores would make attention almost one-hot and slow learning."
      },
      {
       "name": "Cost",
       "expr": "Attention compute and memory grow with n² for n tokens",
       "meaning": "Doubling the context length roughly quadruples attention cost."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Self-attention for three tokens",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "X = np.array([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])",
      "Q = K = V = X",
      "scores = Q @ K.T / np.sqrt(K.shape[1])",
      "weights = np.exp(scores) / np.exp(scores).sum(axis=1, keepdims=True)",
      "print(weights[2].round(3).tolist(), (weights @ V)[2].round(3).tolist())",
      "# output: [0.248, 0.248, 0.503] [0.752, 0.752]"
     ],
     "note": "Real transformers learn W_Q, W_K and W_V, run many attention heads in parallel, add position information and stack dozens of layers, but each head performs exactly this calculation."
    },
    {
     "type": "layers",
     "title": "Inside a transformer block (top first)",
     "items": [
      {
       "label": "Output",
       "parts": [
        "Next-token probabilities or task head"
       ]
      },
      {
       "label": "Feed-forward network",
       "parts": [
        "Two dense layers per position",
        "Residual connection and normalisation"
       ]
      },
      {
       "label": "Multi-head self-attention",
       "parts": [
        "Several heads attend to different relations",
        "Causal mask in decoders: no peeking at future tokens"
       ]
      },
      {
       "label": "Position information",
       "parts": [
        "Learned, fixed or rotary (relative) position encodings",
        "Gives the model word order"
       ]
      },
      {
       "label": "Token embeddings",
       "parts": [
        "Token IDs → dense vectors"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Transformer families",
     "head": [
      "Family",
      "Sees",
      "Typical use"
     ],
     "rows": [
      [
       "Encoder-only",
       "Whole input in both directions",
       "Classification, entity extraction, embeddings for search"
      ],
      [
       "Decoder-only",
       "Only earlier tokens (causal)",
       "Text generation, chat assistants, code; the design of most large language models"
      ],
      [
       "Encoder–decoder",
       "Encoder reads input; decoder generates output",
       "Translation, summarisation"
      ],
      [
       "Vision transformer",
       "Image patches as tokens",
       "Image classification and detection at scale"
      ],
      [
       "Mixture-of-experts (variant)",
       "Routes each token to a few expert feed-forward blocks",
       "Very large models with lower compute per token"
      ]
     ]
    },
    {
     "type": "text",
     "text": "Modern chat models are built in stages. Self-supervised **pre-training** on very large text, code and often image collections teaches next-token prediction. **Supervised fine-tuning** on instruction–response examples teaches the model to follow requests. **Preference optimisation** then learns from comparisons of better and worse answers, either through a reward model and reinforcement learning (RLHF) or with direct methods such as DPO. Evaluation and red-teaming come before release, and monitoring continues after it."
    },
    {
     "type": "compare",
     "title": "Ways to adapt a pre-trained model",
     "columns": [
      {
       "title": "Prompting",
       "items": [
        "No training; instructions and examples in the input",
        "Fast to try",
        "Limited control; cost per call"
       ]
      },
      {
       "title": "Fine-tuning",
       "items": [
        "Update all or most weights on task data",
        "Strong task performance",
        "Needs labelled data and compute"
       ]
      },
      {
       "title": "Parameter-efficient fine-tuning",
       "items": [
        "Train small added matrices (adapters, low-rank updates such as LoRA)",
        "Far less memory and storage",
        "Close to full fine-tuning quality on many tasks"
       ]
      }
     ]
    },
    {
     "type": "text",
     "text": "**Retrieval-augmented generation (RAG)** grounds answers in your own documents without changing the model. Documents are split into chunks, each chunk is embedded, and the vectors go into an index built for fast approximate nearest-neighbour search. At question time the closest chunks are retrieved and placed in the prompt. RAG suits knowledge that changes often or answers that must cite sources; fine-tuning suits a consistent format, style or task behaviour."
    },
    {
     "type": "sequence",
     "title": "Retrieval-augmented generation, step by step",
     "actors": [
      "User",
      "Application",
      "Embedding model",
      "Vector index",
      "Language model"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "Question about leave policy"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Embed the question"
      },
      {
       "from": 2,
       "to": 1,
       "label": "Query vector",
       "reply": true
      },
      {
       "from": 1,
       "to": 3,
       "label": "Find top-k nearest chunks",
       "note": "approximate nearest neighbours"
      },
      {
       "from": 3,
       "to": 1,
       "label": "5 passages with source IDs",
       "reply": true
      },
      {
       "from": 1,
       "to": 4,
       "label": "Instructions + passages + question"
      },
      {
       "from": 4,
       "to": 1,
       "label": "Answer citing the passages",
       "reply": true
      },
      {
       "from": 1,
       "to": 0,
       "label": "Answer with source links",
       "reply": true
      }
     ],
     "caption": "Two separate things can fail: retrieval can miss the right passage, and generation can ignore or misread it. Evaluate them separately, and treat retrieved text as untrusted input that may contain injected instructions."
    },
    {
     "type": "tree",
     "title": "Choosing how to adapt a foundation model",
     "root": {
      "label": "What is missing?",
      "children": [
       {
        "label": "Clear task instructions",
        "text": "Prompting with a few examples"
       },
       {
        "label": "Current or private knowledge",
        "text": "Retrieval-augmented generation"
       },
       {
        "label": "Consistent format or skill",
        "text": "Parameter-efficient fine-tuning (e.g. LoRA)"
       },
       {
        "label": "Preferred behaviour and tone",
        "text": "Preference optimisation (RLHF, DPO-style)"
       },
       {
        "label": "Lower cost or latency",
        "text": "Distillation, quantisation or a smaller model"
       }
      ]
     },
     "caption": "Try the cheapest branch that addresses the actual gap first, and measure each step against the same evaluation set. The branches combine: a quantised, LoRA-tuned model can still use retrieval."
    },
    {
     "type": "formula",
     "title": "Efficient adaptation and inference arithmetic",
     "items": [
      {
       "name": "LoRA update",
       "expr": "W′ = W + BA, with B (d × r) and A (r × k), r ≪ d, k",
       "meaning": "The pre-trained W stays frozen; only the small matrices B and A are trained."
      },
      {
       "name": "LoRA parameters",
       "expr": "d = k = 4,096, r = 8: r(d + k) = 65,536 versus d × k = 16,777,216",
       "meaning": "About 0.4% of the weights in that matrix are trained, so each task adapter is small to store and swap."
      },
      {
       "name": "Weight memory",
       "expr": "memory ≈ parameters × bytes per parameter",
       "meaning": "7 billion parameters: about 14 GB at 16-bit, 7 GB at 8-bit, 3.5 GB at 4-bit, before activations and the attention cache."
      },
      {
       "name": "Distillation loss",
       "expr": "L = α · CE(y, p_student) + (1 − α) · T² · KL(p_teacher,T ‖ p_student,T)",
       "meaning": "A small student learns from the labels and from the teacher's softened probabilities at temperature T."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Pre-trained models can produce fluent but wrong output, reflect biases in their training text and perform unevenly across languages such as Bangla. Public benchmark scores may be inflated by contamination and rarely match your task, so build a versioned evaluation set from real, recent cases. Score retrieval and generation separately; if another model acts as judge, check it against human ratings, because judges can favour longer answers, their own style or the first option shown. Rerun the set after every prompt, model or data change, check results by language and group, protect personal data in prompts and logs, and keep a simpler baseline for comparison.",
     "title": "Large models still need evaluation"
    },
    {
     "type": "scenario",
     "situation": "A bank receives 20,000 customer complaints a month in Bangla, English and mixed script. It has 6,000 labelled complaints across 12 categories. A TF-IDF linear model reaches macro-F1 0.71. What is the most sensible next step?",
     "options": [
      {
       "text": "Train a transformer from scratch on the 6,000 complaints",
       "feedback": "From-scratch training needs vastly more text; results would likely be worse than the baseline.",
       "best": false
      },
      {
       "text": "Replace the classifier with a large generative model and skip evaluation",
       "feedback": "Skipping evaluation is never acceptable, and a generative model may be costlier and less consistent than a fine-tuned encoder.",
       "best": false
      },
      {
       "text": "Keep the baseline because transformers do not support Bangla",
       "feedback": "Multilingual pre-trained models do cover Bangla, though quality should be checked.",
       "best": false
      },
      {
       "text": "Fine-tune a pre-trained multilingual encoder on the labelled data and compare it with the baseline on the same split",
       "feedback": "Correct. A multilingual encoder brings language understanding, including mixed script, and 6,000 labels are enough for fine-tuning. Comparing on the same split shows whether the gain is real.",
       "best": true
      }
     ],
     "title": "Classifying Bangla complaints"
    },
    {
     "type": "checklist",
     "title": "Before adopting a pre-trained or foundation model",
     "items": [
      "A simple baseline has been measured on the same evaluation set",
      "Performance is checked separately for each language, region and user group",
      "Licence terms allow the intended commercial use",
      "Personal and confidential data handling in prompts, logs and fine-tuning is approved",
      "Latency, cost and energy per request fit the budget at expected volume; a smaller, distilled or quantised model has been tried",
      "Failure modes such as fluent but wrong output have mitigations and human review",
      "User inputs and retrieved documents are treated as untrusted, with prompt-injection tests",
      "A rollback plan exists if quality drops after an update of the underlying model"
     ]
    },
    {
     "type": "reflection",
     "prompt": "For one text or image task in your organisation, would you use a classic model, a fine-tuned pre-trained model or a prompted large model? List the deciding factors: data, cost, latency, privacy and the need for explanations."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Transformer",
       "def": "A neural architecture built from self-attention and feed-forward layers that processes all sequence positions in parallel."
      },
      {
       "term": "Self-attention",
       "def": "A mechanism in which each position computes weighted combinations of all positions based on query–key similarity."
      },
      {
       "term": "Attention head",
       "def": "One of several parallel attention computations, each able to focus on different relationships."
      },
      {
       "term": "Positional encoding",
       "def": "Information added to token embeddings so that a transformer knows the order of tokens."
      },
      {
       "term": "Foundation model",
       "def": "A large model pre-trained on broad data that can be adapted to many downstream tasks."
      },
      {
       "term": "Fine-tuning",
       "def": "Continuing to train a pre-trained model on task-specific data."
      },
      {
       "term": "Parameter-efficient fine-tuning",
       "def": "Adapting a large model by training a small number of added or selected parameters."
      },
      {
       "term": "Retrieval-augmented generation (RAG)",
       "def": "Retrieving relevant passages from an index of your documents and adding them to the prompt so a language model answers from them."
      },
      {
       "term": "LoRA (low-rank adaptation)",
       "def": "A parameter-efficient fine-tuning method that freezes pre-trained weights and trains small low-rank matrices added to them."
      },
      {
       "term": "Preference optimisation",
       "def": "Tuning a model on comparisons of better and worse outputs, via a reward model and RL (RLHF) or directly (for example DPO)."
      },
      {
       "term": "Quantisation",
       "def": "Storing and computing with lower-precision numbers, such as 8-bit or 4-bit weights, to cut memory and speed up inference."
      },
      {
       "term": "Knowledge distillation",
       "def": "Training a smaller student model to imitate a larger teacher model's outputs."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Attention lets every token weigh every other token; cost grows with the square of the context length.",
      "Large language models are pre-trained, instruction-tuned and preference-optimised before release.",
      "Adapt with the cheapest method that fixes the real gap: prompting, RAG, LoRA-style fine-tuning or preference tuning.",
      "Distillation and quantisation cut cost and latency; measure the quality they give up.",
      "Evaluate on private, versioned, task-specific sets, separately for retrieval and generation, and by language and group."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In scaled dot-product attention, why are scores divided by √d_k?",
       "options": [
        "To make the weights sum to √d_k",
        "To remove the need for values",
        "To reverse the token order",
        "To keep scores from growing so large that softmax saturates"
       ],
       "answer": 3,
       "explain": "Large dot products push softmax towards one-hot outputs with tiny gradients."
      },
      {
       "q": "Context length doubles from 4,000 to 8,000 tokens. Roughly how does self-attention cost change?",
       "options": [
        "It stays roughly the same",
        "It roughly quadruples",
        "It doubles",
        "It halves"
       ],
       "answer": 1,
       "explain": "Attention cost scales with n²."
      },
      {
       "q": "Which family is typically used for generating text one token at a time?",
       "options": [
        "Encoder-only",
        "Convolutional",
        "Decoder-only",
        "k-means"
       ],
       "answer": 2,
       "explain": "Decoders use causal masking to predict the next token."
      },
      {
       "q": "Attention weights for a token are (0.5, 0.5) over values (2, 4) and (6, 0). What is the output?",
       "options": [
        "(4, 2)",
        "(8, 4)",
        "(2, 4)",
        "(3, 3)"
       ],
       "answer": 0,
       "explain": "0.5 × (2, 4) + 0.5 × (6, 0) = (1 + 3, 2 + 0) = (4, 2)."
      },
      {
       "q": "What is the main advantage of parameter-efficient fine-tuning?",
       "options": [
        "It guarantees better accuracy than full fine-tuning on every downstream task",
        "It adapts a large model while training and storing far fewer parameters",
        "It requires no labelled data at all",
        "It removes the need for evaluation"
       ],
       "answer": 1,
       "explain": "Small trainable additions save memory and storage with near full quality."
      },
      {
       "q": "A team moves a 7-billion-parameter model from 16-bit to 4-bit weights. Roughly how much memory do the weights alone now need?",
       "options": [
        "About 14 GB",
        "About 3.5 GB",
        "About 28 GB",
        "About 0.9 GB"
       ],
       "answer": 1,
       "explain": "Weight memory is roughly parameters × bytes per parameter: 7 billion × 0.5 bytes ≈ 3.5 GB. At 16-bit it was about 14 GB. Activations and the attention cache need extra memory on top."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m8",
 "order": 8,
 "code": "Deploy",
 "title": "MLOps, Monitoring and Responsible ML",
 "subtitle": "Ship models safely, keep them healthy in production and govern them responsibly",
 "outcomes": [
  "Choose serving patterns and release models with shadow, canary and A/B strategies",
  "Monitor data, predictions and performance and respond to drift",
  "Build reproducible, tested and automated ML pipelines",
  "Measure and mitigate unfairness and apply privacy, security and governance controls"
 ],
 "lessons": [
  {
   "id": "m8-l1",
   "title": "From Notebook to Production",
   "subtitle": "Package, serve and release models safely",
   "minutes": 26,
   "objectives": [
    "Choose between batch, online, streaming and edge serving",
    "Package a full preprocessing-and-model pipeline for reliable reuse",
    "Release models with shadow, canary, blue–green and A/B strategies",
    "Size serving capacity and experiments with simple arithmetic"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A model in a notebook creates no value. Value starts when predictions reach the people and systems that act on them, reliably, every day. Deployment turns a trained pipeline into a **service** with owners, interfaces, performance targets and a safe way to release new versions."
    },
    {
     "type": "table",
     "title": "Serving patterns",
     "head": [
      "Pattern",
      "How it works",
      "Typical latency",
      "Example"
     ],
     "rows": [
      [
       "Batch",
       "Score many records on a schedule and store results",
       "Minutes to hours",
       "Nightly churn scores for the retention team"
      ],
      [
       "Online (request–response)",
       "An API scores one request on demand",
       "Milliseconds",
       "Fraud check during a wallet transfer"
      ],
      [
       "Streaming",
       "Score events continuously from a message stream",
       "Seconds",
       "Sensor anomaly alerts in a power plant"
      ],
      [
       "Edge / on-device",
       "Model runs on a phone, camera or machine",
       "Milliseconds, works offline",
       "Defect detection on a factory-line camera"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Save and reload the whole pipeline, not just the model",
     "device": "Python notebook",
     "lines": [
      "import joblib",
      "from sklearn.datasets import make_classification",
      "from sklearn.pipeline import make_pipeline",
      "from sklearn.preprocessing import StandardScaler",
      "from sklearn.linear_model import LogisticRegression",
      "X, y = make_classification(n_samples=500, random_state=0)",
      "pipe = make_pipeline(StandardScaler(), LogisticRegression()).fit(X, y)",
      "joblib.dump(pipe, 'churn-model-v1.joblib')",
      "served = joblib.load('churn-model-v1.joblib')",
      "print(bool((served.predict_proba(X[:5]) == pipe.predict_proba(X[:5])).all()), round(float(served.predict_proba(X[:1])[0, 1]), 3))",
      "# output: True 0.693"
     ],
     "note": "Saving the pipeline keeps scaling and the model together, so production applies exactly the training transformations. Record the library versions too: serialised objects should be loaded with the same versions that created them."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If features are computed one way in the training notebook (SQL over a warehouse) and another way in the live service (application code), small differences in rounding, time zones or missing-value handling silently degrade the model. Share one feature definition between training and serving, for example through a feature store or a shared library, and test that both paths give identical values.",
     "title": "Training–serving skew"
    },
    {
     "type": "sequence",
     "title": "Online scoring of a wallet transfer",
     "actors": [
      "Wallet app",
      "Scoring API",
      "Online feature store",
      "Model service",
      "Prediction log"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "Transfer request (customer, amount)"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Get features for customer ID"
      },
      {
       "from": 2,
       "to": 1,
       "label": "30-day counts, device age, …",
       "reply": true
      },
      {
       "from": 1,
       "to": 3,
       "label": "Score the feature vector"
      },
      {
       "from": 3,
       "to": 1,
       "label": "p = 0.04, model v12",
       "reply": true
      },
      {
       "from": 1,
       "to": 4,
       "label": "Log inputs, score, version, decision"
      },
      {
       "from": 1,
       "to": 0,
       "label": "Approve (within the 150 ms budget)",
       "reply": true
      }
     ],
     "caption": "The online store serves the same feature definitions used to build training data, which prevents skew. Logging inputs, score and model version with each decision makes any single outcome explainable later."
    },
    {
     "type": "compare",
     "title": "Release strategies",
     "columns": [
      {
       "title": "Shadow",
       "items": [
        "New model scores live traffic, results not used",
        "Zero customer risk",
        "Compares predictions and latency with the current model"
       ]
      },
      {
       "title": "Canary and blue–green",
       "items": [
        "Canary: send a small share of traffic (e.g. 5%) first, then increase",
        "Blue–green: switch all traffic between two environments, instant rollback",
        "Limits the blast radius of a bad release"
       ]
      },
      {
       "title": "A/B test",
       "items": [
        "Random split of users between models",
        "Measures causal effect on business metrics",
        "Needs enough traffic and time for statistical power"
       ]
      }
     ]
    },
    {
     "type": "topology",
     "title": "A canary release with automatic rollback",
     "nodes": [
      {
       "id": "reg",
       "kind": "storage",
       "label": "Model registry",
       "sub": "v12 (current), v13 (candidate)",
       "x": 3.5,
       "y": 0
      },
      {
       "id": "v12",
       "kind": "model",
       "label": "Model v12",
       "sub": "current, 95% of traffic",
       "x": 1.5,
       "y": 1.5
      },
      {
       "id": "v13",
       "kind": "model",
       "label": "Model v13",
       "sub": "canary, 5% of traffic",
       "x": 5.5,
       "y": 1.5
      },
      {
       "id": "gw",
       "kind": "lb",
       "label": "Traffic router",
       "sub": "weighted split",
       "x": 3.5,
       "y": 3.5
      },
      {
       "id": "mon",
       "kind": "monitor",
       "label": "Monitoring",
       "sub": "errors, p99, block rate",
       "x": 7,
       "y": 3.5
      },
      {
       "id": "cl",
       "kind": "user",
       "label": "Customers",
       "sub": "live requests",
       "x": 3.5,
       "y": 5.5
      }
     ],
     "links": [
      {
       "a": "cl",
       "b": "gw",
       "label": "requests"
      },
      {
       "a": "gw",
       "b": "v12",
       "label": "95%"
      },
      {
       "a": "gw",
       "b": "v13",
       "label": "5%"
      },
      {
       "a": "reg",
       "b": "v12",
       "label": "deploy",
       "style": "dashed"
      },
      {
       "a": "reg",
       "b": "v13",
       "label": "deploy",
       "style": "dashed"
      },
      {
       "a": "v13",
       "b": "mon",
       "label": "metrics",
       "style": "dashed"
      },
      {
       "a": "mon",
       "b": "gw",
       "label": "rollback",
       "style": "bold"
      }
     ],
     "caption": "Only 5% of customers meet the new version at first. If errors, latency or block rate cross agreed thresholds, monitoring tells the router to send all traffic back to v12 within minutes."
    },
    {
     "type": "formula",
     "title": "Serving and experiment arithmetic",
     "items": [
      {
       "name": "Little's law (concurrency)",
       "expr": "concurrent requests = arrival rate × latency",
       "meaning": "200 requests/s × 0.05 s = 10 requests in flight on average; plan for peaks with headroom."
      },
      {
       "name": "Latency percentiles",
       "expr": "p95 = latency below which 95% of requests complete",
       "meaning": "Report p95 and p99, not just the average; slow tails hurt users and upstream timeouts."
      },
      {
       "name": "A/B sample size (rule of thumb)",
       "expr": "n per arm ≈ 16 × p(1 − p) ÷ δ²",
       "meaning": "About 80% power at 5% significance. Base conversion 10%, detecting a 1-point lift: 16 × 0.09 ÷ 0.0001 = 14,400 users per arm."
      }
     ]
    },
    {
     "type": "steps",
     "title": "A production-readiness path",
     "items": [
      {
       "title": "Package",
       "text": "Version the pipeline, dependencies and a model card."
      },
      {
       "title": "Interface",
       "text": "Define the input schema, output format, error handling and fallbacks (for example a rule-based score if the model is unavailable)."
      },
      {
       "title": "Test",
       "text": "Unit tests for features, schema validation, reproducibility test, load test against the latency target."
      },
      {
       "title": "Shadow",
       "text": "Run on live traffic without acting; compare with offline expectations."
      },
      {
       "title": "Canary",
       "text": "Expose to a small share of traffic with automatic rollback triggers."
      },
      {
       "title": "Full release and review",
       "text": "Roll out fully, then review business impact after an agreed period."
      }
     ]
    },
    {
     "type": "template",
     "title": "Release plan",
     "purpose": "Agree how a model version moves from registry to full production, with clear go/no-go criteria and rollback triggers.",
     "columns": [
      "Stage",
      "Traffic share",
      "Duration",
      "Go criteria",
      "Rollback trigger",
      "Approver"
     ],
     "example": [
      [
       "Shadow",
       "100% scored, 0% acted on",
       "7 days",
       "Score correlation with current model ≥ 0.9; p99 < 150 ms",
       "Error rate > 0.5%",
       "ML lead"
      ],
      [
       "Canary",
       "5%",
       "3 days",
       "Block rate within ±10% of control; no complaint spike",
       "Block rate +25% or p99 > 200 ms",
       "Fraud operations head"
      ]
     ],
     "rows": 5
    },
    {
     "type": "scenario",
     "situation": "A mobile financial service has a new fraud model with better offline results. Transfers must be checked within 150 ms, and a bad model could block thousands of genuine customers within minutes. What is the safest release plan?",
     "options": [
      {
       "text": "Shadow it on live traffic, then canary to a small share with automatic rollback on error, latency or block-rate thresholds",
       "feedback": "Correct. Shadow mode exposes latency and prediction differences without risk; a monitored canary limits harm if something is wrong.",
       "best": true
      },
      {
       "text": "Run a six-month A/B test before any deployment",
       "feedback": "A long A/B test can follow, but the immediate need is safe staged exposure with rollback.",
       "best": false
      },
      {
       "text": "Switch all traffic at midnight when volumes are low",
       "feedback": "A full switch without staged checks risks blocking many customers before anyone notices.",
       "best": false
      },
      {
       "text": "Release to all users and monitor complaints on social media",
       "feedback": "Complaints are a slow, damaging signal; problems should be caught by metrics first.",
       "best": false
      }
     ],
     "title": "Releasing a new fraud model"
    },
    {
     "type": "reflection",
     "prompt": "For a model you know, which serving pattern fits, what latency is acceptable, and what should happen when the model service is unavailable?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Batch inference",
       "def": "Scoring many records together on a schedule and storing the predictions."
      },
      {
       "term": "Online inference",
       "def": "Scoring individual requests on demand, usually through an API with tight latency limits."
      },
      {
       "term": "Training–serving skew",
       "def": "Differences between how features or preprocessing work in training and in production."
      },
      {
       "term": "Feature store",
       "def": "A system that stores and serves consistent feature definitions and values for training and inference."
      },
      {
       "term": "Rollback",
       "def": "Returning production to a previous known-good model version when a release causes problems."
      },
      {
       "term": "Canary release",
       "def": "Exposing a new version to a small share of traffic before rolling it out widely."
      },
      {
       "term": "Blue–green deployment",
       "def": "Running two production environments and switching traffic between them for instant rollback."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Pick the serving pattern from latency needs: batch, online, streaming or edge.",
      "Serialise and version the whole pipeline, and share feature definitions between training and serving.",
      "Release in stages: shadow, then canary with automatic rollback, then A/B tests for business impact.",
      "Plan capacity with arrival rate × latency and report p95/p99 latency, not averages."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A service receives 50 requests per second with an average latency of 0.2 s. How many requests are in flight on average?",
       "options": [
        "10",
        "250",
        "0.25",
        "4"
       ],
       "answer": 0,
       "explain": "50 × 0.2 = 10 by Little's law."
      },
      {
       "q": "Base conversion is 20% and you want to detect a 2-point change. Using n ≈ 16p(1 − p) ÷ δ², roughly how many users per arm?",
       "options": [
        "640",
        "1,600",
        "6,400",
        "16,000"
       ],
       "answer": 2,
       "explain": "16 × 0.16 ÷ 0.0004 = 6,400."
      },
      {
       "q": "Why serialise the full pipeline instead of the model alone?",
       "options": [
        "Pipelines are smaller files",
        "So that production applies exactly the same preprocessing as training",
        "Models cannot be saved on their own without the preprocessing steps attached",
        "It removes the need for testing"
       ],
       "answer": 1,
       "explain": "Separating them invites training–serving skew."
      },
      {
       "q": "Which release exposes a model to live inputs with no effect on customers?",
       "options": [
        "Canary release",
        "Blue–green switch",
        "A/B test",
        "Shadow deployment"
       ],
       "answer": 3,
       "explain": "In shadow mode outputs are logged but not acted on."
      },
      {
       "q": "Nightly scores for a call-centre's next-day call list are best served by…",
       "options": [
        "Online inference",
        "Edge inference",
        "Streaming inference",
        "Batch inference"
       ],
       "answer": 3,
       "explain": "There is no need for real-time scoring; batch is simpler and cheaper."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l2",
   "title": "Monitoring and Drift",
   "subtitle": "Know when a model is going wrong before the business feels it",
   "minutes": 26,
   "objectives": [
    "List what to monitor across data, predictions, performance and business outcomes",
    "Distinguish covariate drift, label drift and concept drift",
    "Compute and interpret the population stability index",
    "Monitor when labels arrive late and decide when to retrain"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Models are trained on the past but used in the future, and the world keeps changing: customer behaviour shifts after a festival, a competitor launches a new product, a sensor is recalibrated, a pandemic rewrites every pattern. **Monitoring** watches the model in production and raises the alarm when its inputs, outputs or results move."
    },
    {
     "type": "layers",
     "title": "What to monitor (top layer first)",
     "items": [
      {
       "label": "Business outcomes",
       "parts": [
        "Fraud losses, retention, revenue, patient outcomes",
        "The reason the model exists"
       ]
      },
      {
       "label": "Model performance",
       "parts": [
        "Precision, recall, MAE when labels arrive",
        "By segment, not just overall"
       ]
      },
      {
       "label": "Prediction behaviour",
       "parts": [
        "Score distribution, share of positive decisions",
        "Sudden shifts are early warnings"
       ]
      },
      {
       "label": "Input data",
       "parts": [
        "Missing values, schema changes, out-of-range values",
        "Feature distribution drift"
       ]
      },
      {
       "label": "System health",
       "parts": [
        "Latency p95/p99, error rates, throughput",
        "Resource usage and cost"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Kinds of drift",
     "head": [
      "Drift",
      "What changes",
      "Example",
      "Detectable without labels?"
     ],
     "rows": [
      [
       "Covariate (data) drift",
       "Distribution of inputs P(x)",
       "More young users join after a campus campaign",
       "Yes, compare feature distributions"
      ],
      [
       "Label (prior) drift",
       "Share of each outcome P(y)",
       "Fraud rate doubles during a festival season",
       "Partly, through prediction distribution"
      ],
      [
       "Concept drift",
       "Relationship between inputs and outcome P(y | x)",
       "Fraudsters change tactics, so old signals stop working",
       "Usually only once labels arrive"
      ],
      [
       "Upstream data change",
       "Meaning or format of a field",
       "Amounts switched from taka to paisa in one system",
       "Yes, with data validation rules"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Population stability index (PSI)",
     "items": [
      {
       "name": "Definition",
       "expr": "PSI = Σ_bins (aᵢ − eᵢ) × ln(aᵢ ÷ eᵢ)",
       "meaning": "eᵢ = share of reference (training) data in bin i; aᵢ = share of current data in bin i."
      },
      {
       "name": "Worked example",
       "expr": "e = (0.25, 0.25, 0.25, 0.25); a = (0.10, 0.20, 0.30, 0.40)",
       "meaning": "0.137 + 0.011 + 0.009 + 0.071 ≈ 0.228."
      },
      {
       "name": "Common reading",
       "expr": "< 0.1 stable; 0.1–0.25 moderate shift; > 0.25 significant shift",
       "meaning": "0.228 is a moderate shift close to the action threshold: investigate."
      },
      {
       "name": "Practical notes",
       "expr": "Use reference-data deciles as bins; add a small constant to empty bins",
       "meaning": "Zero shares make the logarithm undefined."
      }
     ]
    },
    {
     "type": "chart",
     "kind": "line",
     "title": "Weekly PSI for the 'transaction amount' feature (illustrative)",
     "labels": [
      "W1",
      "W2",
      "W3",
      "W4",
      "W5",
      "W6",
      "W7",
      "W8",
      "W9",
      "W10"
     ],
     "yLabel": "PSI",
     "series": [
      {
       "name": "PSI",
       "values": [
        0.03,
        0.04,
        0.05,
        0.06,
        0.09,
        0.12,
        0.16,
        0.21,
        0.27,
        0.31
       ]
      },
      {
       "name": "Action threshold",
       "values": [
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25
       ]
      },
      {
       "name": "Watch threshold",
       "values": [
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1
       ]
      }
     ],
     "caption": "Illustrative numbers (x-axis: week). A slow climb through the watch zone gives weeks of warning before the action threshold; a sudden jump in a single week more often signals an upstream data change."
    },
    {
     "type": "cli",
     "title": "Computing PSI for a shifted feature",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "rng = np.random.default_rng(0)",
      "ref = rng.normal(50, 10, 5000)      # e.g. customer age at training time",
      "cur = rng.normal(55, 10, 5000)      # this month's traffic",
      "edges = np.quantile(ref, np.linspace(0, 1, 11)); edges[0], edges[-1] = -np.inf, np.inf",
      "e = np.histogram(ref, edges)[0] / len(ref)",
      "a = np.histogram(cur, edges)[0] / len(cur)",
      "print(round(float(np.sum((a - e) * np.log(a / e))), 3))",
      "# output: 0.266"
     ],
     "note": "A shift of half a standard deviation in the mean gives a PSI of about 0.27, above the usual 0.25 action threshold. PSI flags change; whether the change hurts performance still needs investigation."
    },
    {
     "type": "compare",
     "title": "When labels arrive late",
     "columns": [
      {
       "title": "Leading indicators (now)",
       "items": [
        "Input drift and data quality",
        "Prediction distribution and decision rates",
        "Proxy outcomes such as early repayment signals",
        "Feedback from operations staff"
       ]
      },
      {
       "title": "Lagging indicators (later)",
       "items": [
        "True performance once outcomes are known",
        "Loan default after 6–12 months",
        "Churn after 30 days",
        "Confirmed fraud after investigation"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Decide in advance when to retrain: on a schedule (monthly), on a trigger (PSI above 0.25 on key features, or recall below an agreed floor), or both. Always validate a retrained model against the current one on recent data before promoting it; retraining on corrupted data can make things worse.",
     "title": "Retraining policy"
    },
    {
     "type": "sequence",
     "title": "From drift alert to a safely promoted model",
     "actors": [
      "Monitor",
      "Model owner",
      "Training pipeline",
      "Model registry",
      "Serving"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "Alert: PSI 0.27 on 'amount', recall dip"
      },
      {
       "from": 1,
       "to": 1,
       "label": "Root cause: data bug or real shift?",
       "note": "fix bugs upstream, do not retrain"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Trigger retrain on a recent window"
      },
      {
       "from": 2,
       "to": 3,
       "label": "Register candidate v13 with metrics"
      },
      {
       "from": 3,
       "to": 1,
       "label": "Quality gates passed versus v12",
       "reply": true
      },
      {
       "from": 1,
       "to": 4,
       "label": "Promote via shadow, then canary"
      },
      {
       "from": 4,
       "to": 0,
       "label": "Metrics for the new version",
       "reply": true
      }
     ],
     "caption": "A trigger starts an investigation, not an automatic swap. Retraining is used only for genuine shifts, and the new model must beat the current one on recent data before it is staged."
    },
    {
     "type": "scenario",
     "situation": "On Monday the average fraud score jumps from 0.03 to 0.11 and alerts triple. No major fraud event is known. The 'transaction amount' feature's distribution has also shifted sharply. What should the team check FIRST?",
     "options": [
      {
       "text": "Lower the threshold to reduce alerts",
       "feedback": "Adjusting the threshold hides the symptom without finding the cause.",
       "best": false
      },
      {
       "text": "Whether an upstream change altered how the amount field is recorded, such as units or currency",
       "feedback": "Correct. A sharp, simultaneous shift in one feature and the scores usually points to a pipeline or data change rather than real-world behaviour.",
       "best": true
      },
      {
       "text": "Retrain the model immediately on this week's data",
       "feedback": "Retraining on broken data would bake the error into the model.",
       "best": false
      },
      {
       "text": "Assume a new fraud wave and block high-value transfers",
       "feedback": "Acting on an unverified assumption could harm many genuine customers.",
       "best": false
      }
     ],
     "title": "A sudden score shift"
    },
    {
     "type": "template",
     "title": "Model monitoring plan",
     "purpose": "Define what is watched, the thresholds that trigger action and who responds, before go-live.",
     "columns": [
      "Signal",
      "Metric",
      "Threshold",
      "Check frequency",
      "Owner",
      "Action"
     ],
     "example": [
      [
       "Input drift",
       "PSI on top 10 features",
       "> 0.25 on any feature",
       "Daily",
       "ML engineer",
       "Investigate source; consider retrain"
      ],
      [
       "Performance",
       "Recall on confirmed fraud",
       "< 0.70 over 2 weeks",
       "Weekly",
       "Fraud analytics lead",
       "Root-cause review; retrain or roll back"
      ]
     ],
     "rows": 6
    },
    {
     "type": "reflection",
     "prompt": "For a deployed or planned model, which signal would warn you first that something had gone wrong, and how many days or months would pass before true labels confirmed it?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Model monitoring",
       "def": "Ongoing measurement of a deployed model's inputs, outputs, performance and system health."
      },
      {
       "term": "Data drift",
       "def": "A change in the distribution of model inputs compared with the training data."
      },
      {
       "term": "Concept drift",
       "def": "A change in the relationship between inputs and the target, so the learned mapping becomes outdated."
      },
      {
       "term": "Label drift",
       "def": "A change in the overall frequency of target classes."
      },
      {
       "term": "Population stability index",
       "def": "A measure of how much a variable's distribution has shifted between two samples."
      },
      {
       "term": "Delayed labels",
       "def": "Outcomes that become known only some time after a prediction is made."
      },
      {
       "term": "Retraining trigger",
       "def": "A predefined condition, such as drift or performance decline, that starts model retraining."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Monitor in layers: system health, input data, predictions, performance and business outcomes.",
      "Covariate, label and concept drift differ; only some are visible before labels arrive.",
      "PSI flags distribution change; investigate the cause before retraining.",
      "Set retraining triggers and owners in advance, and validate every retrained model before promotion.",
      "Track performance by segment, since averages hide local failures."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Reference shares are (0.5, 0.5) and current shares are (0.6, 0.4). What is the PSI? (ln 1.2 ≈ 0.182, ln 0.8 ≈ −0.223)",
       "options": [
        "About 0.2",
        "About 0.04",
        "About 0.4",
        "Exactly 0.0"
       ],
       "answer": 1,
       "explain": "(0.1 × 0.182) + (−0.1 × −0.223) ≈ 0.018 + 0.022 = 0.040."
      },
      {
       "q": "Fraudsters change tactics so that previously strong signals stop predicting fraud. Which drift is this?",
       "options": [
        "Covariate drift",
        "Label drift",
        "Concept drift",
        "System drift"
       ],
       "answer": 2,
       "explain": "The relationship between features and outcome has changed."
      },
      {
       "q": "Which signal is available immediately for a loan model whose defaults appear after a year?",
       "options": [
        "Input and score distribution drift",
        "Default rate of this month's loans",
        "Final recall on this month's applicants",
        "Twelve-month profit"
       ],
       "answer": 0,
       "explain": "Leading indicators come from inputs and predictions."
      },
      {
       "q": "Why validate a retrained model before promoting it?",
       "options": [
        "Retrained models are always identical to the old model",
        "Retraining on recent data can make a model worse, for example if that data is corrupted",
        "Validation is only needed for the first version, since later versions reuse its settings",
        "Promotion happens automatically anyway"
       ],
       "answer": 1,
       "explain": "New is not automatically better."
      },
      {
       "q": "Why monitor performance by segment rather than overall?",
       "options": [
        "Segments always have more data than the whole",
        "Overall metrics cannot be computed",
        "Segments remove the need for labels",
        "A decline in one group can be hidden by stable overall averages"
       ],
       "answer": 3,
       "explain": "Averages mask localised failures."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l3",
   "title": "MLOps: Versioning, Pipelines and Automation",
   "subtitle": "Make the whole ML life cycle repeatable, testable and auditable",
   "minutes": 26,
   "objectives": [
    "Describe the MLOps life cycle and its main components",
    "Version data, code, models and configurations together",
    "Test ML systems at the data, model and behaviour levels",
    "Plan continuous training and deployment at a suitable maturity level"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**MLOps** applies the discipline of software engineering and operations to machine learning. The goal is simple to state: any model in production can be traced to exactly the data, code and settings that produced it; it can be rebuilt automatically; it is tested before release; and it can be rolled back in minutes."
    },
    {
     "type": "cycle",
     "title": "The MLOps life cycle",
     "center": "MLOps",
     "items": [
      {
       "label": "Data",
       "text": "Ingest, validate, version"
      },
      {
       "label": "Experiment",
       "text": "Track runs, metrics, artefacts"
      },
      {
       "label": "Train pipeline",
       "text": "Automated, reproducible"
      },
      {
       "label": "Registry",
       "text": "Approve and stage models"
      },
      {
       "label": "Deploy",
       "text": "CI/CD with staged release"
      },
      {
       "label": "Monitor",
       "text": "Drift, performance, cost"
      },
      {
       "label": "Retrain",
       "text": "Scheduled or triggered"
      }
     ],
     "caption": "Retraining feeds straight back into data and experiments, so the life cycle is a loop. Automation is valuable exactly where the loop turns often."
    },
    {
     "type": "layers",
     "title": "An MLOps platform (top layer first)",
     "items": [
      {
       "label": "Governance",
       "parts": [
        "Model cards, approvals, audit logs",
        "Access control"
       ]
      },
      {
       "label": "Serving and monitoring",
       "parts": [
        "APIs, batch jobs, dashboards, alerts"
       ]
      },
      {
       "label": "Model registry",
       "parts": [
        "Versions, stages (staging, production), lineage"
       ]
      },
      {
       "label": "Pipelines and orchestration",
       "parts": [
        "Training, evaluation and deployment workflows",
        "Schedules and triggers"
       ]
      },
      {
       "label": "Experiment tracking",
       "parts": [
        "Parameters, metrics, artefacts per run"
       ]
      },
      {
       "label": "Data and feature management",
       "parts": [
        "Versioned datasets, feature store, validation rules"
       ]
      }
     ]
    },
    {
     "type": "topology",
     "title": "Training and serving around a feature store and registry",
     "nodes": [
      {
       "id": "src",
       "kind": "db",
       "label": "Source systems",
       "sub": "transactions, CRM",
       "x": 0,
       "y": 0.5
      },
      {
       "id": "fp",
       "kind": "process",
       "label": "Feature pipelines",
       "sub": "one definition per feature",
       "x": 2,
       "y": 0.5
      },
      {
       "id": "off",
       "kind": "storage",
       "label": "Offline store",
       "sub": "history, point-in-time joins",
       "x": 4,
       "y": 0
      },
      {
       "id": "on",
       "kind": "db",
       "label": "Online store",
       "sub": "latest values, fast reads",
       "x": 4,
       "y": 2
      },
      {
       "id": "tr",
       "kind": "process",
       "label": "Training pipeline",
       "sub": "CI: tests and quality gates",
       "x": 6,
       "y": 0
      },
      {
       "id": "reg",
       "kind": "storage",
       "label": "Model registry",
       "sub": "versions, lineage, approval",
       "x": 6,
       "y": 2
      },
      {
       "id": "svc",
       "kind": "api",
       "label": "Scoring service",
       "sub": "online inference",
       "x": 5,
       "y": 4
      },
      {
       "id": "mon",
       "kind": "monitor",
       "label": "Monitoring",
       "sub": "drift, performance, cost",
       "x": 7,
       "y": 4
      },
      {
       "id": "app",
       "kind": "phone",
       "label": "Client app",
       "sub": "requests",
       "x": 3,
       "y": 5.5
      }
     ],
     "links": [
      {
       "a": "src",
       "b": "fp"
      },
      {
       "a": "fp",
       "b": "off",
       "label": "backfill"
      },
      {
       "a": "fp",
       "b": "on",
       "label": "materialise"
      },
      {
       "a": "off",
       "b": "tr",
       "label": "training sets"
      },
      {
       "a": "tr",
       "b": "reg",
       "label": "register"
      },
      {
       "a": "reg",
       "b": "svc",
       "label": "deploy"
      },
      {
       "a": "on",
       "b": "svc",
       "label": "features"
      },
      {
       "a": "app",
       "b": "svc",
       "label": "request"
      },
      {
       "a": "svc",
       "b": "mon",
       "label": "logs"
      },
      {
       "a": "mon",
       "b": "tr",
       "label": "retrain",
       "style": "dashed"
      }
     ],
     "caption": "One feature definition fills both stores, so training and serving see identical values. The registry is the only route from training to serving, which gives every deployed model a traceable lineage."
    },
    {
     "type": "table",
     "title": "Testing ML systems",
     "head": [
      "Level",
      "What is tested",
      "Examples"
     ],
     "rows": [
      [
       "Data tests",
       "Schema, ranges, nulls, freshness, distribution",
       "age between 0 and 110; no more than 2% missing income; data less than 24 hours old"
      ],
      [
       "Feature tests",
       "Feature code gives correct, identical values in training and serving",
       "Unit tests for a 30-day aggregate; parity test between batch and online paths"
      ],
      [
       "Model quality gates",
       "Minimum metrics versus baseline and current model",
       "AUC not lower than production by more than 0.005; recall ≥ 0.7 in every region"
      ],
      [
       "Behavioural tests",
       "Expected directions and invariances",
       "More late payments never lowers risk; changing a name does not change the score"
      ],
      [
       "Operational tests",
       "Latency, memory, load, failure handling",
       "p99 < 150 ms at 300 requests/s; fallback works when the model times out"
      ],
      [
       "Language-model application tests",
       "Prompts, retrieval and outputs against a versioned evaluation set",
       "Answer accuracy and citation support on 200 reference questions after every prompt or model change; prompt-injection test cases"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "A behavioural (directional) test",
     "device": "Python notebook",
     "lines": [
      "import numpy as np",
      "from sklearn.linear_model import LogisticRegression",
      "rng = np.random.default_rng(0)",
      "late = rng.integers(0, 6, 1000); income = rng.normal(50, 15, 1000)",
      "y = (rng.random(1000) < 1 / (1 + np.exp(-(0.6 * late - 0.03 * income)))).astype(int)",
      "model = LogisticRegression().fit(np.c_[late, income], y)",
      "p_base = model.predict_proba([[1, 50.0]])[0, 1]",
      "p_worse = model.predict_proba([[4, 50.0]])[0, 1]",
      "assert p_worse > p_base, 'more late payments must not lower predicted risk'",
      "print('directional test passed', round(p_base, 2), round(p_worse, 2))",
      "# output: directional test passed 0.32 0.75"
     ],
     "note": "Tests like this run automatically in the training pipeline. If a retrained model ever violated agreed domain logic, the pipeline would fail and the model would not be promoted."
    },
    {
     "type": "table",
     "title": "MLOps maturity",
     "head": [
      "Level",
      "Characteristics",
      "Typical for"
     ],
     "rows": [
      [
       "0: Manual",
       "Notebooks, manual hand-over, no monitoring",
       "First proof of concept"
      ],
      [
       "1: Automated training",
       "Reproducible pipeline, experiment tracking, registry, scheduled retraining",
       "First production models"
      ],
      [
       "2: Full CI/CD/CT",
       "Tested code and pipelines deployed automatically; triggered retraining; automated quality gates and rollback",
       "Many models, frequent change, high stakes"
      ]
     ]
    },
    {
     "type": "case",
     "title": "MLOps for a fraud platform",
     "context": "A mobile financial service runs four fraud models built by different analysts. Each was trained in a personal notebook; two can no longer be reproduced because the original data extracts were overwritten. Retraining takes three weeks of manual work, so models are refreshed twice a year while fraud patterns change monthly. The regulator has asked how a specific customer's transfer was blocked last March.",
     "questions": [
      "What are the main risks in the current set-up?",
      "Which MLOps capabilities would you introduce first, and why?",
      "How would you answer the regulator's question in future?"
     ],
     "answer": "Risks include irreproducible models, stale models facing concept drift, key-person dependency, no consistent testing and no audit trail. Start with versioned data snapshots and code, experiment tracking and a model registry, then an automated training pipeline with data tests, quality gates and behavioural tests, followed by monitoring with drift triggers so retraining can run monthly. To answer the regulator, log every prediction with model version, input features, score, threshold and reason codes, linked through the registry to the training data version and code commit; then the March decision can be reconstructed and explained exactly."
    },
    {
     "type": "scenario",
     "situation": "A data scientist cannot reproduce last quarter's model: rerunning the notebook gives AUC 0.79 instead of 0.82. The data extract was refreshed in place, library versions have changed and no random seed was set. What is the most important fix for the future?",
     "options": [
      {
       "text": "Save only the final model file",
       "feedback": "A model file alone cannot explain or rebuild how it was produced.",
       "best": false
      },
      {
       "text": "Retrain until AUC reaches 0.82 again",
       "feedback": "Searching for a lucky run hides the problem and is not reproducibility.",
       "best": false
      },
      {
       "text": "Avoid updating libraries ever again",
       "feedback": "Freezing everything forever is impractical; versioned environments are the answer.",
       "best": false
      },
      {
       "text": "Version data snapshots, code, environment and configuration together for every training run",
       "feedback": "Correct. Reproducibility needs all inputs pinned: data, code, dependencies, parameters and seeds.",
       "best": true
      }
     ],
     "title": "Irreproducible results"
    },
    {
     "type": "checklist",
     "title": "Production-readiness checklist",
     "items": [
      "Data, code, environment and configuration are versioned for the model",
      "The training pipeline runs end to end without manual steps",
      "Data tests and model quality gates block bad releases",
      "Behavioural tests encode agreed domain rules",
      "The model is registered with an owner, model card and approval",
      "Monitoring dashboards and alerts are live with named responders",
      "Rollback to the previous version has been tested"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Where does your team sit on the MLOps maturity scale today? Name the single capability that would remove the most manual risk, and what it would take to introduce it."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "MLOps",
       "def": "Practices and tools for reliably building, deploying, monitoring and maintaining ML systems."
      },
      {
       "term": "Experiment tracking",
       "def": "Recording parameters, metrics, code versions and artefacts for each training run."
      },
      {
       "term": "Model registry",
       "def": "A central store of model versions with metadata, lineage and deployment stage."
      },
      {
       "term": "Lineage",
       "def": "The traceable chain from data and code through training to a deployed model and its predictions."
      },
      {
       "term": "Continuous training",
       "def": "Automatically retraining models on new data on a schedule or trigger."
      },
      {
       "term": "Quality gate",
       "def": "An automated check that a model must pass before it can be promoted."
      },
      {
       "term": "Behavioural test",
       "def": "A test of whether a model's outputs respond to inputs in expected, agreed ways."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Any production model should trace to exact data, code, environment and settings.",
      "Automate the pipeline and block bad releases with data tests, quality gates and behavioural tests.",
      "A feature store and a model registry connect training and serving consistently.",
      "For language-model applications, version prompts, retrieval indexes and evaluation sets like code.",
      "Mature teams retrain on triggers and can roll back in minutes."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which item is NOT needed to reproduce a training run?",
       "options": [
        "The colour scheme of the dashboard",
        "The exact data snapshot",
        "The code version",
        "The library versions and random seeds"
       ],
       "answer": 0,
       "explain": "Reproducibility depends on data, code, environment and configuration."
      },
      {
       "q": "What does a model registry mainly provide?",
       "options": [
        "Raw data storage for all systems, replacing the data warehouse and lake",
        "Automatic labelling of data",
        "Versioned models with metadata, lineage and deployment stages",
        "A replacement for monitoring"
       ],
       "answer": 2,
       "explain": "The registry is the source of truth for model versions."
      },
      {
       "q": "Which is a behavioural test?",
       "options": [
        "Checking that a column has no nulls",
        "Measuring p99 latency",
        "Checking that changing an applicant's name does not change the score",
        "Counting rows in the training table"
       ],
       "answer": 2,
       "explain": "Behavioural tests check invariances and expected directions of model outputs."
      },
      {
       "q": "A team retrains manually twice a year, but patterns change monthly. Which capability helps most?",
       "options": [
        "An automated training pipeline with drift-based retraining triggers",
        "Larger GPUs",
        "A bigger test set",
        "More dashboards for managers, without alerts or any retraining triggers"
       ],
       "answer": 0,
       "explain": "Automation makes frequent, safe retraining practical."
      },
      {
       "q": "Why log the model version with every prediction?",
       "options": [
        "To make predictions faster",
        "To reduce storage costs",
        "Because logging versions improves the model's accuracy over time",
        "To trace and explain any individual decision later"
       ],
       "answer": 3,
       "explain": "Prediction-level lineage supports audits and debugging."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l4",
   "title": "Responsible Machine Learning",
   "subtitle": "Fairness, transparency, privacy, security and governance in practice",
   "minutes": 28,
   "objectives": [
    "Measure group fairness with selection rates, disparate impact and error-rate gaps",
    "Choose transparency and documentation suited to the risk",
    "Apply privacy and security safeguards across the ML life cycle",
    "Set up proportionate governance with human oversight"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Machine learning now decides who gets a loan, which patient is seen first and which job applicant is interviewed. Responsible ML means making those systems **fair, transparent, private, secure and accountable**, in proportion to the harm they could cause. It is not a final checklist: it runs through framing, data, modelling, deployment and monitoring."
    },
    {
     "type": "framework",
     "title": "Five pillars of responsible ML",
     "items": [
      {
       "label": "F",
       "title": "Fairness",
       "text": "Outcomes and errors do not unjustifiably differ across groups."
      },
      {
       "label": "T",
       "title": "Transparency",
       "text": "People can understand what the system does and why a decision was made."
      },
      {
       "label": "P",
       "title": "Privacy",
       "text": "Personal data is minimised, protected and used only as agreed."
      },
      {
       "label": "S",
       "title": "Security and robustness",
       "text": "The system resists manipulation, poisoning and misuse, and fails safely."
      },
      {
       "label": "A",
       "title": "Accountability",
       "text": "Named owners, documentation, human oversight and routes to challenge decisions."
      }
     ]
    },
    {
     "type": "matrix",
     "title": "Proportionate oversight",
     "x": "Degree of automation (low → high)",
     "y": "Potential harm (low → high)",
     "quadrants": [
      {
       "title": "Decision support, strong review",
       "items": [
        "A professional decides",
        "Validation by group",
        "Reviewer training",
        "Example: sepsis alert"
       ]
      },
      {
       "title": "Strictest controls or keep a human",
       "items": [
        "Impact assessment",
        "Human oversight and appeal",
        "Continuous monitoring",
        "Full documentation"
       ]
      },
      {
       "title": "Light touch",
       "items": [
        "Basic testing",
        "Named owner",
        "Example: ordering routine letters"
       ]
      },
      {
       "title": "Automate with guardrails",
       "items": [
        "Quality gates",
        "Rollback",
        "Spot checks"
       ]
      }
     ],
     "caption": "Controls should grow with the harm a system can cause and with how little a human checks it. The top-right cell is where regulation is strictest and where automation most needs justifying."
    },
    {
     "type": "formula",
     "title": "Group fairness measures",
     "items": [
      {
       "name": "Selection rate",
       "expr": "SR_g = positive decisions in group g ÷ members of group g",
       "meaning": "Group A: 60 of 100 approved = 0.60. Group B: 36 of 80 approved = 0.45."
      },
      {
       "name": "Disparate impact ratio",
       "expr": "DI = SR_lower ÷ SR_higher",
       "meaning": "0.45 ÷ 0.60 = 0.75, below the common 0.8 screening rule, so investigate."
      },
      {
       "name": "Equal opportunity gap",
       "expr": "TPR_A − TPR_B, where TPR = approved among those who would repay",
       "meaning": "Compares how often qualified people in each group are approved."
      },
      {
       "name": "Calibration within groups",
       "expr": "P(y = 1 | score = s, group = g) similar across groups",
       "meaning": "A score of 0.2 should mean about 20% risk in every group."
      },
      {
       "name": "The trade-off",
       "expr": "With different base rates, these criteria generally cannot all hold at once",
       "meaning": "Choose the fairness definition that fits the decision and document why."
      }
     ]
    },
    {
     "type": "cli",
     "title": "Checking selection rates and error gaps by group",
     "device": "Python notebook",
     "lines": [
      "import pandas as pd",
      "df = pd.DataFrame({'group': ['A'] * 5 + ['B'] * 5,",
      "                   'approved': [1, 1, 1, 0, 1, 1, 0, 0, 1, 0],",
      "                   'repaid':   [1, 1, 0, 0, 1, 1, 1, 0, 1, 1]})",
      "rates = df.groupby('group').approved.mean()",
      "print(rates.to_dict(), round(rates['B'] / rates['A'], 2))",
      "# output: {'A': 0.8, 'B': 0.4} 0.5",
      "tpr = df[df.repaid == 1].groupby('group').approved.mean()",
      "print(tpr.round(2).to_dict())",
      "# output: {'A': 1.0, 'B': 0.5}"
     ],
     "note": "Group B is approved half as often (disparate impact 0.5), and among people who would repay, only half of group B are approved versus all of group A. Real audits use far larger samples and confidence intervals."
    },
    {
     "type": "table",
     "title": "Where unfairness enters, and what helps",
     "head": [
      "Stage",
      "Source",
      "Mitigation"
     ],
     "rows": [
      [
       "Framing",
       "Proxy target encodes past inequality",
       "Choose targets carefully; consult affected groups"
      ],
      [
       "Data",
       "Under-representation, historical bias, label bias",
       "Collect more representative data; audit labels"
      ],
      [
       "Features",
       "Proxies for protected attributes (postcode, name)",
       "Review features; test the impact of removing them"
      ],
      [
       "Model and threshold",
       "Different error rates across groups",
       "Measure per group; adjust thresholds or retrain with constraints where lawful and justified"
      ],
      [
       "Deployment",
       "Feedback loops; uneven human override",
       "Monitor outcomes per group; review overrides"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Privacy and security safeguards",
     "columns": [
      {
       "title": "Privacy",
       "items": [
        "Collect only what the purpose needs",
        "Pseudonymise and restrict access",
        "Retention limits and deletion",
        "Techniques such as differential privacy or federated learning where risk is high",
        "Follow applicable data protection law and consent terms"
       ]
      },
      {
       "title": "Security",
       "items": [
        "Data poisoning: validate and track training data sources",
        "Adversarial inputs: test robustness, rate-limit, monitor",
        "Model extraction and inversion: limit output detail, authenticate APIs",
        "Secrets and supply chain: scan dependencies, protect model files",
        "Language-model apps: prompt injection and data leakage through outputs; treat inputs and retrieved text as untrusted"
       ]
      }
     ]
    },
    {
     "type": "template",
     "title": "Model card",
     "purpose": "A short, standard record that travels with a model so users, reviewers and auditors understand it.",
     "columns": [
      "Section",
      "Content"
     ],
     "example": [
      [
       "Intended use and users",
       "Rank small-business loan applications for officer review; not for automatic rejection"
      ],
      [
       "Performance by group",
       "AUC 0.79 overall; 0.77–0.81 across regions; approval-rate ratio by gender 0.91"
      ]
     ],
     "rows": 8
    },
    {
     "type": "text",
     "text": "Documentation travels with the system. A **datasheet for a dataset** records why and how the data was collected, its composition, labelling process, known gaps and permitted uses; a **model card** records intended use, performance by group, limitations and owners. Risk-based regulation expects similar evidence: the EU AI Act, for example, treats uses such as credit scoring, recruitment and access to essential services as high-risk, with duties for risk management, data governance, technical documentation, logging and human oversight."
    },
    {
     "type": "timeline",
     "title": "AI governance milestones a practitioner should know",
     "items": [
      {
       "when": "Jan 2023",
       "label": "NIST AI Risk Management Framework 1.0",
       "text": "Voluntary framework: govern, map, measure, manage."
      },
      {
       "when": "Dec 2023",
       "label": "ISO/IEC 42001",
       "text": "International standard for an AI management system."
      },
      {
       "when": "Jul 2024",
       "label": "NIST generative AI profile",
       "text": "Companion to the framework for generative-model risks."
      },
      {
       "when": "Aug 2024",
       "label": "EU AI Act enters into force",
       "text": "Risk-based rules that phase in over several years."
      },
      {
       "when": "Feb 2025",
       "label": "EU AI Act: prohibitions apply",
       "text": "Banned practices, plus AI-literacy duties."
      },
      {
       "when": "Aug 2025",
       "label": "EU AI Act: general-purpose models",
       "text": "Documentation and transparency duties for providers of general-purpose AI models."
      },
      {
       "when": "From Aug 2026",
       "label": "EU AI Act: high-risk systems",
       "text": "Phased obligations; changes to these dates were proposed in late 2025, so check the current official timetable."
      }
     ],
     "caption": "Even outside the EU, these documents shape procurement, audits and partner expectations. Use the dates for orientation and always confirm the current official text and any local law that applies."
    },
    {
     "type": "case",
     "title": "A fairness review for a lending model",
     "context": "A digital lender in Bangladesh uses a gradient-boosted model to approve small loans through a mobile app. An internal review finds that approval rates for women applicants are 40% versus 55% for men (ratio 0.73). Gender is not a model input, but 'type of mobile handset', 'top-up pattern' and 'time of app use' are, and repayment rates among approved women are higher than among approved men.",
     "questions": [
      "What do these facts suggest about the model?",
      "What analyses would you run next?",
      "What actions could the lender take, and who should decide?"
     ],
     "answer": "Gender is not used directly, but other features may act as proxies, and the higher repayment of approved women suggests that qualified women are being rejected more often (an equal-opportunity gap), so the threshold or features are disadvantaging them. Next, measure approval rates, true positive rates and calibration by gender with confidence intervals, test how removing or modifying proxy-like features changes the gaps and accuracy, and review historical labels for bias. Options include removing or reworking proxy features, recalibrating or setting thresholds to equalise opportunity where lawful, adding human review for borderline cases and collecting better repayment-capacity data. The decision belongs to an accountable owner and governance committee with legal, risk and business input, documented in the model card and monitored after the change."
    },
    {
     "type": "scenario",
     "situation": "A hospital plans two ML systems: one suggests the order in which non-urgent outpatient letters are typed, the other flags emergency patients for possible sepsis. How should oversight differ?",
     "options": [
      {
       "text": "Avoid ML in hospitals entirely",
       "feedback": "Well-governed ML can improve care; the answer is proportionate control, not blanket avoidance.",
       "best": false
      },
      {
       "text": "Let both run automatically with no human review",
       "feedback": "Unsupervised automation of life-critical alerts is not acceptable.",
       "best": false
      },
      {
       "text": "Apply light controls to the letter-ordering tool and strict validation, clinician oversight and monitoring to the sepsis tool",
       "feedback": "Correct. Governance should be proportionate to potential harm; the sepsis tool affects life-critical decisions.",
       "best": true
      },
      {
       "text": "Apply identical heavy review to both, so that nothing is missed",
       "feedback": "Uniform heavy process slows low-risk work without reducing the main risk.",
       "best": false
      }
     ],
     "title": "Proportionate oversight"
    },
    {
     "type": "reflection",
     "prompt": "Pick one model that affects people in your organisation. Which groups could be treated differently by it, which fairness measure would matter most, and who is accountable if it causes harm?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Responsible ML",
       "def": "Designing, building and operating ML systems that are fair, transparent, private, secure and accountable."
      },
      {
       "term": "Disparate impact ratio",
       "def": "The ratio of selection rates between a less-favoured and a more-favoured group."
      },
      {
       "term": "Equal opportunity",
       "def": "A fairness criterion requiring similar true positive rates across groups."
      },
      {
       "term": "Proxy variable",
       "def": "A feature that indirectly reveals a sensitive attribute, such as postcode standing in for ethnicity."
      },
      {
       "term": "Model card",
       "def": "A short document describing a model's purpose, data, performance, limitations and ownership."
      },
      {
       "term": "Data poisoning",
       "def": "An attack that corrupts training data to change a model's behaviour."
      },
      {
       "term": "Human oversight",
       "def": "Arrangements that let people monitor, interpret, override or stop an automated system."
      },
      {
       "term": "Datasheet for a dataset",
       "def": "A document recording a dataset's purpose, collection, composition, labelling, known gaps and permitted uses."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Responsible ML covers fairness, transparency, privacy, security and accountability, in proportion to harm.",
      "Measure fairness by group (selection rates, error rates, calibration); the criteria can conflict, so choose and document.",
      "Unfairness enters through targets, data, proxy features, thresholds and feedback loops.",
      "Datasheets and model cards travel with the system; regulation increasingly expects them.",
      "Scale oversight with potential harm and the degree of automation."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Group X has a selection rate of 0.30 and group Y 0.50. What is the disparate impact ratio?",
       "options": [
        "0.2",
        "0.6",
        "1.67",
        "0.8"
       ],
       "answer": 1,
       "explain": "0.30 ÷ 0.50 = 0.6."
      },
      {
       "q": "A model does not use gender, yet approval rates differ strongly by gender. What is a likely cause?",
       "options": [
        "Other features act as proxies for gender",
        "The model is perfectly fair by definition",
        "Gender must have leaked from the test set",
        "Disparate impact can only arise from explicit inputs"
       ],
       "answer": 0,
       "explain": "Removing a sensitive attribute does not remove correlated proxies."
      },
      {
       "q": "What does equal opportunity compare across groups?",
       "options": [
        "Overall accuracy",
        "Number of features used",
        "True positive rates among those who truly qualify",
        "Average age of applicants"
       ],
       "answer": 2,
       "explain": "It asks whether qualified people are treated alike."
      },
      {
       "q": "Which is a data poisoning risk?",
       "options": [
        "A user forgets a password",
        "An attacker submits crafted records that are later used for training",
        "A model runs slowly on old hardware and keeps timing out during peak traffic",
        "A dashboard uses the wrong colours"
       ],
       "answer": 1,
       "explain": "Poisoning corrupts training data to change model behaviour."
      },
      {
       "q": "What is the main purpose of a model card?",
       "options": [
        "To store the model's weights",
        "To replace monitoring",
        "To list every training row and label so that auditors can recheck the data by hand",
        "To document a model's intended use, performance, limitations and ownership"
       ],
       "answer": 3,
       "explain": "It communicates essential facts to users and reviewers."
      },
      {
       "q": "An auditor asks how a training dataset was collected, how it was labelled and which groups it under-represents. Which document should answer this?",
       "options": [
        "The model card",
        "The release plan",
        "The datasheet for the dataset",
        "The monitoring plan"
       ],
       "answer": 2,
       "explain": "A datasheet documents a dataset's purpose, collection, labelling, composition and known gaps. A model card covers the model's intended use and performance, while release and monitoring plans cover deployment."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m5",
  "q": "A node contains 8 'on time' and 2 'late' orders. A candidate split produces a left child with 6 on time and 0 late, and a right child with 2 on time and 2 late. What is the Gini decrease?",
  "options": [
   "0.32",
   "0.12",
   "0.20",
   "0.08"
  ],
  "answer": 1,
  "explain": "Parent Gini = 1 − (0.64 + 0.04) = 0.32. Left = 0; right = 0.5; weighted = 0.4 × 0.5 = 0.20. Decrease = 0.32 − 0.20 = 0.12."
 },
 {
  "module": "m5",
  "q": "A random forest with max_features equal to the total number of features barely beats a single deep tree. What is the MOST likely reason?",
  "options": [
   "The forest has too few rows in each bootstrap sample to learn the patterns well",
   "Random forests cannot model interactions",
   "The trees are highly correlated, so averaging cancels little error",
   "The trees are too shallow to be useful"
  ],
  "answer": 2,
  "explain": "Considering all features at every split makes trees similar; lowering max_features decorrelates them."
 },
 {
  "module": "m5",
  "q": "A small NGO has only 1,200 labelled survey responses and cannot afford a separate validation set. Which approach gives a reasonable built-in performance estimate for a random forest?",
  "options": [
   "Use training accuracy",
   "Use the out-of-bag score",
   "Use the number of trees as a proxy",
   "Use impurity-based feature importance"
  ],
  "answer": 1,
  "explain": "Out-of-bag scoring evaluates each row using trees that did not see it, providing validation without a separate split."
 },
 {
  "module": "m5",
  "q": "A gradient boosting model reaches training AUC 0.995 and validation AUC 0.78 after 3,000 rounds at learning rate 0.3. Which change is MOST likely to help?",
  "options": [
   "Increase rounds to 10,000 at the same learning rate so the model can converge fully",
   "Remove row and feature subsampling",
   "Increase tree depth to 16",
   "Lower the learning rate and use early stopping on validation data"
  ],
  "answer": 3,
  "explain": "The model is overfitting. Shrinkage plus early stopping limits the effective number of rounds; the other changes add complexity."
 },
 {
  "module": "m5",
  "q": "A lender's boosted model sometimes lowers predicted risk as the number of missed payments rises, in sparse regions of the data. Risk officers find this unacceptable. What should the data scientist do?",
  "options": [
   "Remove missed payments from the model",
   "Explain that the model must be correct because it learned the pattern from real data",
   "Increase the number of trees until the effect disappears",
   "Apply a monotonic increasing constraint on missed payments and re-validate"
  ],
  "answer": 3,
  "explain": "Monotonic constraints encode agreed domain logic, prevent noisy reversals and usually cost little accuracy."
 },
 {
  "module": "m5",
  "q": "A real-estate firm in Dhaka uses a regression tree ensemble to value flats. Prices in a new development will exceed anything in the training data. What risk should they flag?",
  "options": [
   "Tree ensembles always over-predict brand-new properties because they average many deep trees",
   "Tree ensembles require standardised prices",
   "Tree ensembles cannot predict above the range of training targets, so values will be capped",
   "Tree ensembles cannot use location features"
  ],
  "answer": 2,
  "explain": "Leaves average training targets, so predictions are bounded by the training range; extrapolation needs other approaches."
 },
 {
  "module": "m5",
  "q": "A risk committee asks why one specific applicant received a high default score from a gradient-boosted model. Which tool answers this question MOST directly?",
  "options": [
   "Global impurity-based feature importance",
   "The model's overall ROC curve",
   "Local Shapley-value attributions for that applicant",
   "A partial dependence plot averaged over all applicants"
  ],
  "answer": 2,
  "explain": "Local attributions decompose this applicant's score into feature contributions; global tools describe the model on average."
 },
 {
  "module": "m6",
  "q": "A retailer clusters customers using raw 'annual spend in taka' and 'number of store visits'. The resulting clusters are simply bands of spending. What is the MOST likely cause?",
  "options": [
   "k-means cannot handle two features",
   "The number of clusters was too large",
   "Visits should have been removed",
   "The features were not scaled, so spend dominated the distance calculation"
  ],
  "answer": 3,
  "explain": "Spend has a far larger numeric range, so unscaled Euclidean distance is driven almost entirely by it."
 },
 {
  "module": "m6",
  "q": "An analyst runs k-means for k from 2 to 10 and picks k = 10 because inertia is lowest. Why is this a poor choice?",
  "options": [
   "Inertia rises as k grows, so k = 10 is actually the worst choice rather than the best one",
   "Inertia always falls as k grows, so its minimum does not identify natural structure",
   "k-means cannot use more than eight clusters",
   "Inertia measures classification accuracy"
  ],
  "answer": 1,
  "explain": "Use the elbow, silhouette, stability and usefulness; the lowest inertia trivially favours more clusters."
 },
 {
  "module": "m6",
  "q": "PCA on standardised survey data gives eigenvalues 5, 2, 1.5, 1 and 0.5. How many components are needed to retain at least 85% of the variance?",
  "options": [
   "2",
   "4",
   "5",
   "3"
  ],
  "answer": 3,
  "explain": "Total = 10. First two give 70%; three give 85%."
 },
 {
  "module": "m6",
  "q": "A bank's fraud team can investigate 100 alerts a day. An unsupervised detector produces scores for 2 million daily transactions. How should alerts be generated?",
  "options": [
   "Send the 100 highest-scored transactions, enriched with context, and record analyst outcomes",
   "Send every transaction above a fixed anomaly score each day, however many alerts that creates",
   "Send a random 100 transactions for fairness",
   "Send only transactions above the maximum amount ever seen"
  ],
  "answer": 0,
  "explain": "Matching volume to capacity and capturing feedback maximises value and enables a supervised model later."
 },
 {
  "module": "m6",
  "q": "An online bookshop in Dhaka launches 500 new titles weekly. Its collaborative filtering recommender never suggests them. What is the BEST fix?",
  "options": [
   "Increase the number of latent factors so that the collaborative model can represent new titles",
   "Retrain the collaborative model daily",
   "Remove older books from the catalogue",
   "Add content-based signals such as genre, author and description embeddings in a hybrid model"
  ],
  "answer": 3,
  "explain": "New items have no interactions; content features let the system recommend them from day one."
 },
 {
  "module": "m6",
  "q": "A recommender's offline precision@10 improved after retraining on click logs, but an A/B test shows no change in purchases. What is a likely explanation?",
  "options": [
   "Offline logs reflect what the old system chose to show, so offline gains may not transfer",
   "Precision@10 cannot be computed offline",
   "A/B tests always show smaller effects than reality",
   "The model must have more parameters than the old one, so it needs more traffic to show gains"
  ],
  "answer": 0,
  "explain": "Logged data is biased by past exposure; online experiments measure the true effect."
 },
 {
  "module": "m6",
  "q": "A team wants RL to set daily prices for a new product with no simulator, and each price change affects revenue immediately and visibly. Which approach is MOST practical to start with?",
  "options": [
   "Full deep reinforcement learning exploring any price on live customers from day one",
   "A contextual bandit with a constrained set of approved price points",
   "Unsupervised clustering of competitor prices",
   "A fixed price chosen once and never revisited"
  ],
  "answer": 1,
  "explain": "Bandits handle immediate rewards with controlled exploration; unconstrained deep RL on live prices is risky."
 },
 {
  "module": "m6",
  "q": "In Q-learning, Q(s, a) = 10, reward r = 2, γ = 0.9, the best next-state value is 10 and α = 0.1. What is the updated Q(s, a)?",
  "options": [
   "11.0",
   "10.0",
   "12.0",
   "10.1"
  ],
  "answer": 3,
  "explain": "Target = 2 + 0.9 × 10 = 11; new Q = 10 + 0.1 × (11 − 10) = 10.1."
 },
 {
  "module": "m7",
  "q": "A team adds LoRA adapters of rank r = 16 to a frozen 2,048 × 2,048 weight matrix. How many trainable parameters does that matrix gain?",
  "options": [
   "4,194,304",
   "32,768",
   "65,536",
   "2,048"
  ],
  "answer": 2,
  "explain": "LoRA adds B (2,048 × 16) and A (16 × 2,048): r(d + k) = 16 × 4,096 = 65,536 parameters, about 1.6% of the 4,194,304 in the frozen matrix. 32,768 counts only one of the two matrices."
 },
 {
  "module": "m7",
  "q": "A model must flag which of 20 possible defects appear on each garment photo; a garment can have several defects. Which output layer and loss are correct?",
  "options": [
   "A 20-way softmax with categorical cross-entropy",
   "One linear output with MSE",
   "20 sigmoid outputs with binary cross-entropy",
   "20 ReLU outputs with hinge loss"
  ],
  "answer": 2,
  "explain": "Multi-label tasks need independent probabilities per label; softmax assumes exactly one class."
 },
 {
  "module": "m7",
  "q": "Training a deep network, the loss stays flat and gradient norms in the first layers are near zero, while later layers learn. The network uses sigmoid activations throughout. What is the MOST effective change?",
  "options": [
   "Use ReLU-family activations with suitable initialisation or residual connections",
   "Add more sigmoid layers so that the network has more capacity to learn early features",
   "Increase dropout to 0.9",
   "Remove the validation set"
  ],
  "answer": 0,
  "explain": "This is the vanishing-gradient pattern; non-saturating activations, proper initialisation and skip connections restore gradient flow."
 },
 {
  "module": "m7",
  "q": "A conv layer receives a 64 × 64 × 3 image and applies 16 filters of size 5 × 5 with stride 1 and no padding. What is the output shape?",
  "options": [
   "64 × 64 × 16",
   "60 × 60 × 3",
   "60 × 60 × 16",
   "32 × 32 × 16"
  ],
  "answer": 2,
  "explain": "(64 − 5) ÷ 1 + 1 = 60 in each spatial dimension; 16 filters give 16 channels."
 },
 {
  "module": "m7",
  "q": "A hospital has 1,200 labelled skin-lesion images and wants a classifier. Which approach is MOST appropriate?",
  "options": [
   "Train a large CNN from random initialisation on the 1,200 images, using all of them for training",
   "Cluster the images with k-means and call the clusters diagnoses",
   "Use a decoder-only text model on file names",
   "Fine-tune a pre-trained image model with augmentation, splitting by patient"
  ],
  "answer": 3,
  "explain": "Transfer learning makes small image datasets workable, and patient-level splits avoid leakage."
 },
 {
  "module": "m7",
  "q": "A forecasting team uses an LSTM on raw daily sales and gets worse results than gradient-boosted trees with lag, holiday and promotion features. What is the MOST reasonable conclusion?",
  "options": [
   "LSTMs can never forecast sales",
   "Boosted trees always beat neural networks on sales data, so the LSTM should be abandoned",
   "The LSTM must be leaking future data",
   "The features drove the gain; give the LSTM the same inputs before judging it"
  ],
  "answer": 3,
  "explain": "The comparison mixed architecture with information; the LSTM lacked the calendar and promotion inputs."
 },
 {
  "module": "m7",
  "q": "A legal team must classify contracts of up to 30,000 tokens. Their transformer handles 4,000 tokens. Which issue should they plan for?",
  "options": [
   "Transformers cannot read legal language",
   "Attention cost falls as documents get longer",
   "Attention cost grows with the square of length, so chunking or long-context methods are needed",
   "Tokenisation compresses long documents enough that context length no longer matters in practice"
  ],
  "answer": 2,
  "explain": "Self-attention scales quadratically; long documents need chunking, hierarchical models or efficient attention variants."
 },
 {
  "module": "m8",
  "q": "A garment buyer portal needs delivery-risk scores for 40,000 open orders, refreshed each morning before planners start work. Which serving pattern fits BEST?",
  "options": [
   "An online API called for every page view",
   "An on-device model in each planner's phone",
   "A nightly batch job that writes scores to a table the portal reads",
   "A streaming pipeline scoring every keystroke"
  ],
  "answer": 2,
  "explain": "Scores are needed once a day for a known set of orders; batch is simplest, cheapest and reliable."
 },
 {
  "module": "m8",
  "q": "After deployment, a credit model's live scores differ from offline scores for the same applicants. Investigation shows income is rounded to thousands in the app but not in the training data. What is this problem called?",
  "options": [
   "Covariate drift over time",
   "Label drift",
   "Training–serving skew",
   "Overfitting"
  ],
  "answer": 2,
  "explain": "Different feature computation in training and serving causes skew; the fix is a shared feature definition and parity tests."
 },
 {
  "module": "m8",
  "q": "A team computes PSI for a key feature and gets 0.31. No labels are available yet. What is the MOST appropriate response?",
  "options": [
   "Ignore it until labels arrive in six months",
   "Investigate the cause of the shift and assess its likely impact before deciding on retraining",
   "Retrain automatically on this month's data without review, since PSI above 0.25 always means retrain",
   "Delete the feature from the live model immediately"
  ],
  "answer": 1,
  "explain": "A PSI above 0.25 signals significant shift; the cause may be a data error or real change, so investigate before acting."
 },
 {
  "module": "m8",
  "q": "Fraud patterns change monthly, but models are retrained manually twice a year, and the last two retrains could not be reproduced. Which investment gives the GREATEST improvement?",
  "options": [
   "A larger cloud GPU for faster manual training",
   "An automated, versioned training pipeline with quality gates and a model registry",
   "Hiring an additional analyst to rerun the existing notebooks more carefully each month",
   "Switching to a deep learning model"
  ],
  "answer": 1,
  "explain": "Automation and versioning make frequent, reproducible retraining possible; compute or headcount alone do not."
 },
 {
  "module": "m8",
  "q": "A loan model approves 48% of applicants from group A and 30% from group B. What is the disparate impact ratio and what does it suggest?",
  "options": [
   "0.625; below the 0.8 screening rule, so investigate",
   "0.18; within acceptable limits",
   "1.6; group B is favoured, so the model should be adjusted in group A's favour",
   "0.8; exactly at the threshold"
  ],
  "answer": 0,
  "explain": "0.30 ÷ 0.48 = 0.625, below 0.8, which warrants a fairness review."
 },
 {
  "module": "m8",
  "q": "A support assistant built on a language model with retrieval was fine last month. After the vendor updated the underlying model, complaints about wrong answers rose. Which practice would have caught this before users did?",
  "options": [
   "A versioned set of reference questions rerun as a release gate after every change",
   "Raising the temperature so that answers become more varied and natural",
   "Doubling the number of retrieved passages in every prompt",
   "Checking the new model version's position on public leaderboards before switching over"
  ],
  "answer": 0,
  "explain": "A regression suite on your own reference questions detects quality drops caused by any upstream change. Leaderboards measure other tasks, and changing temperature or passage count does not test anything."
 },
 {
  "module": "m8",
  "q": "A regulator asks why a specific customer's transfer was blocked eight months ago. Which practice makes this question answerable?",
  "options": [
   "Keeping only monthly aggregate dashboards",
   "Retraining the model on the customer's data and comparing the new score with the old one",
   "Storing the final model file without metadata",
   "Logging each prediction with model version, inputs, score, threshold and reason codes"
  ],
  "answer": 3,
  "explain": "Prediction-level logs linked to registered model versions allow exact reconstruction and explanation."
 }
]);
