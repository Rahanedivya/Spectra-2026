import React from 'react';
import { PUNE_FOOD_EXPERIENCES } from '../data/puneData';
import { Utensils, MapPin, Sparkles, Flame } from 'lucide-react';

export default function FoodDiscovery({ currentLang }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-3">
          <Utensils className="w-3.5 h-3.5" />
          <span>Authentic Maharashtrian Gastronomy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Taste <span className="font-heritage text-gradient-gold">Pune</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From fiery sprouted Misal Pav in historic Peths to cooling Mango Mastani on FC Road — experience the soul of Puneri food culture.
        </p>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUNE_FOOD_EXPERIENCES.map((dish) => (
          <div
            key={dish.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col group"
          >
            {/* Dish Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-orange-500/30 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                {dish.spiciness}
              </span>

              <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                {dish.approxPrice}
              </span>
            </div>

            {/* Dish Details */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {dish.name}
                </h3>
              </div>

              {dish.marathiName && (
                <p className="text-xs text-amber-400/90 font-heritage mb-3">
                  {dish.marathiName}
                </p>
              )}

              <p className="text-slate-300 text-xs leading-relaxed mb-4 flex-grow">
                {dish.description}
              </p>

              {/* Where to Try */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] mb-3">
                <span className="text-amber-300 font-bold block mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-400" />
                  Iconic Places to Try:
                </span>
                <span className="text-slate-300">{dish.whereToTry}</span>
              </div>

              {/* Cultural Context */}
              <p className="text-[11px] text-slate-400 italic bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10">
                💡 {dish.culturalStory}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
