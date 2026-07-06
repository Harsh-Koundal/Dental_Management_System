import { Check } from 'lucide-react';

const steps = ['Details', 'Schedule', 'Payment', 'Confirmed'];

const ProgressBar = ({ current }) => (
  <div className="flex items-center mb-10">
    {steps.map((label, index) => {
      const stepNumber = index + 1;
      const done = stepNumber < current;
      const active = stepNumber === current;

      return (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done
                  ? 'bg-[#0f6e56] text-white'
                  : active
                    ? 'bg-[#1e7fcb] text-white'
                    : 'bg-white border-2 border-[#e2eaf3] text-[#94a3b8]'
              }`}
            >
              {done ? <Check size={14} /> : stepNumber}
            </div>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                done ? 'text-[#0f6e56]' : active ? 'text-[#1e7fcb]' : 'text-[#94a3b8]'
              }`}
            >
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${done ? 'bg-[#0f6e56]' : 'bg-[#e2eaf3]'}`} />
          )}
        </div>
      );
    })}
  </div>
);

export default ProgressBar;
