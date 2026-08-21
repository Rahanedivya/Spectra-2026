import React from 'react';
import { Compass, Sparkles, MapPin, Heart, Shield } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#181112] border-t border-[#3a1d23] text-[#d6c7b2] py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#701a28] text-white flex items-center justify-center font-bold">
              <Compass className="w-6 h-6 text-[#ea580c]" />
            </div>
            <div>
              <span className="font-heritage text-xl font-bold text-[#faf6f0]">HeritageAI</span>
              <span className="text-[#ea580c] text-xs font-mono font-bold block uppercase tracking-wider">Pune, Maharashtra</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#d6c7b2]">
            Discover Pune. Experience Its Heritage. Reimagining Indian cultural tourism through digital AI innovation.
          </p>
          <div className="text-xs text-[#a89582] flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ea580c] fill-current inline" />
            <span>for Maharashtra Tourism</span>
          </div>
        </div>

        {/* Explore Heritage */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a1d23] pb-2 font-heritage">
            Explore Heritage
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Shaniwar Wada (Peshwa Seat)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Sinhagad Fort (Kondhana Fortress)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Aga Khan Palace (Freedom Movement)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Pataleshwar Cave Temple (8th Century)</button></li>
            <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Raja Dinkar Kelkar Museum</button></li>
          </ul>
        </div>

        {/* Culture & Food */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a1d23] pb-2 font-heritage">
            Culture & Local Commerce
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Puneri Misal Pav</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Sujata Pune Mastani</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Kasba Peth Tambat Ali Coppersmiths</button></li>
            <li><button onClick={() => setActiveTab('food')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Puneri Pagadi & Paithani</button></li>
            <li><button onClick={() => setActiveTab('safety')} className="hover:text-[#ea580c] transition-colors cursor-pointer">Smart Safety & Helplines</button></li>
          </ul>
        </div>

        {/* Smart Travel & Hackathon */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3a1d23] pb-2 font-heritage">
            Smart Travel Innovation
          </h4>
          <p className="text-xs leading-relaxed text-[#d6c7b2] mb-3">
            Reimagining Indian Cities through Digital Innovation. Personalized AI trip planning, smart safety, and local artisan support.
          </p>
          <div className="p-3 rounded-xl bg-[#231417] border border-[#3a1d23] text-[11px] text-[#ea580c] font-semibold flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
            <span>Built for Spectra 2026 AI Innovation</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#3a1d23] text-center text-xs text-[#a89582]">
        © 2026 HeritageAI Pune. Discover Pune. Experience Its Heritage.
      </div>
    </footer>
  );
}
