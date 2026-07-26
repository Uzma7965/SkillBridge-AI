import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  Copy, 
  Send, 
  Star, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Lightbulb, 
  FileText, 
  Target,
  UserCheck,
  Code2,
  HeartHandshake
} from 'lucide-react';
import { 
  ResumeData, 
  JobDescriptionData, 
  InterviewPrepResult, 
  InterviewQuestion, 
  AnswerEvaluationResult, 
  NavigationTab 
} from '../types';
import { generateInterviewPrep, evaluateAnswer } from '../services/api';
import { getSavedInterviewPreps, saveInterviewPrep, deleteInterviewPrep } from '../utils/storage';
import { useToast } from './Toast';

interface InterviewPrepViewProps {
  activeResume: ResumeData | null;
  activeJD: JobDescriptionData | null;
  onTabChange: (tab: NavigationTab) => void;
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({
  activeResume,
  activeJD,
  onTabChange
}) => {
  const { showToast } = useToast();

  const [savedPreps, setSavedPreps] = useState<InterviewPrepResult[]>([]);
  const [activePrep, setActivePrep] = useState<InterviewPrepResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<'technical' | 'hr' | 'behavioral' | 'mock'>('technical');

  // Generator State
  const [targetRole, setTargetRole] = useState(activeJD ? activeJD.title : 'Software Engineering Intern');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock Practice State
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluationResult | null>(null);

  useEffect(() => {
    const list = getSavedInterviewPreps();
    setSavedPreps(list);
    if (list.length > 0) {
      setActivePrep(list[0]);
      if (list[0].technicalQuestions?.length > 0) {
        setSelectedQuestion(list[0].technicalQuestions[0]);
      }
    }
  }, []);

  // Handle Generate
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      showToast('Formulating tailored interview questions with Gemini AI...', 'info');
      const newPrep = await generateInterviewPrep(
        activeResume ? activeResume.text : '', 
        activeJD ? activeJD.text : '', 
        targetRole || 'Software Intern'
      );
      
      saveInterviewPrep(newPrep);
      const updated = getSavedInterviewPreps();
      setSavedPreps(updated);
      setActivePrep(newPrep);
      if (newPrep.technicalQuestions?.length > 0) {
        setSelectedQuestion(newPrep.technicalQuestions[0]);
      }
      setIsGenerating(false);
      showToast('Interview prep pack generated & saved!', 'success');
    } catch (err: any) {
      setIsGenerating(false);
      showToast(`Generation failed: ${err.message}`, 'error');
    }
  };

  // Handle Evaluate Answer in Mock Simulator
  const handleEvaluate = async () => {
    if (!selectedQuestion) {
      showToast('Please select a question from the list above.', 'error');
      return;
    }
    if (!userAnswer.trim() || userAnswer.trim().length < 20) {
      showToast('Please provide a detailed answer (at least 20 characters) for accurate evaluation.', 'error');
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);
    try {
      showToast('Gemini AI is evaluating your response using the STAR method...', 'info');
      const res = await evaluateAnswer(selectedQuestion.question, userAnswer.trim(), targetRole);
      setEvaluation(res);
      setIsEvaluating(false);
      showToast('Evaluation complete! See AI feedback below.', 'success');
    } catch (err: any) {
      setIsEvaluating(false);
      showToast(`Evaluation failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-violet-600" />
            <span>AI Interview Preparation & Mock Simulator</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Master coding, HR, and STAR behavioral questions. Practice typing your answers and receive instant AI scoring.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target Role"
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 w-44 sm:w-60"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Pack...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{activePrep ? 'Re-generate Questions' : 'Generate Interview Pack'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {!activePrep && !isGenerating && (
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl lg:py-16">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ready to Ace Your Interviews</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 mb-6 leading-relaxed">
            Click the button below to generate tailored technical questions, HR prompts, and STAR behavioral questions based on your resume and target job.
          </p>
          <button
            onClick={handleGenerate}
            className="px-8 py-4 bg-violet-600 text-white font-bold text-sm rounded-xl shadow-lg hover:bg-violet-700 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Interview Question Pack</span>
          </button>
        </div>
      )}

      {isGenerating && (
        <div className="text-center py-24 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl lg:py-16 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center mx-auto shadow-lg animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Formulating interview questions...</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Gemini AI is studying recruiter evaluation rubrics and preparing model answers for your target role.
            </p>
          </div>
        </div>
      )}

      {activePrep && !isGenerating && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Confidence & Body Language Tips Banner */}
          {activePrep.confidenceTips && activePrep.confidenceTips.length > 0 && (
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Confidence & Communication Tips for {activePrep.targetRole}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activePrep.confidenceTips.map((tip, idx) => (
                  <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md">
                      Tip #{idx + 1}
                    </span>
                    <p className="text-xs text-blue-100 pt-1 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveCategory('technical')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeCategory === 'technical'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Technical Questions ({activePrep.technicalQuestions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveCategory('hr')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeCategory === 'hr'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>HR & Situational ({activePrep.hrQuestions?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveCategory('behavioral')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeCategory === 'behavioral'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Behavioral STAR ({activePrep.behavioralQuestions?.length || 0})</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('mock');
                if (!selectedQuestion && activePrep.technicalQuestions?.length > 0) {
                  setSelectedQuestion(activePrep.technicalQuestions[0]);
                }
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
                activeCategory === 'mock'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>★ Interactive Mock Simulator</span>
            </button>
          </div>

          {/* TAB CONTENT: TECHNICAL QUESTIONS */}
          {activeCategory === 'technical' && (
            <div className="grid grid-cols-1 gap-6">
              {(activePrep.technicalQuestions || []).map((q) => (
                <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                        q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800' :
                        q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {q.difficulty || 'Medium'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{q.question}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedQuestion(q);
                        setActiveCategory('mock');
                        setUserAnswer('');
                        setEvaluation(null);
                        showToast('Loaded question into Mock Simulator!', 'info');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs flex items-center gap-1.5 shrink-0"
                    >
                      <span>Practice This →</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                    <strong>Why interviewers ask this:</strong> {q.whyAsked}
                  </div>

                  <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-800 bg-violet-100 px-2 py-0.5 rounded-md">
                        ★ Suggested Winning Answer
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(q.suggestedAnswer);
                          showToast('Answer copied to clipboard!', 'success');
                        }}
                        className="text-xs font-bold text-violet-600 hover:text-violet-800 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-900 font-semibold leading-relaxed whitespace-pre-wrap">
                      {q.suggestedAnswer}
                    </p>
                  </div>

                  {q.keyPointsToMention && q.keyPointsToMention.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-500 mr-1 self-center">Key concepts to mention:</span>
                      {q.keyPointsToMention.map((kp, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          ✓ {kp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: HR QUESTIONS */}
          {activeCategory === 'hr' && (
            <div className="grid grid-cols-1 gap-6">
              {(activePrep.hrQuestions || []).map((q) => (
                <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900">{q.question}</h3>
                    <button
                      onClick={() => {
                        setSelectedQuestion(q);
                        setActiveCategory('mock');
                        setUserAnswer('');
                        setEvaluation(null);
                        showToast('Loaded question into Mock Simulator!', 'info');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs flex items-center gap-1.5 shrink-0"
                    >
                      <span>Practice This →</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                    <strong>What HR is looking for:</strong> {q.whyAsked}
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                      ★ Model HR Response Strategy
                    </span>
                    <p className="text-xs text-slate-900 font-semibold leading-relaxed whitespace-pre-wrap">
                      {q.suggestedAnswer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: BEHAVIORAL STAR QUESTIONS */}
          {activeCategory === 'behavioral' && (
            <div className="grid grid-cols-1 gap-6">
              {(activePrep.behavioralQuestions || []).map((q) => (
                <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                        STAR Method
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{q.question}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedQuestion(q);
                        setActiveCategory('mock');
                        setUserAnswer('');
                        setEvaluation(null);
                        showToast('Loaded question into Mock Simulator!', 'info');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs flex items-center gap-1.5 shrink-0"
                    >
                      <span>Practice This →</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                    <strong>Why behavioral competencies matter:</strong> {q.whyAsked}
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                      ★ STAR Structured Answer (Situation, Task, Action, Result)
                    </span>
                    <p className="text-xs text-slate-900 font-semibold leading-relaxed whitespace-pre-wrap">
                      {q.suggestedAnswer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT: INTERACTIVE MOCK SIMULATOR */}
          {activeCategory === 'mock' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-violet-500 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-violet-600 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Interactive Mock Interview Simulator</h2>
                    <p className="text-xs text-slate-500">Type your answer below and Gemini AI will score your STAR structure out of 10</p>
                  </div>
                </div>

                {/* Question Selector dropdown */}
                <select
                  value={selectedQuestion?.question || ''}
                  onChange={(e) => {
                    const allQs = [
                      ...(activePrep.technicalQuestions || []),
                      ...(activePrep.hrQuestions || []),
                      ...(activePrep.behavioralQuestions || [])
                    ];
                    const found = allQs.find(q => q.question === e.target.value);
                    if (found) {
                      setSelectedQuestion(found);
                      setUserAnswer('');
                      setEvaluation(null);
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white max-w-xs focus:outline-none focus:ring-2 focus:ring-violet-500 truncate"
                >
                  <optgroup label="Technical Questions">
                    {(activePrep.technicalQuestions || []).map(q => (
                      <option key={q.id} value={q.question}>{q.question}</option>
                    ))}
                  </optgroup>
                  <optgroup label="HR & Situational">
                    {(activePrep.hrQuestions || []).map(q => (
                      <option key={q.id} value={q.question}>{q.question}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Behavioral STAR">
                    {(activePrep.behavioralQuestions || []).map(q => (
                      <option key={q.id} value={q.question}>{q.question}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Active Question Box */}
              {selectedQuestion ? (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-violet-50 border border-violet-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white px-2.5 py-0.5 rounded-md">
                        Interviewer Question
                      </span>
                      {selectedQuestion.difficulty && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-700 border">
                          {selectedQuestion.difficulty}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      "{selectedQuestion.question}"
                    </h3>
                    <p className="text-xs text-violet-900 font-medium">
                      <strong>Focus evaluation:</strong> {selectedQuestion.whyAsked}
                    </p>
                  </div>

                  {/* User Input Area */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Response (Type as if speaking in a real interview):
                    </label>
                    <textarea
                      rows={6}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="e.g., In my previous software engineering internship at XYZ, our team faced a bottleneck where API requests took 4 seconds... I decided to implement Redis caching... As a result, latency dropped by 65%..."
                      className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed shadow-inner"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {userAnswer.trim().length} characters (Recommended: 150+ for deep AI STAR analysis)
                      </span>
                      <button
                        onClick={handleEvaluate}
                        disabled={isEvaluating || !userAnswer.trim()}
                        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
                      >
                        {isEvaluating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Evaluating with Gemini AI...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Answer for AI Scoring</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Evaluation Report */}
                  {evaluation && (
                    <div className="mt-8 pt-8 border-t-2 border-slate-200 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                      {/* Top Score Banner */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 text-white shadow-sm border border-slate-800">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm border ${
                            evaluation.score >= 8 ? 'bg-emerald-600 border-emerald-400 text-white' :
                            evaluation.score >= 6 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-amber-600 border-amber-400 text-white'
                          }`}>
                            {evaluation.score}/10
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">AI Evaluation Verdict</p>
                            <h4 className="text-xl font-bold text-white">{evaluation.verdict} Response</h4>
                            <p className="text-xs text-slate-300">Target Role: {targetRole}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setUserAnswer('');
                            setEvaluation(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20"
                        >
                          Try Another Answer
                        </button>
                      </div>

                      {/* STAR Breakdown Grid */}
                      {evaluation.starAnalysis && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-violet-600" />
                            <span>STAR Structure Breakdown</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                              <span className="text-[10px] font-bold text-blue-800 uppercase">Situation & Task</span>
                              <p className="text-xs text-slate-700">{evaluation.starAnalysis.situationTask || 'Assessed.'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                              <span className="text-[10px] font-bold text-indigo-800 uppercase">Action Taken</span>
                              <p className="text-xs text-slate-700">{evaluation.starAnalysis.action || 'Assessed.'}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
                              <span className="text-[10px] font-bold text-purple-800 uppercase">Quantified Result</span>
                              <p className="text-xs text-slate-700">{evaluation.starAnalysis.result || 'Assessed.'}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Strengths & Critique */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <h5 className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>What You Did Well</span>
                          </h5>
                          <ul className="space-y-1.5 pt-1">
                            {(evaluation.strengths || []).map((s, i) => (
                              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                          <h5 className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span>Constructive Critique</span>
                          </h5>
                          <ul className="space-y-1.5 pt-1">
                            {(evaluation.critique || []).map((c, i) => (
                              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Polished Model Version */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 border-2 border-violet-300 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-600" />
                            <h5 className="text-xs font-bold text-violet-900 uppercase tracking-wider">
                              ★ Gemini AI Polished Version (How to deliver this response perfectly)
                            </h5>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(evaluation.polishedVersion);
                              showToast('Polished answer copied to clipboard!', 'success');
                            }}
                            className="text-xs font-bold text-violet-700 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-900 font-semibold leading-relaxed whitespace-pre-wrap">
                          "{evaluation.polishedVersion}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-8">Please select a question from the dropdown above to start mock practice.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
