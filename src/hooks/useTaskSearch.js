import { useEffect, useMemo, useState } from 'react';
import { taskService } from '../services/taskService.js';
import { sortTasks } from '../utils/tasks.js';
import useDebounce from './useDebounce.js';
import useTasks from './useTasks.js';

/**
 * Debounced server search. The server decides WHICH tasks match. When the task
 * list is loaded, each match is shown from the Redux store, so edits, deletes and
 * checkbox changes made from a result show up immediately. If the list never
 * loaded, the server's copy is shown instead, so search still works on its own.
 */
export default function useTaskSearch(query) {
  const { tasks, loading: storeLoading, error: storeError } = useTasks();
  const storeReady = !storeLoading && !storeError;
  const term = useDebounce(query.trim(), 250);
  const [found, setFound] = useState(null); // null = nothing searched yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!term) {
      setFound(null);
      setError('');
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    taskService
      .search(term)
      .then((list) => !cancelled && setFound(list))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [term]);

  const results = useMemo(() => {
    if (!found) return [];
    if (!storeReady) return sortTasks(found);
    const byId = new Map(tasks.map((t) => [t._id, t]));
    // A match missing from a loaded store was deleted after the search ran.
    return sortTasks(found.map((t) => byId.get(t._id)).filter(Boolean));
  }, [found, tasks, storeReady]);

  return { results, searched: found !== null, loading, error };
}
