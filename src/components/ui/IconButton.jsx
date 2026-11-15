import clsx from 'clsx';

const TONES = {
  default: 'text-muted hover:text-primary',
  danger: 'text-muted hover:text-danger',
  plain: 'text-fg',
};

/** Square icon-only button. `label` is required for screen readers. */
export default function IconButton({ icon: Icon, label, tone = 'default', size = 18, className, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx('grid place-items-center rounded-lg p-2 transition-colors', TONES[tone], className)}
      {...props}
    >
      <Icon size={size} aria-hidden />
    </button>
  );
}
