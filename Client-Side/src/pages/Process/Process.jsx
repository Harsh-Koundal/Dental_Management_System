import { Section, Container, SectionHead } from '@/UI/Section';
import { PROCESS, B } from '@/data/constants';
import { useInView } from '@/libs/hooks';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

const Process = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <Section id="process" className="bg-white">
                <Container>
                    <SectionHead
                    tag="Patient Journey"
                    title="Your Path to a Perfect Smile"
                    sub="A clear, step-by-step clinical process — from your first visit to your final smile reveal."
                    />
                    <div className="relative mt-20">
                    {/* Connecting line (desktop) */}
                    <div
                        className="absolute hidden lg:block"
                        style={{
                        top: 40, left:"8%", right:"8%", height:2,
                        background: `linear-gradient(90deg,${B.blue},${B.cyan})`,
                        opacity: 0.15,
                        }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 relative">
                        {PROCESS.map((p, i) => {
                        const [ref, vis] = useInView(0.1);
                        return (
                            <div
                            key={i}
                            ref={ref}
                            className="text-center group"
                            style={{
                                opacity: vis ? 1 : 0,
                                transform: vis ? "none" : "translateY(30px)",
                                transition: `all 0.6s ${i * 0.12}s`,
                            }}
                            >
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                                style={{
                                background: `linear-gradient(135deg,${B.blue},${B.cyan})`,
                                boxShadow: "0 12px 32px rgba(36,183,210,0.35)",
                                }}
                            >
                                <span className="text-white font-black text-3xl">{p.step}</span>
                            </div>
                            <h4 className="font-black text-lg mb-4 tracking-tight uppercase" style={{ color: B.text }}>{p.title}</h4>
                            <p className="text-sm leading-loose font-medium opacity-70" style={{ color: B.muted }}>{p.desc}</p>
                            </div>
                        );
                        })}
                    </div>
                    </div>
                </Container>
            </Section>

            <Section className="bg-[#f8fbfe]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1629909613654-28a3a7c4d459?w=800&h=600&fit=crop" className="w-full h-full object-cover" alt="Orthodontic checkup" />
                           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                           <div className="absolute bottom-10 left-10">
                                <div className="text-white font-black text-3xl">Professional Ethics</div>
                           </div>
                        </div>
                        <div>
                            <span className="inline-block px-5 py-2 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-6">Expert Monitoring</span>
                            <h2 className="text-4xl font-black mb-8 leading-tight tracking-tight uppercase">Monthly Clinical <span className="text-brand">Evaluation</span></h2>
                            <p className="text-lg leading-loose font-medium text-slate-500 mb-10 opacity-80">Every patient at Panda Smile receives customized care through systematic monitoring sessions. We track progress with high-resolution clinical photography and precision adjustments to ensure the finish is perfect.</p>
                            <div className="space-y-6">
                                {["Precision Bracket Positioning", "Digital Bite Analysis", "Oral Hygiene Guidance"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-700 font-black text-sm uppercase tracking-widest">
                                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500"><CheckCircle size={18} /></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section className="bg-brand text-white text-center py-24">
                <Container>
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <Sparkles size={48} className="mb-10 text-cyan-300 opacity-80" />
                        <h2 className="text-4xl font-black mb-10 tracking-tight leading-tight uppercase">Science-Driven Smile Correction</h2>
                        <p className="text-lg font-medium opacity-80 leading-relaxed max-w-xl mx-auto mb-12 italic">Orthodontic treatment isn't just about moving teeth; it's about engineering the perfect facial balance and confidence for a lifetime.</p>
                        <a href="/appointment" className="bg-white text-brand px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:translate-y-[-4px] transition-all">Start Your Journey Now <ArrowRight className="inline-block ml-2" size={18} /></a>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Process;
