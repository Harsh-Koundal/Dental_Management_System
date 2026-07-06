import { Instagram } from 'lucide-react';
import { CONTACTS, INFO_CARDS } from '../constants';

const AppointmentSidebar = () => (
  <div className="lg:sticky lg:top-10 space-y-6">
    <div>
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e8f4fd] text-[#185fa5] text-[10px] font-black uppercase tracking-widest mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1e7fcb]" />
        Appointment Booking
      </span>
      <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
        Book your
        <br />
        <span className="text-[#1e7fcb] italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
          smile
        </span>{' '}
        visit
      </h1>
      <p className="text-sm text-[#475569] mt-3 leading-relaxed font-light">
        Fill the form, choose your slot, pay the Rs 100 booking fee, and we&apos;ll confirm your appointment within a few hours.
      </p>
    </div>

    <div className="space-y-2">
      {CONTACTS.map((contact) => {
        const Icon = contact.icon;

        return (
          <div key={contact.label} className="flex items-center gap-3 p-3 bg-white border border-[#e2eaf3] rounded-2xl hover:border-[#1e7fcb] transition-colors cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#e8f4fd] flex items-center justify-center text-[#1e7fcb] flex-shrink-0">
              <Icon size={15} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">{contact.label}</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{contact.value}</p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="space-y-2">
      {INFO_CARDS.map((card) => (
        <div key={card.title} className={`p-3.5 rounded-2xl border ${card.bg}`}>
          <p className={`text-xs font-bold ${card.text}`}>{card.title}</p>
          <p className={`text-xs mt-0.5 leading-relaxed ${card.sub}`}>{card.desc}</p>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 p-3 bg-[#fbeaf0] border border-[#f4c0d1] rounded-2xl">
      <Instagram size={16} className="text-[#993556]" />
      <p className="text-xs font-semibold text-[#72243e]">
        Follow us: <span className="font-black">@drpandasmile</span>
      </p>
    </div>
  </div>
);

export default AppointmentSidebar;
