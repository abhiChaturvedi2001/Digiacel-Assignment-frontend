import BottomSheet from '../ui/BottomSheet.jsx';
import TaskForm from './TaskForm.jsx';
import TaskDetail from './TaskDetail.jsx';
import useSheets from '../../hooks/useSheets.js';
import useTaskActions from '../../hooks/useTaskActions.js';

/** Renders the add / edit / detail sheets. Mounted once in App. */
export default function SheetHost() {
  const { sheet, task, openForm, close } = useSheets();
  const { save, remove, toggle } = useTaskActions();

  return (
    <>
      <BottomSheet open={sheet?.type === 'form'} onClose={close} title={task ? 'Edit Task' : 'Add New Task'}>
        {sheet?.type === 'form' && (
          <TaskForm key={sheet.id || 'new'} task={task} defaultDate={sheet.date} onSubmit={(data) => save(data, task)} />
        )}
      </BottomSheet>

      <BottomSheet open={sheet?.type === 'detail' && !!task} onClose={close} title="Task details" hideTitle>
        {sheet?.type === 'detail' && task && (
          <TaskDetail
            task={task}
            onClose={close}
            onToggle={() => toggle(task._id)}
            onEdit={() => openForm({ id: task._id })}
            onDelete={() => remove(task._id)}
          />
        )}
      </BottomSheet>
    </>
  );
}
