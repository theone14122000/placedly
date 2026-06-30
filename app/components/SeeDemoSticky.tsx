'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SeeDemoButton from './SeeDemoButton';
import { useSeeDemo } from './SeeDemoContext';

const SCROLL_SHOW = 360;
const FOOTER_BUFFER = 280;

export default function SeeDemoSticky() {
  const { isOpen } = useSeeDemo();
  const [visible, setVisible] = useState(false);
  const [capJourneyVisible, setCapJourneyVisible] = useState(false);

  useEffect(() => {
    const capSection = document.getElementById('cap-journey');
    let capObserver: IntersectionObserver | undefined;

    if (capSection) {
      capObserver = new IntersectionObserver(
        ([entry]) => setCapJourneyVisible(entry.isIntersecting),
        { threshold: 0.05, rootMargin: '-8% 0px -32% 0px' },
      );
      capObserver.observe(capSection);
    }

    const onScroll = () => {
      const y = window.scrollY;
      const nearFooter =
        y + window.innerHeight >= document.documentElement.scrollHeight - FOOTER_BUFFER;
      setVisible(y > SCROLL_SHOW && !nearFooter);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      capObserver?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const show = visible && !isOpen && !capJourneyVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="placedly-see-demo-sticky"
          role="complementary"
          aria-label="Book a demo"
          initial={{ opacity: 0, y: 28, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <div className="placedly-see-demo-sticky-inner">
            <div className="placedly-see-demo-sticky-glass">
              <SeeDemoButton variant="default" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
