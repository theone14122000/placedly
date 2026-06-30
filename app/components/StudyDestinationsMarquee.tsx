'use client';

import { FadeUp } from './motion';

const UKFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
  </svg>
);
const FranceFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="20" height="40" fill="#002395" />
    <rect x="20" width="20" height="40" fill="#fff" />
    <rect x="40" width="20" height="40" fill="#ED2939" />
  </svg>
);
const GermanyFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="14" fill="#000" />
    <rect y="13" width="60" height="14" fill="#DD0000" />
    <rect y="26" width="60" height="14" fill="#FFCE00" />
  </svg>
);
const UAEFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="40" fill="#fff" />
    <rect width="60" height="13" fill="#00732F" />
    <rect y="27" width="60" height="13" fill="#000" />
    <rect width="15" height="40" fill="#FF0000" />
  </svg>
);
const CanadaFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="40" fill="#fff" />
    <rect width="15" height="40" fill="#FF0000" />
    <rect x="45" width="15" height="40" fill="#FF0000" />
    <text x="30" y="27" textAnchor="middle" fontSize="18" fill="#FF0000">
      🍁
    </text>
  </svg>
);
const AustraliaFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="40" fill="#00008B" />
    <text x="30" y="28" textAnchor="middle" fontSize="18" fill="#fff">
      ★
    </text>
  </svg>
);
const SingaporeFlag = () => (
  <svg width="28" height="18" viewBox="0 0 60 40" aria-hidden>
    <rect width="60" height="20" fill="#EF3340" />
    <rect y="20" width="60" height="20" fill="#fff" />
  </svg>
);

type Destination = {
  label: string;
  Flag: () => JSX.Element;
  iconBg: string;
};

const DESTINATIONS: Destination[] = [
  { label: 'United Kingdom', Flag: UKFlag, iconBg: '#eff6ff' },
  { label: 'France', Flag: FranceFlag, iconBg: '#faf5ff' },
  { label: 'Germany', Flag: GermanyFlag, iconBg: '#fefce8' },
  { label: 'Dubai / UAE', Flag: UAEFlag, iconBg: '#ecfdf5' },
  { label: 'Canada', Flag: CanadaFlag, iconBg: '#fef2f2' },
  { label: 'Australia', Flag: AustraliaFlag, iconBg: '#eef2ff' },
  { label: 'Singapore', Flag: SingaporeFlag, iconBg: '#fff1f2' },
];

const ROW_SPEEDS = [140, 175, 130];
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
      <span className="placedly-dest-icon" style={{ background: dest.iconBg }}>
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

export default function StudyDestinationsMarquee() {
  const rowSets = [
    DESTINATIONS,
    rotateList(DESTINATIONS, 3),
    rotateList(DESTINATIONS, 5),
  ];

  return (
    <section className="placedly-destinations-section" aria-label="Study abroad destinations">
      <FadeUp className="placedly-destinations-header">
        <h2 className="placedly-destinations-title">Study Abroad Destinations We Support</h2>
        <p className="placedly-destinations-sub">
          From UK&apos;s post-study work visa to Germany&apos;s zero tuition fees — we match you
          to the right country, right university, right course.
        </p>
      </FadeUp>

      <div className="placedly-destinations-rows">
        {rowSets.map((items, i) => (
          <DestinationRow
            key={i}
            items={items}
            reverse={i === 1}
            duration={ROW_SPEEDS[i] ?? 90}
          />
        ))}
      </div>
    </section>
  );
}
