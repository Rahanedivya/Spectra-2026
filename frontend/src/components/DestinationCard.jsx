import React from 'react';
import { Star, Clock, IndianRupee, MapPin, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination, onSelect, onFavorite, isFavorite = false, currentLang = 'English' }) {
  const displayTitle = currentLang === 'Marathi' && destination.marathiName 
    ? destination.marathiName 
    : currentLang === 'Hindi' && destination.hindiName 
    ? destination.hindiName 
    : destination.name;

  return (
    <div className="heritage-card overflow-hidden flex flex-col h-full group bg-white border border-[#e2d7c7] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-[#231417]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181112]/90 via-[#181112]/20 to-transparent" />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-[#701a28] text-[#fffdfa] text-xs font-bold px-3 py-1 rounded-full shadow-md border border-[#881337]">
          {destination.category}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(destination);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            isFavorite
              ? 'bg-[#ea580c] text-white border-[#ea580c]'
              : 'bg-[#181112]/70 text-[#faf6f0] border-white/20 hover:text-[#ea580c]'
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-[#181112]/90 border border-[#ea580c]/30 text-[#ea580c] text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-[#ea580c] text-[#ea580c]" />
          <span>{destination.rating}</span>
          <span className="text-[#d6c7b2] text-[10px]">({destination.reviewCount.toLocaleString()})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-[#701a28] font-heritage group-hover:text-[#ea580c] transition-colors line-clamp-1 mb-2">
          {displayTitle}
        </h3>

        {/* Short Description */}
        <p className="text-[#4a3b3e] text-xs leading-relaxed line-clamp-2 mb-4 flex-grow font-medium">
          {destination.shortDescription}
        </p>

        {/* Key Information Badges */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5c4a4e] mb-4 bg-[#faf6f0] p-2.5 rounded-xl border border-[#e2d7c7]">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <Clock className="w-3.5 h-3.5 text-[#701a28] flex-shrink-0" />
            <span className="truncate">{destination.visitingHours}</span>
          </div>
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <span className="truncate font-semibold text-[#1c1214]">{destination.approxCost}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
        >
          <span>Explore Heritage & Story</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#ea580c]" />
        </button>

      </div>
    </div>
  );
}
