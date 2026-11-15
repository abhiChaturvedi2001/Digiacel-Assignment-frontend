import { configureStore } from '@reduxjs/toolkit';
import tasks from './tasksSlice.js';
import ui from './uiSlice.js';

export const store = configureStore({ reducer: { tasks, ui } });
