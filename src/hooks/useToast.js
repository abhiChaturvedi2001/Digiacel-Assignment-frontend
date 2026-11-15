import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissToast, notify } from '../store/uiSlice.js';

/** const { toast, show, dismiss } = useToast();  show('Saved') */
export default function useToast() {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.ui.toast);
  const show = useCallback((message, opts) => dispatch(notify(message, opts)), [dispatch]);
  const dismiss = useCallback(() => dispatch(dismissToast()), [dispatch]);
  return { toast, show, dismiss };
}
