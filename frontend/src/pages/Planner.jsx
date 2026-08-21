import React, { useState } from 'react';
import { Sparkles, Calendar, IndianRupee, Users, Heart, Globe, ArrowRight, ArrowLeft, Check, Compass } from 'lucide-react';
import ItineraryView from '../components/ItineraryView';
import { planTrip } from '../services/api';

export default function Planner({ initialPrompt = '', onSaveTrip, currentLang, setCurrentLang }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // Form State
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [companion, setCompanion] = useState('Family');
  const [selectedInterests, setSelectedInterests] = useState(['Heritage', 'History', 'Food', 'Culture']);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLang || 'English');

  const companionOptions = [
    { label: 'Solo Explorer', value: 'Solo', icon: '👤' },
    { label: 'Couple Journey', value: 'Couple', icon: '💑' },
    { label: 'Family Experience', value: 'Family', icon: '👨‍👩‍👧‍👦' },
    { label: 'Friends Group', value: 'Friends', icon: '👥' }
  ];

  const interestOptions = [
    { label: 'Peshwa Heritage', value: 'Heritage', icon: '🏛️' },
    { label: 'Maratha History', value: 'History', icon: '⚔️' },
    { label: 'Puneri Food & Misal', value: 'Food', icon: '🍛' },
    { label: 'Old Peth Culture', value: 'Culture', icon: '🎭' },
    { label: 'Sahyadri Forts', value: 'Forts', icon: '⛰️' },
    { label: 'Art & Museums', value: 'Museums', icon: '🎨' },
    { label: 'Traditional Markets', value: 'Shopping', icon: '🛍️' },
    { label: 'Artisans & Crafts', value: 'Crafts', icon: '🧵' }
  ];

  const toggleInterest = (value) => {
    if (selectedInterests.includes(value)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== value));
      }
    } else {
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const payload = {
        city: 'Pune',
        days,
        budget,
        companions: companion,
        interests: selectedInterests,
        language: selectedLanguage,
        prompt: initialPrompt
      };
      
      const result = await planTrip(payload);
      setGeneratedItinerary(result);
    } catch (err) {
      console.error('Planner error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (generatedItinerary) {
    return (
      <ItineraryView 
        itineraryData={generatedItinerary}
        onReset={() => setGeneratedItinerary(null)}
        onSave={onSaveTrip}
      />
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Wizard Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Multi-Step Travel Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
          Personalized <span className="font-heritage text-gradient-gold">Pune Journey</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Customize your preferences to generate an authentic Peshwa heritage itinerary.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="glass-card p-4 rounded-2xl border border-amber-500/20 mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Step {step} of 6</span>
          <span className="text-amber-400">
            {step === 1 && "City Destination"}
            {step === 2 && "Duration"}
            {step === 3 && "Estimated Budget"}
            {step === 4 && "Travel Companions"}
            {step === 5 && "Heritage Interests"}
            {step === 6 && "Preferred Language"}
          </span>
        </div>
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Step Cards */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl relative min-h-[380px] flex flex-col justify-between">
        
        {/* STEP 1: City Destination */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Step 1: Where are you going?</span>
            </h3>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/40 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 mx-auto flex items-center justify-center text-3xl font-extrabold mb-3">
                🏛️
              </div>
              <h4 className="text-2xl font-extrabold text-white">Pune, Maharashtra</h4>
              <p className="text-slate-300 text-xs mt-1">
                Imperial Peshwa Heritage • Sahyadri Forts • Food & Culture Capital
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Duration */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Step 2: How many days will you spend in Pune?</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`p-6 rounded-2xl text-center border font-bold transition-all ${
                    days === num
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <span className="text-3xl block mb-1">{num}</span>
                  <span className="text-xs">{num === 1 ? 'Single Day Express' : `${num} Full Days`}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <IndianRupee className="w-5 h-5 text-emerald-400" />
              <span>Step 3: What is your estimated total budget?</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-bold text-white bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span>Selected Budget:</span>
                <span className="text-emerald-400 text-2xl">₹{budget.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Budget (₹1,000)</span>
                <span>Moderate (₹5,000)</span>
                <span>Luxury (₹20,000+)</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Companions */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Step 4: Who are you travelling with?</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {companionOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCompanion(opt.value)}
                  className={`p-5 rounded-2xl border font-bold text-left transition-all flex items-center space-x-4 ${
                    companion === opt.value
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div>
                    <span className="block text-sm text-white">{opt.label}</span>
                    <span className="text-[11px] text-slate-400 font-normal">Custom pace & routes</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Interests */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span>Step 5: What experiences do you love?</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interestOptions.map((opt) => {
                const isSelected = selectedInterests.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleInterest(opt.value)}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Language */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>Step 6: Preferred Itinerary Language</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {[
                { code: 'English', name: 'English', sub: 'Standard EN', flag: '🇬🇧' },
                { code: 'Marathi', name: 'मराठी', sub: 'Maharashtrian MR', flag: '🚩' },
                { code: 'Hindi', name: 'हिंदी', sub: 'Devanagari HI', flag: '🇮🇳' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setCurrentLang(lang.code);
                  }}
                  className={`p-6 rounded-2xl border text-center transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-bold scale-105'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <span className="text-3xl block mb-1">{lang.flag}</span>
                  <span className="text-base font-heritage block">{lang.name}</span>
                  <span className="text-[11px] opacity-80">{lang.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="pt-8 border-t border-slate-800 flex items-center justify-between mt-auto">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-xl shadow-amber-500/25 animate-pulse"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{loading ? 'Generating AI Journey...' : '✨ Generate My Pune Journey'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
