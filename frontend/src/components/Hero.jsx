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
    <div className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-[#181112]">
      
      {/* Background Image with Deep Maroon/Charcoal Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2000&auto=format&fit=crop"
          alt="Shaniwar Wada Pune Heritage"
          className="w-full h-full object-cover object-center opacity-30 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181112] via-[#181112]/80 to-[#701a28]/60 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181112] via-transparent to-[#181112]" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ea580c]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#701a28]/60 border border-[#ea580c]/40 text-[#ea580c] text-xs font-semibold mb-8 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-ping" />
          <span>Smart Cultural & Heritage Tourism Platform • Pune, Maharashtra</span>
          <span className="font-bold">🇮🇳</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#faf6f0] mb-6 leading-tight">
          Discover Pune <br className="hidden sm:inline" />
          <span className="font-heritage font-normal text-[#ea580c] text-5xl sm:text-7xl lg:text-8xl">
            Beyond the Tourist Map.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#d6c7b2] max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Your AI-powered cultural companion for heritage, food, experiences and unforgettable journeys.
        </p>

        {/* HERO AI SEARCH BOX */}
        <div className="max-w-3xl mx-auto mb-10">
          <form 
            onSubmit={handleSubmit}
            className="bg-[#231417]/90 p-3 sm:p-4 rounded-2xl border border-[#ea580c]/30 shadow-2xl hover:border-[#ea580c]/60 transition-all backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center space-x-3 flex-grow px-4 py-3 bg-[#181112] rounded-xl border border-[#3a1d23]">
                <Sparkles className="w-6 h-6 text-[#ea580c] flex-shrink-0 animate-pulse-glow" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Tell us what kind of Pune experience you're looking for... (e.g., 2 days, ₹5000, history + food)"
                  className="w-full bg-transparent text-[#faf6f0] placeholder-[#a89582] text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#701a28] to-[#ea580c] text-white font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#701a28]/30 flex-shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>✨ Plan Journey</span>
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#a89582] font-semibold mr-1">Quick Ideas:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(prompt);
                    onSearchPrompt(prompt);
                  }}
                  className="px-3 py-1 rounded-full bg-[#181112] border border-[#3a1d23] text-[#d6c7b2] hover:text-[#ea580c] hover:border-[#ea580c]/50 transition-colors cursor-pointer"
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
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#701a28] via-[#881337] to-[#ea580c] text-white font-bold text-base hover:shadow-xl hover:shadow-[#701a28]/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>✨ Plan My Pune Trip</span>
          </button>
          
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#231417] text-[#faf6f0] hover:text-white font-semibold text-base hover:bg-[#2e1a1e] transition-all flex items-center justify-center space-x-2 border border-[#3a1d23] cursor-pointer"
          >
            <Compass className="w-5 h-5 text-[#ea580c]" />
            <span>Explore Pune</span>
          </button>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#231417] border border-[#3a1d23] text-center">
            <h4 className="text-2xl font-bold font-heritage text-[#ea580c]">300+ Yrs</h4>
            <p className="text-xs text-[#d6c7b2] font-medium mt-1">Maratha & Peshwa Heritage</p>
          </div>
          <div className="p-4 rounded-xl bg-[#231417] border border-[#3a1d23] text-center">
            <h4 className="text-2xl font-bold font-heritage text-white">100% AI</h4>
            <p className="text-xs text-[#d6c7b2] font-medium mt-1">Smart Route Optimization</p>
          </div>
          <div className="p-4 rounded-xl bg-[#231417] border border-[#3a1d23] text-center">
            <h4 className="text-2xl font-bold font-heritage text-emerald-400">EN / MR / HI</h4>
            <p className="text-xs text-[#d6c7b2] font-medium mt-1">Multilingual Storytelling</p>
          </div>
          <div className="p-4 rounded-xl bg-[#231417] border border-[#3a1d23] text-center">
            <h4 className="text-2xl font-bold font-heritage text-[#ea580c]">Local Economy</h4>
            <p className="text-xs text-[#d6c7b2] font-medium mt-1">Supporting Pune Artisans</p>
          </div>
        </div>

      </div>
    </div>
  );
}
