import { forwardRef, useId } from 'react';
import clsx from 'clsx';

const FIELD =
  'w-full min-w-0 rounded-[10px] border bg-bg px-3.5 py-[11px] text-[14px] text-fg placeholder:text-muted/70 ' +
  'focus:border-transparent focus:outline focus:outline-2 focus:outline-primary';

function Field({ label, error, required, hint, id, children }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[11.5px] text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1 text-[11.5px] text-muted">{hint}</p>
      )}
    </div>
  );
}

/** Text input. Supports label, error text and an optional right-hand icon. */
const Input = forwardRef(function Input({ label, error, required, hint, icon: Icon, className, id, ...props }, ref) {
  const auto = useId();
  const fieldId = id || auto;
  return (
    <Field label={label} error={error} required={required} hint={hint} id={fieldId}>
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={clsx(FIELD, error ? 'border-danger' : 'border-line', Icon && 'pr-10', className)}
          {...props}
        />
        {Icon && <Icon size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />}
      </div>
    </Field>
  );
});

export const Textarea = forwardRef(function Textarea({ label, error, required, hint, className, id, rows = 3, ...props }, ref) {
  const auto = useId();
  const fieldId = id || auto;
  return (
    <Field label={label} error={error} required={required} hint={hint} id={fieldId}>
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={!!error}
        className={clsx(FIELD, 'resize-none', error ? 'border-danger' : 'border-line', className)}
        {...props}
      />
    </Field>
  );
});

export default Input;
