'use client';

import { FadeUp } from './motion';

type Cms = Record<string, string>;

const DEFAULT_COMPANIES = [
  'EXL Services',
  'Quatrro',
  'eBiz Solutions',
  'WNS Global',
  'Optum',
  'Cognizant',
  'Wipro',
  'Infosys BPM',
  'Mphasis',
  'HCL',
  'Genpact',
  'Access Healthcare',
  'Conifer Health',
];

const ROW_SPEEDS = [520, 620, 450];
const ROW_REPEATS = 5;

function rotateList<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const n = offset % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function buildRowSequence(companies: string[]): string[] {
  const sequence: string[] = [];
  for (let r = 0; r < ROW_REPEATS; r += 1) {
    sequence.push(...rotateList(companies, r * 2));
  }
  return sequence;
}

function LogoRow({
  companies,
  reverse,
  duration,
}: {
  companies: string[];
  reverse?: boolean;
  duration: number;
}) {
  const sequence = buildRowSequence(companies);

  return (
    <div className="placedly-partners-row">
      <div className="placedly-partners-edge placedly-partners-edge--left" aria-hidden />
      <div
        className={`placedly-partners-track${reverse ? ' placedly-partners-track--reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="placedly-partners-inner">
          {sequence.map((name, i) => (
            <span
              key={`a-${name}-${i}`}
              className="placedly-partners-logo"
              title={name}
              aria-label={name}
            >
              <span className="placedly-partners-logo-name">{name}</span>
            </span>
          ))}
        </div>
        <div className="placedly-partners-inner" aria-hidden>
          {sequence.map((name, i) => (
            <span
              key={`b-${name}-${i}`}
              className="placedly-partners-logo"
              title={name}
              aria-hidden
            >
              <span className="placedly-partners-logo-name">{name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="placedly-partners-edge placedly-partners-edge--right" aria-hidden />
    </div>
  );
}

export default function HiringPartnersMarquee({ cms = {} }: { cms?: Cms }) {
  const label = cms['hp:marqueeLabel'] ?? 'Our CAP candidates have landed roles at';
  const sub =
    cms['hp:marqueeSub'] ??
    'Through our placement network — roles sourced via trusted recruitment partners';
  const rawList = cms['hp:marqueeCompanies'] ?? '';
  const companies = rawList
    ? rawList.split(',').map((s) => s.trim()).filter(Boolean)
    : DEFAULT_COMPANIES;

  const rowSets = [
    companies,
    rotateList(companies, 4),
    rotateList(companies, 8),
  ];

  return (
    <section className="placedly-partners-section" aria-label="Hiring partners">
      <FadeUp className="placedly-partners-header">
        <h2 className="placedly-partners-title">{label}</h2>
        <p className="placedly-partners-sub">{sub}</p>
      </FadeUp>

      <div className="placedly-partners-rows">
        {rowSets.map((rowCompanies, i) => (
          <LogoRow
            key={i}
            companies={rowCompanies}
            reverse={i % 2 === 1}
            duration={ROW_SPEEDS[i] ?? 45}
          />
        ))}
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════
           BASE / DESKTOP STYLES
        ═══════════════════════════════════════════════ */
        .placedly-partners-section {
          position: relative;
          padding: 72px 0;
          overflow: hidden;
          background: #ffffff;
        }

        .placedly-partners-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 48px;
          padding: 0 24px;
        }

        .placedly-partners-title {
          font-size: 30px;
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0 0 10px 0;
        }

        .placedly-partners-sub {
          font-size: 16px;
          line-height: 1.6;
          font-weight: 400;
          color: #64748b;
          margin: 0;
        }

        .placedly-partners-rows {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .placedly-partners-row {
          position: relative;
          overflow: hidden;
          height: 40px;
        }

        .placedly-partners-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 140px;
          z-index: 3;
          pointer-events: none;
        }
        .placedly-partners-edge--left {
          left: 0;
          background: linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%);
        }
        .placedly-partners-edge--right {
          right: 0;
          background: linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%);
        }

        .placedly-partners-track {
          display: flex;
          width: max-content;
          animation-name: placedly-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .placedly-partners-track--reverse {
          animation-direction: reverse;
        }
        .placedly-partners-row:hover .placedly-partners-track {
          animation-play-state: paused;
        }

        @keyframes placedly-marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .placedly-partners-inner {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .placedly-partners-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          margin: 0 32px;
          background: transparent;
          border: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .placedly-partners-logo:hover {
          opacity: 0.7;
          transform: translateY(-1px);
        }

        .placedly-partners-logo-name {
          font-size: 19px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        /* ═══════════════════════════════════════════════
           MOBILE OVERRIDES
        ═══════════════════════════════════════════════ */
        @media (max-width: 768px) {

          .placedly-partners-section {
            padding: 28px 0 24px !important;
            margin-top: 0 !important;
            overflow: hidden !important;
          }

          .placedly-partners-header {
            padding: 0 16px !important;
            margin-bottom: 16px !important;
            text-align: center !important;
          }

          .placedly-partners-title {
            font-size: 16px !important;
            line-height: 1.3 !important;
            font-weight: 700 !important;
            letter-spacing: -0.02em !important;
            color: #0f172a !important;
            margin: 0 0 6px 0 !important;
            padding: 0 !important;
          }

          .placedly-partners-sub {
            font-size: 11.5px !important;
            line-height: 1.5 !important;
            font-weight: 400 !important;
            color: #64748b !important;
            margin: 0 !important;
            padding: 0 8px !important;
            max-width: 320px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .placedly-partners-rows {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
          }

          .placedly-partners-row {
            position: relative !important;
            overflow: hidden !important;
            height: 28px !important;
          }

          /* Edge fade masks removed on mobile — they were showing
             up as visible seams/borders on the left and right */
          .placedly-partners-edge {
            display: none !important;
          }

          .placedly-partners-inner {
            gap: 0 !important;
            flex-shrink: 0 !important;
          }

          .placedly-partners-logo {
            gap: 6px !important;
            padding: 0 !important;
            margin: 0 14px !important;
            background: transparent !important;
            border: none !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }

          .placedly-partners-logo-name {
            font-size: 13px !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            letter-spacing: -0.005em !important;
            line-height: 1 !important;
          }

          .placedly-partners-row:nth-child(3) {
            display: none !important;
          }
        }

        /* ── Even smaller screens ── */
        @media (max-width: 380px) {
          .placedly-partners-title {
            font-size: 14px !important;
          }
          .placedly-partners-sub {
            font-size: 10.5px !important;
            padding: 0 4px !important;
          }
          .placedly-partners-logo {
            gap: 5px !important;
            margin: 0 11px !important;
          }
          .placedly-partners-logo-name {
            font-size: 12px !important;
          }
          .placedly-partners-row {
            height: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
