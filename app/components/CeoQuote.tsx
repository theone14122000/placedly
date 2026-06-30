'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

type Cms = Record<string, string>;

export default function CeoQuote({ cms = {} }: { cms?: Cms }) {
  const img =
    cms['hp:ceoImg'] ??
    'https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/682db74463bfe59bcce17434_Ceo-Quote-Img.png';
  const name = cms['hp:ceoName'] ?? 'Pavan Mishra';
  const role = cms['hp:ceoRole'] ?? 'Founder, Placedly';
  const quote =
    cms['hp:ceoQuote'] ??
    "Most people don't fail in their careers because they lack skill. They fail because no one helped them present that skill the right way, to the right people, at the right time. That's exactly what Placedly exists to fix — for every professional in India and beyond.";
  const ctaText = cms['hp:ceoCtaText'] ?? 'Talk to Our Team';
  const ctaHref = cms['hp:ceoCtaHref'] ?? '#contact';

  return (
    <section className="placedly-genz-section placedly-ceo-section">
      <GenZBlobs />
      <div className="placedly-genz-wrap placedly-ceo-wrap">
        <motion.div
          className="placedly-genz-glass placedly-ceo-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="placedly-genz-eyebrow placedly-ceo-eyebrow">Placedly Leadership</p>

          <div className="placedly-ceo-author">
            <span className="placedly-ceo-avatar-ring">
              <img src={img} alt={name} className="placedly-ceo-avatar" loading="lazy" />
            </span>
            <div>
              <h3 className="placedly-ceo-name">{name}</h3>
              <p className="placedly-ceo-role">{role}</p>
            </div>
            <Quote className="placedly-ceo-quote-icon" size={36} strokeWidth={1.5} aria-hidden />
          </div>

          <blockquote className="placedly-ceo-quote">&ldquo;{quote}&rdquo;</blockquote>

          <Link href={ctaHref} className="placedly-genz-btn">
            {ctaText}
            <span className="placedly-genz-btn-icon">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
