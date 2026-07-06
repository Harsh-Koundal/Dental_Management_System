import { Star, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Section, Container } from "@/UI/Section";
import { useInView } from "@/libs/hooks";
import { B } from "@/data/constants";
import { Link } from "react-router-dom";

function HomeAbout() {
  const [ref, vis] = useInView();
  return (
    <Section id="about" className="w-full px-4 md:px-8 lg:px-12">
      <div
        ref={ref}
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto"
      >
        {/* Doctor Photo Card */}
        <div
          className="relative w-full md:col-span-5"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateX(-30px)",
            transition: "all 0.7s",
          }}
        >
          {/* Main Photo */}
          <div
            className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_rgba(10,61,124,0.2)] group h-[400px] md:h-[480px] xl:h-[580px] w-full"
            itemScope
            itemType="https://schema.org/Person"
          >
            <img
              src="/images/dr-abinash-panda-orthodontist.webp"
              alt="Portrait of Dr. Abinash Panda, leading Orthodontist in Balasore specializing in braces and aligners"
              title="Dr. Abinash Panda - Top Orthodontist in Balasore"
              width="600"
              height="800"
              loading="lazy"
              itemProp="image"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 md:p-8 pt-24 flex flex-col items-center">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffd54f" color="#ffd54f" />
                ))}
              </div>
              <h3
                className="text-white font-black text-xl md:text-2xl text-center tracking-tight"
                itemProp="name"
              >
                Dr. Abinash Panda
              </h3>
              <p
                className="text-center text-xs md:text-sm mt-1 font-semibold"
                style={{ color: "rgba(255,255,255,0.75)" }}
                itemProp="jobTitle"
              >
                BDS, MDS – Orthodontics Specialist
              </p>
            </div>

            {/* Credential chips top-left */}
            <div className="absolute top-6 left-2 flex flex-col gap-2">
              {["Orthodontic Specialist", "Metal · Ceramic · Aligner"].map(
                (tag, i) => (
                  <span
                    key={i}
                    className="bg-white/90 backdrop-blur text-[#0a3d7c] font-black text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg w-fit"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className="w-full flex-1 md:col-span-7"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateX(30px)",
            transition: "all 0.7s 0.15s",
          }}
        >
          <span
            className="inline-block rounded-full px-4 py-1 md:px-5 md:py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest"
            style={{ background: B.light, color: B.cyan }}
          >
            About the Doctor
          </span>
          <h2
            className="font-black mt-3 md:mt-4 mb-4 md:mb-5 leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", color: B.text }}
          >
            Where Science Meets
            <br />
            Smile Design
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed md:leading-loose mb-4 md:mb-5"
            style={{ color: B.muted }}
          >
            Dr. Abinash Panda is a specialist in Orthodontics, offering
            cutting-edge braces and aligner solutions for all age groups at{" "}
            <strong style={{ color: B.text }}>
              Panda Smile Aligner & Braces
            </strong>
            , Balasore.
          </p>
          <p
            className="text-sm md:text-base leading-relaxed md:leading-loose mb-6 md:mb-8"
            style={{ color: B.muted }}
          >
            Focused on delivering beautifully aligned smiles with accuracy and
            care, Dr. Panda combines advanced orthodontic techniques with a
            gentle, patient-first approach.
          </p>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              ["BDS", "Bachelor of Dental Surgery"],
              ["MDS", "Master – Orthodontics"],
              ["2+ Years", "Specialist Experience"],
              ["All Ages", "Kids, Teens & Adults"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl p-4 bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="font-extrabold text-base md:text-lg"
                  style={{ color: B.cyan }}
                >
                  {t}
                </div>
                <div
                  className="text-[11px] md:text-xs mt-1"
                  style={{ color: B.muted }}
                >
                  {d}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-center gap-2 px-6 py-3.5 md:px-7 md:py-4 rounded-xl text-white font-bold text-sm border-none cursor-pointer hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              style={{
                background: `linear-gradient(135deg,${B.orange},#ff8f40)`,
                boxShadow: "0 6px 20px rgba(243,113,33,0.35)",
              }}
            >
              Book a Consultation <ArrowRight size={16} />
            </button>
            <a
              href="tel:9337684288"
              className="flex items-center justify-center gap-2 font-bold text-sm py-3.5 md:py-4 no-underline bg-white hover:bg-slate-50 border border-slate-100 rounded-xl px-6 transition-all duration-300 w-full sm:w-auto"
              style={{ color: B.cyan }}
            >
              <Phone size={16} /> 93376 84288
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
export default HomeAbout;
