export const dynamic = 'force-dynamic';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UtilityToolsSection from './components/UtilityToolsSection';
import Services from './components/Services';
import OurProcessSection from './components/OurProcessSection';
import CapJourneySection from './components/CapJourneySection';
import CapFloatingCta from './components/CapFloatingCta';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import StudyDestinationsMarquee from './components/StudyDestinationsMarquee';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Cta from './components/Cta';
import ServiceWidgetSection from './components/ServiceWidgetSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PlacedlyFixes from './components/PlacedlyFixes';
import { getCmsMap } from '@/lib/cms';

const HP_DEFAULTS: Record<string, string> = {
  /* Hero */
  'hp:heroEyebrow':          'Career & Global Growth Platform',
  'hp:heroSubline':          'Career Placement & Global Education Consultancy — Delhi NCR.',
  'hp:heroCtaText':          'Apply for CAP',
  'hp:heroSecondaryCtaText': 'Study Abroad',
  'hp:heroBottomBar':        'Built for global ambition',
  'hp:stat1Num': '300+', 'hp:stat1Label': 'Careers Placed',
  'hp:stat2Num': '40%+', 'hp:stat2Label': 'Avg CTC Hike',
  'hp:stat3Num': '140+', 'hp:stat3Label': 'Universities',
  'hp:stat4Num': '₹0',   'hp:stat4Label': 'Upfront Fee',
  'hp:heroOfferRole':    'Senior Claims Analyst',
  'hp:heroOfferCompany': 'EXL Service · Noida',
  'hp:heroOfferInitial': 'E',
  'hp:heroOfferCtc':     '₹ 9.2 LPA',
  'hp:heroOfferJoining': 'Aug 2025',
  'hp:heroAdmitUniversity': 'University of Manchester',
  'hp:heroAdmitProgramme':  "MSc International Business · Fall '25",
  /* Services */
  'hp:servicesTagline':  'What We Do',
  'hp:servicesTitle':    'One Platform. Two Powerful Verticals.',
  'hp:servicesSubtitle': 'Both Designed Around Your Growth — Not Our Revenue.',
  'hp:service1Name':     'Career Assistance Programme (CAP) — India',
  'hp:service1Details':  "Resume rebuild, interview coaching, and direct warm introductions to hiring managers at EXL, Optum, WNS, Quatrro & more. We work on your side — not the employer's. Our 12% Career Assistance Fee applies only after your offer letter arrives. Zero upfront, zero risk.",
  'hp:service1CtaLabel': 'See How CAP Works',
  'hp:service2Name':     'Study Abroad Programme — Go Global',
  'hp:service2Details':  '140+ universities across UK, France, Germany & Dubai. Course shortlisting, university applications, SOP writing, and student visa documentation — handled end to end by one dedicated advisor. Real admissions, zero confusion.',
  'hp:service2CtaLabel': 'Explore Study Abroad',
  /* CAP Journey */
  'hp:capJourneyKicker':   'Career Assistance Programme',
  'hp:capJourneyTitle':    'Your CAP Journey — From Resume to Offer',
  'hp:capJourneySubtitle': 'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.',
  'hp:capFloatingCtaLabel': 'Apply for CAP',
  /* Marquee */
  'hp:marqueeLabel':     'Our cap candiate have landed roles at',
  'hp:marqueeSub':       'Through our placement network — roles sourced via trusted recruitment partners',
  'hp:marqueeCompanies': 'EXL Services,Quatrro,eBiz Solutions,WNS Global,Optum,Cognizant,Wipro,Infosys BPM,Mphasis,HCL,Genpact,Access Healthcare,Conifer Health',
  /* How It Works */
  'hp:hiwTagline': 'How It Works',
  'hp:hiwTitle':   'How Placedly Works — Simple, Transparent, Proven',
  'hp:hiwSubtitle': 'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.',
  'hp:hiw1Title': 'Understand You First',              'hp:hiw1Details': 'A free 45-minute session where we actually listen. We understand your current role, your target outcome, your domain expertise, and what you truly want — not just what looks good on paper. No templates. No generic advice.',                                 'hp:hiw1Highlight': 'Zero charge for this session, ever.',
  'hp:hiw2Title': 'Build Your Roadmap',                'hp:hiw2Details': "We map out 10–15 specific roles or universities that genuinely fit your profile, salary expectations, and growth goals. You get a written roadmap — not a list of job portals to spam.",                                                                             'hp:hiw2Highlight': 'Honest shortlist. We say no to bad fits.',
  'hp:hiw3Title': 'Resume + Interview Prep',           'hp:hiw3Details': 'Complete ATS-optimised resume rebuild, LinkedIn profile overhaul, and 3 rounds of live mock interviews with real feedback. You walk into every interview knowing exactly what to say and how to position yourself.',                                                 'hp:hiw3Highlight': 'Average 3× more callbacks post-resume rebuild.',
  'hp:hiw4Title': 'Direct Employer Connect',           'hp:hiw4Details': 'We personally reach out to 10–15 hiring managers at the right companies on your behalf. Not a mass email blast — targeted, warm introductions to people who are actually hiring for your profile.',                                                                  'hp:hiw4Highlight': 'Our direct connects at EXL, Optum, WNS, Genpact & more.',
  'hp:hiw5Title': 'Offer Received. Then We Invoice.',  'hp:hiw5Details': "When you have your offer letter in hand, only then does our 12% Career Assistance Fee apply. Not before. Not during. Not at any point in the process unless you've actually grown. That's our entire model.",                                                 'hp:hiw5Highlight': '₹0 upfront. 12% only after your offer letter arrives.',
  /* Why Placedly */
  'hp:whyTitle':    'Why Professionals Choose Placedly',
  'hp:whySubtitle': "We don't just find you a job. We build your career.",
  /* CEO Quote */
  'hp:ceoImg':     'https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/682db74463bfe59bcce17434_Ceo-Quote-Img.png',
  'hp:ceoName':    'Pavan Mishra',
  'hp:ceoRole':    'Founder, Placedly',
  'hp:ceoQuote':   "Most people don't fail in their careers because they lack skill. They fail because no one helped them present that skill the right way, to the right people, at the right time. That's exactly what Placedly exists to fix — for every professional in India and beyond.",
  'hp:ceoCtaText': 'Talk to Our Team',
  'hp:ceoCtaHref': '#contact',
  /* CTA Banner */
  'hp:ctaBannerHeadline': 'We Only Get Paid After You Get Placed.',
  'hp:ctaBannerSub':      'Free consultation. No upfront cost. Start today.',

};

export default async function Home() {
  const saved = await getCmsMap('hp:');
  const cms = { ...HP_DEFAULTS, ...saved };

  return (
    <>
      <div className="page-wrapper">
        <Navbar />
        <Hero cms={cms} />
        <UtilityToolsSection />
        <Services cms={cms} />
        <OurProcessSection />          {/* ← added here, directly below Services */}
        <CapJourneySection cms={cms} />
        <HowItWorks cms={cms} />
        <Industries />
        <StudyDestinationsMarquee />
        <Testimonials />
        <Faq />
        <Footer />
        <FloatingWhatsApp cms={cms} />
        <CapFloatingCta label={cms['hp:capFloatingCtaLabel'] ?? 'Apply for CAP'} />
        <PlacedlyFixes />
      </div>
    </>
  );
}