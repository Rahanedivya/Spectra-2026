import React from 'react';
import { EMERGENCY_NUMBERS } from '../data/puneData';
import { ShieldAlert, PhoneCall, AlertTriangle, CheckCircle, Compass, Thermometer, Shield } from 'lucide-react';

export default function SafetySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Verified Visitor Guidelines & Emergency Support</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Smart <span className="font-heritage text-gradient-gold">Safety</span> & Emergency Access
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Traverse Pune with complete peace of mind. Instant verified emergency contact access, hill fort terrain advisories, and weather guidelines.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Tourist Advisory Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="glass-card p-6 rounded-2xl border border-amber-500/30">
            <h3 className="text-lg font-bold text-amber-300 flex items-center space-x-2 mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>⛰️ Fort Trekking & Sahyadri Safety (Sinhagad Fort)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Terrain & Footwear:</strong> Wear high-traction rubber trekking boots. Ancient basalt rock steps get slippery during monsoon mists.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Cliff Edges:</strong> Do not cross safety barricades near Kalyan Darwaza or take risky cliff photography.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Hydration:</strong> Carry at least 2 liters of water per hiker during sunny afternoon treks.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>🏛️ Old Peths & Temple Festival Etiquette</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Market Valuables:</strong> Keep personal wallets, passports, and mobile phones in front pockets in crowded Tulshibaug / Laxmi Road.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Temple Attire:</strong> Modest clothing covering shoulders and knees is appreciated at Dagadusheth Ganpati and Pataleshwar Caves.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Col: Verified Emergency Quick Access Panel */}
        <div className="glass-card p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-rose-500/20">
              <PhoneCall className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-lg font-bold text-white">Emergency Quick Access</h3>
            </div>
            
            <p className="text-xs text-slate-300 mb-6">
              Verified national & municipal emergency numbers for immediate official tourist assistance.
            </p>

            <div className="space-y-3">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                      🚨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{item.label}</span>
                      <span className="text-[11px] text-slate-400">Verified Helpline</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${item.number.split('/')[0].trim()}`}
                    className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition-colors shadow-md"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-6 pt-4 border-t border-slate-800">
            Official emergency services verified by Pune Municipal Corporation & Maharashtra Police.
          </p>

        </div>

      </div>

    </section>
  );
}
