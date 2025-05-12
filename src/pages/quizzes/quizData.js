export const QUIZZES = {
    webDevelopment: {
      title: 'Web Development Fundamentals',
      description: 'Test your knowledge of HTML, CSS, and JavaScript basics',
      difficulty: 'Beginner',
      category: 'Web Development',
      questions: [
        {
          question: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Hyper Transfer Markup Language',
            'Home Tool Markup Language'
          ],
          correctAnswer: 0,
          explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages.'
        },
        {
          question: 'Which CSS property is used to change the text color?',
          options: [
            'text-color',
            'font-color',
            'color',
            'text-style'
          ],
          correctAnswer: 2,
          explanation: 'The "color" property is used to set the color of text in CSS.'
        },
        {
          question: 'What is the correct way to write a JavaScript comment?',
          options: [
            '// This is a comment',
            '<!-- This is a comment -->',
            '/* This is a comment */',
            'All of the above'
          ],
          correctAnswer: 0,
          explanation: 'In JavaScript, single-line comments start with //. Multi-line comments use /* */.'
        },
        {
          question: 'Which HTML tag is used to create a hyperlink?',
          options: [
            '<link>',
            '<a>',
            '<href>',
            '<hyperlink>'
          ],
          correctAnswer: 1,
          explanation: 'The <a> tag is used to create hyperlinks in HTML.'
        },
        {
          question: 'What is the correct way to include an external JavaScript file?',
          options: [
            '<script href="script.js">',
            '<script src="script.js">',
            '<javascript src="script.js">',
            '<link rel="script" href="script.js">'
          ],
          correctAnswer: 1,
          explanation: 'The <script> tag with the src attribute is used to include external JavaScript files.'
        }
      ]
    },
    python: {
      title: 'Python Programming Basics',
      description: 'Essential Python concepts every developer should know',
      difficulty: 'Beginner',
      category: 'Programming',
      questions: [
        {
          question: 'What is the output of print(2 ** 3)?',
          options: [
            '6',
            '8',
            '5',
            'Error'
          ],
          correctAnswer: 1,
          explanation: 'The ** operator is used for exponentiation in Python. 2 ** 3 means 2 raised to the power of 3, which is 8.'
        },
        {
          question: 'Which of the following is a valid Python list?',
          options: [
            'list = [1, 2, 3]',
            'list = (1, 2, 3)',
            'list = {1, 2, 3}',
            'list = "1, 2, 3"'
          ],
          correctAnswer: 0,
          explanation: 'In Python, lists are created using square brackets [].'
        },
        {
          question: 'What is the correct way to create a function in Python?',
          options: [
            'function myFunction():',
            'def myFunction():',
            'create myFunction():',
            'func myFunction():'
          ],
          correctAnswer: 1,
          explanation: 'In Python, functions are defined using the def keyword.'
        },
        {
          question: 'Which of these is NOT a Python data type?',
          options: [
            'int',
            'string',
            'boolean',
            'character'
          ],
          correctAnswer: 3,
          explanation: 'Python does not have a separate character type. Single characters are simply strings of length 1.'
        },
        {
          question: 'What is the output of print("Hello" + "World")?',
          options: [
            'Hello World',
            'HelloWorld',
            'Hello+World',
            'Error'
          ],
          correctAnswer: 1,
          explanation: 'The + operator concatenates strings in Python without adding a space.'
        }
      ]
    },
    dsaBeginner: {
      title: 'Data Structures & Algorithms - Beginner',
      description: 'Basic concepts of data structures and algorithms',
      difficulty: 'Beginner',
      category: 'Computer Science',
      questions: [
        {
          question: 'What is the time complexity of linear search?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n²)'
          ],
          correctAnswer: 2,
          explanation: 'Linear search has a time complexity of O(n) as it may need to check each element in the worst case.'
        },
        {
          question: 'Which data structure uses FIFO (First In First Out) principle?',
          options: [
            'Stack',
            'Queue',
            'Tree',
            'Graph'
          ],
          correctAnswer: 1,
          explanation: 'Queue follows the FIFO principle where the first element added is the first one to be removed.'
        },
        {
          question: 'What is the maximum number of children a binary tree node can have?',
          options: [
            '1',
            '2',
            '3',
            '4'
          ],
          correctAnswer: 1,
          explanation: 'A binary tree node can have at most 2 children, hence the name "binary".'
        },
        {
          question: 'Which sorting algorithm has the best average case time complexity?',
          options: [
            'Bubble Sort',
            'Insertion Sort',
            'Quick Sort',
            'Selection Sort'
          ],
          correctAnswer: 2,
          explanation: 'Quick Sort has an average case time complexity of O(n log n), which is better than the other options.'
        },
        {
          question: 'What is the space complexity of a recursive function?',
          options: [
            'O(1)',
            'O(n)',
            'O(log n)',
            'Depends on the recursion depth'
          ],
          correctAnswer: 3,
          explanation: 'The space complexity of a recursive function depends on the maximum depth of the recursion stack.'
        },
        {
          question: 'Which data structure is best for implementing a priority queue?',
          options: [
            'Array',
            'Linked List',
            'Heap',
            'Stack'
          ],
          correctAnswer: 2,
          explanation: 'Heap data structure is most efficient for implementing priority queues due to its O(log n) insertion and extraction operations.'
        },
        {
          question: 'What is the time complexity of binary search?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n²)'
          ],
          correctAnswer: 1,
          explanation: 'Binary search has a time complexity of O(log n) as it halves the search space in each iteration.'
        },
        {
          question: 'Which of these is NOT a linear data structure?',
          options: [
            'Array',
            'Linked List',
            'Tree',
            'Stack'
          ],
          correctAnswer: 2,
          explanation: 'Tree is a non-linear data structure as elements are arranged in a hierarchical manner.'
        }
      ]
    },
    dsaIntermediate: {
      title: 'Data Structures & Algorithms - Intermediate',
      description: 'Intermediate concepts of data structures and algorithms',
      difficulty: 'Intermediate',
      category: 'Computer Science',
      questions: [
        {
          question: 'What is the time complexity of finding the median of two sorted arrays?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n log n)'
          ],
          correctAnswer: 1,
          explanation: 'The median of two sorted arrays can be found in O(log n) time using binary search.'
        },
        {
          question: 'Which algorithm is used to find the longest common subsequence?',
          options: [
            'Dijkstra\'s algorithm',
            'Dynamic Programming',
            'Greedy algorithm',
            'Backtracking'
          ],
          correctAnswer: 1,
          explanation: 'Dynamic Programming is used to find the longest common subsequence efficiently.'
        },
        {
          question: 'What is the space complexity of a trie data structure?',
          options: [
            'O(1)',
            'O(n)',
            'O(n²)',
            'O(alphabet_size * key_length * n)'
          ],
          correctAnswer: 3,
          explanation: 'The space complexity depends on the alphabet size, key length, and number of keys.'
        },
        {
          question: 'Which of these is NOT a balanced binary search tree?',
          options: [
            'AVL Tree',
            'Red-Black Tree',
            'Binary Search Tree',
            'B-Tree'
          ],
          correctAnswer: 2,
          explanation: 'A regular Binary Search Tree is not necessarily balanced.'
        },
        {
          question: 'What is the time complexity of the Boyer-Moore string matching algorithm?',
          options: [
            'O(n)',
            'O(n log n)',
            'O(nm)',
            'O(n²)'
          ],
          correctAnswer: 0,
          explanation: 'Boyer-Moore has an average case time complexity of O(n) for pattern matching.'
        },
        {
          question: 'Which data structure is used in the implementation of a LRU cache?',
          options: [
            'Stack',
            'Queue',
            'Doubly Linked List',
            'Binary Heap'
          ],
          correctAnswer: 2,
          explanation: 'LRU cache is typically implemented using a Doubly Linked List for O(1) operations.'
        },
        {
          question: 'What is the time complexity of the KMP string matching algorithm?',
          options: [
            'O(n)',
            'O(n log n)',
            'O(nm)',
            'O(n²)'
          ],
          correctAnswer: 0,
          explanation: 'KMP algorithm has a time complexity of O(n) for pattern matching.'
        },
        {
          question: 'Which algorithm is used to find the strongly connected components in a graph?',
          options: [
            'Kruskal\'s algorithm',
            'Prim\'s algorithm',
            'Kosaraju\'s algorithm',
            'Dijkstra\'s algorithm'
          ],
          correctAnswer: 2,
          explanation: 'Kosaraju\'s algorithm is used to find strongly connected components in a graph.'
        }
      ]
    },
    dsaExpert: {
      title: 'Data Structures & Algorithms - Advanced',
      description: 'Advanced concepts and optimization techniques in data structures and algorithms',
      difficulty: 'Advanced',
      category: 'Computer Science',
      questions: [
        {
          question: 'What is the time complexity of the A* pathfinding algorithm?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(b^d)'
          ],
          correctAnswer: 3,
          explanation: 'A* has a time complexity of O(b^d) where b is the branching factor and d is the depth.'
        },
        {
          question: 'Which algorithm is used to solve the traveling salesman problem with dynamic programming?',
          options: [
            'Bellman-Ford',
            'Held-Karp',
            'Floyd-Warshall',
            'Dijkstra'
          ],
          correctAnswer: 1,
          explanation: 'Held-Karp algorithm uses dynamic programming to solve TSP with O(n²2^n) time complexity.'
        },
        {
          question: 'What is the space complexity of the Knuth-Morris-Pratt algorithm?',
          options: [
            'O(1)',
            'O(n)',
            'O(m)',
            'O(nm)'
          ],
          correctAnswer: 2,
          explanation: 'KMP requires O(m) space for the prefix table where m is the pattern length.'
        },
        {
          question: 'Which data structure is used in the implementation of a suffix automaton?',
          options: [
            'Trie',
            'Suffix Tree',
            'Suffix Array',
            'Directed Acyclic Graph'
          ],
          correctAnswer: 3,
          explanation: 'Suffix automaton is implemented using a directed acyclic graph with linear size.'
        },
        {
          question: 'What is the time complexity of the Hopcroft-Karp algorithm?',
          options: [
            'O(√VE)',
            'O(V²E)',
            'O(VE²)',
            'O(V²E²)'
          ],
          correctAnswer: 0,
          explanation: 'Hopcroft-Karp algorithm finds maximum matching in bipartite graphs in O(√VE) time.'
        },
        {
          question: 'Which algorithm is used to find the maximum flow in a network with minimum cost?',
          options: [
            'Ford-Fulkerson',
            'Edmonds-Karp',
            'Min-Cost Max-Flow',
            'Dinic'
          ],
          correctAnswer: 2,
          explanation: 'Min-Cost Max-Flow algorithm finds the maximum flow with minimum cost in a network.'
        },
        {
          question: 'What is the time complexity of the Fast Fourier Transform algorithm?',
          options: [
            'O(n)',
            'O(n log n)',
            'O(n²)',
            'O(n³)'
          ],
          correctAnswer: 1,
          explanation: 'FFT has a time complexity of O(n log n) for polynomial multiplication.'
        },
        {
          question: 'Which data structure is used in the implementation of a persistent segment tree?',
          options: [
            'Array',
            'Linked List',
            'Tree',
            'Graph'
          ],
          correctAnswer: 2,
          explanation: 'Persistent segment trees maintain multiple versions of a segment tree efficiently.'
        }
      ]
    },
    uiuxBeginner: {
      title: 'UI/UX Design Essentials - Beginner',
      description: 'Fundamental principles of user interface and experience design',
      difficulty: 'Beginner',
      category: 'Design',
      questions: [
        {
          question: 'What does UX stand for?',
          options: [
            'User Experience',
            'User Execution',
            'User Extension',
            'User Exchange'
          ],
          correctAnswer: 0,
          explanation: 'UX stands for User Experience, which focuses on the overall experience of using a product.'
        },
        {
          question: 'Which of these is NOT a principle of good UI design?',
          options: [
            'Consistency',
            'Complexity',
            'Feedback',
            'Simplicity'
          ],
          correctAnswer: 1,
          explanation: 'Complexity is not a principle of good UI design. Good UI should be simple and intuitive.'
        },
        {
          question: 'What is the purpose of wireframing in UI/UX design?',
          options: [
            'To add colors and images',
            'To create a basic layout structure',
            'To implement animations',
            'To write code'
          ],
          correctAnswer: 1,
          explanation: 'Wireframing is used to create a basic layout structure before adding visual design elements.'
        },
        {
          question: 'Which color combination is generally considered most accessible?',
          options: [
            'Red on green',
            'Black on white',
            'Blue on yellow',
            'Purple on pink'
          ],
          correctAnswer: 1,
          explanation: 'Black on white provides the highest contrast ratio and is considered most accessible.'
        },
        {
          question: 'What is the recommended minimum touch target size for mobile interfaces?',
          options: [
            '24x24 pixels',
            '32x32 pixels',
            '44x44 pixels',
            '56x56 pixels'
          ],
          correctAnswer: 2,
          explanation: '44x44 pixels is the recommended minimum touch target size for comfortable interaction.'
        },
        {
          question: 'Which of these is NOT a common UI design pattern?',
          options: [
            'Hamburger menu',
            'Infinite scroll',
            'Random navigation',
            'Card layout'
          ],
          correctAnswer: 2,
          explanation: 'Random navigation is not a common UI design pattern as it would confuse users.'
        },
        {
          question: 'What is the purpose of user personas in UX design?',
          options: [
            'To track user behavior',
            'To represent target users',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'User personas help represent target users and their needs during the design process.'
        },
        {
          question: 'Which of these is a key principle of Fitts\'s Law?',
          options: [
            'Smaller targets are easier to hit',
            'Larger targets are easier to hit',
            'Color doesn\'t matter',
            'Animation is essential'
          ],
          correctAnswer: 1,
          explanation: 'Fitts\'s Law states that larger targets are easier to hit than smaller ones.'
        }
      ]
    },
    uiuxIntermediate: {
      title: 'UI/UX Design - Intermediate',
      description: 'Intermediate principles and practices in user interface and experience design',
      difficulty: 'Intermediate',
      category: 'Design',
      questions: [
        {
          question: 'What is the purpose of a design system?',
          options: [
            'To create animations',
            'To maintain consistency across products',
            'To collect user data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Design systems help maintain consistency and efficiency across products and teams.'
        },
        {
          question: 'Which of these is NOT a common UX research method?',
          options: [
            'User Interviews',
            'A/B Testing',
            'Code Review',
            'Usability Testing'
          ],
          correctAnswer: 2,
          explanation: 'Code Review is a development practice, not a UX research method.'
        },
        {
          question: 'What is the purpose of a user journey map?',
          options: [
            'To track user behavior',
            'To visualize user interactions and pain points',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'User journey maps visualize the user\'s experience and identify pain points.'
        },
        {
          question: 'Which of these is a common accessibility guideline?',
          options: [
            'WCAG 2.1',
            'HTML 5',
            'CSS 3',
            'JavaScript ES6'
          ],
          correctAnswer: 0,
          explanation: 'WCAG 2.1 provides guidelines for making web content more accessible.'
        },
        {
          question: 'What is the purpose of a design sprint?',
          options: [
            'To write code',
            'To solve problems and test ideas quickly',
            'To collect data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Design sprints help teams solve problems and test ideas in a short timeframe.'
        },
        {
          question: 'Which of these is NOT a common UI component pattern?',
          options: [
            'Modal',
            'Accordion',
            'Database',
            'Carousel'
          ],
          correctAnswer: 2,
          explanation: 'Database is a backend component, not a UI pattern.'
        },
        {
          question: 'What is the purpose of a style guide?',
          options: [
            'To track user behavior',
            'To maintain visual consistency',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Style guides help maintain visual consistency across a product.'
        },
        {
          question: 'Which of these is a common UX metric?',
          options: [
            'Time on Task',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'Time on Task measures how long users take to complete specific tasks.'
        }
      ]
    },
    uiuxExpert: {
      title: 'UI/UX Design - Advanced',
      description: 'Advanced concepts and best practices in user interface and experience design',
      difficulty: 'Advanced',
      category: 'Design',
      questions: [
        {
          question: 'What is the purpose of a design token?',
          options: [
            'To create animations',
            'To maintain design system consistency',
            'To collect user data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Design tokens are the visual design atoms of a design system.'
        },
        {
          question: 'Which of these is NOT a common UX research analysis method?',
          options: [
            'Affinity Diagramming',
            'Code Compilation',
            'Thematic Analysis',
            'Journey Mapping'
          ],
          correctAnswer: 1,
          explanation: 'Code Compilation is a development process, not a UX research method.'
        },
        {
          question: 'What is the purpose of a service blueprint?',
          options: [
            'To track user behavior',
            'To visualize service processes and touchpoints',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Service blueprints visualize service processes and identify improvement opportunities.'
        },
        {
          question: 'Which of these is a common accessibility testing tool?',
          options: [
            'WAVE',
            'Photoshop',
            'Illustrator',
            'Figma'
          ],
          correctAnswer: 0,
          explanation: 'WAVE is a web accessibility evaluation tool.'
        },
        {
          question: 'What is the purpose of a design system audit?',
          options: [
            'To write code',
            'To evaluate and improve design system implementation',
            'To collect data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Design system audits help identify gaps and improvement opportunities.'
        },
        {
          question: 'Which of these is NOT a common UX research synthesis method?',
          options: [
            'Persona Creation',
            'Code Review',
            'Empathy Mapping',
            'User Story Mapping'
          ],
          correctAnswer: 1,
          explanation: 'Code Review is a development practice, not a UX research method.'
        },
        {
          question: 'What is the purpose of a design system governance model?',
          options: [
            'To track user behavior',
            'To manage design system evolution and adoption',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Governance models help manage design system evolution and adoption.'
        },
        {
          question: 'Which of these is a common UX research recruitment method?',
          options: [
            'User Interviews',
            'Code Compilation',
            'Database Query',
            'API Testing'
          ],
          correctAnswer: 0,
          explanation: 'User Interviews are a common method for recruiting research participants.'
        }
      ]
    },
    dataScienceBeginner: {
      title: 'Data Science Fundamentals - Beginner',
      description: 'Basic concepts of data science and machine learning',
      difficulty: 'Beginner',
      category: 'Data Science',
      questions: [
        {
          question: 'What is the purpose of data preprocessing?',
          options: [
            'To make data more complex',
            'To clean and prepare data for analysis',
            'To delete data',
            'To create visualizations'
          ],
          correctAnswer: 1,
          explanation: 'Data preprocessing involves cleaning and preparing data for analysis to improve model performance.'
        },
        {
          question: 'Which of these is NOT a supervised learning algorithm?',
          options: [
            'Linear Regression',
            'K-means Clustering',
            'Decision Trees',
            'Support Vector Machines'
          ],
          correctAnswer: 1,
          explanation: 'K-means Clustering is an unsupervised learning algorithm as it doesn\'t require labeled data.'
        },
        {
          question: 'What is the purpose of a confusion matrix?',
          options: [
            'To visualize data',
            'To evaluate classification model performance',
            'To clean data',
            'To store data'
          ],
          correctAnswer: 1,
          explanation: 'A confusion matrix is used to evaluate the performance of a classification model.'
        },
        {
          question: 'Which of these is a common data visualization tool?',
          options: [
            'Tableau',
            'Photoshop',
            'Word',
            'Excel'
          ],
          correctAnswer: 0,
          explanation: 'Tableau is a popular data visualization tool used in data science.'
        },
        {
          question: 'What is overfitting in machine learning?',
          options: [
            'When a model performs well on training data but poorly on new data',
            'When a model is too simple',
            'When data is clean',
            'When visualization is clear'
          ],
          correctAnswer: 0,
          explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and performs poorly on new data.'
        },
        {
          question: 'Which of these is NOT a common data type in data science?',
          options: [
            'Numerical',
            'Categorical',
            'Textual',
            'Musical'
          ],
          correctAnswer: 3,
          explanation: 'Musical is not a common data type in data science, though audio data can be analyzed.'
        },
        {
          question: 'What is the purpose of feature scaling?',
          options: [
            'To make features comparable',
            'To delete features',
            'To create new features',
            'To visualize features'
          ],
          correctAnswer: 0,
          explanation: 'Feature scaling is used to make features comparable by bringing them to the same scale.'
        },
        {
          question: 'Which of these is a common evaluation metric for regression models?',
          options: [
            'Accuracy',
            'Mean Squared Error',
            'Precision',
            'Recall'
          ],
          correctAnswer: 1,
          explanation: 'Mean Squared Error is a common evaluation metric for regression models.'
        }
      ]
    },
    dataScienceIntermediate: {
      title: 'Data Science - Intermediate',
      description: 'Intermediate concepts in data science and machine learning',
      difficulty: 'Intermediate',
      category: 'Data Science',
      questions: [
        {
          question: 'What is the purpose of cross-validation?',
          options: [
            'To delete data',
            'To evaluate model performance',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'Cross-validation helps evaluate model performance and prevent overfitting.'
        },
        {
          question: 'Which of these is NOT a common feature selection method?',
          options: [
            'Recursive Feature Elimination',
            'Principal Component Analysis',
            'Code Compilation',
            'Lasso Regression'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a feature selection method.'
        },
        {
          question: 'What is the purpose of a confusion matrix?',
          options: [
            'To visualize data',
            'To evaluate classification model performance',
            'To clean data',
            'To store data'
          ],
          correctAnswer: 1,
          explanation: 'Confusion matrices help evaluate classification model performance.'
        },
        {
          question: 'Which of these is a common dimensionality reduction technique?',
          options: [
            't-SNE',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 't-SNE is a common technique for visualizing high-dimensional data.'
        },
        {
          question: 'What is the purpose of regularization in machine learning?',
          options: [
            'To delete data',
            'To prevent overfitting',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'Regularization helps prevent overfitting by adding penalty terms.'
        },
        {
          question: 'Which of these is NOT a common ensemble learning method?',
          options: [
            'Random Forest',
            'Gradient Boosting',
            'Code Compilation',
            'Bagging'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not an ensemble learning method.'
        },
        {
          question: 'What is the purpose of hyperparameter tuning?',
          options: [
            'To track model behavior',
            'To optimize model performance',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Hyperparameter tuning helps optimize model performance.'
        },
        {
          question: 'Which of these is a common evaluation metric for classification models?',
          options: [
            'F1 Score',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'F1 Score is a common metric for evaluating classification models.'
        }
      ]
    },
    dataScienceExpert: {
      title: 'Data Science - Advanced',
      description: 'Advanced concepts and techniques in data science and machine learning',
      difficulty: 'Advanced',
      category: 'Data Science',
      questions: [
        {
          question: 'What is the purpose of a transformer model in NLP?',
          options: [
            'To delete data',
            'To process sequential data with attention mechanisms',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'Transformer models use attention mechanisms to process sequential data efficiently.'
        },
        {
          question: 'Which of these is NOT a common deep learning architecture?',
          options: [
            'Convolutional Neural Network',
            'Recurrent Neural Network',
            'Code Compilation',
            'Transformer'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a deep learning architecture.'
        },
        {
          question: 'What is the purpose of transfer learning?',
          options: [
            'To track model behavior',
            'To leverage pre-trained models for new tasks',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Transfer learning helps leverage pre-trained models for new tasks.'
        },
        {
          question: 'Which of these is a common technique for handling imbalanced datasets?',
          options: [
            'SMOTE',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 'SMOTE is a common technique for handling imbalanced datasets.'
        },
        {
          question: 'What is the purpose of a generative adversarial network (GAN)?',
          options: [
            'To delete data',
            'To generate new data samples',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'GANs are used to generate new data samples that resemble training data.'
        },
        {
          question: 'Which of these is NOT a common reinforcement learning algorithm?',
          options: [
            'Q-Learning',
            'Deep Q-Network',
            'Code Compilation',
            'Policy Gradient'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a reinforcement learning algorithm.'
        },
        {
          question: 'What is the purpose of attention mechanisms in deep learning?',
          options: [
            'To track model behavior',
            'To focus on relevant parts of input data',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Attention mechanisms help models focus on relevant parts of input data.'
        },
        {
          question: 'Which of these is a common technique for model interpretability?',
          options: [
            'SHAP',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'SHAP is a common technique for explaining model predictions.'
        }
      ]
    },
    mobileDevBeginner: {
      title: 'Mobile App Development - Beginner',
      description: 'Fundamentals of mobile application development',
      difficulty: 'Beginner',
      category: 'Mobile Development',
      questions: [
        {
          question: 'Which of these is NOT a mobile app development platform?',
          options: [
            'React Native',
            'Flutter',
            'Xamarin',
            'Photoshop'
          ],
          correctAnswer: 3,
          explanation: 'Photoshop is a design tool, not a mobile app development platform.'
        },
        {
          question: 'What is the purpose of a mobile app\'s splash screen?',
          options: [
            'To show ads',
            'To display while the app loads',
            'To collect user data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'A splash screen is displayed while the app loads its resources.'
        },
        {
          question: 'Which of these is a common mobile app architecture pattern?',
          options: [
            'MVC',
            'ABC',
            'XYZ',
            '123'
          ],
          correctAnswer: 0,
          explanation: 'MVC (Model-View-Controller) is a common architecture pattern in mobile app development.'
        },
        {
          question: 'What is the purpose of an API in mobile app development?',
          options: [
            'To store data',
            'To provide interface for communication',
            'To create UI',
            'To delete data'
          ],
          correctAnswer: 1,
          explanation: 'APIs provide interfaces for communication between different software components.'
        },
        {
          question: 'Which of these is NOT a mobile app testing type?',
          options: [
            'Unit Testing',
            'Integration Testing',
            'UI Testing',
            'Music Testing'
          ],
          correctAnswer: 3,
          explanation: 'Music Testing is not a standard type of mobile app testing.'
        },
        {
          question: 'What is the purpose of a mobile app\'s manifest file?',
          options: [
            'To store user data',
            'To define app configuration',
            'To create animations',
            'To show ads'
          ],
          correctAnswer: 1,
          explanation: 'The manifest file defines the app\'s configuration and requirements.'
        },
        {
          question: 'Which of these is a common mobile app state management solution?',
          options: [
            'Redux',
            'Blueux',
            'Greenux',
            'Yellowux'
          ],
          correctAnswer: 0,
          explanation: 'Redux is a popular state management solution for mobile apps.'
        },
        {
          question: 'What is the purpose of a mobile app\'s navigation stack?',
          options: [
            'To store data',
            'To manage screen transitions',
            'To create animations',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'The navigation stack manages screen transitions and history in a mobile app.'
        }
      ]
    },
    mobileDevIntermediate: {
      title: 'Mobile App Development - Intermediate',
      description: 'Intermediate concepts in mobile application development',
      difficulty: 'Intermediate',
      category: 'Mobile Development',
      questions: [
        {
          question: 'What is the purpose of a mobile app\'s architecture pattern?',
          options: [
            'To show ads',
            'To organize code and improve maintainability',
            'To collect user data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Architecture patterns help organize code and improve maintainability.'
        },
        {
          question: 'Which of these is NOT a common mobile app testing framework?',
          options: [
            'XCTest',
            'Espresso',
            'Code Compilation',
            'Detox'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a testing framework.'
        },
        {
          question: 'What is the purpose of a mobile app\'s dependency injection?',
          options: [
            'To track user behavior',
            'To manage dependencies and improve testability',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Dependency injection helps manage dependencies and improve testability.'
        },
        {
          question: 'Which of these is a common mobile app state management solution?',
          options: [
            'Redux',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 'Redux is a popular state management solution for mobile apps.'
        },
        {
          question: 'What is the purpose of a mobile app\'s navigation component?',
          options: [
            'To store data',
            'To manage screen transitions',
            'To create animations',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Navigation components help manage screen transitions in mobile apps.'
        },
        {
          question: 'Which of these is NOT a common mobile app architecture pattern?',
          options: [
            'MVVM',
            'MVC',
            'Code Compilation',
            'Clean Architecture'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not an architecture pattern.'
        },
        {
          question: 'What is the purpose of a mobile app\'s persistence layer?',
          options: [
            'To track user behavior',
            'To store and retrieve data',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Persistence layers help store and retrieve data in mobile apps.'
        },
        {
          question: 'Which of these is a common mobile app performance optimization technique?',
          options: [
            'Lazy Loading',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'Lazy Loading is a common technique for optimizing mobile app performance.'
        }
      ]
    },
    mobileDevExpert: {
      title: 'Mobile App Development - Advanced',
      description: 'Advanced concepts and best practices in mobile application development',
      difficulty: 'Advanced',
      category: 'Mobile Development',
      questions: [
        {
          question: 'What is the purpose of a mobile app\'s modular architecture?',
          options: [
            'To show ads',
            'To improve scalability and maintainability',
            'To collect user data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Modular architecture helps improve scalability and maintainability.'
        },
        {
          question: 'Which of these is NOT a common mobile app security practice?',
          options: [
            'Code Obfuscation',
            'SSL Pinning',
            'Code Compilation',
            'Biometric Authentication'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a security practice.'
        },
        {
          question: 'What is the purpose of a mobile app\'s offline-first architecture?',
          options: [
            'To track user behavior',
            'To provide functionality without internet connection',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Offline-first architecture enables app functionality without internet connection.'
        },
        {
          question: 'Which of these is a common mobile app performance monitoring tool?',
          options: [
            'Firebase Performance',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 'Firebase Performance is a common tool for monitoring mobile app performance.'
        },
        {
          question: 'What is the purpose of a mobile app\'s continuous integration pipeline?',
          options: [
            'To store data',
            'To automate build and testing processes',
            'To create animations',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'CI pipelines help automate build and testing processes.'
        },
        {
          question: 'Which of these is NOT a common mobile app architecture pattern?',
          options: [
            'VIPER',
            'Clean Architecture',
            'Code Compilation',
            'MVVM'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not an architecture pattern.'
        },
        {
          question: 'What is the purpose of a mobile app\'s analytics implementation?',
          options: [
            'To track user behavior',
            'To gather insights and improve user experience',
            'To collect data',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Analytics help gather insights and improve user experience.'
        },
        {
          question: 'Which of these is a common mobile app testing strategy?',
          options: [
            'A/B Testing',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'A/B Testing is a common strategy for testing mobile app features.'
        }
      ]
    },
    digitalMarketingBeginner: {
      title: 'Digital Marketing Fundamentals',
      description: 'Basic concepts of digital marketing and online advertising',
      difficulty: 'Beginner',
      category: 'Marketing',
      questions: [
        {
          question: 'What is SEO?',
          options: [
            'Search Engine Optimization',
            'Social Engagement Optimization',
            'System Error Optimization',
            'Software Engineering Optimization'
          ],
          correctAnswer: 0,
          explanation: 'SEO stands for Search Engine Optimization, which improves website visibility in search results.'
        },
        {
          question: 'Which of these is NOT a social media platform?',
          options: [
            'Facebook',
            'Twitter',
            'LinkedIn',
            'Microsoft Word'
          ],
          correctAnswer: 3,
          explanation: 'Microsoft Word is a word processing software, not a social media platform.'
        },
        {
          question: 'What is the purpose of a call-to-action (CTA) in digital marketing?',
          options: [
            'To confuse users',
            'To guide users to take a specific action',
            'To collect data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'CTAs guide users to take specific actions like signing up or making a purchase.'
        },
        {
          question: 'Which of these is a common email marketing metric?',
          options: [
            'Open Rate',
            'Close Rate',
            'Delete Rate',
            'Ignore Rate'
          ],
          correctAnswer: 0,
          explanation: 'Open Rate measures how many recipients open an email.'
        },
        {
          question: 'What is the purpose of A/B testing in digital marketing?',
          options: [
            'To compare two versions of a marketing element',
            'To delete content',
            'To create content',
            'To ignore users'
          ],
          correctAnswer: 0,
          explanation: 'A/B testing compares two versions of a marketing element to determine which performs better.'
        },
        {
          question: 'Which of these is NOT a digital marketing channel?',
          options: [
            'Email Marketing',
            'Social Media',
            'Content Marketing',
            'Paper Mail'
          ],
          correctAnswer: 3,
          explanation: 'Paper Mail is traditional marketing, not digital marketing.'
        },
        {
          question: 'What is the purpose of a landing page in digital marketing?',
          options: [
            'To collect user information',
            'To convert visitors into leads or customers',
            'To show errors',
            'To delete data'
          ],
          correctAnswer: 1,
          explanation: 'Landing pages are designed to convert visitors into leads or customers.'
        },
        {
          question: 'Which of these is a common content marketing format?',
          options: [
            'Blog Posts',
            'TV Commercials',
            'Radio Ads',
            'Billboards'
          ],
          correctAnswer: 0,
          explanation: 'Blog Posts are a common format in content marketing.'
        }
      ]
    },
    digitalMarketingIntermediate: {
      title: 'Digital Marketing - Intermediate',
      description: 'Intermediate concepts in digital marketing and online advertising',
      difficulty: 'Intermediate',
      category: 'Marketing',
      questions: [
        {
          question: 'What is the purpose of a marketing funnel?',
          options: [
            'To confuse users',
            'To guide users through the customer journey',
            'To collect data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Marketing funnels help guide users through the customer journey.'
        },
        {
          question: 'Which of these is NOT a common digital marketing metric?',
          options: [
            'Conversion Rate',
            'Click-Through Rate',
            'Code Compilation',
            'Return on Ad Spend'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a marketing metric.'
        },
        {
          question: 'What is the purpose of a marketing automation platform?',
          options: [
            'To track user behavior',
            'To automate marketing tasks and workflows',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Marketing automation platforms help automate tasks and workflows.'
        },
        {
          question: 'Which of these is a common content marketing strategy?',
          options: [
            'Content Calendar',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 'Content Calendars help plan and organize content marketing efforts.'
        },
        {
          question: 'What is the purpose of a marketing attribution model?',
          options: [
            'To delete data',
            'To assign credit to marketing touchpoints',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'Attribution models help assign credit to marketing touchpoints.'
        },
        {
          question: 'Which of these is NOT a common social media marketing strategy?',
          options: [
            'Influencer Marketing',
            'Community Management',
            'Code Compilation',
            'Content Calendar'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a marketing strategy.'
        },
        {
          question: 'What is the purpose of a marketing persona?',
          options: [
            'To track user behavior',
            'To represent target audience segments',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Marketing personas help represent target audience segments.'
        },
        {
          question: 'Which of these is a common email marketing metric?',
          options: [
            'Open Rate',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'Open Rate measures how many recipients open an email.'
        }
      ]
    },
    digitalMarketingExpert: {
      title: 'Digital Marketing - Advanced',
      description: 'Advanced concepts and strategies in digital marketing',
      difficulty: 'Advanced',
      category: 'Marketing',
      questions: [
        {
          question: 'What is the purpose of a marketing attribution model?',
          options: [
            'To confuse users',
            'To assign credit to marketing touchpoints',
            'To collect data',
            'To show errors'
          ],
          correctAnswer: 1,
          explanation: 'Attribution models help assign credit to marketing touchpoints.'
        },
        {
          question: 'Which of these is NOT a common marketing automation workflow?',
          options: [
            'Lead Nurturing',
            'Customer Onboarding',
            'Code Compilation',
            'Abandoned Cart Recovery'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not a marketing workflow.'
        },
        {
          question: 'What is the purpose of a marketing data warehouse?',
          options: [
            'To track user behavior',
            'To centralize and analyze marketing data',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Marketing data warehouses help centralize and analyze marketing data.'
        },
        {
          question: 'Which of these is a common marketing analytics tool?',
          options: [
            'Google Analytics 4',
            'HTML',
            'CSS',
            'JavaScript'
          ],
          correctAnswer: 0,
          explanation: 'Google Analytics 4 is a common tool for marketing analytics.'
        },
        {
          question: 'What is the purpose of a marketing automation platform?',
          options: [
            'To delete data',
            'To automate marketing tasks and workflows',
            'To create visualizations',
            'To collect data'
          ],
          correctAnswer: 1,
          explanation: 'Marketing automation platforms help automate tasks and workflows.'
        },
        {
          question: 'Which of these is NOT a common marketing attribution model?',
          options: [
            'First-Touch',
            'Last-Touch',
            'Code Compilation',
            'Multi-Touch'
          ],
          correctAnswer: 2,
          explanation: 'Code Compilation is a development process, not an attribution model.'
        },
        {
          question: 'What is the purpose of a marketing data pipeline?',
          options: [
            'To track user behavior',
            'To process and transform marketing data',
            'To collect analytics',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Marketing data pipelines help process and transform marketing data.'
        },
        {
          question: 'Which of these is a common marketing automation metric?',
          options: [
            'Engagement Rate',
            'Code Coverage',
            'Memory Usage',
            'CPU Load'
          ],
          correctAnswer: 0,
          explanation: 'Engagement Rate measures how users interact with marketing content.'
        }
      ]
    },
    systemDesign: {
      title: 'System Design Fundamentals',
      description: 'Basic concepts and principles of system design',
      difficulty: 'Beginner',
      category: 'Computer Science',
      questions: [
        {
          question: 'What is the primary goal of system design?',
          options: [
            'To create beautiful user interfaces',
            'To build scalable and maintainable systems',
            'To write efficient algorithms',
            'To debug existing systems'
          ],
          correctAnswer: 1,
          explanation: 'The primary goal of system design is to create systems that are scalable, maintainable, and can handle growth while meeting performance requirements.'
        },
        {
          question: 'Which of these is NOT a common system design pattern?',
          options: [
            'Microservices',
            'Monolithic',
            'Serverless',
            'Object-oriented'
          ],
          correctAnswer: 3,
          explanation: 'Object-oriented is a programming paradigm, not a system design pattern. Common system design patterns include microservices, monolithic, and serverless architectures.'
        },
        {
          question: 'What does CAP theorem stand for?',
          options: [
            'Consistency, Availability, Partition tolerance',
            'Complexity, Accuracy, Performance',
            'Capacity, Access, Performance',
            'Control, Access, Protection'
          ],
          correctAnswer: 0,
          explanation: 'CAP theorem states that a distributed system can only guarantee two out of three properties: Consistency, Availability, and Partition tolerance.'
        }
      ]
    },
    cloudComputing: {
      title: 'Cloud Computing Basics',
      description: 'Introduction to cloud computing concepts and services',
      difficulty: 'Beginner',
      category: 'Cloud',
      questions: [
        {
          question: 'Which of these is NOT a cloud service model?',
          options: [
            'IaaS (Infrastructure as a Service)',
            'PaaS (Platform as a Service)',
            'SaaS (Software as a Service)',
            'BaaS (Backend as a Service)'
          ],
          correctAnswer: 3,
          explanation: 'The three main cloud service models are IaaS, PaaS, and SaaS. BaaS is not a standard cloud service model.'
        },
        {
          question: 'What is the main advantage of cloud computing?',
          options: [
            'Lower initial costs',
            'Scalability',
            'Automatic updates',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'Cloud computing offers multiple advantages including lower initial costs, scalability, automatic updates, and reduced maintenance overhead.'
        },
        {
          question: 'What does "elasticity" mean in cloud computing?',
          options: [
            'The ability to stretch data',
            'The ability to automatically scale resources',
            'The flexibility of cloud storage',
            'The speed of cloud networks'
          ],
          correctAnswer: 1,
          explanation: 'Elasticity refers to the ability to automatically scale resources up or down based on demand.'
        },
        {
          question: 'Which of these is a common cloud deployment model?',
          options: [
            'Public Cloud',
            'Private Cloud',
            'Hybrid Cloud',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'Common cloud deployment models include Public, Private, and Hybrid clouds.'
        },
        {
          question: 'What is the purpose of a cloud load balancer?',
          options: [
            'To store data',
            'To distribute network traffic',
            'To encrypt data',
            'To compress files'
          ],
          correctAnswer: 1,
          explanation: 'A cloud load balancer distributes network traffic across multiple servers to ensure reliability and performance.'
        }
      ]
    },
    devOps: {
      title: 'DevOps Practices',
      description: 'Fundamental concepts and practices in DevOps',
      difficulty: 'Intermediate',
      category: 'DevOps',
      questions: [
        {
          question: 'What is the main goal of DevOps?',
          options: [
            'To automate everything',
            'To improve collaboration between development and operations',
            'To reduce costs',
            'To increase security'
          ],
          correctAnswer: 1,
          explanation: 'The main goal of DevOps is to improve collaboration between development and operations teams to deliver software more efficiently and reliably.'
        },
        {
          question: 'Which tool is commonly used for containerization?',
          options: [
            'Jenkins',
            'Docker',
            'Kubernetes',
            'Ansible'
          ],
          correctAnswer: 1,
          explanation: 'Docker is the most widely used containerization tool, while Kubernetes is used for container orchestration.'
        },
        {
          question: 'What is Continuous Integration (CI)?',
          options: [
            'A type of database',
            'A practice of merging code changes frequently',
            'A cloud service',
            'A programming language'
          ],
          correctAnswer: 1,
          explanation: 'CI is the practice of frequently merging code changes into a shared repository, with automated testing.'
        },
        {
          question: 'Which of these is NOT a DevOps practice?',
          options: [
            'Infrastructure as Code',
            'Continuous Deployment',
            'Manual Testing',
            'Automated Testing'
          ],
          correctAnswer: 2,
          explanation: 'Manual testing is not a DevOps practice as it contradicts the automation principle of DevOps.'
        },
        {
          question: 'What is the purpose of a CI/CD pipeline?',
          options: [
            'To store code',
            'To automate the software delivery process',
            'To manage databases',
            'To create documentation'
          ],
          correctAnswer: 1,
          explanation: 'A CI/CD pipeline automates the process of building, testing, and deploying software.'
        }
      ]
    },
    cybersecurity: {
      title: 'Cybersecurity Fundamentals',
      description: 'Basic concepts and practices in cybersecurity',
      difficulty: 'Beginner',
      category: 'Security',
      questions: [
        {
          question: 'What is the most common type of cyber attack?',
          options: [
            'DDoS',
            'Phishing',
            'SQL Injection',
            'Man-in-the-middle'
          ],
          correctAnswer: 1,
          explanation: 'Phishing is the most common type of cyber attack, where attackers attempt to trick users into revealing sensitive information.'
        },
        {
          question: 'What does SSL/TLS provide?',
          options: [
            'Data encryption',
            'Authentication',
            'Data integrity',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'SSL/TLS provides encryption, authentication, and data integrity for secure communication over networks.'
        },
        {
          question: 'What is two-factor authentication (2FA)?',
          options: [
            'Using two passwords',
            'Using two different authentication methods',
            'Using two security questions',
            'Using two email addresses'
          ],
          correctAnswer: 1,
          explanation: '2FA requires two different authentication methods, typically something you know (password) and something you have (phone or token).'
        },
        {
          question: 'Which of these is NOT a common security measure?',
          options: [
            'Firewall',
            'Antivirus',
            'Screen Saver',
            'Encryption'
          ],
          correctAnswer: 2,
          explanation: 'Screen savers are not a security measure, though they can be used to lock screens after inactivity.'
        },
        {
          question: 'What is the purpose of a VPN?',
          options: [
            'To increase internet speed',
            'To create a secure, encrypted connection',
            'To store files',
            'To manage passwords'
          ],
          correctAnswer: 1,
          explanation: 'A VPN creates a secure, encrypted connection over a less secure network, such as the internet.'
        }
      ]
    },
    machineLearning: {
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning concepts and algorithms',
      difficulty: 'Intermediate',
      category: 'AI/ML',
      questions: [
        {
          question: 'What is supervised learning?',
          options: [
            'Learning without any guidance',
            'Learning from labeled data',
            'Learning from unlabeled data',
            'Learning from reinforcement'
          ],
          correctAnswer: 1,
          explanation: 'Supervised learning involves training a model using labeled data, where the correct answers are provided during training.'
        },
        {
          question: 'Which of these is NOT a machine learning algorithm?',
          options: [
            'Linear Regression',
            'Decision Tree',
            'Bubble Sort',
            'Neural Network'
          ],
          correctAnswer: 2,
          explanation: 'Bubble Sort is a sorting algorithm, not a machine learning algorithm.'
        },
        {
          question: 'What is overfitting in machine learning?',
          options: [
            'When a model performs too well on training data',
            'When a model is too simple',
            'When data is too clean',
            'When training takes too long'
          ],
          correctAnswer: 0,
          explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and performs poorly on new data.'
        },
        {
          question: 'Which of these is a common machine learning library?',
          options: [
            'TensorFlow',
            'jQuery',
            'Bootstrap',
            'Express'
          ],
          correctAnswer: 0,
          explanation: 'TensorFlow is a popular machine learning library, while the others are web development tools.'
        },
        {
          question: 'What is the purpose of a validation set in machine learning?',
          options: [
            'To train the model',
            'To evaluate model performance during training',
            'To store data',
            'To visualize results'
          ],
          correctAnswer: 1,
          explanation: 'A validation set is used to evaluate model performance during training and tune hyperparameters.'
        }
      ]
    },
    blockchain: {
      title: 'Blockchain Technology',
      description: 'Fundamentals of blockchain and cryptocurrency',
      difficulty: 'Intermediate',
      category: 'Blockchain',
      questions: [
        {
          question: 'What is a blockchain?',
          options: [
            'A type of database',
            'A distributed ledger',
            'A cryptocurrency',
            'A programming language'
          ],
          correctAnswer: 1,
          explanation: 'A blockchain is a distributed ledger that records transactions across multiple computers in a way that is secure, transparent, and tamper-resistant.'
        },
        {
          question: 'What is the purpose of mining in blockchain?',
          options: [
            'To create new blocks',
            'To validate transactions',
            'To earn cryptocurrency',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'Mining serves multiple purposes: creating new blocks, validating transactions, and earning cryptocurrency as a reward.'
        },
        {
          question: 'What is a smart contract?',
          options: [
            'A legal document',
            'A self-executing contract with terms in code',
            'A type of cryptocurrency',
            'A blockchain protocol'
          ],
          correctAnswer: 1,
          explanation: 'A smart contract is a self-executing contract with the terms of the agreement directly written into code.'
        },
        {
          question: 'Which of these is NOT a blockchain consensus mechanism?',
          options: [
            'Proof of Work',
            'Proof of Stake',
            'Proof of Concept',
            'Delegated Proof of Stake'
          ],
          correctAnswer: 2,
          explanation: 'Proof of Concept is not a blockchain consensus mechanism, while the others are commonly used.'
        },
        {
          question: 'What is the purpose of a blockchain wallet?',
          options: [
            'To store physical coins',
            'To store private keys and manage cryptocurrency',
            'To mine cryptocurrency',
            'To validate transactions'
          ],
          correctAnswer: 1,
          explanation: 'A blockchain wallet stores private keys and allows users to manage their cryptocurrency holdings.'
        }
      ]
    },
    iot: {
      title: 'Internet of Things',
      description: 'Basics of IoT devices and applications',
      difficulty: 'Beginner',
      category: 'IoT',
      questions: [
        {
          question: 'What does IoT stand for?',
          options: [
            'Internet of Technology',
            'Internet of Things',
            'Internet of Tools',
            'Internet of Transactions'
          ],
          correctAnswer: 1,
          explanation: 'IoT stands for Internet of Things, referring to the network of physical devices connected to the internet.'
        },
        {
          question: 'Which protocol is commonly used in IoT devices?',
          options: [
            'HTTP',
            'MQTT',
            'FTP',
            'SMTP'
          ],
          correctAnswer: 1,
          explanation: 'MQTT (Message Queuing Telemetry Transport) is a lightweight protocol commonly used in IoT devices for efficient communication.'
        },
        {
          question: 'What is an IoT gateway?',
          options: [
            'A type of router',
            'A device that connects IoT devices to the cloud',
            'A security device',
            'A storage device'
          ],
          correctAnswer: 1,
          explanation: 'An IoT gateway connects IoT devices to the cloud and can perform data processing and security functions.'
        },
        {
          question: 'Which of these is NOT a common IoT application?',
          options: [
            'Smart Home',
            'Industrial Automation',
            'Social Media',
            'Wearable Devices'
          ],
          correctAnswer: 2,
          explanation: 'Social media is not typically considered an IoT application, while the others are common IoT use cases.'
        },
        {
          question: 'What is the main security concern in IoT?',
          options: [
            'Device cost',
            'Data privacy and security',
            'Network speed',
            'Battery life'
          ],
          correctAnswer: 1,
          explanation: 'Data privacy and security are major concerns in IoT due to the large number of connected devices and potential vulnerabilities.'
        }
      ]
    },
    quantumComputing: {
      title: 'Quantum Computing Basics',
      description: 'Introduction to quantum computing concepts',
      difficulty: 'Advanced',
      category: 'Quantum Computing',
      questions: [
        {
          question: 'What is a qubit?',
          options: [
            'A quantum computer',
            'A quantum bit',
            'A quantum algorithm',
            'A quantum gate'
          ],
          correctAnswer: 1,
          explanation: 'A qubit is the basic unit of quantum information, analogous to a classical bit but with quantum properties.'
        },
        {
          question: 'What is quantum superposition?',
          options: [
            'Multiple quantum states existing simultaneously',
            'Quantum entanglement',
            'Quantum tunneling',
            'Quantum measurement'
          ],
          correctAnswer: 0,
          explanation: 'Quantum superposition is the ability of a quantum system to be in multiple states at the same time until measured.'
        },
        {
          question: 'What is quantum entanglement?',
          options: [
            'When qubits are physically connected',
            'When qubits share a quantum state',
            'When qubits are measured',
            'When qubits are initialized'
          ],
          correctAnswer: 1,
          explanation: 'Quantum entanglement occurs when qubits share a quantum state, where the state of one qubit is dependent on the state of another.'
        },
        {
          question: 'Which of these is NOT a quantum computing application?',
          options: [
            'Cryptography',
            'Optimization',
            'Database Management',
            'Machine Learning'
          ],
          correctAnswer: 2,
          explanation: 'Database management is not a primary application of quantum computing, while the others are promising areas.'
        },
        {
          question: 'What is quantum decoherence?',
          options: [
            'The process of measuring qubits',
            'The loss of quantum information to the environment',
            'The initialization of qubits',
            'The entanglement of qubits'
          ],
          correctAnswer: 1,
          explanation: 'Quantum decoherence is the loss of quantum information to the environment, which is a major challenge in quantum computing.'
        }
      ]
    },
    arvr: {
      title: 'AR/VR Development',
      description: 'Fundamentals of Augmented and Virtual Reality',
      difficulty: 'Intermediate',
      category: 'AR/VR',
      questions: [
        {
          question: 'What is the main difference between AR and VR?',
          options: [
            'AR uses headsets, VR doesn\'t',
            'AR overlays digital content on the real world, VR creates a completely virtual environment',
            'AR is more expensive than VR',
            'AR is only for gaming, VR is for business'
          ],
          correctAnswer: 1,
          explanation: 'AR overlays digital content on the real world, while VR creates a completely immersive virtual environment.'
        },
        {
          question: 'Which of these is NOT a common AR/VR development platform?',
          options: [
            'Unity',
            'Unreal Engine',
            'React',
            'ARKit'
          ],
          correctAnswer: 2,
          explanation: 'React is a JavaScript library for building user interfaces, not specifically for AR/VR development.'
        },
        {
          question: 'What is spatial computing?',
          options: [
            'A type of database',
            'Computing that understands and uses physical space',
            'A programming language',
            'A type of processor'
          ],
          correctAnswer: 1,
          explanation: 'Spatial computing refers to computing that understands and uses physical space, which is fundamental to AR/VR.'
        },
        {
          question: 'Which of these is NOT a common AR/VR input method?',
          options: [
            'Hand tracking',
            'Eye tracking',
            'Keyboard input',
            'Voice commands'
          ],
          correctAnswer: 2,
          explanation: 'Keyboard input is not commonly used in AR/VR, while the others are standard input methods.'
        },
        {
          question: 'What is the purpose of a VR headset\'s refresh rate?',
          options: [
            'To display colors',
            'To prevent motion sickness',
            'To store data',
            'To connect to the internet'
          ],
          correctAnswer: 1,
          explanation: 'A high refresh rate in VR headsets helps prevent motion sickness by providing smooth visual updates.'
        }
      ]
    },
    ethicalHacking: {
      title: 'Ethical Hacking',
      description: 'Basics of ethical hacking and penetration testing',
      difficulty: 'Advanced',
      category: 'Security',
      questions: [
        {
          question: 'What is the first phase of ethical hacking?',
          options: [
            'Exploitation',
            'Reconnaissance',
            'Maintaining access',
            'Covering tracks'
          ],
          correctAnswer: 1,
          explanation: 'Reconnaissance is the first phase of ethical hacking, where information about the target is gathered.'
        },
        {
          question: 'What is a white hat hacker?',
          options: [
            'A hacker who works for malicious purposes',
            'A hacker who works legally to find security vulnerabilities',
            'A beginner hacker',
            'A government hacker'
          ],
          correctAnswer: 1,
          explanation: 'A white hat hacker is an ethical hacker who works legally to find and fix security vulnerabilities.'
        },
        {
          question: 'What is penetration testing?',
          options: [
            'Testing pen durability',
            'Simulating cyber attacks to find vulnerabilities',
            'Testing network speed',
            'Checking software compatibility'
          ],
          correctAnswer: 1,
          explanation: 'Penetration testing involves simulating cyber attacks to identify and fix security vulnerabilities.'
        },
        {
          question: 'Which of these is NOT a common penetration testing tool?',
          options: [
            'Metasploit',
            'Wireshark',
            'Microsoft Word',
            'Nmap'
          ],
          correctAnswer: 2,
          explanation: 'Microsoft Word is not a penetration testing tool, while the others are commonly used in security testing.'
        },
        {
          question: 'What is the purpose of a vulnerability assessment?',
          options: [
            'To create vulnerabilities',
            'To identify and classify security vulnerabilities',
            'To test network speed',
            'To install software'
          ],
          correctAnswer: 1,
          explanation: 'A vulnerability assessment identifies and classifies security vulnerabilities in a system.'
        }
      ]
    },
    gameDev: {
      title: 'Game Development',
      description: 'Fundamentals of game development and design',
      difficulty: 'Intermediate',
      category: 'Game Development',
      questions: [
        {
          question: 'What is a game engine?',
          options: [
            'A type of computer',
            'A software framework for creating games',
            'A graphics card',
            'A programming language'
          ],
          correctAnswer: 1,
          explanation: 'A game engine is a software framework designed for the creation and development of video games.'
        },
        {
          question: 'Which of these is NOT a common game development concept?',
          options: [
            'Physics engine',
            'Collision detection',
            'Database management',
            'Sprite animation'
          ],
          correctAnswer: 2,
          explanation: 'Database management is not a core game development concept, though it might be used for game data storage.'
        },
        {
          question: 'What is the purpose of a game loop?',
          options: [
            'To create animations',
            'To handle game updates and rendering',
            'To store game data',
            'To manage user input'
          ],
          correctAnswer: 1,
          explanation: 'The game loop handles game updates and rendering, running continuously during gameplay.'
        },
        {
          question: 'Which of these is NOT a common game development tool?',
          options: [
            'Unity',
            'Unreal Engine',
            'Microsoft Excel',
            'Godot'
          ],
          correctAnswer: 2,
          explanation: 'Microsoft Excel is not a game development tool, while the others are popular game engines.'
        },
        {
          question: 'What is the purpose of a game asset?',
          options: [
            'To store game code',
            'To provide visual and audio content',
            'To manage game logic',
            'To handle user input'
          ],
          correctAnswer: 1,
          explanation: 'Game assets provide visual and audio content for the game, such as models, textures, and sounds.'
        }
      ]
    },
    bigData: {
      title: 'Big Data Analytics',
      description: 'Fundamentals of big data processing and analysis',
      difficulty: 'Advanced',
      category: 'Data Science',
      questions: [
        {
          question: 'What are the three V\'s of Big Data?',
          options: [
            'Volume, Velocity, Variety',
            'Value, Velocity, Volume',
            'Variety, Value, Velocity',
            'Volume, Value, Variety'
          ],
          correctAnswer: 0,
          explanation: 'The three V\'s of Big Data are Volume (amount of data), Velocity (speed of data processing), and Variety (different types of data).'
        },
        {
          question: 'Which tool is commonly used for big data processing?',
          options: [
            'Apache Hadoop',
            'MySQL',
            'MongoDB',
            'PostgreSQL'
          ],
          correctAnswer: 0,
          explanation: 'Apache Hadoop is a framework commonly used for distributed storage and processing of big data.'
        },
        {
          question: 'What is MapReduce?',
          options: [
            'A type of database',
            'A programming model for processing large datasets',
            'A visualization tool',
            'A data storage format'
          ],
          correctAnswer: 1,
          explanation: 'MapReduce is a programming model for processing large datasets in parallel across distributed systems.'
        },
        {
          question: 'Which of these is NOT a big data processing framework?',
          options: [
            'Apache Spark',
            'Apache Flink',
            'Microsoft Word',
            'Apache Storm'
          ],
          correctAnswer: 2,
          explanation: 'Microsoft Word is not a big data processing framework, while the others are commonly used.'
        },
        {
          question: 'What is the purpose of data partitioning in big data?',
          options: [
            'To store data',
            'To improve processing efficiency',
            'To create visualizations',
            'To manage security'
          ],
          correctAnswer: 1,
          explanation: 'Data partitioning improves processing efficiency by dividing data into smaller, manageable chunks.'
        }
      ]
    },
    softwareArchitecture: {
      title: 'Software Architecture',
      description: 'Advanced concepts in software architecture and design patterns',
      difficulty: 'Advanced',
      category: 'Computer Science',
      questions: [
        {
          question: 'What is the SOLID principle in software design?',
          options: [
            'A set of five design principles',
            'A programming language',
            'A database design pattern',
            'A testing methodology'
          ],
          correctAnswer: 0,
          explanation: 'SOLID is an acronym for five design principles that help make software designs more understandable, flexible, and maintainable.'
        },
        {
          question: 'Which of these is NOT a software architecture pattern?',
          options: [
            'Microservices',
            'Monolithic',
            'Event-driven',
            'Object-oriented'
          ],
          correctAnswer: 3,
          explanation: 'Object-oriented is a programming paradigm, not a software architecture pattern.'
        },
        {
          question: 'What is the purpose of a design pattern?',
          options: [
            'To create new programming languages',
            'To provide reusable solutions to common problems',
            'To store data',
            'To manage hardware'
          ],
          correctAnswer: 1,
          explanation: 'Design patterns provide reusable solutions to common software design problems.'
        },
        {
          question: 'Which of these is NOT a common architectural pattern?',
          options: [
            'Layered Architecture',
            'Client-Server',
            'Peer-to-Peer',
            'Linear Programming'
          ],
          correctAnswer: 3,
          explanation: 'Linear Programming is a mathematical optimization technique, not an architectural pattern.'
        },
        {
          question: 'What is the purpose of a service-oriented architecture (SOA)?',
          options: [
            'To create monolithic applications',
            'To build applications as a collection of services',
            'To store data',
            'To manage hardware'
          ],
          correctAnswer: 1,
          explanation: 'SOA builds applications as a collection of services that communicate with each other.'
        }
      ]
    },
    mobileDevAdvanced: {
      title: 'Advanced Mobile Development',
      description: 'Advanced concepts in mobile application development',
      difficulty: 'Advanced',
      category: 'Mobile Development',
      questions: [
        {
          question: 'What is the main advantage of using React Native?',
          options: [
            'Better performance than native apps',
            'Cross-platform development with single codebase',
            'Lower development cost',
            'All of the above'
          ],
          correctAnswer: 1,
          explanation: 'React Native allows developers to write code once and deploy it on both iOS and Android platforms.'
        },
        {
          question: 'What is the purpose of a mobile app architecture?',
          options: [
            'To make the app look beautiful',
            'To organize code and improve maintainability',
            'To increase app size',
            'To reduce development time'
          ],
          correctAnswer: 1,
          explanation: 'A good mobile app architecture helps organize code, improve maintainability, and make the app more scalable.'
        },
        {
          question: 'What is the purpose of a mobile app\'s state management?',
          options: [
            'To store user data',
            'To manage the app\'s data and UI state',
            'To create animations',
            'To handle network requests'
          ],
          correctAnswer: 1,
          explanation: 'State management helps manage the app\'s data and UI state consistently across components.'
        },
        {
          question: 'Which of these is NOT a common mobile app architecture pattern?',
          options: [
            'MVVM',
            'MVC',
            'VIPER',
            'HTML'
          ],
          correctAnswer: 3,
          explanation: 'HTML is a markup language, not a mobile app architecture pattern.'
        },
        {
          question: 'What is the purpose of a mobile app\'s navigation system?',
          options: [
            'To store data',
            'To manage screen transitions and user flow',
            'To create animations',
            'To handle network requests'
          ],
          correctAnswer: 1,
          explanation: 'A navigation system manages screen transitions and user flow within a mobile app.'
        }
      ]
    },
    webSecurity: {
      title: 'Web Security',
      description: 'Advanced concepts in web application security',
      difficulty: 'Advanced',
      category: 'Security',
      questions: [
        {
          question: 'What is Cross-Site Scripting (XSS)?',
          options: [
            'A type of database attack',
            'A type of injection attack',
            'A type of denial of service attack',
            'A type of man-in-the-middle attack'
          ],
          correctAnswer: 1,
          explanation: 'XSS is a type of injection attack where malicious scripts are injected into otherwise benign websites.'
        },
        {
          question: 'What is the purpose of Content Security Policy (CSP)?',
          options: [
            'To improve website performance',
            'To prevent XSS attacks',
            'To encrypt data',
            'To manage cookies'
          ],
          correctAnswer: 1,
          explanation: 'CSP is a security standard that helps prevent XSS attacks by specifying which dynamic resources are allowed to load.'
        },
        {
          question: 'What is SQL Injection?',
          options: [
            'A type of database optimization',
            'A type of code injection attack',
            'A type of network attack',
            'A type of hardware attack'
          ],
          correctAnswer: 1,
          explanation: 'SQL Injection is a code injection technique that exploits security vulnerabilities in database queries.'
        },
        {
          question: 'Which of these is NOT a common web security measure?',
          options: [
            'HTTPS',
            'Input Validation',
            'Screen Resolution',
            'CSRF Tokens'
          ],
          correctAnswer: 2,
          explanation: 'Screen resolution is not a web security measure, while the others are common security practices.'
        },
        {
          question: 'What is the purpose of a security header?',
          options: [
            'To improve website design',
            'To enhance web security',
            'To store data',
            'To create animations'
          ],
          correctAnswer: 1,
          explanation: 'Security headers help enhance web security by providing additional security features.'
        }
      ]
    },
    aiEthics: {
      title: 'AI Ethics',
      description: 'Ethical considerations in artificial intelligence',
      difficulty: 'Intermediate',
      category: 'AI/ML',
      questions: [
        {
          question: 'What is AI bias?',
          options: [
            'A type of machine learning algorithm',
            'Systematic errors in AI systems that create unfair outcomes',
            'A programming error',
            'A hardware limitation'
          ],
          correctAnswer: 1,
          explanation: 'AI bias refers to systematic errors in AI systems that create unfair outcomes, such as privileging one arbitrary group of users over others.'
        },
        {
          question: 'What is the main concern with AI decision-making?',
          options: [
            'Speed of decisions',
            'Transparency and accountability',
            'Cost of implementation',
            'Hardware requirements'
          ],
          correctAnswer: 1,
          explanation: 'The main concern with AI decision-making is ensuring transparency and accountability in how decisions are made.'
        },
        {
          question: 'What is algorithmic fairness?',
          options: [
            'Making algorithms run faster',
            'Ensuring algorithms don\'t discriminate',
            'Making algorithms more complex',
            'Reducing algorithm size'
          ],
          correctAnswer: 1,
          explanation: 'Algorithmic fairness ensures that algorithms don\'t discriminate against certain groups or individuals.'
        },
        {
          question: 'Which of these is NOT an AI ethics principle?',
          options: [
            'Transparency',
            'Fairness',
            'Screen Resolution',
            'Accountability'
          ],
          correctAnswer: 2,
          explanation: 'Screen resolution is not an AI ethics principle, while the others are fundamental principles.'
        },
        {
          question: 'What is the purpose of AI explainability?',
          options: [
            'To make AI systems faster',
            'To make AI decisions understandable to humans',
            'To reduce AI system size',
            'To increase AI system complexity'
          ],
          correctAnswer: 1,
          explanation: 'AI explainability helps make AI decisions understandable to humans, promoting transparency and trust.'
        }
      ]
    },
    cloudNative: {
      title: 'Cloud Native Development',
      description: 'Advanced concepts in cloud-native application development',
      difficulty: 'Advanced',
      category: 'Cloud',
      questions: [
        {
          question: 'What is a container orchestration platform?',
          options: [
            'A tool for managing multiple containers',
            'A type of virtual machine',
            'A cloud storage service',
            'A database management system'
          ],
          correctAnswer: 0,
          explanation: 'A container orchestration platform manages the deployment, scaling, and operation of multiple containers.'
        },
        {
          question: 'What is the main benefit of using microservices architecture?',
          options: [
            'Simpler deployment',
            'Better scalability and maintainability',
            'Lower development cost',
            'Faster execution speed'
          ],
          correctAnswer: 1,
          explanation: 'Microservices architecture provides better scalability and maintainability by breaking down applications into smaller, independent services.'
        },
        {
          question: 'What is the purpose of a service mesh?',
          options: [
            'To store data',
            'To manage service-to-service communication',
            'To create visualizations',
            'To handle user authentication'
          ],
          correctAnswer: 1,
          explanation: 'A service mesh manages service-to-service communication in a microservices architecture.'
        },
        {
          question: 'Which of these is NOT a cloud-native technology?',
          options: [
            'Kubernetes',
            'Docker',
            'Microsoft Word',
            'Istio'
          ],
          correctAnswer: 2,
          explanation: 'Microsoft Word is not a cloud-native technology, while the others are commonly used in cloud-native development.'
        },
        {
          question: 'What is the purpose of a cloud-native database?',
          options: [
            'To store files',
            'To provide scalable and resilient data storage',
            'To create visualizations',
            'To manage user interfaces'
          ],
          correctAnswer: 1,
          explanation: 'Cloud-native databases provide scalable and resilient data storage for cloud applications.'
        }
      ]
    },
    devTools: {
      title: 'Developer Tools',
      description: 'Essential tools and practices for software development',
      difficulty: 'Intermediate',
      category: 'Development',
      questions: [
        {
          question: 'What is the purpose of version control?',
          options: [
            'To track changes in code',
            'To improve code performance',
            'To debug applications',
            'To design user interfaces'
          ],
          correctAnswer: 0,
          explanation: 'Version control systems track changes in code, allowing multiple developers to work together and maintain a history of changes.'
        },
        {
          question: 'Which of these is NOT a common development tool?',
          options: [
            'Git',
            'Docker',
            'Photoshop',
            'VS Code'
          ],
          correctAnswer: 2,
          explanation: 'Photoshop is a graphic design tool, not a development tool. Git, Docker, and VS Code are commonly used in software development.'
        },
        {
          question: 'What is the purpose of a package manager?',
          options: [
            'To manage hardware',
            'To manage software dependencies',
            'To create visualizations',
            'To handle user authentication'
          ],
          correctAnswer: 1,
          explanation: 'Package managers help manage software dependencies and their versions.'
        },
        {
          question: 'Which of these is NOT a common IDE feature?',
          options: [
            'Code completion',
            'Debugging tools',
            'Image editing',
            'Version control integration'
          ],
          correctAnswer: 2,
          explanation: 'Image editing is not a common IDE feature, while the others are standard in modern IDEs.'
        },
        {
          question: 'What is the purpose of a linter?',
          options: [
            'To store code',
            'To analyze code for potential errors',
            'To create visualizations',
            'To manage databases'
          ],
          correctAnswer: 1,
          explanation: 'A linter analyzes code for potential errors and style issues.'
        }
      ]
    }
  };