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
   LOGO COMPONENTS — defined inline, each is a small SVG
   All have viewBox="0 0 24 24" so they size consistently
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

/* ★ Map company names → logo components */
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

/* Fallback for unknown companies */
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
    </section>
  );
}