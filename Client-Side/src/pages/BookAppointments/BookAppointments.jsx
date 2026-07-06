import { useState } from 'react';
import { ArrowLeft, ChevronRight, CreditCard } from 'lucide-react';
import AppointmentSidebar from './components/AppointmentSidebar';
import ProgressBar from './components/ProgressBar';
import StepConfirm from './components/StepConfirm';
import StepDetails from './components/StepDetails';
import StepPayment from './components/StepPayment';
import StepSchedule from './components/StepSchedule';
import { APPOINTMENT_FEE, STEP_CONTENT } from './constants';
import { generateTxnId } from './utils';

const BookAppointments = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [generatedTxn, setGeneratedTxn] = useState('');

  const [details, setDetails] = useState({ fname: '', lname: '', phone: '', age: '', email: '' });
  const [schedule, setSchedule] = useState({ date: '', time: '', service: '', notes: '' });
  const [payMethod, setPayMethod] = useState('upi');
  const [payData, setPayData] = useState({});
  const [upiStatus, setUpiStatus] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');

  const detailChange = (key, value) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const scheduleChange = (key, value) => {
    setSchedule((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!details.fname.trim()) nextErrors.fname = 'First name is required';
      if (!details.phone.trim()) nextErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!schedule.date) nextErrors.date = 'Please select a date';
      if (!schedule.time) nextErrors.time = 'Please select a time slot';
    }

    if (step === 3) {
      if (payMethod === 'card') {
        if (!payData.cardNum) nextErrors.cardNum = 'Card number required';
        if (!payData.cardExp) nextErrors.cardExp = 'Expiry required';
        if (!payData.cardCvv) nextErrors.cardCvv = 'CVV required';
      }

      if (payMethod === 'net' && !payData.bank) nextErrors.bank = 'Please select a bank';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 3) setGeneratedTxn(generateTxnId());
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const verifyUpi = () => {
    const id = payData.upiId || '';
    setUpiStatus('loading');
    setTimeout(() => setUpiStatus(id.includes('@') ? 'ok' : 'err'), 900);
  };

  const stepContent = STEP_CONTENT[step];

  return (
    <div className="mt-16 min-h-screen bg-[#f8fbfe]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">
        <AppointmentSidebar />

        <div className="bg-white border border-[#e2eaf3] rounded-3xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(30,127,203,0.08)]">
          <ProgressBar current={step} />

          {step < 4 && (
            <div className="mb-6">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{stepContent.title}</h2>
              <p className="text-xs text-[#94a3b8] mt-0.5">{stepContent.subtitle}</p>
            </div>
          )}

          {step === 1 && <StepDetails data={details} errors={errors} onChange={detailChange} />}
          {step === 2 && <StepSchedule data={schedule} errors={errors} onChange={scheduleChange} />}
          {step === 3 && (
            <StepPayment
              payMethod={payMethod}
              setPayMethod={setPayMethod}
              payData={payData}
              setPayData={setPayData}
              upiStatus={upiStatus}
              onVerifyUpi={verifyUpi}
              selectedUpiApp={selectedUpiApp}
              setSelectedUpiApp={setSelectedUpiApp}
              errors={errors}
            />
          )}
          {step === 4 && <StepConfirm details={details} schedule={schedule} generatedTxn={generatedTxn} />}

          {step < 4 && (
            <div className={`flex gap-3 mt-6 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#e2eaf3] text-sm font-semibold text-[#475569] hover:bg-[#f8fbfe] transition-colors"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              )}

              <button
                type="button"
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e7fcb] text-white text-sm font-bold hover:bg-[#2d8fd9] active:scale-[.98] transition-all"
              >
                {step === 3 ? (
                  <>
                    <CreditCard size={15} />
                    Pay Rs {APPOINTMENT_FEE} & Confirm
                  </>
                ) : (
                  <>
                    Continue <ChevronRight size={15} />
                  </>
                )}
              </button>
            </div>
          )}

          {step < 4 && <p className="text-center text-[10px] text-[#94a3b8] mt-4">Step {step} of 3</p>}
        </div>
      </div>
    </div>
  );
};

export default BookAppointments;
