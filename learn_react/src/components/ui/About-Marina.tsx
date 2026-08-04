export default function About_Marina() {
  const features = [
    {
      title: "Elite Technique & Form",
      description: "Master foundational mechanics, balance, and precision through structured step-by-step guidance.",
      icon: "⚡",
    },
    {
      title: "Personalized Coaching",
      description: "Tailored routines and video breakdowns designed for your specific skill level and goals.",
      icon: "🎯",
    },
    {
      title: "Flexibility & Mobility",
      description: "Targeted conditioning programs designed to improve mobility while preventing common injuries.",
      icon: "🧘‍♀️",
    },
    {
      title: "Progressive Curriculum",
      description: "From basic tumbling to advanced routines—a structured roadmap for consistent progression.",
      icon: "📈",
    },
    {
      title: "Core & Strength Building",
      description: "Gymnastics-specific functional conditioning engineered to build body control and power.",
      icon: "💪",
    },
    {
      title: "Global Online Community",
      description: "Train anywhere with direct feedback, accountability, and a supportive network of athletes.",
      icon: "🌐",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Ambient Radial Blur Effect */}
      <div className="size-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute blur-[160px] pointer-events-none -z-10 bg-teal-400-600/15" />

      {/* Header Content */}
      <div className="max-w-3xl mx-auto text-center px-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-4">
          ABOUT MARINA
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Empowering Athletes Through <span className="text-teal-400">Precision Coaching</span>
        </h1>
        <p className="text-base text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
          Dedicated to helping gymnasts of all levels achieve peak performance, build core strength, and master technique safely.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pt-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 group"
          >
            <div className="size-12 flex items-center justify-center text-xl bg-teal-500/10 border border-teal-500/20 rounded-xl group-hover:bg-teal-500/20 transition-colors">
              {item.icon}
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-lg font-semibold text-slate-100 group-hover:text-teal-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}