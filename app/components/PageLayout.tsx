import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import PlacedlyFixes from './PlacedlyFixes';
import ScrollAnimations from './ScrollAnimations';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-wrapper">
        <Navbar />
        {children}
        <Footer />
      </div>
      <FloatingWhatsApp />
      <PlacedlyFixes />
      <ScrollAnimations />
    </>
  );
}
