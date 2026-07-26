import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Sparkles, 
  Award, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Code2, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ChevronRight, 
  TrendingUp, 
  Video, 
  FileText, 
  Save,
  HelpCircle
} from 'lucide-react';
import { RoadmapResult, RoadmapWeek, NavigationTab } from '../types';
import { generateLearningRoadmap } from '../services/api';
import { getSavedRoadmaps, saveRoadmap, updateRoadmapProgress, deleteRoadmap } from '../utils/storage';
import { useToast } from './Toast';

interface RoadmapViewProps {
  initialMissingSkills?: string[];
  initialRole?: string;
  onTabChange: (tab: NavigationTab) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  initialMissingSkills = [],
  initialRole = 'Software Engineering Intern',
  onTabChange
}) => {
  const { showToast } = useToast();

  const [roadmaps, setRoadmaps] = useState<RoadmapResult[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<RoadmapResult | null>(null);
  
  // Generator form
  const [targetRole, setTargetRole] = useState(initialRole);
  const [skillsInput, setSkillsInput] = useState(
    initialMissingSkills.length > 0 ? initialMissingSkills.join(', ') : 'React, TypeScript, Docker, SQL, System Design Basics'
  );
  const [timeframe, setTimeframe] = useState<number>(6);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = getSavedRoadmaps();
    setRoadmaps(saved);
    if (saved.length > 0) {
      setActiveRoadmap(saved[0]);
    }
  }, []);

  // Handle Generate
  const handleGenerate = async () => {
    const skillsList = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsList.length === 0) {
      showToast('Please enter at least one missing skill to learn.', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      showToast('Formulating customized weekly roadmap with Gemini AI...', 'info');
      const newRoadmap = await generateLearningRoadmap(skillsList, targetRole || 'Tech Intern', timeframe);
      
      saveRoadmap(newRoadmap);
      const updated = getSavedRoadmaps();
      setRoadmaps(updated);
      setActiveRoadmap(newRoadmap);
      setIsGenerating(false);
      showToast('Learning roadmap generated & saved!', 'success');
    } catch (err: any) {
      setIsGenerating(false);
      showToast(`Roadmap generation failed: ${err.message}`, 'error');
    }
  };

  // Toggle Week Completion
  const handleToggleWeek = (weekNum: number) => {
    if (!activeRoadmap) return;
    const week = activeRoadmap.weeks.find(w => w.weekNumber === weekNum);
    if (!week) return;

    const newStatus = !week.completed;
    updateRoadmapProgress(activeRoadmap.id, weekNum, newStatus);
    
    // Update local state
    const updatedWeeks = activeRoadmap.weeks.map(w => w.weekNumber === weekNum ? { ...w, completed: newStatus } : w);
    const updatedRoadmap = { ...activeRoadmap, weeks: updatedWeeks };
    setActiveRoadmap(updatedRoadmap);

    const newRoadmaps = roadmaps.map(r => r.id === updatedRoadmap.id ? updatedRoadmap : r);
    setRoadmaps(newRoadmaps);

    if (newStatus) {
      showToast(`Week ${weekNum} completed! Keep up the great momentum!`, 'success');
    }
  };

  // Delete roadmap
  const handleDeleteRoadmap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteRoadmap(id);
    const updated = getSavedRoadmaps();
    setRoadmaps(updated);
    if (activeRoadmap?.id === id) {
      setActiveRoadmap(updated.length > 0 ? updated[0] : null);
    }
    showToast('Roadmap removed from library.', 'info');
  };

  // Calculate completion percentage
  const getProgressPercent = (rm: RoadmapResult) => {
    if (!rm.weeks || rm.weeks.length === 0) return 0;
    const completed = rm.weeks.filter(w => w.completed).length;
    return Math.round((completed / rm.weeks.length) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Map className="w-7 h-7 text-indigo-600" />
            <span>Personalized Learning Roadmaps</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Transform your missing skills into an actionable weekly bootcamp with free courses and practical GitHub projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {roadmaps.length > 0 && (
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-xl">
              {roadmaps.length} Roadmap{roadmaps.length !== 1 ? 's' : ''} in library
            </span>
          )}
        </div>
      </div>

      {/* Generator Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Custom Roadmap Generator</h2>
            <p className="text-xs text-slate-500">Specify your target role and skills to learn, and let Gemini architect your study plan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Internship / Job Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Engineer Intern"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Skills to Master (comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. React, TypeScript, SQL, Docker, Algorithms"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Timeframe (Weeks)</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={4}>4 Weeks (Intensive Fast-Track)</option>
              <option value={6}>6 Weeks (Standard Recommended)</option>
              <option value={8}>8 Weeks (Deep Dive Mastery)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate New Learning Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Grid: Roadmap Tabs & Active Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Saved Roadmaps Library */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">My Roadmaps Library</h2>

          {roadmaps.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
              <Map className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-600 font-semibold">No roadmaps generated yet</p>
              <p className="text-[11px] text-slate-500">Use the generator above to create your first study schedule.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {roadmaps.map((rm) => {
                const isActive = activeRoadmap?.id === rm.id;
                const progress = getProgressPercent(rm);
                return (
                  <div
                    key={rm.id}
                    onClick={() => setActiveRoadmap(rm)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isActive
                        ? 'bg-indigo-50/80 border-indigo-600 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 truncate">
                        <h3 className="text-xs font-bold text-slate-900 truncate">{rm.targetRole}</h3>
                        <p className="text-[10px] text-slate-500">
                          {rm.totalWeeks} Weeks • Created {rm.date}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteRoadmap(rm.id, e)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-300" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Active Roadmap Weekly Modules */}
        <div className="lg:col-span-3 space-y-6">
          {activeRoadmap ? (
            <div className="space-y-6">
              {/* Roadmap Header Card */}
              <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/30 text-white px-2.5 py-0.5 rounded-full">
                      {activeRoadmap.totalWeeks}-Week Study Roadmap
                    </span>
                    <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
                      Target: {activeRoadmap.targetRole}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Your Personalized Career Transition Plan
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    {activeRoadmap.overview}
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center shrink-0 min-w-[150px]">
                  <p className="text-xs font-semibold text-blue-100 uppercase">Overall Progress</p>
                  <p className="text-3xl font-bold text-white mt-1">{getProgressPercent(activeRoadmap)}%</p>
                  <p className="text-[10px] text-blue-100 mt-1">
                    {activeRoadmap.weeks.filter(w => w.completed).length} of {activeRoadmap.weeks.length} weeks finished
                  </p>
                </div>
              </div>

              {/* Priority ROI Skills Banner */}
              {activeRoadmap.prioritySkills && activeRoadmap.prioritySkills.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Skills to Learn First (Highest Market ROI for Internships)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeRoadmap.prioritySkills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{sk}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Modules List */}
              <div className="space-y-6">
                {activeRoadmap.weeks.map((week) => (
                  <div 
                    key={week.weekNumber}
                    className={`rounded-2xl p-6 border transition-all shadow-xs space-y-6 ${
                      week.completed 
                        ? 'bg-emerald-50/40 border-emerald-300' 
                        : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {/* Week Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div className="flex items-start gap-3.5">
                        <button
                          onClick={() => handleToggleWeek(week.weekNumber)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                            week.completed
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300'
                          }`}
                          title={week.completed ? "Mark as uncompleted" : "Mark as completed"}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </button>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-md ${
                              week.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              Week {week.weekNumber}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{week.estimatedHours || 10} hours estimated</span>
                            </span>
                          </div>
                          <h3 className={`text-lg font-bold ${week.completed ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                            {week.title}
                          </h3>
                        </div>
                      </div>

                      {/* Focus skills pills */}
                      <div className="flex flex-wrap gap-1">
                        {(week.focusSkills || []).map((fs, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            #{fs}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Grid: Objectives & Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Learning Objectives */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          <span>Learning Objectives</span>
                        </h4>
                        <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                          {(week.learningObjectives || []).map((obj, i) => (
                            <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Free Learning Resources */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Video className="w-4 h-4 text-purple-600" />
                          <span>Free Learning Resources</span>
                        </h4>
                        <div className="space-y-2">
                          {(week.freeResources || []).map((res, i) => (
                            <a
                              key={i}
                              href={res.url && res.url.startsWith('http') ? res.url : `https://www.google.com/search?q=${encodeURIComponent(res.title + ' ' + res.platform)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group"
                            >
                              <div className="space-y-0.5 truncate pr-2">
                                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate flex items-center gap-1">
                                  <span>{res.title}</span>
                                </p>
                                <p className="text-[10px] text-slate-500 font-semibold">
                                  {res.platform} • {res.type || 'Course'}
                                </p>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Practical Project Deliverable */}
                    <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-900">
                            Weekly Deliverable (Add to GitHub / Resume)
                          </p>
                          <p className="text-xs text-slate-800 font-semibold mt-0.5">
                            {week.practicalProject}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleWeek(week.weekNumber)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          week.completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-300'
                        }`}
                      >
                        {week.completed ? '✓ Completed' : 'Mark as Done'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Active Roadmap Selected</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Use the generator box at the top to architect a 4 to 8-week bootcamp plan for your dream role.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
