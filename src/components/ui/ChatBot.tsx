import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! 💖 Ask me anything about my training, merch, or schedule!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      // Calls your Vercel serverless endpoint locally or in production
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-2xl animate-bounce"
        >
          💬
        </button>
      )}

      {/* 2. Chat Window Panel */}
      {isOpen && (
        <div className="bg-slate-900 border border-pink-500/30 w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤸‍♀️</span>
              <div>
                <h3 className="font-bold text-sm">Roxie AI Bot</h3>
                <span className="text-[10px] opacity-75">Online & Flexing</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-pink-200 transition-colors font-bold text-lg px-2"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar bg-slate-950">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isUser
                      ? 'bg-pink-500 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/50'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-pink-400 rounded-2xl rounded-tl-none px-4 py-2 text-xs border border-slate-700/50 flex items-center space-x-1">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-500 hover:bg-pink-600 disabled:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
