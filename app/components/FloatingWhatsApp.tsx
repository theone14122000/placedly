'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Show WhatsApp when the user scrolls within this distance of the page bottom */
const FOOTER_PROXIMITY = 520;

export default function FloatingWhatsApp({ cms = {} }: { cms?: Record<string, string> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      setVisible(scrollBottom >= pageBottom - FOOTER_PROXIMITY);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-buttons"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <a
            className="float-btn whatsapp"
            href={`https://wa.me/${cms['hp:waNumber'] ?? '919876543210'}?text=Hi%2C%20I%27m%20interested%20in%20your%20career%20services`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us"
            title="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="26"
              height="26"
              fill="#fff"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.474 2.027 7.774L0 32l8.469-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.847l-.485-.288-5.026 1.187 1.22-4.902-.317-.502A13.261 13.261 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.264-9.878c-.398-.2-2.355-1.161-2.72-1.294-.365-.133-.632-.2-.898.2-.266.4-1.031 1.294-1.264 1.56-.233.267-.466.3-.864.1-.398-.2-1.68-.619-3.2-1.973-1.183-1.054-1.981-2.356-2.214-2.756-.233-.4-.025-.615.175-.814.18-.179.398-.466.598-.7.2-.233.266-.4.398-.666.133-.267.067-.5-.033-.7-.1-.2-.898-2.163-1.231-2.963-.324-.778-.654-.673-.898-.686-.233-.013-.5-.016-.765-.016-.266 0-.698.1-.1.064-1.5 1.563-.032 3.613-.032 3.613s1.032 3.247 2.398 4.597c1.365 1.35 3.597 2.647 5.064 3.097.665.207 1.184.329 1.588.421.667.152 1.274.13 1.754.079.535-.058 1.647-.673 1.88-1.323.233-.65.233-1.207.163-1.324-.067-.116-.266-.183-.565-.316z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
