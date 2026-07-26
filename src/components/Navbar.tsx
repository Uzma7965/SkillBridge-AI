import React, { useState } from 'react';
import { 
  Briefcase, 
  LayoutDashboard, 
  FileText, 
  Search, 
  Sparkles, 
  Map, 
  MessageSquare, 
  PenTool, 
  Lightbulb, 
  History, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  hasActiveResume: boolean;
  hasActiveJD: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onTabChange, 
  hasActiveResume, 
  hasActiveJD 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Briefcase },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume', label: 'Resume', icon: FileText, badge: hasActiveResume ? 'Loaded' : null },
    { id: 'jd-analyzer', label: 'JD Analyzer', icon: Search, badge: hasActiveJD ? 'Loaded' : null },
    { id: 'analysis', label: 'AI Analysis', icon: Sparkles, highlight: true },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
    { id: 'resume-writer', label: 'Resume Writer', icon: PenTool },
    { id: 'tips', label: 'Career Tips', icon: Lightbulb },
    { id: 'history', label: 'History', icon: History },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id as NavigationTab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 whitespace-nowrap">
                SkillBridge <span className="text-blue-600">AI</span>
              </span>
              <span className="hidden md:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                Career Assistant
              </span>
            </div>
          </div>

          {/* Quick Status & Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hasActiveResume && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Resume Active</span>
              </div>
            )}

            <button
              onClick={() => handleNavClick('analysis')}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Match</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>

            {/* Mobile/Tablet Hamburger Button (Visible only below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Universal Responsive Navigation Strip (FITS LAPTOP, TABLET & MOBILE) */}
      <nav className="bg-slate-50/95 border-t border-slate-200/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : item.highlight
                      ? 'bg-blue-100/70 text-blue-800 hover:bg-blue-200/80 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Navigation Drawer (Grid overview when hamburger clicked) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium border text-left ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : item.highlight
                      ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-1">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => handleNavClick('analysis')}
              className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run AI Match & Readiness Analysis</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
