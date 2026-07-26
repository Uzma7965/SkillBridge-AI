import React from 'react';
import { 
  FileText, 
  Search, 
  Sparkles, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Clock, 
  Trash2, 
  Map, 
  MessageSquare, 
  PenTool, 
  Lightbulb, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { 
  ResumeData, 
  JobDescriptionData, 
  CareerAnalysisResult, 
  UserStats, 
  NavigationTab 
} from '../types';

interface DashboardViewProps {
  activeResume: ResumeData | null;
  activeJD: JobDescriptionData | null;
  stats: UserStats;
  recentAnalyses: CareerAnalysisResult[];
  onTabChange: (tab: NavigationTab) => void;
  onSelectAnalysis: (analysis: CareerAnalysisResult) => void;
  onDeleteAnalysis: (id: string, e: React.MouseEvent) => void;
  onLoadSampleData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeResume,
  activeJD,
  stats,
  recentAnalyses,
  onTabChange,
  onSelectAnalysis,
  onDeleteAnalysis,
  onLoadSampleData
}) => {
  const latestAnalysis = recentAnalyses.length > 0 ? recentAnalyses[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-8 bg-blue-600 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-sm">
        <div className="space-y-2 max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/30 text-white px-2.5 py-0.5 rounded-full">
              Career Command Center
            </span>
            {activeResume && (
              <span className="text-xs font-semibold bg-emerald-400/20 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                ● Resume Loaded
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back to SkillBridge AI
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Track your internship readiness, discover missing technical skills, and generate personalized weekly learning roadmaps.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onTabChange('analysis')}
            className="px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs shadow-xs flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run AI Match</span>
          </button>
          {!activeResume && (
            <button
              onClick={onLoadSampleData}
              className="px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Load Sample Resume</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Active Resume */}
        <div 
          onClick={() => onTabChange('resume')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">Active Resume</p>
            <p className="text-base font-bold text-slate-900 truncate max-w-[180px]">
              {activeResume ? activeResume.name.split(' - ')[0] : 'No Resume'}
            </p>
            <p className="text-[11px] text-blue-600 font-medium">
              {activeResume ? `${activeResume.wordCount || 350} words • Click to change` : 'Click to upload or load sample'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Jobs Analyzed */}
        <div 
          onClick={() => onTabChange('jd-analyzer')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">Target Job Role</p>
            <p className="text-base font-bold text-slate-900 truncate max-w-[180px]">
              {activeJD ? activeJD.title.split(',')[0] : 'No Job Selected'}
            </p>
            <p className="text-[11px] text-indigo-600 font-medium">
              {stats.jobsAnalyzed} job description{stats.jobsAnalyzed !== 1 ? 's' : ''} in library
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Average Match Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">Avg Skill Match</p>
            <p className="text-2xl font-black text-slate-900">
              {latestAnalysis ? `${latestAnalysis.matchPercentage}%` : `${stats.averageScore}%`}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{latestAnalysis ? 'Latest evaluation' : 'Benchmark score'}</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Readiness Level */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">Readiness Level</p>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
              latestAnalysis?.readinessLevel === 'Interview Ready'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : latestAnalysis?.readinessLevel === 'On the Right Track'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {latestAnalysis ? latestAnalysis.readinessLevel : 'On the Right Track'}
            </span>
            <p className="text-[11px] text-slate-500 pt-0.5">
              {latestAnalysis ? `${latestAnalysis.readinessScore}/100 readiness index` : 'Based on sample tech profiles'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: AI Recommendations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: AI Readiness Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">AI Readiness Recommendations</h2>
                <p className="text-xs text-slate-500">Tailored action items to boost your internship callback rate</p>
              </div>
            </div>
            {latestAnalysis && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                From latest analysis
              </span>
            )}
          </div>

          <div className="space-y-4">
            {latestAnalysis && latestAnalysis.topPriorityActions && latestAnalysis.topPriorityActions.length > 0 ? (
              latestAnalysis.topPriorityActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-100/80">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{action}</p>
                    <p className="text-xs text-slate-600">
                      High-impact step recommended by Gemini AI for your target role of <span className="font-semibold text-blue-700">{latestAnalysis.targetRole}</span>.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Default sample recommendations if no analysis run yet
              <>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-100/80">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Run a custom AI Match against a specific job posting</p>
                    <p className="text-xs text-slate-600">
                      Go to <button onClick={() => onTabChange('analysis')} className="text-blue-600 font-bold underline">AI Analysis</button> to see your exact match percentage and identify missing technical keywords.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100/80">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Upgrade your experience bullet points with quantified XYZ metrics</p>
                    <p className="text-xs text-slate-600">
                      Recruiters look for numbers and impact. Use our <button onClick={() => onTabChange('resume-writer')} className="text-indigo-600 font-bold underline">Resume Improvement Studio</button> to rewrite weak duties into achievements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/60 border border-purple-100/80">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Practice STAR answers in the interactive interview simulator</p>
                    <p className="text-xs text-slate-600">
                      Don't freeze during behavioral questions. Test your answers in <button onClick={() => onTabChange('interview')} className="text-purple-600 font-bold underline">Interview Prep</button> and get instant AI scoring.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Col 3: Quick Tools Launchpad */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Quick Tools Launchpad</h2>
            <p className="text-xs text-slate-500 mb-4">Select a tool to start preparing</p>

            <div className="space-y-2.5">
              <button
                onClick={() => onTabChange('analysis')}
                className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-between shadow-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>New AI Resume Analysis</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('roadmap')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Map className="w-4 h-4 text-indigo-600" />
                  <span>Generate Learning Roadmap</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('interview')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-violet-600" />
                  <span>Mock Interview Practice</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('resume-writer')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <PenTool className="w-4 h-4 text-blue-600" />
                  <span>Resume Bullet Rewriter</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('tips')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>LinkedIn & Cold Outreach</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 text-center">
            <p className="text-xs font-bold text-blue-900">Need immediate sample data?</p>
            <p className="text-[11px] text-blue-700 mt-0.5">Click "Load Sample Resume" in the top banner to populate 3 student profiles.</p>
          </div>
        </div>
      </div>

      {/* Recent Analyses List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent AI Analyses</h2>
            <p className="text-xs text-slate-500">Click on any previous analysis to view the full report or generate roadmaps</p>
          </div>
          <button
            onClick={() => onTabChange('history')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All History ({recentAnalyses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No analyses performed yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Upload your resume and select a target job description to get your match percentage and improvement plan.
            </p>
            <button
              onClick={() => onTabChange('analysis')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Start Your First Analysis</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentAnalyses.slice(0, 3).map((analysis) => (
              <div
                key={analysis.id}
                onClick={() => onSelectAnalysis(analysis)}
                className="group relative p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 truncate">
                    <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors" title={analysis.targetRole || analysis.jobTitle}>
                      {analysis.targetRole || analysis.jobTitle || 'Career Match'}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{analysis.date}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                      (analysis.matchPercentage || 0) >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      (analysis.matchPercentage || 0) >= 60 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {analysis.matchPercentage || 75}%
                    </span>
                    <button
                      onClick={(e) => onDeleteAnalysis(analysis.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Analysis"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {analysis.executiveSummary || 'Analyzed resume strengths, missing technical skills, and generated action plan.'}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                  <span>View full report & roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
