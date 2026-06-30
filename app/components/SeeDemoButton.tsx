'use client';

import { Play } from 'lucide-react';
import { useSeeDemo } from './SeeDemoContext';

type Variant = 'default' | 'hero' | 'nav' | 'panel';

export default function SeeDemoButton({
  variant = 'default',
  className = '',
  showIcon = true,
  label = 'See a demo',
}: {
  variant?: Variant;
  className?: string;
  showIcon?: boolean;
  label?: string;
}) {
  const { openDemo } = useSeeDemo();

  return (
    <button
      type="button"
      className={`placedly-see-demo placedly-see-demo--${variant}${className ? ` ${className}` : ''}`}
      onClick={openDemo}
    >
      {showIcon && (
        <span className="placedly-see-demo-icon" aria-hidden>
          <Play size={12} strokeWidth={2.5} fill="currentColor" />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}
