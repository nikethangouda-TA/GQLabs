import { motion } from 'framer-motion';
import {
  ShieldCheck, FileText, CreditCard, Code2, Cloud, Headphones
} from 'lucide-react';

const reasons = [
  {
    icon: CreditCard,
    title: '50% Upfront Only',
    description: 'Pay half to begin. The remaining 50% only after you see and approve the live product. Zero risk.',
    color: '#7000FF',
  },
  {
    icon: Code2,
    title: 'You Own Everything',
    description: 'Full source code, admin access, domain, and data — 100% yours on delivery. No lock-in, ever.',
    color: '#00F0FF',
  },
  {
    icon: FileText,
    title: 'Contract + GST Invoice',
    description: 'A formal written agreement and tax-compliant invoice before we start. Legally protected.',
    color: '#A855F7',
  },
  {
    icon: ShieldCheck,
    title: 'HTTPS & Encryption',
    description: 'SSL included on every project. All data encrypted end-to-end. Industry-standard security.',
    color: '#22C55E',
  },
  {
    icon: Cloud,
    title: 'Enterprise Infra',
    description: 'Same infrastructure powering Zomato, Swiggy, and CRED. AWS / Firebase with 99.9% uptime.',
    color: '#3B82F6',
  },
  {
    icon: Headphones,
    title: '3 Months Free Support',
    description: 'We stay accountable. Bug fixes, minor changes, and guidance — all free for 90 days post-launch.',
    color: '#EC4899',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#A855F7] block mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">No Jargon.</span>
            <br />
            <span className="text-gradient-static">No Surprises.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            We've seen too many businesses burned by developers who vanish after payment. 
            That's not us. Here's our promise.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              data-testid={`trust-card-${reason.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative glass-card p-8 beam-effect"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${reason.color}15`,
                  border: `1px solid ${reason.color}30`,
                }}
              >
                <reason.icon size={24} style={{ color: reason.color }} />
              </div>

              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: 'Unbounded' }}
              >
                {reason.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {reason.description}
              </p>

              {/* Check badge */}
              <div
                className="mt-5 inline-flex items-center gap-2 text-xs font-mono tracking-wider px-3 py-1.5 rounded-full"
                style={{ color: reason.color, background: `${reason.color}10`, border: `1px solid ${reason.color}20` }}
              >
                <ShieldCheck size={12} /> Guaranteed
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '7-21', label: 'Days Average Delivery', suffix: '' },
            { value: '50', label: 'Upfront Payment Only', suffix: '%' },
            { value: '100', label: 'Code Ownership', suffix: '%' },
            { value: '90', label: 'Days Free Support', suffix: '' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center py-8 glass-card px-4" data-testid={`stat-${i}`}>
              <div className="text-3xl md:text-4xl font-black text-gradient-static mb-2" style={{ fontFamily: 'Unbounded' }}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-white/40 font-mono tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
