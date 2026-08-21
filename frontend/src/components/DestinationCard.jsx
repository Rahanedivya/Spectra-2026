import React from 'react';
import { Star, Clock, IndianRupee, MapPin, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination, onSelect, onFavorite, isFavorite = false, currentLang = 'English' }) {
  const displayTitle = currentLang === 'Marathi' && destination.marathiName 
    ? destination.marathiName 
    : currentLang === 'Hindi' && destination.hindiName 
    ? destination.hindiName 
    : destination.name;

  return (
    <div className="glass-card rounded-2xl overflow-hidden glass-card-hover border border-slate-800/80 flex flex-col h-full group">
      
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-md text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {destination.category}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(destination);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-slate-950/60 text-slate-300 border-white/20 hover:text-rose-400'
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{destination.rating}</span>
          <span className="text-slate-400 text-[10px]">({destination.reviewCount.toLocaleString()})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
          {displayTitle}
        </h3>

        {/* Short Description */}
        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
          {destination.shortDescription}
        </p>

        {/* Key Information Badges */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{destination.visitingHours}</span>
          </div>
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{destination.approxCost}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-700 hover:border-amber-400 shadow-md"
        >
          <span>Explore Heritage & Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
