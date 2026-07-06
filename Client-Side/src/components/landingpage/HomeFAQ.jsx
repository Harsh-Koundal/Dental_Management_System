import { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { Section, Container, SectionHead } from '@/UI/Section';
import { FAQS, B } from '@/data/constants';
import { useInView } from '@/libs/hooks';

function HomeFAQ() {
  const [open, setOpen] = useState(null);
  return (
    <Section id="faq" style={{ background: B.offWhite }} className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${B.light} 0%, transparent 70%)`, opacity: 0.6 }} />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(243,113,33,0.05) 0%, transparent 70%)` }} />

      <Container>
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 relative z-10">
          <span
            className="inline-block rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-5"
            style={{ background: B.light, color: B.cyan }}
          >
            Common Questions
          </span>
          <h2
            className="font-black tracking-tight mb-5"
            style={{ fontSize: "clamp(32px,5vw,52px)", color: B.text }}
          >
            Everything You Need <br />
            <span style={{ color: B.blue }}>To Know</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Expert answers about our orthodontic process, treatment timelines, costs, and aftercare — by Dr. Panda's clinical team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
          {/* Left: Section Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <span
              className="inline-block rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] mb-6"
              style={{ background: B.light, color: B.cyan }}
            >
              FAQ
            </span>
            <h2
              className="font-black mb-8 leading-[1.1] tracking-tight"
              style={{ fontSize:"clamp(34px,4.5vw,44px)", color: B.text }}
            >
              Expert Answers to<br />Common <span className="text-brand">Questions</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10 opacity-80" style={{ color: B.muted }}>
              Everything you need to know about the orthodontic process, costs, and care by Dr. Panda’s clinical team.
            </p>

            <div className="p-8 rounded-[2.5rem] bg-brand text-white shadow-2xl shadow-brand/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-black text-xl tracking-tight">Still have questions?</h4>
                  <p className="text-xs text-white/70 font-medium">Free WhatsApp Consultation</p>
                </div>
              </div>
              <a
                href="https://wa.me/919337684288"
                className="block w-full text-center bg-white text-brand font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
              >
                Talk to a Specialist
              </a>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((f, i) => {
              const [ref, vis] = useInView(0.1);
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  ref={ref}
                  className="rounded-[2.25rem] overflow-hidden"
                  style={{
                    background: B.white,
                    border: `1px solid ${isOpen ? B.cyan : B.border}`,
                    opacity: vis ? 1 : 0,
                    transform: vis ? "none" : "translateY(24px)",
                    transition: `all 0.5s ${i * 0.08}s`,
                    boxShadow: isOpen ? "0 16px 40px rgba(36,183,210,0.12)" : "0 4px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-10 py-8 bg-transparent border-none cursor-pointer flex justify-between items-center gap-6 group hover:bg-slate-50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle size={18} className={`shrink-0 transition-colors duration-300 ${isOpen ? "text-brand" : "text-slate-300"}`} />
                      <span className={`font-black text-lg tracking-tight transition-colors duration-300 ${isOpen ? "text-brand" : "text-slate-700"}`}>{f.q}</span>
                    </div>
                    <div className={`p-2 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "rotate-180 bg-brand text-white shadow-lg" : "bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand"}`}>
                      <ChevronDown
                        size={18}
                        style={{ flexShrink:0 }}
                      />
                    </div>
                  </button>
                  <div
                    className={`px-10 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px] py-8 border-t border-slate-50" : "max-h-0"}`}
                  >
                    <p className="text-base leading-loose font-medium opacity-80" style={{ color: B.muted }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HomeFAQ;
