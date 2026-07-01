'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const testimonials = [
  {
    details: (
      <>
        <strong>+73% CTC Growth ★★★★★</strong>
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
        <strong>+71% CTC Growth ★★★★★</strong>
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
        <strong>+68% CTC Growth ★★★★★</strong>
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

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article className="placedly-genz-glass placedly-testimonial-card">
      <Quote className="placedly-testimonial-quote-icon" size={28} strokeWidth={1.5} aria-hidden />
      <div className="placedly-testimonial-body">{t.details}</div>
      <div className="placedly-testimonial-author">
        <img src={t.img} alt={t.name} loading="lazy" className="placedly-testimonial-avatar" />
        <div>
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

  // translate track by measuring the first slide width + gap
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
              className={active === i ? 'is-active' : ''}
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
    </section>
  );
}
