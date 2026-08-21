import React, { useState, useEffect, useMemo } from 'react';
import { getGuides } from '../services/guideService';
import GuideCard from '../components/GuideCard';
import GuideModal from '../components/GuideModal';
import { Search, Filter, MapPin, Users, HeartHandshake, Sparkles, RefreshCw, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { t } from '../data/translations';

export default function LocalGuidesPage({ currentLang = 'English' }) {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Filter & Search states
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const cities = ['All', 'Pune', 'Jaipur', 'Varanasi', 'Delhi', 'Mumbai', 'Udaipur', 'Hyderabad', 'Mysuru'];
  const specialties = ['All', 'Heritage', 'History', 'Food', 'Culture', 'Photography', 'Architecture', 'Shopping', 'Nature'];
  const languagesList = ['All', 'English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'];

  const fetchGuideData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getGuides();
      setGuides(data);
    } catch (err) {
      console.error("Error fetching local guides:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuideData();
  }, []);

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesCity = selectedCity === 'All' || guide.city === selectedCity;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        guide.name.toLowerCase().includes(query) ||
        guide.city.toLowerCase().includes(query) ||
        guide.specialties?.some(s => s.toLowerCase().includes(query)) ||
        guide.locations?.some(l => l.toLowerCase().includes(query));

      const matchesSpecialty = selectedSpecialty === 'All' || guide.specialties?.includes(selectedSpecialty);
      const matchesLanguage = selectedLanguage === 'All' || guide.languages?.includes(selectedLanguage);
      const matchesAvailability = !onlyAvailable || guide.available === true;

      return matchesCity && matchesSearch && matchesSpecialty && matchesLanguage && matchesAvailability;
    });
  }, [guides, selectedCity, searchQuery, selectedSpecialty, selectedLanguage, onlyAvailable]);

  const clearFilters = () => {
    setSelectedCity('All');
    setSearchQuery('');
    setSelectedSpecialty('All');
    setSelectedLanguage('All');
    setOnlyAvailable(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-sans">

      {/* Value Proposition Header Banner (Hackathon Core Problem Statement Solution) */}
      <div className="bg-[#FFF8EC] p-6 sm:p-8 rounded-3xl border border-[#E8DCCB] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E87516]/10 border border-[#E87516]/30 text-[#E87516] text-xs font-bold">
            <HeartHandshake className="w-4 h-4" />
            <span>Problem Statement Solution • Empowering Local Micro-Entrepreneurs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#741C35] font-heritage">
            Experience India Through Local Eyes
          </h2>
          <p className="text-[#6F625D] text-xs sm:text-sm leading-relaxed font-medium">
            Connect directly with verified local heritage storytellers, food enthusiasts, and historians who know the traditions, culture and hidden gems behind every destination.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB] text-center flex-shrink-0 relative z-10">
          <span className="text-2xl font-extrabold text-[#741C35] font-heritage block">{guides.length}</span>
          <span className="text-xs text-[#6F625D] font-bold">Verified Local Guides</span>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-[#087F7B]" />
          <span>Local Guide Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
          Meet Local Guides
        </h1>
        <p className="text-[#6F625D] text-sm sm:text-base font-medium">
          Experience the city through the stories and knowledge of people who call it home.
        </p>
      </div>

      {/* Controls Bar: City Filter + Search + Specialty Filter */}
      <div className="bg-[#FFF8EC] p-5 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-4">
        
        {/* City Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#741C35] flex items-center space-x-1 mr-2 flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#E87516]" />
            <span>City:</span>
          </span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#741C35] text-white shadow-md'
                  : 'bg-[#FAF1E4] text-[#6F625D] border border-[#E8DCCB] hover:text-[#741C35]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Search & Select Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#E8DCCB]">
          
          {/* Search Input */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F625D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by name, city, specialty..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF1E4] rounded-xl border border-[#E8DCCB] text-[#332A27] placeholder-[#6F625D] text-xs font-medium focus:outline-none focus:border-[#741C35]"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-[#087F7B] flex-shrink-0" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] text-[#332A27] text-xs font-bold rounded-xl focus:outline-none focus:border-[#741C35]"
            >
              <option value="All">All Specialties</option>
              {specialties.filter(s => s !== 'All').map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Language Filter & Availability */}
          <div className="flex items-center space-x-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] text-[#332A27] text-xs font-bold rounded-xl focus:outline-none focus:border-[#741C35]"
            >
              <option value="All">All Languages</option>
              {languagesList.filter(l => l !== 'All').map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border whitespace-nowrap transition-all cursor-pointer ${
                onlyAvailable
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-[#FAF1E4] text-[#6F625D] border-[#E8DCCB]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available</span>
            </button>
          </div>

        </div>

      </div>

      {/* Main Grid View Display */}
      {loading ? (
        /* LOADING SKELETON STATE */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-[#FFF8EC] border border-[#E8DCCB] rounded-2xl p-4 space-y-4 animate-pulse">
              <div className="h-48 bg-[#FAF1E4] rounded-xl w-full" />
              <div className="h-5 bg-[#FAF1E4] rounded w-3/4" />
              <div className="h-4 bg-[#FAF1E4] rounded w-1/2" />
              <div className="h-4 bg-[#FAF1E4] rounded w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        /* ERROR STATE */
        <div className="text-center py-16 bg-[#FFF8EC] rounded-3xl border border-[#E8DCCB] p-8 space-y-4">
          <p className="text-[#741C35] font-bold text-sm">Unable to load local guides right now. Please try again.</p>
          <button
            onClick={fetchGuideData}
            className="px-5 py-2.5 rounded-xl btn-maroon text-xs font-bold flex items-center space-x-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            <span>Retry</span>
          </button>
        </div>
      ) : filteredGuides.length > 0 ? (
        /* GUIDES CARDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onViewProfile={setSelectedGuide}
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="text-center py-16 bg-[#FFF8EC] rounded-3xl border border-[#E8DCCB] p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF1E4] text-[#741C35] flex items-center justify-center text-2xl mx-auto font-bold">
            🔍
          </div>
          <h3 className="text-xl font-bold text-[#741C35] font-heritage">No local guides found.</h3>
          <p className="text-[#6F625D] text-xs font-medium">
            Try changing your city, language, or specialty filters to see more results.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 rounded-xl btn-saffron text-xs font-bold cursor-pointer shadow-md inline-flex items-center space-x-2"
          >
            <span>Clear Filters</span>
          </button>
        </div>
      )}

      {/* Guide Details Profile & Request Modal */}
      {selectedGuide && (
        <GuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}

    </div>
  );
}
