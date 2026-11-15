import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Button from '../components/ui/Button.jsx';
import { markOnboardingSeen } from '../utils/storage.js';

const SAMPLE = [
  { text: 'Finishing Wireframe', done: false },
  { text: 'Meeting with team', done: false },
  { text: 'Buy cat food', done: true },
];

function Zigzag({ className }) {
  return (
    <svg className={className} width="130" height="70" aria-hidden>
      <defs>
        <pattern id="zigzag" width="30" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 5l7.5 10L15 5l7.5 10L30 5" fill="none" stroke="white" strokeOpacity=".28" strokeWidth="3" />
        </pattern>
      </defs>
      <rect width="130" height="70" fill="url(#zigzag)" />
    </svg>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const start = () => {
    markOnboardingSeen();
    navigate('/home', { replace: true });
  };

  return (
    <section className="flex min-h-dvh flex-col">
      <div className="relative min-h-[340px] flex-1 overflow-hidden bg-primary">
        <Zigzag className="absolute left-0 top-[22%]" />
        <Zigzag className="absolute bottom-6 right-0" />
        <svg className="absolute -right-8 -top-8" width="130" height="130" aria-hidden>
          <circle cx="65" cy="65" r="48" fill="none" stroke="white" strokeOpacity=".22" strokeWidth="16" />
        </svg>

        <div className="gutter absolute inset-0 grid place-items-center">
          <div className="w-[78%] max-w-[260px] -rotate-3 rounded-2xl bg-surface p-4 shadow-xl">
            {SAMPLE.map((r) => (
              <div key={r.text} className="flex items-center gap-3 py-2">
                <span className={clsx('grid h-[22px] w-[22px] place-items-center rounded-md border-[1.5px] border-primary text-primary-fg', r.done && 'bg-primary')}>
                  {r.done && <Check size={14} strokeWidth={3} aria-hidden />}
                </span>
                <span className={clsx('text-[13px]', r.done && 'text-muted line-through')}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gutter bg-surface pt-7" style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom, 0px))' }}>
        <h1 className="text-[22px] font-semibold leading-tight">Manage What To Do</h1>
        <p className="mt-2 max-w-[30ch] text-[12.5px] text-muted">The best way to manage what you have to do, don't forget your plans</p>
        <Button fullWidth className="mt-8" onClick={start}>
          Get Started
        </Button>
      </div>
    </section>
  );
}
