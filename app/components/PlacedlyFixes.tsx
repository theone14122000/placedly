'use client';

import { useEffect } from 'react';

export default function PlacedlyFixes() {
  useEffect(() => {
    function killBadge() {
      const badge = document.querySelector('.w-webflow-badge');
      if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
    }

    killBadge();
    const t1 = setTimeout(killBadge, 400);
    const t2 = setTimeout(killBadge, 1200);

    const obs = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (
            n instanceof HTMLElement &&
            n.classList.contains('w-webflow-badge') &&
            n.parentNode
          ) {
            n.parentNode.removeChild(n);
          }
        });
      });
    });

    obs.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      obs.disconnect();
    };
  }, []);

  return null;
}
