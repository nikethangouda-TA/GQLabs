import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM',
];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      dates.push({
        full: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
  }
  return dates;
}

export function BookDemo({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', business_name: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState(false);

  const dates = generateDates();

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone number.', { duration: 5000 });
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/book-demo`, {
        ...form,
        preferred_date: selectedDate,
        preferred_time: selectedTime,
      });
      setBooked(true);
      toast.success('Demo call booked! We\'ll confirm via WhatsApp.', { duration: 5000 });
    } catch (err) {
      toast.error('Booking failed. Please try again or WhatsApp us.', { duration: 5000 });
    }
    setSending(false);
  };

  const reset = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setForm({ name: '', phone: '', email: '', business_name: '', notes: '' });
    setBooked(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          data-testid="book-demo-modal"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={reset} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl bg-[#0a0a14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              data-testid="book-demo-close"
              onClick={reset}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#7000FF]/15 border border-[#7000FF]/30 flex items-center justify-center">
                  <Calendar size={20} className="text-[#7000FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Unbounded' }}>
                    Book a Demo Call
                  </h3>
                  <p className="text-xs text-white/40 font-mono">15 min · Free · No obligation</p>
                </div>
              </div>

              {/* Progress */}
              {!booked && (
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        s <= step ? 'bg-[#7000FF]' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-8">
              {booked ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                  data-testid="book-demo-success"
                >
                  <div className="w-20 h-20 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-[#22C55E]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Unbounded' }}>
                    You're Booked!
                  </h3>
                  <p className="text-white/50 mb-2">
                    {selectedDate} at {selectedTime}
                  </p>
                  <p className="text-white/30 text-sm mb-8">
                    Srinikethan will confirm via WhatsApp within 2 hours.
                  </p>
                  <button
                    data-testid="book-demo-done"
                    onClick={reset}
                    className="px-8 py-3 bg-[#7000FF] text-white rounded-full font-semibold magnetic-btn"
                  >
                    Done
                  </button>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Date */
                <div data-testid="book-demo-step-date">
                  <h4 className="text-sm text-white/60 font-mono tracking-wider uppercase mb-5 flex items-center gap-2">
                    <Calendar size={14} /> Select a Date
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.full}
                        data-testid={`date-${d.full}`}
                        onClick={() => setSelectedDate(d.full)}
                        className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                          selectedDate === d.full
                            ? 'border-[#7000FF] bg-[#7000FF]/15 text-white'
                            : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">{d.day}</div>
                        <div className="text-lg font-bold">{d.date}</div>
                        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">{d.month}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    data-testid="book-demo-next-to-time"
                    onClick={() => selectedDate && setStep(2)}
                    disabled={!selectedDate}
                    className="mt-6 w-full flex items-center justify-center gap-2 h-12 bg-[#7000FF] text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed magnetic-btn"
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              ) : step === 2 ? (
                /* Step 2: Time */
                <div data-testid="book-demo-step-time">
                  <h4 className="text-sm text-white/60 font-mono tracking-wider uppercase mb-5 flex items-center gap-2">
                    <Clock size={14} /> Select a Time (IST)
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        data-testid={`time-${t.replace(/[:\s]/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          selectedTime === t
                            ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white'
                            : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 h-12 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      data-testid="book-demo-next-to-details"
                      onClick={() => selectedTime && setStep(3)}
                      disabled={!selectedTime}
                      className="flex-1 flex items-center justify-center gap-2 h-12 bg-[#7000FF] text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed magnetic-btn"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 3: Details */
                <div data-testid="book-demo-step-details" className="space-y-4">
                  <h4 className="text-sm text-white/60 font-mono tracking-wider uppercase mb-2">Your Details</h4>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 flex items-center gap-3">
                    <Calendar size={14} className="text-[#7000FF]" />
                    {selectedDate} at {selectedTime} IST
                  </div>
                  <input
                    data-testid="demo-input-name"
                    type="text"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 text-sm"
                  />
                  <input
                    data-testid="demo-input-phone"
                    type="tel"
                    placeholder="Phone / WhatsApp *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 text-sm"
                  />
                  <input
                    data-testid="demo-input-email"
                    type="email"
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 text-sm"
                  />
                  <input
                    data-testid="demo-input-business"
                    type="text"
                    placeholder="Business Name (optional)"
                    value={form.business_name}
                    onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 text-sm"
                  />
                  <textarea
                    data-testid="demo-input-notes"
                    placeholder="What would you like to discuss? (optional)"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF] outline-none transition-all duration-300 resize-none text-sm"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 h-12 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      data-testid="book-demo-submit"
                      onClick={handleSubmit}
                      disabled={sending}
                      className="flex-1 flex items-center justify-center gap-2 h-12 bg-[#7000FF] text-white rounded-xl font-semibold disabled:opacity-50 magnetic-btn shadow-[0_0_20px_rgba(112,0,255,0.3)]"
                    >
                      {sending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <CheckCircle2 size={16} /> Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
