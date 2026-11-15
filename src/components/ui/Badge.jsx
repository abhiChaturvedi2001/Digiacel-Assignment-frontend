import clsx from 'clsx';

const TONES = {
  low: 'bg-success/15 text-success',
  medium: 'bg-warning/15 text-warning',
  high: 'bg-danger/15 text-danger',
  primary: 'bg-primary-soft text-primary',
  danger: 'bg-danger-soft text-danger',
};

export default function Badge({ tone = 'primary', className, children }) {
  return (
    <span className={clsx('inline-block rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-wide', TONES[tone], className)}>
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  if (!priority) return null;
  return <Badge tone={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
}
