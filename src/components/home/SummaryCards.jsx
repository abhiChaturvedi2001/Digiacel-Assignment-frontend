import { Check, X } from 'lucide-react';

function Card({ icon: Icon, label, value, tone }) {
  const styles =
    tone === 'ok'
      ? { wrap: 'bg-primary-soft', box: 'border-primary text-primary' }
      : { wrap: 'bg-danger-soft', box: 'border-danger text-danger' };
  return (
    <div className={`rounded-lg p-4 ${styles.wrap}`}>
      <div className="flex items-center gap-2">
        <span className={`grid h-5 w-5 place-items-center rounded border ${styles.box}`}>
          <Icon size={12} strokeWidth={3} aria-hidden />
        </span>
        <span className="text-[11.5px] text-muted">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold leading-none tabular-nums">
        {String(value).padStart(2, '0')} <span className="text-[10px] font-normal text-muted">This Week</span>
      </p>
    </div>
  );
}

export default function SummaryCards({ completed, open }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card icon={Check} label="Task Complete" value={completed} tone="ok" />
      <Card icon={X} label="Task Pending" value={open} tone="pending" />
    </div>
  );
}
