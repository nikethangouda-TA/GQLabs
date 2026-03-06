import { motion } from 'framer-motion';
import SITE_CONFIG from '@/config';

const marqueeItems = [
  'WEBSITES', 'MOBILE APPS', 'DESKTOP APPS', 'CRM SYSTEMS',
  'AUTOMATION', 'ANALYTICS', 'E-COMMERCE', 'BOOKING SYSTEMS',
  'WHATSAPP BOTS', 'INVENTORY', 'POS SYSTEMS', 'DASHBOARDS',
];

export function MarqueeBand() {
  return (
    <div data-testid="marquee-band" className="relative py-6 border-y border-white/5 overflow-hidden">
      <div className="flex marquee-track" style={{ width: 'max-content' }}>
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span
              className="text-sm md:text-base font-bold tracking-[0.15em] uppercase text-white/15 whitespace-nowrap"
              style={{ fontFamily: 'Unbounded' }}
            >
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#7000FF]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTABand() {
  return (
    <section data-testid="cta-band" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero" />
      
      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-[8rem] md:text-[14rem] font-black text-white/[0.02] uppercase whitespace-nowrap"
          style={{ fontFamily: 'Unbounded' }}
        >
          LET'S BUILD
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
          style={{ fontFamily: 'Unbounded' }}
        >
          <span className="text-white">Ready to</span>
          <br />
          <span className="text-gradient">Automate?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Your competitors are already going digital. Don't let your business fall behind. 
          One conversation is all it takes to start your transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            data-testid="cta-whatsapp-button"
            href={SITE_CONFIG.getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn px-10 py-5 bg-[#7000FF] text-white font-bold text-lg rounded-full shadow-[0_0_40px_rgba(112,0,255,0.4)] flex items-center gap-3"
          >
            Start Your Project Now
          </a>
          <button
            data-testid="cta-scroll-contact"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-10 py-5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors duration-300 backdrop-blur-md"
          >
            Fill The Form
          </button>
        </motion.div>
      </div>
    </section>
  );
}
