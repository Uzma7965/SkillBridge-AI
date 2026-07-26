import { 
  CareerAnalysisResult, 
  JobDescriptionData, 
  RoadmapResult, 
  InterviewPrepResult, 
  AnswerEvaluationResult, 
  ResumeImprovementResult, 
  CareerTipsResult 
} from '../types';

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function analyzeCareerFit(
  resumeText: string, 
  jobDescription: string, 
  targetRole: string
): Promise<CareerAnalysisResult> {
  const res = await fetch('/api/analyze-career', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, jobDescription, targetRole })
  });
  const data = await handleResponse(res);
  return {
    ...data,
    id: `analysis-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    resumeName: resumeText.slice(0, 30).trim() + '...',
    jobTitle: targetRole,
    targetRole
  };
}

export async function analyzeJobDescription(jobDescriptionText: string): Promise<Partial<JobDescriptionData>> {
  const res = await fetch('/api/analyze-jd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescriptionText })
  });
  return handleResponse(res);
}

export async function generateLearningRoadmap(
  missingSkills: string[], 
  targetRole: string, 
  timeframeWeeks: number = 6
): Promise<RoadmapResult> {
  const res = await fetch('/api/generate-roadmap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ missingSkills, targetRole, timeframeWeeks })
  });
  const data = await handleResponse(res);
  return {
    ...data,
    id: `roadmap-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    targetRole,
    weeks: (data.weeks || []).map((w: any) => ({ ...w, completed: false }))
  };
}

export async function generateInterviewPrep(
  resumeText: string, 
  jobDescription: string, 
  targetRole: string
): Promise<InterviewPrepResult> {
  const res = await fetch('/api/interview-prep', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, jobDescription, targetRole })
  });
  const data = await handleResponse(res);
  return {
    ...data,
    id: `interview-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    targetRole
  };
}

export async function evaluateAnswer(
  question: string, 
  userAnswer: string, 
  targetRole: string
): Promise<AnswerEvaluationResult> {
  const res = await fetch('/api/evaluate-interview-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, userAnswer, targetRole })
  });
  return handleResponse(res);
}

export async function improveResumeSection(
  sectionType: string, 
  content: string, 
  targetRole: string, 
  jobDescription?: string
): Promise<ResumeImprovementResult> {
  const res = await fetch('/api/improve-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sectionType, content, targetRole, jobDescription })
  });
  return handleResponse(res);
}

export async function generateCareerTips(
  topic: string, 
  targetRole: string, 
  userContext?: string
): Promise<CareerTipsResult> {
  const res = await fetch('/api/career-tips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, targetRole, userContext })
  });
  return handleResponse(res);
}
