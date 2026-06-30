'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const selectors = [
      '.section-title-wrapper',
      '.single-service-wrap',
      '.single-process-row',
      '.single-event-wrap',
      '.choose-us-card-wrap',
      '.testimonial-single-wrap',
      '.about-image-wrap',
      '.ceo-quote-content-wrap',
      '.faq-single-accordion-wrap',
      '.footer-details-wrapper',
      '.footer-menu-single',
      '[data-reveal]',
      '.sr-ready',
    ];

    const elements: Element[] = [];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('sr-visible')) {
          if (!el.classList.contains('sr-ready')) el.classList.add('sr-ready');
          elements.push(el);
        }
      });
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add('sr-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    // Stagger children in grids
    const gridParents = [
      '.events-grid-wrap',
      '.services-grid',
      '.choose-us-grid',
      '.faqs-flex-wrap',
      '.inner-grid-3',
      '.vacancies-grid',
      '.contact-info-grid',
    ];

    gridParents.forEach(sel => {
      document.querySelectorAll(sel).forEach(parent => {
        Array.from(parent.children).forEach((child, i) => {
          if (!child.classList.contains('sr-visible')) {
            if (!child.classList.contains('sr-ready')) child.classList.add('sr-ready');
            (child as HTMLElement).dataset.delay = String(i * 80);
            elements.push(child);
          }
        });
      });
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
