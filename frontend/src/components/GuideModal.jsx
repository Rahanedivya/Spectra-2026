import React, { useState } from 'react';
import { X, Star, MapPin, ShieldCheck, Languages, Award, Calendar, Users, MessageSquare, CheckCircle, Sparkles, Send, Phone, Mail, UserCheck, Landmark } from 'lucide-react';
import { createGuideRequest } from '../services/guideService';

export default function GuideModal({ guide, onClose }) {
  if (!guide) return null;

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    date: '',
    groupSize: 2,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createGuideRequest({
        guideId: guide.id,
        guideName: guide.name,
        ...formData
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Guide request error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#332A27]/70 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      
      <div className="relative w-full max-w-2xl bg-[#FFF8EC] rounded-3xl border border-[#E8DCCB] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFF8EC]/80 border border-[#E8DCCB] text-[#741C35] hover:bg-[#741C35] hover:text-white transition-colors cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header — Cultural Badge Header (No Human Face) */}
        <div className="relative h-44 bg-gradient-to-r from-[#741C35] via-[#881337] to-[#E87516] flex items-end p-6 overflow-hidden flex-shrink-0">
          
          <div className="relative z-10 flex items-center space-x-4">
            {/* Guide Badge Avatar */}
            <div className="w-18 h-18 rounded-2xl bg-[#FFF8EC] border-2 border-[#E87516] flex flex-col items-center justify-center shadow-xl flex-shrink-0">
              <UserCheck className="w-8 h-8 text-[#741C35]" />
              <span className="text-[8px] font-extrabold text-[#E87516] font-mono tracking-wider uppercase mt-0.5">GUIDE</span>
            </div>

            <div className="text-white">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-extrabold font-heritage">{guide.name}</h2>
                {guide.verified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 fill-emerald-950" title="Verified Guide" />
                )}
              </div>
              <p className="text-xs text-[#F8D8AD] font-semibold flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#E87516]" />
                <span>Local Cultural Guide • {guide.city}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow text-xs text-[#332A27]">
          
          {!showRequestForm ? (
            /* VIEW PROFILE DISPLAY */
            <div className="space-y-6">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB]">
                  <span className="text-xs text-[#6F625D] font-bold block">Rating</span>
                  <span className="text-base font-extrabold text-[#741C35] flex items-center justify-center space-x-1 mt-0.5">
                    <Star className="w-4 h-4 fill-[#D4A72C] text-[#D4A72C]" />
                    <span>{guide.rating}</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB]">
                  <span className="text-xs text-[#6F625D] font-bold block">Experience</span>
                  <span className="text-base font-extrabold text-[#087F7B] mt-0.5 block">
                    {guide.experienceYears} Years
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF1E4] border border-[#E8DCCB]">
                  <span className="text-xs text-[#6F625D] font-bold block">Rate</span>
                  <span className="text-base font-extrabold text-[#E87516] mt-0.5 block">
                    {guide.pricePerHour ? `₹${guide.pricePerHour}/hr` : "Contact"}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-sm font-bold text-[#741C35] font-heritage mb-1.5">About {guide.name}</h4>
                <p className="text-[#6F625D] leading-relaxed font-medium">
                  {guide.bio || "Local heritage enthusiast dedicated to sharing deep historical stories, culture, and authentic local experiences."}
                </p>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-sm font-bold text-[#741C35] font-heritage mb-1.5 flex items-center space-x-1">
                  <Languages className="w-4 h-4 text-[#087F7B]" />
                  <span>Languages Spoken</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {guide.languages?.map((lang, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-[#FAF1E4] border border-[#E8DCCB] font-bold text-[#741C35]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-sm font-bold text-[#741C35] font-heritage mb-1.5 flex items-center space-x-1">
                  <Award className="w-4 h-4 text-[#E87516]" />
                  <span>Expertise & Specialties</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties?.map((spec, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#E87516]/10 border border-[#E87516]/30 font-bold text-[#E87516]">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Places Covered */}
              {guide.locations?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#741C35] font-heritage mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-[#741C35]" />
                    <span>Popular Spots Covered</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {guide.locations.map((loc, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#FAF1E4] border border-[#E8DCCB] font-semibold text-[#332A27] flex items-center space-x-2">
                        <span className="text-[#E87516]">📍</span>
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-xs">Verified Heritage Tourism Guide</h5>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Credentials & identity verified by HeritageAI Smart Tourism Network.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowRequestForm(true)}
                className="w-full py-4 rounded-xl btn-saffron font-bold text-sm shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Request Guide</span>
              </button>

            </div>
          ) : submitted ? (
            /* SUCCESS CONFIRMATION */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#741C35] font-heritage">Guide Request Sent Successfully!</h3>
              <p className="text-[#6F625D] text-xs max-w-md mx-auto font-medium">
                Your request has been submitted to <strong>{guide.name}</strong>. Initial status is <strong>pending</strong>. The guide will get in touch with you shortly via {guide.contactMethod || 'WhatsApp'}.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl btn-maroon font-bold text-xs cursor-pointer shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* REQUEST GUIDE FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCB]">
                <h3 className="text-base font-bold text-[#741C35] font-heritage">Request Tour with {guide.name}</h3>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="text-xs text-[#E87516] font-bold cursor-pointer underline"
                >
                  ← Back to Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#741C35] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={e => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#741C35] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#741C35] block mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#741C35] block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#741C35] block mb-1">Group Size (Number of People)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={formData.groupSize}
                  onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#741C35] block mb-1">Special Message / Places you'd like to visit</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. We want a morning 3-hour walking tour of Shaniwar Wada & Kasba Peth..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-xs focus:outline-none focus:border-[#741C35]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl btn-saffron font-bold text-xs shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{loading ? "Sending Request..." : "Send Request"}</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
