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
          className="px-5 py-3.5 rounded-full bg-gradient-to-r from-[#701a28] via-[#881337] to-[#ea580c] text-white font-bold text-xs hover:brightness-110 transition-all shadow-2xl shadow-[#701a28]/40 flex items-center space-x-2 animate-bounce cursor-pointer border border-[#881337]"
        >
          <Sparkles className="w-4 h-4 fill-white text-white" />
          <span>✨ Ask HeritageAI</span>
        </button>
      )}

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] rounded-3xl border border-[#701a28] shadow-2xl flex flex-col overflow-hidden bg-[#181112] text-[#faf6f0] animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-[#231417] border-b border-[#3a1d23] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#701a28] text-white flex items-center justify-center font-bold text-xs">
                <Bot className="w-5 h-5 text-[#ea580c]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1 font-heritage">
                  <span>Ask HeritageAI</span>
                  <span className="text-[10px] bg-[#ea580c]/20 text-[#ea580c] px-1.5 py-0.5 rounded font-mono">Pune</span>
                </h4>
                <p className="text-[10px] text-[#d6c7b2]">Multilingual Companion • {currentLang}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-[#d6c7b2] hover:text-white hover:bg-[#3a1d23] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto flex-grow space-y-3 text-xs bg-[#181112]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-[#701a28] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#ea580c] text-white font-semibold rounded-tr-none'
                      : 'bg-[#231417] border border-[#3a1d23] text-[#faf6f0] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-[#3a1d23] text-[#d6c7b2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-[#d6c7b2] text-xs italic">
                <Sparkles className="w-3.5 h-3.5 text-[#ea580c] animate-spin" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Sample Questions Pills */}
          <div className="p-2 bg-[#231417] border-t border-[#3a1d23] flex items-center space-x-1.5 overflow-x-auto text-[10px]">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-[#181112] text-[#d6c7b2] hover:text-[#ea580c] border border-[#3a1d23] whitespace-nowrap cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#231417] border-t border-[#3a1d23] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask in ${currentLang}...`}
              className="flex-grow bg-[#181112] border border-[#3a1d23] rounded-xl px-3 py-2 text-[#faf6f0] placeholder-[#a89582] text-xs focus:outline-none focus:border-[#ea580c]"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2 rounded-xl bg-[#701a28] hover:bg-[#881337] text-white font-bold disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#ea580c]" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
