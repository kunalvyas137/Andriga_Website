"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import {
    Zap,
    Shield,
    Clock,
    Puzzle,
    HeadphonesIcon,
    TrendingUp
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Deploy AI solutions in weeks, not months. Our streamlined process gets you results quickly.",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade security with SOC 2 compliance. Your data is always protected and private.",
    },
    {
        icon: Clock,
        title: "24/7 Availability",
        description: "AI-powered systems that never sleep. Serve your customers around the clock.",
    },
    {
        icon: Puzzle,
        title: "Seamless Integration",
        description: "Works with your existing tools and workflows. No disruption to your operations.",
    },
    {
        icon: HeadphonesIcon,
        title: "Dedicated Support",
        description: "Expert team available whenever you need help. We're partners in your success.",
    },
    {
        icon: TrendingUp,
        title: "Measurable ROI",
        description: "Track real impact with comprehensive analytics. See your investment pay off.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function FeaturesSection() {
    return (
        <Section>
            <SectionHeader
                badge="Why Choose Us"
                title="Built for Modern Businesses"
                subtitle="We combine cutting-edge technology with practical business understanding to deliver AI solutions that actually work."
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group relative"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
