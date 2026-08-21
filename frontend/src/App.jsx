import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explore from './pages/Explore';
import Planner from './pages/Planner';
import FoodDiscovery from './components/FoodDiscovery';
import LocalCommerce from './components/LocalCommerce';
import SafetySection from './components/SafetySection';
import DestinationCard from './components/DestinationCard';
import DestinationModal from './components/DestinationModal';
import AiChatAssistant from './components/AiChatAssistant';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

import { PUNE_DESTINATIONS } from './data/puneData';
import { Sparkles, MapPin, Heart, Bookmark, Trash2, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState('English');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleFavoriteToggle = (dest) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === dest.id);
      if (exists) {
        return prev.filter(f => f.id !== dest.id);
      } else {
        return [...prev, dest];
      }
    });
  };

  const handleSaveTrip = (tripData) => {
    setSavedTrips(prev => [
      { id: Date.now(), title: `${tripData.daysCount} Days Pune Journey (${tripData.language})`, ...tripData },
      ...prev
    ]);
  };

  const handleHeroSearchPrompt = (promptText) => {
    setInitialPrompt(promptText);
    setActiveTab('planner');
  };

  const handleAddToTripFromModal = (dest) => {
    handleFavoriteToggle(dest);
    setActiveTab('planner');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">

      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        onOpenAuth={() => setIsAuthOpen(true)}
        savedCount={favorites.length + savedTrips.length}
      />

      {/* Main Body Routing */}
      <main className="flex-grow">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            {/* Cinematic Hero */}
            <Hero
              onStartPlanner={() => setActiveTab('planner')}
              onExplore={() => setActiveTab('explore')}
              onSearchPrompt={handleHeroSearchPrompt}
            />

            {/* Featured Destinations Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Peshwa Imperial Sites & Heritage</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                    Featured <span className="font-heritage text-gradient-gold">Pune Destinations</span>
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center space-x-2 self-start sm:self-auto"
                >
                  <span>View All 10 Heritage Sites</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PUNE_DESTINATIONS.slice(0, 4).map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={setSelectedDestination}
                    onFavorite={handleFavoriteToggle}
                    isFavorite={favorites.some(f => f.id === dest.id)}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            </section>

            {/* Taste Pune Food Showcase */}
            <FoodDiscovery currentLang={currentLang} />

            {/* Support Local Pune Artisans */}
            <LocalCommerce />

            {/* Smart Safety Section */}
            <SafetySection />
          </div>
        )}

        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <Explore
            onSelectDestination={setSelectedDestination}
            onFavorite={handleFavoriteToggle}
            favorites={favorites}
            currentLang={currentLang}
          />
        )}

        {/* AI TRIP PLANNER TAB */}
        {activeTab === 'planner' && (
          <Planner
            initialPrompt={initialPrompt}
            onSaveTrip={handleSaveTrip}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
          />
        )}

        {/* FOOD TAB */}
        {activeTab === 'food' && (
          <FoodDiscovery currentLang={currentLang} />
        )}

        {/* SAFETY TAB */}
        {activeTab === 'safety' && (
          <SafetySection />
        )}

        {/* SAVED TRIPS & FAVORITES TAB */}
        {activeTab === 'saved' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
                My Saved <span className="font-heritage text-gradient-gold">Trips & Favorites</span>
              </h1>
              <p className="text-slate-400 text-sm">
                Bookmark your preferred Pune monuments and AI journeys for easy reference.
              </p>
            </div>

            {/* Saved Destinations Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-300 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-400 fill-current" />
                <span>Bookmarked Heritage Sites ({favorites.length})</span>
              </h3>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favorites.map(dest => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelect={setSelectedDestination}
                      onFavorite={handleFavoriteToggle}
                      isFavorite={true}
                      currentLang={currentLang}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                  No bookmarked heritage sites yet. Browse <button onClick={() => setActiveTab('explore')} className="text-amber-400 font-bold underline">Explore Sites</button> to add your favorites!
                </div>
              )}
            </div>

            {/* Saved AI Itineraries */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-amber-300 flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-amber-400" />
                <span>Saved AI Itineraries ({savedTrips.length})</span>
              </h3>

              {savedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedTrips.map(trip => (
                    <div key={trip.id} className="glass-card p-5 rounded-2xl border border-amber-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-amber-500/20 text-amber-300 font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-500/30">
                          {trip.title}
                        </span>
                        <button
                          onClick={() => setSavedTrips(savedTrips.filter(t => t.id !== trip.id))}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300">
                        {trip.daysCount} Days • Budget: ₹{trip.budget.toLocaleString()} • Sustainability Score: {trip.sustainabilityScore}/100
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                  No saved AI itineraries yet. Use the <button onClick={() => setActiveTab('planner')} className="text-amber-400 font-bold underline">✨ AI Trip Planner</button> to create a customized itinerary!
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Destination Detailed Story Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onAskAi={(prompt) => {
            setInitialPrompt(prompt);
            setActiveTab('planner');
          }}
          onAddToTrip={handleAddToTripFromModal}
          isFavorite={favorites.some(f => f.id === selectedDestination.id)}
          onFavorite={handleFavoriteToggle}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
      )}

      {/* Floating Multilingual AI Assistant */}
      <AiChatAssistant currentLang={currentLang} />

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
