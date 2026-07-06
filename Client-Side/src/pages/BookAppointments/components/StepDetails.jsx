import { Field } from './FormPrimitives';
import { inputClassName } from './formClasses';

const StepDetails = ({ data, errors, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="First name" error={errors.fname}>
        <input className={inputClassName(errors.fname)} value={data.fname} onChange={(e) => onChange('fname', e.target.value)} placeholder="Riya" />
      </Field>
      <Field label="Last name">
        <input className={inputClassName()} value={data.lname} onChange={(e) => onChange('lname', e.target.value)} placeholder="Sharma" />
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Phone number" error={errors.phone}>
        <input
          className={inputClassName(errors.phone)}
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+91 98765 43210"
          type="tel"
        />
      </Field>
      <Field label="Age">
        <input className={inputClassName()} value={data.age} onChange={(e) => onChange('age', e.target.value)} placeholder="28" type="number" min="1" max="120" />
      </Field>
    </div>
    <Field label="Email address (optional)">
      <input className={inputClassName()} value={data.email} onChange={(e) => onChange('email', e.target.value)} placeholder="riya@email.com" type="email" />
    </Field>
  </div>
);

export default StepDetails;

