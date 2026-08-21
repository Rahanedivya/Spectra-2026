import React, { useState } from 'react';
import { X, Star, Clock, IndianRupee, MapPin, Volume2, VolumeX, Sparkles, ShieldCheck, HelpCircle, BookOpen, Heart } from 'lucide-react';

export default function DestinationModal({ destination, onClose, onAskAi, onAddToTrip, isFavorite, onFavorite, currentLang, setCurrentLang }) {
  if (!destination) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStoryLang, setActiveStoryLang] = useState(currentLang || 'English');

  // Story language selector content
  const storyText = activeStoryLang === 'Marathi' && destination.storyMr
    ? destination.storyMr
    : activeStoryLang === 'Hindi' && destination.storyHi
    ? destination.storyHi
    : destination.storyEn;

  // Web Speech API text-to-speech audio experience
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Browser speech synthesis is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel(); // Clear queued utterances
      const utterance = new SpeechSynthesisUtterance(storyText);
      
      // Match voice language
      if (activeStoryLang === 'Marathi') {
        utterance.lang = 'mr-IN';
      } else if (activeStoryLang === 'Hindi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleClose = () => {
    if (isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl my-8 max-h-[90vh] flex flex-col bg-slate-950">
        
        {/* Modal Header & Hero Image */}
        <div className="relative h-72 sm:h-96 w-full flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full">
                  {destination.category}
                </span>
                <div className="flex items-center space-x-1 bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-full font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{destination.rating}</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {destination.name}
              </h2>
              {destination.marathiName && (
                <p className="text-amber-300 text-base font-heritage mt-0.5">
                  {destination.marathiName} • {destination.hindiName}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFavorite(destination)}
                className={`p-3 rounded-xl border font-semibold text-xs transition-all flex items-center space-x-1.5 ${
                  isFavorite 
                    ? 'bg-rose-500 text-white border-rose-400'
                    : 'bg-slate-900/80 text-slate-200 border-slate-700 hover:border-amber-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Visiting Hours</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {destination.visitingHours}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Approx. Entry Cost</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                {destination.approxCost}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-1">Best Time to Visit</span>
              <span className="font-semibold text-amber-300">
                {destination.bestTimeToVisit}
              </span>
            </div>
          </div>

          {/* Cultural Story with Audio Narrator */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
              
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">📖 The Historical Narrative</h3>
              </div>

              {/* Controls: Audio Narrator & Language */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                {/* Audio Narration Button */}
                <button
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                    isPlayingAudio
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Stop Narration' : '🔊 Listen to Story'}</span>
                </button>

                {/* Language Switcher */}
                <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
                  {['English', 'Marathi', 'Hindi'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveStoryLang(lang);
                        if (isPlayingAudio && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          setIsPlayingAudio(false);
                        }
                      }}
                      className={`px-2 py-1 rounded-lg transition-colors ${
                        activeStoryLang === lang
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang === 'English' ? 'EN' : lang === 'Marathi' ? 'मराठी' : 'हिंदी'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-normal">
              {storyText}
            </p>
          </div>

          {/* Cultural Significance & Did You Know */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <h4 className="text-sm font-bold text-amber-300 flex items-center space-x-2 mb-2">
                <span>🏛 Cultural Significance</span>
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {destination.culturalSignificance}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Did You Know?</span>
              </h4>
              <p className="text-amber-200/90 text-xs leading-relaxed font-medium">
                "{destination.didYouKnow}"
              </p>
            </div>

          </div>

          {/* Tourist Safety Guide */}
          {destination.safetyTips && (
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>🛡️ Tourist Safety & Visitor Guidelines</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {destination.safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <button
            onClick={() => {
              handleClose();
              onAskAi(`Tell me more fascinating heritage facts about ${destination.name} in Pune.`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>🤖 Ask AI About {destination.name}</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                handleClose();
                onAddToTrip(destination);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
            >
              <span>Add to My Pune Trip</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
