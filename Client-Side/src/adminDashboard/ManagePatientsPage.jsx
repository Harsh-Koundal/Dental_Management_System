import React, { useState, useEffect } from "react";
import {
  Search, Plus, Pencil, Trash2, X, XCircle, User, Phone, Mail,
  Activity, Eye, CheckCircle, Clock, AlertCircle, ArrowLeft,
  Upload, Calendar, Trash, ImageIcon, Filter, ZoomIn, ChevronDown,
  Image, Star, Download, Users, AlertTriangle
} from "lucide-react";

// ─── Shared Data ──────────────────────────────────────────────────────────────
const initialPatients = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "+1 (555) 234-5678", activeTreatment: "Teeth Whitening", status: "Active", avatar: null, currentMonthProgress: 75, dob: "1990-04-12", notes: "Sensitive gums, use gentle whitening formula.", nextAppointmentMonth: "", nextAppointmentDay: "" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "+1 (555) 876-5432", activeTreatment: "Dental Implants", status: "Active", avatar: null, currentMonthProgress: 40, dob: "1985-11-03", notes: "Post-op check every 3 months.", nextAppointmentMonth: "", nextAppointmentDay: "" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", phone: "+1 (555) 345-6789", activeTreatment: "Invisalign", status: "Completed", avatar: null, currentMonthProgress: 100, dob: "1998-07-22", notes: "Retainer required nightly.", nextAppointmentMonth: "", nextAppointmentDay: "" },
  { id: 4, name: "Robert Martinez", email: "robert.m@email.com", phone: "+1 (555) 654-3210", activeTreatment: "Root Canal", status: "Missed", avatar: null, currentMonthProgress: 20, dob: "1976-01-30", notes: "Needs reminder calls.", nextAppointmentMonth: "", nextAppointmentDay: "" },
  { id: 5, name: "Aisha Patel", email: "aisha.p@email.com", phone: "+1 (555) 789-0123", activeTreatment: "Veneers", status: "Active", avatar: null, currentMonthProgress: 60, dob: "1993-09-15", notes: "Upper arch only.", nextAppointmentMonth: "", nextAppointmentDay: "" },
  { id: 6, name: "James Wilson", email: "j.wilson@email.com", phone: "+1 (555) 012-3456", activeTreatment: "Gum Contouring", status: "Completed", avatar: null, currentMonthProgress: 100, dob: "1982-06-08", notes: "Follow-up aesthetic review pending.", nextAppointmentMonth: "", nextAppointmentDay: "" },
];

const treatmentOptions = ["Teeth Whitening", "Dental Implants", "Invisalign", "Root Canal", "Veneers", "Gum Contouring"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const currentMonthLabel = () => {
  const d = new Date();
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Active:    { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle size={10} /> },
    Completed: { bg: "bg-sky-100 text-sky-700 border-sky-200",             icon: <Clock size={10} /> },
    Missed:    { bg: "bg-rose-100 text-rose-600 border-rose-200",           icon: <AlertCircle size={10} /> },
  };
  const s = map[status] || { bg: "bg-slate-100 text-slate-500 border-slate-200", icon: null };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${s.bg}`}>
      {s.icon}{status}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── UPLOAD MODAL ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const UploadModal = ({ onClose, onSave }) => {
  const [files, setFiles] = useState([]);   // [{ preview, month, year }]
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (rawFiles) => {
    const newItems = Array.from(rawFiles).map((f) => ({
      preview: URL.createObjectURL(f),
      month: MONTHS[new Date().getMonth()],
      year: new Date().getFullYear(),
      name: f.name,
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const updateMeta = (i, key, val) =>
    setFiles((prev) => prev.map((f, idx) => idx === i ? { ...f, [key]: val } : f));

  const handleSave = () => {
    if (!files.length) return;
    const images = files.map((f) => ({
      url: f.preview,
      month: `${f.month} ${f.year}`,
      uploadedAt: new Date(),
    }));
    onSave(images);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-white">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Upload Images</h2>
            <p className="text-xs text-slate-500 mt-0.5">Attach treatment progress photos with month labels</p>
          </div>
          <button onClick={onClose} className="rounded-2xl p-2 hover:bg-slate-100 transition">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Drop zone */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-10
              ${dragOver ? "border-teal-400 bg-teal-50 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:border-teal-300 hover:bg-teal-50/50"}`}
          >
            <div className="h-14 w-14 rounded-2xl bg-teal-100 flex items-center justify-center">
              <Upload size={24} className="text-teal-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">Drop images here</p>
              <p className="text-xs text-slate-400 mt-0.5">or click to browse — PNG, JPG, WEBP</p>
            </div>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          </label>

          {/* Preview list */}
          {files.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{files.length} image{files.length > 1 ? "s" : ""} queued</p>
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                    <img src={f.preview} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate mb-2">{f.name}</p>
                    <div className="flex gap-2">
                      {/* Month */}
                      <div className="relative flex-1">
                        <select
                          value={f.month}
                          onChange={(e) => updateMeta(i, "month", e.target.value)}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-400 pr-7"
                        >
                          {MONTHS.map((m) => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      {/* Year */}
                      <div className="relative">
                        <select
                          value={f.year}
                          onChange={(e) => updateMeta(i, "year", parseInt(e.target.value))}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-400 pr-7"
                        >
                          {YEARS.map((y) => <option key={y}>{y}</option>)}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex-shrink-0">
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/60">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!files.length}
            className={`rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition flex items-center gap-2 ${files.length ? "bg-teal-500 hover:bg-teal-600 shadow-md shadow-teal-200" : "bg-slate-300 cursor-not-allowed"}`}
          >
            <Upload size={14} />
            Save {files.length > 0 ? `${files.length} Image${files.length > 1 ? "s" : ""}` : "Images"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const GallerySection = ({ images, onDelete, onUpload }) => {
  const [filterMonth, setFilterMonth] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const allMonths = ["All", ...Array.from(new Set(images.map((img) => img.month))).sort((a, b) => {
    const [ma, ya] = a.split(" "); const [mb, yb] = b.split(" ");
    return (+yb - +ya) || MONTHS.indexOf(mb) - MONTHS.indexOf(ma);
  })];

  const curLabel = currentMonthLabel();

  const visible = [...images]
    .filter((img) => filterMonth === "All" || img.month === filterMonth)
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

  return (
    <section>
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Treatment Gallery</h3>
          <p className="text-xs text-slate-500 mt-0.5">{images.length} image{images.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={onUpload}
          className="flex items-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-teal-100 transition"
        >
          <Upload size={13} />
          Upload Images
        </button>
      </div>

      {/* Month filter chips */}
      {allMonths.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allMonths.map((m) => (
            <button
              key={m}
              onClick={() => setFilterMonth(m)}
              className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold border transition-all ${
                filterMonth === m
                  ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                  : m === curLabel
                  ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {m === curLabel && m !== "All" ? `★ ${m}` : m}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-slate-300">
          <ImageIcon size={40} />
          <p className="text-sm font-semibold text-slate-400">No images {filterMonth !== "All" ? `for ${filterMonth}` : "uploaded yet"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((img, i) => {
            const isCurrent = img.month === curLabel;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${isCurrent ? "border-amber-300 shadow-amber-100 shadow-md" : "border-slate-200"}`}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-slate-100 cursor-zoom-in" onClick={() => setLightbox(img)}>
                  <img src={img.url} alt={img.month} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Current month ribbon */}
                {isCurrent && (
                  <div className="absolute top-2 left-2 bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                    <Star size={8} fill="white" />THIS MONTH
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-bold">{img.month}</p>
                      <p className="text-white/70 text-[10px]">{fmtDate(img.uploadedAt)}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setLightbox(img)}
                        className="p-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-white transition backdrop-blur-sm"
                      >
                        <ZoomIn size={13} />
                      </button>
                      <button
                        onClick={() => onDelete(img)}
                        className="p-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Month label bottom bar */}
                <div className={`px-3 py-2 ${isCurrent ? "bg-amber-50" : "bg-white"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 truncate">{img.month}</span>
                    <span className="text-[9px] text-slate-400">{fmtDate(img.uploadedAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg px-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/70 hover:text-white transition p-2">
              <X size={24} />
            </button>
            <img src={lightbox.url} alt="" className="w-full rounded-3xl shadow-2xl max-h-[80vh] object-contain" />
            <div className="mt-4 text-center">
              <p className="text-white font-bold">{lightbox.month}</p>
              <p className="text-white/50 text-sm">Uploaded {fmtDate(lightbox.uploadedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── PATIENT PROFILE ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const PatientProfile = ({ patientId, patients, setPatients, onBack }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [appointmentMonth, setAppointmentMonth] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("");
  const patient = patients.find((p) => p.id === patientId);

  useEffect(() => {
    if (patient) {
      setAppointmentMonth(patient.nextAppointmentMonth || "");
      setAppointmentDay(patient.nextAppointmentDay || "");
    }
  }, [patient]);

  const handleSaveAppointment = () => {
    if (!patient) return;
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, nextAppointmentMonth: appointmentMonth, nextAppointmentDay: appointmentDay }
          : p
      )
    );
  };

  if (!patient) return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center gap-4">
      <p className="text-slate-500 font-semibold">Patient not found</p>
      <button onClick={onBack} className="text-teal-600 font-bold underline text-sm">← Back</button>
    </div>
  );

  const images = patient.gallery || [];

  const handleSaveImages = (newImgs) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id ? { ...p, gallery: [...(p.gallery || []), ...newImgs] } : p
      )
    );
    setShowUpload(false);
  };

  const handleDeleteImage = (img) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, gallery: (p.gallery || []).filter((g) => g !== img) }
          : p
      )
    );
  };

  const progressColor = patient.currentMonthProgress === 100 ? "#0ea5e9" : patient.currentMonthProgress >= 50 ? "#10b981" : "#f59e0b";

  return (
    <div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Nav */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="h-5 w-px bg-slate-200" />
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Patient Profile</p>
          <p className="text-sm font-black text-slate-900 leading-tight">{patient.name}</p>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* ── Profile Hero Card ── */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Decorative top band */}
          <div className="h-32 bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute bottom-0 right-8 opacity-10">
              <Activity size={120} strokeWidth={1} className="text-white" />
            </div>
          </div>

          <div className="px-8 pb-10">

            {/* Details grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-5">
              {/* Left: Info */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{patient.name}</h2>
                <p className="text-slate-500 text-sm mt-0.5 mb-5">Patient ID #{patient.id.toString().padStart(4, "0")}</p>

                <div className="space-y-3">
                  {[
                    { icon: <Mail size={14} className="text-teal-500" />, label: "Email", val: patient.email },
                    { icon: <Phone size={14} className="text-teal-500" />, label: "Phone", val: patient.phone },
                    { icon: <Activity size={14} className="text-teal-500" />, label: "Treatment", val: patient.activeTreatment },
                    { icon: <Calendar size={14} className="text-teal-500" />, label: "Next Appointment", val: patient.nextAppointmentMonth && patient.nextAppointmentDay ? `${patient.nextAppointmentMonth} ${patient.nextAppointmentDay}` : "Not scheduled" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5">
                      <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">{icon}</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{label}</p>
                        <p className="text-sm font-semibold text-slate-800">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 mt-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Set Next Appointment</p>
                      <p className="text-sm font-semibold text-slate-800">Choose month and day</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveAppointment}
                      disabled={!appointmentMonth || !appointmentDay}
                      className={`rounded-2xl px-4 py-2 text-xs font-black text-white transition ${appointmentMonth && appointmentDay ? "bg-teal-500 hover:bg-teal-600" : "bg-slate-300 cursor-not-allowed"}`}
                    >
                      Save
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={appointmentMonth}
                      onChange={(e) => setAppointmentMonth(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((month) => <option key={month} value={month}>{month}</option>)}
                    </select>
                    <select
                      value={appointmentDay}
                      onChange={(e) => setAppointmentDay(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none"
                    >
                      <option value="">Day</option>
                      {DAYS.map((day) => <option key={day} value={String(day)}>{day}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right: Progress + Notes */}
              <div className="space-y-5">
                {/* Progress ring area */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Monthly Treatment Progress</p>

                  <div className="flex items-center gap-6">
                    {/* SVG ring */}
                    <div className="relative flex-shrink-0">
                      <svg width="84" height="84" viewBox="0 0 84 84">
                        <circle cx="42" cy="42" r="36" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="42" cy="42" r="36"
                          fill="none"
                          stroke={progressColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - patient.currentMonthProgress / 100)}`}
                          transform="rotate(-90 42 42)"
                          style={{ transition: "stroke-dashoffset 1s ease" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-slate-900">{patient.currentMonthProgress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-700 font-bold text-sm">{patient.activeTreatment}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {patient.currentMonthProgress === 100
                          ? "Treatment complete ✓"
                          : patient.currentMonthProgress >= 50
                          ? "On track — keep it up"
                          : "Needs attention"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Clinical Notes</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{patient.notes || "No notes added."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Gallery Section ── */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
          <GallerySection
            images={images}
            onDelete={handleDeleteImage}
            onUpload={() => setShowUpload(true)}
          />
        </div>
      </div>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onSave={handleSaveImages} />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── PATIENT LIST (index page) ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const StatCard = ({ label, value, icon, color }) => (
  <div className={`rounded-3xl border bg-white shadow-sm p-5 flex items-center gap-4 ${color.border}`}>
    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${color.bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
    </div>
  </div>
);

const PatientCard = ({ patient, onClick, onEdit, onDelete }) => (
  <div
    className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    onClick={() => onClick(patient.id)}
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {/* Avatar / color header */}
    <div className="h-40 bg-gradient-to-br from-slate-100 to-teal-50 flex items-center justify-center relative overflow-hidden">
      {patient.avatar ? (
        <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
      ) : (
        <div className="h-20 w-20 rounded-3xl bg-white shadow-md flex items-center justify-center border border-slate-200">
          <User size={36} className="text-teal-400" />
        </div>
      )}
      <div className="absolute top-3 right-3">
        <StatusBadge status={patient.status} />
      </div>
      {/* Gallery count badge */}
      {(patient.gallery || []).length > 0 && (
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
          <Image size={9} />
          {(patient.gallery || []).length}
        </div>
      )}
    </div>

    <div className="p-5 flex flex-col flex-1 gap-2.5">
      <h4 className="font-black text-slate-900 text-sm">{patient.name}</h4>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Mail size={11} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Phone size={11} className="text-slate-400 flex-shrink-0" />
          {patient.phone}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Activity size={11} className="text-teal-400 flex-shrink-0" />
          <span className="font-semibold text-slate-700">{patient.activeTreatment}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-1">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
          <span className="text-[10px] font-black text-slate-600">{patient.currentMonthProgress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${patient.currentMonthProgress}%`,
              background: patient.currentMonthProgress === 100 ? "#0ea5e9" : patient.currentMonthProgress >= 50 ? "#10b981" : "#f59e0b"
            }}
          />
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 mt-2 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(patient.id); }}
          className="flex items-center gap-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 text-xs font-bold transition"
        >
          <Eye size={11} />View
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(patient); }}
          className="flex items-center gap-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 px-3 py-1.5 text-xs font-bold transition"
        >
          <Pencil size={11} />Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(patient.id); }}
          className="flex items-center gap-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 text-xs font-bold transition ml-auto"
        >
          <Trash2 size={11} />
        </button>
      </div>
    </div>
  </div>
);

// ─── Edit/Add Modal (compact) ─────────────────────────────────────────────────
const PatientModal = ({ patient, onClose, onSave }) => {
  const [form, setForm] = useState(patient || {
    name: "", email: "", phone: "", activeTreatment: treatmentOptions[0],
    status: "Active", avatar: null, currentMonthProgress: 0, dob: "", notes: "",
    nextAppointmentMonth: "", nextAppointmentDay: ""
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-black text-slate-900">{patient ? "Edit Patient" : "New Patient"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 transition"><X size={18} className="text-slate-500" /></button>
        </div>
        <div className="px-6 py-5 space-y-3 max-h-[65vh] overflow-y-auto">
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Sarah Johnson" },
            { label: "Email", key: "email", type: "email", placeholder: "patient@email.com" },
            { label: "Phone", key: "phone", type: "tel", placeholder: "+1 (555) 123-4567" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">{label}</label>
              <input type={type} value={form[key] || ""} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition" />
            </div>
          ))}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Active Treatment</label>
            <select value={form.activeTreatment} onChange={(e) => setForm((f) => ({ ...f, activeTreatment: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none">
              {treatmentOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Status</label>
            <div className="flex gap-2">
              {["Active","Completed","Missed"].map((s) => (
                <button key={s} onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={`flex-1 rounded-2xl px-3 py-2 text-xs font-bold transition ${form.status === s ? (s === "Active" ? "bg-emerald-500 text-white" : s === "Completed" ? "bg-sky-500 text-white" : "bg-rose-500 text-white") : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Next Appointment</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={form.nextAppointmentMonth}
                  onChange={(e) => setForm((f) => ({ ...f, nextAppointmentMonth: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none"
                >
                  <option value="">Month</option>
                  {MONTHS.map((month) => <option key={month} value={month}>{month}</option>)}
                </select>
              </div>
              <div>
                <select
                  value={form.nextAppointmentDay}
                  onChange={(e) => setForm((f) => ({ ...f, nextAppointmentDay: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none"
                >
                  <option value="">Day</option>
                  {DAYS.map((day) => <option key={day} value={String(day)}>{day}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Notes</label>
            <textarea value={form.notes || ""} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3} placeholder="Clinical notes..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => { if (form.name.trim()) { onSave(form); } }}
            className="rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 text-sm font-bold transition shadow-md shadow-teal-100">
            {patient ? "Save Changes" : "Create Patient"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ROOT APP ─────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [route, setRoute] = useState(null);   // null = list, number = patient id
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    const match = p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.activeTreatment.toLowerCase().includes(q);
    if (filter === "active") return match && p.status === "Active";
    if (filter === "completed") return match && p.status === "Completed";
    if (filter === "missed") return match && p.status === "Missed";
    return match;
  });

  const handleSave = (form) => {
    if (modal === "add") {
      setPatients((prev) => [{ ...form, id: Date.now(), gallery: [] }, ...prev]);
    } else if (modal?.type === "edit") {
      setPatients((prev) => prev.map((p) => p.id === modal.patient.id ? { ...p, ...form } : p));
    }
    setModal(null);
  };

  // ── Profile Route ──
  if (route !== null) {
    return (
      <PatientProfile
        patientId={route}
        patients={patients}
        setPatients={setPatients}
        onBack={() => setRoute(null)}
      />
    );
  }

  // ── List Route ──
  return (
    <div className="min-h-screen bg-[#f4f6fb] px-6 py-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div className="mx-auto max-w-[1440px] space-y-7">

        {/* Page header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Patients</h1>
            <p className="text-slate-500 text-sm mt-1">View patient records, track treatments and progress photos</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Patients" value={patients.length} icon={<Users size={20} className="text-sky-600" />} color={{ border: "border-slate-200", bg: "bg-sky-50" }} />
          <StatCard label="Active" value={patients.filter(p=>p.status==="Active").length} icon={<CheckCircle size={20} className="text-emerald-600" />} color={{ border: "border-slate-200", bg: "bg-emerald-50" }} />
          <StatCard label="Completed" value={patients.filter(p=>p.status==="Completed").length} icon={<Clock size={20} className="text-violet-600" />} color={{ border: "border-slate-200", bg: "bg-violet-50" }} />
          <StatCard label="Showing" value={filtered.length} icon={<Eye size={20} className="text-amber-600" />} color={{ border: "border-slate-200", bg: "bg-amber-50" }} />
        </div>

        {/* Controls */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by name, email or treatment…"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[["all","All"],["active","Active"],["completed","Completed"],["missed","Missed"]].map(([k,l])=>(
                <button key={k} onClick={()=>setFilter(k)}
                  className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition ${filter===k ? "bg-teal-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {l}
                </button>
              ))}
            </div>
            <button onClick={()=>setModal("add")}
              className="ml-auto flex items-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 text-xs font-black shadow-md shadow-teal-100 transition">
              <Plus size={14} />New Patient
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-white py-24 text-slate-300">
            <XCircle size={40} />
            <p className="text-sm font-semibold text-slate-400">No patients found</p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-3 lg:grid-cols-2">
            {filtered.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onClick={(id) => setRoute(id)}
                onEdit={(p) => setModal({ type: "edit", patient: p })}
                onDelete={(id) => setPatients((prev) => prev.filter((p) => p.id !== id))}
              />
            ))}
          </div>
        )}
      </div>

      {modal === "add" && <PatientModal patient={null} onClose={()=>setModal(null)} onSave={handleSave} />}
      {modal?.type === "edit" && <PatientModal patient={modal.patient} onClose={()=>setModal(null)} onSave={handleSave} />}
    </div>
  );
}