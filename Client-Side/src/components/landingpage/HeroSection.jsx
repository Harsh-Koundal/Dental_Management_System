import { Phone } from "lucide-react";

function HeroSection() {
  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-24 md:pt-28 bg-white">

      {/* 🔥 BACKGROUND IMAGE (Right Side) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-section-image4.png"
          alt="Dental Care"
          className="w-full h-full object-cover object-right md:object-center"
        />
      </div>

      {/* 🔥 DECORATIVE TOOTH SILHOUETTE (Left Side Background) */}
      <div className="absolute inset-y-0 left-0 w-[50%] z-10 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden translate-x-[-15%]">
         <svg viewBox="0 0 200 200" className="w-[120%] h-auto text-slate-900 fill-current">
            <path d="M100 10 C 130 10, 160 30, 160 70 C 160 110, 140 130, 130 150 C 120 170, 110 190, 100 190 C 90 190, 80 170, 70 150 C 60 130, 40 110, 40 70 C 40 30, 70 10, 100 10 Z" />
         </svg>
      </div>

      {/* 🔥 SOLID-TO-TRANSPARENT GRADIENT (The "Bright Glaze") */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[60%] z-10 
        bg-gradient-to-r 
        from-white via-white via-white/95 to-transparent"
      ></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-20 w-full mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[85vh]">

          {/* LEFT CONTENT */}
          <div className="max-w-7xl py-12">

            {/* TAGLINE: Soft Grey-Blue */}
            {/* <p className="text-[#64748b] font-bold text-orange-400 text-lg md:text-xl mb-6 tracking-tight">
              We care for your smile
            </p> */}
            <p className="text-orange-600 text-[23px] font-bold text-lg md:text-xl mb-6 tracking-tight">
              We care for your smile
            </p>

            {/* HEADING: Sharp High-Contrast Navy/Blue */}
            <h1 className="font-extrabold text-[#0a3d7c] leading-[1.1] mb-6 text-[clamp(40px,6vw,72px)] tracking-tight">
              Transforming Your <br />
              <span className="text-[#1565c0] relative inline-block">
                Smile With Excellence

                {/* Bright Orange Smile Curve */}
                <svg
                  className="absolute -bottom-6 left-0 w-[55%] h-8 text-[#f37121]"
                  viewBox="0 0 220 24"
                  fill="none"
                >
                  <path
                    d="M10 8 C 65 26, 155 26, 210 8"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* SUBTEXT: Clean and Solid */}
            <p className="text-[#334155] text-lg md:text-xl leading-relaxed mb-12 max-w-[480px] font-medium mt-10">
              Professional dental care built on trust, comfort, and long-term oral health.
            </p>

            {/* BUTTONS: Simple & Sharp */}
            <div className="flex flex-wrap gap-5 items-center">
              <button 
                onClick={() => scroll("contact")}
                className="px-10 py-4 rounded-2xl bg-[#f37121] text-white font-black text-sm uppercase tracking-widest hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_rgba(243,113,33,0.3)]"
              >
                Book An Appointment
              </button>

              <a
                href="tel:9337684288"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-slate-200 text-[#0a3d7c] font-black text-sm uppercase tracking-widest hover:border-[#1565c0] bg-blue-300 hover:bg-slate-50 transition-all"
              >
                <Phone size={18} className="text-[#1565c0]" />
                Call Now
              </a>
            </div>

          </div>

          {/* RIGHT SIDE (Clear for Image) */}
          <div className="hidden md:block"></div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;