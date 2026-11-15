import { useEffect } from 'react';
import { X } from 'lucide-react';
import IconButton from './IconButton.jsx';

/** Modal sheet that slides up from the bottom. Closes on Escape and backdrop click. */
export default function BottomSheet({ open, onClose, title, hideTitle = false, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 animate-fade bg-fg/50" onClick={onClose} aria-hidden />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="pointer-events-auto max-h-[92dvh] w-full max-w-[480px] animate-sheet-up overflow-y-auto rounded-t-2xl bg-surface shadow-card"
          style={{
            padding: '20px max(20px, env(safe-area-inset-right, 0px)) max(20px, env(safe-area-inset-bottom, 0px)) max(20px, env(safe-area-inset-left, 0px))',
          }}
        >
          {!hideTitle && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">{title}</h2>
              <IconButton icon={X} label="Close" tone="plain" size={20} className="-mr-2" onClick={onClose} />
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
