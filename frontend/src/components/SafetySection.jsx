import React from 'react';
import { EMERGENCY_NUMBERS } from '../data/puneData';
import { ShieldAlert, PhoneCall, AlertTriangle, CheckCircle, Compass, Thermometer, Shield } from 'lucide-react';

export default function SafetySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e2d7c7] font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Verified Visitor Guidelines & Emergency Support</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage mb-4">
          Smart <span className="text-[#ea580c]">Safety</span> & Tourist Care
        </h2>
        <p className="text-[#5c4a4e] text-sm sm:text-base leading-relaxed font-medium">
          Traverse Pune with complete peace of mind. Verified helpline access, fort trekking advisories, and monument guidelines.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Tourist Advisory Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white p-6 rounded-2xl border border-[#e2d7c7] shadow-sm">
            <h3 className="text-lg font-bold text-[#701a28] flex items-center space-x-2 mb-3 font-heritage">
              <Compass className="w-5 h-5 text-[#ea580c]" />
              <span>Before You Explore Pune — Checklist</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#3c2b2e] font-medium">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Carry Water:</strong> Always carry carry-on water bottles while hiking hill forts like Sinhagad.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Check Weather:</strong> Check afternoon monsoon mists before starting mountain climbs.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Follow Monument Rules:</strong> Remove footwear near sacred cave caverns & samadhi zones.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Keep Valuables Secure:</strong> Keep personal wallets & mobile devices safe in busy Peth markets.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2d7c7] shadow-sm">
            <h3 className="text-lg font-bold text-[#701a28] flex items-center space-x-2 mb-3 font-heritage">
              <Shield className="w-5 h-5 text-[#ea580c]" />
              <span>🏛️ Old Peths & Cultural Etiquette</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#3c2b2e] font-medium">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Photographic Guidelines:</strong> Respect camera guidelines inside heritage galleries & Kelkar Museum.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Temple Attire:</strong> Modest clothing covering shoulders and knees is appreciated at sacred shrines.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Col: Verified Emergency Quick Access Panel */}
        <div className="bg-[#181112] p-6 rounded-3xl border border-[#701a28] text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-[#3a1d23]">
              <PhoneCall className="w-5 h-5 text-[#ea580c] animate-pulse" />
              <h3 className="text-lg font-bold text-[#faf6f0]">Emergency Quick Access</h3>
            </div>
            
            <p className="text-xs text-[#d6c7b2] mb-6 font-normal">
              Verified national & municipal emergency numbers for immediate official tourist assistance.
            </p>

            <div className="space-y-3">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#231417] border border-[#3a1d23] hover:border-[#ea580c]/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#701a28] text-white flex items-center justify-center font-bold text-xs">
                      🚨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{item.label}</span>
                      <span className="text-[11px] text-[#d6c7b2]">Verified Helpline</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${item.number.split('/')[0].trim()}`}
                    className="px-3 py-1.5 rounded-lg bg-[#701a28] hover:bg-[#881337] text-white font-extrabold text-xs transition-colors shadow-md"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#a89582] text-center mt-6 pt-4 border-t border-[#3a1d23]">
            Official emergency services verified by Pune Municipal Corporation & Maharashtra Police.
          </p>

        </div>

      </div>

    </section>
  );
}
