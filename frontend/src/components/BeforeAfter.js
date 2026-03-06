import { motion } from 'framer-motion';
import { X, Check, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

const comparisons = [
  {
    without: 'Customers search online, find nothing about you',
    with: 'A stunning website that ranks on Google and converts visitors',
  },
  {
    without: 'Leads slip through the cracks — no follow-up system',
    with: 'Automated CRM captures every lead and sends follow-ups',
  },
  {
    without: 'Scheduling appointments via phone calls and WhatsApp chaos',
    with: 'Online booking system with automated confirmations',
  },
  {
    without: 'Manual billing, inventory, and staff management',
    with: 'One dashboard that automates your entire operation',
  },
  {
    without: 'Competitors with apps and websites steal your customers',
    with: 'Your own mobile app puts your business in every pocket',
  },
  {
    without: 'No data, no insights — running blind',
    with: 'Real-time analytics showing what works and what doesn\'t',
  },
];

export function BeforeAfter() {
  return (
    <section id="transformation" data-testid="before-after-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-secondary" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#00F0FF] block mb-4"
          >
            The Transformation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Before</span>
            <span className="text-white/30 mx-4">vs</span>
            <span className="text-gradient-static">After.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            This is what happens when your business goes digital with GlideQuantum Labs.
          </motion.p>
        </div>

        {/* Comparison grid */}
        <div className="space-y-4">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              data-testid={`comparison-row-${index}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-0 items-stretch group"
            >
              {/* Without */}
              <div className="flex items-center gap-4 p-5 rounded-2xl md:rounded-r-none border border-red-500/10 bg-red-500/5 group-hover:border-red-500/20 transition-colors duration-300">
                <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                  <X size={16} className="text-red-400" />
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{item.without}</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center w-14 bg-white/[0.02] border-y border-white/5">
                <ArrowRight size={18} className="text-[#7000FF]" />
              </div>

              {/* With */}
              <div className="flex items-center gap-4 p-5 rounded-2xl md:rounded-l-none border border-[#22C55E]/10 bg-[#22C55E]/5 group-hover:border-[#22C55E]/20 transition-colors duration-300">
                <div className="w-9 h-9 rounded-lg bg-[#22C55E]/15 flex items-center justify-center shrink-0">
                  <Check size={16} className="text-[#22C55E]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed font-medium">{item.with}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <div className="glass-card p-8 text-center group">
            <TrendingDown size={24} className="text-red-400 mx-auto mb-3 opacity-50" />
            <div className="text-xs text-white/30 font-mono tracking-wider uppercase mb-2">Without Digital</div>
            <div className="text-3xl font-black text-red-400/60 mb-1" style={{ fontFamily: 'Unbounded' }}>-60%</div>
            <div className="text-xs text-white/30">Lost potential customers</div>
          </div>
          <div className="glass-card p-8 text-center border-[#7000FF]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#7000FF]/5" />
            <div className="relative z-10">
              <ArrowRight size={24} className="text-[#7000FF] mx-auto mb-3 rotate-[-45deg]" />
              <div className="text-xs text-white/30 font-mono tracking-wider uppercase mb-2">Transformation</div>
              <div className="text-3xl font-black text-gradient-static mb-1" style={{ fontFamily: 'Unbounded' }}>14 Days</div>
              <div className="text-xs text-white/30">Average time to go live</div>
            </div>
          </div>
          <div className="glass-card p-8 text-center group">
            <TrendingUp size={24} className="text-[#22C55E] mx-auto mb-3" />
            <div className="text-xs text-white/30 font-mono tracking-wider uppercase mb-2">With GlideQuantum</div>
            <div className="text-3xl font-black text-[#22C55E] mb-1" style={{ fontFamily: 'Unbounded' }}>3x</div>
            <div className="text-xs text-white/30">More customer enquiries</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
