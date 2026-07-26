import React from 'react';
import { Sparkles, Github, Linkedin, Heart, ShieldCheck, Zap } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onTabChange: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SkillBridge <span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering students and job seekers to bridge the skill gap, optimize resumes, craft customized roadmaps, and ace technical & behavioral interviews with Google Gemini AI.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-800/60">
                <Zap className="w-3 h-3 text-blue-400" /> Powered by Gemini 3 Flash
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/40 text-emerald-300 border border-emerald-800/60">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> ATS Optimized
              </span>
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              AI Career Suite
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => onTabChange('analysis')} className="hover:text-blue-400 transition-colors">
                  AI Resume vs Job Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('roadmap')} className="hover:text-blue-400 transition-colors">
                  Interactive Learning Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('interview')} className="hover:text-blue-400 transition-colors">
                  AI Interview Prep & Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('resume-writer')} className="hover:text-blue-400 transition-colors">
                  Resume Improvement Studio
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('tips')} className="hover:text-blue-400 transition-colors">
                  Career & LinkedIn Mentorship
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Management */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Data & Workspaces
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => onTabChange('resume')} className="hover:text-blue-400 transition-colors">
                  Resume Upload & Manager
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('jd-analyzer')} className="hover:text-blue-400 transition-colors">
                  Job Description Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('dashboard')} className="hover:text-blue-400 transition-colors">
                  Readiness Score Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('history')} className="hover:text-blue-400 transition-colors">
                  Saved Analyses & History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Students */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Why SkillBridge?
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Designed specifically for university students, recent bootcamp graduates, and career changers transitioning into tech, data, and product roles.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="LinkedIn Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SkillBridge AI – Career & Internship Assistant. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
