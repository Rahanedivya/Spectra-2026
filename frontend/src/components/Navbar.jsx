import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Bookmark, Globe, User, ShieldAlert, Utensils, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentLang, setCurrentLang, onOpenAuth, savedCount = 0 }) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const languages = [
    { code: 'English', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'Marathi', label: 'मराठी (MR)', flag: '🚩' },
    { code: 'Hindi', label: 'हिंदी (HI)', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#181112]/95 backdrop-blur-md border-b border-[#3a1d23] text-[#faf6f0] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#701a28] to-[#ea580c] p-0.5 shadow-lg shadow-[#701a28]/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#181112] rounded-[10px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#ea580c] animate-pulse-glow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heritage text-2xl font-bold tracking-wide text-[#faf6f0]">HeritageAI</span>
                <span className="bg-[#ea580c]/20 border border-[#ea580c]/40 text-[#ea580c] text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold">
                  Pune
                </span>
              </div>
              <p className="text-[11px] text-[#d6c7b2] font-medium tracking-tight">
                Discover Pune. Experience Its Heritage.
              </p>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#701a28] text-[#fffdfa] border border-[#881337] shadow-md'
                  : 'text-[#d6c7b2] hover:text-[#fffdfa] hover:bg-[#28181b]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-[#701a28] text-[#fffdfa] border border-[#881337] shadow-md'
                  : 'text-[#d6c7b2] hover:text-[#fffdfa] hover:bg-[#28181b]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#ea580c]" />
              <span>Explore</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold shadow-lg shadow-[#ea580c]/25'
                  : 'bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/30 hover:bg-[#ea580c]/25'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ AI Trip Planner</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'food'
                  ? 'bg-[#701a28] text-[#fffdfa] border border-[#881337] shadow-md'
                  : 'text-[#d6c7b2] hover:text-[#fffdfa] hover:bg-[#28181b]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#ea580c]" />
              <span>Taste Pune</span>
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'safety'
                  ? 'bg-[#701a28] text-[#fffdfa] border border-[#881337] shadow-md'
                  : 'text-[#d6c7b2] hover:text-[#fffdfa] hover:bg-[#28181b]'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Smart Safety</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            
            {/* Saved Trips Counter */}
            <button
              onClick={() => setActiveTab('saved')}
              className="relative p-2.5 rounded-xl bg-[#231417] border border-[#3a1d23] text-[#d6c7b2] hover:text-[#ea580c] transition-colors cursor-pointer"
              title="Saved Trips & Favorites"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ea580c] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#231417] border border-[#ea580c]/30 text-[#ea580c] text-xs font-semibold hover:border-[#ea580c]/60 transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#ea580c]" />
                <span>{languages.find(l => l.code === currentLang)?.flag} {currentLang}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#231417] border border-[#ea580c]/30 shadow-2xl py-1 z-50 animate-in fade-in">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#701a28] text-white'
                          : 'text-[#d6c7b2] hover:bg-[#28181b]'
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
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-[#ea580c]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 rounded-xl bg-[#231417] text-[#d6c7b2]"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#181112] border-b border-[#3a1d23] px-4 pt-2 pb-6 space-y-2 text-sm font-semibold">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'home' ? 'bg-[#701a28] text-white' : 'text-[#d6c7b2]'}`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'explore' ? 'bg-[#701a28] text-white' : 'text-[#d6c7b2]'}`}
          >
            Explore Sites
          </button>
          <button
            onClick={() => { setActiveTab('planner'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold`}
          >
            ✨ AI Trip Planner
          </button>
          <button
            onClick={() => { setActiveTab('food'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'food' ? 'bg-[#701a28] text-white' : 'text-[#d6c7b2]'}`}
          >
            Taste Pune
          </button>
          <button
            onClick={() => { setActiveTab('safety'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'safety' ? 'bg-[#701a28] text-white' : 'text-[#d6c7b2]'}`}
          >
            Smart Safety
          </button>
        </div>
      )}

    </header>
  );
}
