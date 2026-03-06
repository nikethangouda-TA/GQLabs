import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Reddy',
    role: 'Real Estate Developer',
    company: 'Reddy Constructions',
    quote: 'GlideQuantum built us a property portal with EMI calculator and WhatsApp lead capture. Our enquiries tripled in the first month. The ROI was immediate.',
    color: '#7000FF',
  },
  {
    name: 'Priya Sharma',
    role: 'Restaurant Owner',
    company: 'Spice Garden',
    quote: 'They delivered a complete online ordering system with QR menus and table booking in just 10 days. Our Tuesday crowd doubled because of the loyalty program.',
    color: '#EC4899',
  },
  {
    name: 'Dr. Anand Kumar',
    role: 'Hospital Administrator',
    company: 'MedCare Hospitals',
    quote: 'The patient portal they built streamlined our appointment system entirely. 200+ daily bookings now happen without a single phone call.',
    color: '#00F0FF',
  },
  {
    name: 'Vikram Singh',
    role: 'Auto Dealer',
    company: 'Singh Motors',
    quote: 'Our showroom website with test drive booking and inventory showcase brought in customers we never reached before. Best investment we made this year.',
    color: '#F59E0B',
  },
  {
    name: 'Meera Patel',
    role: 'Recruiting Agency Head',
    company: 'TalentBridge HR',
    quote: 'The applicant tracking system and job board they built automated 80% of our hiring workflow. We scaled from 50 to 300 placements per month.',
    color: '#A855F7',
  },
  {
    name: 'Arun Nair',
    role: 'Pharma Distributor',
    company: 'NairPharma Distributors',
    quote: 'Inventory management was a nightmare before GlideQuantum. Now everything from orders to compliance tracking runs on one clean dashboard.',
    color: '#22C55E',
  },
];

function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`testimonial-card-${index}`}
      className="group glass-card p-8 beam-effect relative"
    >
      {/* Quote icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${testimonial.color}15`, border: `1px solid ${testimonial.color}30` }}
      >
        <Quote size={18} style={{ color: testimonial.color }} />
      </div>

      {/* Quote text */}
      <p className="text-white/70 text-sm leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: `${testimonial.color}25`, border: `1px solid ${testimonial.color}30` }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/30 text-xs">{testimonial.role} · {testimonial.company}</div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)` }}
      />
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-secondary" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#EC4899] block mb-4"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Real Results.</span>
            <br />
            <span className="text-gradient-static">Real Businesses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Don't take our word for it. Here's what business owners say after 
            working with GlideQuantum Labs.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
