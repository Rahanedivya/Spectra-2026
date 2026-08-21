import React from 'react';
import { PUNE_FOOD_EXPERIENCES } from '../data/puneData';
import { Utensils, MapPin, Sparkles, Flame } from 'lucide-react';

export default function FoodDiscovery({ currentLang }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
          <Utensils className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Authentic Maharashtrian Gastronomy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage mb-4">
          Taste <span className="text-[#ea580c]">Pune</span>
        </h2>
        <p className="text-[#5c4a4e] text-sm sm:text-base leading-relaxed font-medium">
          From fiery sprouted Misal Pav in historic Peths to cooling Mango Mastani on FC Road — experience the culinary soul of Pune.
        </p>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUNE_FOOD_EXPERIENCES.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e2d7c7] shadow-sm hover:shadow-xl hover:border-[#ea580c] transition-all duration-300 flex flex-col group"
          >
            {/* Dish Image */}
            <div className="relative h-48 w-full overflow-hidden bg-[#231417]">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181112]/80 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 bg-[#701a28] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md border border-[#881337]">
                {dish.spiciness}
              </span>

              <span className="absolute bottom-3 right-3 bg-[#ea580c] text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                {dish.approxPrice}
              </span>
            </div>

            {/* Dish Details */}
            <div className="p-5 flex flex-col flex-grow bg-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-[#701a28] font-heritage group-hover:text-[#ea580c] transition-colors">
                  {dish.name}
                </h3>
              </div>

              {dish.marathiName && (
                <p className="text-xs text-[#ea580c] font-heritage mb-3 font-semibold">
                  {dish.marathiName}
                </p>
              )}

              <p className="text-[#3c2b2e] text-xs leading-relaxed mb-4 flex-grow font-medium">
                {dish.description}
              </p>

              {/* Where to Try */}
              <div className="p-3 rounded-xl bg-[#faf6f0] border border-[#e2d7c7] text-[11px] mb-3">
                <span className="text-[#701a28] font-bold block mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#ea580c]" />
                  Iconic Places to Try:
                </span>
                <span className="text-[#2b181b] font-medium">{dish.whereToTry}</span>
              </div>

              {/* Cultural Context */}
              <p className="text-[11px] text-[#701a28] italic bg-[#faf6f0] p-2.5 rounded-lg border border-[#e2d7c7]">
                💡 {dish.culturalStory}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
