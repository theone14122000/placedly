'use client';

import { motion } from 'framer-motion';
import { Handshake, GraduationCap, TrendingUp, BadgeCheck } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const stats = [
  {
    Icon: Handshake,
    digits: '100+',
    info: 'Hiring Partners Across India',
    grad: 'linear-gradient(135deg,#60a5fa,#2145fb)',
    desc: 'Direct connects to active MNC hiring teams — no middlemen.',
  },
  {
    Icon: GraduationCap,
    digits: '140+',
    info: 'Global Universities',
    grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    desc: 'UK · France · Germany · Dubai — real admissions, end to end.',
  },
  {
    Icon: TrendingUp,
    digits: '300+',
    info: 'Careers Transformed',
    grad: 'linear-gradient(135deg,#34d399,#059669)',
    desc: 'Professionals who landed better roles, faster, with our help.',
  },
  {
    Icon: BadgeCheck,
    digits: '₹0',
    info: 'Upfront Fee — Ever',
    grad: 'linear-gradient(135deg,#fdba74,#f97316)',
    desc: '12% Career Assistance Fee — only after your offer letter arrives.',
  },
];

export default function ChooseUs({ cms = {} }: { cms?: Record<string, string> }) {
  const title =
    cms['hp:whyTitle'] ?? "Why India's Professionals and Students Choose Placedly";
  const subtitle = cms['hp:whySubtitle'];

  return (
    <section className="placedly-genz-section placedly-why-section">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-genz-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="placedly-genz-eyebrow">Why Placedly</p>
          <h2 className="placedly-genz-title">{title}</h2>
          {subtitle ? <p className="placedly-genz-sub">{subtitle}</p> : null}
        </motion.div>

        <div className="placedly-why-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.info}
              className="placedly-genz-glass placedly-why-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <span className="placedly-why-icon" style={{ background: s.grad }}>
                <s.Icon size={22} strokeWidth={2} color="#fff" />
              </span>
              <strong className="placedly-why-digits">{s.digits}</strong>
              <h3 className="placedly-why-label">{s.info}</h3>
              <p className="placedly-why-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
