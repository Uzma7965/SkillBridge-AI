/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { ResumeUploadView } from './components/ResumeUploadView';
import { JobAnalyzerView } from './components/JobAnalyzerView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { RoadmapView } from './components/RoadmapView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { ResumeImproverView } from './components/ResumeImproverView';
import { CareerTipsView } from './components/CareerTipsView';
import { HistoryView } from './components/HistoryView';

import { 
  NavigationTab, 
  ResumeData, 
  JobDescriptionData, 
  CareerAnalysisResult,
  UserStats
} from './types';
import { 
  getResumes, 
  saveResume, 
  deleteResume,
  getJobDescriptions, 
  saveJobDescription, 
  deleteJobDescription,
  getAnalysesHistory, 
  saveAnalysis, 
  deleteAnalysis, 
  clearHistory,
  getUserStats,
  initSampleDataIfNeeded
} from './utils/storage';
import { SAMPLE_RESUMES, SAMPLE_JOBS } from './data/sampleData';

function SkillBridgeApp() {
  const { showToast } = useToast();

  // Navigation state
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Core Data States
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResume, setActiveResume] = useState<ResumeData | null>(null);

  const [jds, setJds] = useState<JobDescriptionData[]>([]);
  const [activeJD, setActiveJD] = useState<JobDescriptionData | null>(null);

  const [analyses, setAnalyses] = useState<CareerAnalysisResult[]>([]);
  const [latestAnalysis, setLatestAnalysis] = useState<CareerAnalysisResult | null>(null);

  const [stats, setStats] = useState<UserStats>({
    resumesUploaded: 0,
    jobsAnalyzed: 0,
    averageScore: 74,
    totalAnalyses: 0
  });

  // Cross-view state for Roadmap generator
  const [roadmapMissingSkills, setRoadmapMissingSkills] = useState<string[]>([]);
  const [roadmapRole, setRoadmapRole] = useState<string>('Software Engineering Intern');

  // Load and refresh state helper
  const refreshAllState = () => {
    initSampleDataIfNeeded();
    const loadedResumes = getResumes();
    setResumes(loadedResumes);
    if (loadedResumes.length > 0 && !activeResume) {
      setActiveResume(loadedResumes[0]);
    }

    const loadedJDs = getJobDescriptions();
    setJds(loadedJDs);
    if (loadedJDs.length > 0 && !activeJD) {
      setActiveJD(loadedJDs[0]);
    }

    const loadedAnalyses = getAnalysesHistory();
    setAnalyses(loadedAnalyses);
    if (loadedAnalyses.length > 0) {
      setLatestAnalysis(loadedAnalyses[0]);
    }

    setStats(getUserStats());
  };

  // Initialize data on load
  useEffect(() => {
    initSampleDataIfNeeded();
    const loadedResumes = getResumes();
    setResumes(loadedResumes);
    if (loadedResumes.length > 0) {
      setActiveResume(loadedResumes[0]);
    } else if (SAMPLE_RESUMES.length > 0) {
      SAMPLE_RESUMES.forEach(r => saveResume(r));
      const rList = getResumes();
      setResumes(rList);
      setActiveResume(rList[0]);
    }

    const loadedJDs = getJobDescriptions();
    setJds(loadedJDs);
    if (loadedJDs.length > 0) {
      setActiveJD(loadedJDs[0]);
    } else if (SAMPLE_JOBS.length > 0) {
      SAMPLE_JOBS.forEach(j => saveJobDescription(j));
      const jList = getJobDescriptions();
      setJds(jList);
      setActiveJD(jList[0]);
    }

    const loadedAnalyses = getAnalysesHistory();
    setAnalyses(loadedAnalyses);
    if (loadedAnalyses.length > 0) {
      setLatestAnalysis(loadedAnalyses[0]);
    }

    setStats(getUserStats());
  }, []);

  // Handlers for Resumes
  const handleSelectResume = (res: ResumeData) => {
    setActiveResume(res);
    showToast(`Activated resume: ${res.name}`, 'info');
  };

  const handleSaveResume = (res: ResumeData) => {
    saveResume(res);
    const list = getResumes();
    setResumes(list);
    setActiveResume(res);
    setStats(getUserStats());
  };

  const handleDeleteResume = (id: string) => {
    deleteResume(id);
    const list = getResumes();
    setResumes(list);
    if (activeResume?.id === id) {
      setActiveResume(list.length > 0 ? list[0] : null);
    }
    setStats(getUserStats());
    showToast('Resume deleted.', 'info');
  };

  // Handlers for Job Descriptions
  const handleSelectJD = (jd: JobDescriptionData) => {
    setActiveJD(jd);
    showToast(`Activated target job: ${jd.title}`, 'info');
  };

  const handleSaveJD = (jd: JobDescriptionData) => {
    saveJobDescription(jd);
    const list = getJobDescriptions();
    setJds(list);
    setActiveJD(jd);
    setStats(getUserStats());
  };

  const handleDeleteJD = (id: string) => {
    deleteJobDescription(id);
    const list = getJobDescriptions();
    setJds(list);
    if (activeJD?.id === id) {
      setActiveJD(list.length > 0 ? list[0] : null);
    }
    setStats(getUserStats());
    showToast('Job description deleted.', 'info');
  };

  // Handlers for AI Analysis
  const handleSaveNewAnalysis = (result: CareerAnalysisResult) => {
    saveAnalysis(result);
    const updated = getAnalysesHistory();
    setAnalyses(updated);
    setLatestAnalysis(result);
    setStats(getUserStats());
  };

  const handleSelectAnalysisFromHistory = (analysis: CareerAnalysisResult) => {
    setLatestAnalysis(analysis);
    showToast(`Loaded analysis report for ${analysis.targetRole || analysis.jobTitle}`, 'info');
  };

  const handleDeleteAnalysisItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAnalysis(id);
    const updated = getAnalysesHistory();
    setAnalyses(updated);
    if (latestAnalysis?.id === id) {
      setLatestAnalysis(updated.length > 0 ? updated[0] : null);
    }
    setStats(getUserStats());
    showToast('Analysis removed from history.', 'info');
  };

  const handleClearAllHistory = () => {
    clearHistory();
    setAnalyses([]);
    setLatestAnalysis(null);
    setStats(getUserStats());
    showToast('All analysis history cleared.', 'info');
  };

  const handleLoadSampleData = () => {
    SAMPLE_RESUMES.forEach(r => saveResume(r));
    SAMPLE_JOBS.forEach(j => saveJobDescription(j));
    refreshAllState();
    showToast('Demo sample resumes and job descriptions loaded!', 'success');
  };

  // Handler for jumping from Analysis to Roadmap
  const handleGenerateRoadmapFromSkills = (missingSkills: string[], role: string) => {
    setRoadmapMissingSkills(missingSkills);
    setRoadmapRole(role);
    showToast(`Transferred ${missingSkills.length} missing skills to Roadmap Generator!`, 'info');
  };

  // Render content based on activeTab
  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onTabChange={setActiveTab} />;
      case 'dashboard':
        return (
          <DashboardView
            activeResume={activeResume}
            activeJD={activeJD}
            stats={stats}
            recentAnalyses={analyses}
            onTabChange={setActiveTab}
            onSelectAnalysis={handleSelectAnalysisFromHistory}
            onDeleteAnalysis={handleDeleteAnalysisItem}
            onLoadSampleData={handleLoadSampleData}
          />
        );
      case 'resume':
        return (
          <ResumeUploadView
            resumes={resumes}
            activeResume={activeResume}
            onSaveResume={handleSaveResume}
            onSelectResume={handleSelectResume}
            onDeleteResume={handleDeleteResume}
          />
        );
      case 'jd-analyzer':
        return (
          <JobAnalyzerView
            jds={jds}
            activeJD={activeJD}
            onSaveJD={handleSaveJD}
            onSelectJD={handleSelectJD}
            onDeleteJD={handleDeleteJD}
          />
        );
      case 'analysis':
        return (
          <AnalysisResultView
            activeResume={activeResume}
            activeJD={activeJD}
            onSaveAnalysis={handleSaveNewAnalysis}
            onTabChange={setActiveTab}
            onGenerateRoadmapFromSkills={handleGenerateRoadmapFromSkills}
          />
        );
      case 'roadmap':
        return (
          <RoadmapView
            initialMissingSkills={roadmapMissingSkills}
            initialRole={roadmapRole || (activeJD ? activeJD.title : 'Software Engineer Intern')}
            onTabChange={setActiveTab}
          />
        );
      case 'interview':
        return (
          <InterviewPrepView
            activeResume={activeResume}
            activeJD={activeJD}
            onTabChange={setActiveTab}
          />
        );
      case 'resume-writer':
        return (
          <ResumeImproverView
            activeResume={activeResume}
            activeJD={activeJD}
            onTabChange={setActiveTab}
          />
        );
      case 'career-tips':
        return <CareerTipsView onTabChange={setActiveTab} />;
      case 'history':
        return (
          <HistoryView
            analyses={analyses}
            onSelectAnalysis={handleSelectAnalysisFromHistory}
            onDeleteAnalysis={handleDeleteAnalysisItem}
            onClearAll={handleClearAllHistory}
            onTabChange={setActiveTab}
          />
        );
      default:
        return <HomeView onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeResumeName={activeResume ? activeResume.name.split(' - ')[0] : undefined}
        activeJobTitle={activeJD ? activeJD.title.split(',')[0] : undefined}
      />

      {/* Main Container */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <Footer onTabChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SkillBridgeApp />
    </ToastProvider>
  );
}
