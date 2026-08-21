import React from 'react';
import { LOCAL_COMMERCE } from '../data/puneData';
import { HeartHandshake, MapPin, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

export default function LocalCommerce() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e2d7c7] font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Sustainable Tourism & Fair Commerce</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage mb-4">
          Support Local <span className="text-[#ea580c]">Pune</span>
        </h2>
        <p className="text-[#5c4a4e] text-sm sm:text-base leading-relaxed font-medium">
          Directly empower 400-year-old coppersmith guilds in Kasba Peth, master Puneri Pagadi weavers, local youth heritage narrators, and micro-merchants in Tulshibaug.
        </p>
      </div>

      {/* Artisan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LOCAL_COMMERCE.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e2d7c7] shadow-sm hover:shadow-xl hover:border-[#ea580c] transition-all duration-300 flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#231417]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181112]/80 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 bg-[#701a28] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#881337]">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow bg-white">
              <h3 className="text-base font-bold text-[#701a28] font-heritage group-hover:text-[#ea580c] transition-colors mb-1 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-xs text-[#ea580c] font-semibold mb-2">
                👤 {item.artisanName}
              </p>

              <p className="text-[#3c2b2e] text-xs leading-relaxed mb-4 flex-grow font-medium">
                {item.description}
              </p>

              <div className="p-2.5 rounded-xl bg-[#faf6f0] border border-[#e2d7c7] text-[11px] space-y-1 mt-auto">
                <div className="flex items-center space-x-1.5 text-[#5c4a4e]">
                  <MapPin className="w-3 h-3 text-[#ea580c]" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>{item.impactTag}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
