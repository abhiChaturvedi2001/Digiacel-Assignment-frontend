import clsx from 'clsx';
import { CalendarDays, Clock, X } from 'lucide-react';
import Badge, { PriorityBadge } from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import IconButton from '../ui/IconButton.jsx';
import { dayLabel, fromISO, timeRange } from '../../utils/date.js';
import { isDone } from '../../utils/tasks.js';

function InfoRow({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3 text-[13px] tabular-nums">
      <Icon size={18} className="mt-0.5 text-muted" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

export default function TaskDetail({ task, onClose, onToggle, onEdit, onDelete }) {
  const done = isDone(task);
  const range = timeRange(task);
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className={clsx('break-words text-[17px] font-semibold', done && 'text-muted line-through')}>{task.title}</h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Badge tone={done ? 'primary' : 'danger'}>{done ? 'Completed' : 'In Progress'}</Badge>
            <PriorityBadge priority={task.priority} />
          </div>
        </div>
        <IconButton icon={X} label="Close" tone="plain" size={20} className="-mr-2" onClick={onClose} />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <InfoRow icon={CalendarDays}>{dayLabel(fromISO(task.date))}</InfoRow>
        {range && <InfoRow icon={Clock}>{range}</InfoRow>}
      </div>

      <div className="mt-5">
        <p className="mb-1.5 text-xs font-medium text-muted">Description</p>
        <p className={clsx('whitespace-pre-wrap break-words text-[13px]', !task.description && 'text-muted')}>
          {task.description || 'No description.'}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="secondary" size="md" fullWidth className="col-span-2" onClick={onToggle}>
          {done ? 'Mark as In Progress' : 'Mark as Completed'}
        </Button>
        <Button size="md" onClick={onEdit}>Edit</Button>
        <Button variant="danger" size="md" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}
