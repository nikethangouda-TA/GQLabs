import { useEffect } from 'react';
import '@/App.css';
import { Toaster } from 'sonner';
import Lenis from '@studio-freight/lenis';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MarqueeBand, CTABand } from '@/components/Bands';
import { IndustryShowcase } from '@/components/IndustryShowcase';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
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

    return () => lenis.destroy();
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
      <Navbar />
      <Hero />
      <MarqueeBand />
      <IndustryShowcase />
      <div className="section-beam max-w-7xl mx-auto" />
      <Services />
      <div className="section-beam max-w-7xl mx-auto" />
      <Process />
      <div className="section-beam max-w-7xl mx-auto" />
      <WhyChooseUs />
      <CTABand />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
