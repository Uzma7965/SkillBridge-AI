import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Linkedin, 
  Github, 
  Globe, 
  Users, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  ArrowRight, 
  HelpCircle, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  Send
} from 'lucide-react';
import { CareerTipsResult, NavigationTab } from '../types';
import { generateCareerTips } from '../services/api';
import { useToast } from './Toast';

interface CareerTipsViewProps {
  onTabChange: (tab: NavigationTab) => void;
}

export const CareerTipsView: React.FC<CareerTipsViewProps> = ({ onTabChange }) => {
  const { showToast } = useToast();

  const [activeTopic, setActiveTopic] = useState<'linkedin' | 'networking' | 'github' | 'portfolio'>('linkedin');
  const [targetRole, setTargetRole] = useState('Software Engineering Intern');
  const [userContext, setUserContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tipsData, setTipsData] = useState<Record<string, CareerTipsResult>>({});

  // Generate or load topic
  const loadOrGenerateTopic = async (topic: 'linkedin' | 'networking' | 'github' | 'portfolio', force = false) => {
    setActiveTopic(topic);
    if (!force && tipsData[topic]) return;

    setIsGenerating(true);
    try {
      showToast(`Generating ${topic.toUpperCase()} mentorship strategies with Gemini AI...`, 'info');
      const data = await generateCareerTips(topic, targetRole, userContext);
      setTipsData(prev => ({ ...prev, [topic]: data }));
      setIsGenerating(false);
      showToast(`${topic.toUpperCase()} guide loaded!`, 'success');
    } catch (err: any) {
      setIsGenerating(false);
      showToast(`Failed to generate tips: ${err.message}`, 'error');
    }
  };

  useEffect(() => {
    loadOrGenerateTopic('linkedin');
  }, []);

  const currentData = tipsData[activeTopic];

  const topicsList = [
    { id: 'linkedin' as const, label: 'LinkedIn Profile Optimization', icon: Linkedin, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'networking' as const, label: 'Networking & Cold Outreach', icon: Users, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'github' as const, label: 'GitHub Profile & Code Quality', icon: Github, color: 'text-slate-800 bg-slate-100 border-slate-300' },
    { id: 'portfolio' as const, label: 'Portfolio Showcase Suggestions', icon: Globe, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-7 h-7 text-amber-500" />
            <span>Career Tips & Advisor Hub</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Tailored mentorship advice on LinkedIn headlines, GitHub readmes, cold emails to recruiters, and portfolio strategies.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target Internship Role"
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 w-48 sm:w-64"
          />
          <button
            onClick={() => loadOrGenerateTopic(activeTopic, true)}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Customize Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Topic Switcher Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topicsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => loadOrGenerateTopic(t.id)}
              className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-white/10 text-white' : t.color
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{t.label}</h3>
                  <p className={`text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {t.id === 'linkedin' ? 'Headlines & About' : t.id === 'networking' ? 'Cold outreach scripts' : t.id === 'github' ? 'Pinning & READMEs' : 'Project ideas'}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'}`} />
            </button>
          );
        })}
      </div>

      {/* Main Topic Guide Content */}
      {isGenerating ? (
        <div className="text-center py-24 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-sm animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Formulating mentorship strategies...</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Gemini AI is gathering tech recruiter insights and cold outreach templates for {targetRole}.
            </p>
          </div>
        </div>
      ) : currentData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
          {/* Left 2 Cols: Overview & Templates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900">{currentData.title || currentData.topic.toUpperCase()}</h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                  Target: {targetRole}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentData.overview}
              </p>
            </div>

            {/* Ready-to-Use Templates */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Send className="w-5 h-5 text-indigo-600" />
                <span>Ready-to-Use Templates & Scripts</span>
              </h3>
              <p className="text-xs text-slate-500 -mt-2">
                Copy and customize these formulas with your university and technical keywords.
              </p>

              <div className="space-y-6">
                {(currentData.templates || []).map((tpl, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{tpl.title}</h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(tpl.templateText);
                          showToast(`Copied template "${tpl.title}"!`, 'success');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors self-start sm:self-center"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed shadow-xs">
                      {tpl.templateText}
                    </div>

                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Recruiter Tip:</strong> {tpl.usageTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Action Checklist & Pro Tips */}
          <div className="space-y-6">
            {/* Action Checklist */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Action Checklist ({currentData.actionChecklist?.length || 0})</span>
              </h3>

              <div className="space-y-3">
                {(currentData.actionChecklist || []).map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.task}</span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.2 rounded-md ${
                        item.difficulty === 'High Impact' ? 'bg-purple-100 text-purple-800' :
                        item.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.difficulty || 'Easy'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      <strong>Why:</strong> {item.whyImportant}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tips from Tech Recruiters */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold tracking-tight">Insider Recruiter Secrets</h3>
              </div>

              <ul className="space-y-3">
                {(currentData.proTips || []).map((tip, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      ★
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">Select any topic above to load mentorship advice.</p>
        </div>
      )}
    </div>
  );
};
