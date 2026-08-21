import React, { useState, useEffect } from 'react';
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
import SplashScreen from './components/SplashScreen';
import LocalGuidesPage from './pages/LocalGuidesPage';

import { PUNE_DESTINATIONS } from './data/puneData';
import { t } from './data/translations';
import { Sparkles, MapPin, Heart, Bookmark, Trash2, ArrowRight, Compass, ShieldAlert, Globe, IndianRupee, Utensils, HeartHandshake, Landmark, LogIn, Lock } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState('English');
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('atithya_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authNotice, setAuthNotice] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Pune');

  // Load Saved Data per logged-in user
  useEffect(() => {
    if (currentUser?.email) {
      const userFavsKey = `atithya_favs_${currentUser.email}`;
      const userTripsKey = `atithya_trips_${currentUser.email}`;
      try {
        const favs = localStorage.getItem(userFavsKey);
        const trips = localStorage.getItem(userTripsKey);
        setFavorites(favs ? JSON.parse(favs) : []);
        setSavedTrips(trips ? JSON.parse(trips) : []);
      } catch (e) {
        setFavorites([]);
        setSavedTrips([]);
      }
    } else {
      setFavorites([]);
      setSavedTrips([]);
    }
  }, [currentUser]);

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('atithya_user', JSON.stringify(userObj));
    setIsAuthOpen(false);
    setAuthNotice('');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('atithya_user');
    setFavorites([]);
    setSavedTrips([]);
  };

  // Guarded Favorite Toggle: Requires User Login First
  const handleFavoriteToggle = (dest) => {
    if (!currentUser) {
      setAuthNotice('Please sign in first to save heritage places & trip itineraries.');
      setIsAuthOpen(true);
      return;
    }

    setFavorites(prev => {
      const exists = prev.some(f => f.id === dest.id);
      const updated = exists ? prev.filter(f => f.id !== dest.id) : [...prev, dest];
      if (currentUser?.email) {
        localStorage.setItem(`atithya_favs_${currentUser.email}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Guarded Save AI Trip: Requires User Login First
  const handleSaveTrip = (tripData) => {
    if (!currentUser) {
      setAuthNotice('Please sign in first to save heritage places & trip itineraries.');
      setIsAuthOpen(true);
      return;
    }

    setSavedTrips(prev => {
      const newTrip = {
        id: Date.now(),
        title: `${tripData.daysCount} Days ${selectedCity} Journey (${tripData.language})`,
        ...tripData
      };
      const updated = [newTrip, ...prev];
      if (currentUser?.email) {
        localStorage.setItem(`atithya_trips_${currentUser.email}`, JSON.stringify(updated));
      }
      return updated;
    });
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
    <div className="min-h-screen bg-[#F8D8AD] text-[#332A27] flex flex-col font-sans selection:bg-[#741C35] selection:text-white">

      {/* Mandatory Traditional Indian Splash Screen Overlay */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => {
          setAuthNotice('');
          setIsAuthOpen(true);
        }}
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

            {/* SECTION 2: Cultural Heritage Highlights */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold">
                  <Landmark className="w-3.5 h-3.5 text-[#E87516]" />
                  <span>Cultural Heritage Highlights</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                  Explore <span className="text-[#E87516]">India's Living Heritage</span>
                </h2>
                
                <p className="text-[#6F625D] text-base leading-relaxed font-medium">
                  From Maratha fortresses in Pune to imperial palaces in Jaipur and ancient ghats in Varanasi — Atithya AI brings India's cultural stories to life with AI trip planning and multilingual narration.
                </p>

                {/* City Selector Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                  {['Pune', 'Jaipur', 'Varanasi', 'Delhi', 'Hyderabad', 'Mysuru'].map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCity === city
                          ? 'bg-[#741C35] text-white shadow-md'
                          : 'bg-[#FFF8EC] text-[#6F625D] border border-[#E8DCCB] hover:text-[#741C35]'
                      }`}
                    >
                      {city} {city === 'Pune' ? '🏰' : city === 'Jaipur' ? '🕌' : '🕉️'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PUNE_DESTINATIONS.slice(0, 3).map(dest => (
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

              <div className="text-center mt-10">
                <button
                  onClick={() => setActiveTab('explore')}
                  className="btn-maroon px-8 py-3.5 text-xs font-bold inline-flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <span>{t('viewAllBtn', currentLang)}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </section>

            {/* SECTION 3: Why Choose Pune */}
            <section className="py-16 bg-[#FFF8EC] border-y border-[#E8DCCB]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E87516]/10 border border-[#E87516]/30 text-[#E87516] text-xs font-bold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{t('whyPuneBadge', currentLang)}</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                      {t('whyPuneTitle', currentLang)}
                    </h2>

                    <p className="text-[#6F625D] text-sm sm:text-base leading-relaxed font-medium">
                      {t('whyPuneDesc', currentLang)}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB]">
                        <span className="text-2xl font-extrabold text-[#741C35] font-heritage block">1732</span>
                        <span className="text-xs text-[#6F625D] font-bold">Built by Peshwa Baji Rao I</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB]">
                        <span className="text-2xl font-extrabold text-[#E87516] font-heritage block">400+ Yrs</span>
                        <span className="text-xs text-[#6F625D] font-bold">Kasba Peth Artisan Guilds</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E8DCCB] h-96">
                    <img
                      src="https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1000&auto=format&fit=crop"
                      alt="Shaniwar Wada Pune"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#741C35]/90 via-[#741C35]/20 to-transparent p-6 flex flex-col justify-end text-white">
                      <span className="text-xs font-bold text-[#F8D8AD] uppercase tracking-wider">Imperial Peshwa Seat</span>
                      <h3 className="text-2xl font-bold font-heritage">Shaniwar Wada Fort</h3>
                      <p className="text-xs text-slate-200 mt-1">Symbol of Maratha Empire supremacy and Peshwa governance.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 4: AI Planner CTA Banner */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-[#FFF8EC] p-8 sm:p-12 rounded-3xl border border-[#E8DCCB] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E87516]/10 border border-[#E87516]/30 text-[#E87516] text-xs font-bold">
                    <Sparkles className="w-4 h-4 text-[#E87516]" />
                    <span>AI Cultural Travel Engine</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heritage text-[#741C35]">
                    Plan Your <span className="text-[#E87516]">Cultural Journey</span>
                  </h2>
                  <p className="text-[#6F625D] text-sm leading-relaxed font-normal">
                    Select your custom days, budget, interests, and language. Atithya AI generates dynamic routes, cost breakdowns, and authentic cultural stops in seconds.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('planner')}
                  className="btn-saffron px-8 py-4 text-sm flex items-center space-x-3 shadow-xl cursor-pointer flex-shrink-0"
                >
                  <Sparkles className="w-5 h-5 fill-white" />
                  <span>✨ Plan My Journey</span>
                </button>
              </div>
            </section>

            {/* SECTION 5: Taste India */}
            <FoodDiscovery currentLang={currentLang} />

            {/* SECTION 6: Travel Smarter */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DCCB]">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#E87516]" />
                  <span>Integrated Digital Tourism Stack</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage mb-4">
                  Travel <span className="text-[#E87516]">Smarter</span>
                </h2>
                <p className="text-[#6F625D] text-sm sm:text-base leading-relaxed font-medium">
                  Designed to solve the complete end-to-end heritage tourism workflow for travelers in India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <Globe className="w-8 h-8 text-[#087F7B] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat1Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat1Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <IndianRupee className="w-8 h-8 text-[#667A3A] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat2Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat2Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <ShieldAlert className="w-8 h-8 text-[#087F7B] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat3Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat3Desc', currentLang)}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Meet India's Local Makers */}
            <LocalCommerce currentLang={currentLang} />

            {/* SECTION 8: Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
              <div className="bg-[#FFF8EC] p-10 sm:p-14 rounded-3xl border border-[#E8DCCB] shadow-xl space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                  Your Cultural Journey <span className="text-[#E87516]">Starts Here.</span>
                </h2>
                <p className="text-[#6F625D] text-base max-w-2xl mx-auto font-medium">
                  Experience imperial heritage, Sahyadri fortresses, authentic cuisine, and local craft culture with Atithya AI.
                </p>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="btn-saffron px-8 py-4 text-sm inline-flex items-center space-x-3 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-white" />
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

        {/* LOCAL GUIDES DISCOVERY TAB */}
        {activeTab === 'guides' && (
          <LocalGuidesPage currentLang={currentLang} />
        )}

        {/* SAVED TRIPS & FAVORITES TAB */}
        {activeTab === 'saved' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
            
            {currentUser ? (
              /* LOGGED IN USER SAVED VIEW */
              <>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] mb-2 font-heritage">
                    {t('savedTitle', currentLang)}
                  </h1>
                  <p className="text-[#6F625D] text-sm font-medium">
                    Welcome back, <strong>{currentUser.name}</strong> ({currentUser.email}). Here are your saved places & AI itineraries.
                  </p>
                </div>

                {/* Saved Destinations Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 font-heritage">
                    <Heart className="w-5 h-5 text-[#E87516] fill-current" />
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
                    <div className="bg-[#FFF8EC] p-8 rounded-2xl border border-[#E8DCCB] text-center text-[#6F625D] text-xs font-medium">
                      {t('noBookmarks', currentLang)} Browse <button onClick={() => setActiveTab('explore')} className="text-[#741C35] font-bold underline cursor-pointer">Explore Sites</button> to add your favorites!
                    </div>
                  )}
                </div>

                {/* Saved AI Itineraries */}
                <div className="space-y-4 pt-6 border-t border-[#E8DCCB]">
                  <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 font-heritage">
                    <Bookmark className="w-5 h-5 text-[#E87516]" />
                    <span>{t('savedItineraries', currentLang)} ({savedTrips.length})</span>
                  </h3>

                  {savedTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedTrips.map(trip => (
                        <div key={trip.id} className="bg-[#FFF8EC] p-5 rounded-2xl border border-[#E8DCCB] shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="bg-[#741C35] text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                              {trip.title}
                            </span>
                            <button
                              onClick={() => {
                                const updated = savedTrips.filter(t => t.id !== trip.id);
                                setSavedTrips(updated);
                                if (currentUser?.email) {
                                  localStorage.setItem(`atithya_trips_${currentUser.email}`, JSON.stringify(updated));
                                }
                              }}
                              className="p-1.5 rounded-lg text-[#6F625D] hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-[#332A27] font-medium">
                            {trip.daysCount} Days • Budget: ₹{trip.budget?.toLocaleString() || "10,000"} • Sustainability Score: {trip.sustainabilityScore || 92}/100
                          </p>

                          <div className="pt-2 border-t border-[#E8DCCB] flex justify-between items-center text-xs">
                            <span className="text-[#087F7B] font-bold">Language: {trip.language || currentLang}</span>
                            <button
                              onClick={() => setActiveTab('planner')}
                              className="text-[#E87516] font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                            >
                              <span>View Plan</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#FFF8EC] p-8 rounded-2xl border border-[#E8DCCB] text-center text-[#6F625D] text-xs font-medium">
                      {t('noSavedTrips', currentLang)} Use the <button onClick={() => setActiveTab('planner')} className="text-[#741C35] font-bold underline cursor-pointer">AI Trip Planner</button> to build and save custom itineraries!
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* UNAUTHENTICATED GUEST CALLOUT */
              <div className="bg-[#FFF8EC] p-10 sm:p-14 rounded-3xl border border-[#E8DCCB] text-center space-y-5 max-w-xl mx-auto shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-[#741C35]/10 text-[#741C35] flex items-center justify-center text-3xl mx-auto font-bold border border-[#741C35]/20">
                  <Lock className="w-8 h-8 text-[#741C35]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#741C35] font-heritage">
                  Please Sign In First
                </h2>
                <p className="text-xs sm:text-sm text-[#6F625D] font-medium leading-relaxed">
                  To save your favorite heritage monuments, bookmark custom AI itineraries, and sync travel plans, please sign in to your Atithya AI account.
                </p>
                <button
                  onClick={() => {
                    setAuthNotice('');
                    setIsAuthOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-xl btn-saffron text-xs font-bold shadow-lg inline-flex items-center space-x-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span>Sign In / Create Account</span>
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating AI Chat Assistant */}
      <AiChatAssistant currentLang={currentLang} />

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onAddToTrip={handleAddToTripFromModal}
          currentLang={currentLang}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        authNotice={authNotice}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} currentLang={currentLang} />

    </div>
  );
}
