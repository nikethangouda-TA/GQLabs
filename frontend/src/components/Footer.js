import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SITE_CONFIG from '@/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="relative border-t border-white/5">
      {/* Beam divider */}
      <div className="section-beam w-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7000FF] to-[#00F0FF] flex items-center justify-center">
                <span className="font-bold text-white text-sm" style={{ fontFamily: 'Unbounded' }}>G</span>
              </div>
              <span className="font-bold text-white text-lg" style={{ fontFamily: 'Unbounded' }}>
                {SITE_CONFIG.companyName}
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              We design and build digital ecosystems that transform how businesses operate, grow, and connect with customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-mono text-white/60 mb-4">Navigate</h4>
            <div className="space-y-3">
              {['Industries', 'Services', 'Process', 'Why Us', 'Contact'].map((link) => (
                <button
                  key={link}
                  data-testid={`footer-link-${link.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => {
                    const el = document.querySelector(`#${link.toLowerCase().replace(/\s/g, '-')}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-mono text-white/60 mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                data-testid="footer-whatsapp"
                href={SITE_CONFIG.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-[#22C55E] transition-colors duration-200"
              >
                WhatsApp <ArrowUpRight size={12} />
              </a>
              <a
                data-testid="footer-email"
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-[#7000FF] transition-colors duration-200"
              >
                {SITE_CONFIG.email} <ArrowUpRight size={12} />
              </a>
              <p className="text-sm text-white/40">
                {SITE_CONFIG.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/20 font-mono">
            {currentYear} {SITE_CONFIG.companyName}. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-mono">
            Designed & Built with precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
