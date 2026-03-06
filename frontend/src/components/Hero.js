import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Globe, Smartphone, Monitor } from 'lucide-react';
import SITE_CONFIG from '@/config';

function ParticleGrid() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? '#7000FF' : p.id % 3 === 1 ? '#00F0FF' : '#A855F7',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function OrbitRing({ size, duration, delay, color }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: color || 'rgba(112, 0, 255, 0.15)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: duration || 20, delay: delay || 0, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ background: color || '#7000FF', boxShadow: `0 0 10px ${color || '#7000FF'}` }}
      />
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const platforms = [
    { icon: Globe, label: 'Web' },
    { icon: Smartphone, label: 'Mobile' },
    { icon: Monitor, label: 'Desktop' },
  ];

  return (
    <section
      ref={containerRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-hero" />
      <ParticleGrid />

      {/* Orbit rings */}
      <div className="absolute inset-0 pointer-events-none">
        <OrbitRing size={400} duration={25} delay={0} color="rgba(112, 0, 255, 0.12)" />
        <OrbitRing size={600} duration={35} delay={2} color="rgba(0, 240, 255, 0.08)" />
        <OrbitRing size={800} duration={45} delay={4} color="rgba(168, 85, 247, 0.06)" />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#00F0FF]" />
          <span className="text-xs tracking-[0.2em] uppercase font-mono text-white/70">
            Digital Transformation Partner
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase leading-[0.9] tracking-tighter mb-8"
          style={{ fontFamily: 'Unbounded' }}
        >
          <span className="block text-white">We Build</span>
          <span className="block text-gradient mt-2">Software</span>
          <span className="block text-white/90 mt-2 text-4xl md:text-5xl lg:text-6xl">
            That Grows Your Business
          </span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From a single website to a complete business automation suite.
          We design, build, and deploy solutions that convert strangers into loyal customers — across every platform.
        </motion.p>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60"
            >
              <p.icon size={16} />
              <span className="text-sm font-medium">{p.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            data-testid="hero-cta-whatsapp"
            href={SITE_CONFIG.getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn px-8 py-4 bg-[#7000FF] text-white font-bold rounded-full shadow-[0_0_30px_rgba(112,0,255,0.4)] flex items-center gap-2"
          >
            Start Your Project
            <ArrowDown size={16} className="rotate-[-90deg]" />
          </a>
          <button
            data-testid="hero-cta-explore"
            onClick={() => document.querySelector('#industries')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-8 py-4 border border-white/20 text-white rounded-full backdrop-blur-md hover:bg-white/5 transition-colors duration-300"
          >
            Explore Our Work
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#7000FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
