import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { PUNE_DESTINATIONS } from '../data/puneData';
import { Calendar, Clock, IndianRupee, MapPin, Leaf, Star, Sparkles, Bookmark, RotateCcw, Printer, Share2, ArrowRight } from 'lucide-react';

export default function ItineraryView({ itineraryData, onReset, onSave }) {
  const [activeDay, setActiveDay] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const {
    city = 'Pune',
    daysCount = 2,
    budget = 5000,
    language = 'English',
    sustainabilityScore = 89,
    experienceScore = 94,
    budgetBreakdown = {},
    sustainabilityPerks = [],
    itinerary = []
  } = itineraryData;

  const currentDayData = itinerary.find(d => d.day === activeDay) || itinerary[0];

  // Map stops for route polylines
  const allStopsForMap = itinerary.flatMap(d => d.stops);

  const handleSave = () => {
    onSave(itineraryData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
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
            Your Personalized <span className="font-heritage text-gradient-gold">Pune Journey</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {daysCount} Days • Allocated Budget: ₹{budget.toLocaleString()} • Curated Heritage & Food
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
            <span>{savedSuccess ? 'Saved to Profile! ✓' : 'Save Itinerary'}</span>
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

      {/* Metrics Row: Sustainability Score + Experience Score + Budget Remaining */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Sustainability Score */}
        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold text-2xl flex items-center justify-center border border-emerald-500/40">
            🌱
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Sustainable Travel Score</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-emerald-400">{sustainabilityScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-emerald-300/80 font-medium">Eco-friendly cluster routes</span>
          </div>
        </div>

        {/* Experience Score */}
        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 font-extrabold text-2xl flex items-center justify-center border border-amber-500/40">
            ⭐
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Cultural Heritage Score</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-amber-300">{experienceScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-medium">Peshwa architecture & culinary</span>
          </div>
        </div>

        {/* Budget Status */}
        <div className="glass-card p-5 rounded-2xl border border-orange-500/30 bg-orange-500/5 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 font-extrabold text-2xl flex items-center justify-center border border-orange-500/40">
            💰
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Est. Remaining Savings</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-orange-400">₹{(budgetBreakdown.remainingBudget || 0).toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Total Cost: ₹{(budgetBreakdown.totalCost || 0).toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Main Content Layout: Left Timeline + Right Route Map & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Day Selector & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 overflow-x-auto">
            {itinerary.map((dayItem) => (
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
                Day {currentDayData.day}: {currentDayData.theme}
              </h3>
            </div>
          )}

          {/* Daily Stops Timeline */}
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800">
            {currentDayData && currentDayData.stops.map((stop, idx) => (
              <div 
                key={idx}
                className="relative pl-12 glass-card p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors"
              >
                {/* Timeline Dot */}
                <div className="absolute left-3 top-6 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md">
                  {idx + 1}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {stop.time}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded">
                      {stop.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {stop.travelTime}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <IndianRupee className="w-3 h-3" />
                      ₹{stop.cost}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">
                  {stop.title}
                </h4>

                <p className="text-slate-300 text-xs leading-relaxed mb-3">
                  {stop.activity}
                </p>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Proximity Distance: {stop.distance} from previous hub</span>
                </div>
              </div>
            ))}
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
              <MapComponent itineraryStops={currentDayData ? currentDayData.stops : []} />
            </div>
          </div>

          {/* Smart Budget Breakdown */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              <span>Smart Budget Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transport & Rickshaw / Metro</span>
                <span className="font-bold text-slate-200">₹{(budgetBreakdown.transport || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Food & Traditional Meals</span>
                <span className="font-bold text-slate-200">₹{(budgetBreakdown.food || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Heritage Monument Entry Fees</span>
                <span className="font-bold text-slate-200">₹{(budgetBreakdown.entryFees || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Experiences & Artisan Crafts</span>
                <span className="font-bold text-slate-200">₹{(budgetBreakdown.experiences || 0).toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-bold text-sm">
                <span className="text-amber-300">Total Est. Cost</span>
                <span className="text-emerald-400 text-base">₹{(budgetBreakdown.totalCost || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sustainability Perks */}
          <div className="glass-card p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" />
              <span>Sustainability Commitments</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {sustainabilityPerks.map((perk, idx) => (
                <li key={idx} className="leading-snug">{perk}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
