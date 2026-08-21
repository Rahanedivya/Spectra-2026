import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Globe } from 'lucide-react';
import { askAi } from '../services/api';

export default function AiChatAssistant({ currentLang = 'English' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: currentLang === 'Marathi'
        ? "नमस्कार! मी तुमचा HeritageAI सांस्कृतिक पर्यटन सहाय्यक आहे. ऐतिहासिक वास्तू, गड-किल्ले, किंवा खाद्यपदार्थांबद्दल मला काहीही विचारा!"
        : currentLang === 'Hindi'
        ? "नमस्ते! मैं आपका HeritageAI सांस्कृतिक पर्यटन सहायक हूँ। ऐतिहासिक इमारतों, किलों या व्यंजनों के बारे में कुछ भी पूछें!"
        : "Hello! I am your HeritageAI Cultural Tourism Assistant. Ask me anything about Indian heritage sites, Sahyadri forts, historical wadas, or regional cuisine!"
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
    const currentHistory = [...messages];
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const answer = await askAi(query, null, currentLang, currentHistory);
      setMessages(prev => [...prev, { sender: 'ai', text: answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Apologies, I encountered an issue connecting to the AI Assistant. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Trigger Button (Saffron & Gold) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-saffron px-5 py-3.5 shadow-2xl flex items-center space-x-2 animate-bounce cursor-pointer text-xs"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>✨ Ask HeritageAI</span>
        </button>
      )}

      {/* Chat Window Popup (Warm Ivory & Deep Maroon) */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[390px] h-[530px] bg-[#FFF8EC] rounded-3xl border border-[#E8DCCB] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-[#741C35] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF8EC] text-[#741C35] flex items-center justify-center font-bold text-xs shadow-inner">
                <Bot className="w-5 h-5 text-[#741C35]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1 font-heritage">
                  <span>Ask HeritageAI</span>
                  <span className="text-[10px] bg-[#E87516] text-white px-1.5 py-0.5 rounded font-mono uppercase font-extrabold">AI</span>
                </h4>
                <p className="text-[10px] text-[#F8D8AD]">Multilingual Travel Companion • {currentLang}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-[#F8D8AD] hover:text-white hover:bg-[#581427] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto flex-grow space-y-3 text-xs bg-[#FAF1E4]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-[#741C35] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed font-medium ${
                    msg.sender === 'user'
                      ? 'bg-[#E87516] text-white shadow-md rounded-tr-none'
                      : 'bg-[#FFF8EC] border border-[#E8DCCB] text-[#332A27] shadow-sm rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-[#087F7B] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-[#741C35] text-xs italic font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E87516] animate-spin" />
                <span>HeritageAI is thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Sample Questions Pills */}
          <div className="p-2 bg-[#FFF8EC] border-t border-[#E8DCCB] flex items-center space-x-1.5 overflow-x-auto text-[10px]">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-[#FAF1E4] text-[#741C35] hover:bg-[#E87516] hover:text-white border border-[#E8DCCB] whitespace-nowrap transition-colors cursor-pointer font-bold"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#FFF8EC] border-t border-[#E8DCCB] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask HeritageAI in ${currentLang}...`}
              className="flex-grow bg-[#FAF1E4] border border-[#E8DCCB] rounded-xl px-3 py-2 text-[#332A27] placeholder-[#6F625D] text-xs font-medium focus:outline-none focus:border-[#E87516]"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="btn-saffron p-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
