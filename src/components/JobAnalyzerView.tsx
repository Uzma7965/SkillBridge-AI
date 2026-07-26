import React, { useState } from 'react';
import { 
  Search, 
  Target, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  Sparkles, 
  Save, 
  Trash2, 
  RefreshCw, 
  Plus, 
  Building2, 
  Award, 
  ChevronRight,
  Copy
} from 'lucide-react';
import { JobDescriptionData } from '../types';
import { SAMPLE_JOBS } from '../data/sampleData';
import { analyzeJobDescription } from '../services/api';
import { useToast } from './Toast';

interface JobAnalyzerViewProps {
  jds: JobDescriptionData[];
  activeJD: JobDescriptionData | null;
  onSaveJD: (jd: JobDescriptionData) => void;
  onSelectJD: (jd: JobDescriptionData) => void;
  onDeleteJD: (id: string) => void;
}

export const JobAnalyzerView: React.FC<JobAnalyzerViewProps> = ({
  jds,
  activeJD,
  onSaveJD,
  onSelectJD,
  onDeleteJD
}) => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'paste' | 'samples' | 'library'>('samples');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle Paste & AI Extraction
  const handleAnalyzeAndSave = async () => {
    if (!jdText.trim()) {
      showToast('Please paste the job description text first.', 'error');
      return;
    }

    setIsAnalyzing(true);
    try {
      showToast('Extracting skills and requirements with Gemini AI...', 'info');
      const extracted = await analyzeJobDescription(jdText.trim());
      
      const title = jobTitle.trim() || extracted.title || `Job (${new Date().toLocaleDateString()})`;
      const company = companyName.trim() || extracted.companyName || 'Not specified';

      const newJD: JobDescriptionData = {
        id: `jd-${Date.now()}`,
        title,
        companyName: company,
        text: jdText.trim(),
        dateAdded: new Date().toISOString().split('T')[0],
        experienceLevel: extracted.experienceLevel || 'Internship / Entry Level',
        requiredTechnicalSkills: extracted.requiredTechnicalSkills || [],
        requiredSoftSkills: extracted.requiredSoftSkills || [],
        keyResponsibilities: extracted.keyResponsibilities || [],
        minimumQualifications: extracted.minimumQualifications || [],
        preferredQualifications: extracted.preferredQualifications || []
      };

      onSaveJD(newJD);
      setJobTitle('');
      setCompanyName('');
      setJdText('');
      setIsAnalyzing(false);
      showToast(`Analyzed & saved "${title}"!`, 'success');
    } catch (error: any) {
      setIsAnalyzing(false);
      showToast(`Analysis failed: ${error.message}`, 'error');
    }
  };

  // Handle Select Sample
  const handleSelectSample = (sample: JobDescriptionData) => {
    const copy: JobDescriptionData = {
      ...sample,
      id: `jd-sample-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    onSaveJD(copy);
    showToast(`Loaded target role: "${sample.title}"!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 lg:py-6 xl:py-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-7 h-7 text-indigo-600" />
            <span>Job Description Analyzer</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Paste any internship or job posting. Gemini AI extracts required skills, responsibilities, and must-have qualifications.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'samples' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ★ Try Top Internships
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'paste' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Paste New Job
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'library' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Jobs ({jds.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Selector / Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* SAMPLES TAB */}
          {activeTab === 'samples' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-indigo-600">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-base font-bold text-slate-900">Pre-configured Internships</h2>
              </div>
              <p className="text-xs text-slate-600">
                Select any top company internship below to instantly inspect required technical competencies and responsibilities.
              </p>

              <div className="space-y-3 pt-2">
                {SAMPLE_JOBS.map((sample) => {
                  const isActive = activeJD?.title === sample.title;
                  return (
                    <div
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isActive
                          ? 'bg-indigo-50/80 border-indigo-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <h3 className="text-xs font-bold text-slate-900">{sample.title}</h3>
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-semibold">
                            {sample.companyName}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                        Required: {(sample.requiredTechnicalSkills || []).slice(0, 4).join(', ')}...
                      </p>
                      <div className="pt-1 text-right">
                        <span className="text-[11px] font-semibold text-indigo-600 hover:underline">
                          {isActive ? 'Currently Selected ✓' : 'Load This Job Role →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASTE NEW JOB TAB */}
          {activeTab === 'paste' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Paste Job Description</span>
              </h2>
              <p className="text-xs text-slate-600">
                Copy text from LinkedIn, Glassdoor, or company careers page and let Gemini extract the requirements.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title (Optional)</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Software Engineering Intern, Summer 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Microsoft / Stripe / OpenAI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Job Description Text</label>
                  <textarea
                    rows={8}
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste about the role, required qualifications, responsibilities, and tech stack..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  />
                </div>
                <button
                  onClick={handleAnalyzeAndSave}
                  disabled={isAnalyzing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Extracting with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze & Save Job</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* MY JOBS LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Saved Target Jobs</h2>
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                  {jds.length} saved
                </span>
              </div>

              {jds.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No job descriptions saved yet. Try pasting or loading a sample role.</p>
              ) : (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {jds.map((j) => {
                    const isActive = activeJD?.id === j.id;
                    return (
                      <div
                        key={j.id}
                        onClick={() => onSelectJD(j)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isActive ? 'bg-indigo-50 border-indigo-600 shadow-xs' : 'bg-slate-50 hover:bg-white border-slate-200'
                        }`}
                      >
                        <div className="space-y-0.5 truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{j.title}</p>
                          <p className="text-[10px] text-slate-500">
                            {j.companyName} • Added {j.dateAdded}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {isActive && (
                            <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteJD(j.id);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: AI Extraction & Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          {activeJD ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> Active Target Job
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {activeJD.experienceLevel || 'Internship Level'}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 truncate max-w-lg">
                    {activeJD.title}
                  </h2>
                  <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{activeJD.companyName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeJD.text);
                      showToast('Job description copied to clipboard!', 'success');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>

              {/* Required Technical Skills Pill Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Required Technical Skills ({activeJD.requiredTechnicalSkills?.length || 0})</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeJD.requiredTechnicalSkills && activeJD.requiredTechnicalSkills.length > 0 ? (
                    activeJD.requiredTechnicalSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No specific technical skills listed.</span>
                  )}
                </div>
              </div>

              {/* Required Soft Skills Pill Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Required Soft Skills & Competencies ({activeJD.requiredSoftSkills?.length || 0})</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeJD.requiredSoftSkills && activeJD.requiredSoftSkills.length > 0 ? (
                    activeJD.requiredSoftSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-medium">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No soft skills listed.</span>
                  )}
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Key Responsibilities & Day-to-Day Duties</span>
                </h3>
                <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {activeJD.keyResponsibilities && activeJD.keyResponsibilities.length > 0 ? (
                    activeJD.keyResponsibilities.map((resp, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{resp}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-slate-500 italic">See full job description text for duties.</li>
                  )}
                </ul>
              </div>

              {/* Qualifications (Minimum vs Preferred) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Minimum Qualifications</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeJD.minimumQualifications && activeJD.minimumQualifications.length > 0 ? (
                      activeJD.minimumQualifications.map((qual, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-relaxed">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{qual}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-slate-500 italic">Not explicitly listed.</li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-200/60">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Preferred Qualifications</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeJD.preferredQualifications && activeJD.preferredQualifications.length > 0 ? (
                      activeJD.preferredQualifications.map((qual, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-relaxed">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{qual}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-slate-500 italic">Not explicitly listed.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Target Job Selected</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Please select a sample internship from the left panel or paste a new job posting to extract requirements.
              </p>
              <button
                onClick={() => setActiveTab('samples')}
                className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-indigo-700 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Choose Sample Internship</span>
              </button>
            </div>
          )}

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Extracted with structured JSON schema parsing</span>
            <span className="font-semibold text-indigo-700">Ready to compare with resume ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
