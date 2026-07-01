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
  label = 'Apply for CAP',
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
                <span>{label}</span>
                <ArrowRight size={17} strokeWidth={2.25} aria-hidden />
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

        .placedly-cap-floating-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
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
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

        .placedly-cap-floating-cta-btn span {
          position: relative;
          z-index: 1;
          letter-spacing: 0.3px;
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
            justify-content: center;
            padding: 15px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .placedly-cap-floating-cta {
            bottom: 16px;
            right: 16px;
            left: 16px;
          }

          .placedly-cap-floating-cta-btn {
            padding: 14px 20px;
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
}

export { SECTION_ID as CAP_JOURNEY_SECTION_ID };