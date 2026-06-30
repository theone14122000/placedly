'use client';
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

// ─── Shared variants ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// ─── Viewport defaults ───────────────────────────────────────────────────────
const vp = { once: true, amount: 0.15 };

// ─── Convenience wrappers ────────────────────────────────────────────────────

type DivProps = HTMLMotionProps<'div'> & { children?: ReactNode; delay?: number };

export function FadeUp({ children, delay = 0, className, style, ...rest }: DivProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      transition={{ delay }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className, style, ...rest }: DivProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      transition={{ delay }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SlideLeft({ children, delay = 0, className, style }: DivProps) {
  return (
    <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function SlideRight({ children, delay = 0, className, style }: DivProps) {
  return (
    <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className, style }: DivProps) {
  return (
    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

/** Staggered grid: wraps a list and staggers each child's fadeUp */
export function StaggerGrid({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside a StaggerGrid — use this for each card */
export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div variants={fadeUp} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export { motion };
