import React from 'react';
import { Star, MapPin, CheckCircle, Clock, Languages, Award, ShieldCheck, ArrowRight, UserCheck, Compass, Landmark } from 'lucide-react';

export default function GuideCard({ guide, onViewProfile }) {
  const {
    name,
    city,
    languages = [],
    specialties = [],
    experienceYears,
    rating,
    reviewCount,
    pricePerHour,
    verified,
    available
  } = guide;

  return (
    <div className="heritage-card bg-[#FFF8EC] border border-[#E8DCCB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      <div>
        {/* Cultural Heritage Guide Avatar Header (No Human Face) */}
        <div className="relative h-44 w-full bg-gradient-to-br from-[#741C35] via-[#881337] to-[#E87516] flex items-center justify-center p-6 overflow-hidden">
          
          {/* Subtle Background Pattern Rings */}
          <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full border-4 border-[#FFF8EC] border-dashed animate-spin-slow" />
          </div>

          {/* Central Cultural Icon Avatar Badge */}
          <div className="w-20 h-20 rounded-2xl bg-[#FFF8EC] border-2 border-[#E87516] flex flex-col items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 z-10">
            <UserCheck className="w-8 h-8 text-[#741C35]" />
            <span className="text-[9px] font-extrabold text-[#E87516] font-mono tracking-wider uppercase mt-0.5">GUIDE</span>
          </div>

          {/* City Badge */}
          <span className="absolute top-3 left-3 bg-[#FFF8EC]/90 text-[#741C35] text-xs font-bold px-3 py-1 rounded-full shadow-md border border-[#E8DCCB] flex items-center space-x-1 backdrop-blur-md">
            <MapPin className="w-3 h-3 text-[#E87516]" />
            <span>{city}</span>
          </span>

          {/* Availability Pill */}
          {available !== undefined && (
            <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${
              available
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-800 text-slate-200'
            }`}>
              {available ? '● Available' : 'Busy'}
            </span>
          )}

          {/* Rating Pill */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-[#FFF8EC]/95 border border-[#E8DCCB] text-[#741C35] text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-[#D4A72C] text-[#D4A72C]" />
            <span>{rating || 4.8}</span>
            {reviewCount !== undefined && (
              <span className="text-[#6F625D] text-[10px]">({reviewCount} reviews)</span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3 bg-[#FFF8EC]">
          
          {/* Name & Verification */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-[#741C35] font-heritage group-hover:text-[#E87516] transition-colors truncate">
                {name}
              </h3>
              {verified === true && (
                <span title="Verified Guide" className="flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                </span>
              )}
            </div>

            <p className="text-xs text-[#6F625D] font-semibold mt-0.5 flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-[#087F7B]" />
              <span>{experienceYears} years experience</span>
            </p>
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="text-xs text-[#332A27]">
              <span className="text-[#6F625D] font-bold block text-[10px] uppercase tracking-wider mb-0.5">Languages:</span>
              <span className="font-semibold text-[#741C35]">{languages.join(" • ")}</span>
            </div>
          )}

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {specialties.map((spec, i) => (
                <span
                  key={i}
                  className="bg-[#FAF1E4] border border-[#E8DCCB] text-[#741C35] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="p-5 pt-0 bg-[#FFF8EC] flex items-center justify-between border-t border-[#E8DCCB]/60 mt-3">
        <div>
          {pricePerHour ? (
            <div>
              <span className="text-lg font-extrabold text-[#E87516]">₹{pricePerHour}</span>
              <span className="text-[11px] text-[#6F625D] font-medium"> / hour</span>
            </div>
          ) : (
            <span className="text-xs font-bold text-[#6F625D]">Contact for pricing</span>
          )}
        </div>

        <button
          onClick={() => onViewProfile(guide)}
          className="btn-teal px-4 py-2 text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

    </div>
  );
}
