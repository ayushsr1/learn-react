import { Link, useLocation, useNavigate } from "react-router-dom"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Menu, X } from "lucide-react" // Import Menu and Close icons

interface NavLink {
    label: string
    href: string
    isActive?: boolean
}

interface NavbarProps {
    ctaButtonText?: string
    ctaButtonHref?: string
    navLinks?: NavLink[]
}

const Navbar: React.FC<NavbarProps> = ({
    ctaButtonText = "Book a Trial",
    ctaButtonHref = "/contact",
    navLinks = [
        { label: "About Marina", href: "/about" },
        { label: "Program", href: "/program" },
        { label: "Schedule & Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" }
    ]
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const navbarRef = useRef<HTMLHeadingElement>(null)

    const isActiveLink = (href: string) => {
        if (href === "/") return location.pathname === "/"
        return location.pathname.startsWith(href)
    }

    const handleCtaClick = () => {
        setMobileMenuOpen(false)
        navigate(ctaButtonHref)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navbarRef.current && 
                !navbarRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [mobileMenuOpen])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                    <BrandLogo />
                </Link>

                <nav className="ml-auto hidden gap-2 md:flex">
                    <div className="flex gap-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur">
                        {navLinks.map((link, index) => (
                            <Link
                                key={`${link.label}-${index}`}
                                to={link.href}
                                className={`px-3 py-2 text-md font-medium font-sans transition-colors hover:text-teal-500 ${
                                    isActiveLink(link.href) ? "text-white" : "text-white/80"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Button
                            variant="default"
                            size="sm"
                            className="ml-1 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-teal-500"
                            onClick={handleCtaClick}
                        >
                            {ctaButtonText}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </Button>
                    </div>
                </nav>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle menu"
                >
                    {/* Swaps icon based on state */}
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5 text-teal-400" />
                        ) : (
                            <Menu className="h-5 w-5 text-teal-400" />
                        )}                
                </Button>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={`mobile-${link.label}-${index}`}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                                    isActiveLink(link.href) ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Button
                            variant="default"
                            size="sm"
                            className="mt-1 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90"
                            onClick={handleCtaClick}
                        >
                            {ctaButtonText}
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar