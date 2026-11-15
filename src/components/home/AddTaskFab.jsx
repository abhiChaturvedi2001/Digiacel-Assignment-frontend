import { Plus } from 'lucide-react';

/** Floating add button, centered at the bottom like the Figma. */
export default function AddTaskFab({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Add task"
      onClick={onClick}
      className="fixed left-1/2 z-20 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-fg shadow-lg shadow-primary/40 transition-transform hover:scale-105 active:scale-95"
      style={{ bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
    >
      <Plus size={26} strokeWidth={2.2} aria-hidden />
    </button>
  );
}
