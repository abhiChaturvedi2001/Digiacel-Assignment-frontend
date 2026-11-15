/** Phone-width column, centered on larger screens. */
export default function AppShell({ children }) {
  return (
    <div className="mx-auto min-h-full max-w-[480px] overflow-x-clip bg-bg sm:border-x sm:border-line">
      {children}
    </div>
  );
}
