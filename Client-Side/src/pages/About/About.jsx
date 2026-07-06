import HomeAbout from '@/components/landingpage/DrBio.jsx';
import { Section, Container, SectionHead } from '@/UI/Section';
import { Award, Shield, Users, Clock, Sparkles } from 'lucide-react';
import { B } from '@/data/constants';

const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#fdfbf7]">
            <HomeAbout />
            
            <Section className="bg-[#f8fbfe]">
                <Container>
                    <SectionHead 
                        tag="Philosophy"
                        title="Specialist Orthodontic Care"
                        sub="Correcting smiles goes beyond aesthetics—it is about clinical health and long-term confidence."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Award />, title: "Specialist (MDS)", desc: "Exclusively provided by qualified orthodontists, not general practitioners." },
                            { icon: <Shield />, title: "Digital Precision", desc: "Using advanced diagnostic tools for accurate bite and alignment." },
                            { icon: <Users />, title: "Personalized", desc: "Every patient receives a unique treatment roadmap." },
                            { icon: <Clock />, title: "Transparent", desc: "Clear timelines and pricing with no hidden surprises." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-brand/5 border border-slate-100 hover:border-brand/30 transition-all duration-300">
                                <div className="p-4 rounded-2xl bg-brand/10 text-brand w-fit mb-8">{item.icon}</div>
                                <h4 className="font-black text-xl mb-4 tracking-tight" style={{ color: B.text }}>{item.title}</h4>
                                <p className="text-sm font-medium leading-loose" style={{ color: B.muted }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="bg-brand text-white overflow-hidden relative">
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center gap-3 mb-10"><Sparkles size={32} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tight leading-tight">Patient Safety & Clinical Integrity is our First Priority.</h2>
                        <p className="text-lg md:text-xl font-medium opacity-80 leading-loose mb-12">At Panda Smile, we follow the highest standards of sterilization and medical safety protocols recognized globally by dental council standards.</p>
                        <div className="h-px w-32 bg-white/30 mx-auto" />
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default About;
