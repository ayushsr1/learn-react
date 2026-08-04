import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const marinaFaqs = [
  {
    question: "Why switch from traditional local gym coaching to Marina’s online platform?",
    answer:
      "Traditional coaching often relies on outdated, one-size-fits-all routines where individual form errors get overlooked in crowded groups. We streamline your progress by focusing strictly on precision video breakdowns, targeted mobility drills, and direct 1-on-1 feedback tailored to your exact biomechanics.",
  },
  {
    question: "How does remote gymnastics video analysis actually work?",
    answer:
      "Simply record your skill or routine from your smartphone and upload it through your athlete dashboard. Within 24–48 hours, Marina provides frame-by-frame visual notes, voiceover corrections, and customized drills to fix technique flaws before they become bad habits.",
  },
  {
    question: "Is online coaching effective for beginners, or only advanced gymnasts?",
    answer:
      "It is built for all levels! Beginners benefit from building a safe, injury-free foundation without the pressure of an intimidating gym environment, while advanced athletes get high-precision technical critiques needed to clean up competition execution scores.",
  },
  {
    question: "What equipment or space do I need at home to get started?",
    answer:
      "Most core conditioning, flexibility, and basic tumbling drills require nothing more than a clear floor space and a yoga or gymnastics mat. For advanced skill feedback, you can submit footage recorded at your local open gym or training facility.",
  },
  {
    question: "Can I pause or cancel my coaching subscription at any time?",
    answer:
      "Yes, completely flexible. You can manage your subscription, pause, or cancel at any time directly from your account settings with zero hassle or hidden cancellation fees.",
  },
];

function FAQ() {
  return (
    <section className="relative w-full py-16 lg:py-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="size-[450px] top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full absolute blur-[160px] pointer-events-none -z-10 bg-teal-600/10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div>
                <Badge
                  variant="outline"
                  className="px-3.5 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20 transition-colors" render={undefined}                >
                  FAQ
                </Badge>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Streamlined <span className="text-teal-500">Remote Training</span>
              </h2>

              <p className="text-base text-slate-400 leading-relaxed pt-2">
                Mastering gymnastics is already tough—don't make it harder with rigid schedules and generic advice. Our mission is to streamline remote coaching, making elite technique analysis faster, clearer, and more accessible than ever.
              </p>
            </div>

            {/* CTA Box */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Have a specific question about your training?</h3>
              <Button
                variant="outline"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white transition-all"
              >
                Reach Out to Support
                <PhoneCall className="w-4 h-4 text-teal-400" />
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {marinaFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-1 transition-colors data-[state=open]:border-teal-500/40 data-[state=open]:bg-slate-900/80"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-200 hover:text-teal-400 transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}

export { FAQ };