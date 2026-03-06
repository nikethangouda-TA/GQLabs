import { useEffect, useState } from 'react';
import '@/App.css';
import { Toaster } from 'sonner';
import Lenis from '@studio-freight/lenis';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MarqueeBand, CTABand } from '@/components/Bands';
import { IndustryShowcase } from '@/components/IndustryShowcase';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { BookDemo } from '@/components/BookDemo';

function App() {
  const [showBookDemo, setShowBookDemo] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose booking trigger globally for child components
    window.__openBookDemo = () => setShowBookDemo(true);

    return () => {
      lenis.destroy();
      delete window.__openBookDemo;
    };
  }, []);

  return (
    <div className="App relative" style={{ background: '#030014' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10,10,20,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            backdropFilter: 'blur(16px)',
          },
        }}
      />
      <Navbar onBookDemo={() => setShowBookDemo(true)} />
      <Hero onBookDemo={() => setShowBookDemo(true)} />
      <MarqueeBand />
      <IndustryShowcase />
      <div className="section-beam max-w-7xl mx-auto" />
      <Services />
      <div className="section-beam max-w-7xl mx-auto" />
      <BeforeAfter />
      <div className="section-beam max-w-7xl mx-auto" />
      <Process />
      <div className="section-beam max-w-7xl mx-auto" />
      <Testimonials />
      <div className="section-beam max-w-7xl mx-auto" />
      <WhyChooseUs />
      <div className="section-beam max-w-7xl mx-auto" />
      <FAQ />
      <CTABand onBookDemo={() => setShowBookDemo(true)} />
      <Contact />
      <Footer />
      <WhatsAppChat />
      <BookDemo isOpen={showBookDemo} onClose={() => setShowBookDemo(false)} />
    </div>
  );
}

export default App;
