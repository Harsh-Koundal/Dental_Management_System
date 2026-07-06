import { Star, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { Section, Container } from '@/UI/Section';
import { useInView } from '@/libs/hooks';
import { B } from '@/data/constants';
import { Link } from 'react-router-dom';

// function HomeAbout() {
//   const [ref, vis] = useInView();
//   return (
//     <Section id="about" className="bg-[#fff]">
//       <Container>
//         <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//           {/* Card */}
//           <div
//             className="relative"
//             style={{
//               opacity: vis ? 1 : 0,
//               transform: vis ? "none" : "translateX(-40px)",
//               transition: "all 1s cubic-bezier(0.19, 1, 0.22, 1)",
//             }}
//           >
//             {/* Background Blob */}
//             <div className="absolute top-[-20%] left-[-15%] w-[130%] h-[130%] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

//             <div
//               className="rounded-[3rem] p-12 text-center relative overflow-hidden shadow-[0_32px_80px_rgba(10,61,124,0.15)] z-10 hover:shadow-[0_48px_96px_rgba(10,61,124,0.2)] transition-shadow duration-500"
//               style={{ background: `linear-gradient(135deg,${B.navy},${B.blue})` }}
//             >
//               <div
//                 className="absolute rounded-full pointer-events-none bg-white opacity-5"
//                 style={{ top:-40, right:-40, width:240, height:240 }}
//               />
//               <div className="text-[100px] mb-8 drop-shadow-2xl hover:scale-110 transition-transform duration-500">👨‍⚕️</div>
//               <h3 className="text-white font-black text-3xl tracking-tight mb-2">Dr. Abinash Panda</h3>
//               <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300 opacity-80 mb-8">BDS, MDS – Orthodontics Specialist</p>
              
//               <div className="flex justify-center gap-2 mb-10">
//                 {[...Array(5)].map((_,i) => <Star key={i} size={22} fill="#ffd54f" color="#ffd54f" className="drop-shadow-sm" />)}
//               </div>

//               <div className="space-y-4 max-w-xs mx-auto">
//                 {["Orthodontic Specialist","Metal · Ceramic · Aligner Expert","Children & Adults Welcome","Balasore, Odisha"].map((t,i) => (
//                   <div key={i} className="flex items-center gap-3 text-sm font-medium p-3.5 rounded-2xl bg-white/10 border border-white/5 shadow-sm group hover:bg-white/15 transition-all duration-300" style={{ color:"rgba(255,255,255,0.95)" }}>
//                     <CheckCircle size={18} className="text-cyan-400 shrink-0" /> {t}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Float Badge */}
//             <div className="absolute bottom-10 right-[-20px] bg-white rounded-2xl shadow-2xl p-6 border border-brand/10 z-20 animate-bounce-slow">
//               <div className="text-brand font-black text-2xl">MDS</div>
//               <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Master of Orthodontics</div>
//             </div>
//           </div>

//           {/* Text Content */}
//           <div
//             style={{
//               opacity: vis ? 1 : 0,
//               transform: vis ? "none" : "translateX(40px)",
//               transition: "all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s",
//             }}
//           >
//             <span
//               className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm mb-6"
//               style={{ background: B.light, color: B.cyan }}
//             >
//               Excellence in Dental Care
//             </span>
//             <h2
//               className="font-black mt-4 mb-8 leading-[1.1] tracking-tight"
//               style={{ fontSize:"clamp(32px,5vw,48px)", color: B.text }}
//             >
//               Where Scientific Precision<br />Meets <span className="text-brand">Smile Aesthetics</span>
//             </h2>
//             <p className="text-lg leading-relaxed mb-6 font-medium" style={{ color: B.muted }}>
//               Dr. Abinash Panda is a distinguished specialist in Orthodontics, offering state-of-the-art braces and aligner solutions at{" "}
//               <strong className="text-brand">Panda Smile Aligner & Braces</strong>, Balasore.
//             </p>
//             <p className="text-lg leading-relaxed mb-10 opacity-80" style={{ color: B.muted }}>
//               We combine advanced digital diagnostic techniques with a personalized, patient-first approach to ensure every smile we design is as unique as the individual wearing it.
//             </p>

//             <div className="grid grid-cols-2 gap-6 mb-12">
//               {[
//                 { t: "BDS", d: "Bachelor of Dental Surgery" },
//                 { t: "MDS", d: "Master of Dental Surgery (Orthodontics)" },
//                 { t: "2+ Years", d: "Specialist Clinical Experience" },
//                 { t: "All Ages", d: "Expertise in Pediatric & Adult Ortho" }
//               ].map(({t, d}) => (
//                 <div
//                   key={t}
//                   className="rounded-2xl p-6 bg-slate-50 border border-slate-100 group hover:border-brand/30 hover:bg-brand/5 transition-all duration-300 shadow-sm"
//                 >
//                   <div className="font-black text-xl mb-1 tracking-tight" style={{ color: B.cyan }}>{t}</div>
//                   <div className="text-[11px] font-bold opacity-70 leading-snug" style={{ color: B.muted }}>{d}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-6 items-center">
//               <Link
//                 to="/appointment"
//                 className="flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-xl hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300"
//                 style={{
//                   background: `linear-gradient(135deg,${B.orange},#ff8f40)`,
//                 }}
//               >
//                 Start Your Journey <ArrowRight size={20} />
//               </Link>
//               <a
//                 href="tel:9337684288"
//                 className="flex items-center gap-3 font-bold text-base group text-brand transition-colors"
//                 style={{ color: B.cyan }}
//               >
//                 <div className="p-3.5 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors duration-300">
//                   <Phone size={22} fill="currentColor" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Clinic Call</span>
//                   <span className="leading-none font-black text-xl tracking-tight">93376 84288</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// }

// export default HomeAbout;
function HomeAbout() {
  const [ref, vis] = useInView();
  return (
    <Section id="about" style={{ background: B.offWhite }}>
      <Container>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Doctor Photo Card */}
          <div
            className="relative"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-30px)",
              transition: "all 0.7s",
            }}
          >
            {/* Main Photo */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_rgba(10,61,124,0.2)] group h-[620px]">
              <img
                src="/images/owner-bio-image.jpeg"
                alt="Dr. Abinash Panda"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay at bottom - neutral dark, no blue tint */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-8 pt-24">
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="#ffd54f" color="#ffd54f" />)}
                </div>
                <h3 className="text-white font-black text-2xl text-center tracking-tight">Dr. Abinash Panda</h3>
                <p className="text-center text-sm mt-1 font-semibold" style={{ color:"rgba(255,255,255,0.75)" }}>BDS, MDS – Orthodontics Specialist</p>
              </div>

              {/* Credential chips top-left */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {["Orthodontic Specialist", "Metal · Ceramic · Aligner"].map((tag, i) => (
                  <span key={i} className="bg-white/90 backdrop-blur text-[#0a3d7c] font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating MDS Badge */}
            <div className="absolute bottom-8 right-[-20px] bg-white rounded-2xl shadow-2xl p-5 border border-brand/10 z-20 animate-bounce-slow">
              <div className="text-brand font-black text-2xl leading-none">MDS</div>
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mt-1">Orthodontics</div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute top-8 right-[-16px] bg-[#f37121] rounded-2xl shadow-xl p-4 z-20">
              <div className="text-white font-black text-xl leading-none">2+</div>
              <div className="text-[9px] uppercase font-bold text-white/80 tracking-widest mt-1">Yrs Expert</div>
            </div>
          </div>

          {/* Text */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(30px)",
              transition: "all 0.7s 0.15s",
            }}
          >
            <span
              className="inline-block rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: B.light, color: B.cyan }}
            >
              About the Doctor
            </span>
            <h2
              className="font-black mt-4 mb-5 leading-tight"
              style={{ fontSize:"clamp(26px,4vw,38px)", color: B.text }}
            >
              Where Science Meets<br />Smile Design
            </h2>
            <p className="text-base leading-loose mb-5" style={{ color: B.muted }}>
              Dr. Abinash Panda is a specialist in Orthodontics, offering cutting-edge braces and aligner solutions for all age groups at{" "}
              <strong style={{ color: B.text }}>Panda Smile Aligner & Braces</strong>, Balasore.
            </p>
            <p className="text-base leading-loose mb-8" style={{ color: B.muted }}>
              Focused on delivering beautifully aligned smiles with accuracy and care, Dr. Panda combines advanced orthodontic techniques with a gentle, patient-first approach.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[["BDS","Bachelor of Dental Surgery"],["MDS","Master – Orthodontics"],["2+ Years","Specialist Experience"],["All Ages","Kids, Teens & Adults"]].map(([t,d]) => (
                <div
                  key={t}
                  className="rounded-xl p-4"
                  style={{ background: B.white, border:`1px solid ${B.border}` }}
                >
                  <div className="font-extrabold text-lg" style={{ color: B.cyan }}>{t}</div>
                  <div className="text-xs mt-0.5" style={{ color: B.muted }}>{d}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior:"smooth" })}
                className="flex items-center gap-2 px-7 py-4 rounded-xl text-white font-bold text-sm border-none cursor-pointer btn-hover transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg,${B.orange},#ff8f40)`,
                  boxShadow: "0 6px 20px rgba(243,113,33,0.35)",
                }}
              >
                Book a Consultation <ArrowRight size={16} />
              </button>
              <a
                href="tel:9337684288"
                className="flex items-center gap-2 font-bold text-sm py-4 no-underline"
                style={{ color: B.cyan }}
              >
                <Phone size={16} /> 93376 84288
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
export default HomeAbout;
