import { useState } from 'react';
import clsx from 'clsx';
import Button from '../ui/Button.jsx';
import Input, { Textarea } from '../ui/Input.jsx';
import { PRIORITIES, STATUS } from '../../utils/tasks.js';
import { toISO } from '../../utils/date.js';

/**
 * Create / edit form. Required: title, start time, date.
 * `onSubmit(data)` should return a promise; the button shows a spinner while it runs.
 */
export default function TaskForm({ task, defaultDate, onSubmit }) {
  const [form, setForm] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    date: task?.date ?? defaultDate ?? toISO(new Date()),
    startTime: task?.startTime ?? '09:00',
    endTime: task?.endTime ?? '',
    priority: task?.priority ?? '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Enter a title for the task.';
    if (!form.date) next.date = 'Pick a date.';
    if (!form.startTime) next.startTime = 'Set a start time.';
    if (form.endTime && form.startTime && form.endTime <= form.startTime) next.endTime = 'End time must be after the start.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        priority: form.priority,
        status: task?.status ?? STATUS.IN_PROGRESS,
      });
    } catch (err) {
      setSubmitError(err.message || 'Could not save the task.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input label="Task title" required autoFocus={!task} maxLength={80} placeholder="Doing Homework" value={form.title} onChange={set('title')} error={errors.title} />

      <div className="grid grid-cols-2 gap-3">
        <Input label="Starts" required type="time" value={form.startTime} onChange={set('startTime')} error={errors.startTime} />
        <Input label="Ends" type="time" value={form.endTime} onChange={set('endTime')} error={errors.endTime} />
      </div>

      <Input label="Date" required type="date" value={form.date} onChange={set('date')} error={errors.date} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-muted">Priority</span>
        <div className="grid grid-cols-3 gap-2">
          {PRIORITIES.map((p) => {
            const on = form.priority === p;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                onClick={() => setForm((f) => ({ ...f, priority: on ? '' : p }))}
                className={clsx(
                  'rounded-[10px] border py-[9px] text-[13px] font-medium capitalize transition-colors',
                  on ? 'border-primary bg-primary text-primary-fg' : 'border-line bg-bg text-muted hover:text-fg'
                )}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <Textarea label="Description" placeholder="Add Description" value={form.description} onChange={set('description')} />

      {submitError && (
        <p role="alert" className="text-[12.5px] text-danger">
          {submitError}
        </p>
      )}

      <Button type="submit" fullWidth loading={saving}>
        {task ? 'Save Changes' : 'Create Task'}
      </Button>
    </form>
  );
}
