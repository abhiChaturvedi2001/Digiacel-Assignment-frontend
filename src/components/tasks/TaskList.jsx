import TaskRow from './TaskRow.jsx';
import useSheets from '../../hooks/useSheets.js';
import useTaskActions from '../../hooks/useTaskActions.js';

/** A divided list of TaskRows wired to the sheets and task actions. */
export default function TaskList({ tasks, showDate = false }) {
  const { openDetail, openForm } = useSheets();
  const { remove, toggle } = useTaskActions();
  return (
    <ul className="divide-y divide-line">
      {tasks.map((t) => (
        <li key={t._id} className="py-0.5">
          <TaskRow
            task={t}
            showDate={showDate}
            onOpen={openDetail}
            onToggle={toggle}
            onEdit={(id) => openForm({ id })}
            onDelete={remove}
          />
        </li>
      ))}
    </ul>
  );
}
