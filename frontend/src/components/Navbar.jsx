import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Bookmark, Globe, User, ShieldAlert, Utensils } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentLang, setCurrentLang, onOpenAuth, savedCount = 0 }) {
  const [langDropdown, setLangDropdown] = useState(false);

  const languages = [
    { code: 'English', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'Marathi', label: 'मराठी (MR)', flag: '🚩' },
    { code: 'Hindi', label: 'हिंदी (HI)', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-7 h-7 text-amber-400 animate-pulse-glow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heritage text-2xl font-bold tracking-wide text-gradient-gold">HeritageAI</span>
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold">
                  Pune
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Discover Pune. Experience Its Heritage.
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeTab === 'explore'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Explore Sites</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 shadow-sm ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold'
                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ AI Trip Planner</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeTab === 'food'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Utensils className="w-4 h-4 text-orange-400" />
              <span>Taste Pune</span>
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeTab === 'safety'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Smart Safety</span>
            </button>
          </nav>

          {/* Right Action Items: Language Selector & Auth */}
          <div className="flex items-center space-x-3">
            
            {/* Saved Trips Counter */}
            <button
              onClick={() => setActiveTab('saved')}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
              title="Saved Trips & Favorites"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:border-amber-500/60 transition-colors"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>{languages.find(l => l.code === currentLang)?.flag} {currentLang}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl glass-card border border-amber-500/30 shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                        currentLang === lang.code
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span>{lang.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
