'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_LIGHT = '#fb923c';

type Props = {
  showAt?: number;
  showAtPx?: number;
  hideNearFooterPx?: number;
  footerSelector?: string;
  href?: string;
  label?: string;
  zIndex?: number;
};

export default function FloatingCTA({
  showAt = 0.22,
  showAtPx = 80,
  hideNearFooterPx = 120,
  footerSelector = 'footer',
  href = '/cap/apply',
  label = 'Apply for CAP',
  zIndex = 80,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [hiddenByFooter, setHiddenByFooter] = useState(false);
  const reduceMotion = useReducedMotion();

  const onScroll = useCallback(() => {
    const doc = document.documentElement;
    const scrollY = window.scrollY || doc.scrollTop;
    const docHeight = doc.scrollHeight - doc.clientHeight;
    const pixelThreshold = showAtPx ?? (docHeight > 0 ? docHeight * showAt : 350);

    if (scrollY >= pixelThreshold) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    const footer = document.querySelector(footerSelector) as HTMLElement | null;
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.top < viewportH - hideNearFooterPx) {
        setHiddenByFooter(true);
      } else {
        setHiddenByFooter(false);
      }
    }
  }, [showAt, showAtPx, hideNearFooterPx, footerSelector]);

  useEffect(() => {
    let raf = 0;
    const handler = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        onScroll();
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [onScroll]);

  const shouldShow = visible && !hiddenByFooter;

  const enterVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit:    { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        initial: { opacity: 0, y: 32, scale: 0.9 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring' as const,
            stiffness: 360,
            damping: 28,
            mass: 0.9,
          },
        },
        exit: {
          opacity: 0,
          y: 24,
          scale: 0.94,
          transition: {
            duration: 0.32,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            key="floating-cta"
            className="placedly-floating-cta"
            role="region"
            aria-label="Primary call to action"
            style={{ zIndex }}
            variants={enterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Full-width outline: hugs the button on top + sides,
                then runs along the page bottom edge from right
                to left (open on the bottom). */}
            <svg
              className="placedly-floating-cta-outline"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="ctaStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.85)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
                </linearGradient>
              </defs>
              {/* The path: starts at bottom-right of viewport,
                  goes up the right side, arcs over the top of
                  the button (centered), down the left side, and
                  ends at bottom-left. The bottom is left open. */}
              <path
                d="M 1000 200
                   L 1000 110
                   Q 1000 40, 920 40
                   L 580 40
                   Q 500 40, 500 40
                   Q 420 40, 420 40
                   L 80 40
                   Q 0 40, 0 110
                   L 0 200"
                fill="none"
                stroke="url(#ctaStroke)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <motion.a
              href={href}
              className="placedly-floating-cta-btn"
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            >
              <span className="placedly-floating-cta-shine" aria-hidden />
              <span className="placedly-floating-cta-label">{label}</span>
              <span className="placedly-floating-cta-arrow" aria-hidden>
                <ArrowRight size={16} strokeWidth={2.6} />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .placedly-floating-cta {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 200px !important;
          transform: none !important;
          z-index: ${zIndex} !important;
          will-change: transform, opacity !important;
          pointer-events: none !important;
        }

        /* Full-viewport outline drawn as an SVG that hugs
           the button (top) and runs down to the page bottom
           on both sides. Bottom edge is intentionally open. */
        .placedly-floating-cta-outline {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          pointer-events: none !important;
          z-index: 0 !important;
        }

        /* Re-enable pointer events only on the button */
        .placedly-floating-cta-btn {
          pointer-events: auto !important;
        }

        .placedly-floating-cta-btn {
          position: absolute !important;
          left: 50% !important;
          top: 18px !important;
          transform: translateX(-50%) !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 12px 18px 12px 24px !important;
          min-height: 52px !important;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          border-radius: 9999px !important;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%) !important;
          box-shadow:
            0 8px 22px rgba(249, 115, 22, 0.42),
            0 2px 6px rgba(249, 115, 22, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.22) !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-family: 'Inter', 'Manrope', 'Geist', -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
          font-weight: 600 !important;
          font-size: 14.5px !important;
          letter-spacing: -0.005em !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          cursor: pointer !important;
          isolation: isolate !important;
          overflow: hidden !important;
          z-index: 2 !important;
          transition:
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.35s ease,
            transform 0.25s ease !important;
        }
        .placedly-floating-cta-btn:hover {
          box-shadow:
            0 14px 32px rgba(249, 115, 22, 0.52),
            0 4px 10px rgba(249, 115, 22, 0.36),
            inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
          filter: brightness(1.05) !important;
        }
        .placedly-floating-cta-btn:active {
          transform: translateX(-50%) translateY(0) !important;
          filter: brightness(0.96) !important;
        }
        .placedly-floating-cta-btn:focus-visible {
          outline: 2px solid ${ORANGE_LIGHT} !important;
          outline-offset: 4px !important;
        }

        .placedly-floating-cta-shine {
          position: absolute !important;
          top: 0 !important;
          left: -130% !important;
          width: 55% !important;
          height: 100% !important;
          background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.45), transparent) !important;
          transform: skewX(-20deg) !important;
          transition: left 0.7s ease !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }
        .placedly-floating-cta-btn:hover .placedly-floating-cta-shine {
          left: 140% !important;
        }

        .placedly-floating-cta-label {
          position: relative !important;
          z-index: 1 !important;
          display: inline-block !important;
        }

        .placedly-floating-cta-arrow {
          position: relative !important;
          z-index: 1 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.24) !important;
          color: #ffffff !important;
          flex-shrink: 0 !important;
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s ease !important;
        }
        .placedly-floating-cta-btn:hover .placedly-floating-cta-arrow {
          transform: translateX(3px) !important;
          background: rgba(255, 255, 255, 0.34) !important;
        }

        @media (max-width: 640px) {
          .placedly-floating-cta {
            height: 180px !important;
          }
          .placedly-floating-cta-btn {
            top: 14px !important;
            min-height: 46px !important;
            padding: 10px 14px 10px 18px !important;
            font-size: 13.5px !important;
            gap: 10px !important;
          }
          .placedly-floating-cta-arrow {
            width: 28px !important;
            height: 28px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .placedly-floating-cta,
          .placedly-floating-cta-btn,
          .placedly-floating-cta-arrow,
          .placedly-floating-cta-shine {
            transition: opacity 0.2s ease !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}