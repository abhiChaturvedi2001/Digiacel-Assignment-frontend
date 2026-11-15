import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, deleteTask, toggleTaskStatus, updateTask } from '../store/tasksSlice.js';
import useSheets from './useSheets.js';
import useToast from './useToast.js';

/**
 * Write operations with toasts and sheet handling built in.
 *   save(data, task?)   create, or update when `task` is given. Throws on failure so the form can show the error.
 *   remove(id)          delete + Undo toast
 *   toggle(id)          Completed <-> In Progress
 */
export default function useTaskActions() {
  const dispatch = useDispatch();
  const { show } = useToast();
  const { close } = useSheets();

  const save = useCallback(
    async (data, task) => {
      if (task) {
        await dispatch(updateTask({ id: task._id, data })).unwrap();
        show('Task updated');
      } else {
        await dispatch(createTask(data)).unwrap();
        show('Task added');
      }
      close();
    },
    [dispatch, show, close]
  );

  const remove = useCallback(
    async (id) => {
      try {
        const removed = await dispatch(deleteTask(id)).unwrap();
        close();
        show('Task deleted', { undoTask: removed });
      } catch (e) {
        show(e.message || 'Could not delete the task.');
      }
    },
    [dispatch, show, close]
  );

  const toggle = useCallback(
    async (id) => {
      try {
        await dispatch(toggleTaskStatus(id)).unwrap();
      } catch (e) {
        show(e.message || 'Could not update the task.');
      }
    },
    [dispatch, show]
  );

  return { save, remove, toggle };
}
