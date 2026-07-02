export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import CAPApplyClient from './CAPApplyClient';

export const metadata: Metadata = {
  title: 'Apply — Career Assistance Programme | Placedly',
  description: 'Apply to join the Placedly Career Assistance Programme (CAP) — zero upfront, success-share career transformation.',
};

export default function CAPApplyPage() {
  return (
    <Suspense fallback={null}>
      <CAPApplyClient />
    </Suspense>
  );
}