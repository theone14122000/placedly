import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Application Assistance | Placedly',
  description: "Placedly offers complete study abroad application assistance — documentation, deadlines, and submission support — helping students secure university offers.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Application Assistance',
      tag: 'Study Abroad Services',
      title: 'Application Assistance – Complete Support from Shortlist to Offer',
      subtitle: "Placedly offers complete study abroad application assistance — documentation, deadlines, and submission support — helping students secure university offers.",
      stats: [
        { value: '140+', label: 'Universities Supported' },
        { value: '1', label: 'Streamlined Process' },
        { value: '2,000+', label: 'Applications Managed' },
      ],
      ctaPrimaryLabel: 'Start My Application',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Complete Support from Shortlist to Offer',
      overviewBody: "Applying to multiple universities abroad involves juggling different portals, varying documentation requirements, overlapping deadlines, and constant attention to detail — a process that becomes genuinely overwhelming when students are also managing coursework or entrance exam preparation. Placedly's application assistance service takes on that operational burden. We manage the end-to-end application process across multiple universities, keeping track of each institution's specific requirements, deadlines, and documentation, so nothing falls through the cracks. Every application goes through a quality check before submission, catching errors or inconsistencies that could otherwise weaken an otherwise strong application — and throughout the process, students have a single point of contact managing the entire journey, rather than juggling it all themselves. Missing a single deadline or submitting an incomplete application can cost a student their spot at a university they were genuinely qualified for. Placedly's application assistance exists to prevent exactly that kind of avoidable loss, giving students a coordinated, reliable process instead of a stressful scramble across multiple portals and deadlines.",
      featuresHeading: "What's Included",
      features: [
        { title: 'End-to-End Management', desc: 'End-to-end management of application forms and required documentation.' },
        { title: 'Deadline Tracking', desc: 'Deadline tracking across multiple universities and application cycles.' },
        { title: 'Quality Checks', desc: 'Quality checks before submission to catch errors and inconsistencies.' },
        { title: 'Timeline Coordination', desc: 'Coordination with SOP, LOR, and scholarship application timelines.' },
        { title: 'Single Point of Contact', desc: 'Single point of contact managing your entire application journey.' },
        { title: 'Status Tracking', desc: 'Status tracking and updates as decisions come in from universities.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Consolidation', desc: 'Consolidated list of target universities, requirements, and deadlines.' },
        { title: '2. Documentation', desc: 'Documentation collection and organisation for each application.' },
        { title: '3. Form Completion', desc: 'Application form completion and coordination across universities.' },
        { title: '4. Quality Review', desc: 'Quality review before each submission.' },
        { title: '5. Ongoing Tracking', desc: 'Ongoing tracking and updates through to admission decisions.' },
      ],
      faqs: [
        { q: 'How many university applications can you manage at once?', a: 'We can manage multiple applications simultaneously, keeping each one organised against its specific deadlines and requirements.' },
        { q: 'Does this include SOP and visa support too?', a: 'Application assistance coordinates with our SOP/LOR and visa support services for a fully integrated study abroad process.' },
        { q: 'What if a university adds additional requirements later?', a: 'We track communications from each university and help you respond promptly to any additional requests.' },
      ],
      finalHeading: 'Let Placedly Manage Your Applications',
      finalSub: "Let Placedly manage your applications end-to-end while you focus on preparing for your move abroad.",
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}