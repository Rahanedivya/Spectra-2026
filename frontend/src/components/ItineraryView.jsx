import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { Calendar, Clock, IndianRupee, MapPin, Leaf, Star, Sparkles, Bookmark, RotateCcw, Printer, Car, Utensils, ShieldAlert } from 'lucide-react';

export default function ItineraryView({ itineraryData, onReset, onSave }) {
  const [activeDay, setActiveDay] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Normalize days list whether backend returns 'days' or 'itinerary'
  const daysList = itineraryData.days || itineraryData.itinerary || [];
  const daysCount = itineraryData.daysCount || daysList.length || 1;
  const totalBudget = Number(itineraryData.budget) || 5000;
  const language = itineraryData.language || 'English';

  // Dynamic Budget Calculations
  const rawBreakdown = itineraryData.budgetBreakdown || {};
  const food = rawBreakdown.food || Math.round(totalBudget * 0.35);
  const transport = rawBreakdown.transport || Math.round(totalBudget * 0.25);
  const entryFees = rawBreakdown.entryFees || Math.round(totalBudget * 0.10);
  const activities = rawBreakdown.activities || Math.round(totalBudget * 0.15);
  const shopping = rawBreakdown.shopping || Math.round(totalBudget * 0.15);

  const totalEstCost = rawBreakdown.total || rawBreakdown.totalCost || (food + transport + entryFees + activities + shopping);
  const remainingBudget = rawBreakdown.remainingBudget !== undefined
    ? rawBreakdown.remainingBudget
    : Math.max(0, totalBudget - totalEstCost);

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
      <div className="bg-[#181112] p-6 sm:p-8 rounded-3xl border border-[#ea580c]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#701a28] text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider border border-[#881337]">
              ✨ AI Generated Itinerary
            </span>
            <span className="bg-[#231417] border border-[#ea580c]/40 text-[#ea580c] text-xs px-3 py-1 rounded-full font-semibold">
              {language} Output
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#faf6f0]">
            Your Personalized <span className="font-heritage text-[#ea580c]">{daysCount}-Day Pune Journey</span>
          </h1>

          <p className="text-[#d6c7b2] text-xs sm:text-sm mt-1">
            {daysCount} {daysCount === 1 ? 'Day' : 'Days'} • Total Budget: ₹{totalBudget.toLocaleString()}
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center flex-wrap gap-3 relative z-10">
          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl bg-[#231417] hover:bg-[#2e1a1e] text-[#d6c7b2] font-bold text-xs border border-[#3a1d23] flex items-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Modify Plan</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md cursor-pointer ${
              savedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#701a28] hover:bg-[#881337] text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>{savedSuccess ? 'Saved! ✓' : 'Save Itinerary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-[#231417] hover:bg-[#2e1a1e] text-[#d6c7b2] border border-[#3a1d23] cursor-pointer"
            title="Print or Export PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Metrics Row: Budget Breakdown Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2d7c7] shadow-sm">
          <span className="text-xs text-[#5c4a4e] font-semibold block mb-1">Your Total Budget</span>
          <span className="text-2xl font-extrabold text-[#701a28]">₹{totalBudget.toLocaleString()}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2d7c7] shadow-sm">
          <span className="text-xs text-[#5c4a4e] font-semibold block mb-1">Estimated Cost</span>
          <span className="text-2xl font-extrabold text-[#ea580c]">
            ₹{totalEstCost.toLocaleString()}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2d7c7] shadow-sm">
          <span className="text-xs text-[#5c4a4e] font-semibold block mb-1">Remaining Budget</span>
          <span className="text-2xl font-extrabold text-emerald-700">
            ₹{remainingBudget.toLocaleString()}
          </span>
        </div>

        {/* Sustainability Score Widget */}
        <div className="bg-[#14231a] p-5 rounded-2xl border border-emerald-800/40 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-semibold block">Sustainable Travel Score</span>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-2xl font-extrabold text-emerald-400">91</span>
              <span className="text-xs text-emerald-300">/ 100</span>
            </div>
          </div>
          <Leaf className="w-8 h-8 text-emerald-400 opacity-90" />
        </div>
      </div>

      {/* Main Content Layout: Left Timeline + Right Route Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Day Selector & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Tabs */}
          <div className="flex items-center space-x-2 border-b border-[#e2d7c7] pb-4 overflow-x-auto">
            {daysList.map((dayItem) => (
              <button
                key={dayItem.day}
                onClick={() => setActiveDay(dayItem.day)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                  activeDay === dayItem.day
                    ? 'bg-[#701a28] text-white shadow-md'
                    : 'bg-white text-[#5c4a4e] hover:text-[#701a28] border border-[#e2d7c7]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Day {dayItem.day}</span>
              </button>
            ))}
          </div>

          {/* Active Day Theme */}
          {currentDayData && (
            <div className="bg-[#faf6f0] p-4 rounded-2xl border border-[#e2d7c7]">
              <h3 className="text-base font-bold text-[#701a28] font-heritage">
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
                  className="bg-white p-5 rounded-2xl border border-[#e2d7c7] hover:border-[#ea580c] transition-colors shadow-sm space-y-3"
                >
                  {/* Top Bar: Start Time + Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white bg-[#701a28] px-2.5 py-1 rounded-lg">
                        {item.time || "09:00 AM"}
                      </span>
                      <span className="text-[11px] font-bold text-[#701a28] uppercase tracking-wider bg-[#faf6f0] px-2.5 py-1 rounded border border-[#e2d7c7]">
                        🏛️ {item.category || "Heritage"}
                      </span>
                    </div>
                  </div>

                  {/* Place Name */}
                  <h4 className="text-xl font-extrabold text-[#701a28] font-heritage">
                    {placeName}
                  </h4>

                  {/* Activity Description */}
                  {item.activity && (
                    <p className="text-[#3c2b2e] text-xs leading-relaxed font-medium">
                      {item.activity}
                    </p>
                  )}

                  {/* Reason */}
                  {item.reason && (
                    <p className="text-[11px] text-[#701a28] italic bg-[#faf6f0] p-2.5 rounded-lg border border-[#e2d7c7]">
                      💡 Why visit: {item.reason}
                    </p>
                  )}

                  {/* Activity Information Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] border-t border-[#e2d7c7]">
                    <div>
                      <span className="text-[#8a7679] block font-medium">🕐 Visit Duration</span>
                      <span className="font-bold text-[#1c1214]">{item.duration || "1.5 hours"}</span>
                    </div>

                    <div>
                      <span className="text-[#8a7679] block font-medium">💰 Estimated Cost</span>
                      <span className="font-bold text-emerald-700">₹{costVal !== undefined ? costVal : 25}</span>
                    </div>

                    <div>
                      <span className="text-[#8a7679] block font-medium">🚗 Suggested Transport</span>
                      <span className="font-bold text-[#1c1214]">{item.transport || "Auto / Cab / Public Transport"}</span>
                    </div>
                  </div>

                  {/* Food Suggestion */}
                  {item.foodSuggestion && (
                    <div className="text-[11px] text-[#c2410c] flex items-center space-x-1.5 pt-1 font-semibold">
                      <Utensils className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
                      <span>Recommended Food: <strong>{item.foodSuggestion}</strong></span>
                    </div>
                  )}

                  {/* Safety Tip */}
                  {item.safetyTip && (
                    <div className="text-[11px] text-emerald-800 flex items-center space-x-1.5 pt-1 font-medium">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
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
          <div className="bg-[#181112] p-4 rounded-3xl border border-[#ea580c]/30 shadow-xl">
            <h3 className="text-sm font-bold text-[#faf6f0] mb-3 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#ea580c]" />
              <span>🧭 Itinerary Route Map</span>
            </h3>
            <div className="h-72 w-full rounded-2xl overflow-hidden">
              <MapComponent itineraryStops={currentStops} />
            </div>
          </div>

          {/* Smart Budget Breakdown */}
          <div className="bg-white p-5 rounded-3xl border border-[#e2d7c7] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
              <IndianRupee className="w-4 h-4 text-emerald-700" />
              <span>Smart Budget Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#5c4a4e] font-medium">Food & Meals</span>
                <span className="font-bold text-[#1c1214]">₹{food.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5c4a4e] font-medium">Transport & Rickshaw</span>
                <span className="font-bold text-[#1c1214]">₹{transport.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5c4a4e] font-medium">Entry Fees</span>
                <span className="font-bold text-[#1c1214]">₹{entryFees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5c4a4e] font-medium">Activities & Experiences</span>
                <span className="font-bold text-[#1c1214]">₹{activities.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5c4a4e] font-medium">Shopping & Souvenirs</span>
                <span className="font-bold text-[#1c1214]">₹{shopping.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-[#e2d7c7] flex items-center justify-between font-bold text-sm">
                <span className="text-[#701a28]">Total Estimated Cost</span>
                <span className="text-emerald-700 text-base font-extrabold">₹{totalEstCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sustainability Perks */}
          <div className="bg-[#f0f9f4] p-5 rounded-3xl border border-emerald-200 space-y-2 text-xs text-emerald-900 font-medium">
            <h4 className="font-bold text-emerald-950 flex items-center space-x-1.5">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>Sustainable Tourism Impact</span>
            </h4>
            <p>✓ Supporting authentic coppersmith craftsmen in Kasba Peth</p>
            <p>✓ Walkable monument cluster between Shaniwar Wada & Lal Mahal</p>
            <p>✓ Direct patronage of local traditional sweet & misal vendors</p>
          </div>

        </div>

      </div>

    </div>
  );
}
