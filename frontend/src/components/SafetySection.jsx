import React from 'react';
import { EMERGENCY_NUMBERS } from '../data/puneData';
import { ShieldAlert, PhoneCall, CheckCircle, Compass, Shield } from 'lucide-react';
import { t } from '../data/translations';

export default function SafetySection({ currentLang = 'English' }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DCCB] font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#741C35]/10 border border-[#741C35]/30 text-[#741C35] text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-[#E87516]" />
          <span>{t('safetyBadge', currentLang)}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage mb-4">
          {t('safetyTitle', currentLang)}
        </h2>
        <p className="text-[#6F625D] text-sm sm:text-base leading-relaxed font-medium">
          {t('safetyDesc', currentLang)}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Tourist Advisory Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-[#FFF8EC] p-6 rounded-3xl border border-[#E8DCCB] shadow-sm">
            <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 mb-3 font-heritage">
              <Compass className="w-5 h-5 text-[#E87516]" />
              <span>{t('checklistTitle', currentLang)}</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#332A27] font-medium">
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

          <div className="bg-[#FFF8EC] p-6 rounded-3xl border border-[#E8DCCB] shadow-sm">
            <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 mb-3 font-heritage">
              <Shield className="w-5 h-5 text-[#E87516]" />
              <span>🏛️ Old Peths & Cultural Etiquette</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#332A27] font-medium">
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

        {/* Right Col: Theme-Aligned Emergency Quick Access Panel */}
        <div className="bg-[#FFF8EC] p-6 rounded-3xl border border-[#E8DCCB] text-[#332A27] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-[#E8DCCB]">
              <div className="w-9 h-9 rounded-xl bg-[#E87516]/10 text-[#E87516] flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5 text-[#E87516] animate-pulse" />
              </div>
              <h3 className="text-lg font-extrabold text-[#741C35] font-heritage">
                {t('emergencyPanelTitle', currentLang)}
              </h3>
            </div>
            
            <p className="text-xs text-[#6F625D] mb-5 font-medium leading-relaxed">
              Verified national & municipal emergency numbers for immediate official tourist assistance.
            </p>

            <div className="space-y-3">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB] hover:border-[#E87516]/60 transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-[#741C35] text-white flex items-center justify-center font-bold text-xs shadow-md">
                      🚨
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-[#741C35] block">{item.label}</span>
                      <span className="text-[10px] text-[#6F625D] font-semibold">{t('verifiedHelpline', currentLang)}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${item.number.split('/')[0].trim()}`}
                    className="px-3 py-1.5 rounded-xl bg-[#E87516] hover:bg-[#c2410c] text-white font-extrabold text-xs transition-all shadow-md flex-shrink-0"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#6F625D] text-center mt-6 pt-4 border-t border-[#E8DCCB] font-medium">
            Official emergency services verified by Pune Municipal Corporation & Maharashtra Police.
          </p>

        </div>

      </div>

    </section>
  );
}
