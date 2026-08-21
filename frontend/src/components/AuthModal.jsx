import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, LogIn, ShieldAlert } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, authNotice }) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    if (!isLogin && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const userObj = {
      name: isLogin ? (name.trim() || email.split('@')[0]) : name.trim(),
      email: email.trim()
    };

    setMsg(isLogin ? `Welcome back, ${userObj.name}!` : `Account created successfully! Welcome, ${userObj.name}!`);

    setTimeout(() => {
      onLoginSuccess(userObj);
      setMsg('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#332A27]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      
      <div className="relative w-full max-w-md bg-[#FFF8EC] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6F625D] hover:text-[#741C35] hover:bg-[#FAF1E4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#741C35]/10 border border-[#741C35]/20 text-[#741C35] mx-auto flex items-center justify-center font-bold text-xl mb-3 shadow-sm">
            <Sparkles className="w-7 h-7 text-[#E87516]" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#741C35] font-heritage">
            {isLogin ? 'Welcome Back to Atithya AI' : 'Create Atithya AI Account'}
          </h3>
          <p className="text-xs text-[#6F625D] font-medium mt-1">
            Save your customized itineraries, favorite monuments, and travel notes.
          </p>
        </div>

        {/* Auth Notice (Prompted when user tries to save without logging in) */}
        {authNotice && !msg && !errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#E87516]/10 border border-[#E87516]/30 text-[#E87516] text-xs text-center font-bold flex items-center justify-center space-x-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{authNotice}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs text-center font-bold">
            {errorMsg}
          </div>
        )}

        {/* Success Alert */}
        {msg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs text-center font-bold">
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {!isLogin && (
            <div>
              <label className="block text-[#741C35] font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F625D]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-[#332A27] placeholder-[#6F625D] font-medium focus:outline-none focus:border-[#741C35]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[#741C35] font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F625D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tourist@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-[#332A27] placeholder-[#6F625D] font-medium focus:outline-none focus:border-[#741C35]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#741C35] font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F625D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl text-[#332A27] placeholder-[#6F625D] font-medium focus:outline-none focus:border-[#741C35]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-saffron font-bold text-xs shadow-lg cursor-pointer"
          >
            {isLogin ? 'Sign In' : 'Create Free Account'}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <div className="mt-6 text-center text-xs text-[#6F625D]">
          <span>{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
            }}
            className="text-[#E87516] font-bold hover:underline ml-1 cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

      </div>
    </div>
  );
}
