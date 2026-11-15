import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Badge from '../ui/Badge.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import TaskList from '../tasks/TaskList.jsx';
import { dayLabel, fromISO, weekRangeLabel } from '../../utils/date.js';
import { groupByDate, weekStats } from '../../utils/tasks.js';

/** Collapsible card for one week: open / completed counts, progress, and tasks grouped by day. */
export default function WeekCard({ id, mondayISO, tasks, isCurrent, expanded, onToggle }) {
  const stats = weekStats(tasks);
  const groups = groupByDate(tasks);

  return (
    <div id={id} className="rounded-xl border border-line bg-surface shadow-card">
      <button type="button" aria-expanded={expanded} onClick={onToggle} className="w-full p-4 text-left">
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold tabular-nums">
            {weekRangeLabel(fromISO(mondayISO))}
            {isCurrent && <Badge>This week</Badge>}
          </span>
          <ChevronDown size={20} className={clsx('text-muted transition-transform', expanded && 'rotate-180')} aria-hidden />
        </span>
        <span className="mt-3 flex items-center gap-4 text-xs tabular-nums">
          <span><b className="text-[15px] font-semibold">{stats.open}</b> <span className="text-muted">Open</span></span>
          <span><b className="text-[15px] font-semibold">{stats.completed}</b> <span className="text-muted">Completed</span></span>
        </span>
        <ProgressBar value={stats.percent} label="Week progress" className="mt-3" />
      </button>

      {expanded && (
        <div className="border-t border-line px-4 pb-3">
          {tasks.length === 0 ? (
            <p className="py-4 text-[12.5px] text-muted">No tasks this week.</p>
          ) : (
            Object.keys(groups)
              .sort()
              .map((date) => (
                <div key={date}>
                  <p className="mb-1 mt-3 text-[11.5px] font-medium text-muted">{dayLabel(fromISO(date))}</p>
                  <TaskList tasks={groups[date]} />
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}
