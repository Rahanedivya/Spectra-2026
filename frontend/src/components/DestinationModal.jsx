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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#181112]/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-[#701a28] shadow-2xl my-8 max-h-[90vh] flex flex-col bg-white text-[#2b181b]">
        
        {/* Modal Header & Hero Image */}
        <div className="relative h-72 sm:h-96 w-full flex-shrink-0 bg-[#231417]">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181112] via-[#181112]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#181112]/70 border border-white/20 text-[#faf6f0] hover:text-white hover:bg-[#701a28] transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#701a28] text-white font-bold text-xs px-3 py-1 rounded-full border border-[#881337]">
                  {destination.category}
                </span>
                <div className="flex items-center space-x-1 bg-[#181112]/90 border border-[#ea580c]/30 text-[#ea580c] text-xs px-2.5 py-1 rounded-full font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#ea580c] text-[#ea580c]" />
                  <span>{destination.rating}</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#faf6f0] font-heritage">
                {destination.name}
              </h2>
              {destination.marathiName && (
                <p className="text-[#ea580c] text-base font-heritage mt-0.5">
                  {destination.marathiName} • {destination.hindiName}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFavorite(destination)}
                className={`p-3 rounded-xl border font-semibold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isFavorite 
                    ? 'bg-[#ea580c] text-white border-[#ea580c]'
                    : 'bg-[#181112]/80 text-[#faf6f0] border-white/20 hover:border-[#ea580c]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-white">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#faf6f0] border border-[#e2d7c7] text-xs">
            <div>
              <span className="text-[#5c4a4e] block mb-1 font-medium">Visiting Hours</span>
              <span className="font-bold text-[#701a28] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
                {destination.visitingHours}
              </span>
            </div>
            <div>
              <span className="text-[#5c4a4e] block mb-1 font-medium">Approx. Entry Cost</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                {destination.approxCost}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#5c4a4e] block mb-1 font-medium">Best Time to Visit</span>
              <span className="font-bold text-[#ea580c]">
                {destination.bestTimeToVisit}
              </span>
            </div>
          </div>

          {/* Cultural Story with Audio Narrator */}
          <div className="p-5 rounded-2xl border border-[#e2d7c7] bg-[#faf6f0]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-[#e2d7c7] pb-3">
              
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#ea580c]" />
                <h3 className="text-lg font-bold text-[#701a28] font-heritage">📖 The Historical Narrative</h3>
              </div>

              {/* Controls: Audio Narrator & Language */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                {/* Audio Narration Button */}
                <button
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-[#701a28] text-white border border-[#881337] animate-pulse'
                      : 'bg-[#701a28]/10 text-[#701a28] border border-[#701a28]/30 hover:bg-[#701a28]/20'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ea580c]" />}
                  <span>{isPlayingAudio ? 'Stop Narration' : '🔊 Listen to Story'}</span>
                </button>

                {/* Language Switcher */}
                <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-[#e2d7c7] text-[11px] font-semibold">
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
                      className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        activeStoryLang === lang
                          ? 'bg-[#701a28] text-white font-bold'
                          : 'text-[#5c4a4e] hover:text-[#701a28]'
                      }`}
                    >
                      {lang === 'English' ? 'EN' : lang === 'Marathi' ? 'मराठी' : 'हिंदी'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <p className="text-[#3c2b2e] text-sm leading-relaxed whitespace-pre-line font-medium">
              {storyText}
            </p>
          </div>

          {/* Cultural Significance & Did You Know */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl border border-[#e2d7c7] bg-white shadow-sm">
              <h4 className="text-sm font-bold text-[#701a28] flex items-center space-x-2 mb-2 font-heritage">
                <span>🏛 Cultural Significance</span>
              </h4>
              <p className="text-[#3c2b2e] text-xs leading-relaxed font-medium">
                {destination.culturalSignificance}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[#e2d7c7] bg-[#faf6f0]">
              <h4 className="text-sm font-bold text-[#ea580c] flex items-center space-x-2 mb-2 font-heritage">
                <HelpCircle className="w-4 h-4 text-[#ea580c]" />
                <span>Did You Know?</span>
              </h4>
              <p className="text-[#701a28] text-xs leading-relaxed font-medium">
                "{destination.didYouKnow}"
              </p>
            </div>

          </div>

          {/* Tourist Safety Guide */}
          {destination.safetyTips && (
            <div className="p-5 rounded-2xl border border-emerald-200 bg-[#f0f9f4]">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center space-x-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>🛡️ Tourist Safety & Visitor Guidelines</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950 font-medium">
                {destination.safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#faf6f0] border-t border-[#e2d7c7] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <button
            onClick={() => {
              handleClose();
              onAskAi(`Tell me more fascinating heritage facts about ${destination.name} in Pune.`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#e2d7c7] text-[#701a28] font-bold text-xs border border-[#e2d7c7] flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#ea580c]" />
            <span>🤖 Ask AI About {destination.name}</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                handleClose();
                onAddToTrip(destination);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#701a28] to-[#ea580c] text-white font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Add to My Pune Trip</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
