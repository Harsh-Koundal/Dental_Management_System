import React from "react";
import { Activity, Mail, Phone, User, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function PatientCard({ patient, onClick, onEdit, onDelete }) {
  return (
    <div
      className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onClick={() => onClick(patient.id)}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
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

        {(patient.gallery || []).length > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
            <Activity size={9} />
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
                background: patient.currentMonthProgress === 100 ? "#0ea5e9" : patient.currentMonthProgress >= 50 ? "#10b981" : "#f59e0b",
              }}
            />
          </div>
        </div>

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
}
