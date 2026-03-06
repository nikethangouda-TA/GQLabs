import { motion } from 'framer-motion';
import {
    Building2, UtensilsCrossed, HeartPulse, GraduationCap,
    Car, Briefcase, Pill, Plane, ShoppingBag, Warehouse,
    Tractor, Dumbbell
} from 'lucide-react';

const industries = [
    {
        name: 'Real Estate',
        icon: Building2,
        tagline: 'Property portals, virtual tours, CRM & lead capture',
        color: '#7000FF',
        image: 'https://images.unsplash.com/photo-1772175195951-072f2c658829?w=800&q=80',
    },
    {
        name: 'Restaurants & Hotels',
        icon: UtensilsCrossed,
        tagline: 'Online ordering, table booking, guest CRM & reviews',
        color: '#EC4899',
        image: 'https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?w=800&q=80',
    },
    {
        name: 'Healthcare',
        icon: HeartPulse,
        tagline: 'Patient portals, appointment booking, telemedicine',
        color: '#00F0FF',
        image: 'https://images.unsplash.com/photo-1593824261342-fd6ee146f73d?w=800&q=80',
    },
    {
        name: 'Education',
        icon: GraduationCap,
        tagline: 'LMS, student portals, online admissions & fees',
        color: '#3B82F6',
        image: 'https://images.unsplash.com/photo-1758270704663-9d002a4b42a2?w=800&q=80',
    },
    {
        name: 'Automobile',
        icon: Car,
        tagline: 'Inventory showcase, test drive booking, service CRM',
        color: '#F59E0B',
        image: 'https://images.unsplash.com/photo-1679901080825-74dbfe30d46e?w=800&q=80',
    },
    {
        name: 'Recruiting',
        icon: Briefcase,
        tagline: 'Job boards, applicant tracking, HR automation',
        color: '#A855F7',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    },
    {
        name: 'Pharma',
        icon: Pill,
        tagline: 'Inventory management, order tracking, compliance',
        color: '#10B981',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
        name: 'Travel & Tourism',
        icon: Plane,
        tagline: 'Booking engines, itineraries, partner dashboards',
        color: '#F97316',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    },
    {
        name: 'Retail & E-commerce',
        icon: ShoppingBag,
        tagline: 'Online stores, POS integration, loyalty programs',
        color: '#EF4444',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    },
    {
        name: 'Warehousing',
        icon: Warehouse,
        tagline: 'Inventory systems, logistics tracking, supply chain',
        color: '#6366F1',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    },
    {
        name: 'Agriculture',
        icon: Tractor,
        tagline: 'Farm management, marketplace, weather integration',
        color: '#22C55E',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    },
    {
        name: 'Fitness & Wellness',
        icon: Dumbbell,
        tagline: 'Membership management, class booking, trainer CRM',
        color: '#F43F5E',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
];

function IndustryCard({ industry, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer beam-effect"
            data-testid={`industry-card-${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
            {/* Image */}
            <div className="absolute inset-0">
                <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Glow bar */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${industry.color}, transparent)` }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${industry.color}20`, border: `1px solid ${industry.color}40` }}
                >
                    <industry.icon size={20} style={{ color: industry.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Unbounded' }}>
                    {industry.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">{industry.tagline}</p>
            </div>
        </motion.div>
    );
}

export function IndustryShowcase() {
    return (
        <section id="industries" data-testid="industries-section" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-radial-secondary" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs tracking-[0.2em] uppercase font-mono text-[#00F0FF] block mb-4"
                >
                    Industries We Transform
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
                    style={{ fontFamily: 'Unbounded' }}
                >
                    <span className="text-white">Every Industry.</span>
                    <br />
                    <span className="text-gradient-static">One Partner.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-white/50 max-w-xl mt-6 leading-relaxed"
                >
                    We don't just build websites. We engineer complete digital ecosystems
                    tailored to your industry's unique challenges.
                </motion.p>
            </div>

            {/* Responsive Grid — all cards visible */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {industries.map((industry, i) => (
                        <IndustryCard key={industry.name} industry={industry} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
