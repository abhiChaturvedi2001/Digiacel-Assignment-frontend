import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-primary text-primary-fg hover:bg-primary/90',
  secondary: 'border border-line bg-surface text-fg hover:bg-primary-soft',
  soft: 'bg-primary-soft text-primary hover:bg-primary-soft/70',
  danger: 'bg-danger-soft text-danger hover:bg-danger-soft/70',
  ghost: 'text-fg hover:bg-primary-soft',
};

const SIZES = {
  md: 'py-3 px-4 text-[13px]',
  lg: 'py-3.5 px-5 text-[14px]',
};

export default function Button({
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : Icon && <Icon className="h-4 w-4" aria-hidden />}
      {children}
    </button>
  );
}
