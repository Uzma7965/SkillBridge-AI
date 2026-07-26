import { 
  ResumeData, 
  JobDescriptionData, 
  CareerAnalysisResult, 
  RoadmapResult, 
  InterviewPrepResult, 
  UserStats 
} from '../types';
import { SAMPLE_RESUMES, SAMPLE_JOBS } from '../data/sampleData';

const RESUMES_KEY = 'skillbridge_resumes_v1';
const ACTIVE_RESUME_KEY = 'skillbridge_active_resume_v1';
const JDS_KEY = 'skillbridge_jds_v1';
const ACTIVE_JD_KEY = 'skillbridge_active_jd_v1';
const ANALYSES_KEY = 'skillbridge_analyses_v1';
const ROADMAPS_KEY = 'skillbridge_roadmaps_v1';
const INTERVIEW_PREPS_KEY = 'skillbridge_interviews_v1';

// Initialize sample data if empty
export function initSampleDataIfNeeded(): void {
  if (typeof window === 'undefined') return;
  
  const existingResumes = localStorage.getItem(RESUMES_KEY);
  if (!existingResumes || JSON.parse(existingResumes).length === 0) {
    localStorage.setItem(RESUMES_KEY, JSON.stringify(SAMPLE_RESUMES));
    localStorage.setItem(ACTIVE_RESUME_KEY, JSON.stringify(SAMPLE_RESUMES[0]));
  }

  const existingJDs = localStorage.getItem(JDS_KEY);
  if (!existingJDs || JSON.parse(existingJDs).length === 0) {
    localStorage.setItem(JDS_KEY, JSON.stringify(SAMPLE_JOBS));
    localStorage.setItem(ACTIVE_JD_KEY, JSON.stringify(SAMPLE_JOBS[0]));
  }
}

// Resumes
export function getResumes(): ResumeData[] {
  if (typeof window === 'undefined') return [];
  initSampleDataIfNeeded();
  try {
    const data = localStorage.getItem(RESUMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to get resumes', e);
    return [];
  }
}

export function saveResume(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  const resumes = getResumes();
  const existingIndex = resumes.findIndex(r => r.id === resume.id);
  if (existingIndex >= 0) {
    resumes[existingIndex] = resume;
  } else {
    resumes.unshift(resume);
  }
  localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
  localStorage.setItem(ACTIVE_RESUME_KEY, JSON.stringify(resume));
}

export function deleteResume(id: string): void {
  if (typeof window === 'undefined') return;
  const resumes = getResumes().filter(r => r.id !== id);
  localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
  const active = getActiveResume();
  if (active?.id === id) {
    const newActive = resumes.length > 0 ? resumes[0] : null;
    if (newActive) {
      localStorage.setItem(ACTIVE_RESUME_KEY, JSON.stringify(newActive));
    } else {
      localStorage.removeItem(ACTIVE_RESUME_KEY);
    }
  }
}

export function getActiveResume(): ResumeData | null {
  if (typeof window === 'undefined') return null;
  initSampleDataIfNeeded();
  try {
    const data = localStorage.getItem(ACTIVE_RESUME_KEY);
    if (data) return JSON.parse(data);
    const resumes = getResumes();
    return resumes.length > 0 ? resumes[0] : null;
  } catch (e) {
    return null;
  }
}

export function setActiveResume(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_RESUME_KEY, JSON.stringify(resume));
}

// Job Descriptions
export function getJobDescriptions(): JobDescriptionData[] {
  if (typeof window === 'undefined') return [];
  initSampleDataIfNeeded();
  try {
    const data = localStorage.getItem(JDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveJobDescription(jd: JobDescriptionData): void {
  if (typeof window === 'undefined') return;
  const jds = getJobDescriptions();
  const existingIndex = jds.findIndex(j => j.id === jd.id);
  if (existingIndex >= 0) {
    jds[existingIndex] = jd;
  } else {
    jds.unshift(jd);
  }
  localStorage.setItem(JDS_KEY, JSON.stringify(jds));
  localStorage.setItem(ACTIVE_JD_KEY, JSON.stringify(jd));
}

export function deleteJobDescription(id: string): void {
  if (typeof window === 'undefined') return;
  const jds = getJobDescriptions().filter(j => j.id !== id);
  localStorage.setItem(JDS_KEY, JSON.stringify(jds));
  const active = getActiveJD();
  if (active?.id === id) {
    const newActive = jds.length > 0 ? jds[0] : null;
    if (newActive) {
      localStorage.setItem(ACTIVE_JD_KEY, JSON.stringify(newActive));
    } else {
      localStorage.removeItem(ACTIVE_JD_KEY);
    }
  }
}

export function getActiveJD(): JobDescriptionData | null {
  if (typeof window === 'undefined') return null;
  initSampleDataIfNeeded();
  try {
    const data = localStorage.getItem(ACTIVE_JD_KEY);
    if (data) return JSON.parse(data);
    const jds = getJobDescriptions();
    return jds.length > 0 ? jds[0] : null;
  } catch (e) {
    return null;
  }
}

export function setActiveJD(jd: JobDescriptionData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_JD_KEY, JSON.stringify(jd));
}

// Analyses History
export function getAnalysesHistory(): CareerAnalysisResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(ANALYSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveAnalysis(analysis: CareerAnalysisResult): void {
  if (typeof window === 'undefined') return;
  const list = getAnalysesHistory();
  const index = list.findIndex(a => a.id === analysis.id);
  if (index >= 0) {
    list[index] = analysis;
  } else {
    list.unshift(analysis);
  }
  localStorage.setItem(ANALYSES_KEY, JSON.stringify(list));
}

export function deleteAnalysis(id: string): void {
  if (typeof window === 'undefined') return;
  const list = getAnalysesHistory().filter(a => a.id !== id);
  localStorage.setItem(ANALYSES_KEY, JSON.stringify(list));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ANALYSES_KEY);
}

// Roadmaps
export function getSavedRoadmaps(): RoadmapResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(ROADMAPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveRoadmap(roadmap: RoadmapResult): void {
  if (typeof window === 'undefined') return;
  const list = getSavedRoadmaps();
  const index = list.findIndex(r => r.id === roadmap.id);
  if (index >= 0) {
    list[index] = roadmap;
  } else {
    list.unshift(roadmap);
  }
  localStorage.setItem(ROADMAPS_KEY, JSON.stringify(list));
}

export function deleteRoadmap(id: string): void {
  if (typeof window === 'undefined') return;
  const list = getSavedRoadmaps().filter(r => r.id !== id);
  localStorage.setItem(ROADMAPS_KEY, JSON.stringify(list));
}

export function updateRoadmapProgress(roadmapId: string, weekNumber: number, completed: boolean): void {
  if (typeof window === 'undefined') return;
  const list = getSavedRoadmaps();
  const index = list.findIndex(r => r.id === roadmapId);
  if (index >= 0) {
    const weekIndex = list[index].weeks.findIndex(w => w.weekNumber === weekNumber);
    if (weekIndex >= 0) {
      list[index].weeks[weekIndex].completed = completed;
      localStorage.setItem(ROADMAPS_KEY, JSON.stringify(list));
    }
  }
}

// Interview Preps
export function getSavedInterviewPreps(): InterviewPrepResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(INTERVIEW_PREPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveInterviewPrep(prep: InterviewPrepResult): void {
  if (typeof window === 'undefined') return;
  const list = getSavedInterviewPreps();
  const index = list.findIndex(p => p.id === prep.id);
  if (index >= 0) {
    list[index] = prep;
  } else {
    list.unshift(prep);
  }
  localStorage.setItem(INTERVIEW_PREPS_KEY, JSON.stringify(list));
}

export function deleteInterviewPrep(id: string): void {
  if (typeof window === 'undefined') return;
  const list = getSavedInterviewPreps().filter(p => p.id !== id);
  localStorage.setItem(INTERVIEW_PREPS_KEY, JSON.stringify(list));
}

// Stats
export function getUserStats(): UserStats {
  const resumes = getResumes();
  const jds = getJobDescriptions();
  const analyses = getAnalysesHistory();

  let totalScore = 0;
  analyses.forEach(a => {
    totalScore += a.matchPercentage || 0;
  });

  const averageScore = analyses.length > 0 ? Math.round(totalScore / analyses.length) : 74; // Default friendly preview score if no history yet

  return {
    resumesUploaded: resumes.length,
    jobsAnalyzed: jds.length,
    averageScore,
    totalAnalyses: analyses.length
  };
}
