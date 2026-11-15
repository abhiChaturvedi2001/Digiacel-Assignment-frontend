// All task dates are plain 'YYYY-MM-DD' strings (local calendar day), times are 'HH:mm'.
// Weeks run Monday to Sunday.

const pad = (n) => String(n).padStart(2, '0');

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));
export const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const startOfDay = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromISO = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export const mondayOf = (d) => addDays(startOfDay(d), -((d.getDay() + 6) % 7));

export const weekDays = (d) => {
  const mon = mondayOf(d);
  return Array.from({ length: 7 }, (_, i) => addDays(mon, i));
};

export const isSameDay = (a, b) => toISO(a) === toISO(b);

export const dayLabel = (d) => `${DAYS_SHORT[d.getDay()]}, ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;

export function weekRangeLabel(monday) {
  const end = addDays(monday, 6);
  return monday.getMonth() === end.getMonth()
    ? `${monday.getDate()} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]}`
    : `${monday.getDate()} ${MONTHS_SHORT[monday.getMonth()]} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]}`;
}

export function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
}

export function timeRange(task) {
  if (!task.startTime) return '';
  return task.endTime ? `${formatTime(task.startTime)} – ${formatTime(task.endTime)}` : formatTime(task.startTime);
}
