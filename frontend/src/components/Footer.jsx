import React from 'react';
import { Compass, Sparkles, MapPin, Heart, Shield } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="glass-card border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-heritage text-xl font-bold text-gradient-gold">HeritageAI</span>
              <span className="text-amber-500 text-xs font-mono font-bold block uppercase tracking-wider">Pune, Maharashtra</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Reimagining Indian cultural tourism through AI innovation. The intelligent digital gateway to Pune.
          </p>
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
            <span>for Maharashtra Tourism</span>
          </div>
        </div>

        {/* Quick Discovery */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Explore Heritage
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-300 transition-colors">Shaniwar Wada (Peshwa Seat)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-300 transition-colors">Sinhagad Fort (Kondhana Fortress)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-300 transition-colors">Aga Khan Palace (Freedom Movement)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-300 transition-colors">Pataleshwar Cave Temple (8th Century)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-300 transition-colors">Raja Dinkar Kelkar Museum</button></li>
          </ul>
        </div>

        {/* Culture & Food */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Culture & Local Commerce
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('food')} className="hover:text-amber-300 transition-colors">Puneri Misal Pav</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-amber-300 transition-colors">Sujata Pune Mastani</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-amber-300 transition-colors">Kasba Peth Tambat Ali Coppersmiths</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-amber-300 transition-colors">Puneri Pagadi & Paithani</button></li>
            <li><button onClick={() => setActiveTab('safety')} className="hover:text-amber-300 transition-colors">Tourist Safety & Helpline</button></li>
          </ul>
        </div>

        {/* Hackathon Statement */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Hackathon Vision
          </h4>
          <p className="text-xs leading-relaxed text-slate-400 mb-3">
            Built as a scalable MVP for Pune, Maharashtra, ready to power cultural tourism across Jaipur, Varanasi, and Delhi.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-semibold flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Spectra 2026 AI Innovation</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-800/80 text-center text-xs text-slate-400">
        © 2026 HeritageAI Pune. Discover Pune. Experience Its Heritage. Travel Smarter.
      </div>
    </footer>
  );
}
