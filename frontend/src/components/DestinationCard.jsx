import React from 'react';
import { Star, Clock, IndianRupee, MapPin, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { t } from '../data/translations';

export default function DestinationCard({ destination, onSelect, onFavorite, isFavorite = false, currentLang = 'English' }) {
  const displayTitle = currentLang === 'Marathi' && destination.marathiName 
    ? destination.marathiName 
    : currentLang === 'Hindi' && destination.hindiName 
    ? destination.hindiName 
    : destination.name;

  return (
    <div className="heritage-card overflow-hidden flex flex-col h-full group bg-[#FFF8EC] border border-[#E8DCCB] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-[#741C35]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#741C35]/80 via-transparent to-transparent" />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-[#741C35] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-[#741C35]">
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
              ? 'bg-[#E87516] text-white border-[#E87516]'
              : 'bg-[#FFF8EC]/90 text-[#741C35] border-[#E8DCCB] hover:text-[#E87516]'
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-[#FFF8EC]/90 border border-[#E8DCCB] text-[#741C35] text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-[#D4A72C] text-[#D4A72C]" />
          <span>{destination.rating}</span>
          <span className="text-[#6F625D] text-[10px]">({destination.reviewCount.toLocaleString()})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow bg-[#FFF8EC]">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-[#741C35] font-heritage group-hover:text-[#E87516] transition-colors line-clamp-1 mb-2">
          {displayTitle}
        </h3>

        {/* Short Description */}
        <p className="text-[#6F625D] text-xs leading-relaxed line-clamp-2 mb-4 flex-grow font-medium">
          {destination.shortDescription}
        </p>

        {/* Key Information Badges */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6F625D] mb-4 bg-[#FAF1E4] p-2.5 rounded-xl border border-[#E8DCCB]">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <Clock className="w-3.5 h-3.5 text-[#741C35] flex-shrink-0" />
            <span className="truncate">{destination.visitingHours}</span>
          </div>
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <IndianRupee className="w-3.5 h-3.5 text-[#667A3A] flex-shrink-0" />
            <span className="truncate font-semibold text-[#332A27]">{destination.approxCost}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-2.5 px-4 rounded-xl btn-teal text-white font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
        >
          <span>{t('exploreCardBtn', currentLang)}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </button>

      </div>
    </div>
  );
}
