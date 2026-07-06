import React from "react";

export default function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-3xl border bg-white shadow-sm p-5 flex items-center gap-4 ${color.border}`}>
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${color.bg}`}>
        <span className={`h-3 w-3 rounded-full ${color.dot}`} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}
