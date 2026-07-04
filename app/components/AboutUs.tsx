'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Handshake, Sparkles, Target, Trophy } from 'lucide-react';

type Cms = Record<string, string>;

const FEAT_META = [
  { Icon: Target, bg: '#f97316', glow: 'rgba(249,115,22,0.18)' },
  { Icon: Handshake, bg: '#2145fb', glow: 'rgba(33,69,251,0.18)' },
  { Icon: Building2, bg: '#10b981', glow: 'rgba(16,185,129,0.18)' },
];

export default function AboutUs({ cms = {} }: { cms?: Cms }) {
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
    <section className="placedly-about-section" id="about">
      <div className="placedly-about-bg" aria-hidden>
        <div className="placedly-about-blob placedly-about-blob--coral" />
        <div className="placedly-about-blob placedly-about-blob--blue" />
        <div className="placedly-about-blob placedly-about-blob--violet" />
        <div className="placedly-about-blob placedly-about-blob--mint" />
      </div>

      <div className="placedly-about-inner">
        <motion.div
          className="placedly-about-visual"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="placedly-about-visual-frame">
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
          </div>
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
                transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                style={{ boxShadow: `0 12px 40px ${f.glow}` }}
              >
                <span
                  className="placedly-about-feature-icon"
                  style={{ background: f.bg }}
                >
                  <f.Icon size={18} strokeWidth={2.25} color="#fff" />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/about-us" className="placedly-about-cta">
            {ctaText}
            <span className="placedly-about-cta-icon">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>

      <style>{`
        /* ============================================================
           ABOUT SECTION — clean text, no gradients, fully responsive
           ============================================================ */
        .placedly-about-section {
          position: relative;
          width: 100%;
          padding: 80px 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .placedly-about-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .placedly-about-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }
        .placedly-about-blob--coral  { width: 280px; height: 280px; background: #fde2d4; top:  6%;  left:  4%; }
        .placedly-about-blob--blue   { width: 320px; height: 320px; background: #dbe6ff; top: 60%;  left: -6%; }
        .placedly-about-blob--violet { width: 260px; height: 260px; background: #e9d8ff; top: 10%;  right: 6%; }
        .placedly-about-blob--mint   { width: 240px; height: 240px; background: #d2f5e3; top: 70%;  right: 8%; }

        .placedly-about-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* ============================================================
           VISUAL
           ============================================================ */
        .placedly-about-visual-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.05;
        }

        .placedly-about-img {
          position: absolute;
          border-radius: 22px;
          object-fit: cover;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
        }

        .placedly-about-img--main {
          width: 78%;
          height: 80%;
          top: 0;
          left: 0;
        }

        .placedly-about-img--secondary {
          width: 50%;
          height: 45%;
          bottom: 0;
          right: 0;
          border: 6px solid #ffffff;
        }

        .placedly-about-glass {
          position: absolute;
          background: #ffffff;
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .placedly-about-glass strong {
          display: block;
          font-weight: 800;
          color: #0f172a;
          font-size: 16px;
          line-height: 1.1;
        }
        .placedly-about-glass span {
          display: block;
          color: #64748b;
          font-size: 12px;
          line-height: 1.2;
        }

        .placedly-about-glass--stat {
          top: 8%;
          right: 4%;
        }
        .placedly-about-glass-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .placedly-about-glass-icon--navy {
          background: #1e1b4b;
          color: #ffffff;
        }

        .placedly-about-glass--accent {
          bottom: 6%;
          left: 4%;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .placedly-about-glass--accent strong {
          font-size: 22px;
          color: #2145fb;
        }

        .placedly-about-glass--chip {
          top: 50%;
          right: 2%;
          background: #0f172a;
          color: #ffffff;
          font-weight: 600;
          font-size: 12.5px;
          padding: 9px 14px;
          gap: 6px;
        }
        .placedly-about-glass--chip span {
          color: #ffffff;
          font-size: 12.5px;
        }

        /* ============================================================
           COPY
           ============================================================ */
        .placedly-about-copy {
          color: #0f172a;
        }

        .placedly-about-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          background: #eef2ff;
          color: #2145fb;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 999px;
          margin-bottom: 16px;
        }

        .placedly-about-title {
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0f172a; /* CLEAN — no gradient */
          margin: 0 0 18px;
        }

        .placedly-about-body {
          color: #475569;
          font-size: 15.5px;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .placedly-about-body p {
          margin: 0 0 14px;
        }
        .placedly-about-body p:last-child {
          margin-bottom: 0;
        }

        /* ============================================================
           FEATURES
           ============================================================ */
        .placedly-about-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }

        .placedly-about-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .placedly-about-feature:hover {
          transform: translateY(-2px);
        }

        .placedly-about-feature-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .placedly-about-feature h3 {
          font-size: 15.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .placedly-about-feature p {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        /* ============================================================
           CTA
           ============================================================ */
        .placedly-about-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 24px;
          background: #0f172a;
          color: #ffffff;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          border-radius: 999px;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .placedly-about-cta:hover {
          background: #2145fb;
          transform: translateY(-2px);
        }

        .placedly-about-cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 960px) {
          .placedly-about-section {
            padding: 64px 18px;
          }
          .placedly-about-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .placedly-about-visual-frame {
            max-width: 520px;
            margin: 0 auto;
            aspect-ratio: 1 / 1;
          }
        }

        @media (max-width: 640px) {
          .placedly-about-section {
            padding: 48px 16px;
          }
          .placedly-about-inner {
            gap: 36px;
          }
          .placedly-about-visual-frame {
            aspect-ratio: 1 / 1.1;
          }
          .placedly-about-img--main {
            width: 82%;
            height: 78%;
          }
          .placedly-about-img--secondary {
            width: 48%;
            height: 42%;
            border-width: 4px;
          }
          .placedly-about-glass--stat {
            top: 4%;
            right: 2%;
            padding: 10px 12px;
          }
          .placedly-about-glass--stat strong { font-size: 14px; }
          .placedly-about-glass--stat span   { font-size: 11px; }
          .placedly-about-glass-icon { width: 32px; height: 32px; }
          .placedly-about-glass--accent {
            bottom: 4%;
            left: 2%;
          }
          .placedly-about-glass--accent strong { font-size: 18px; }
          .placedly-about-glass--chip {
            top: 48%;
            right: 0;
            font-size: 11px;
            padding: 7px 12px;
          }
          .placedly-about-eyebrow {
            font-size: 11px;
            padding: 5px 12px;
          }
          .placedly-about-body {
            font-size: 14.5px;
            line-height: 1.65;
          }
          .placedly-about-feature {
            padding: 14px;
            gap: 12px;
          }
          .placedly-about-feature-icon {
            width: 38px;
            height: 38px;
          }
          .placedly-about-feature h3 {
            font-size: 14.5px;
          }
          .placedly-about-feature p {
            font-size: 13px;
          }
          .placedly-about-cta {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
          }
        }

        @media (max-width: 380px) {
          .placedly-about-glass--chip span {
            display: none;
          }
          .placedly-about-eyebrow {
            letter-spacing: 0.04em;
          }
        }
      `}</style>
    </section>
  );
}