import { useEffect, useMemo, useState } from 'react';
import { taskService } from '../services/taskService.js';
import { sortTasks } from '../utils/tasks.js';
import useDebounce from './useDebounce.js';
import useTasks from './useTasks.js';

/**
 * Debounced server search. The server decides WHICH tasks match; the rows are
 * read from the Redux store, so edits, deletes and checkbox changes made from
 * a result show up immediately.
 */
export default function useTaskSearch(query) {
  const { tasks } = useTasks();
  const term = useDebounce(query.trim(), 250);
  const [ids, setIds] = useState(null); // null = nothing searched yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!term) {
      setIds(null);
      setError('');
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    taskService
      .search(term)
      .then((found) => !cancelled && setIds(new Set(found.map((t) => t._id))))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [term]);

  const results = useMemo(() => (ids ? sortTasks(tasks.filter((t) => ids.has(t._id))) : []), [ids, tasks]);

  return { results, searched: ids !== null, loading, error };
}
