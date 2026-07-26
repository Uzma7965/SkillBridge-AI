export type NavigationTab = 
  | 'home'
  | 'dashboard'
  | 'resume'
  | 'jd-analyzer'
  | 'analysis'
  | 'roadmap'
  | 'interview'
  | 'resume-writer'
  | 'tips'
  | 'history';

export interface ResumeData {
  id: string;
  name: string;
  text: string;
  uploadDate: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'manual' | 'sample';
  wordCount: number;
}

export interface JobDescriptionData {
  id: string;
  title: string;
  companyName: string;
  text: string;
  dateAdded: string;
  experienceLevel?: string;
  requiredTechnicalSkills?: string[];
  requiredSoftSkills?: string[];
  keyResponsibilities?: string[];
  minimumQualifications?: string[];
  preferredQualifications?: string[];
  isSample?: boolean;
}

export interface BulletPointSuggestion {
  original: string;
  improved: string;
  rationale: string;
}

export interface CareerAnalysisResult {
  id: string;
  date: string;
  resumeName: string;
  jobTitle: string;
  targetRole: string;
  matchPercentage: number;
  readinessScore: number;
  readinessLevel: 'Interview Ready' | 'On the Right Track' | 'Needs Polishing' | 'Foundational Stage';
  executiveSummary: string;
  matchedSkills: string[];
  missingTechnicalSkills: string[];
  missingSoftSkills: string[];
  strengths: string[];
  improvementAreas: string[];
  bulletPointSuggestions: BulletPointSuggestion[];
  topPriorityActions: string[];
}

export interface RoadmapResource {
  title: string;
  platform: 'YouTube' | 'Coursera' | 'freeCodeCamp' | 'MIT OpenCourseWare' | 'Official Docs' | 'GitHub' | string;
  url: string;
  type: 'Video Course' | 'Interactive Tutorial' | 'Documentation' | 'Project' | string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  focusSkills: string[];
  learningObjectives: string[];
  freeResources: RoadmapResource[];
  estimatedHours: number;
  practicalProject: string;
  completed?: boolean; // For interactive tracking
}

export interface RoadmapResult {
  id: string;
  date: string;
  targetRole: string;
  totalWeeks: number;
  overview: string;
  prioritySkills: string[];
  weeks: RoadmapWeek[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  whyAsked: string;
  suggestedAnswer: string;
  keyPointsToMention: string[];
}

export interface InterviewPrepResult {
  id: string;
  date: string;
  targetRole: string;
  confidenceTips: string[];
  technicalQuestions: InterviewQuestion[];
  hrQuestions: InterviewQuestion[];
  behavioralQuestions: InterviewQuestion[];
}

export interface AnswerEvaluationResult {
  score: number;
  verdict: 'Excellent' | 'Good' | 'Needs Improvement' | 'Weak';
  strengths: string[];
  critique: string[];
  starAnalysis: {
    situationTask: string;
    action: string;
    result: string;
  };
  polishedVersion: string;
}

export interface ResumeImprovementOption {
  optionName: string;
  content: string;
  highlights: string[];
}

export interface ResumeImprovementResult {
  sectionType: string;
  originalContent: string;
  overallCritique: string;
  suggestions: ResumeImprovementOption[];
}

export interface CareerTipTemplate {
  title: string;
  templateText: string;
  usageTip: string;
}

export interface CareerTipChecklistItem {
  task: string;
  whyImportant: string;
  difficulty: 'Easy' | 'Medium' | 'High Impact';
  completed?: boolean;
}

export interface CareerTipsResult {
  topic: string;
  title: string;
  overview: string;
  actionChecklist: CareerTipChecklistItem[];
  templates: CareerTipTemplate[];
  proTips: string[];
}

export interface UserStats {
  resumesUploaded: number;
  jobsAnalyzed: number;
  averageScore: number;
  totalAnalyses: number;
}
