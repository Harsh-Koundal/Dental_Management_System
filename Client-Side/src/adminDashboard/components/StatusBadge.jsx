import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const map = {
    Active:    { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle size={10} /> },
    Completed: { bg: "bg-sky-100 text-sky-700 border-sky-200", icon: <Clock size={10} /> },
    Missed:    { bg: "bg-rose-100 text-rose-600 border-rose-200", icon: <AlertCircle size={10} /> },
  };

  const style = map[status] || { bg: "bg-slate-100 text-slate-500 border-slate-200", icon: null };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${style.bg}`}>
      {style.icon}
      {status}
    </span>
  );
}
