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
/** Repeat full list enough times so each half of the track exceeds viewport width */
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
            <span key={`a-${name}-${i}`} className="placedly-partners-logo">
              <span className="placedly-partners-logo-mark" aria-hidden />
              <span className="placedly-partners-logo-text">{name}</span>
            </span>
          ))}
        </div>
        <div className="placedly-partners-inner" aria-hidden>
          {sequence.map((name, i) => (
            <span key={`b-${name}-${i}`} className="placedly-partners-logo">
              <span className="placedly-partners-logo-mark" aria-hidden />
              <span className="placedly-partners-logo-text">{name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="placedly-partners-edge placedly-partners-edge--right" aria-hidden />
    </div>
  );
}

export default function HiringPartnersMarquee({ cms = {} }: { cms?: Cms }) {
  const label = cms['hp:marqueeLabel'] ?? 'Our cap candiate have landed roles at';
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
