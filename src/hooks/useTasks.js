import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks, selectTasksError, selectTasksStatus } from '../store/tasksSlice.js';

/** Read-only view of the task list plus a reload function. */
export default function useTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);
  const reload = useCallback(() => dispatch(fetchTasks()), [dispatch]);

  return { tasks, loading: status === 'idle' || status === 'loading', error, reload };
}
