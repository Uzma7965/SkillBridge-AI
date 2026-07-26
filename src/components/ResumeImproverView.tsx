import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Layers, 
  Briefcase, 
  Code2, 
  Award, 
  HelpCircle, 
  ArrowRight,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { ResumeData, JobDescriptionData, ResumeImprovementResult, NavigationTab } from '../types';
import { improveResumeSection } from '../services/api';
import { useToast } from './Toast';

interface ResumeImproverViewProps {
  activeResume: ResumeData | null;
  activeJD: JobDescriptionData | null;
  onTabChange: (tab: NavigationTab) => void;
}

export const ResumeImproverView: React.FC<ResumeImproverViewProps> = ({
  activeResume,
  activeJD,
  onTabChange
}) => {
  const { showToast } = useToast();

  const [sectionType, setSectionType] = useState<'summary' | 'experience' | 'project' | 'skills'>('summary');
  const [contentInput, setContentInput] = useState('');
  const [targetRole, setTargetRole] = useState(activeJD ? activeJD.title : 'Software Engineer Intern');
  const [isImproving, setIsImproving] = useState(false);
  const [result, setResult] = useState<ResumeImprovementResult | null>(null);

  // Load preset examples when tab switches or button clicked
  const loadPresetExample = (type: 'summary' | 'experience' | 'project' | 'skills') => {
    setSectionType(type);
    setResult(null);
    if (type === 'summary') {
      setContentInput('Computer science student looking for a software engineering internship for summer 2026. Good at coding in Python and Java and familiar with web development.');
    } else if (type === 'experience') {
      setContentInput(`Software Intern | XYZ Company | Summer 2024
- Worked on the frontend team building website pages with React and CSS.
- Fixed bugs in the database and helped with customer tickets.
- Attended weekly meetings with developers and managers.`);
    } else if (type === 'project') {
      setContentInput(`E-commerce Website Project | Node.js, MongoDB, React
- Built an online store where people can buy items.
- Made a login system and a shopping cart page.
- Used MongoDB to save products and user accounts.`);
    } else if (type === 'skills') {
      setContentInput('Python, Java, Javascript, HTML, CSS, React, nodejs, mongodb, git, docker, vs code, sql, communication, teamwork, agile');
    }
    showToast(`Loaded sample ${type} text. Click "Generate AI Improvements"!`, 'info');
  };

  // Handle Generate
  const handleGenerate = async () => {
    if (!contentInput.trim() || contentInput.trim().length < 15) {
      showToast('Please enter or paste section content (at least 15 characters).', 'error');
      return;
    }

    setIsImproving(true);
    setResult(null);
    try {
      showToast('Gemini AI is crafting 3 optimized variations...', 'info');
      const data = await improveResumeSection(
        sectionType, 
        contentInput.trim(), 
        targetRole, 
        activeJD ? activeJD.text : ''
      );
      setResult(data);
      setIsImproving(false);
      showToast('3 improved variations generated!', 'success');
    } catch (err: any) {
      setIsImproving(false);
      showToast(`Improvement failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PenTool className="w-7 h-7 text-blue-600" />
            <span>Resume Improvement Studio (AI Writer)</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Upgrade weak bullet points into XYZ achievement formulas, generate executive summaries, and format skills for ATS scanners.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0 flex-wrap">
          <button
            onClick={() => loadPresetExample('summary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sectionType === 'summary' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => loadPresetExample('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sectionType === 'experience' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Experience Bullets
          </button>
          <button
            onClick={() => loadPresetExample('project')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sectionType === 'project' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => loadPresetExample('skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sectionType === 'skills' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Skills Section
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="capitalize">{sectionType} Editor</span>
            </h2>
            <button
              onClick={() => loadPresetExample(sectionType)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Load Sample →
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job / Internship Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer Intern"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Your Current {sectionType.toUpperCase()} Text Below:
              </label>
              <textarea
                rows={10}
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder={`Paste your draft ${sectionType} here or click "Load Sample" above...`}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isImproving || !contentInput.trim()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isImproving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating AI Variations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 3 Optimized Variations</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 text-[11px] text-blue-900 space-y-1">
            <p className="font-bold">ATS Writing Principle:</p>
            <p className="text-blue-700">We use active verbs (Engineered, Architected, Spearheaded) and quantify impact without fabricating credentials.</p>
          </div>
        </div>

        {/* Right Column: AI Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          {isImproving ? (
            <div className="text-center py-24 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm animate-spin">
                <RefreshCw className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Crafting high-impact resume phrasing...</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Gemini AI is applying the XYZ achievement formula and injecting keyword density for {targetRole}.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Overall Critique */}
              {result.overallCritique && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-sm border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Why Your Original Text Needed Polish</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{result.overallCritique}"
                  </p>
                </div>
              )}

              {/* 3 Variations List */}
              <div className="space-y-6">
                {(result.suggestions || []).map((opt, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-400 shadow-sm transition-all space-y-4 relative group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{opt.optionName}</h3>
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(opt.content);
                          showToast(`Copied "${opt.optionName}" to clipboard!`, 'success');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy This Option</span>
                      </button>
                    </div>

                    {/* Content Box */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 font-mono text-xs text-slate-900 whitespace-pre-wrap leading-relaxed">
                      {opt.content}
                    </div>

                    {/* Why this option wins */}
                    {opt.highlights && opt.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mr-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Why this works:</span>
                        </span>
                        {opt.highlights.map((hl, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Section Content Analyzed Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Paste your current summary or experience bullet points in the left panel, or click "Load Sample" to test immediately.
              </p>
              <button
                onClick={() => loadPresetExample('experience')}
                className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-blue-700 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Sample Experience Bullets</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
