import { useDispatch } from 'react-redux';
import Toast from './Toast.jsx';
import useToast from '../../hooks/useToast.js';
import { restoreTask } from '../../store/tasksSlice.js';

/** Renders the current toast. Undo re-creates the deleted task. Mounted once in App. */
export default function ToastHost() {
  const dispatch = useDispatch();
  const { toast, show, dismiss } = useToast();

  const undo = (task) => {
    dispatch(restoreTask(task))
      .unwrap()
      .catch((e) => show(e.message || 'Could not restore the task.'));
  };

  return <Toast toast={toast} onDismiss={dismiss} onUndo={undo} />;
}
