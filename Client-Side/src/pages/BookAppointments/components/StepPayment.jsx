import { AlertCircle, Check, CreditCard, Globe, Loader2, Shield, Smartphone } from 'lucide-react';
import { APPOINTMENT_FEE, BANKS, UPI_APPS } from '../constants';
import { Field } from './FormPrimitives';
import { inputClassName, selectClassName } from './formClasses';

const methods = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Debit / Credit card', icon: CreditCard },
  { id: 'net', label: 'Net banking', icon: Globe },
];

const formatCard = (value) => value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1  ').trim();
const formatExpiry = (value) => {
  const sanitized = value.replace(/\D/g, '');
  return sanitized.length >= 3 ? `${sanitized.substring(0, 2)} / ${sanitized.substring(2, 4)}` : sanitized;
};

const StepPayment = ({
  payMethod,
  setPayMethod,
  payData,
  setPayData,
  upiStatus,
  onVerifyUpi,
  selectedUpiApp,
  setSelectedUpiApp,
  errors,
}) => (
  <div className="space-y-5">
    <div className="flex items-center justify-between bg-[#e8f4fd] border border-[#b5d4f4] rounded-xl px-4 py-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#185fa5]">Appointment booking fee</p>
        <p className="text-[11px] text-[#378add] mt-0.5">This amount is adjusted against your treatment cost</p>
      </div>
      <p className="text-2xl font-black text-[#185fa5]">Rs {APPOINTMENT_FEE}</p>
    </div>

    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-2">Choose payment method</p>
      <div className="grid grid-cols-3 gap-2">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPayMethod(method.id)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-center transition-all duration-200 ${
                payMethod === method.id ? 'border-[#1e7fcb] bg-[#e8f4fd]' : 'border-[#e2eaf3] bg-white hover:border-[#1e7fcb]/40'
              }`}
            >
              <span className={payMethod === method.id ? 'text-[#1e7fcb]' : 'text-[#94a3b8]'}>
                <Icon size={20} />
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${
                  payMethod === method.id ? 'text-[#185fa5]' : 'text-[#475569]'
                }`}
              >
                {method.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    {payMethod === 'upi' && (
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Pay via app</p>
        <div className="flex flex-wrap gap-2">
          {UPI_APPS.map((app) => (
            <button
              key={app}
              type="button"
              onClick={() => {
                setSelectedUpiApp(app);
                setPayData({ ...payData, upiId: '' });
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                selectedUpiApp === app ? 'border-[#1e7fcb] bg-[#e8f4fd] text-[#185fa5]' : 'border-[#e2eaf3] text-[#475569] hover:border-[#1e7fcb]'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
        <div className="border-t border-[#e2eaf3] pt-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1.5">Or enter UPI ID manually</p>
          <div className="flex gap-2">
            <input
              className={`${inputClassName()} flex-1`}
              placeholder="yourname@upi"
              value={payData.upiId || ''}
              onChange={(e) => {
                setPayData({ ...payData, upiId: e.target.value });
                setSelectedUpiApp('');
              }}
            />
            <button
              type="button"
              onClick={onVerifyUpi}
              className="px-4 py-2 bg-[#1e7fcb] text-white rounded-xl text-xs font-bold hover:bg-[#2d8fd9] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {upiStatus === 'loading' ? <Loader2 size={13} className="animate-spin" /> : 'Verify'}
            </button>
          </div>
          {upiStatus === 'ok' && (
            <p className="text-xs text-[#0f6e56] mt-1.5 flex items-center gap-1">
              <Check size={12} />
              UPI ID verified successfully
            </p>
          )}
          {upiStatus === 'err' && (
            <p className="text-xs text-[#a32d2d] mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} />
              Invalid UPI ID. Format: name@bank
            </p>
          )}
        </div>
      </div>
    )}

    {payMethod === 'card' && (
      <div className="space-y-3">
        <Field label="Card number" error={errors.cardNum}>
          <input
            className={inputClassName(errors.cardNum)}
            placeholder="1234  5678  9012  3456"
            maxLength={19}
            value={payData.cardNum || ''}
            onChange={(e) => setPayData({ ...payData, cardNum: formatCard(e.target.value) })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry (MM / YY)" error={errors.cardExp}>
            <input
              className={inputClassName(errors.cardExp)}
              placeholder="08 / 27"
              maxLength={7}
              value={payData.cardExp || ''}
              onChange={(e) => setPayData({ ...payData, cardExp: formatExpiry(e.target.value) })}
            />
          </Field>
          <Field label="CVV" error={errors.cardCvv}>
            <input
              className={inputClassName(errors.cardCvv)}
              placeholder="***"
              maxLength={3}
              type="password"
              value={payData.cardCvv || ''}
              onChange={(e) => setPayData({ ...payData, cardCvv: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Name on card">
          <input
            className={inputClassName()}
            placeholder="RIYA SHARMA"
            value={payData.cardName || ''}
            onChange={(e) => setPayData({ ...payData, cardName: e.target.value })}
          />
        </Field>
      </div>
    )}

    {payMethod === 'net' && (
      <div className="space-y-3">
        <Field label="Select your bank" error={errors.bank}>
          <select className={selectClassName(errors.bank)} value={payData.bank || ''} onChange={(e) => setPayData({ ...payData, bank: e.target.value })}>
            <option value="">Choose bank</option>
            {BANKS.map((bank) => (
              <option key={bank}>{bank}</option>
            ))}
          </select>
        </Field>
        <div className="bg-[#faeeda] border border-[#fac775] rounded-xl p-3 text-xs text-[#854f0b] leading-relaxed">
          You&apos;ll be securely redirected to your bank&apos;s login page to complete the Rs 100 payment.
        </div>
      </div>
    )}

    <div className="flex items-center justify-center gap-1.5 pt-1">
      <Shield size={13} className="text-[#94a3b8]" />
      <p className="text-[11px] text-[#94a3b8]">256-bit SSL | Powered by Razorpay | PCI DSS compliant</p>
    </div>
  </div>
);

export default StepPayment;

