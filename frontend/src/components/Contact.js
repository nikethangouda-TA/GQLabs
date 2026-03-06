import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import SITE_CONFIG from '@/config';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const industryOptions = [
  'Real Estate',
  'Restaurant / Hotel',
  'Pub / Bar / Brewery',
  'Healthcare / Hospital',
  'Education / Institute',
  'Pharma',
  'Automobile',
  'Recruiting Agency',
  'Retail / E-commerce',
  'Travel / Tourism',
  'Agriculture',
  'Fitness / Wellness',
  'Other',
];

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    business_name: '',
    industry: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone number.', { duration: 5000 });
      return;
    }

    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('Message sent! We\'ll get back to you within 4 hours.', { duration: 5000 });
      setForm({ name: '', phone: '', business_name: '', industry: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try WhatsApp instead.', { duration: 5000 });
    }
    setSending(false);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-secondary" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.2em] uppercase font-mono text-[#00F0FF] block mb-4"
            >
              Start a Project
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-8"
              style={{ fontFamily: 'Unbounded' }}
            >
              <span className="text-white">Let's Build</span>
              <br />
              <span className="text-gradient-static">Something Epic.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 leading-relaxed mb-12"
            >
              Srinikethan replies within 4 hours. Clients across India and internationally welcome. 
              Your idea deserves to be built — let's make it happen.
            </motion.p>

            {/* Contact methods */}
            <div className="space-y-4">
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                href={SITE_CONFIG.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-link"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#22C55E]/40 hover:bg-[#22C55E]/5 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center">
                  <MessageCircle size={20} className="text-[#22C55E]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">WhatsApp</div>
                  <div className="text-white/40 text-sm">+91 {SITE_CONFIG.whatsappNumber.slice(2)}</div>
                </div>
                <ArrowUpRight size={16} className="text-white/30 group-hover:text-[#22C55E] transition-colors duration-300" />
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                href={`mailto:${SITE_CONFIG.email}`}
                data-testid="contact-email-link"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#7000FF]/40 hover:bg-[#7000FF]/5 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7000FF]/15 border border-[#7000FF]/30 flex items-center justify-center">
                  <Mail size={20} className="text-[#7000FF]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Email</div>
                  <div className="text-white/40 text-sm">{SITE_CONFIG.email}</div>
                </div>
                <ArrowUpRight size={16} className="text-white/30 group-hover:text-[#7000FF] transition-colors duration-300" />
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center">
                  <MapPin size={20} className="text-[#00F0FF]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Location</div>
                  <div className="text-white/40 text-sm">{SITE_CONFIG.location} · Worldwide</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right side — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="bg-black/40 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm space-y-5"
            >
              <div>
                <label className="text-xs text-white/40 font-mono tracking-wider uppercase block mb-2">
                  Your Name *
                </label>
                <input
                  data-testid="contact-input-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 font-mono tracking-wider uppercase block mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  data-testid="contact-input-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+91 90322 47068"
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 font-mono tracking-wider uppercase block mb-2">
                  Business Name
                </label>
                <input
                  data-testid="contact-input-business"
                  type="text"
                  value={form.business_name}
                  onChange={(e) => updateField('business_name', e.target.value)}
                  placeholder="Your Business Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 font-mono tracking-wider uppercase block mb-2">
                  Industry
                </label>
                <select
                  data-testid="contact-select-industry"
                  value={form.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="" className="bg-[#030014]">Select your industry</option>
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#030014]">{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 font-mono tracking-wider uppercase block mb-2">
                  What do you want to build?
                </label>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={sending}
                className="w-full magnetic-btn flex items-center justify-center gap-3 h-14 bg-[#7000FF] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(112,0,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300"
              >
                {sending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-center text-white/20 mt-3">
                Private · No spam · Worldwide
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
