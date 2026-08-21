import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { Calendar, Clock, IndianRupee, MapPin, Leaf, Star, Sparkles, Bookmark, RotateCcw, Printer, Car, Utensils, ShieldAlert } from 'lucide-react';

export default function ItineraryView({ itineraryData, onReset, onSave }) {
  const [activeDay, setActiveDay] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Normalize days list whether backend returns 'days' or 'itinerary'
  const daysList = itineraryData.days || itineraryData.itinerary || [];
  const daysCount = itineraryData.daysCount || daysList.length || 1;
  const budget = itineraryData.budget || 5000;
  const language = itineraryData.language || 'English';
  const budgetBreakdown = itineraryData.budgetBreakdown || {};

  const currentDayData = daysList.find(d => d.day === activeDay) || daysList[0];

  // Map stops for route polylines
  const currentStops = currentDayData?.activities || currentDayData?.stops || [];
  const allStopsForMap = daysList.flatMap(d => d.activities || d.stops || []);

  const handleSave = () => {
    if (onSave) onSave(itineraryData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-sans">
      
      {/* Top Banner Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              ✨ AI Generated Itinerary
            </span>
            <span className="bg-slate-900 border border-slate-800 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">
              {language} Output
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your Personalized <span className="font-heritage text-gradient-gold">{daysCount}-Day Pune Journey</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {daysCount} {daysCount === 1 ? 'Day' : 'Days'} • Total Budget: ₹{budget.toLocaleString()}
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center flex-wrap gap-3 relative z-10">
          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 flex items-center space-x-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Modify Plan</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
              savedSuccess
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Saved! ✓' : 'Save Itinerary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            title="Print or Export PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Metrics Row: Budget Breakdown Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Your Total Budget</span>
          <span className="text-2xl font-extrabold text-white">₹{budget.toLocaleString()}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
          <span className="text-xs text-amber-300/80 font-semibold block mb-1">Total Estimated Cost</span>
          <span className="text-2xl font-extrabold text-amber-400">
            ₹{(budgetBreakdown.total || budgetBreakdown.totalCost || 0).toLocaleString()}
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
          <span className="text-xs text-emerald-300/80 font-semibold block mb-1">Remaining Budget</span>
          <span className="text-2xl font-extrabold text-emerald-400">
            ₹{(budgetBreakdown.remainingBudget || Math.max(0, budget - (budgetBreakdown.total || budgetBreakdown.totalCost || 0))).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Content Layout: Left Timeline + Right Route Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Day Selector & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 overflow-x-auto">
            {daysList.map((dayItem) => (
              <button
                key={dayItem.day}
                onClick={() => setActiveDay(dayItem.day)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                  activeDay === dayItem.day
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Day {dayItem.day}</span>
              </button>
            ))}
          </div>

          {/* Active Day Theme */}
          {currentDayData && (
            <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
              <h3 className="text-base font-bold text-amber-300">
                Day {currentDayData.day}: {currentDayData.theme || 'Pune Cultural Exploration'}
              </h3>
            </div>
          )}

          {/* Daily Activities Timeline */}
          <div className="space-y-4">
            {currentStops.map((item, idx) => {
              const placeName = item.place || item.title || item.name;
              const costVal = item.estimatedCost !== undefined ? item.estimatedCost : item.cost;

              return (
                <div 
                  key={idx}
                  className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors space-y-3"
                >
                  {/* Top Bar: Start Time + Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {item.time || "09:00 AM"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                        🏛️ {item.category || "Heritage"}
                      </span>
                    </div>
                  </div>

                  {/* Place Name */}
                  <h4 className="text-xl font-extrabold text-white">
                    {placeName}
                  </h4>

                  {/* Activity Description */}
                  {item.activity && (
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">
                      {item.activity}
                    </p>
                  )}

                  {/* Reason */}
                  {item.reason && (
                    <p className="text-[11px] text-amber-300/90 italic bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                      💡 Why visit: {item.reason}
                    </p>
                  )}

                  {/* Activity Information Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block font-medium">🕐 Visit Duration</span>
                      <span className="font-bold text-slate-200">{item.duration || "1.5 hours"}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">💰 Estimated Cost</span>
                      <span className="font-bold text-emerald-400">₹{costVal !== undefined ? costVal : 25}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">🚗 Suggested Transport</span>
                      <span className="font-bold text-slate-200">{item.transport || "Auto / Cab / Public Transport"}</span>
                    </div>
                  </div>

                  {/* Food Suggestion */}
                  {item.foodSuggestion && (
                    <div className="text-[11px] text-orange-300 flex items-center space-x-1.5 pt-1">
                      <Utensils className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                      <span>Recommended Food: <strong>{item.foodSuggestion}</strong></span>
                    </div>
                  )}

                  {/* Safety Tip */}
                  {item.safetyTip && (
                    <div className="text-[11px] text-emerald-400 flex items-center space-x-1.5 pt-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>🛡️ Safety Tip: {item.safetyTip}</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Col: Map & Budget Breakdown */}
        <div className="space-y-6">
          
          {/* Interactive Itinerary Map */}
          <div className="glass-card p-4 rounded-3xl border border-amber-500/30">
            <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>🧭 Itinerary Route Map</span>
            </h3>
            <div className="h-72 w-full rounded-2xl overflow-hidden">
              <MapComponent itineraryStops={currentStops} />
            </div>
          </div>

          {/* Smart Budget Breakdown */}
          {budgetBreakdown && (
            <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-emerald-400" />
                <span>Smart Budget Breakdown</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Food & Meals</span>
                  <span className="font-bold text-slate-200">₹{(budgetBreakdown.food || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transport & Rickshaw</span>
                  <span className="font-bold text-slate-200">₹{(budgetBreakdown.transport || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Entry Fees</span>
                  <span className="font-bold text-slate-200">₹{(budgetBreakdown.entryFees || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Activities & Experiences</span>
                  <span className="font-bold text-slate-200">₹{(budgetBreakdown.activities || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shopping & Souvenirs</span>
                  <span className="font-bold text-slate-200">₹{(budgetBreakdown.shopping || 0).toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-bold text-sm">
                  <span className="text-amber-300">Total Estimated Cost</span>
                  <span className="text-emerald-400 text-base">₹{(budgetBreakdown.total || budgetBreakdown.totalCost || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
