import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import SITE_CONFIG from '@/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Industries', href: '#industries' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'w-[95%] md:w-auto' : 'w-[95%] md:w-auto'
      }`}
    >
      <div className={`flex items-center justify-between gap-4 md:gap-8 px-5 py-3 rounded-full border transition-all duration-500 ${
        scrolled 
          ? 'bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl' 
          : 'bg-black/30 backdrop-blur-md border-white/5'
      }`}>
        {/* Logo */}
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#00F0FF] flex items-center justify-center">
            <span className="font-bold text-white text-sm" style={{ fontFamily: 'Unbounded' }}>G</span>
          </div>
          <span className="text-white font-bold text-sm hidden sm:block" style={{ fontFamily: 'Unbounded' }}>
            {SITE_CONFIG.companyName.split(' ')[0]}
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          data-testid="nav-cta"
          href={SITE_CONFIG.getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#7000FF] text-white text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(112,0,255,0.4)] shrink-0"
        >
          Let's Talk <ArrowUpRight size={14} />
        </a>

        {/* Mobile toggle */}
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 relative z-50"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              data-testid="nav-mobile-cta"
              href={SITE_CONFIG.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 px-4 py-3 bg-[#7000FF] text-white text-center font-semibold rounded-xl"
            >
              Let's Talk on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
