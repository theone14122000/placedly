// app/services/layout.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Our Services — Placedly',
  description: 'Two powerful verticals: Career Growth in India (CAP programme) and Study Abroad (140+ universities across UK, France, Germany & Dubai). One growth partner.',
};
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}