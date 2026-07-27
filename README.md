# 🚀 SkillBridge AI – Career & Internship Assistant

![SkillBridge AI Banner](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80)

**SkillBridge AI** is an intelligent, full-stack career and internship preparation platform powered by Google DeepMind's Gemini AI. Designed specifically for university students, recent graduates, and career transitioners, SkillBridge bridges the gap between academic preparation and industry recruitment expectations.

---

## 🌐 Live Demo

**Render Deployment:** https://skillbridge-ai-a3n7.onrender.com

> Experience SkillBridge AI live by visiting the link above.

---

## 🎯 The Problem & Our Solution

Many students struggle to know whether they are ready for competitive internships and entry-level jobs. They don't know which technical or soft skills they are missing, how their resume parses through ATS (Applicant Tracking Systems), or how to formulate high-impact achievement bullet points.

**SkillBridge AI solves this by acting as a 24/7 personalized AI Career Coach:**
1. **Analyze Your Fit:** Instantly compare your resume against any real-world job posting to receive a precise match percentage and ATS compatibility score.
2. **Bridge Skill Gaps:** Automatically detect missing technical frameworks and generate custom 4 to 8-week learning roadmaps with free course links and GitHub deliverable projects.
3. **Upgrade Your Resume:** Use the AI Writer Studio to transform passive duties into quantified **XYZ achievement formulas** ("Accomplished [X], measured by [Y], by doing [Z]").
4. **Master Interviews:** Practice STAR behavioral, technical, and HR interview questions with our interactive mock simulator that scores your typed answers out of 10.

---

## ✨ Key Features & Capabilities

### 🏠 1. Modern Landing & Dashboard Hub
- **Executive Overview:** Real-time metrics on resumes uploaded, jobs analyzed, and average ATS readiness scores.
- **Quick Action Launchpad:** One-click shortcuts to jump straight into resume uploads, job analyzers, or interview prep.
- **Pre-Loaded Demo Data:** Includes real-world sample resumes (Computer Science, Data Science, Product Management, UI/UX Design) and authentic tech job descriptions for immediate testing.

### 📄 2. Smart Resume Manager & ATS Scanner
- **Multi-Format Parsing:** Support for uploading `.txt`, `.md`, `.json`, or manual raw text pasting with real-time word count tracking.
- **Resume Vault:** Secure local storage allowing you to maintain multiple tailored resume variations (e.g., Frontend vs. Full Stack vs. Product).

### 🎯 3. Job Description Analyzer
- **Automated Requirement Extraction:** Gemini AI parses lengthy job descriptions to extract required technical skills, soft competencies, minimum qualifications, and core responsibilities.
- **Target Role Profiler:** Save and compare multiple target internships across top tech companies.

### ⚡ 4. AI Resume vs. Job Fit Analysis
- **Match Score Gauge:** Mathematical ATS match percentage (0–100%) with a readiness index classification ("Interview Ready", "On the Right Track", or "Needs Polishing").
- **Gap Analysis:** Clean separation of matched competencies versus missing technical keywords.
- **Executive Fit Summary:** Recruiter-grade evaluation explaining why your profile succeeds or where it falls short.
- **XYZ Bullet Point Enhancer:** Automatically rewrites weak or generic resume bullet points into high-impact accomplishments with detailed rationales.

### 🗺️ 5. Personalized Learning Roadmaps
- **Customized Study Schedules:** Generate 4, 6, or 8-week structured bootcamps tailored specifically to your missing skills and target role.
- **Priority ROI Skills:** Identifies the top skills that yield the highest market return on investment for internships.
- **Free Resource Curation:** Links directly to top free learning resources from Coursera, MIT OpenCourseWare, freeCodeCamp, and official docs.
- **Practical GitHub Deliverables:** Assigns weekly hands-on coding projects to build your portfolio.
- **Interactive Progress Tracking:** Check off completed weeks and track your momentum over time.

### 🎙️ 6. AI Interview Prep & Interactive Mock Simulator
- **Tailored Question Banks:** Generates domain-specific technical questions, HR situational prompts, and STAR behavioral questions.
- **Interactive Practice Mode:** Select any question, type your response as if speaking in an interview, and submit it for instant AI evaluation.
- **STAR Scoring Engine:** Receives a score out of 10, STAR structure breakdown (Situation/Task, Action, Result), constructive critique, and a polished model answer from Gemini.
- **Confidence & Communication Tips:** Actionable body language and communication strategies for technical interviews.

### ✍️ 7. Resume Improvement Studio (AI Writer)
- **Section-by-Section Polishing:** Generate 3 optimized variations for Executive Summaries, Experience Bullets, Projects, and Skills.
- **ATS Keyword Injection:** Naturally weaves required technical keywords into your descriptions without fabricating credentials.

### 💡 8. Career Tips & Advisor Hub
- **Mentorship Modules:** Dedicated guidance on LinkedIn Profile Optimization, Networking & Cold Outreach, GitHub Code Quality, and Portfolio Showcases.
- **Ready-to-Use Scripts:** Copyable templates for cold emails to recruiters, LinkedIn connection notes, and About summaries.
- **Insider Recruiter Secrets:** Pro tips sourced from modern engineering hiring managers.

### 📜 9. Saved Analyses & History
- **Permanent Archive:** Review past match reports, track your score improvements over time, filter by readiness level, or export reports as JSON.

---

## 🛠️ Technology Stack & Architecture

SkillBridge AI is architected as a **Full-Stack Application** prioritizing security, speed, and responsiveness:

- **Frontend Framework:** React 19 + TypeScript + Vite 6
- **Styling & Design System:** Tailwind CSS v4 with responsive layouts, custom animations, and Lucide React iconography
- **Backend Server:** Node.js + Express (TypeScript)
- **AI Engine:** Google Gemini AI models (`gemini-2.5-flash`) via the official `@google/genai` SDK
- **Security & API Proxying:** Full server-side API routing (`/api/*`). The Gemini API key is securely managed on the backend and is **never** exposed to the browser.
- **Data Persistence:** Robust client-side storage (`localStorage`) with sample seeding, allowing students to use the app immediately without complex authentication barriers.
- **Confetti & Effects:** `canvas-confetti` for celebratory feedback on high ATS match scores.

---

## 🚀 Getting Started & Local Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- A valid Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/skillbridge-ai.git
cd skillbridge-ai

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
# Required: Your Google Gemini API Key
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Optional: Application host URL
APP_URL="http://localhost:3000"
```

### 3. Start the Development Server
```bash
npm run dev
```
The application will boot a full-stack Express + Vite development server on **http://localhost:3000**.

---

## 📦 Production Build & Deployment

SkillBridge AI is configured to bundle both the frontend single-page application and the TypeScript backend server into a self-contained production bundle.

### 1. Build for Production
```bash
npm run build
```
This command:
1. Compiles and optimizes React client assets into the `dist/` directory using Vite.
2. Bundles the Express TypeScript backend into `dist/server.cjs` using `esbuild`.

### 2. Run Production Server
```bash
npm start
```
Launches the standalone server on port 3000.

### 🌐 Deployment Options

#### Option A: Cloud Run / Docker / VPS
Because the build script outputs a single CommonJS server bundle (`dist/server.cjs`) alongside static assets, you can deploy to any containerized host (Google Cloud Run, AWS App Runner, Heroku, Render):
- Set your environment variable: `GEMINI_API_KEY=your_key`
- Start command: `npm start`

#### Option B: #### Render Deployment

SkillBridge AI is successfully deployed on **Render**.

**Live Application:** https://skillbridge-ai-a3n7.onrender.com

Deployment Steps:
1. Push the project to a public GitHub repository.
2. Connect the repository to Render.
3. Add the required environment variable:
---

## 📂 Project Structure

```text
skillbridge-ai/
├── server.ts                  # Express Backend Server & Gemini AI API Routes
├── vite.config.ts             # Vite Configuration
├── package.json               # Dependencies & Build Scripts
├── metadata.json              # Applet Metadata & Capabilities
├── README.md                  # Project Documentation
└── src/
    ├── types.ts               # Global TypeScript Interfaces
    ├── App.tsx                # Main Router & Application Controller
    ├── main.tsx               # Entry Point
    ├── index.css              # Global Tailwind Styles
    ├── services/
    │   └── api.ts             # Client-to-Server API Proxy Handlers
    ├── utils/
    │   └── storage.ts         # Local Persistence & Sample Seeding
    ├── data/
    │   └── sampleData.ts      # Rich Sample Resumes & Job Descriptions
    └── components/
        ├── Toast.tsx          # Global Toast Notification System
        ├── Navbar.tsx         # Responsive Navigation Header
        ├── Footer.tsx         # Professional Footer
        ├── HomeView.tsx       # Landing Page & Feature Showcase
        ├── DashboardView.tsx  # Interactive Analytics Hub
        ├── ResumeUploadView.tsx # Resume Vault & Manager
        ├── JobAnalyzerView.tsx  # Job Description Parser
        ├── AnalysisResultView.tsx # AI Fit Evaluator & XYZ Bullet Writer
        ├── RoadmapView.tsx    # Weekly Bootcamp & Course Curation
        ├── InterviewPrepView.tsx # Question Bank & Mock Simulator
        ├── ResumeImproverView.tsx # 3-Variation AI Writer Studio
        ├── CareerTipsView.tsx # Mentorship & Cold Outreach Scripts
        └── HistoryView.tsx    # Archive & JSON Report Exporter
```

---

## 🤝 Contributing
Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📝 License
This project is open-source and licensed under the **Apache-2.0 License**.

---

*Built with ❤️ for students worldwide to democratize career readiness and internship access.*
