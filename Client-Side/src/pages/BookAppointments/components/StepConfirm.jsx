import { CheckCircle } from 'lucide-react';
import { APPOINTMENT_FEE } from '../constants';
import { formatDate } from '../utils';

const StepConfirm = ({ details, schedule, generatedTxn }) => {
  const rows = [
    { key: 'Patient', value: `${details.fname} ${details.lname}`.trim() || '-' },
    { key: 'Phone', value: details.phone || '-' },
    {
      key: 'Date & time',
      value: schedule.date ? `${formatDate(schedule.date)} | ${schedule.time}` : '-',
    },
    { key: 'Service', value: schedule.service || 'General consultation' },
    { key: 'Amount paid', value: `Rs ${APPOINTMENT_FEE}`, green: true },
  ];

  return (
    <div className="text-center py-4 space-y-5">
      <div className="w-16 h-16 rounded-full bg-[#e1f5ee] mx-auto flex items-center justify-center">
        <CheckCircle size={32} className="text-[#0f6e56]" />
      </div>

      <div>
        <h2 className="font-black text-2xl text-slate-900 tracking-tight">Booking confirmed!</h2>
        <p className="text-sm text-[#475569] mt-1 leading-relaxed">
          Your appointment request is received.
          <br />
          We&apos;ll call to confirm your slot within 2-4 hours.
        </p>
      </div>

      <div className="bg-white border border-[#e2eaf3] rounded-2xl p-5 text-left max-w-sm mx-auto divide-y divide-[#e2eaf3]">
        {rows.map((row) => (
          <div key={row.key} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
            <span className="text-xs text-[#94a3b8] font-medium">{row.key}</span>
            <span className={`text-xs font-semibold ${row.green ? 'text-[#0f6e56]' : 'text-[#0f172a]'}`}>{row.value}</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#94a3b8]">Txn ID: {generatedTxn}</p>
    </div>
  );
};

export default StepConfirm;
