const baseInputClass =
  'w-full px-3.5 py-2.5 border rounded-xl text-sm font-medium text-slate-800 bg-[#f8fbfe] outline-none transition-all duration-200 focus:border-[#1e7fcb] focus:ring-2 focus:ring-[#1e7fcb]/10 focus:bg-white';

export const inputClassName = (error = false) => `${baseInputClass} ${error ? 'border-[#e24b4a]' : 'border-[#e2eaf3]'}`;

export const selectClassName = (error = false) => `${inputClassName(error)} cursor-pointer appearance-none`;
