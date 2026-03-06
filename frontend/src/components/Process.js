import { motion } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket, Headphones } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    description: 'We listen to your business challenges, goals, and vision. No jargon, no hard sell — just a real conversation.',
    duration: '30 min call',
    color: '#7000FF',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design & Prototype',
    description: 'We create a visual prototype you can see and interact with before a single line of code is written.',
    duration: '3-5 days',
    color: '#00F0FF',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Development',
    description: 'We build your solution with clean code, modern tech, and daily progress updates you can actually see.',
    duration: '7-21 days',
    color: '#A855F7',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Go Live',
    description: 'We deploy your product, set up your domain, and make sure everything works perfectly before you pay the balance.',
    duration: '1 day',
    color: '#EC4899',
  },
  {
    number: '05',
    icon: Headphones,
    title: '3 Months Free Support',
    description: 'We stay by your side. Bug fixes, small tweaks, and guidance — all free for 90 days after launch.',
    duration: '90 days',
    color: '#22C55E',
  },
];

export function Process() {
  return (
    <section id="process" data-testid="process-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-secondary" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#00F0FF] block mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">From Idea</span>
            <br />
            <span className="text-gradient-static">To Launch.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7000FF] via-[#00F0FF] to-[#22C55E] opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              data-testid={`process-step-${step.number}`}
              className="relative flex gap-6 md:gap-10 mb-16 last:mb-0 group"
            >
              {/* Step indicator */}
              <div className="relative z-10 shrink-0">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${step.color}15`,
                    border: `2px solid ${step.color}40`,
                    boxShadow: `0 0 0 0 ${step.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${step.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${step.color}00`;
                  }}
                >
                  <step.icon size={24} style={{ color: step.color }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono tracking-widest" style={{ color: step.color }}>
                    STEP {step.number}
                  </span>
                  <span className="text-xs text-white/30 font-mono">{step.duration}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Unbounded' }}
                >
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
