import clsx from 'clsx';
import { Check } from 'lucide-react';

/** Square checkbox button used for task completion. */
export default function Checkbox({ checked, onChange, label, className }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      data-no-swipe
      className={clsx('-m-1 grid place-items-center p-2', className)}
    >
      <span
        className={clsx(
          'grid h-[22px] w-[22px] place-items-center rounded-md border-[1.5px] border-primary text-primary-fg transition-colors',
          checked && 'bg-primary'
        )}
      >
        {checked && <Check size={14} strokeWidth={3} aria-hidden />}
      </span>
    </button>
  );
}
