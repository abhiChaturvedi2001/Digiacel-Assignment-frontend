import { addDays, fromISO, mondayOf, toISO } from './date.js';

export const STATUS = { IN_PROGRESS: 'in_progress', COMPLETED: 'completed' };
export const PRIORITIES = ['low', 'medium', 'high'];

export const isDone = (t) => t.status === STATUS.COMPLETED;

export const sortTasks = (list) =>
  [...list].sort((a, b) => `${a.date}${a.startTime || '99:99'}`.localeCompare(`${b.date}${b.startTime || '99:99'}`));

export function tasksInWeek(tasks, anyDayInWeek) {
  const mon = mondayOf(anyDayInWeek);
  const from = toISO(mon);
  const to = toISO(addDays(mon, 6));
  return sortTasks(tasks.filter((t) => t.date >= from && t.date <= to));
}

export function weekStats(list) {
  const completed = list.filter(isDone).length;
  const total = list.length;
  return {
    total,
    completed,
    open: total - completed,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

/** Monday ISO keys for every week that has tasks, plus the current week. Sorted ascending. */
export function weekKeys(tasks, today = new Date()) {
  const keys = new Set([toISO(mondayOf(today))]);
  tasks.forEach((t) => keys.add(toISO(mondayOf(fromISO(t.date)))));
  return [...keys].sort();
}

export function groupByDate(list) {
  return list.reduce((acc, t) => {
    (acc[t.date] = acc[t.date] || []).push(t);
    return acc;
  }, {});
}
