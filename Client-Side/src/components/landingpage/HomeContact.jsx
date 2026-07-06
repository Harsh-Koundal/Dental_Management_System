import { useState } from 'react';
import { MapPin, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { Section, Container } from '@/UI/Section';
import { B } from '@/data/constants';
import axios from "axios";
import { toast } from 'react-toastify';


function HomeContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting request...");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/contact`,
        {
          name: form.name,
          email: form.email,
          treatment: form.treatment,
          phone: form.phone,
          message: form.message
        }
      );
      // toast.dismiss(loadingToast);

      if (res.data.success) {
        toast.success(res.data.message);

        setForm({
          name: "",
          email: "",
          treatment: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(res?.data?.message || "Unable to submit your request");
      }
    }catch(err){
      // toast.dismiss(loadingToast);
      console.error(err);
      toast.error(
      err?.response?.data?.message || "Something went wrong"
    );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all font-medium text-slate-700 placeholder:text-slate-400";

  return (
    <Section id="contact" className="bg-white">
      <Container>

        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest mb-5" style={{ background: B.light, color: B.cyan }}>
            Get In Touch
          </span>
          <h2 className="font-black text-[clamp(32px,5vw,54px)] tracking-tight mb-4" style={{ color: B.text }}>
            Let's Start a <span style={{ color: B.blue }}>Conversation</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">

          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#fdfbf7] p-12 rounded-[3.5rem] border border-brand/10 shadow-xl shadow-brand/5">
            <h3 className="text-3xl font-black mb-2 tracking-tight" style={{ color: B.text }}>Get Expert<span className="text-brand"> Advice</span> For Your Smile</h3>
            <p className="text-sm font-medium mb-10 opacity-70" style={{ color: B.muted }}>Our dedicated team will respond to your appointment request within 2 hours.</p>

            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Full Name <span className='text-red-400'>*</span></label>
                  <input type="text" placeholder="John Doe" required className={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Email <span className='text-red-400'>*</span></label>
                  <input type="email" placeholder="john@gmail.com" required className={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">I'm interested in <span className='text-red-400'>*</span></label>
                  <select className={inputStyle} value={form.treatment} onChange={e => setForm({ ...form, treatment: e.target.value })} required>
                    <option value="">Select Treatment</option>
                    <option value="Metal Braces">Metal Braces</option>
                    <option value="Ceramic Braces">Ceramic Braces</option>
                    <option value="Clear Aligners">Clear Aligners</option>
                    <option value="Retainers">Retainers</option>
                    <option value="Self-ligating braces">Self-ligating braces</option>
                    <option value="Damon Braces">Damon Braces</option>
                    <option value="Lingual Braces">Lingual Braces</option>
                    <option value="Kids Orthodontics">Kids Orthodontics</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Phone Number <span className='text-red-400'>*</span></label>
                  <input type="tel" placeholder="+91 XXXX XXXX" required className={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">Extra Notes (Optional)</label>
                <textarea placeholder="Describe your dental case or goals..." rows={4} className={inputStyle} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand text-white font-black text-sm uppercase tracking-widest py-6 rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                    Submitting Your Request...
                  </>
                ) : (
                  <>
                    Get Your Smile Plan <ArrowRight size={18} />
                  </>
                )}
              </button>
              {isSubmitting && (
                <p className="text-center text-sm font-medium text-slate-500" aria-live="polite">
                  Please wait, we are sending your details securely.
                </p>
              )}
            </form>
          </div>

          {/* Right: Info & Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col justify-between py-10">
            <div>
              <span className="inline-block rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6" style={{ background: B.light, color: B.cyan }}>Find Us</span>
              <h2 className="font-black text-4xl mb-12 tracking-tight" style={{ color: B.text }}>Our Clinical <span className="text-brand"> Location</span></h2>
              <ul className="space-y-10">
                <li className="flex gap-6 items-start group">
                  <div className="p-4 rounded-2xl bg-[#f0f9ff] text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm border border-brand/5">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-2">Visit Clinic</h4>
                    <p className="text-sm font-medium opacity-70 leading-relaxed max-w-[240px]" style={{ color: B.muted }}>Sahadevkhunta, Near Railway Station, Balasore, Odisha - 756001</p>
                  </div>
                </li>
                <li className="flex gap-6 items-start group">
                  <div className="p-4 rounded-2xl bg-[#fff7ed] text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm border border-orange-100">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-2">Clinical Hours</h4>
                    <p className="text-sm font-medium opacity-70 leading-relaxed" style={{ color: B.muted }}>Mon - Sat: 10 AM - 7 PM<br />Sunday: Closed</p>
                  </div>
                </li>
                <li className="flex gap-6 items-start group">
                  <div className="p-4 rounded-2xl bg-[#fdf2f8] text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-sm border border-pink-100">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-2">Speak to Specialist</h4>
                    <p className="font-black text-xl tracking-tight text-slate-800 mb-1">drpandasmile@gmail.com</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Response within 2 hours</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}

export default HomeContact;

