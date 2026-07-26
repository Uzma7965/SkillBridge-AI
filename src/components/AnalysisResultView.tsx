import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  FileCheck, 
  Map, 
  MessageSquare, 
  PenTool, 
  Download, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ResumeData, JobDescriptionData, CareerAnalysisResult, NavigationTab } from '../types';
import { analyzeCareerFit } from '../services/api';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';

interface AnalysisResultViewProps {
  activeResume: ResumeData | null;
  activeJD: JobDescriptionData | null;
  onSaveAnalysis: (result: CareerAnalysisResult) => void;
  onTabChange: (tab: NavigationTab) => void;
  onGenerateRoadmapFromSkills: (missingSkills: string[], role: string) => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  activeResume,
  activeJD,
  onSaveAnalysis,
  onTabChange,
  onGenerateRoadmapFromSkills
}) => {
  const { showToast } = useToast();

  const [result, setResult] = useState<CareerAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger analysis
  const runAnalysis = async () => {
    if (!activeResume || !activeResume.text) {
      showToast('Please load or upload a resume first.', 'error');
      onTabChange('resume');
      return;
    }
    if (!activeJD || !activeJD.text) {
      showToast('Please select or paste a target job description first.', 'error');
      onTabChange('jd-analyzer');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      showToast('Comparing resume against job description with Gemini AI...', 'info');
      const data = await analyzeCareerFit(
        activeResume.text, 
        activeJD.text, 
        activeJD.title || 'Software Intern'
      );
      
      setResult(data);
      onSaveAnalysis(data);
      setIsAnalyzing(false);
      showToast('AI analysis complete!', 'success');

      if ((data.matchPercentage || 0) >= 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setIsAnalyzing(false);
      setError(err.message || 'Failed to generate AI analysis.');
      showToast(`Analysis failed: ${err.message}`, 'error');
    }
  };

  // Copy full report as text
  const copyReport = () => {
    if (!result) return;
    const text = `=== SKILLBRIDGE AI CAREER MATCH REPORT ===
Target Role: ${result.targetRole}
Match Percentage: ${result.matchPercentage}%
Readiness Level: ${result.readinessLevel}

EXECUTIVE SUMMARY:
${result.executiveSummary}

MATCHED SKILLS:
${(result.matchedSkills || []).join(', ')}

MISSING TECHNICAL SKILLS:
${(result.missingTechnicalSkills || []).join(', ')}

MISSING SOFT SKILLS:
${(result.missingSoftSkills || []).join(', ')}

TOP STRENGTHS:
${(result.strengths || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${(result.improvementAreas || []).map((a, i) => `${i + 1}. ${a}`).join('\n')}

TOP PRIORITY ACTIONS:
${(result.topPriorityActions || []).map((a, i) => `${i + 1}. ${a}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    showToast('Full AI analysis report copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-blue-600" />
            <span>AI Resume vs Job Analysis</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Gemini AI evaluates your match percentage, discovers skill gaps, and rewrites weak bullet points.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <span>Resume: {activeResume ? activeResume.name.split(' - ')[0] : 'None'}</span>
            <span>•</span>
            <span>Job: {activeJD ? activeJD.title.split(',')[0] : 'None'}</span>
          </div>

          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || !activeResume || !activeJD}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running AI Evaluation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{result ? 'Re-run AI Analysis' : 'Run AI Analysis Now'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <span><strong>Error:</strong> {error}</span>
          <button onClick={runAnalysis} className="underline font-bold">Retry</button>
        </div>
      )}

      {!result && !isAnalyzing && (
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl lg:py-16">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ready to Analyze Your Fit</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 mb-6 leading-relaxed">
            We will compare <strong className="text-slate-800">{activeResume ? activeResume.name : 'your resume'}</strong> against <strong className="text-slate-800">{activeJD ? activeJD.title : 'the target job'}</strong> to calculate your match score and identify missing technical skills.
          </p>
          <button
            onClick={runAnalysis}
            disabled={!activeResume || !activeJD}
            className="px-8 py-4 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Full AI Evaluation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-24 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl lg:py-16 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Google Gemini AI is inspecting your profile...</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Scanning keyword density, comparing technical frameworks, evaluating STAR bullet points, and formulating your roadmap.
            </p>
          </div>
        </div>
      )}

      {result && !isAnalyzing && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Score Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gauge / Match Score */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                  Match Score
                </span>
                <span className="text-xs font-semibold text-slate-500">ATS Compatibility</span>
              </div>

              <div className="py-4 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-8 border-blue-600 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">
                    {result.matchPercentage}%
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 mt-0.5 text-center px-1">
                    {result.readinessLevel || 'Ready'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Readiness: {result.readinessScore}/100</span>
                <span className="text-emerald-600 font-bold">● High Accuracy</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>Executive Fit Assessment</span>
                </div>
                <button
                  onClick={copyReport}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{result.executiveSummary}"
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 mr-1">Target Role:</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {result.targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Breakdown Grid: Matched vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Matched Competencies ({result.matchedSkills?.length || 0})</span>
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Strengths
                </span>
              </div>
              <p className="text-xs text-slate-500">Skills present in your resume that directly align with recruiter expectations:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.matchedSkills && result.matchedSkills.length > 0 ? (
                  result.matchedSkills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      ✓ {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No direct matches identified.</span>
                )}
              </div>
            </div>

            {/* Missing Technical Skills */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>Missing Technical Skills ({result.missingTechnicalSkills?.length || 0})</span>
                </h3>
                <button
                  onClick={() => {
                    onGenerateRoadmapFromSkills(result.missingTechnicalSkills || ['React', 'TypeScript', 'SQL'], result.targetRole);
                    onTabChange('roadmap');
                  }}
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg shadow-xs flex items-center gap-1 transition-all"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Create Learning Roadmap →</span>
                </button>
              </div>
              <p className="text-xs text-slate-500">Crucial keywords required for {result.targetRole} that are missing from your resume:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingTechnicalSkills && result.missingTechnicalSkills.length > 0 ? (
                  result.missingTechnicalSkills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                      + {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-600 font-bold">No major technical gaps detected! Excellent job!</span>
                )}
              </div>
            </div>
          </div>

          {/* Strengths vs Improvement Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Top Profile Strengths</span>
              </h3>
              <ul className="space-y-3">
                {result.strengths && result.strengths.length > 0 ? (
                  result.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                      <span>{str}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-500 italic">No specific highlights generated.</li>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Key Improvement Areas</span>
              </h3>
              <ul className="space-y-3">
                {result.improvementAreas && result.improvementAreas.length > 0 ? (
                  result.improvementAreas.map((area, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1" />
                      <span>{area}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-500 italic">No improvement areas generated.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Bullet Point Enhancer (The XYZ Formula) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-blue-600" />
                  <span>Resume Bullet Point Enhancer (XYZ Achievement Formula)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gemini AI rewrites your existing or generic duties into high-impact accomplishments tailored to this target job.
                </p>
              </div>
              <button
                onClick={() => onTabChange('resume-writer')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
              >
                <span>Open Full Resume Writer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {result.bulletPointSuggestions && result.bulletPointSuggestions.length > 0 ? (
                result.bulletPointSuggestions.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Original Weak */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                          Original / Basic Bullet
                        </span>
                        <p className="text-xs text-slate-600 font-mono italic leading-relaxed">
                          "{item.original}"
                        </p>
                      </div>

                      {/* Improved XYZ */}
                      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-300">
                            ★ Gemini AI Improved (XYZ Metric)
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.improved);
                              showToast('Improved bullet copied to clipboard!', 'success');
                            }}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-900 font-bold leading-relaxed">
                          "{item.improved}"
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Why this wins:</strong> {item.rationale}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-4">No bullet point suggestions generated.</p>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold">Ready for the next step?</h3>
              <p className="text-xs text-blue-100">
                Generate your personalized learning roadmap or jump into mock interview practice!
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onGenerateRoadmapFromSkills(result.missingTechnicalSkills || ['React', 'SQL'], result.targetRole);
                  onTabChange('roadmap');
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                <span>Open Learning Roadmap</span>
              </button>
              <button
                onClick={() => onTabChange('interview')}
                className="px-5 py-2.5 rounded-xl bg-blue-900/40 hover:bg-blue-900/60 border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Mock Interviews</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
