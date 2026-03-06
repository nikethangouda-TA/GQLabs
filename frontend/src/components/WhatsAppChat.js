import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';
import SITE_CONFIG from '@/config';

function WhatsAppIcon({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}


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
                            <WhatsAppIcon size={28} />
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
