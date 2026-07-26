import { ResumeData, JobDescriptionData } from '../types';

export const SAMPLE_RESUMES: ResumeData[] = [
  {
    id: 'sample-cs-1',
    name: 'Alex Rivera - CS Student (Software Engineer Intern)',
    uploadDate: new Date().toISOString().split('T')[0],
    fileType: 'sample',
    wordCount: 385,
    text: `ALEX RIVERA
San Francisco, CA | (555) 019-2834 | arivera@university.edu | github.com/alexrivera-dev | linkedin.com/in/alexrivera

EDUCATION
University of California, Berkeley
Bachelor of Science in Computer Science | Expected May 2026
GPA: 3.75 / 4.00
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Web Development, Software Engineering

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, Java, HTML/CSS, SQL
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS, Bootstrap
Developer Tools: Git, GitHub, VS Code, Postman, Docker (Basic), Linux/Unix Command Line, MongoDB, PostgreSQL

EXPERIENCE
Undergraduate Teaching Assistant (Intro to Data Structures) | UC Berkeley | Sep 2024 - Present
- Mentored 40+ undergraduate students during weekly lab sessions on algorithmic problem-solving in Python and Java.
- Graded coding assignments and provided constructive feedback on code cleanliness, time complexity (Big-O), and edge-case handling.
- Conducted 1-on-1 office hours to help struggling students debug segmentation faults and recursion logic.

Software Engineering Fellow | TechLaunch University Program | June 2024 - Aug 2024
- Collaborated in an agile team of 4 developers to build a full-stack web application for university club management.
- Built RESTful API endpoints using Node.js and Express to handle user authentication and event registrations.
- Designed responsive frontend components using React and Tailwind CSS, increasing accessibility scores to 98%.

PROJECTS
DevPulse - Real-time Code Review Platform | React, Node.js, Socket.io, MongoDB | Jan 2025
- Engineered a collaborative code snippet viewer allowing developers to leave inline feedback and live chat.
- Implemented JWT authentication and secure password hashing with bcrypt for user account safety.
- Deployed frontend on Vercel and backend server on Render, supporting 100+ concurrent websocket connections.

SmartSpend - Student Budget Tracker | TypeScript, Next.js, Tailwind CSS, Recharts | Nov 2024
- Built a personal finance tracking dashboard that visually categorizes monthly student expenses using dynamic charts.
- Utilized LocalStorage and browser state management to allow offline data logging without requiring a database.

LEADERSHIP & ACTIVITIES
Vice President of Technical Projects | Campus Computer Science Society | Sep 2023 - Present
- Organized 3 campus-wide hackathons with over 300 total participants and secured sponsors from local tech startups.
- Led weekly technical workshops on Git workflows and web development basics for freshmen.`
  },
  {
    id: 'sample-ds-2',
    name: 'Sophia Chen - Data Science Student (ML / Data Intern)',
    uploadDate: new Date().toISOString().split('T')[0],
    fileType: 'sample',
    wordCount: 360,
    text: `SOPHIA CHEN
New York, NY | sophia.chen@nyu.edu | github.com/sophiachen-ml | linkedin.com/in/sophiachen-data

EDUCATION
New York University (NYU)
Bachelor of Science in Data Science & Mathematics | Expected May 2026
GPA: 3.88 / 4.00
Honors: Dean's List (All Semesters), NYU Data Science Scholarship
Coursework: Machine Learning, Statistical Inference, Linear Algebra, Multivariable Calculus, Data Visualization, Big Data

TECHNICAL SKILLS
Programming & Scripting: Python, R, SQL, Bash
Data Science & ML Libraries: Pandas, NumPy, Scikit-Learn, PyTorch, TensorFlow, Keras, Matplotlib, Seaborn, NLTK
Tools & Platforms: Jupyter Notebooks, Git, Docker, AWS S3 (Basic), Google Colab, Tableau, Excel (Advanced)

PROJECTS
Customer Churn Predictor for Subscription Services | Python, Scikit-Learn, Pandas | Feb 2025
- Developed a machine learning classification model (Random Forest & XGBoost) to predict customer churn using a dataset of 10,000+ telecom users.
- Performed exploratory data analysis (EDA) and feature engineering, discovering that contract length and support ticket frequency were top predictors.
- Achieved an ROC-AUC score of 0.89 and built a Streamlit web app allowing marketing teams to simulate retention strategies.

COVID-19 Global Health Sentiment Analyzer | Python, PyTorch, BERT, NLP | Oct 2024
- Fine-tuned a pre-trained BERT transformer model to classify public sentiment from 50,000+ public social media posts.
- Processed text data using tokenization, lemmatization, and stop-word removal with NLTK.
- Visualized geographical sentiment trends over time using Plotly and presented findings at the university data symposium.

EXPERIENCE
Data Analytics Research Assistant | NYU Urban Analytics Lab | Jun 2024 - Dec 2024
- Cleaned and aggregated massive municipal datasets (NYC Taxi & Limousine Commission) exceeding 5 million rows using Pandas and SQL.
- Created interactive Tableau dashboards demonstrating traffic congestion bottlenecks during peak rush hours.
- Co-authored a technical report summarizing statistical correlation between subway delays and ride-share surge pricing.

LEADERSHIP
Events Coordinator | Women in Data Science (WiDS) NYU Chapter | Sep 2023 - Present
- Organized guest speaker sessions with female data scientists from tech and finance leaders.`
  },
  {
    id: 'sample-pm-3',
    name: 'Marcus Vance - Business/Tech Student (Product Manager Intern)',
    uploadDate: new Date().toISOString().split('T')[0],
    fileType: 'sample',
    wordCount: 370,
    text: `MARCUS VANCE
Austin, TX | m.vance@utexas.edu | linkedin.com/in/marcusvance-pm | marcusvance.portfolio.io

EDUCATION
University of Texas at Austin - McCombs School of Business
Bachelor of Business Administration, Minor in Computer Science | Expected Dec 2025
GPA: 3.82 / 4.00
Activities: Longhorn Entrepreneurship Agency, Texas Product Management Club

TECHNICAL & PRODUCT SKILLS
Product & Strategy: Product Lifecycle Management, User Research, Wireframing, Agile / Scrum Methodology, A/B Testing, Go-to-Market Strategy, PRD Writing
Design & Analytics: Figma, Google Analytics, Mixpanel, Jira, Trello, Notion, Miro, SQL (Basic Queries), Excel
Programming Foundation: Python (Basic), HTML/CSS, JavaScript (Basic understanding for engineering collaboration)

EXPERIENCE
Associate Product Intern | SaaSify Solutions (Startup) | May 2024 - Aug 2024
- Led the ideation and launch of a new "Team Workspace" feature in a B2B project management software, impacting 5,000+ active users.
- Conducted 20+ qualitative user interviews and analyzed quantitative product analytics in Mixpanel to identify drop-off points during onboarding.
- Authored Product Requirement Documents (PRDs) and collaborated with 5 software engineers and 2 UX designers in bi-weekly agile sprints.
- Resulted in a 14% increase in user retention over a 60-day testing window.

Venture Capital Analyst Intern | Longhorn Seed Fund | Jan 2024 - May 2024
- Screened 50+ early-stage collegiate AI and SaaS startup pitch decks and evaluated product-market fit, TAM, and competitive differentiation.
- Performed due diligence and competitive landscape mapping, presenting investment memos to student partners.

PROJECTS
CampusRide - Peer-to-Peer Student Carpooling Concept | Figma, UX Research, SQL | Oct 2024
- Spearheaded user discovery for a campus carpooling mobile app designed to reduce parking congestion at UT Austin.
- Designed high-fidelity interactive clickable prototypes in Figma and tested usability with 35 undergrad students.
- Formulated key performance indicators (KPIs) including Daily Active Rides and Driver Match Latency.`
  }
];

export const SAMPLE_JOBS: JobDescriptionData[] = [
  {
    id: 'jd-google-swe',
    title: 'Software Engineering Intern, Summer 2026',
    companyName: 'Tech Giant Cloud & Search (e.g. Google / Microsoft)',
    dateAdded: new Date().toISOString().split('T')[0],
    experienceLevel: 'Internship / Undergraduate',
    requiredTechnicalSkills: ['Java', 'C++', 'Python', 'Data Structures', 'Algorithms', 'System Design Basics', 'Git', 'Linux/Unix'],
    requiredSoftSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability'],
    keyResponsibilities: [
      'Research, conceive and develop software applications to extend and improve product offerings.',
      'Contribute to a wide variety of projects utilizing natural language processing, artificial intelligence, data compression, machine learning and search technologies.',
      'Collaborate on scalability issues involving access to massive amounts of data and information.',
      'Participate in code reviews and write clean, maintainable, unit-tested code.'
    ],
    minimumQualifications: [
      'Currently enrolled in a Bachelor\'s or Master\'s degree program in Computer Science or a related technical field.',
      'Experience working with Data Structures or Algorithms (e.g., in coursework, university projects, or open-source).',
      'Experience programming in one or more of the following languages: C, C++, Java, Python, JavaScript, TypeScript, or Go.'
    ],
    preferredQualifications: [
      'Experience with web technologies (React, Node.js, HTML/CSS) or cloud infrastructure (AWS/GCP).',
      'Previous internship or research experience in software engineering.',
      'Demonstrated passion for technology through hackathons or GitHub open source contributions.'
    ],
    text: `Job Title: Software Engineering Intern, Summer 2026
Company: Leading Global Tech Cloud & Systems
Location: Mountain View, CA / New York, NY / Seattle, WA (Hybrid)

About the Job:
As a Software Engineering Intern, you will work on our core product teams, building scalable software solutions that impact millions of users globally. You will be paired with a dedicated mentor and work alongside experienced engineers on real-world engineering challenges.

Minimum Qualifications:
- Currently pursuing a Bachelor’s or Master’s degree in Computer Science, Computer Engineering, or related technical field.
- Strong foundation in computer science fundamentals including Data Structures, Algorithms, and Object-Oriented Design.
- Proficiency in at least one general-purpose programming language such as Python, Java, C++, TypeScript, or Go.
- Experience with Git version control and collaborative development environments.

Preferred Qualifications:
- Practical experience building full-stack web applications using modern frameworks (e.g., React, Next.js, Node.js).
- Familiarity with REST APIs, SQL/NoSQL databases, and cloud deployment concepts (Docker, Kubernetes, AWS/GCP).
- Strong communication skills and demonstrated leadership in campus tech clubs, hackathons, or open-source projects.

Responsibilities:
- Write clean, robust, scalable, and well-tested code in Python, Java, or TypeScript.
- Participate in architectural discussions, sprint planning, and rigorous peer code reviews.
- Troubleshoot and debug complex distributed systems and performance bottlenecks.
- Present final internship project outcomes to engineering directors and team leads at the conclusion of the program.`
  },
  {
    id: 'jd-ai-ml-intern',
    title: 'Machine Learning & Data Science Intern, Fall/Summer 2026',
    companyName: 'AI Analytics & Fintech Enterprise',
    dateAdded: new Date().toISOString().split('T')[0],
    experienceLevel: 'Internship / Junior Data Scientist',
    requiredTechnicalSkills: ['Python', 'SQL', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Visualization (Tableau/Matplotlib)', 'Git'],
    requiredSoftSkills: ['Analytical Thinking', 'Curiosity', 'Cross-functional Communication', 'Attention to Detail'],
    keyResponsibilities: [
      'Build and evaluate predictive machine learning models for customer segmentation and fraud detection.',
      'Perform exploratory data analysis (EDA) on large SQL databases to extract actionable business insights.',
      'Collaborate with data engineers to clean, preprocess, and construct robust ETL data pipelines.',
      'Create visual dashboards and reports to communicate complex statistical findings to non-technical stakeholders.'
    ],
    minimumQualifications: [
      'Enrolled in a BS or MS program in Data Science, Statistics, Computer Science, Mathematics, or related quantitative field.',
      'Solid programming experience in Python and SQL for data manipulation.',
      'Academic or practical experience with machine learning libraries (Scikit-Learn, Pandas, NumPy).'
    ],
    preferredQualifications: [
      'Hands-on experience with deep learning frameworks (PyTorch or TensorFlow) and Natural Language Processing (NLP).',
      'Familiarity with cloud platforms (AWS S3, SageMaker, or GCP BigQuery) and Docker.',
      'Experience using Tableau, Power BI, or Streamlit for interactive data applications.'
    ],
    text: `Job Title: Machine Learning & Data Science Intern
Company: NextGen AI Analytics & Financial Technologies
Location: New York, NY / Remote

Role Overview:
We are looking for a passionate Data Science / Machine Learning Intern to join our Artificial Intelligence group. You will get hands-on experience working with massive financial datasets, developing predictive algorithms, and deploying machine learning pipelines that power our core decision engines.

What You Will Do:
- Design, train, and validate machine learning models (classification, regression, clustering) using Python, Scikit-Learn, and PyTorch.
- Query and transform multi-million row datasets using advanced SQL and Pandas.
- Conduct A/B testing statistical analysis to evaluate feature performance and user engagement metrics.
- Build automated data visualization dashboards using Streamlit or Tableau for executive leadership.
- Work closely with software engineers to integrate ML models into production REST APIs.

What We Look For:
- Currently enrolled in a Bachelor’s or Master’s program in Data Science, Computer Science, Statistics, or Applied Math.
- Proven mastery of Python data science ecosystem (Pandas, NumPy, Scikit-Learn, Matplotlib/Seaborn).
- Experience writing complex SQL queries (JOINs, window functions, aggregations).
- Understanding of machine learning concepts: cross-validation, overfitting/underfitting, regularization, and gradient descent.
- Strong storytelling skills: ability to translate numbers into compelling narrative recommendations.`
  },
  {
    id: 'jd-pm-intern',
    title: 'Associate Product Manager (APM) Intern, Summer 2026',
    companyName: 'High-Growth SaaS & E-Commerce Platform',
    dateAdded: new Date().toISOString().split('T')[0],
    experienceLevel: 'Undergraduate Internship',
    requiredTechnicalSkills: ['Figma', 'Product Requirements Documents (PRDs)', 'SQL / Data Analytics', 'A/B Testing', 'Agile/Scrum Workflows', 'User Research', 'Jira / Notion'],
    requiredSoftSkills: ['Empathy', 'Strategic Leadership', 'Stakeholder Management', 'Public Speaking & Presentation', 'Prioritization'],
    keyResponsibilities: [
      'Own a specific product feature from conception through discovery, design, engineering sprint execution, and market launch.',
      'Conduct qualitative user interviews and analyze quantitative metrics in Google Analytics/Mixpanel to discover user pain points.',
      'Write clear, detailed Product Requirement Documents (PRDs) and user stories for engineering and UX teams.',
      'Prioritize product backlog items based on business impact, technical effort, and user value.'
    ],
    minimumQualifications: [
      'Pursuing an undergraduate degree in Business Administration, Computer Science, Economics, or related disciplines.',
      'Demonstrated interest in technology products, UI/UX design, and digital business models.',
      'Strong analytical mindset with the ability to interpret user data and product funnel analytics.'
    ],
    preferredQualifications: [
      'Previous leadership experience in student organizations, startups, or campus product clubs.',
      'Basic familiarity with coding concepts (HTML/CSS, JavaScript, or SQL) to communicate effectively with developers.',
      'Experience creating wireframes or interactive prototypes in Figma or Miro.'
    ],
    text: `Job Title: Associate Product Manager (APM) Intern
Company: HyperScale SaaS & E-Commerce Technologies
Location: Austin, TX / San Francisco, CA

About the Role:
Our APM Internship is designed to train the next generation of product leaders. You will work at the intersection of engineering, UI/UX design, and business strategy. As an APM Intern, you won't just take notes—you will own a live product feature that ships to thousands of businesses.

Responsibilities:
- Partner with software engineering, product design, and marketing leads to define feature roadmaps and sprint milestones.
- Author comprehensive Product Requirement Documents (PRDs) detailing user personas, acceptance criteria, and edge cases.
- Analyze user behavior and conversion funnels using analytics tools (Mixpanel, Google Analytics, SQL) to drive data-informed decisions.
- Plan and execute A/B experiments to test hypotheses and optimize user onboarding flows.
- Organize sprint demos and present weekly progress reports to executive stakeholders.

Qualifications:
- Currently enrolled undergraduate student graduating between December 2025 and June 2027.
- High degree of empathy for end-users and a keen eye for intuitive UI/UX design.
- Excellent written and verbal communication skills; comfortable presenting complex ideas simply.
- Familiarity with agile development tools (Jira, Trello, Notion) and wireframing software (Figma).
- Basic SQL or data querying ability is a strong plus.`
  }
];
