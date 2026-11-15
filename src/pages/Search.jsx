import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import useTaskSearch from '../hooks/useTaskSearch.js';
import Input from '../components/ui/Input.jsx';
import IconButton from '../components/ui/IconButton.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import TaskList from '../components/tasks/TaskList.jsx';

export default function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const { results, searched, loading, error } = useTaskSearch(q);

  return (
    <main className="gutter pb-10 pt-5">
      <div className="flex items-start gap-2">
        <IconButton icon={ArrowLeft} label="Back" tone="plain" size={22} className="-ml-2 mt-0.5" onClick={() => navigate('/home')} />
        <div className="flex-1">
          <Input
            type="search"
            autoFocus
            autoComplete="off"
            aria-label="Search tasks"
            placeholder="Search by title or description"
            icon={SearchIcon}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        {error ? (
          <p role="alert" className="py-10 text-center text-[13px] text-danger">{error}</p>
        ) : loading && !searched ? (
          <Spinner label="Searching" />
        ) : !searched ? (
          <p className="py-10 text-center text-[13px] text-muted">Type a keyword to find a task.</p>
        ) : results.length === 0 ? (
          <p className="py-10 text-center text-[13px] text-muted">No tasks match “{q.trim()}”.</p>
        ) : (
          <>
            <p className="mb-1 text-xs text-muted">{results.length} result{results.length > 1 ? 's' : ''}</p>
            <TaskList tasks={results} showDate />
          </>
        )}
      </div>
    </main>
  );
}
