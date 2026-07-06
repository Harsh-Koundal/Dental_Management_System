import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { treatmentOptions } from "../constants";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  activeTreatment: treatmentOptions[0],
  status: "Active",
  avatar: null,
  currentMonthProgress: 0,
  dob: "",
  notes: "",
};

export default function PatientModal({ patient, onClose, onSave }) {
  const [form, setForm] = useState(patient || defaultForm);

  useEffect(() => {
    setForm(patient || defaultForm);
  }, [patient]);

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
            { label: "Date of Birth", key: "dob", type: "date", placeholder: "" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">{label}</label>
              <input
                type={type}
                value={form[key] || ""}
                onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
            </div>
          ))}

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Active Treatment</label>
            <select
              value={form.activeTreatment}
              onChange={(event) => setForm((prev) => ({ ...prev, activeTreatment: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition appearance-none"
            >
              {treatmentOptions.map((treatment) => <option key={treatment}>{treatment}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Status</label>
            <div className="flex gap-2">
              {['Active', 'Completed', 'Missed'].map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setForm((prev) => ({ ...prev, status }))}
                  className={`flex-1 rounded-2xl px-3 py-2 text-xs font-bold transition ${form.status === status ? (status === 'Active' ? 'bg-emerald-500 text-white' : status === 'Completed' ? 'bg-sky-500 text-white' : 'bg-rose-500 text-white') : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Notes</label>
            <textarea
              value={form.notes || ""}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              rows={3}
              placeholder="Clinical notes..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button
            type="button"
            onClick={() => {
              if (form.name.trim()) {
                onSave(form);
              }
            }}
            className="rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 text-sm font-bold transition shadow-md shadow-teal-100"
          >
            {patient ? "Save Changes" : "Create Patient"}
          </button>
        </div>
      </div>
    </div>
  );
}
