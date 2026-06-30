'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTION_ID = 'cap-journey';

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
  );
}

export { SECTION_ID as CAP_JOURNEY_SECTION_ID };
