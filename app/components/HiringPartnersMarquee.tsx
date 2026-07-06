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

/* ═══════════════════════════════════════════════════════════
   LOGO COMPONENTS
══════════════════════════════════════════════════════════ */
const VB = '0 0 24 24';

function LogoExl() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#1A2D5A" opacity="0.08" />
      <text x="12" y="15.5" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="800" fill="#1A2D5A" letterSpacing="0.6">EXL</text>
    </svg>
  );
}

function LogoQuatrro() {
  return (
    <svg viewBox={VB} aria-hidden>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="#E11D48" strokeWidth="1.5" />
      <text x="12" y="15.5" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="800" fill="#E11D48" letterSpacing="0.4">Q</text>
    </svg>
  );
}

function LogoEbiz() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#0F766E" />
      <text x="12" y="15" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="8" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">eBiz</text>
    </svg>
  );
}

function LogoWns() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" fill="#8B0000" />
      <text x="12" y="14.5" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">WNS</text>
    </svg>
  );
}

function LogoOptum() {
  return (
    <svg viewBox={VB} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#00A19A" />
      <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

function LogoCognizant() {
  return (
    <svg viewBox={VB} aria-hidden>
      <path fill="#1A3C8B" d="M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z" />
      <path fill="#1A3C8B" d="M9 9 H15 V15 H9 Z" opacity="0.35" />
    </svg>
  );
}

function LogoWipro() {
  return (
    <svg viewBox={VB} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#341C56" />
      <path fill="#FFFFFF" d="M8 8 L16 8 L16 10.5 L13 10.5 L13 16 L11 16 L11 10.5 L8 10.5 Z" />
    </svg>
  );
}

function LogoInfosys() {
  return (
    <svg viewBox={VB} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#007CC0" />
      <text x="12" y="15" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="6" fontWeight="800" fill="#FFFFFF" letterSpacing="0.3">INFOSYS</text>
    </svg>
  );
}

function LogoMphasis() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#9F1B3D" />
      <text x="12" y="15" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">MPHASIS</text>
    </svg>
  );
}

function LogoHcl() {
  return (
    <svg viewBox={VB} aria-hidden>
      <path fill="#0D47A1" d="M2 12c2-5 5-8 10-8s8 3 10 8c-2 5-5 8-10 8S4 17 2 12Z" />
      <text x="12" y="14" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">HCL</text>
    </svg>
  );
}

function LogoGenpact() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="10" fill="#FF6B00" />
      <text x="12" y="15" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">G</text>
    </svg>
  );
}

function LogoAccessHealthcare() {
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="#0E5A8A" />
      <text x="12" y="13" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="4.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.2">ACCESS</text>
      <text x="12" y="17" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="4" fontWeight="700" fill="#FFFFFF" letterSpacing="0.2">HEALTHCARE</text>
    </svg>
  );
}

function LogoConifer() {
  return (
    <svg viewBox={VB} aria-hidden>
      <path fill="#2E7D32" d="M12 2 L7.5 11 L10.5 11 L7 17.5 L11.5 17.5 L11.5 22 L12.5 22 L12.5 17.5 L17 17.5 L13.5 11 L16.5 11 Z" />
    </svg>
  );
}

const LOGO_MAP: Record<string, () => JSX.Element> = {
  'EXL Services':       () => <LogoExl />,
  'Quatrro':            () => <LogoQuatrro />,
  'eBiz Solutions':     () => <LogoEbiz />,
  'WNS Global':         () => <LogoWns />,
  'Optum':              () => <LogoOptum />,
  'Cognizant':          () => <LogoCognizant />,
  'Wipro':              () => <LogoWipro />,
  'Infosys BPM':        () => <LogoInfosys />,
  'Mphasis':            () => <LogoMphasis />,
  'HCL':                () => <LogoHcl />,
  'Genpact':            () => <LogoGenpact />,
  'Access Healthcare':  () => <LogoAccessHealthcare />,
  'Conifer Health':     () => <LogoConifer />,
};

function LogoFallback({ name }: { name: string }) {
  const initials = name
    .replace(/[.,]/g, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  return (
    <svg viewBox={VB} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#475569" />
      <text
        x="12" y="15.5"
        textAnchor="middle"
        fontFamily="Inter,system-ui,sans-serif"
        fontSize={initials.length > 2 ? '6' : '8'}
        fontWeight="800"
        fill="#FFFFFF"
        letterSpacing="0.3"
      >
        {initials}
      </text>
    </svg>
  );
}

function renderCompanyLogo(name: string): JSX.Element {
  const factory = LOGO_MAP[name];
  if (factory) return factory();
  return <LogoFallback name={name} />;
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
              <span className="placedly-partners-logo-svg" aria-hidden>
                {renderCompanyLogo(name)}
              </span>
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
              <span className="placedly-partners-logo-svg" aria-hidden>
                {renderCompanyLogo(name)}
              </span>
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
          gap: 24px;
        }

        .placedly-partners-row {
          position: relative;
          overflow: hidden;
          height: 68px;
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
          padding: 10px 20px 10px 10px;
          margin: 0 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.08);
          white-space: nowrap;
          height: 48px;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .placedly-partners-logo:hover {
          background: rgba(249, 115, 22, 0.08);
          border-color: rgba(249, 115, 22, 0.25);
          transform: translateY(-2px);
        }

        .placedly-partners-logo-svg {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
        }
        .placedly-partners-logo-svg svg {
          width: 32px;
          height: 32px;
          display: block;
        }

        .placedly-partners-logo-name {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
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
            height: 36px !important;
          }

          .placedly-partners-edge {
            width: 32px !important;
          }

          .placedly-partners-edge--left {
            left: 0 !important;
            background: linear-gradient(90deg,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0) 100%) !important;
          }
          .placedly-partners-edge--right {
            right: 0 !important;
            background: linear-gradient(270deg,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0) 100%) !important;
          }

          .placedly-partners-inner {
            gap: 0 !important;
            flex-shrink: 0 !important;
          }

          .placedly-partners-logo {
            gap: 5px !important;
            padding: 4px 10px 4px 4px !important;
            margin: 0 4px !important;
            border-radius: 999px !important;
            background: rgba(249, 115, 22, 0.06) !important;
            border: 1px solid rgba(249, 115, 22, 0.15) !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            height: 28px !important;
          }

          .placedly-partners-logo-svg {
            width: 20px !important;
            height: 20px !important;
          }
          .placedly-partners-logo-svg svg {
            width: 20px !important;
            height: 20px !important;
          }

          .placedly-partners-logo-name {
            font-size: 11px !important;
            font-weight: 600 !important;
            color: #334155 !important;
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
            padding: 3px 8px 3px 3px !important;
            margin: 0 3px !important;
            height: 26px !important;
          }
          .placedly-partners-logo-svg,
          .placedly-partners-logo-svg svg {
            width: 18px !important;
            height: 18px !important;
          }
          .placedly-partners-logo-name {
            font-size: 10px !important;
          }
          .placedly-partners-row {
            height: 32px !important;
          }
          .placedly-partners-edge {
            width: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}