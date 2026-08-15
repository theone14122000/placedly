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
  label = 'Apply for CAP ',
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
            {/* White bottom band + small centered notch.
                The band is the "white section" below the colored
                content (full-width strip at the viewport bottom).
                The notch is a small upward tab from that band that
                wraps around the button; the button sits on top of it. */}
            <span className="placedly-floating-cta-band" aria-hidden />
            <span className="placedly-floating-cta-notch" aria-hidden />
            <span className="placedly-floating-cta-flare placedly-floating-cta-flare--left" aria-hidden />
            <span className="placedly-floating-cta-flare placedly-floating-cta-flare--right" aria-hidden />

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
        /* ── Root anchor ──
           Fixed at the very bottom edge of the viewport. Height fits
           the button + band; children are absolutely positioned. */
        .placedly-floating-cta {
          position: fixed !important;
          left: 50% !important;
          bottom: 0 !important;
          transform: translate3d(-50%, 0, 0) !important;
          z-index: ${zIndex} !important;
          will-change: transform, opacity !important;
          pointer-events: auto !important;
          width: max-content !important;
          display: flex !important;
          align-items: flex-end !important;
          height: 100px !important;
        }

        /* ── White bottom band ──
           The white section below the colored section: a short
           full-width strip at the viewport bottom, sitting BEHIND
           the notch and button. */
        .placedly-floating-cta-band {
          position: absolute !important;
          left: 50% !important;
          right: auto !important;
          bottom: 0 !important;
          transform: translateX(-50%) !important;
          width: 100vw !important;
          height: 24px !important;
          background: #ffffff !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }

        /* ── White notch ──
           Small centered upward tab from the band: only slightly
           wider than the button (button + ~52px, ~220–245px total),
           large rounded TOP corners only, straight sides flowing
           into the band below. The button sits roughly centered
           inside it: ~10px white above, ~14px white below. Merges
           with the band (same white) into one shape — reads as a
           small cutout taken out of the colored section's bottom
           edge, NOT a card. */
        .placedly-floating-cta-notch {
          position: absolute !important;
          left: 50% !important;
          bottom: 0 !important;
          transform: translateX(-50%) !important;
          width: calc(100% + 52px) !important;
          max-width: 245px !important;
          height: 74px !important;
          border-radius: 26px 26px 0 0 !important;
          background: #ffffff !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }

        /* ── Notch-to-band fillets ──
           White discs centered exactly on the corner where the notch's
           straight side wall meets the band's straight top edge, so the
           outline sweeps a smooth quarter-circle there instead of a
           sharp 90° angle. Same white as band + notch, so they merge
           invisibly into one silhouette. */
        .placedly-floating-cta-notch::before,
        .placedly-floating-cta-notch::after {
          content: '' !important;
          position: absolute !important;
          bottom: 0 !important;
          width: 24px !important;
          height: 24px !important;
          background: #ffffff !important;
          border-radius: 50% !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }
        .placedly-floating-cta-notch::before { left: -24px !important; }
        .placedly-floating-cta-notch::after  { right: -24px !important; }

        .placedly-floating-cta-flare {
          position: absolute !important;
          bottom: 0 !important;
          width: 34px !important;
          height: 34px !important;
          background: #ffffff !important;
          border-radius: 50% !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }
        /* Left/right flare rams flush against the notch's lower side walls,
           merging with the band below — the pocket's sides now slope out
           in a soft curve instead of a sharp 90° step. 26px = half of the
           notch's 52px overhang (22px on mobile). */
        .placedly-floating-cta-flare--left  { left: calc(50% - 26px - 34px) !important; }
        .placedly-floating-cta-flare--right { right: calc(50% - 26px - 34px) !important; }

        .placedly-floating-cta-btn {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          padding: 8px 14px 8px 20px !important;
          min-height: 50px !important;
          max-width: 175px !important;
          margin-bottom: 14px !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: 12px !important;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%) !important;
          box-shadow:
            0 8px 22px rgba(249, 115, 22, 0.42),
            0 2px 6px rgba(249, 115, 22, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.22) !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-family: 'Inter', 'Manrope', 'Geist', -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          letter-spacing: -0.005em !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          cursor: pointer !important;
          isolation: isolate !important;
          overflow: hidden !important;
          z-index: 1 !important;
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
          transform: translateY(0) !important;
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
          width: 28px !important;
          height: 28px !important;
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
          .placedly-floating-cta-notch {
            width: calc(100% + 44px) !important;
            max-width: 220px !important;
            height: 68px !important;
            border-radius: 22px 22px 0 0 !important;
          }
          .placedly-floating-cta-flare {
            width: 30px !important;
            height: 30px !important;
          }
          .placedly-floating-cta-flare--left  { left: calc(50% - 22px - 30px) !important; }
          .placedly-floating-cta-flare--right { right: calc(50% - 22px - 30px) !important; }
          .placedly-floating-cta-band {
            height: 20px !important;
            width: 100vw !important;
          }
          .placedly-floating-cta-notch::before,
          .placedly-floating-cta-notch::after {
            width: 20px !important;
            height: 20px !important;
          }
          .placedly-floating-cta-notch::before { left: -20px !important; }
          .placedly-floating-cta-notch::after  { right: -20px !important; }
          .placedly-floating-cta-btn {
            min-height: 48px !important;
            padding: 8px 12px 8px 16px !important;
            font-size: 13px !important;
            gap: 8px !important;
            margin-bottom: 12px !important;
            max-width: 170px !important;
          }
          .placedly-floating-cta-arrow {
            width: 26px !important;
            height: 26px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .placedly-floating-cta,
          .placedly-floating-cta-btn,
          .placedly-floating-cta-arrow,
          .placedly-floating-cta-notch,
          .placedly-floating-cta-band,
          .placedly-floating-cta-shine {
            transition: opacity 0.2s ease !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
