import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Globe } from 'lucide-react';
import { askAi } from '../services/api';

export default function AiChatAssistant({ currentLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: currentLang === 'Marathi'
        ? "नमस्कार! मी तुमचा HeritageAI पुणे सहाय्यक आहे. शनिवार वाडा, सिंहगड, किंवा पुणेरी खाद्यान्नाबद्दल मला काहीही विचारा!"
        : currentLang === 'Hindi'
        ? "नमस्ते! मैं आपका HeritageAI पुणे सहायक हूँ। शनिवार वाड़ा, सिंहगढ़ किले या पुणे के भोजन के बारे में कुछ भी पूछें!"
        : "Hello! I am your HeritageAI Pune Assistant. Ask me anything about Pune's Peshwa heritage, Sahyadri forts, or local misal food!"
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sampleQuestions = [
    "Explain history of Shaniwar Wada",
    "Is Sinhagad fort easy with kids?",
    "Best places for Misal Pav in Pune",
    "पुण्यातील सर्वोत्तम भेट देण्याची ठिकाणे"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (textToSend = inputPrompt) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const answer = await askAi(query, null, currentLang);
      setMessages(prev => [...prev, { sender: 'ai', text: answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Apologies, I encountered an issue. HeritageAI Pune recommendation: Visit Shaniwar Wada in the morning and taste Bedekar Misal!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-2xl shadow-amber-500/30 flex items-center space-x-2 animate-bounce"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>✨ Ask HeritageAI</span>
        </button>
      )}

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] glass-card rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col overflow-hidden bg-slate-950 animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1">
                  <span>Ask HeritageAI</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">Pune</span>
                </h4>
                <p className="text-[10px] text-slate-400">Multilingual Companion • {currentLang}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto flex-grow space-y-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Sample Questions Pills */}
          <div className="p-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto text-[10px]">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 hover:text-amber-300 border border-slate-800 whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask in ${currentLang}...`}
              className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/40"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
