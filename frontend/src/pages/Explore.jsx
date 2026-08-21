import React, { useState, useMemo } from 'react';
import { PUNE_DESTINATIONS } from '../data/puneData';
import DestinationCard from '../components/DestinationCard';
import MapComponent from '../components/MapComponent';
import { Search, Filter, SlidersHorizontal, Grid, MapPin, Sparkles } from 'lucide-react';

export default function Explore({ onSelectDestination, onFavorite, favorites = [], currentLang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  const categories = ['All', 'Heritage', 'History', 'Forts', 'Museums', 'Culture'];

  const filteredDestinations = useMemo(() => {
    return PUNE_DESTINATIONS.filter(site => {
      const matchesSearch = 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (site.marathiName && site.marathiName.includes(searchQuery)) ||
        (site.hindiName && site.hindiName.includes(searchQuery)) ||
        site.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating;
      if (sortBy === 'Budget Friendly') return (a.costNum || 0) - (b.costNum || 0);
      return b.reviewCount - a.reviewCount; // Popular
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Discover Pune's Imperial Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage">
            Explore <span className="text-[#ea580c]">Pune Heritage</span>
          </h1>
          <p className="text-[#5c4a4e] text-sm mt-1 font-medium">
            Search fortresses, ancient rock caves, Peshwa wadas, and iconic museums.
          </p>
        </div>

        {/* Grid vs Map Toggle */}
        <div className="flex items-center space-x-2 bg-[#231417] p-1.5 rounded-xl border border-[#3a1d23] self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#ea580c] text-white shadow-md'
                : 'text-[#d6c7b2] hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Cards Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#ea580c] text-white shadow-md'
                : 'text-[#d6c7b2] hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search + Category Filters + Sort */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2d7c7] shadow-sm mb-8 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7679]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Shaniwar Wada, Forts, Misal, Museums..."
              className="w-full pl-10 pr-4 py-3 bg-[#faf6f0] rounded-xl border border-[#e2d7c7] text-[#1c1214] placeholder-[#8a7679] text-xs font-medium focus:outline-none focus:border-[#701a28]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#701a28] flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-3 py-3 bg-[#faf6f0] border border-[#e2d7c7] text-[#1c1214] text-xs font-bold rounded-xl focus:outline-none focus:border-[#701a28]"
            >
              <option value="Popular">Most Popular</option>
              <option value="Highest Rated">Highest Rated ⭐</option>
              <option value="Budget Friendly">Budget Friendly ₹</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e2d7c7]">
          <span className="text-xs font-bold text-[#701a28] mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#ea580c]" />
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#701a28] text-white shadow-md'
                  : 'bg-[#faf6f0] text-[#5c4a4e] border border-[#e2d7c7] hover:text-[#701a28]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Main View Display */}
      {viewMode === 'grid' ? (
        filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((site) => (
              <DestinationCard
                key={site.id}
                destination={site}
                onSelect={onSelectDestination}
                onFavorite={onFavorite}
                isFavorite={favorites.some(f => f.id === site.id)}
                currentLang={currentLang}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e2d7c7]">
            <p className="text-[#5c4a4e] text-sm font-medium">No Pune heritage sites found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#701a28] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )
      ) : (
        <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-xl border border-[#e2d7c7]">
          <MapComponent
            destinations={filteredDestinations}
            onSelectSite={onSelectDestination}
          />
        </div>
      )}

    </div>
  );
}
