import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Pencil, Trash2 } from 'lucide-react';
import Checkbox from '../ui/Checkbox.jsx';
import IconButton from '../ui/IconButton.jsx';
import { PriorityBadge } from '../ui/Badge.jsx';
import { dayLabel, fromISO, timeRange } from '../../utils/date.js';
import { isDone } from '../../utils/tasks.js';

const REVEAL = 84; // px of the red Delete button shown after a swipe

/**
 * One task row. Swipe left to reveal Delete (touch and mouse).
 * Props: task, showDate, onOpen(id), onToggle(id), onEdit(id), onDelete(id)
 */
export default function TaskRow({ task, showDate = false, onOpen, onToggle, onEdit, onDelete }) {
  const done = isDone(task);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const swiped = useRef(false);

  const meta = [showDate && dayLabel(fromISO(task.date)), timeRange(task)].filter(Boolean).join(' · ');

  const onPointerDown = (e) => {
    if (e.target.closest('[data-no-swipe]')) return;
    gesture.current = { x: e.clientX, y: e.clientY, base: x, lock: null };
  };

  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.lock && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) g.lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (g.lock !== 'x') return;
    setDragging(true);
    setX(Math.max(-REVEAL, Math.min(0, g.base + dx)));
  };

  const endGesture = () => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || g.lock !== 'x') return;
    setDragging(false);
    setX(x < -REVEAL / 2 ? -REVEAL : 0);
    swiped.current = true;
    setTimeout(() => (swiped.current = false), 60);
  };

  const openDetail = () => {
    if (swiped.current) return;
    if (x < 0) return setX(0); // tap on an open row just closes it
    onOpen?.(task._id);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <button
        type="button"
        data-no-swipe
        onClick={() => onDelete?.(task._id)}
        aria-label={`Delete ${task.title}`}
        tabIndex={x < 0 ? 0 : -1}
        className="absolute inset-y-0 right-0 flex flex-col items-center justify-center gap-0.5 bg-danger text-[11px] font-medium text-white"
        style={{ width: REVEAL }}
      >
        <Trash2 size={20} aria-hidden />
        Delete
      </button>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        className={clsx('relative flex touch-pan-y items-center gap-3 bg-surface py-3 pl-1 pr-1', !dragging && 'transition-transform duration-200')}
        style={{ transform: `translateX(${x}px)` }}
      >
        <Checkbox checked={done} onChange={() => onToggle?.(task._id)} label={done ? 'Mark as in progress' : 'Mark as completed'} />

        <button type="button" onClick={openDetail} className="min-w-0 flex-1 text-left">
          <span className={clsx('block truncate text-sm font-medium', done && 'text-muted line-through')}>{task.title}</span>
          <span className="mt-0.5 flex flex-wrap items-center gap-2">
            {meta && <span className="text-[11.5px] tabular-nums text-muted">{meta}</span>}
            <PriorityBadge priority={task.priority} />
          </span>
        </button>

        <IconButton icon={Trash2} label={`Delete ${task.title}`} tone="danger" data-no-swipe onClick={() => onDelete?.(task._id)} />
        <IconButton icon={Pencil} label={`Edit ${task.title}`} data-no-swipe onClick={() => onEdit?.(task._id)} />
      </div>
    </div>
  );
}
