import clsx from 'clsx';

export default function ProgressBar({ value, thick = false, label = 'Progress', className }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={clsx('overflow-hidden bg-track', thick ? 'h-4 rounded-sm' : 'h-1.5 rounded-full', className)}
    >
      <div className="h-full bg-deep transition-[width] duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}
