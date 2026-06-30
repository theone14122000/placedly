'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PricingBanner() {
  return (
    <div className="placedly-pricing-banner" aria-label="Pricing transparency banner">
      <div className="placedly-pricing-banner-pill">
        <span className="placedly-pricing-banner-dot" aria-hidden />
        <span className="placedly-pricing-banner-copy">
          <strong>12% Success Share</strong>
          <span>Zero upfront risk</span>
        </span>
      </div>
      <Link href="/cap/apply" className="placedly-pricing-banner-link">
        <ShieldCheck size={16} strokeWidth={2.2} />
        See how CAP works
      </Link>
    </div>
  );
}
