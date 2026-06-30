'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Building2, Handshake, Sparkles, Target, Trophy } from 'lucide-react';

type Cms = Record<string, string>;

const FEAT_META = [
  { Icon: Target, grad: 'linear-gradient(135deg,#fdba74,#f97316)', glow: 'rgba(249,115,22,0.25)' },
  { Icon: Handshake, grad: 'linear-gradient(135deg,#60a5fa,#2145fb)', glow: 'rgba(33,69,251,0.22)' },
  { Icon: Building2, grad: 'linear-gradient(135deg,#34d399,#10b981)', glow: 'rgba(16,185,129,0.22)' },
];

export default function AboutUs({ cms = {} }: { cms?: Cms }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const tagline = cms['hp:aboutTagline'] ?? 'About Us';
  const heading =
    cms['hp:aboutHeading'] ?? 'Behind Every Career Success Is a Team That Truly Cares.';
  const body =
    cms['hp:aboutBody'] ??
    "Placedly was built in India for one reason — most career consultants work for employers, not for you. We flipped the model.\n\nWe are a Career Assistance Programme (CAP) provider and Study Abroad consultancy — both built around the same belief: invest in the person first, earn only when we deliver.\n\nWhether you're a claims analyst targeting your first MNC role, or a student planning a Master's in the UK — our team brings the strategy, connections, and coaching to make it happen. Our 12% Career Assistance Fee applies only after your offer letter is in your hands.";
  const teamImg =
    cms['hp:aboutTeamImg'] ??
    'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80&fit=crop';
  const consultImg =
    cms['hp:aboutConsultImg'] ??
    'https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?w=600&q=80&fit=crop';
  const b1Num = cms['hp:aboutBadge1Num'] ?? '300+';
  const b1Label = cms['hp:aboutBadge1Label'] ?? 'Careers Transformed';
  const b2Num = cms['hp:aboutBadge2Num'] ?? '100+';
  const b2Label = cms['hp:aboutBadge2Label'] ?? 'Hiring Partners';
  const ctaText = cms['hp:aboutCtaText'] ?? 'Our Story →';

  const features = [
    {
      ...FEAT_META[0],
      title: cms['hp:aboutFeat1Title'] ?? 'Personalised, Not Templated',
      desc:
        cms['hp:aboutFeat1Desc'] ??
        'Every candidate and every student gets a roadmap built specifically around their background, goals, and budget — not a generic shortlist.',
    },
    {
      ...FEAT_META[1],
      title: cms['hp:aboutFeat2Title'] ?? 'End-to-End Support',
      desc:
        cms['hp:aboutFeat2Desc'] ??
        'From CV to offer letter for careers. From counselling to visa filing for study abroad. We stay with you at every step.',
    },
    {
      ...FEAT_META[2],
      title: cms['hp:aboutFeat3Title'] ?? '100+ Hiring Partners + 140+ Universities',
      desc:
        cms['hp:aboutFeat3Desc'] ??
        'Direct connects to MNCs actively hiring across India, and university partnerships across UK, France, Germany & Dubai.',
    },
  ];

  const bodyParagraphs = body.split(/\n\n/).filter(Boolean);

  return (
    <section className="placedly-about-section" id="about" ref={sectionRef}>
      <motion.div className="placedly-about-bg" aria-hidden style={{ y: bgY }}>
        <div className="placedly-about-blob placedly-about-blob--coral" />
        <div className="placedly-about-blob placedly-about-blob--blue" />
        <div className="placedly-about-blob placedly-about-blob--violet" />
        <div className="placedly-about-blob placedly-about-blob--mint" />
      </motion.div>

      <div className="placedly-about-inner">
        <motion.div
          className="placedly-about-visual"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="placedly-about-visual-frame"
            style={{ y: cardY }}
            whileHover={{ scale: 1.01, y: -4, rotate: -0.8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <img src={teamImg} alt="Placedly team" className="placedly-about-img placedly-about-img--main" />
            <img
              src={consultImg}
              alt="Placedly consultancy"
              className="placedly-about-img placedly-about-img--secondary"
            />

            <motion.div
              className="placedly-about-glass placedly-about-glass--stat"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="placedly-about-glass-icon placedly-about-glass-icon--navy">
                <Trophy size={20} strokeWidth={2.25} />
              </span>
              <div>
                <strong>{b1Num}</strong>
                <span>{b1Label}</span>
              </div>
            </motion.div>

            <motion.div
              className="placedly-about-glass placedly-about-glass--accent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <strong>{b2Num}</strong>
              <span>{b2Label}</span>
            </motion.div>

            <div className="placedly-about-glass placedly-about-glass--chip">
              <Sparkles size={14} strokeWidth={2.25} />
              Built for Gen-Z ambition
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="placedly-about-copy"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="placedly-about-eyebrow">{tagline}</div>

          <h2 className="placedly-about-title">{heading}</h2>

          <div className="placedly-about-body">
            {bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="placedly-about-features">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="placedly-about-feature"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                style={{ boxShadow: `0 12px 40px ${f.glow}` }}
              >
                <span className="placedly-about-feature-icon" style={{ background: f.grad }}>
                  <f.Icon size={18} strokeWidth={2.25} color="#fff" />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/about-us" className="placedly-about-cta">
              {ctaText}
              <span className="placedly-about-cta-icon">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
