import { motion } from 'framer-motion';
import {
  Globe, Smartphone, BarChart3, Users, MessageSquare,
  Zap, ShieldCheck, Cog, Database, Layout
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Websites That Convert',
    description: 'Stunning, fast, SEO-optimized websites that turn visitors into paying customers from the first click.',
    span: 'col-span-1 md:col-span-2',
    color: '#7000FF',
    featured: true,
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native Android & iOS apps that put your business in every customer\'s pocket.',
    span: 'col-span-1',
    color: '#00F0FF',
  },
  {
    icon: Layout,
    title: 'Desktop Applications',
    description: 'Powerful desktop software for complex business operations.',
    span: 'col-span-1',
    color: '#A855F7',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Dashboards',
    description: 'Real-time business intelligence. Know what\'s working, what\'s not, and what to do next.',
    span: 'col-span-1',
    color: '#EC4899',
  },
  {
    icon: Users,
    title: 'Customer CRM',
    description: 'Track every lead, automate follow-ups, and never lose a customer again.',
    span: 'col-span-1',
    color: '#F59E0B',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Automation',
    description: 'Auto-replies, appointment reminders, marketing broadcasts, and lead capture via WhatsApp.',
    span: 'col-span-1 md:col-span-2',
    color: '#22C55E',
    featured: true,
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Automate repetitive tasks — billing, scheduling, inventory, notifications — and save hours daily.',
    span: 'col-span-1',
    color: '#3B82F6',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description: 'SSL, encrypted data, GDPR-ready systems. Your business data stays protected.',
    span: 'col-span-1',
    color: '#10B981',
  },
  {
    icon: Database,
    title: 'Cloud Infrastructure',
    description: 'AWS, Firebase, Google Cloud — enterprise-grade hosting with 99.9% uptime.',
    span: 'col-span-1',
    color: '#6366F1',
  },
  {
    icon: Cog,
    title: 'Custom Integrations',
    description: 'Payment gateways, third-party APIs, POS systems — we integrate everything.',
    span: 'col-span-1',
    color: '#F97316',
  },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`${service.span} group relative glass-card p-8 beam-effect cursor-pointer transition-colors duration-500 ${
        service.featured ? 'md:p-10' : ''
      }`}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${service.color}15`,
          border: `1px solid ${service.color}30`,
        }}
      >
        <service.icon size={24} style={{ color: service.color }} />
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-white mb-3 ${service.featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
        style={{ fontFamily: 'Unbounded' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/50 leading-relaxed text-sm md:text-base">
        {service.description}
      </p>

      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${service.color}08 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#7000FF] block mb-4"
          >
            What We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">One App.</span>
            <br />
            <span className="text-gradient-static">Entire Business.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-xl mt-6 leading-relaxed"
          >
            We don't just build one thing. We build everything your business needs to 
            operate, grow, and dominate — on every platform.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
