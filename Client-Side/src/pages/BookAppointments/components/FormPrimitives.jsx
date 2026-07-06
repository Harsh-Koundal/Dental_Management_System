import { AlertCircle } from 'lucide-react';

export function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="text-[11px] text-[#a32d2d] mt-1 flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}
