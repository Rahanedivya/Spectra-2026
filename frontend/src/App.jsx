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
import { t } from './data/translations';
import { Sparkles, MapPin, Heart, Bookmark, Trash2, ArrowRight, Compass, ShieldAlert, Globe, IndianRupee, Utensils, HeartHandshake } from 'lucide-react';

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
    <div className="min-h-screen bg-[#faf6f0] text-[#2b181b] flex flex-col font-sans selection:bg-[#701a28] selection:text-white">

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

        {/* HOME TAB: Storytelling Journey */}
        {activeTab === 'home' && (
          <div>
            
            {/* SECTION 1: Hero */}
            <Hero
              onStartPlanner={() => setActiveTab('planner')}
              onExplore={() => setActiveTab('explore')}
              onSearchPrompt={handleHeroSearchPrompt}
              currentLang={currentLang}
            />

            {/* SECTION 2: Why Pune? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#e2d7c7]">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold">
                  <Compass className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>{t('whyPuneBadge', currentLang)}</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage">
                  {t('whyPuneTitle', currentLang)}
                </h2>
                
                <p className="text-[#5c4a4e] text-base leading-relaxed font-medium">
                  {t('whyPuneDesc', currentLang)}
                </p>
              </div>
            </section>

            {/* SECTION 3: Explore Pune's Heritage */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#e2d7c7]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>{t('featuredBadge', currentLang)}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage">
                    {t('featuredTitle', currentLang)}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2.5 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white font-bold text-xs flex items-center space-x-2 cursor-pointer shadow-md self-start sm:self-auto"
                >
                  <span>{t('viewAllBtn', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 text-[#ea580c]" />
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

            {/* SECTION 4: Let AI Plan Your Journey */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-[#181112] p-8 sm:p-12 rounded-3xl border border-[#ea580c]/30 text-[#faf6f0] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28] border border-[#881337] text-[#ea580c] text-xs font-bold">
                    <Sparkles className="w-4 h-4 fill-[#ea580c]" />
                    <span>{t('aiSectionBadge', currentLang)}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heritage">
                    {t('aiSectionTitle', currentLang)}
                  </h2>
                  <p className="text-[#d6c7b2] text-sm leading-relaxed font-normal">
                    {t('aiSectionDesc', currentLang)}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('planner')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#701a28] via-[#881337] to-[#ea580c] text-white font-extrabold text-sm hover:brightness-110 transition-all flex items-center space-x-3 shadow-xl cursor-pointer flex-shrink-0"
                >
                  <Sparkles className="w-5 h-5 fill-white" />
                  <span>{t('aiSectionBtn', currentLang)}</span>
                </button>
              </div>
            </section>

            {/* SECTION 5: Experience Pune Like a Local (Food) */}
            <FoodDiscovery currentLang={currentLang} />

            {/* SECTION 6: Travel Smarter */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e2d7c7]">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#701a28]/10 border border-[#701a28]/30 text-[#701a28] text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>{t('travelSmarterBadge', currentLang)}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage mb-4">
                  {t('travelSmarterTitle', currentLang)}
                </h2>
                <p className="text-[#5c4a4e] text-sm sm:text-base leading-relaxed font-medium">
                  {t('travelSmarterDesc', currentLang)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#e2d7c7] shadow-sm">
                  <Globe className="w-8 h-8 text-[#ea580c] mb-3" />
                  <h3 className="text-lg font-bold text-[#701a28] font-heritage mb-2">{t('feat1Title', currentLang)}</h3>
                  <p className="text-xs text-[#5c4a4e] leading-relaxed">
                    {t('feat1Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#e2d7c7] shadow-sm">
                  <IndianRupee className="w-8 h-8 text-emerald-700 mb-3" />
                  <h3 className="text-lg font-bold text-[#701a28] font-heritage mb-2">{t('feat2Title', currentLang)}</h3>
                  <p className="text-xs text-[#5c4a4e] leading-relaxed">
                    {t('feat2Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#e2d7c7] shadow-sm">
                  <ShieldAlert className="w-8 h-8 text-emerald-700 mb-3" />
                  <h3 className="text-lg font-bold text-[#701a28] font-heritage mb-2">{t('feat3Title', currentLang)}</h3>
                  <p className="text-xs text-[#5c4a4e] leading-relaxed">
                    {t('feat3Desc', currentLang)}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Support Local Pune */}
            <LocalCommerce currentLang={currentLang} />

            {/* SECTION 8: Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
              <div className="bg-white p-10 sm:p-14 rounded-3xl border border-[#e2d7c7] shadow-xl space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] font-heritage">
                  {t('finalCtaTitle', currentLang)}
                </h2>
                <p className="text-[#5c4a4e] text-base max-w-2xl mx-auto font-medium">
                  {t('finalCtaDesc', currentLang)}
                </p>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="px-8 py-4 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white font-extrabold text-sm shadow-xl transition-all inline-flex items-center space-x-3 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#ea580c]" />
                  <span>{t('finalCtaBtn', currentLang)}</span>
                </button>
              </div>
            </section>

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
          <SafetySection currentLang={currentLang} />
        )}

        {/* SAVED TRIPS & FAVORITES TAB */}
        {activeTab === 'saved' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#701a28] mb-2 font-heritage">
                {t('savedTitle', currentLang)}
              </h1>
              <p className="text-[#5c4a4e] text-sm font-medium">
                {t('savedSub', currentLang)}
              </p>
            </div>

            {/* Saved Destinations Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
                <Heart className="w-5 h-5 text-[#ea580c] fill-current" />
                <span>{t('bookmarkedSites', currentLang)} ({favorites.length})</span>
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
                <div className="bg-white p-8 rounded-2xl border border-[#e2d7c7] text-center text-[#5c4a4e] text-xs font-medium">
                  {t('noBookmarks', currentLang)} Browse <button onClick={() => setActiveTab('explore')} className="text-[#701a28] font-bold underline cursor-pointer">Explore Sites</button> to add your favorites!
                </div>
              )}
            </div>

            {/* Saved AI Itineraries */}
            <div className="space-y-4 pt-6 border-t border-[#e2d7c7]">
              <h3 className="text-lg font-bold text-[#701a28] flex items-center space-x-2 font-heritage">
                <Bookmark className="w-5 h-5 text-[#ea580c]" />
                <span>{t('savedItineraries', currentLang)} ({savedTrips.length})</span>
              </h3>

              {savedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedTrips.map(trip => (
                    <div key={trip.id} className="bg-white p-5 rounded-2xl border border-[#e2d7c7] shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#701a28] text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                          {trip.title}
                        </span>
                        <button
                          onClick={() => setSavedTrips(savedTrips.filter(t => t.id !== trip.id))}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#3c2b2e] font-medium">
                        {trip.daysCount} Days • Budget: ₹{trip.budget.toLocaleString()} • Sustainability Score: {trip.sustainabilityScore}/100
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-[#e2d7c7] text-center text-[#5c4a4e] text-xs font-medium">
                  {t('noSavedTrips', currentLang)} Use the <button onClick={() => setActiveTab('planner')} className="text-[#701a28] font-bold underline cursor-pointer">✨ AI Trip Planner</button> to create a customized itinerary!
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
      <Footer setActiveTab={setActiveTab} currentLang={currentLang} />

    </div>
  );
}
