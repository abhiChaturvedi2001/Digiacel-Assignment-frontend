import { useCallback, useMemo, useState } from 'react';
import useTasks from './useTasks.js';
import { addDays, fromISO, isSameDay, mondayOf, startOfDay, toISO } from '../utils/date.js';
import { sortTasks, tasksInWeek, weekKeys, weekStats } from '../utils/tasks.js';

/** Everything the Home screen derives from the task list and the selected day. */
export default function useWeekPlanner() {
  const { tasks, loading, error, reload } = useTasks();

  const today = useMemo(() => startOfDay(), []);
  const [selected, setSelected] = useState(today);
  const [expanded, setExpanded] = useState(() => ({ [toISO(mondayOf(today))]: true }));

  const week = useMemo(() => tasksInWeek(tasks, selected), [tasks, selected]);
  const stats = useMemo(() => weekStats(week), [week]);
  const dayTasks = useMemo(() => sortTasks(tasks.filter((t) => t.date === toISO(selected))), [tasks, selected]);
  const taskDates = useMemo(() => new Set(tasks.map((t) => t.date)), [tasks]);

  const weeks = useMemo(
    () =>
      weekKeys(tasks, today).map((key) => ({
        key,
        tasks: tasksInWeek(tasks, fromISO(key)),
        isCurrent: key === toISO(mondayOf(today)),
      })),
    [tasks, today]
  );

  const shiftWeek = useCallback((dir) => setSelected((d) => addDays(d, dir * 7)), []);
  const toggleWeek = useCallback((key) => setExpanded((e) => ({ ...e, [key]: !e[key] })), []);
  const expandSelectedWeek = useCallback(() => {
    const key = toISO(mondayOf(selected));
    setExpanded((e) => ({ ...e, [key]: true }));
    return key;
  }, [selected]);

  return {
    today, selected, setSelected, shiftWeek, isToday: isSameDay(selected, today),
    stats, dayTasks, taskDates, weeks, expanded, toggleWeek, expandSelectedWeek,
    loading, error, reload,
  };
}
