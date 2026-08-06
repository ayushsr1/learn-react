import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! 💖 Ask me anything about my training, experience, or schedule!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { text: queryText, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { text: "📴 Wait, my brain glitched. Try again?", isUser: false }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "🚨 Couldn't connect to the server!", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <>
      {/* 1. Backdrop Overlay for Mobile Screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs sm:hidden z-40 animate-fade-in"
        />
      )}

      {/* 2. Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-3.5 sm:p-4 shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-2xl group"
        >
          <span className="relative">💬</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </button>
      )}

      {/* 3. Mobile-First Responsive Chat Modal */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 top-auto sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-96 h-[80vh] max-h-[540px] sm:h-[500px] bg-slate-900 border border-pink-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-3.5 sm:p-4 flex justify-between items-center shadow-md shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg backdrop-blur-sm">
                🤸‍♀️
              </div>
              <div>
                <h3 className="font-bold text-sm leading-snug">Roxie AI Bot</h3>
                <span className="text-[10px] text-pink-100/80 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online & Ready
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 text-lg font-bold"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-slate-950/95 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.isUser
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Pills (when chat is new) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {[
                  "Years of experience? 🤸‍♀️",
                  "Who is Marina? 👑",
                  "Training & Specialties? ⚡"
                ].map((pill, i) => (
                  <button
                    key={i}
                    onClick={() => sendQuery(pill)}
                    className="text-[11px] sm:text-xs bg-slate-900 hover:bg-pink-500/20 hover:border-pink-500/50 border border-slate-800 text-pink-300 rounded-full px-3 py-1.5 transition-all text-left"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/90 text-pink-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs border border-slate-700/60 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></span>
                  <span className="text-[11px] text-slate-300 ml-1 font-medium">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 sm:p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 shrink-0 w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 min-w-0 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

