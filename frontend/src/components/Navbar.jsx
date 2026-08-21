import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Bookmark, Globe, User, ShieldAlert, Utensils, Menu, X, Landmark, Users, ChevronDown, LogOut } from 'lucide-react';
import { t } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, currentLang, setCurrentLang, onOpenAuth, currentUser, onSignOut, savedCount = 0 }) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const languages = [
    { code: 'English', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'Marathi', label: 'मराठी (MR)', flag: '🚩' },
    { code: 'Hindi', label: 'हिंदी (HI)', flag: '🇮🇳' }
  ];

  const navItems = [
    { id: 'home', label: t('navHome', currentLang), icon: Compass },
    { id: 'explore', label: t('navExplore', currentLang), icon: MapPin, color: 'text-[#087F7B]' },
    { id: 'planner', label: t('navPlanner', currentLang), icon: Sparkles, isSpecial: true },
    { id: 'food', label: t('navTaste', currentLang), icon: Utensils, color: 'text-[#E87516]' },
    { id: 'guides', label: 'Local Guides', icon: Users, color: 'text-[#087F7B]' },
    { id: 'safety', label: t('navSafety', currentLang), icon: ShieldAlert, color: 'text-[#667A3A]' }
  ];

  return (
    <header className="sticky top-0 z-50 font-sans shadow-md">
      
      {/* Top Heritage Micro Bar */}
      <div className="bg-[#741C35] text-[#FFF8EC] text-[11px] py-1 px-4 text-center font-serif tracking-wider font-semibold border-b border-[#D4A72C]/40 flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2">
          <span>🚩</span>
          <span>Smart Cultural & Heritage Tourism Platform</span>
        </div>

        <div className="mx-auto sm:mx-0 font-sans font-bold flex items-center space-x-3 text-[10px]">
          <span className="text-[#D4A72C]">EN • MR • HI Audio Storytelling</span>
          <span className="text-[#FAF1E4]">|</span>
          <span className="text-white">Spectra 2026 AI Innovation</span>
        </div>

        <div className="hidden md:block text-[#D4A72C] text-[10px]">
          Atithi Devo Bhava
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <div className="bg-[#FFF8EC]/95 backdrop-blur-md border-b border-[#E8DCCB] text-[#332A27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Identity */}
            <div 
              onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#741C35] via-[#881337] to-[#E87516] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#FFF8EC] rounded-[14px] flex items-center justify-center border border-[#E8DCCB]">
                  <Landmark className="w-6 h-6 text-[#741C35] group-hover:text-[#E87516] transition-colors" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heritage text-2xl font-extrabold tracking-tight text-[#741C35] group-hover:text-[#E87516] transition-colors">
                    Atithya AI
                  </span>
                  <span className="bg-[#E87516]/15 border border-[#E87516]/30 text-[#E87516] text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-extrabold shadow-sm">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-[#6F625D] font-medium tracking-tight">
                  {t('tagline', currentLang)}
                </p>
              </div>
            </div>

            {/* Nav Links (Desktop Navigation Bar) */}
            <nav className="hidden xl:flex items-center space-x-1.5 bg-[#FAF1E4] p-1.5 rounded-2xl border border-[#E8DCCB] shadow-inner">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                if (item.isSpecial) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E87516] to-[#c2410c] text-white shadow-lg shadow-[#E87516]/30 scale-105'
                          : 'bg-[#E87516]/15 text-[#E87516] border border-[#E87516]/30 hover:bg-[#E87516] hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#741C35] text-white shadow-md'
                        : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#FFF8EC]'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color || 'text-[#741C35]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center space-x-3">
              
              {/* Saved Trips & Favorites Counter */}
              <button
                onClick={() => setActiveTab('saved')}
                className={`relative p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                  activeTab === 'saved'
                    ? 'bg-[#741C35] text-white border-[#741C35]'
                    : 'bg-[#FAF1E4] border-[#E8DCCB] text-[#741C35] hover:border-[#E87516]'
                }`}
                title="Saved Trips & Favorites"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E87516] text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#FAF1E4] border border-[#E8DCCB] text-[#741C35] text-xs font-bold hover:border-[#741C35] transition-colors cursor-pointer shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5 text-[#087F7B]" />
                  <span>{languages.find(l => l.code === currentLang)?.flag} {currentLang}</span>
                  <ChevronDown className="w-3 h-3 text-[#6F625D]" />
                </button>

                {langDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1 text-[10px] font-bold text-[#6F625D] uppercase tracking-wider border-b border-[#E8DCCB]">
                      Select Language
                    </div>
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-[#741C35] text-white'
                            : 'text-[#332A27] hover:bg-[#FAF1E4]'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span>{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Account / User Profile Badge */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#741C35] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#581427] transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#E87516]" />
                    <span className="max-w-[100px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-3 h-3 text-[#F8D8AD]" />
                  </button>

                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-[#E8DCCB]">
                        <p className="text-xs font-bold text-[#741C35] truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-[#6F625D] truncate">{currentUser.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('saved');
                          setUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-[#332A27] hover:bg-[#FAF1E4] flex items-center space-x-2 cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-[#E87516]" />
                        <span>My Saved Trips ({savedCount})</span>
                      </button>

                      <button
                        onClick={() => {
                          onSignOut();
                          setUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 flex items-center space-x-2 border-t border-[#E8DCCB] mt-1 pt-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl btn-teal text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">{t('navSignIn', currentLang)}</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="xl:hidden p-2 rounded-xl bg-[#FAF1E4] border border-[#E8DCCB] text-[#741C35]"
              >
                {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenu && (
          <div className="xl:hidden bg-[#FFF8EC] border-b border-[#E8DCCB] px-4 pt-2 pb-6 space-y-2 text-xs font-bold animate-in slide-in-from-top-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              if (item.isSpecial) {
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setMobileMenu(false); }}
                    className="w-full text-left py-3 px-4 rounded-xl bg-gradient-to-r from-[#E87516] to-[#c2410c] text-white font-extrabold flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenu(false); }}
                  className={`w-full text-left py-3 px-4 rounded-xl flex items-center space-x-2 ${
                    isActive ? 'bg-[#741C35] text-white' : 'text-[#332A27] hover:bg-[#FAF1E4]'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : item.color || 'text-[#741C35]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </header>
  );
}
