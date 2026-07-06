import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/UI/Section';
import { B, NAV_LINKS } from '@/data/constants';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="h-12 overflow-hidden rounded-2xl bg-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                <img 
                  src="/images/Dental_ORTHODONTIST1-LOGO - Copy.jpg" 
                  alt="Panda Smile Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="block text-2xl font-black text-white tracking-tight leading-none mb-1">Panda Smile</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">Aligner & Braces</span>
              </div>
            </Link>
            <p className="text-slate-400 text-base leading-loose max-w-xs mb-10 font-medium">
              Transforming smiles through precision clinical orthodontics and personalized care by specialized MDS orthodontists.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Facebook size={20} />, link: "#", color: "hover:bg-[#1877f2]" },
                { icon: <Instagram size={20} />, link: "#", color: "hover:bg-[#e4405f]" },
                { icon: <Youtube size={20} />, link: "#", color: "hover:bg-[#ff0000]" },
              ].map((s, i) => (
                <a key={i} href={s.link} className={`w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 ${s.color} hover:scale-110 hover:shadow-lg`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Exploration</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((l, i) => (
                  <li key={i}>
                    <Link to={l.path} className="text-slate-500 hover:text-cyan-400 text-sm font-semibold transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments Selection */}
            <div className="md:col-span-3">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Care Services</h4>
              <ul className="space-y-4">
                {["Metal Braces", "Ceramic Braces", "Clear Aligners", "Kids Orthodontics", "Complex Correction"].map((t, i) => (
                  <li key={i} className="text-slate-500 hover:text-cyan-400 text-sm font-semibold cursor-pointer transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Clinical HQ</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin size={20} className="text-cyan-400 shrink-0" />
                <p className="text-slate-400 text-sm leading-relaxed font-medium">Sahadevkhunta, Near Railway Station, Balasore, Odisha - 756001</p>
              </div>
              <div className="flex gap-4">
                <Phone size={20} className="text-cyan-400 shrink-0" />
                <p className="text-white text-lg font-black tracking-tight leading-none">+91 93376 84288</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-2">Practice Hours</p>
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-bold">Mon – Sat</span>
                  <span className="text-white">10 AM – 7 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
            &copy; {currentYear} Panda Smile. Designed with precision by <span className="text-slate-400">Nerathix</span>
          </p>
          <div className="flex items-center gap-8">
            {["Patient Privacy", "Terms of Service", "Accessibility"].map((l, i) => (
              <a key={i} href="#" className="text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
