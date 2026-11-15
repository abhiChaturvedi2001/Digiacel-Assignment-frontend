/** Presentational toast. `toast`: { message, undoTask? }. Use ToastHost to wire it to the store. */
export default function Toast({ toast, onDismiss, onUndo }) {
  if (!toast) return null;
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-4"
      style={{ bottom: 'calc(92px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div
        role="status"
        className="pointer-events-auto flex max-w-[420px] animate-fade items-center gap-4 rounded-xl bg-fg px-4 py-3 text-[13px] text-bg shadow-card"
      >
        <span>{toast.message}</span>
        {toast.undoTask && (
          <button
            type="button"
            className="font-semibold underline underline-offset-2"
            onClick={() => {
              onUndo(toast.undoTask);
              onDismiss();
            }}
          >
            Undo
          </button>
        )}
      </div>
    </div>
  );
}
