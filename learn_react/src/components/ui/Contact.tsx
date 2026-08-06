import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "1-on-1 Coaching",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="w-full bg-slate-950 text-slate-100 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto min-h-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-12">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Start Your Training Journey
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Have questions about virtual video analysis, live Zoom sessions, or 1-on-1 athletic coaching? Get in touch with Marina.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Direct Info & Booking Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Direct Contact</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Prefer direct messaging? Reach out via email or schedule a quick discovery session to discuss your training goals.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  </div>
                  <span>marina@coaching.com</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span>Response Time: Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Quick Session Highlight Box */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Remote Gymnastics
              </span>
              <h4 className="text-lg font-bold text-white">
                Looking for Live Video Analysis?
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Get real-time feedback during 100% live Zoom sessions or submit skill clips for frame-by-frame breakdown.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-slate-200">
                  Interested Training Program
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="1-on-1 Coaching">1-on-1 Live Zoom Coaching</option>
                  <option value="Video Analysis">Remote Gymnastics Video Analysis</option>
                  <option value="Mobility & Flexibility">Flexibility & Conditioning Program</option>
                  <option value="General Inquiry">General Question / Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-200">
                  Your Message or Training Goals
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell Marina about your current skill level, experience, or what you'd like to achieve..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <span>Send Message</span>
                <svg
                  className="w-4 h-4 stroke-current fill-none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}