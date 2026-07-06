import { useState } from 'react';
import { Clock, Info, ArrowRight } from 'lucide-react';
import { Section, Container, SectionHead } from '@/UI/Section';
import { useInView } from '@/libs/hooks';
import { B, TREATMENTS } from '@/data/constants';
import { Link } from 'react-router-dom';

const CLINICAL_CASES = [
  {
    image: "/images/Dental Crowding + Gingivitis-image.png",
    title: "Crowding + Coil Spring",
    desc: "This shows braces with a coil spring used to treat crowded teeth. The gums look red, which may indicate gingivitis (gum inflammation) caused by difficulty cleaning around braces."
  },
  {
    image: "/images/Narrow Upper Jaw (Maxillary Constriction)-image.png",
    title: "Palatal Expander",
    desc: "This image shows a palatal expander, used to treat a narrow upper jaw. It helps widen the jaw and correct problems like crossbite."
  },
  {
    image: "/images/Malocclusion (Misaligned Teeth)-image.png",
    title: "Malocclusion Correction",
    desc: "Top view of braces correcting malocclusion (misaligned teeth). The goal is to bring teeth into proper alignment and improve bite."
  },
  {
    image: "/images/Space Loss -Future Crowding-image.png",
    title: "Lingual Arch Appliance",
    desc: "This shows a lingual arch appliance, used to maintain space in the lower teeth. It prevents future crowding when permanent teeth are coming in."
  },
  {
    image: "/images/Tooth Spacing _Alignment Issue-image.png",
    title: "Spacing & Springs",
    desc: "Braces with a spring mechanism used to fix spacing issues or gaps between teeth. It helps in closing or creating space for proper alignment."
  },
  {
    image: "/images/Severe Crowding + Plaque Risk-image.png",
    title: "Severe Crowding",
    desc: "Lower teeth braces showing severe crowding. Overlapping teeth increase risk of plaque buildup, cavities, and gum disease."
  }
];

function HomeOurTreatments() {
  const [active, setActive] = useState(null);

  return (
    <Section id="treatments" style={{ background: B.offWhite }}>
      <Container>
        {/* --- SECTION 1: TREATMENT CARDS --- */}
        <SectionHead
          tag="Our Treatments"
          title="Braces & Aligner Solutions"
          // sub="Precision clinical orthodontics tailored to every age, lifestyle and budget."
          sub="We offer a complete range of orthodontic treatments tailored to every age, lifestyle and budget."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TREATMENTS.map((t, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div
                key={i}
                ref={ref}
                className="relative h-[550px] rounded-[2.5rem] overflow-hidden group shadow-2xl transition-all duration-700"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(40px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Background Image */}
                <img 
                  src={t.image} 
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />

                {/* Top Right Icon */}
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group/heart hover:bg-white/20 transition-all cursor-pointer z-10">
                   <Info size={18} className="text-white/80 group-hover/heart:text-white transition-colors" />
                </div>

                {/* Bottom Content Overlay - ALWAYS VISIBLE */}
                <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end transition-all duration-500">
                  <div className="mb-5">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-brand text-white text-[9px] font-black uppercase tracking-[0.25em] mb-3">
                      {t.tag}
                    </span>
                    <h3 className="text-white text-3xl font-black tracking-tight mb-2 drop-shadow-sm">
                       {t.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium leading-relaxed line-clamp-2">
                       {t.desc}
                    </p>
                  </div>

                  <Link 
                    to={`/treatments/${t.id}`}
                    className="w-full py-4 rounded-full bg-white text-[#0a3d7c] font-black text-[13px] uppercase tracking-[0.2em] text-center shadow-lg hover:bg-slate-50 transition-all duration-300"
                  >
                    View Treatment Details
                  </Link>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* --- VIEW ALL TREATMENTS CTA --- */}
        <div className="mt-16 flex justify-center">
           <Link 
            to="/treatments"
            className="group flex items-center gap-3 px-10 py-5 rounded-2xl border-2 border-[#1565c0] text-[#1565c0] font-black text-sm uppercase tracking-widest hover:bg-[#1565c0] hover:text-white transition-all duration-500 shadow-xl hover:shadow-[#1565c0]/20"
           >
              View All Treatments 
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        {/* --- SECTION 2: CLINICAL CASE STUDIES (INFINITE MARQUEE) --- */}
        <div className="mt-24">
            <div className="bg-brand inline-block rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest text-white mb-6">
               Clinical Insights
            </div>
            <h2 className="text-[#0a3d7c] font-black text-3xl md:text-5xl tracking-tight mb-4">
               Case Visualizations
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mb-12">
               Explore real-world orthodontic scenarios and the appliances we use to achieve precision alignment.
            </p>

            {/* Infinite Marquee Wrapper */}
            <div className="relative overflow-hidden">
               {/* Left Fade - Subtle */}
               <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#f4f8fd]/80 to-transparent pointer-events-none" />
               {/* Right Fade - Subtle */}
               <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-[#f4f8fd]/80 to-transparent pointer-events-none" />

               {/* Marquee Track */}
               <div
                  className="flex gap-6"
                  style={{
                    animation: "marquee 35s linear infinite",
                    width: "max-content",
                  }}
                  onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                  onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
               >
                  {/* Render cards TWICE for seamless loop */}
                  {[...CLINICAL_CASES, ...CLINICAL_CASES].map((caseItem, idx) => (
                    <div 
                      key={idx}
                      className="w-[420px] flex-shrink-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl group"
                    >
                       <div className="h-72 overflow-hidden relative">
                          <img 
                            src={caseItem.image} 
                            alt={caseItem.title} 
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg">
                             <Info size={16} className="text-brand" />
                          </div>
                       </div>
                       <div className="p-7">
                          <h4 className="text-[#0a3d7c] font-black text-xl mb-3 tracking-tight">
                            {caseItem.title}
                          </h4>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                            {caseItem.desc}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
        </div>
      </Container>
    </Section>
  );
}

export default HomeOurTreatments;
