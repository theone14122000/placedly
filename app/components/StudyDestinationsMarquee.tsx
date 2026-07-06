'use client';

import { Sparkles } from 'lucide-react';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

/* ═══════════════════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════════════════ */
const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;
const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_SOFT = 'rgba(249, 115, 22, 0.10)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.30)';
const BLACK = '#0b0d20';
const TEXT_BODY = '#1e293b';
const TEXT_MUTED = '#64748b';
const BORDER = '#e5e7eb';
const SURFACE = '#ffffff';
const BG = '#fafafa';

/* ═══════════════════════════════════════════════════════════
   FLAGS — accurate small SVGs
══════════════════════════════════════════════════════════ */
const UKFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
  </svg>
);
const FranceFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="20" height="40" fill="#002395" />
    <rect x="20" width="20" height="40" fill="#fff" />
    <rect x="40" width="20" height="40" fill="#ED2939" />
  </svg>
);
const GermanyFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="14" fill="#000" />
    <rect y="13" width="60" height="14" fill="#DD0000" />
    <rect y="26" width="60" height="14" fill="#FFCE00" />
  </svg>
);
const UAEFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="40" fill="#fff" />
    <rect width="60" height="13" fill="#00732F" />
    <rect y="27" width="60" height="13" fill="#000" />
    <rect width="15" height="40" fill="#FF0000" />
  </svg>
);
const CanadaFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="40" fill="#fff" />
    <rect width="15" height="40" fill="#FF0000" />
    <rect x="45" width="15" height="40" fill="#FF0000" />
    <text x="30" y="27" textAnchor="middle" fontSize="18" fill="#FF0000">🍁</text>
  </svg>
);
const AustraliaFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="40" fill="#00008B" />
    <text x="30" y="28" textAnchor="middle" fontSize="18" fill="#fff">★</text>
  </svg>
);
const SingaporeFlag = () => (
  <svg width="22" height="14" viewBox="0 0 60 40" aria-hidden style={{ display: 'block' }}>
    <rect width="60" height="20" fill="#EF3340" />
    <rect y="20" width="60" height="20" fill="#fff" />
  </svg>
);

type Destination = {
  label: string;
  Flag: () => JSX.Element;
};

const DESTINATIONS: Destination[] = [
  { label: 'United Kingdom', Flag: UKFlag },
  { label: 'France',         Flag: FranceFlag },
  { label: 'Germany',        Flag: GermanyFlag },
  { label: 'Dubai / UAE',    Flag: UAEFlag },
  { label: 'Canada',         Flag: CanadaFlag },
  { label: 'Australia',      Flag: AustraliaFlag },
  { label: 'Singapore',      Flag: SingaporeFlag },
];

const ROW_SPEEDS = [180, 220, 165];
const ROW_REPEATS = 5;

function rotateList<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const n = offset % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function buildRowSequence(items: Destination[]): Destination[] {
  const sequence: Destination[] = [];
  for (let r = 0; r < ROW_REPEATS; r += 1) {
    sequence.push(...rotateList(items, r * 2));
  }
  return sequence;
}

function DestinationItem({ dest }: { dest: Destination }) {
  return (
    <span className="placedly-dest-item">
      <span className="placedly-dest-flag">
        <dest.Flag />
      </span>
      <span className="placedly-dest-label">{dest.label}</span>
    </span>
  );
}

function DestinationRow({
  items,
  reverse,
  duration,
}: {
  items: Destination[];
  reverse?: boolean;
  duration: number;
}) {
  const sequence = buildRowSequence(items);

  return (
    <div className="placedly-dest-row">
      <div className="placedly-dest-edge placedly-dest-edge--left" aria-hidden />
      <div
        className={`placedly-dest-track${reverse ? ' placedly-dest-track--reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="placedly-dest-inner">
          {sequence.map((dest, i) => (
            <DestinationItem key={`a-${dest.label}-${i}`} dest={dest} />
          ))}
        </div>
        <div className="placedly-dest-inner" aria-hidden>
          {sequence.map((dest, i) => (
            <DestinationItem key={`b-${dest.label}-${i}`} dest={dest} />
          ))}
        </div>
      </div>
      <div className="placedly-dest-edge placedly-dest-edge--right" aria-hidden />
    </div>
  );
}

type StudyDestinationsMarqueeProps = {
  cms?: Cms;
  label?: string;
  sub?: string;
};

export default function StudyDestinationsMarquee({
  cms = {},
  label: overrideLabel,
  sub: overrideSub,
}: StudyDestinationsMarqueeProps) {
  const label = overrideLabel ?? cms['hp:destinationLabel'] ?? 'Study Abroad Destinations We Support';
  const sub =
    overrideSub ??
    cms['hp:destinationSub'] ??
    "From UK's post-study work visa to Germany's zero tuition fees — we match you to the right country, right university, right course.";

  const rowSets = [
    DESTINATIONS,
    rotateList(DESTINATIONS, 3),
    rotateList(DESTINATIONS, 5),
  ];

  return (
    <section className="placedly-destinations-section" aria-label="Study abroad destinations">
      <FadeUp className="placedly-destinations-header">
        <p className="placedly-destinations-eyebrow">
          <Sparkles size={13} strokeWidth={2.25} aria-hidden />
          Study Destinations
        </p>
        <h2 className="placedly-destinations-title">{label}</h2>
        <p className="placedly-destinations-sub">{sub}</p>
      </FadeUp>

      <div className="placedly-destinations-rows">
        {rowSets.map((items, i) => (
          <DestinationRow
            key={i}
            items={items}
            reverse={i === 1}
            duration={ROW_SPEEDS[i] ?? 200}
          />
        ))}
      </div>

      <style>{`
        /* ============================================================
           FONT
         ============================================================ */
        .placedly-destinations-section,
        .placedly-destinations-section * {
          font-family: ${GEOM_FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
          box-sizing: border-box !important;
        }

        .placedly-destinations-section {
          position: relative;
          width: 100%;
          padding: clamp(48px, 6vw, 80px) clamp(14px, 4vw, 24px);
          background: ${BG};
          overflow: hidden;
        }

        .placedly-destinations-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 32px;
        }
        .placedly-destinations-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: ${ORANGE};
          margin-bottom: 10px;
          padding: 5px 11px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          border-radius: 999px;
        }
        .placedly-destinations-title {
          font-size: clamp(24px, 4.5vw, 38px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: ${BLACK};
          margin: 0 0 12px;
        }
        .placedly-destinations-sub {
          font-size: clamp(13.5px, 2.6vw, 15.5px);
          line-height: 1.6;
          color: ${TEXT_BODY};
          margin: 0;
        }

        .placedly-destinations-rows {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ═══ ROW ═══ */
        .placedly-dest-row {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .placedly-dest-edge {
          position: absolute;
          top: 0; bottom: 0;
          width: 50px;
          pointer-events: none;
          z-index: 2;
        }
        .placedly-dest-edge--left  { left: 0;  background: linear-gradient(90deg, ${BG} 0%, rgba(250,250,252,0) 100%); }
        .placedly-dest-edge--right { right: 0; background: linear-gradient(270deg, ${BG} 0%, rgba(250,250,252,0) 100%); }

        .placedly-dest-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: placedly-dest-marquee-fwd linear infinite;
        }
        .placedly-dest-track--reverse {
          animation-name: placedly-dest-marquee-bwd;
        }

        @keyframes placedly-dest-marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes placedly-dest-marquee-bwd {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .placedly-dest-inner {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          padding: 0 14px;
        }

        /* ═══ ITEM: clean pill — flag + name ═══ */
        .placedly-dest-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 8px;
          margin: 0 6px;
          background: ${SURFACE};
          border: 1px solid rgba(15, 23, 42, 0.10);
          border-radius: 999px;
          flex-shrink: 0;
          cursor: default;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .placedly-dest-item:hover {
          border-color: ${ORANGE};
          background: ${ORANGE_SOFT};
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.12);
        }

        /* Flag container — clean white, thin border, no shadow */
        .placedly-dest-flag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 5px;
          background: ${SURFACE};
          border: 1px solid rgba(15, 23, 42, 0.10);
          flex-shrink: 0;
          overflow: hidden;
        }
        .placedly-dest-flag svg {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 4px;
        }

        /* Country name */
        .placedly-dest-label {
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          color: ${BLACK};
          white-space: nowrap;
          line-height: 1;
        }

        /* Pause on hover anywhere on the section */
        .placedly-destinations-section:hover .placedly-dest-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .placedly-dest-track { animation: none !important; }
        }

        @media (max-width: 640px) {
          .placedly-dest-item {
            padding: 6px 14px 6px 6px;
            gap: 8px;
          }
          .placedly-dest-flag { width: 22px; height: 22px; border-radius: 4px; }
          .placedly-dest-label { font-size: 12.5px; }
        }
      `}</style>
    </section>
  );
}