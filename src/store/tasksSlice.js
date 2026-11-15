import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { taskService } from '../services/taskService.js';
import { STATUS } from '../utils/tasks.js';

// Thunks reject with a serialized Error, so `err.message` is the backend message.

export const fetchTasks = createAsyncThunk('tasks/fetch', () => taskService.getAll());

export const createTask = createAsyncThunk('tasks/create', (data) => taskService.create(data));

export const updateTask = createAsyncThunk('tasks/update', ({ id, data }) => taskService.update(id, data));

/** Resolves with the deleted task so the UI can offer Undo. */
export const deleteTask = createAsyncThunk('tasks/delete', async (id, { getState }) => {
  const task = getState().tasks.items.find((t) => t._id === id);
  await taskService.remove(id);
  return task;
});

/** Re-creates a task that was just deleted (Undo). */
export const restoreTask = createAsyncThunk('tasks/restore', ({ _id, ...rest }) => taskService.create(rest));

/** Optimistic: the checkbox flips immediately, and flips back if the request fails. */
export const toggleTaskStatus = createAsyncThunk('tasks/toggleStatus', async (id, { getState }) => {
  const current = getState().tasks.items.find((t) => t._id === id);
  // pending reducer already flipped it, so the new status is what is in state now
  return taskService.updateStatus(id, current.status);
});

const flip = (task) => {
  task.status = task.status === STATUS.COMPLETED ? STATUS.IN_PROGRESS : STATUS.COMPLETED;
};

const slice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle', error: '' }, // status: idle | loading | succeeded | failed
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => {
        s.status = 'loading';
        s.error = '';
      })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.items = a.payload;
      })
      .addCase(fetchTasks.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      })

      .addCase(createTask.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(restoreTask.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(updateTask.fulfilled, (s, a) => {
        const i = s.items.findIndex((t) => t._id === a.payload._id);
        if (i > -1) s.items[i] = a.payload;
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t._id !== a.payload._id);
      })

      .addCase(toggleTaskStatus.pending, (s, a) => {
        const t = s.items.find((x) => x._id === a.meta.arg);
        if (t) flip(t);
      })
      .addCase(toggleTaskStatus.fulfilled, (s, a) => {
        const i = s.items.findIndex((t) => t._id === a.payload._id);
        if (i > -1) s.items[i] = a.payload;
      })
      .addCase(toggleTaskStatus.rejected, (s, a) => {
        const t = s.items.find((x) => x._id === a.meta.arg);
        if (t) flip(t); // roll back
      });
  },
});

export const selectTasks = (s) => s.tasks.items;
export const selectTasksStatus = (s) => s.tasks.status;
export const selectTasksError = (s) => s.tasks.error;
export const selectTaskById = (id) => (s) => (id ? s.tasks.items.find((t) => t._id === id) : undefined);

export default slice.reducer;
