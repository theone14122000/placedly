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
            {/*
              ── Compound border system ──
              
              1. placedly-floating-cta-ring
                 Half-pill arc that hugs the TOP + SIDES of the button,
                 open at the bottom (border-bottom: none).

              2. placedly-floating-cta-ground-left  &
                 placedly-floating-cta-ground-right
                 Two horizontal lines that shoot from the bottom corners
                 of the ring all the way to the left/right edges of the
                 viewport, sitting flush at the very bottom of the screen —
                 exactly like the "ground rail" visible in the reference image.
            */}
            <span className="placedly-floating-cta-ring"         aria-hidden />
            <span className="placedly-floating-cta-ground-left"  aria-hidden />
            <span className="placedly-floating-cta-ground-right" aria-hidden />

            <motion.a
              href={href}
              className="placedly-floating-cta-btn"
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            >
              <span className="placedly-floating-cta-shine"  aria-hidden />
              <span className="placedly-floating-cta-label">{label}</span>
              <span className="placedly-floating-cta-arrow"  aria-hidden>
                <ArrowRight size={16} strokeWidth={2.6} />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Wrapper ── */
        .placedly-floating-cta {
          position: fixed !important;
          left: 50% !important;
          bottom: 22px !important;
          transform: translate3d(-50%, 0, 0) !important;
          z-index: ${zIndex} !important;
          will-change: transform, opacity !important;
          pointer-events: auto !important;
        }

        /* ─────────────────────────────────────────────────────────
           1. TOP + SIDE arc — open at the bottom
           Sits 6 px outside the button on top/left/right.
           border-bottom: none  →  the arc is "open" at the floor.
           border-radius top corners are fully rounded (pill shape);
           bottom corners are 0 so the stroke ends flush / square,
           ready to meet the ground lines below.
        ───────────────────────────────────────────────────────── */
        .placedly-floating-cta-ring {
          position: absolute !important;
          top:    -6px !important;
          left:   -6px !important;
          right:  -6px !important;
          /* bottom exactly at the button floor — no gap */
          bottom:  0px !important;
          border: 1.5px solid rgba(15, 23, 42, 0.18) !important;
          border-bottom: none !important;
          /* top-left / top-right fully rounded; bottom corners square */
          border-radius: 9999px 9999px 0 0 !important;
          background: transparent !important;
          pointer-events: none !important;
          z-index: 0 !important;
        }

        /* ─────────────────────────────────────────────────────────
           2a. Ground line — LEFT side
           Starts at the left edge of the ring (button left – 6 px)
           and extends all the way to the left edge of the viewport.

           We use:
             position: fixed  (viewport-relative)
             right  = 50vw + half-button-width + 6 px ring offset
             bottom = 22 px (same as wrapper) so it aligns with the
                      bottom of the ring stroke
             left   = 0
             height = 1.5 px (same stroke weight as the ring)
        ───────────────────────────────────────────────────────── */
        .placedly-floating-cta-ground-left {
          position: fixed !important;
          /* anchor to the left edge of the ring */
          right: calc(50vw + (var(--cta-half-w, 90px) + 6px)) !important;
          left: 0 !important;
          bottom: 22px !important;   /* aligns with wrapper bottom  */
          height: 1.5px !important;
          background: rgba(15, 23, 42, 0.18) !important;
          pointer-events: none !important;
          z-index: ${zIndex} !important;
        }

        /* ─────────────────────────────────────────────────────────
           2b. Ground line — RIGHT side
           Mirror of the left line.
        ───────────────────────────────────────────────────────── */
        .placedly-floating-cta-ground-right {
          position: fixed !important;
          left: calc(50vw + (var(--cta-half-w, 90px) + 6px)) !important;
          right: 0 !important;
          bottom: 22px !important;
          height: 1.5px !important;
          background: rgba(15, 23, 42, 0.18) !important;
          pointer-events: none !important;
          z-index: ${zIndex} !important;
        }

        /* ── Button ── */
        .placedly-floating-cta-btn {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 12px 18px 12px 24px !important;
          min-height: 52px !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: 9999px !important;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%) !important;
          box-shadow:
            0 8px 22px rgba(249, 115, 22, 0.42),
            0 2px 6px  rgba(249, 115, 22, 0.28),
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
          z-index: 1 !important;
          transition:
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter      0.35s ease,
            transform   0.25s ease !important;
        }
        .placedly-floating-cta-btn:hover {
          box-shadow:
            0 14px 32px rgba(249, 115, 22, 0.52),
            0 4px  10px rgba(249, 115, 22, 0.36),
            inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
          filter: brightness(1.05) !important;
        }
        .placedly-floating-cta-btn:active {
          transform: translateY(0) !important;
          filter: brightness(0.96) !important;
        }
        .placedly-floating-cta-btn:focus-visible {
          outline: 2px solid ${ORANGE_LIGHT} !important;
          outline-offset: 4px !important;
        }

        /* ── Shine sweep ── */
        .placedly-floating-cta-shine {
          position: absolute !important;
          top:    0 !important;
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

        /* ── Label & arrow ── */
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
            transform    0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background   0.35s ease !important;
        }
        .placedly-floating-cta-btn:hover .placedly-floating-cta-arrow {
          transform: translateX(3px) !important;
          background: rgba(255, 255, 255, 0.34) !important;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .placedly-floating-cta {
            bottom: 18px !important;
          }
          .placedly-floating-cta-ring {
            top:  -5px !important;
            left: -5px !important;
            right: -5px !important;
          }
          .placedly-floating-cta-ground-left,
          .placedly-floating-cta-ground-right {
            bottom: 18px !important;
          }
          .placedly-floating-cta-btn {
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

        /* ── Reduced motion ── */
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