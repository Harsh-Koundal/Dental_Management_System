import HomeGallary from '@/components/landingpage/HomeGallary';
import { Section, Container, SectionHead } from '@/UI/Section';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GALLERY } from '@/data/constants';

const Gallary = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <HomeGallary />
            <Section className="bg-[#f8fbfe]">
                <Container>
                    <SectionHead 
                        tag="Clinical Cases"
                        title="Before & After"
                        sub="Correct alignment transforms facial aesthetics and confidence."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {GALLERY.slice(0, 4).map((g, i) => (
                            <div key={i} className="group rounded-[3rem] bg-white overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500">
                                <div className="md:w-1/2 aspect-square relative">
                                    <img src={g.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={g.title} />
                                    <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest">Before</div>
                                </div>
                                <div className="md:w-1/2 aspect-square relative">
                                    <img src={g.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={g.title} />
                                    <div className="absolute top-4 right-4 bg-brand text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">After</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
            
            <Section className="bg-brand text-white py-32 overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                <Container>
                   <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
                       <Sparkles size={48} className="mb-10 text-cyan-300 opacity-80" />
                       <h2 className="text-4xl font-black mb-8 leading-tight tracking-tight uppercase">Ready for your Transformation?</h2>
                       <p className="text-lg font-medium opacity-80 leading-relaxed mb-12">Take the first step towards your dream smile today with professional orthodontic care by Dr. Panda.</p>
                       <a href="/appointment" className="bg-white text-brand px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:translate-y-[-4px] transition-all">Start My Journey <ArrowRight className="inline-block ml-2" size={18} /></a>
                   </div>
                </Container>
            </Section>
        </div>
    );
};

export default Gallary;
