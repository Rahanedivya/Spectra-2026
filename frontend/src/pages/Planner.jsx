import React, { useState } from 'react';
import { Sparkles, Calendar, IndianRupee, Users, Heart, Globe, ArrowRight, ArrowLeft, Check, Compass, Plus, Minus } from 'lucide-react';
import ItineraryView from '../components/ItineraryView';
import { planTrip } from '../services/api';
import { t } from '../data/translations';

export default function Planner({ initialPrompt = '', onSaveTrip, currentLang = 'English', setCurrentLang }) {
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
        days: Number(days),
        budget: Number(budget),
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans">

      {/* Wizard Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>{t('plannerBadge', currentLang)}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] mb-2 font-heritage">
          {t('plannerTitle', currentLang)}
        </h1>
        <p className="text-[#5c4a4e] text-sm font-medium">
          {t('plannerSub', currentLang)}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2d7c7] shadow-sm mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-[#5c4a4e] mb-2">
          <span>{t('stepLabel', currentLang)} {step} / 6</span>
          <span className="text-[#701a28]">
            {step === 1 && "City Destination"}
            {step === 2 && "Duration"}
            {step === 3 && "Estimated Budget"}
            {step === 4 && "Travel Companions"}
            {step === 5 && "Heritage Interests"}
            {step === 6 && "Preferred Language"}
          </span>
        </div>
        <div className="w-full bg-[#faf6f0] h-2.5 rounded-full overflow-hidden border border-[#e2d7c7]">
          <div
            className="bg-gradient-to-r from-[#701a28] to-[#ea580c] h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Step Cards */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e2d7c7] shadow-xl relative min-h-[380px] flex flex-col justify-between">

        {/* STEP 1: City Destination */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <Compass className="w-5 h-5 text-[#ea580c]" />
              <span>{t('step1Title', currentLang)}</span>
            </h3>

            <div className="p-6 rounded-2xl bg-[#faf6f0] border border-[#e2d7c7] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#701a28]/10 text-[#701a28] mx-auto flex items-center justify-center text-3xl font-extrabold mb-3">
                🏛️
              </div>
              <h4 className="text-2xl font-extrabold text-[#701a28] font-heritage">Pune, Maharashtra</h4>
              <p className="text-[#5c4a4e] text-xs mt-1 font-medium">
                Imperial Peshwa Heritage • Sahyadri Forts • Cultural Capital
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Duration */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <Calendar className="w-5 h-5 text-[#ea580c]" />
              <span>{t('step2Title', currentLang)}</span>
            </h3>

            {/* Quick Pick Preset Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`p-4 rounded-2xl text-center border font-bold transition-all cursor-pointer ${days === num
                      ? 'bg-[#701a28] text-white border-[#881337] shadow-lg scale-105'
                      : 'bg-[#faf6f0] text-[#2b181b] border-[#e2d7c7] hover:border-[#ea580c]'
                    }`}
                >
                  <span className="text-2xl block mb-0.5">{num}</span>
                  <span className="text-xs">{num === 1 ? '1 Day Express' : `${num} Days Trip`}</span>
                </button>
              ))}
            </div>

            {/* Custom Day Stepper Input */}
            <div className="bg-[#faf6f0] p-5 rounded-2xl border border-[#e2d7c7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-[#701a28] block">{t('customDuration', currentLang)}</span>
                <span className="text-xs text-[#5c4a4e]">{t('customDurationSub', currentLang)}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#e2d7c7] text-[#701a28] font-bold flex items-center justify-center border border-[#e2d7c7] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="px-4 py-2 bg-white border border-[#701a28]/30 rounded-xl font-extrabold text-[#701a28] text-lg min-w-[70px] text-center">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </div>

                <button
                  type="button"
                  onClick={() => setDays(days + 1)}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#e2d7c7] text-[#701a28] font-bold flex items-center justify-center border border-[#e2d7c7] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <IndianRupee className="w-5 h-5 text-emerald-700" />
              <span>{t('step3Title', currentLang)}</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-bold text-[#701a28] bg-[#faf6f0] p-4 rounded-xl border border-[#e2d7c7]">
                <span>{t('selectedBudgetLabel', currentLang)}</span>
                <span className="text-emerald-700 text-2xl font-extrabold">₹{budget.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 bg-[#faf6f0] rounded-lg appearance-none cursor-pointer accent-[#701a28]"
              />

              <div className="flex justify-between text-xs text-[#5c4a4e] font-semibold">
                <span>Budget (₹1,000)</span>
                <span>Moderate (₹10,000)</span>
                <span>Luxury (₹30,000+)</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Companions */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <Users className="w-5 h-5 text-[#ea580c]" />
              <span>{t('step4Title', currentLang)}</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {companionOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCompanion(opt.value)}
                  className={`p-5 rounded-2xl border font-bold text-left transition-all flex items-center space-x-4 cursor-pointer ${companion === opt.value
                      ? 'bg-[#701a28] text-white border-[#881337] shadow-md'
                      : 'bg-[#faf6f0] text-[#2b181b] border-[#e2d7c7] hover:border-[#ea580c]'
                    }`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div>
                    <span className="block text-sm font-bold">{opt.label}</span>
                    <span className="text-[11px] opacity-80 font-normal">Custom pace & routes</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Interests */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <Heart className="w-5 h-5 text-[#ea580c]" />
              <span>{t('step5Title', currentLang)}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interestOptions.map((opt) => {
                const isSelected = selectedInterests.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleInterest(opt.value)}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all flex items-center space-x-2 cursor-pointer ${isSelected
                        ? 'bg-[#701a28] text-white border-[#881337] shadow-md'
                        : 'bg-[#faf6f0] text-[#2b181b] border-[#e2d7c7] hover:border-[#ea580c]'
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
            <h3 className="text-xl font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <Globe className="w-5 h-5 text-[#ea580c]" />
              <span>{t('step6Title', currentLang)}</span>
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
                    if (setCurrentLang) setCurrentLang(lang.code);
                  }}
                  className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${selectedLanguage === lang.code
                      ? 'bg-[#701a28] text-white border-[#881337] shadow-lg font-bold scale-105'
                      : 'bg-[#faf6f0] text-[#2b181b] border-[#e2d7c7] hover:border-[#ea580c]'
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
        <div className="pt-8 border-t border-[#e2d7c7] flex items-center justify-between mt-auto">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-[#faf6f0] hover:bg-[#e2d7c7] text-[#701a28] font-bold text-xs border border-[#e2d7c7] flex items-center space-x-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backBtn', currentLang)}</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white font-bold text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <span>{t('nextStepBtn', currentLang)}</span>
              <ArrowRight className="w-4 h-4 text-[#ea580c]" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#701a28] via-[#881337] to-[#ea580c] text-white font-extrabold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-xl shadow-[#701a28]/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>{loading ? t('generatingBtn', currentLang) : t('generateBtn', currentLang)}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
