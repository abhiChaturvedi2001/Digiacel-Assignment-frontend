export default function EmptyState({ title, text }) {
  return (
    <div className="rounded-xl border border-dashed border-line px-4 py-8 text-center">
      <p className="text-[13px] font-medium">{title}</p>
      {text && <p className="mt-1 text-xs text-muted">{text}</p>}
    </div>
  );
}
