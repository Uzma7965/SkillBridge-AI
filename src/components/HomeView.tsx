import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Search, 
  Map, 
  MessageSquare, 
  PenTool, 
  Lightbulb, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Users, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Target
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HomeViewProps {
  onTabChange: (tab: NavigationTab) => void;
  onLoadSample: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onTabChange, onLoadSample }) => {
  const features = [
    {
      id: 'analysis',
      title: 'AI Resume vs Job Matcher',
      description: 'Compare your resume against any internship or full-time job description. Get instant match percentages, missing skill alerts, and ATS score breakdown.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Most Popular',
      tab: 'analysis' as NavigationTab
    },
    {
      id: 'roadmap',
      title: 'Personalized Learning Roadmaps',
      description: 'Automatically generate a 4 to 8-week bootcamp roadmap tailored to learn the exact technical and soft skills you are missing for your target role.',
      icon: Map,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Interactive',
      tab: 'roadmap' as NavigationTab
    },
    {
      id: 'interview',
      title: 'AI Interview Simulator',
      description: 'Practice with tailored technical, HR, and situational STAR questions. Answer in real-time and let Gemini AI score your response out of 10 with actionable feedback.',
      icon: MessageSquare,
      color: 'from-violet-500 to-pink-600',
      badge: 'Real-Time AI',
      tab: 'interview' as NavigationTab
    },
    {
      id: 'resume-writer',
      title: 'Resume Improvement Studio',
      description: 'Rewrite weak bullet points into high-impact XYZ achievement formulas. Generate executive summaries and optimize your skills section for ATS scanners.',
      icon: PenTool,
      color: 'from-blue-600 to-cyan-600',
      tab: 'resume-writer' as NavigationTab
    },
    {
      id: 'jd-analyzer',
      title: 'Job Description Breakdown',
      description: 'Paste any job posting to extract must-have technical tools, core responsibilities, and hidden recruiter qualifications in seconds.',
      icon: Search,
      color: 'from-teal-500 to-emerald-600',
      tab: 'jd-analyzer' as NavigationTab
    },
    {
      id: 'tips',
      title: 'LinkedIn & Networking Hub',
      description: 'Generate customized recruiter outreach templates, LinkedIn headline formulas, GitHub portfolio checklists, and cold email scripts.',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-600',
      tab: 'tips' as NavigationTab
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload or Choose a Resume',
      description: 'Drag and drop your PDF/DOCX, paste text manually, or load our pre-configured CS, Data Science, or Product Management sample resumes.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Paste Your Target Job',
      description: 'Enter the job description for your dream internship or select from top tech companies (Google SWE, AI/ML Intern, Product Manager).',
      icon: Target
    },
    {
      step: '03',
      title: 'Run Gemini AI Analysis',
      description: 'Our AI engine calculates your exact match score, identifies missing skills, and suggests quantified XYZ bullet point improvements.',
      icon: Sparkles
    },
    {
      step: '04',
      title: 'Level Up & Ace the Interview',
      description: 'Follow your customized weekly roadmap and practice answering behavioral and coding questions in our interactive mock interview simulator.',
      icon: Award
    }
  ];

  const testimonials = [
    {
      quote: "SkillBridge AI pointed out that my resume lacked Docker and CI/CD keywords for a backend role. I followed the 4-week roadmap, added the skills, and landed my summer SWE internship!",
      author: "David K.",
      role: "Software Engineer Intern @ Cloud Systems",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The AI Interview Simulator gave me realistic STAR behavioral feedback. It told me how to structure my answers better, which boosted my confidence immensely during HR rounds.",
      author: "Elena R.",
      role: "Data Science Fellow @ Fintech AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "As a business student transitioning to Product Management, I didn't know how to write PRD bullet points. The Resume Improvement Studio rewrote my experience section flawlessly.",
      author: "Marcus T.",
      role: "Associate Product Manager Intern",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-6 lg:pb-20 xl:pt-8 xl:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 lg:space-y-6 xl:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Career Coach & Internship Assistant</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto lg:max-w-5xl xl:max-w-6xl leading-[1.15]">
            Bridge the Gap Between Your Resume and Your{' '}
            <span className="text-blue-600">
              Dream Internship
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:max-w-3xl xl:max-w-4xl leading-relaxed">
            Don't guess what recruiters want. SkillBridge AI analyzes your resume against real job postings, identifies missing skills, builds custom learning roadmaps, and conducts mock interviews to make you 100% ready.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onTabChange('analysis')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Free AI Resume Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onLoadSample();
                onTabChange('dashboard');
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Try With Sample Resume & Job</span>
            </button>
          </div>

          {/* Quick Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto lg:max-w-5xl xl:max-w-6xl border-t border-slate-200 text-left sm:text-center">
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">ATS Keyword Optimization</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Powered by Gemini 3 Flash</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Custom Learning Roadmaps</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Real-Time Mock Interviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-blue-400">94%</p>
              <p className="text-xs sm:text-sm text-slate-400">Average ATS Score After AI Polish</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400">3.5x</p>
              <p className="text-xs sm:text-sm text-slate-400">More Interview Callbacks</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-purple-400">15,000+</p>
              <p className="text-xs sm:text-sm text-slate-400">Skills & Keywords Analyzed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-amber-400">100% Free</p>
              <p className="text-xs sm:text-sm text-slate-400">For University Students & Interns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Everything You Need to Ace Your Career Transition
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Our comprehensive suite of AI tools bridges every gap in your career preparation journey—from your first resume draft to the final technical interview round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => onTabChange(feature.tab)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {feature.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Open tool</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto lg:max-w-3xl xl:max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full">
              4-Step Workflow
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              How SkillBridge Works in Minutes
            </h2>
            <p className="text-sm text-slate-600">
              No complicated setups. Start analyzing your skills immediately using our smart AI engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-blue-600/20">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto lg:max-w-3xl xl:max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Loved by Students & Interns
          </h2>
          <p className="text-sm text-slate-600">
            See how SkillBridge AI has helped university students crack technical interviews and land roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-blue-600 p-8 sm:p-12 lg:p-14 xl:p-16 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 lg:gap-12 shadow-sm overflow-hidden">
          <div className="space-y-2 max-w-xl lg:max-w-2xl xl:max-w-3xl z-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Bridge Your Skill Gap Today?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Start your free AI career analysis right now. Test with our built-in sample resumes or upload your own in seconds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 z-10 w-full sm:w-auto">
            <button
              onClick={() => {
                onLoadSample();
                onTabChange('analysis');
              }}
              className="px-6 py-4 rounded-xl bg-white text-blue-600 font-semibold text-sm shadow-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Instant Sample Analysis</span>
            </button>
            <button
              onClick={() => onTabChange('resume')}
              className="px-6 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Upload Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
