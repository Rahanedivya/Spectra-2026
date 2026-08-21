import React from 'react';
import { LOCAL_COMMERCE } from '../data/puneData';
import { HeartHandshake, MapPin, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

export default function LocalCommerce() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Sustainable Tourism & Fair Commerce</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Support Local <span className="font-heritage text-gradient-gold">Pune</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Directly empower 400-year-old coppersmith guilds in Kasba Peth, master Puneri Pagadi weavers, local youth heritage narrators, and micro-merchants in Tulshibaug.
        </p>
      </div>

      {/* Artisan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LOCAL_COMMERCE.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-xs text-amber-400 font-semibold mb-2">
                👤 {item.artisanName}
              </p>

              <p className="text-slate-300 text-xs leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1 mt-auto">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
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
