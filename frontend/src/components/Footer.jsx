import React from 'react';
import { Compass, Sparkles, MapPin, Heart, Shield, Landmark } from 'lucide-react';
import { t } from '../data/translations';
import WarliArt from './WarliArt';

export default function Footer({ setActiveTab, currentLang = 'English' }) {
  return (
    <footer className="bg-[#741C35] text-[#FFF8EC] py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans relative overflow-hidden">
      
      {/* Traditional Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 opacity-40">
        <WarliArt className="w-full h-8" color="#FFF8EC" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#FFF8EC] text-[#741C35] flex items-center justify-center font-bold shadow-md">
              <Landmark className="w-6 h-6 text-[#741C35]" />
            </div>
            <div>
              <span className="font-heritage text-2xl font-bold text-white">HeritageAI</span>
              <span className="text-[#D4A72C] text-xs font-mono font-bold block uppercase tracking-wider">Smart Cultural Tourism for India</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#F8D8AD]/90">
            {t('footerDesc', currentLang)}
          </p>
          <div className="text-xs text-[#F8D8AD]/80 flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E87516] fill-current inline" />
            <span>for Indian Tourism</span>
          </div>
        </div>

        {/* Explore Heritage */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#FFF8EC]/20 pb-2 font-heritage">
            Explore Heritage
          </h4>
          <ul className="space-y-2 text-xs text-[#F8D8AD]">
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Shaniwar Wada (Pune)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Amber Fort (Jaipur)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Ghats of Varanasi (Varanasi)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Humayun's Tomb (Delhi)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Charminar (Hyderabad)</button></li>
          </ul>
        </div>

        {/* Culture & Food */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#FFF8EC]/20 pb-2 font-heritage">
            Culture & Local Commerce
          </h4>
          <ul className="space-y-2 text-xs text-[#F8D8AD]">
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Authentic Puneri Misal Pav</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Jaipur Dal Baati Churma</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Kasba Peth Tambat Ali Guilds</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Traditional Weavers & Artisans</button></li>
            <li><button onClick={() => setActiveTab('safety')} className="hover:text-[#D4A72C] transition-colors cursor-pointer">Smart Safety & Helplines</button></li>
          </ul>
        </div>

        {/* Smart Travel & Hackathon */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#FFF8EC]/20 pb-2 font-heritage">
            Smart Travel Innovation
          </h4>
          <p className="text-xs leading-relaxed text-[#F8D8AD]/90 mb-3">
            Reimagining Indian Cities through Digital Innovation. Personalized AI trip planning, smart safety, and local artisan support.
          </p>
          <div className="p-3 rounded-xl bg-[#581427] border border-[#FFF8EC]/20 text-[11px] text-[#D4A72C] font-semibold flex items-center space-x-2 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#D4A72C] flex-shrink-0" />
            <span>{t('builtFor', currentLang)}</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#FFF8EC]/20 text-center text-xs text-[#F8D8AD]/70">
        {t('copyright', currentLang)}
      </div>
    </footer>
  );
}
