import { motion } from 'framer-motion';
import SITE_CONFIG from '@/config';

export function MarqueeBand() {
    // Marquee is now integrated into Navbar, so this is just a spacer
    return null;
}

export function CTABand({ onBookDemo }) {
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
                    <button
                        data-testid="cta-book-demo-button"
                        onClick={onBookDemo}
                        className="magnetic-btn px-10 py-5 bg-[#7000FF] text-white font-bold text-lg rounded-full shadow-[0_0_40px_rgba(112,0,255,0.4)] flex items-center gap-3"
                    >
                        Book a Free Demo Call
                    </button>
                    <a
                        data-testid="cta-whatsapp-button"
                        href={SITE_CONFIG.getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn px-10 py-5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors duration-300 backdrop-blur-md flex items-center gap-2"
                    >
                        WhatsApp Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
