import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck, MapPin, ArrowRight, Star, Utensils } from 'lucide-react';

export default function Hero({ onStartPlanner, onExplore, onSearchPrompt }) {
  const [promptInput, setPromptInput] = useState('');

  const quickPrompts = [
    "2 days, ₹5000, history + food",
    "1 day weekend trek to Sinhagad Fort",
    "Family heritage tour in Marathi under ₹3000",
    "Museums & street food misal in 3 days"
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
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Image with Deep Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2000&auto=format&fit=crop"
          alt="Shaniwar Wada Pune Heritage"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter saturate-150 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-[#0b0f19]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-[#0b0f19]" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-amber-500/30 text-amber-300 text-xs font-semibold mb-8 animate-float shadow-xl shadow-amber-500/10">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>The Intelligent Digital Gateway to Pune, Maharashtra</span>
          <span className="text-amber-500 font-bold">🇮🇳</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
          Discover Pune <br className="hidden sm:inline" />
          <span className="font-heritage font-normal text-gradient-gold text-5xl sm:text-7xl lg:text-8xl">
            Beyond the Tourist Map
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          AI-powered heritage, culture, food and experiences — personalized around your budget, companion, and language.
        </p>

        {/* HERO AI SEARCH BOX */}
        <div className="max-w-3xl mx-auto mb-10">
          <form 
            onSubmit={handleSubmit}
            className="glass-card p-3 sm:p-4 rounded-2xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 hover:border-amber-500/60 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center space-x-3 flex-grow px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800">
                <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 animate-pulse-glow" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Tell us what kind of Pune experience you're looking for... (e.g., 2 days, ₹5000, history + food)"
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/25 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>✨ Plan Journey</span>
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Quick Ideas:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(prompt);
                    onSearchPrompt(prompt);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
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
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-base hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3"
          >
            <Sparkles className="w-5 h-5" />
            <span>✨ Plan My Pune Trip</span>
          </button>
          
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-base hover:bg-slate-800/80 transition-all flex items-center justify-center space-x-2 border border-slate-700"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Explore Pune Sites</span>
          </button>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl glass-card border border-slate-800 text-center">
            <h4 className="text-2xl font-bold text-gradient-gold">300+ Yrs</h4>
            <p className="text-xs text-slate-400 font-medium mt-1">Maratha & Peshwa Imperial Heritage</p>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800 text-center">
            <h4 className="text-2xl font-bold text-amber-400">100% AI</h4>
            <p className="text-xs text-slate-400 font-medium mt-1">Dynamic Itinerary & Route Optimization</p>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800 text-center">
            <h4 className="text-2xl font-bold text-emerald-400">EN / MR / HI</h4>
            <p className="text-xs text-slate-400 font-medium mt-1">Multilingual Stories & Narration</p>
          </div>
          <div className="p-4 rounded-xl glass-card border border-slate-800 text-center">
            <h4 className="text-2xl font-bold text-orange-400">Local Commerce</h4>
            <p className="text-xs text-slate-400 font-medium mt-1">Coppersmiths, Pagadi & Artisans</p>
          </div>
        </div>

      </div>
    </div>
  );
}
