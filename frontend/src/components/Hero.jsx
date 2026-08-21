import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck, MapPin, ArrowRight, Star, Utensils, Landmark } from 'lucide-react';
import { t } from '../data/translations';
import MandalaArt from './MandalaArt';
import WarliArt from './WarliArt';

export default function Hero({ onStartPlanner, onExplore, onSearchPrompt, currentLang = 'English' }) {
  const [promptInput, setPromptInput] = useState('');

  const quickPrompts = [
    "2 days heritage trip in Pune under ₹5000",
    "1 day weekend trek to Sinhagad Fort",
    "Cultural tour in Jaipur or Varanasi",
    "Museums & authentic street food misal"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (promptInput.trim()) {
      onSearchPrompt(promptInput);
    } else {
      onStartPlanner();
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8D8AD] via-[#FAF1E4] to-[#FFF8EC] text-[#332A27] font-sans border-b border-[#E8DCCB]">
      
      {/* Background Decorative Mandala Corners */}
      <div className="absolute -top-24 -left-24 opacity-25 pointer-events-none hidden md:block">
        <MandalaArt className="w-96 h-96 animate-spin-slow" color="#741C35" accentColor="#D4A72C" />
      </div>

      <div className="absolute -bottom-24 -right-24 opacity-25 pointer-events-none hidden md:block">
        <MandalaArt className="w-96 h-96 animate-spin-slow" color="#E87516" accentColor="#741C35" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold mb-8 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E87516] animate-ping" />
          <span>Smart Cultural & Heritage Tourism Platform for India</span>
          <span className="font-bold">🇮🇳</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#741C35] mb-6 leading-tight font-heritage">
          Discover India's Heritage. <br className="hidden sm:inline" />
          <span className="text-[#E87516]">Reimagined by AI.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#6F625D] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Explore heritage, culture, food and local experiences with an intelligent travel companion.
        </p>

        {/* HERO AI SEARCH BOX */}
        <div className="max-w-3xl mx-auto mb-10">
          <form 
            onSubmit={handleSubmit}
            className="bg-[#FFF8EC] p-3 sm:p-4 rounded-2xl border border-[#E8DCCB] shadow-xl hover:border-[#E87516]/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center space-x-3 flex-grow px-4 py-3 bg-[#FAF1E4] rounded-xl border border-[#E8DCCB]">
                <Sparkles className="w-6 h-6 text-[#E87516] flex-shrink-0" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Tell us what kind of Indian cultural experience you're looking for..."
                  className="w-full bg-transparent text-[#332A27] placeholder-[#6F625D] text-sm focus:outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="btn-saffron px-6 py-3.5 flex items-center justify-center space-x-2 text-sm cursor-pointer flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>✨ Plan Journey</span>
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#6F625D] font-bold mr-1">Quick Ideas:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(prompt);
                    onSearchPrompt(prompt);
                  }}
                  className="px-3 py-1 rounded-full bg-[#FAF1E4] border border-[#E8DCCB] text-[#741C35] hover:border-[#E87516] hover:text-[#E87516] transition-colors cursor-pointer font-medium"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Hero Direct CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartPlanner}
            className="w-full sm:w-auto btn-saffron px-8 py-4 text-base flex items-center justify-center space-x-3 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>✨ Plan My Journey</span>
          </button>
          
          <button
            onClick={onExplore}
            className="w-full sm:w-auto btn-teal px-8 py-4 text-base flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
          >
            <Landmark className="w-5 h-5 text-white" />
            <span>Explore Heritage</span>
          </button>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] text-center shadow-sm">
            <h4 className="text-2xl font-bold font-heritage text-[#741C35]">300+ Yrs</h4>
            <p className="text-xs text-[#6F625D] font-semibold mt-1">Living Indian Heritage</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] text-center shadow-sm">
            <h4 className="text-2xl font-bold font-heritage text-[#E87516]">100% AI</h4>
            <p className="text-xs text-[#6F625D] font-semibold mt-1">Smart Route Optimization</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] text-center shadow-sm">
            <h4 className="text-2xl font-bold font-heritage text-[#087F7B]">EN / MR / HI</h4>
            <p className="text-xs text-[#6F625D] font-semibold mt-1">Multilingual Audio Stories</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#E8DCCB] text-center shadow-sm">
            <h4 className="text-2xl font-bold font-heritage text-[#667A3A]">Local Economy</h4>
            <p className="text-xs text-[#6F625D] font-semibold mt-1">Supporting Local Artisans</p>
          </div>
        </div>

      </div>

      {/* Warli Art Silhouette Footer Border */}
      <div className="absolute bottom-0 left-0 right-0 opacity-40">
        <WarliArt className="w-full h-10" color="#741C35" />
      </div>

    </div>
  );
}
