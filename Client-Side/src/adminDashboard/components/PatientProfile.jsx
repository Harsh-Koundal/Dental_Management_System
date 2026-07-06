import React, { useState } from "react";
import { Activity, ArrowLeft, Calendar, Mail, Phone, User } from "lucide-react";
import GallerySection from "./GallerySection";
import StatusBadge from "./StatusBadge";
import UploadModal from "./UploadModal";

export default function PatientProfile({ patientId, patients, setPatients, onBack }) {
  const [showUpload, setShowUpload] = useState(false);
  const patient = patients.find((item) => item.id === patientId);

  if (!patient) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 font-semibold">Patient not found</p>
        <button onClick={onBack} className="text-teal-600 font-bold underline text-sm">← Back</button>
      </div>
    );
  }

  const images = patient.gallery || [];

  const handleSaveImages = (newImages) => {
    setPatients((prev) => prev.map((item) => item.id === patient.id ? { ...item, gallery: [...(item.gallery || []), ...newImages] } : item));
    setShowUpload(false);
  };

  const handleDeleteImage = (image) => {
    setPatients((prev) => prev.map((item) => item.id === patient.id ? { ...item, gallery: (item.gallery || []).filter((img) => img !== image) } : item));
  };

  const progressColor = patient.currentMonthProgress === 100 ? "#0ea5e9" : patient.currentMonthProgress >= 50 ? "#10b981" : "#f59e0b";

  return (
    <div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute bottom-0 right-8 opacity-10">
              <Activity size={120} strokeWidth={1} className="text-white" />
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-wrap items-end justify-between gap-4 -mt-14 mb-6">
              <div className="h-28 w-28 rounded-3xl border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                {patient.avatar ? (
                  <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <User size={40} className="text-teal-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase">No Photo</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 pb-2">
                <StatusBadge status={patient.status} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{patient.name}</h2>
                <p className="text-slate-500 text-sm mt-0.5 mb-5">Patient ID #{patient.id.toString().padStart(4, "0")}</p>

                <div className="space-y-3">
                  {[
                    { icon: <Mail size={14} className="text-teal-500" />, label: "Email", val: patient.email },
                    { icon: <Phone size={14} className="text-teal-500" />, label: "Phone", val: patient.phone },
                    { icon: <Activity size={14} className="text-teal-500" />, label: "Treatment", val: patient.activeTreatment },
                    { icon: <Calendar size={14} className="text-teal-500" />, label: "Date of Birth", val: patient.dob },
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
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Monthly Treatment Progress</p>
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <svg width="84" height="84" viewBox="0 0 84 84">
                        <circle cx="42" cy="42" r="36" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="42"
                          cy="42"
                          r="36"
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

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Clinical Notes</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{patient.notes || "No notes added."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
          <GallerySection images={images} onDelete={handleDeleteImage} onUpload={() => setShowUpload(true)} />
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSave={handleSaveImages} />}
    </div>
  );
}
