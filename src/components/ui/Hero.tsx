import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic_2 from "@/assets/pic_2.jpg"; 
import TrialModal from './TrialModal';

interface Partner {
    logoUrl: string;
    href: string;
}

interface Hero {
    logoUrl?: string | Function;
    backgroundImageUrl?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    disciplinesTitle?: string;
    partners?: Partner[];
}

const Hero: React.FC<Hero> = ({
    backgroundImageUrl = pic_2,
    badgeLabel = "Limited",
    badgeText = "Only 9 Spots Available for September Group",
    title = "Online Rhythmic Gymnastics with Marina",
    description = "Give your daughter a strong sports base, flexibility, and perfect posture—without high offline costs or travel time. Small online group for girls aged 7–12.",
    primaryButtonText = "Book your session Now",
    primaryButtonHref = "/pricing",
    secondaryButtonText = "View Program",  
    secondaryButtonHref = "/program",
    disciplinesTitle = "Training includes 5 core rhythmic gymnastics disciplines",
    partners = [
        { name: "Jump Rope", icon: "🩰"},
        { name: "Hoop", icon: "⭕" },
        { name: "Ball", icon: "⚽"},
        { name: "Clubs", icon: "🪄" },
        { name: "Ribbon", icon: "🎗️" }
    ]
}) => {
    const [isTrialOpen, setIsTrialOpen] = useState(false);

    return (
        <section className="w-full isolate min-h-screen overflow-hidden relative">
            <TrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />
            <img className="absolute -z-10 h-full w-full object-cover" src={backgroundImageUrl} alt="sa" />

            <div className="z-10 relative">
                <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-md font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2 font-sans">
                                {badgeLabel}
                            </span>
                            <span className="text-md font-medium text-white/90 font-sans">
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                            {title}
                        </h1>

                        <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white max-w-2xl mt-6 mx-auto">
                            {description}
                        </p>

                        <div className="mt-6 flex justify-center animate-fade-slide-in-3">
                            <button
                                onClick={() => setIsTrialOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] cursor-pointer"
                            >
                                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-300">Trial</span>
                                <span>Start for $20</span>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <Link
                                to={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors"
                            >
                                {primaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
                            >
                                {secondaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto mt-20 max-w-5xl">
                        <p className="animate-fade-slide-in-1 text-md text-white/70 text-center">
                            {disciplinesTitle}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2 text-white/70 mt-6 items-center justify-items-center gap-4">
                            {partners.map((partner, index) => {
                                const isLastItem = index === partners.length - 1

                                return (
                                    <div 
                                        key={partner.id || partner.name || index} 
                                        className={`flex items-center gap-2 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl ${
                                            isLastItem ? 'col-span-2 justify-center sm:col-span-1' : ''
                                        } ${!isLastItem ? 'border-r border-slate-200 pr-4' : ''}`}
                                    >
                                        {partner.icon && <span className="shrink-0 flex items-center text-slate-500">{partner.icon}</span>}
                                        <span className="font-medium text-sm leading-none">{partner.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;