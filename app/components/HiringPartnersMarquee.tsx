'use client';

import { FadeUp } from './motion';

type Cms = Record<string, string>;

const DEFAULT_COMPANIES = [
  'EXL Services',
  'Quatrro',
  'WNS Global',
  'Optum',
  'Cognizant',
  'Wipro',
  'Infosys BPM',
  'Mphasis',
  'HCLTech',
  'Genpact',
  'Access Healthcare',
  'Conifer Health',
];

const MARQUEE_DURATION = 42; // seconds
const REPEATS = 3;

/* Accent palette — each company gets a deterministic color pair */
const ACCENTS: [string, string][] = [
  ['#6366f1', '#8b5cf6'],
  ['#3b82f6', '#06b6d4'],
  ['#f97316', '#fbbf24'],
  ['#ec4899', '#f43f5e'],
  ['#10b981', '#22c55e'],
  ['#0ea5e9', '#14b8a6'],
  ['#a855f7', '#d946ef'],
];

function accentFor(name: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

function rotateList<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const n = offset % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function buildSequence(companies: string[]): string[] {
  const sequence: string[] = [];
  for (let r = 0; r < REPEATS; r += 1) {
    sequence.push(...rotateList(companies, r * 2));
  }
  return sequence;
}

function parseCompanies(cms: Cms): string[] {
  const rawList = cms['hp:marqueeCompanies'];
  if (rawList) {
    const names = rawList.split(',').map((s) => s.trim()).filter(Boolean);
    if (names.length) return names;
  }
  return DEFAULT_COMPANIES;
}

function CompanyPill({ name }: { name: string }) {
  const [c1, c2] = accentFor(name);
  return (
    <span
      className="placedly-pill"
      style={
        {
          '--pill-c1': c1,
          '--pill-c2': c2,
        } as React.CSSProperties
      }
    >
      <span className="placedly-pill-dot" aria-hidden />
      <span className="placedly-pill-name">{name}</span>
    </span>
  );
}

function StripRow({
  sequence,
  reverse,
}: {
  sequence: string[];
  reverse?: boolean;
}) {
  return (
    <div className={`placedly-strip-track${reverse ? ' placedly-strip-track--reverse' : ''}`}>
      <div className="placedly-strip-inner">
        {sequence.map((name, i) => (
          <CompanyPill key={`a-${name}-${i}`} name={name} />
        ))}
      </div>
      <div className="placedly-strip-inner" aria-hidden>
        {sequence.map((name, i) => (
          <CompanyPill key={`b-${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export default function HiringPartnersMarquee({ cms = {} }: { cms?: Cms }) {
  const label = cms['hp:marqueeLabel'] ?? 'Our CAP candidates have landed roles at';
  const sub =
    cms['hp:marqueeSub'] ??
    'Through our placement network — roles sourced via trusted recruitment partners';

  const companies = parseCompanies(cms);
  const seqA = buildSequence(companies);
  const seqB = buildSequence(rotateList(companies, 5));

  return (
    <section className="placedly-partners-section" aria-label="Hiring partners">
      <FadeUp className="placedly-partners-header">
        <span className="placedly-partners-eyebrow">
          <span className="placedly-partners-eyebrow-line" aria-hidden />
          Trusted placement network
          <span className="placedly-partners-eyebrow-line" aria-hidden />
        </span>
        <h2 className="placedly-partners-title">{label}</h2>
        <p className="placedly-partners-sub">{sub}</p>
      </FadeUp>

      <div className="placedly-strip">
        <div className="placedly-strip-edge placedly-strip-edge--left" aria-hidden />
        <div className="placedly-strip-rows">
          <StripRow sequence={seqA} />
          <StripRow sequence={seqB} reverse />
        </div>
        <div className="placedly-strip-edge placedly-strip-edge--right" aria-hidden />
      </div>

      <style>{`
        .placedly-partners-section {
          padding: 56px 0;
        }

        .placedly-partners-header {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 30px;
          padding: 0 20px;
        }
        .placedly-partners-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .placedly-partners-eyebrow-line {
          width: 22px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
        }
        .placedly-partners-title {
          font-size: clamp(1.15rem, 2.4vw, 1.5rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.4px;
        }
        .placedly-partners-sub {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
        }

        /* ── Strip band ── */
        .placedly-strip {
          position: relative;
          overflow: hidden;
          padding: 4px 0;
        }
        .placedly-strip-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .placedly-strip-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 3;
          pointer-events: none;
        }
        .placedly-strip-edge--left {
          left: 0;
          background: linear-gradient(90deg, #fafafa 10%, rgba(250,250,250,0));
        }
        .placedly-strip-edge--right {
          right: 0;
          background: linear-gradient(270deg, #fafafa 10%, rgba(250,250,250,0));
        }

        .placedly-strip-track {
          display: flex;
          width: max-content;
          animation: placedly-strip-scroll ${MARQUEE_DURATION}s linear infinite;
        }
        .placedly-strip-track--reverse {
          animation-direction: reverse;
          animation-duration: ${MARQUEE_DURATION + 6}s;
        }
        .placedly-strip:hover .placedly-strip-track {
          animation-play-state: paused;
        }

        .placedly-strip-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-right: 14px;
          flex-shrink: 0;
        }

        /* ── Company pill ── */
        .placedly-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          white-space: nowrap;
          padding: 9px 18px 9px 15px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
          transition:
            transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.28s ease,
            border-color 0.28s ease;
        }
        .placedly-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          padding: 1px;
          background: linear-gradient(135deg, var(--pill-c1), var(--pill-c2));
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.28s ease;
        }
        .placedly-pill:hover {
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow:
            0 10px 24px -6px color-mix(in srgb, var(--pill-c1) 45%, transparent);
        }
        .placedly-pill:hover::before {
          opacity: 1;
        }

        .placedly-pill-dot {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--pill-c1), var(--pill-c2));
          flex-shrink: 0;
        }
        .placedly-pill-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: var(--pill-c1);
          opacity: 0.25;
          animation: placedly-pill-pulse 2.4s ease-in-out infinite;
        }

        .placedly-pill-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          transition: color 0.28s ease;
        }
        .placedly-pill:hover .placedly-pill-name {
          background-image: linear-gradient(135deg, var(--pill-c1), var(--pill-c2));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes placedly-strip-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes placedly-pill-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.25; }
          50%      { transform: scale(1.6); opacity: 0;    }
        }

        @media (prefers-reduced-motion: reduce) {
          .placedly-strip-track { animation: none; }
          .placedly-pill-dot::after { animation: none; }
          .placedly-strip-inner:nth-child(2) { display: none; }
          .placedly-strip-inner { flex-wrap: wrap; justify-content: center; }
        }

        @media (max-width: 639px) {
          .placedly-partners-section {
            padding: 40px 0;
          }
          .placedly-strip-rows {
            gap: 10px;
          }
          .placedly-strip-edge {
            width: 44px;
          }
          .placedly-strip-inner {
            gap: 10px;
            padding-right: 10px;
          }
          .placedly-pill {
            padding: 8px 14px 8px 12px;
            gap: 7px;
          }
          .placedly-pill-name {
            font-size: 12.5px;
          }
        }
      `}</style>
    </section>
  );
}