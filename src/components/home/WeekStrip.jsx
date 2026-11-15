import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IconButton from '../ui/IconButton.jsx';
import { DAYS_SHORT, MONTHS, dayLabel, isSameDay, mondayOf, toISO, weekDays, weekRangeLabel } from '../../utils/date.js';

/** Mon–Sun selector with previous / next week arrows. A dot marks days that have tasks. */
export default function WeekStrip({ selected, today, taskDates, onSelect, onShiftWeek }) {
  const days = weekDays(selected);
  const monday = mondayOf(selected);
  return (
    <section aria-label="Week">
      <div className="flex items-center justify-between">
        <IconButton icon={ChevronLeft} label="Previous week" size={20} className="-ml-2" onClick={() => onShiftWeek(-1)} />
        <p className="text-[13px] font-medium tabular-nums">
          {MONTHS[monday.getMonth()]} {monday.getFullYear()} <span className="font-normal text-muted">· {weekRangeLabel(monday)}</span>
        </p>
        <IconButton icon={ChevronRight} label="Next week" size={20} className="-mr-2" onClick={() => onShiftWeek(1)} />
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((d) => {
          const on = isSameDay(d, selected);
          const isToday = isSameDay(d, today);
          const has = taskDates.has(toISO(d));
          return (
            <button
              key={toISO(d)}
              type="button"
              aria-pressed={on}
              aria-label={dayLabel(d)}
              onClick={() => onSelect(d)}
              className={clsx('flex flex-col items-center gap-1 rounded-md py-2 transition-colors', on ? 'bg-primary text-primary-fg' : 'hover:bg-primary-soft')}
            >
              <span className={clsx('text-[10px]', !on && 'text-muted')}>{DAYS_SHORT[d.getDay()]}</span>
              <span className={clsx('text-[15px] font-medium tabular-nums', isToday && !on && 'text-primary')}>{d.getDate()}</span>
              <span className={clsx('h-1 w-1 rounded-full', has ? (on ? 'bg-primary-fg' : 'bg-primary') : 'bg-transparent')} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
