'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const gradientTextStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

export default function Cta({ cms = {} }: { cms?: Record<string, string> }) {
  const headline = cms['hp:ctaBannerHeadline'] ?? 'We Only Get Paid After You Get Placed.';
  const sub =
    cms['hp:ctaBannerSub'] ?? 'Free consultation. No upfront cost. Start today.';

  return (
    <section className="placedly-genz-section placedly-cta-section" id="contact">
      <GenZBlobs />
      <div className="placedly-genz-wrap placedly-cta-wrap">
        <motion.div
          className="placedly-genz-glass placedly-cta-card placedly-cta-card--v2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <span className="placedly-cta-glow" aria-hidden />

          <p className="placedly-genz-eyebrow placedly-cta-eyebrow">
            <Sparkles size={13} strokeWidth={2.5} aria-hidden />
            Get started
          </p>

          <h2
            className="placedly-genz-title placedly-cta-title"
            style={gradientTextStyle}
          >
            {headline}
          </h2>

          <p className="placedly-genz-sub placedly-cta-sub">{sub}</p>

          <Link
            href="#contact"
            className="placedly-genz-btn placedly-cta-btn placedly-cta-btn--v2"
          >
            <span className="placedly-cta-btn-shine" aria-hidden />
            <span className="placedly-cta-btn-label">
              Talk to a Career Expert — It&apos;s Free
            </span>
            <span className="placedly-genz-btn-icon placedly-cta-btn-icon">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>

          <div className="placedly-cta-trust">
            <span className="placedly-cta-trust-dot" />
            No credit card required
            <span className="placedly-cta-trust-sep" />
            <span className="placedly-cta-trust-dot" />
            Response within 24 hours
          </div>
        </motion.div>
      </div>

      <style>{`
        .placedly-cta-card--v2 {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .placedly-cta-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 140%;
          background: ${HEADING_GRADIENT};
          background-size: 200% 200%;
          filter: blur(90px);
          opacity: 0.18;
          z-index: -1;
          pointer-events: none;
        }

        .placedly-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .placedly-cta-title {
          background-position: 0% 50%;
        }

        .placedly-cta-btn--v2 {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background-image: ${HEADING_GRADIENT};
          background-size: 200% 200%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            0 10px 26px rgba(37, 99, 235, 0.30),
            0 3px 8px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
                      filter 0.28s ease,
                      background-position 0.6s ease;
        }

        .placedly-cta-btn--v2:hover {
          transform: translateY(-3px);
          filter: brightness(1.06);
          background-position: 100% 50%;
          box-shadow:
            0 16px 34px rgba(37, 99, 235, 0.38),
            0 5px 12px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .placedly-cta-btn--v2:active {
          transform: translateY(-1px) scale(0.98);
          filter: brightness(0.98);
        }

        .placedly-cta-btn-label {
          position: relative;
          z-index: 1;
        }

        .placedly-cta-btn-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .placedly-cta-btn--v2:hover .placedly-cta-btn-icon {
          transform: translate(3px, -3px);
        }

        .placedly-cta-btn-shine {
          position: absolute;
          top: 0;
          left: -130%;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            115deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
        }

        .placedly-cta-btn--v2:hover .placedly-cta-btn-shine {
          left: 140%;
        }

        .placedly-cta-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          font-size: 12.5px;
          color: rgba(15, 23, 42, 0.5);
          flex-wrap: wrap;
        }

        .placedly-cta-trust-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          flex-shrink: 0;
        }

        .placedly-cta-trust-sep {
          width: 1px;
          height: 12px;
          background: rgba(15, 23, 42, 0.15);
          margin: 0 2px;
        }

        @media (max-width: 560px) {
          .placedly-cta-trust {
            font-size: 11.5px;
            gap: 6px;
          }
        }
      `}</style>
    </section>
  );
}