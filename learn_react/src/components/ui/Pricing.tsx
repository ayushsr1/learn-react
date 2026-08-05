import { useState } from "react";
import { Link } from "react-router-dom";

// Checkmark SVG icon
function CheckIcon({ className = "w-4 h-4 text-teal-400" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ProgramsAndPricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const programs = [
    {
      name: "Starter Fundamentals",
      description: "Ideal for beginners focusing on core strength, flexibility, and foundational tumbling skills.",
      monthlyPrice: 99,
      annualPrice: 79,
      popular: false,
      features: [
        "Access to beginner skill library",
        "Weekly group live Q&A session",
        "Structured mobility & flexibility drills",
        "Community forum access",
      ],
      ctaText: "Start Fundamentals",
      ctaHref: "/signup?plan=starter",
    },
    {
      name: "Pro Athlete Coaching",
      description: "Our core program featuring direct video feedback, personalized drills, and routine analysis.",
      monthlyPrice: 159,
      annualPrice: 139,
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Weekly video critique on 2 routines",
        "Customized conditioning program",
        "Direct chat support with Marina",
        "Monthly 1-on-1 progress review",
      ],
      ctaText: "Join Pro Coaching",
      ctaHref: "/signup?plan=pro",
    },
    {
      name: "Elite Performance",
      description: "1-on-1 intensive mentorship for competitive athletes preparing for trials or high-level meets.",
      monthlyPrice: 299,
      annualPrice: 279,
      popular: false,
      features: [
        "Everything in Pro, plus:",
        "Unlimited video submission feedback",
        "Bi-weekly 30-min live coaching calls",
        "Custom competition routine choreography",
        "Priority 24/7 direct messaging",
      ],
      ctaText: "Apply for Elite",
      ctaHref: "/apply?plan=elite",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="size-[500px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute blur-[160px] pointer-events-none -z-10 bg-teal-600/10" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-4">
          PROGRAMS & PRICING
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Choose the Right <span className="text-teal-500">Training Track</span>
        </h2>
        <p className="text-base text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
          Flexible online coaching plans engineered for gymnasts seeking real progress and elite technique.
        </p>

        {/* Billing Toggle Switch */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-800">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all ${
              !isAnnual
                ? "bg-teal-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
              isAnnual
                ? "bg-teal-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pt-16 items-stretch">
        {programs.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 ${
              plan.popular
                ? "bg-slate-900 border-2 border-teal-500 shadow-xl shadow-teal-950/40 -translate-y-2"
                : "bg-slate-900/60 border border-slate-800/80 hover:border-slate-700"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 text-xs font-bold rounded-full bg-teal-500 text-white shadow-md">
                MOST POPULAR
              </span>
            )}

            {/* Plan Info */}
            <div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-sm text-slate-400 mt-2 min-h-[40px] leading-relaxed">
                {plan.description}
              </p>

              {/* Price Display */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm font-medium text-slate-400">/ month</span>
              </div>
              {isAnnual && (
                <p className="text-xs text-teal-400 mt-1 font-medium">Billed annually</p>
              )}

              {/* Feature List */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3.5">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <div className="mt-0.5 p-0.5 rounded-full bg-teal-500/10 shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <Link
                to={plan.ctaHref}
                className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}