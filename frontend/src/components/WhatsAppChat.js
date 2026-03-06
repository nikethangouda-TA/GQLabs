import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';
import SITE_CONFIG from '@/config';

const quickReplies = [
  "I need a website for my business",
  "How much does it cost?",
  "I want to automate my business",
  "Can we schedule a demo call?",
  "I need a mobile app",
];

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text) => {
    const msg = text || message;
    if (!msg.trim()) return;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]" data-testid="whatsapp-chat-widget">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-[340px] md:w-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: '#0a0a14' }}
          >
            {/* Header */}
            <div className="bg-[#22C55E] px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-sm" style={{ fontFamily: 'Unbounded' }}>
                  {SITE_CONFIG.companyName}
                </div>
                <div className="text-white/80 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Typically replies in minutes
                </div>
              </div>
              <button
                data-testid="whatsapp-chat-close"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-5 min-h-[200px]">
              {/* Welcome message bubble */}
              <div className="flex gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center shrink-0 mt-1">
                  <MessageCircle size={14} className="text-[#22C55E]" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[250px]">
                  <p className="text-white/80 text-sm leading-relaxed">
                    Hi there! I'm Srinikethan from GlideQuantum Labs. How can I help your business today?
                  </p>
                  <span className="text-white/20 text-[10px] mt-1 block">Just now</span>
                </div>
              </div>

              {/* Quick replies */}
              <div className="space-y-2">
                <p className="text-white/30 text-xs font-mono tracking-wider uppercase mb-3">Quick replies</p>
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    data-testid={`quick-reply-${reply.slice(0, 15).toLowerCase().replace(/\s/g, '-')}`}
                    onClick={() => sendMessage(reply)}
                    className="block w-full text-left px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/60 text-sm hover:border-[#22C55E]/40 hover:text-white hover:bg-[#22C55E]/5 transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                <input
                  ref={inputRef}
                  data-testid="whatsapp-chat-input"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none"
                />
                <button
                  data-testid="whatsapp-chat-send"
                  onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-xl bg-[#22C55E] flex items-center justify-center hover:scale-105 transition-transform duration-200"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <p className="text-center text-white/15 text-[10px] mt-2 flex items-center justify-center gap-1">
                Powered by WhatsApp <ArrowUpRight size={8} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        data-testid="whatsapp-chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
}
