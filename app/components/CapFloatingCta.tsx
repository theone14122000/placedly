'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTION_ID = 'cap-journey';

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

type CapFloatingCtaProps = {
  label?: string;
  href?: string;
};

export default function CapFloatingCta({
  label = 'Apply for CAP 2',
  href = '/cap/apply',
}: CapFloatingCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(SECTION_ID);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.06,
        rootMargin: '-8% 0px -32% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="placedly-cap-floating-cta"
            role="complementary"
            aria-label="Apply for CAP"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          >
            <div className="placedly-cap-floating-cta-float">
              <Link href={href} className="placedly-cap-floating-cta-btn">
                <span className="placedly-cap-floating-cta-btn-text">{label}</span>
                <span className="placedly-cap-floating-cta-btn-line" aria-hidden />
                <span className="placedly-cap-floating-cta-btn-circle">
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden
                    className="placedly-cap-floating-cta-btn-arrow"
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .placedly-cap-floating-cta {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
        }

        .placedly-cap-floating-cta-float {
          filter: drop-shadow(0 12px 40px rgba(37, 99, 235, 0.25));
        }

        /* ── Button shell — same gradient/colors, now a pill
           with text | connecting line | circular arrow ── */
        .placedly-cap-floating-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 8px 8px 26px;
          background: ${HEADING_GRADIENT};
          background-size: 200% 100%;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .placedly-cap-floating-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .placedly-cap-floating-cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.35);
        }

        .placedly-cap-floating-cta-btn:hover::before {
          opacity: 1;
        }

        .placedly-cap-floating-cta-btn:active {
          transform: translateY(-1px) scale(0.99);
        }

        .placedly-cap-floating-cta-btn-text {
          position: relative;
          z-index: 1;
          letter-spacing: 0.3px;
          white-space: nowrap;
          padding: 8px 0;
        }

        /* ── Connecting line — grows from the text toward the
           circle on hover, drawn with a pseudo-element so no
           extra DOM node carries the animation ── */
        .placedly-cap-floating-cta-btn-line {
          position: relative;
          z-index: 1;
          flex: 1 1 20px;
          min-width: 14px;
          height: 2px;
          margin: 0 2px;
        }
        .placedly-cap-floating-cta-btn-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 2px;
          transform: scaleX(0.45);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.4s ease;
        }
        .placedly-cap-floating-cta-btn:hover .placedly-cap-floating-cta-btn-line::after {
          transform: scaleX(1);
          background: rgba(255, 255, 255, 0.85);
        }

        /* ── Circular arrow badge — same palette as the button
           itself (translucent white on the gradient), not a
           new unrelated color ── */
        .placedly-cap-floating-cta-btn-circle {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.32);
          backdrop-filter: blur(2px);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.4s ease;
        }
        .placedly-cap-floating-cta-btn:hover .placedly-cap-floating-cta-btn-circle {
          transform: translateX(3px) scale(1.06);
          background: rgba(255, 255, 255, 0.28);
        }

        .placedly-cap-floating-cta-btn-arrow {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .placedly-cap-floating-cta-btn:hover .placedly-cap-floating-cta-btn-arrow {
          transform: translateX(2px);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .placedly-cap-floating-cta {
            bottom: 20px;
            right: 20px;
            left: 20px;
          }

          .placedly-cap-floating-cta-btn {
            width: 100%;
            justify-content: space-between;
            padding: 7px 7px 7px 22px;
            font-size: 14px;
          }

          .placedly-cap-floating-cta-btn-circle {
            width: 38px;
            height: 38px;
          }
        }

        @media (max-width: 480px) {
          .placedly-cap-floating-cta {
            bottom: 16px;
            right: 16px;
            left: 16px;
          }

          .placedly-cap-floating-cta-btn {
            padding: 6px 6px 6px 18px;
            gap: 8px;
          }

          .placedly-cap-floating-cta-btn-circle {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}

export { SECTION_ID as CAP_JOURNEY_SECTION_ID };
