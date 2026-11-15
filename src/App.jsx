import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import SheetHost from './components/tasks/SheetHost.jsx';
import ToastHost from './components/ui/ToastHost.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import { fetchTasks } from './store/tasksSlice.js';
import { hasSeenOnboarding } from './utils/storage.js';

export default function App() {
  const dispatch = useDispatch();

  // load tasks once; every page reads them from the store
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={hasSeenOnboarding() ? <Navigate to="/home" replace /> : <Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <SheetHost />
      <ToastHost />
    </AppShell>
  );
}
