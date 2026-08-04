import { Link } from "react-router-dom"
import {BrandLogo} from "@/components/ui/BrandLogo"
import { useState } from "react";

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface NavbarProps {
    ctaButtonText?: string;
    ctaButtonHref?: string;
    navLinks?: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({

    ctaButtonText = "Book a Trial",
    ctaButtonHref = "#",
    navLinks = [
        { label: "About Marina", href: "/about" },
        { label: "Program", href: "/program" },
        { label: "Schedule & Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" }
    ]}) => {    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

        return (

    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* 1. BRAND LOGO (Place it right here!) */}
            <div className="flex items-center">
                <BrandLogo />
            </div>

                <nav className="hidden md:flex ml-auto gap-2">
                    <div className="flex gap-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur">
                    {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.href}
                                className={`px-3 py-2 text-md font-medium hover:text-teal-500 font-sans transition-colors ${link.isActive ? 'text-white/90' : 'text-white/80'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to={ctaButtonHref}
                            className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                        >
                            {ctaButtonText}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </Link>
                    </div>
                </nav>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                        <path d="M4 5h16" />
                        <path d="M4 12h16" />
                        <path d="M4 19h16" />
                    </svg>
                </button>
        </div>
    </header>
    )};


    export default Navbar;