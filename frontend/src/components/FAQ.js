import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How much does a website cost?',
    answer: 'Our projects start from as low as ₹8,000 for a simple business website to ₹50,000+ for full-stack applications with CRM, automation, and mobile apps. Every project is custom-quoted based on your exact needs — no hidden charges, no surprises.',
  },
  {
    question: 'How long does it take to build?',
    answer: 'A standard website takes 7-14 days. A complex application with CRM, booking systems, and automation takes 14-21 days. We give you daily progress updates so you always know where things stand.',
  },
  {
    question: 'Do I need to pay everything upfront?',
    answer: 'No. We follow a 50/50 model — 50% upfront to begin work, and the remaining 50% only after you see and approve the final product. You only pay the balance when you\'re satisfied.',
  },
  {
    question: 'Will I own the source code?',
    answer: 'Yes, 100%. On delivery, you receive full source code, admin access, database access, and domain control. Everything is yours. We don\'t hold anything hostage — no lock-in, ever.',
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'We provide 3 months of free support after launch — that includes bug fixes, minor changes, and guidance. After that, we offer affordable maintenance plans or you can hire any developer since you own the code.',
  },
  {
    question: 'Can you build mobile apps too?',
    answer: 'Absolutely. We build for Web, Android, iOS, and Desktop. Many clients start with a website and later expand to mobile apps. We design systems that scale seamlessly across all platforms.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! We work with businesses across India and internationally. Communication happens via WhatsApp, email, and video calls. Time zones are never an issue — we adapt to yours.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, battle-tested tech — React, Next.js, React Native, Python, Node.js, Firebase, AWS, MongoDB, and more. The tech stack is always chosen based on what\'s best for your specific business need, not what\'s trendy.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      data-testid={`faq-item-${index}`}
      className="border-b border-white/5 last:border-b-0"
    >
      <button
        data-testid={`faq-toggle-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="text-base md:text-lg text-white/80 font-semibold pr-8 group-hover:text-white transition-colors duration-200">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-white/40 text-sm md:text-base leading-relaxed pb-6 pr-12">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase font-mono text-[#F59E0B] block mb-4"
          >
            Questions & Answers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Got</span>{' '}
            <span className="text-gradient-static">Questions?</span>
          </motion.h2>
        </div>

        {/* FAQ list */}
        <div className="glass-card p-6 md:p-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
