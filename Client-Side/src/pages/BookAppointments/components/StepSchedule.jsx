import { SERVICES, TIME_SLOTS } from '../constants';
import { todayStr } from '../utils';
import { Field } from './FormPrimitives';
import { inputClassName, selectClassName } from './formClasses';

const StepSchedule = ({ data, errors, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Preferred date" error={errors.date}>
        <input className={inputClassName(errors.date)} type="date" min={todayStr()} value={data.date} onChange={(e) => onChange('date', e.target.value)} />
      </Field>
      <Field label="Time slot" error={errors.time}>
        <select className={selectClassName(errors.time)} value={data.time} onChange={(e) => onChange('time', e.target.value)}>
          <option value="">Select time</option>
          {TIME_SLOTS.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </Field>
    </div>
    <Field label="Treatment / reason for visit">
      <select className={selectClassName()} value={data.service} onChange={(e) => onChange('service', e.target.value)}>
        <option value="">Select a service</option>
        {SERVICES.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
    </Field>
    <Field label="Notes for the doctor (optional)">
      <textarea
        className={`${inputClassName()} resize-none h-20 leading-relaxed`}
        value={data.notes}
        onChange={(e) => onChange('notes', e.target.value)}
        placeholder="Any symptoms, allergies, concerns, or questions..."
      />
    </Field>
  </div>
);

export default StepSchedule;

