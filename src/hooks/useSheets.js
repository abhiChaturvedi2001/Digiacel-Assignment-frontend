import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSheet, openSheet } from '../store/uiSlice.js';
import { selectTaskById } from '../store/tasksSlice.js';

/**
 * Open / close the add, edit and detail sheets from any component.
 *   openForm()                 new task
 *   openForm({ date })         new task on a date
 *   openForm({ id })           edit a task
 *   openDetail(id)
 */
export default function useSheets() {
  const dispatch = useDispatch();
  const sheet = useSelector((s) => s.ui.sheet);
  const task = useSelector(selectTaskById(sheet?.id));

  const openForm = useCallback((opts = {}) => dispatch(openSheet({ type: 'form', ...opts })), [dispatch]);
  const openDetail = useCallback((id) => dispatch(openSheet({ type: 'detail', id })), [dispatch]);
  const close = useCallback(() => dispatch(closeSheet()), [dispatch]);

  return { sheet, task, openForm, openDetail, close };
}
