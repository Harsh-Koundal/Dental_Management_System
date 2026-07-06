import React from 'react';
import HeroSection from './HeroSection';
import HomeAbout from './DrBio';
import HomeOurTreatments from './OurTreatments';
import HomeProcess from './HomeProcess';
import HomeGallary from './HomeGallary';
import HomeFAQ from './HomeFAQ';
import HomeContact from './HomeContact';
import FindUs from './FindUs';  
import { B, STATS } from '@/data/constants';
import { Container } from '@/UI/Section';
import { Smile, Users, Award, HeartPulse } from 'lucide-react';
import ComparisonSection from './Compairson';

const StatsBar = () => {
    const Icons = [<Smile key="smile" />, <Users key="users" />, <Award key="award" />, <HeartPulse key="heart" />];
    return (
        <div className="py-12 border-y border-brand/10" style={{ background: B.navy }}>
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
                    {STATS.map(({ value, label }, i) => (
                        <div key={i} className="group hover:translate-y-[-4px] transition-transform duration-300">
                            <div className="mb-4 flex justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(36,183,210,0.5)]">
                                {Icons[i % Icons.length]}
                            </div>
                            <div className="font-black text-4xl text-white tracking-tight mb-2">{value}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-500 opacity-60 leading-none">{label}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="bg-white">
            <div id="hero"><HeroSection /></div>
            <StatsBar />
            <div id="treatments"><HomeOurTreatments /></div>
            <div id="process"><HomeProcess /></div>
            <div id="about"><HomeAbout /></div>
            <div id="gallery"><HomeGallary /></div>
            <div id="faq"><HomeFAQ /></div> 
            <div id="comparison"><ComparisonSection /></div>
            <div id="contact"><HomeContact /></div>
            <div id="findus"><FindUs /></div>
            <div id="appointment"></div>
        </div>
    );
};

export default LandingPage;
