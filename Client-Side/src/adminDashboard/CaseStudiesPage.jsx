import { useState, useEffect, useRef } from "react";

// ─── Icons (inline SVG components to avoid any import issues) ─────────────────
const Icon = ({ d, size = 16, stroke = "currentColor", sw = 2, fill = "none", viewBox = "0 0 24 24", children }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    {d && <path d={d} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />}
    {children}
  </svg>
);

const SearchIcon = ({ size }) => <Icon size={size} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />;
const PlusIcon = ({ size }) => <Icon size={size} d="M12 5v14M5 12h14" />;
const PencilIcon = ({ size }) => <Icon size={size} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
const TrashIcon = ({ size }) => <Icon size={size} d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />;
const XIcon = ({ size }) => <Icon size={size} d="M18 6L6 18M6 6l12 12" />;
const UploadIcon = ({ size }) => <Icon size={size} d="M4 16l4-4 4 4 4-6 4 6M21 12V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7" />;
const EyeIcon = ({ size }) => (
  <Icon size={size}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const UsersIcon = ({ size }) => (
  <Icon size={size}>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={2} />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </Icon>
);
const CheckCircleIcon = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const XCircleIcon = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </Icon>
);
const ClockIcon = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </Icon>
);
const StethoscopeIcon = ({ size }) => (
  <Icon size={size}>
    <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 100 .3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <circle cx="20" cy="10" r="2" stroke="currentColor" strokeWidth={2} />
  </Icon>
);
const ArrowRightIcon = ({ size }) => <Icon size={size} d="M5 12h14M13 6l6 6-6 6" />;
const LayoutGridIcon = ({ size }) => (
  <Icon size={size}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={2} />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={2} />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={2} />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={2} />
  </Icon>
);
const AdminIcon = ({ size }) => <Icon size={size} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />;

// ─── Constants ────────────────────────────────────────────────────────────────
const TREATMENT_TYPES = [
  "Teeth Whitening",
  "Dental Implants",
  "Invisalign",
  "Veneers",
  "Gum Contouring",
  "Root Canal",
  "Braces",
  "Composite Bonding",
];

const PALETTE = [
  { bg: "#dbeafe", accent: "#2563eb", light: "#eff6ff" },
  { bg: "#dcfce7", accent: "#16a34a", light: "#f0fdf4" },
  { bg: "#fef9c3", accent: "#ca8a04", light: "#fefce8" },
  { bg: "#fce7f3", accent: "#db2777", light: "#fdf2f8" },
  { bg: "#ede9fe", accent: "#7c3aed", light: "#f5f3ff" },
  { bg: "#ffedd5", accent: "#ea580c", light: "#fff7ed" },
];
const getPalette = (i) => PALETTE[i % PALETTE.length];

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CASES = [
  {
    id: 1,
    title: "Smile Makeover with Veneers",
    treatment: "Veneers",
    duration: "3 months",
    description:
      "A complete smile transformation using 10 porcelain veneers. The patient presented with severely discolored and misaligned teeth. After careful planning and minimal prep veneers, we achieved a natural-looking, radiant smile that boosted the patient's confidence dramatically. The final result exceeded all expectations.",
    before: null,
    after: null,
    active: true,
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Full Arch Implant Restoration",
    treatment: "Dental Implants",
    duration: "8 months",
    description:
      "The patient had lost most of their upper teeth over 10 years. We placed 6 titanium implants and delivered a full arch of ceramic crowns, restoring full chewing function and a natural appearance. The patient reported a completely renewed quality of life.",
    before: null,
    after: null,
    active: true,
    date: "2024-12-20",
  },
  {
    id: 3,
    title: "Invisalign Teen Transformation",
    treatment: "Invisalign",
    duration: "14 months",
    description:
      "A teenage patient with moderate crowding and spacing achieved perfectly aligned teeth using 28 clear aligners. No dietary restrictions, no school embarrassment — just gradual, comfortable correction leading to a confident new smile.",
    before: null,
    after: null,
    active: true,
    date: "2024-11-10",
  },
  {
    id: 4,
    title: "Advanced Teeth Whitening",
    treatment: "Teeth Whitening",
    duration: "2 sessions",
    description:
      "Using our in-office Zoom whitening system combined with take-home trays, we lightened the patient's teeth by 9 shades in just two appointments, eliminating years of coffee and tea stains for a brilliantly bright smile.",
    before: null,
    after: null,
    active: false,
    date: "2024-10-05",
  },
  {
    id: 5,
    title: "Gum Contouring & Crown Lengthening",
    treatment: "Gum Contouring",
    duration: "6 weeks",
    description:
      "A patient with excessive gingival display underwent laser gum contouring. The procedure removed excess gum tissue to expose more of the teeth, creating a balanced, attractive smile line with virtually no downtime.",
    before: null,
    after: null,
    active: true,
    date: "2024-09-22",
  },
  {
    id: 6,
    title: "Composite Bonding Reshape",
    treatment: "Composite Bonding",
    duration: "1 session",
    description:
      "Chipped and worn front teeth were restored in a single appointment using tooth-colored composite resin. The seamless result looks completely natural and the patient left the same day with a perfected, confident smile.",
    before: null,
    after: null,
    active: true,
    date: "2024-08-18",
  },
];

// ─── Before / After Slider ────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, colorIdx, height = 185 }) {
  const [pct, setPct] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const p = getPalette(colorIdx);
  const p2 = getPalette(colorIdx + 2);

  const compute = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPct(Math.max(4, Math.min(96, ((clientX - left) / width) * 100)));
  };

  useEffect(() => {
    const onUp = () => { dragging.current = false; };
    const onMove = (e) => { if (dragging.current) compute(e.clientX); };
    const onTouch = (e) => { if (dragging.current) { e.preventDefault(); compute(e.touches[0].clientX); } };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", onTouch, { passive: false });
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const imgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

  const Placeholder = ({ label, bg, accent }) => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative" style={{ background: bg }}>
      <LayoutGridIcon size={28} style={{ color: accent, opacity: 0.35 }} />
      <span style={{ fontSize: 9, fontWeight: 800, color: accent, opacity: 0.5, letterSpacing: "0.12em" }}>{label}</span>
      <span style={{
        position: "absolute", top: 8, [label === "AFTER" ? "right" : "left"]: 8,
        background: "rgba(0,0,0,0.48)", color: "#fff", fontSize: 9,
        fontWeight: 800, letterSpacing: "0.1em", padding: "2px 8px", borderRadius: 99,
      }}>{label}</span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden", height, borderRadius: 16, cursor: "ew-resize", userSelect: "none", background: p.bg }}
      onMouseDown={(e) => { dragging.current = true; compute(e.clientX); e.preventDefault(); }}
      onTouchStart={(e) => { dragging.current = true; compute(e.touches[0].clientX); }}
    >
      {/* BEFORE layer — full width */}
      <div style={{ position: "absolute", inset: 0 }}>
        {before
          ? <img src={before} alt="Before" style={imgStyle} />
          : <Placeholder label="BEFORE" bg={p.bg} accent={p.accent} />
        }
      </div>

      {/* AFTER layer — clipped from the right */}
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: `${pct}%`, overflow: "hidden" }}>
        {after
          ? <img src={after} alt="After" style={{ ...imgStyle, position: "absolute", right: 0, width: `${10000 / (100 - pct)}%`, maxWidth: "none" }} />
          : (
            <div style={{ position: "absolute", inset: 0, minWidth: `${10000 / (100 - pct)}%`, right: 0 }}>
              <Placeholder label="AFTER" bg={p2.bg} accent={p2.accent} />
            </div>
          )
        }
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: `${pct}%`, width: 3,
        background: "#fff", transform: "translateX(-50%)", zIndex: 10,
        boxShadow: "0 0 0 2px rgba(255,255,255,0.4), 0 4px 20px rgba(0,0,0,0.22)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 36, height: 36, borderRadius: "50%", background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M8 5L3 12l5 7M16 5l5 7-5 7" stroke="#334155" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: color + "18" }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-extrabold leading-none text-slate-900">{value}</p>
      </div>
    </div>
  );
}

// ─── Case Card (Patient View) ─────────────────────────────────────────────────
function CaseCard({ cs, colorIdx, onView }) {
  const { bg, accent } = getPalette(colorIdx);
  return (
    <div
      onClick={() => onView(cs)}
      className="group flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      style={{ cursor: "pointer" }}
    >
      <BeforeAfterSlider before={cs.before} after={cs.after} colorIdx={colorIdx} height={178} />

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h4 className="text-sm font-bold text-slate-900 leading-snug" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {cs.title}
        </h4>

        <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: 11, color: "#64748b" }}>
          <span className="flex items-center gap-1">
            <StethoscopeIcon size={11} />{cs.treatment}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon size={11} />{cs.duration}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed flex-1"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {cs.description}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); onView(cs); }}
          className="mt-2 self-start flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-80"
          style={{ background: bg, color: accent }}
        >
          View Details <ArrowRightIcon size={11} />
        </button>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ cs, colorIdx, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white shadow-2xl overflow-hidden"
        style={{ maxHeight: "92vh", overflowY: "auto", animation: "modalPop .18s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes modalPop{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}`}</style>

        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-bold text-slate-900">{cs.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{cs.treatment} · {cs.duration}</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-1.5 hover:bg-slate-100 transition mt-0.5 text-slate-500">
            <XIcon size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <BeforeAfterSlider before={cs.before} after={cs.after} colorIdx={colorIdx} height={310} />
          <p className="text-xs text-slate-400 text-center italic">← Drag slider to compare Before &amp; After →</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Treatment Type", cs.treatment, <StethoscopeIcon size={14} />],
              ["Duration", cs.duration, <ClockIcon size={14} />],
            ].map(([label, val, icon]) => {
              const { bg, accent } = getPalette(label === "Treatment Type" ? 0 : 1);
              return (
                <div key={label} className="rounded-2xl border border-slate-100 p-4" style={{ background: bg + "55" }}>
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: accent }}>
                    {icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{val}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Case Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{cs.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Case Form Modal (Add / Edit) ─────────────────────────────────────────────
function CaseFormModal({ cs, onClose, onSave }) {
  const isEdit = Boolean(cs);
  const [form, setForm] = useState(
    cs
      ? { ...cs }
      : { title: "", treatment: TREATMENT_TYPES[0], duration: "", description: "", before: null, after: null, active: true }
  );
  const [beforePreview, setBeforePreview] = useState(cs?.before || null);
  const [afterPreview, setAfterPreview] = useState(cs?.after || null);

  const handleImg = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (field === "before") { setBeforePreview(url); setForm((f) => ({ ...f, before: url })); }
    else { setAfterPreview(url); setForm((f) => ({ ...f, after: url })); }
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.duration.trim()) return;
    onSave(form);
  };

  const inputCls = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition";
  const labelCls = "text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white shadow-2xl"
        style={{ maxHeight: "92vh", overflowY: "auto", animation: "modalPop .18s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <button onClick={onClose} className="rounded-xl p-1.5 hover:bg-slate-100 transition text-slate-500">
            <XIcon size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className={labelCls}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Smile Makeover with Veneers"
              className={inputCls}
            />
          </div>

          {/* Treatment + Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Treatment Type</label>
              <select
                value={form.treatment}
                onChange={(e) => setForm((f) => ({ ...f, treatment: e.target.value }))}
                className={inputCls}
              >
                {TREATMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                placeholder="e.g. 6 months"
                className={inputCls}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Describe the case, treatment approach and outcome..."
              className={inputCls + " resize-none"}
            />
          </div>

          {/* Image Uploads */}
          {[
            ["before", "Before Image", beforePreview],
            ["after", "After Image", afterPreview],
          ].map(([field, label, preview]) => (
            <div key={field}>
              <label className={labelCls}>{label}</label>
              <div className="flex gap-3">
                <label className="cursor-pointer flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0">
                  <UploadIcon size={14} />
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImg(field, e)} />
                </label>
                <div className="flex-1 min-h-[72px] rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                  {preview
                    ? <img src={preview} alt={label} className="w-full h-full object-cover" />
                    : <span className="text-xs text-slate-400">Preview will appear here</span>
                  }
                </div>
              </div>
            </div>
          ))}

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              className="relative h-6 w-11 rounded-full transition-colors duration-200"
              style={{ background: form.active ? "#10b981" : "#cbd5e1" }}
            >
              <span
                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: form.active ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
            <span className="text-sm text-slate-600">
              Mark as <span className="font-semibold">{form.active ? "Active" : "Inactive"}</span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-2xl bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition"
          >
            {isEdit ? "Save Changes" : "+ Add Case Study"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Row ────────────────────────────────────────────────────────────────
function AdminRow({ cs, colorIdx, onEdit, onDelete, onView }) {
  const { bg, accent } = getPalette(colorIdx);
  const p2 = getPalette(colorIdx + 2);
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
      {/* Mini before/after thumbnail */}
      <div
        className="h-14 w-24 rounded-xl overflow-hidden shrink-0 flex"
        style={{ background: bg }}
      >
        <div className="flex-1 flex items-center justify-center border-r border-white/50">
          {cs.before
            ? <img src={cs.before} alt="B" className="w-full h-full object-cover" />
            : <span style={{ fontSize: 9, fontWeight: 800, color: accent }}>B</span>
          }
        </div>
        <div className="flex-1 flex items-center justify-center" style={{ background: p2.bg }}>
          {cs.after
            ? <img src={cs.after} alt="A" className="w-full h-full object-cover" />
            : <span style={{ fontSize: 9, fontWeight: 800, color: p2.accent }}>A</span>
          }
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate">{cs.title}</p>
        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
          <span className="flex items-center gap-1"><StethoscopeIcon size={10} />{cs.treatment}</span>
          <span className="flex items-center gap-1"><ClockIcon size={10} />{cs.duration}</span>
        </div>
      </div>

      <span
        className="shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
        style={cs.active
          ? { background: "#dcfce7", color: "#15803d" }
          : { background: "#f1f5f9", color: "#64748b" }
        }
      >
        {cs.active ? "Active" : "Inactive"}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onView(cs)}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-50 transition"
          style={{ background: "#ede9fe" }}
        >
          <EyeIcon size={11} /> View
        </button>
        <button
          onClick={() => onEdit(cs)}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition"
          style={{ background: "#e0f2fe" }}
        >
          <PencilIcon size={11} /> Edit
        </button>
        <button
          onClick={() => onDelete(cs.id)}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
          style={{ background: "#fee2e2" }}
        >
          <TrashIcon size={11} /> Delete
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  const [tab, setTab] = useState("patient"); // "patient" | "admin"
  const [cases, setCases] = useState(() =>
    [...SEED_CASES].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [search, setSearch] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formModal, setFormModal] = useState(null);   // null | "add" | case-object
  const [detailCase, setDetailCase] = useState(null); // null | case-object
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 250); return () => clearTimeout(t); }, []);

  // ── Derived ──────────────────────────────────────────────────────────────
  const allTreatments = ["all", ...Array.from(new Set(cases.map((c) => c.treatment)))];

  const applyFilters = (list) =>
    list.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = c.title.toLowerCase().includes(q) || c.treatment.toLowerCase().includes(q);
      const matchTreatment = treatmentFilter === "all" || c.treatment === treatmentFilter;
      return matchSearch && matchTreatment;
    });

  const adminFiltered = applyFilters(cases).filter((c) =>
    statusFilter === "all" ? true : statusFilter === "active" ? c.active : !c.active
  );
  const patientFiltered = applyFilters(cases).filter((c) => c.active);

  const totalActive = cases.filter((c) => c.active).length;
  const totalInactive = cases.filter((c) => !c.active).length;
  const showing = tab === "admin" ? adminFiltered.length : patientFiltered.length;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSave = (form) => {
    if (formModal === "add") {
      const newCase = { ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) };
      setCases((prev) => [newCase, ...prev]);
    } else {
      setCases((prev) => prev.map((c) => (c.id === formModal.id ? { ...c, ...form } : c)));
    }
    setFormModal(null);
  };

  const handleDelete = (id) => setCases((prev) => prev.filter((c) => c.id !== id));

  const detailIdx = detailCase ? cases.findIndex((c) => c.id === detailCase.id) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm font-medium">
        Loading case studies…
      </div>
    );
  }

  // ── Shared Controls bar ───────────────────────────────────────────────────
  const ControlsBar = () => (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon size={14} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search case studies…"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
          />
        </div>

        {/* Treatment dropdown */}
        <select
          value={treatmentFilter}
          onChange={(e) => setTreatmentFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400 transition"
        >
          {allTreatments.map((t) => (
            <option key={t} value={t}>{t === "all" ? "All Treatments" : t}</option>
          ))}
        </select>

        {/* Status pills — admin only */}
        {tab === "admin" && (
          <div className="flex items-center gap-2">
            {[["all", "All"], ["active", "Active"], ["inactive", "Inactive"]].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setStatusFilter(k)}
                className="rounded-2xl px-4 py-2.5 text-xs font-semibold transition"
                style={statusFilter === k
                  ? { background: "#0ea5e9", color: "#fff" }
                  : { background: "#f1f5f9", color: "#475569" }
                }
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {/* Add button — admin only */}
        {tab === "admin" && (
          <button
            onClick={() => setFormModal("add")}
            className="ml-auto flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-sky-600 transition shadow-sm"
          >
            <PlusIcon size={13} />
            Add New Case
          </button>
        )}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-slate-300 bg-white py-20 text-slate-400">
      <XCircleIcon size={36} />
      <p className="text-sm font-medium">No case studies found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <style>{`
        @keyframes modalPop { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
      `}</style>

      <div className="mx-auto max-w-[1440px] space-y-6">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case Studies</h1>
            <p className="text-sm text-slate-500 mt-1">Real patient transformations — before &amp; after</p>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1">
            {[
              { id: "patient", label: "Patient View", icon: <UsersIcon size={13} /> },
              { id: "admin",   label: "Admin Panel",  icon: <AdminIcon size={13} /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all"
                style={tab === id
                  ? { background: "#0ea5e9", color: "#fff", boxShadow: "0 1px 4px rgba(14,165,233,.35)" }
                  : { color: "#475569" }
                }
              >
                {icon}{label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────────────────── */}
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
          <StatCard label="Total Cases"      value={cases.length}  color="#0ea5e9" icon={<UsersIcon size={20} />} />
          <StatCard label="Active Cases"     value={totalActive}   color="#22c55e" icon={<CheckCircleIcon size={20} />} />
          <StatCard label="Inactive Cases"   value={totalInactive} color="#f59e0b" icon={<XCircleIcon size={20} />} />
          <StatCard label="Showing Results"  value={showing}       color="#8b5cf6" icon={<EyeIcon size={20} />} />
        </div>

        {/* ── Controls Bar ────────────────────────────────────────────────── */}
        <ControlsBar />

        {/* ── Patient View ────────────────────────────────────────────────── */}
        {tab === "patient" && (
          patientFiltered.length === 0
            ? <EmptyState />
            : (
              <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
                {patientFiltered.map((cs, i) => (
                  <CaseCard key={cs.id} cs={cs} colorIdx={i} onView={setDetailCase} />
                ))}
              </div>
            )
        )}

        {/* ── Admin View ──────────────────────────────────────────────────── */}
        {tab === "admin" && (
          adminFiltered.length === 0
            ? <EmptyState />
            : (
              <div className="space-y-3">
                {adminFiltered.map((cs, i) => (
                  <AdminRow
                    key={cs.id}
                    cs={cs}
                    colorIdx={i}
                    onEdit={setFormModal}
                    onDelete={handleDelete}
                    onView={setDetailCase}
                  />
                ))}
              </div>
            )
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      {formModal !== null && (
        <CaseFormModal
          cs={formModal === "add" ? null : formModal}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
      {detailCase && (
        <DetailModal
          cs={detailCase}
          colorIdx={detailIdx}
          onClose={() => setDetailCase(null)}
        />
      )}
    </div>
  );
}