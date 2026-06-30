'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

export default function Cta({ cms = {} }: { cms?: Record<string, string> }) {
  const headline = cms['hp:ctaBannerHeadline'] ?? 'We Only Get Paid After You Get Placed.';
  const sub =
    cms['hp:ctaBannerSub'] ?? 'Free consultation. No upfront cost. Start today.';

  return (
    <section className="placedly-genz-section placedly-cta-section" id="contact">
      <GenZBlobs />
      <div className="placedly-genz-wrap placedly-cta-wrap">
        <motion.div
          className="placedly-genz-glass placedly-cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <p className="placedly-genz-eyebrow">Get started</p>
          <h2 className="placedly-genz-title placedly-cta-title">{headline}</h2>
          <p className="placedly-genz-sub placedly-cta-sub">{sub}</p>
          <Link href="#contact" className="placedly-genz-btn placedly-cta-btn">
            Talk to a Career Expert — It&apos;s Free
            <span className="placedly-genz-btn-icon">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
