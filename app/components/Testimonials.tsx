'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const testimonials = [
  {
    details: (
      <>
        <strong className="placedly-testimonial-highlight">+73% CTC Growth ★★★★★</strong>
        <br />
        &quot;4 years in US healthcare claims and my career had stalled at ₹4.2L. Placedly rebuilt my resume from scratch, coached me for the domain round, and sent my profile directly to a hiring manager at EXL. 18 days later — offer letter in hand at ₹7.3L. I paid the Success Share happily.&quot;
      </>
    ),
    name: 'Priya Sharma',
    date: 'Claims Analyst → Sr. Claims Analyst, Gurgaon | +73% CTC',
    img: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    details: (
      <>
        <strong className="placedly-testimonial-highlight">+71% CTC Growth ★★★★★</strong>
        <br />
        &quot;I had a 14-month career gap and had been rejected by three agencies. Placedly didn&apos;t just take my case — they coached me on exactly how to own my gap in an interview. Three weeks later, placed at an MNC in Noida. Knowing they only earn after I land the role is what gave me the confidence to try.&quot;
      </>
    ),
    name: 'Rahul Mehta',
    date: 'Associate → Operations Lead, Noida | +71% CTC',
    img: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    details: (
      <>
        <strong className="placedly-testimonial-highlight">+68% CTC Growth ★★★★★</strong>
        <br />
        &quot;I was in BPO for 5 years wanting to break into insurance ops. Placedly knew which companies were actively hiring and introduced me directly to the hiring manager. Got placed on my very first interview. Worth every rupee of the Success Share.&quot;
      </>
    ),
    name: 'Anjali Kapoor',
    date: 'BPO → Insurance Operations, Delhi | +68% CTC',
    img: 'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    details: (
      <>
        &quot;Placedly isn&apos;t just a service — it&apos;s a career partner. I highly recommend them to anyone serious about growing professionally.&quot;
      </>
    ),
    name: 'Harshall Gibbs',
    date: 'March 28, 2024',
    img: 'https://images.unsplash.com/photo-1646743231546-2e846f063199?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    details: (
      <>
        &quot;What stood out was how personalised everything felt. They understood my goals and helped me land a job I actually love.&quot;
      </>
    ),
    name: 'Ayesha K.',
    date: 'March 28, 2024',
    img: 'https://images.unsplash.com/photo-1642757205086-567b72efaa80?w=120&h=120&fit=crop&crop=face&q=80',
  },
];

type TestimonialItem = {
  details: React.ReactNode;
  name: string;
  date: string;
  img: string;
};

/* Modern geometric sans-serif stack */
const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article className="placedly-genz-glass placedly-testimonial-card">
      <Quote className="placedly-testimonial-quote-icon" size={26} strokeWidth={1.5} aria-hidden />
      <div className="placedly-testimonial-body">{t.details}</div>
      <div className="placedly-testimonial-author">
        <img src={t.img} alt={t.name} loading="lazy" className="placedly-testimonial-avatar" />
        <div className="placedly-testimonial-author-info">
          <h3 className="placedly-testimonial-name">{t.name}</h3>
          <p className="placedly-testimonial-date">{t.date}</p>
        </div>
      </div>
    </article>
  );
}

const AUTO_SLIDE_MS = 3500;

function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const computePerView = () => {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1024) return 2;
      return 3;
    };
    const onResize = () => {
      setPerView(computePerView());
      setActive(0);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, items.length - perView);

  const applyTransform = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const firstSlide = track.children[0] as HTMLElement | undefined;
      if (!firstSlide) return;
      const slideWidth = firstSlide.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      const offset = index * (slideWidth + gap);
      track.style.transform = `translateX(${-offset}px)`;
    },
    [],
  );

  useEffect(() => {
    applyTransform(active);
  }, [active, perView, applyTransform]);

  useEffect(() => {
    if (maxIndex === 0) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActive((cur) => (cur >= maxIndex ? 0 : cur + 1));
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="placedly-testimonials-carousel">
      <div className="placedly-testimonials-viewport" ref={viewportRef}>
        <div className="placedly-testimonials-track" ref={trackRef}>
          {items.map((t, i) => (
            <div
              className="placedly-testimonials-slide"
              key={`${t.name}-${i}`}
              style={{ flexBasis: `calc((100% - ${(perView - 1) * 20}px) / ${perView})` }}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="placedly-testimonials-dots" role="tablist" aria-label="Testimonials">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`placedly-testimonials-dot${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [cmsTestimonials, setCmsTestimonials] = useState<
    Array<{ name: string; role: string; company: string; text: string; rating: number }> | null
  >(null);

  useEffect(() => {
    fetch('/api/admin/content?prefix=faq:')
      .then((r) => r.json())
      .then((map: Record<string, string>) => {
        try {
          const raw = map['faq:data'];
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.testimonials) && parsed.testimonials.length > 0) {
            setCmsTestimonials(parsed.testimonials);
          }
        } catch {
          // keep defaults
        }
      })
      .catch(() => {});
  }, []);

  const imgFallbacks = [
    'https://images.unsplash.com/photo-1758518729459-235dcaadc611?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1646743231546-2e846f063199?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1642757205086-567b72efaa80?w=120&h=120&fit=crop&crop=face&q=80',
  ];

  const items: TestimonialItem[] = cmsTestimonials
    ? cmsTestimonials.map((t, i) => ({
        details: t.text,
        name: t.name,
        date: `${t.role}${t.company ? ', ' + t.company : ''}`,
        img: imgFallbacks[i % imgFallbacks.length],
      }))
    : testimonials;

  return (
    <section className="placedly-genz-section placedly-testimonials-section" id="testimonials">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-genz-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="placedly-genz-eyebrow">Success Stories</p>
          <h2 className="placedly-genz-title">Real People. Real Growth.</h2>
        </motion.div>

        <TestimonialsCarousel items={items} />
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           ============================================================ */
        .placedly-testimonials-section,
        .placedly-testimonials-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
        }

        /* ============================================================
           SECTION
           ============================================================ */
        .placedly-testimonials-section {
          position: relative;
          padding: clamp(72px, 9vw, 130px) clamp(16px, 5vw, 24px);
          background: #f8fafc;
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .placedly-genz-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto clamp(40px, 6vw, 64px);
        }

        .placedly-genz-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          background: #eef2ff;
          color: #1e1b4b;
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 999px;
          margin: 0 0 18px;
        }

        .placedly-genz-title {
          font-size: clamp(28px, 3.6vw, 44px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #0f172a;
          margin: 0;
        }

        /* ============================================================
           CAROUSEL
           ============================================================ */
        .placedly-testimonials-carousel {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .placedly-testimonials-viewport {
          overflow: hidden;
          width: 100%;
          padding: 4px;
        }

        .placedly-testimonials-track {
          display: flex;
          gap: 20px;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .placedly-testimonials-slide {
          flex-shrink: 0;
          min-width: 0;
        }

        /* ============================================================
           CARD
           ============================================================ */
        .placedly-testimonial-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 20px;
          padding: 28px 24px 22px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 8px 28px rgba(15, 23, 42, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .placedly-testimonial-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          border-color: rgba(37, 99, 235, 0.18);
        }

        .placedly-testimonial-quote-icon {
          color: #2563eb;
          opacity: 0.4;
          flex-shrink: 0;
        }

        .placedly-testimonial-body {
          font-size: 14.5px;
          line-height: 1.7;
          color: #475569;
          flex: 1;
        }

        .placedly-testimonial-highlight {
          display: inline-block;
          font-size: 12.5px;
          font-weight: 700;
          color: #1e1b4b;
          background: #eef2ff;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
          letter-spacing: 0.005em;
        }

        /* ============================================================
           AUTHOR
           ============================================================ */
        .placedly-testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
        }

        .placedly-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: #f1f5f9;
        }

        .placedly-testimonial-author-info {
          min-width: 0;
        }

        .placedly-testimonial-name {
          font-size: 14.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .placedly-testimonial-date {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.3;
          font-weight: 500;
        }

        /* ============================================================
           DOTS
           ============================================================ */
        .placedly-testimonials-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }

        .placedly-testimonials-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.15);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.3s ease, width 0.3s ease, transform 0.3s ease;
        }

        .placedly-testimonials-dot:hover {
          background: rgba(15, 23, 42, 0.3);
        }

        .placedly-testimonials-dot.is-active {
          background: #0f172a;
          width: 24px;
          border-radius: 4px;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 1024px) {
          .placedly-testimonial-card {
            padding: 24px 20px 20px;
          }
        }

        @media (max-width: 640px) {
          .placedly-testimonials-section {
            padding: 56px 16px;
          }
          .placedly-genz-header {
            margin-bottom: 32px;
          }
          .placedly-genz-title {
            font-size: clamp(1.6rem, 5vw, 2rem);
          }
          .placedly-testimonials-track {
            gap: 14px;
          }
          .placedly-testimonial-card {
            padding: 22px 18px 18px;
            border-radius: 18px;
          }
          .placedly-testimonial-body {
            font-size: 14px;
          }
          .placedly-testimonial-avatar {
            width: 40px;
            height: 40px;
          }
          .placedly-testimonials-dots {
            margin-top: 22px;
          }
        }
      `}</style>
    </section>
  );
}