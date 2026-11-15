import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import useWeekPlanner from '../hooks/useWeekPlanner.js';
import useSheets from '../hooks/useSheets.js';
import WeekStrip from '../components/home/WeekStrip.jsx';
import SummaryCards from '../components/home/SummaryCards.jsx';
import WeekCard from '../components/home/WeekCard.jsx';
import AddTaskFab from '../components/home/AddTaskFab.jsx';
import TaskList from '../components/tasks/TaskList.jsx';
import EmptyState from '../components/tasks/EmptyState.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { dayLabel, toISO } from '../utils/date.js';

export default function Home() {
  const navigate = useNavigate();
  const { openForm } = useSheets();
  const p = useWeekPlanner();

  const viewAll = () => {
    const key = p.expandSelectedWeek();
    requestAnimationFrame(() => document.getElementById(`week-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <main className="gutter pb-32 pt-5">
        <header>
          <p className="text-[11.5px] text-muted">
            {p.isToday ? 'Today · ' : ''}
            {dayLabel(p.selected)}
          </p>
          <h1 className="text-xl font-semibold leading-tight">My Tasks</h1>
        </header>

        <button
          type="button"
          onClick={() => navigate('/search')}
          className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[13px] text-muted"
        >
          <span>Search for a task</span>
          <Search size={18} className="text-fg" aria-hidden />
        </button>

        <div className="mt-5">
          <WeekStrip selected={p.selected} today={p.today} taskDates={p.taskDates} onSelect={p.setSelected} onShiftWeek={p.shiftWeek} />
        </div>

        {p.error ? (
          <div className="mt-6 rounded-xl border border-line bg-surface p-5 text-center">
            <p className="text-[13px] font-medium">Could not load your tasks</p>
            <p className="mt-1 text-xs text-muted">{p.error}</p>
            <Button size="md" className="mt-4" onClick={p.reload}>Try again</Button>
          </div>
        ) : p.loading ? (
          <Spinner label="Loading tasks" />
        ) : (
          <>
            <div className="mt-4">
              <SummaryCards completed={p.stats.completed} open={p.stats.open} />
            </div>

            <section className="mt-6" aria-label="Weekly progress">
              <div className="flex items-baseline justify-between">
                <h2 className="text-[15px] font-semibold">Weekly Progress</h2>
                <span className="text-xs tabular-nums text-muted">
                  {p.stats.completed} of {p.stats.total} done · {p.stats.percent}%
                </span>
              </div>
              <ProgressBar value={p.stats.percent} thick label="Weekly progress" className="mt-3" />
            </section>

            <section className="mt-7" aria-label="Tasks for the day">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold">{p.isToday ? 'Tasks Today' : `Tasks · ${dayLabel(p.selected)}`}</h2>
                <button type="button" onClick={viewAll} className="text-xs font-medium text-primary">View All</button>
              </div>
              <div className="mt-2">
                {p.dayTasks.length ? (
                  <TaskList tasks={p.dayTasks} />
                ) : (
                  <EmptyState title="Nothing planned for this day" text="Tap the + button to add a task." />
                )}
              </div>
            </section>

            <section className="mt-8" aria-label="Weeks">
              <h2 className="text-[15px] font-semibold">Weeks</h2>
              <p className="text-xs text-muted">Monday to Sunday. Tap a week to see its tasks.</p>
              <div className="mt-3 flex flex-col gap-3">
                {p.weeks.map((w) => (
                  <WeekCard
                    key={w.key}
                    id={`week-${w.key}`}
                    mondayISO={w.key}
                    tasks={w.tasks}
                    isCurrent={w.isCurrent}
                    expanded={!!p.expanded[w.key]}
                    onToggle={() => p.toggleWeek(w.key)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <AddTaskFab onClick={() => openForm({ date: toISO(p.selected) })} />
    </>
  );
}
