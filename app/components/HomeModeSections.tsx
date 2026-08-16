'use client';

/* ════════════════════════════════════════════════════════
   Homepage sections that follow the "What We Do" toggle.

   Get Placed (cap):
     • How It Works + Our Process (ParallelSection)
     • CAP Journey
   Go Global (study):
     • Document Checklist
     • Our Focus Areas (Industries)
     • Study Destinations marquee

   Everything else (Testimonials, FAQ, Footer, Hero, Tools)
   stays common and is rendered directly by the page.
════════════════════════════════════════════════════════ */

import { ParallelSection, DocumentChecklistSection } from './HowItWorks';
import CapJourneySection from './CapJourneySection';
import Industries from './Industries';
import StudyDestinationsMarquee from './StudyDestinationsMarquee';
import { useHomeMode } from './HomeModeContext';

type Cms = Record<string, string>;

export default function HomeModeSections({ cms = {} }: { cms?: Cms }) {
  const { mode } = useHomeMode();

  if (mode === 'cap') {
    return (
      <>
        <ParallelSection cms={cms} />
        <CapJourneySection cms={cms} />
      </>
    );
  }

  return (
    <>
      <DocumentChecklistSection />
      <Industries cms={cms} />
      <StudyDestinationsMarquee cms={cms} />
    </>
  );
}