import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Clock, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Copy,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';
import { CareerAnalysisResult, NavigationTab } from '../types';
import { getAnalysesHistory, deleteAnalysis, clearHistory } from '../utils/storage';
import { useToast } from './Toast';

interface HistoryViewProps {
  analyses: CareerAnalysisResult[];
  onSelectAnalysis: (analysis: CareerAnalysisResult) => void;
  onDeleteAnalysis: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
  onTabChange: (tab: NavigationTab) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  analyses,
  onSelectAnalysis,
  onDeleteAnalysis,
  onClearAll,
  onTabChange
}) => {
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedDetail, setSelectedDetail] = useState<CareerAnalysisResult | null>(null);

  // Filter list
  const filtered = analyses.filter(a => {
    const matchesSearch = (a.targetRole || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (a.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (a.executiveSummary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || a.readinessLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  // Export JSON
  const exportJSON = (analysis: CareerAnalysisResult) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SkillBridge_Report_${analysis.targetRole || 'Career'}_${analysis.date}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Report exported as JSON!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <History className="w-7 h-7 text-blue-600" />
            <span>Saved Analyses & History</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            All your past AI resume evaluations and match reports are stored securely in local browser storage.
          </p>
        </div>

        {analyses.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire analysis history?')) {
                onClearAll();
                setSelectedDetail(null);
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      {analyses.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role or company..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-600 shrink-0">Level:</span>
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterLevel === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({analyses.length})
            </button>
            <button
              onClick={() => setFilterLevel('Interview Ready')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterLevel === 'Interview Ready' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Interview Ready
            </button>
            <button
              onClick={() => setFilterLevel('On the Right Track')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterLevel === 'On the Right Track' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              On the Right Track
            </button>
            <button
              onClick={() => setFilterLevel('Needs Polishing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterLevel === 'Needs Polishing' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Needs Polishing
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: List & Detailed Modal / Panel */}
      {analyses.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-dashed border-slate-300 max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:py-14">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <History className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your History is Empty</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6 leading-relaxed">
            Run an AI Resume Analysis against any job posting to build up your personal career readiness archive.
          </p>
          <button
            onClick={() => onTabChange('analysis')}
            className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run Your First Analysis</span>
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No analyses match your search criteria "{searchTerm}".</p>
          <button onClick={() => { setSearchTerm(''); setFilterLevel('all'); }} className="mt-2 text-xs font-bold text-blue-600 underline">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Cards List */}
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((analysis) => {
              const isSelected = selectedDetail?.id === analysis.id;
              return (
                <div
                  key={analysis.id}
                  onClick={() => setSelectedDetail(analysis)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-md'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          (analysis.matchPercentage || 0) >= 80 ? 'bg-emerald-100 text-emerald-800' :
                          (analysis.matchPercentage || 0) >= 60 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {analysis.matchPercentage}% Match
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{analysis.date}</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{analysis.targetRole || analysis.jobTitle}</h3>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAnalysis(analysis);
                          onTabChange('dashboard');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <span>Load to Dashboard</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportJSON(analysis);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="Export JSON"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteAnalysis(analysis.id, e);
                          if (selectedDetail?.id === analysis.id) setSelectedDetail(null);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 italic">
                    "{analysis.executiveSummary}"
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Currently viewing full report →' : 'Click card to view detailed breakdown'}</span>
                    </span>
                    <span className="text-slate-500 font-normal">
                      Missing Skills: {(analysis.missingTechnicalSkills || []).length}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Col: Detailed View Panel */}
          <div className="lg:col-span-1">
            {selectedDetail ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24 animate-in slide-in-from-right-4 duration-200">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      Report Breakdown
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{selectedDetail.targetRole}</h3>
                    <p className="text-[11px] text-slate-500">Date generated: {selectedDetail.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDetail(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Match Score Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>ATS Compatibility</span>
                    <span className="text-blue-600">{selectedDetail.matchPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600" 
                      style={{ width: `${selectedDetail.matchPercentage || 70}%` }} 
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Executive Summary</p>
                  <p className="text-xs text-slate-700 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    "{selectedDetail.executiveSummary}"
                  </p>
                </div>

                {/* Missing Tech Skills */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-rose-700 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Missing Keywords ({selectedDetail.missingTechnicalSkills?.length || 0})</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(selectedDetail.missingTechnicalSkills || []).map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 text-[10px] font-bold border border-rose-200">
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-emerald-700 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Top Profile Strengths ({selectedDetail.strengths?.length || 0})</span>
                  </p>
                  <ul className="space-y-1">
                    {(selectedDetail.strengths || []).map((s, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onSelectAnalysis(selectedDetail);
                      onTabChange('dashboard');
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Load This Profile into Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => exportJSON(selectedDetail)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report (JSON)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 space-y-2 sticky top-24">
                <Eye className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold">Select any analysis card on the left to inspect full details and missing keywords.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
