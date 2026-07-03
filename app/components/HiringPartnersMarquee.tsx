'use client';

import { useState } from 'react';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

type Company = {
  name: string;
  domain?: string;
  logo?: string;
};

/* ── Default hiring partners (name + logo) ──
   `domain` auto-generates a logo via icon.horse (highly reliable, returns 404 if missing).
   You can also pass an explicit `logo` URL to override. */
const DEFAULT_COMPANIES: Company[] = [
  { name: 'EXL Services',      domain: 'exlservice.com' },
  { name: 'Quatrro',           domain: 'quatrro.com' },
  { name: 'WNS Global',        domain: 'wns.com' },
  { name: 'Optum',             domain: 'optum.com' },
  { name: 'Cognizant',         domain: 'cognizant.com' },
  { name: 'Wipro',             domain: 'wipro.com' },
  { name: 'Infosys BPM',       domain: 'infosysbpm.com' },
  { name: 'Mphasis',           domain: 'mphasis.com' },
  { name: 'HCLTech',           domain: 'hcltech.com' },
  { name: 'Genpact',           domain: 'genpact.com' },
  { name: 'Access Healthcare', domain: 'accesshealthcare.com' },
  { name: 'Conifer Health',    domain: 'coniferhealth.com' },
];

const MARQUEE_DURATION = 38; // seconds — single strip scroll speed
const REPEATS = 3;           // full-list repeats before the loop resets

function rotateList<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const n = offset % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function buildSequence(companies: Company[]): Company[] {
  const sequence: Company[] = [];
  for (let r = 0; r < REPEATS; r += 1) {
    sequence.push(...rotateList(companies, r * 2));
  }
  return sequence;
}

function logoSrc(company: Company): string | undefined {
  if (company.logo) return company.logo;
  if (company.domain) return `https://icon.horse/icon/${company.domain}`;
  return undefined;
}

/**
 * Parses company data from CMS.
 * Priority:
 *  1. `hp:marqueeCompaniesJson` — JSON array of { name, domain?, logo? }
 *  2. `hp:marqueeCompanies`     — legacy comma-separated plain names
 *  3. DEFAULT_COMPANIES
 */
function parseCompanies(cms: Cms): Company[] {
  const rawJson = cms['hp:marqueeCompaniesJson'];
  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      if (Array.isArray(parsed) && parsed.length) {
        const cleaned: Company[] = parsed
          .map((item: unknown) => {
            if (typeof item === 'string') return { name: item.trim() };
            if (item && typeof item === 'object') {
              const obj = item as Record<string, unknown>;
              const name = typeof obj.name === 'string' ? obj.name.trim() : '';
              const domain = typeof obj.domain === 'string' ? obj.domain.trim() : undefined;
              const logo = typeof obj.logo === 'string' ? obj.logo.trim() : undefined;
              return name ? { name, domain, logo } : null;
            }
            return null;
          })
          .filter((c): c is Company => !!c && !!c.name);
        if (cleaned.length) return cleaned;
      }
    } catch {
      /* fall through */
    }
  }

  const rawList = cms['hp:marqueeCompanies'];
  if (rawList) {
    const names = rawList.split(',').map((s) => s.trim()).filter(Boolean);
    if (names.length) return names.map((name) => ({ name }));
  }

  return DEFAULT_COMPANIES;
}

function CompanyChip({ company }: { company: Company }) {
  const src = logoSrc(company);
  const [imgError, setImgError] = useState(false);

  return (
    <span className="placedly-strip-item">
      <span className="placedly-strip-logo-wrap">
        {src && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`${company.name} logo`}
            className="placedly-strip-logo"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="placedly-strip-fallback" aria-hidden>
            {company.name.charAt(0).toUpperCase()}
          </span>
        )}
      </span>
      <span className="placedly-strip-name">{company.name}</span>
    </span>
  );
}

export default function HiringPartnersMarquee({ cms = {} }: { cms?: Cms }) {
  const label = cms['hp:marqueeLabel'] ?? 'Our CAP candidates have landed roles at';
  const sub =
    cms['hp:marqueeSub'] ??
    'Through our placement network — roles sourced via trusted recruitment partners';

  const companies = parseCompanies(cms);
  const sequence = buildSequence(companies);

  return (
    <section className="placedly-partners-section" aria-label="Hiring partners">
      <FadeUp className="placedly-partners-header">
        <h2 className="placedly-partners-title">{label}</h2>
        <p className="placedly-partners-sub">{sub}</p>
      </FadeUp>

      <div className="placedly-strip">
        <div className="placedly-strip-edge placedly-strip-edge--left" aria-hidden />
        <div className="placedly-strip-track">
          <div className="placedly-strip-inner">
            {sequence.map((c, i) => (
              <CompanyChip key={`a-${c.name}-${i}`} company={c} />
            ))}
          </div>
          <div className="placedly-strip-inner" aria-hidden>
            {sequence.map((c, i) => (
              <CompanyChip key={`b-${c.name}-${i}`} company={c} />
            ))}
          </div>
        </div>
        <div className="placedly-strip-edge placedly-strip-edge--right" aria-hidden />
      </div>

      <style>{`
        .placedly-partners-section {
          padding: 48px 0;
        }
        .placedly-partners-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 28px;
          padding: 0 20px;
        }
        .placedly-partners-title {
          font-size: clamp(1.1rem, 2.2vw, 1.4rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .placedly-partners-sub {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
        }

        /* ── Single thin strip ── */
        .placedly-strip {
          position: relative;
          overflow: hidden;
          background: #fff;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
          padding: 14px 0;
        }

        .placedly-strip-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 90px;
          z-index: 2;
          pointer-events: none;
        }
        .placedly-strip-edge--left {
          left: 0;
          background: linear-gradient(90deg, #fff, rgba(255,255,255,0));
        }
        .placedly-strip-edge--right {
          right: 0;
          background: linear-gradient(270deg, #fff, rgba(255,255,255,0));
        }

        .placedly-strip-track {
          display: flex;
          width: max-content;
          animation: placedly-strip-scroll ${MARQUEE_DURATION}s linear infinite;
        }
        .placedly-strip:hover .placedly-strip-track {
          animation-play-state: paused;
        }

        .placedly-strip-inner {
          display: flex;
          align-items: center;
          gap: 36px;
          padding-right: 36px;
          flex-shrink: 0;
        }

        /* ── Each company chip: logo + name ── */
        .placedly-strip-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          padding: 4px 6px;
          border-radius: 10px;
          transition: background 0.25s ease;
        }
        .placedly-strip-item:hover {
          background: rgba(15, 23, 42, 0.035);
        }

        .placedly-strip-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          flex-shrink: 0;
        }

        .placedly-strip-logo {
          max-height: 24px;
          max-width: 26px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.7;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .placedly-strip-item:hover .placedly-strip-logo {
          filter: grayscale(0);
          opacity: 1;
        }

        /* Fallback badge (shown when no logo / image fails) */
        .placedly-strip-fallback {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .placedly-strip-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          transition: color 0.3s ease;
        }
        .placedly-strip-item:hover .placedly-strip-name {
          color: #0f172a;
        }

        @keyframes placedly-strip-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (max-width: 639px) {
          .placedly-partners-section {
            padding: 36px 0;
          }
          .placedly-strip {
            padding: 12px 0;
          }
          .placedly-strip-edge {
            width: 40px;
          }
          .placedly-strip-inner {
            gap: 24px;
            padding-right: 24px;
          }
          .placedly-strip-logo-wrap,
          .placedly-strip-fallback {
            width: 22px;
            height: 22px;
          }
          .placedly-strip-logo {
            max-height: 20px;
            max-width: 22px;
          }
          .placedly-strip-name {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}