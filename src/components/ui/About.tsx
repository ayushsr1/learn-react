 import { useState } from 'react';
import { cn } from '../../lib/utils';
import { FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

export interface SoloProfile {
  name: string;
  role: string;
  image: string;
  bio: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  social?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

const DEFAULT_PROFILE: SoloProfile = {
  name: 'Marina Mostovskaia',
  role: 'Head Coach & Founder',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
  bio: 'I am an active competitive gymnast. I know exactly how hard you need to work on the carpet for results, and I also know how to protect yourself from injuries. My mission is to give you a strong sports base, flexibility, and technique cleanup safely and with pure energy',
  stats: [
    { label: 'Years of Competitive Excellence', value: '8+' }
  ],
  highlights: [
    'Active Competitive Rhythmic Gymnast with 8+ years of intensive training',
    'Specialist in Safe Stretching and Anatomical Conditioning',
    'Expert in Technique Correction and Joint Safety',
  ],
  social: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    website: 'https://marinagym.vercel.app/',
  },
};

interface AboutProps {
  profile?: SoloProfile;
}

export default function About({ profile = DEFAULT_PROFILE }: AboutProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-slate-950 py-20 text-slate-100 font-sans border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Top Header Tagline */}
        <div className="flex items-center gap-3 mb-12">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
            MEET THE FOUNDER
          </span>
          <div className="h-[1px] flex-1 bg-slate-800/80" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column: Large Hero Image + Floating Badges (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className="relative w-full max-w-md cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />

              {/* Main Card */}
              <div
                className={cn(
                  'relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-800 transition-all duration-500',
                  isHovered ? 'ring-2 ring-teal-400/80 border-teal-400/50 shadow-2xl shadow-teal-500/10' : ''
                )}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: isHovered ? 'grayscale(0) brightness(1)' : 'grayscale(0.6) brightness(0.85)',
                  }}
                />
              </div>

              {/* Floating Stat Card Badge */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
                  ★
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Leadership</p>
                  <p className="text-sm font-bold text-slate-100">100% Commitment</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Rich Profile Breakdown (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 pt-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-2">
                {profile.role}
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-100 mb-6">
                {profile.name}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                {profile.bio}
              </p>

              {/* Key Quick Stats Bar */}
              <div className="p-4 rounded-xl bg-slate-900/60 border max-w-xs border-slate-800/80 mb-8">
                {profile.stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left sm:pl-2">
                    <p className="text-2xl sm:text-3xl font-bold text-teal-400 tracking-tight">{stat.value}</p>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Highlights & Credentials */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Key Credentials & Specialties
                </h3>
                {profile.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                    <span className="h-5 w-5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-Width Social Link Buttons */}
            {profile.social && (
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Connect Directly
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {profile.social.instagram && (
                    <a
                      href={profile.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:bg-slate-800/80 transition-all duration-200 text-sm font-semibold"
                    >
                      <FaInstagram className="w-4 h-4 text-teal-400" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {profile.social.linkedin && (
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:bg-slate-800/80 transition-all duration-200 text-sm font-semibold"
                    >
                      <FaLinkedin className="w-4 h-4 text-teal-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.social.website && (
                    <a
                      href={profile.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:bg-slate-800/80 transition-all duration-200 text-sm font-semibold"
                    >
                      <FaGlobe className="w-4 h-4 text-teal-400" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}