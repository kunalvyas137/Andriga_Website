"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import {
    Brain,
    Cpu,
    MessageSquare,
    Database,
    Users,
    TrendingUp,
    ArrowRight,
    Check,
    Sparkles
} from "lucide-react";

const services = [
    {
        icon: Brain,
        title: "AI Strategy & Consulting",
        description: "Chart your AI journey with expert guidance. We assess your current state, identify opportunities, and create a comprehensive roadmap for AI adoption.",
        features: [
            "AI readiness assessment",
            "Opportunity identification",
            "ROI projections",
            "Implementation roadmap",
            "Change management planning",
        ],
        color: "#3B82F6",
    },
    {
        icon: Cpu,
        title: "Custom AI Development",
        description: "Purpose-built AI solutions tailored to your unique business needs. From concept to deployment, we handle the entire development lifecycle.",
        features: [
            "Machine learning models",
            "Computer vision systems",
            "Predictive analytics",
            "Recommendation engines",
            "Anomaly detection",
        ],
        color: "#0EA5E9",
    },
    {
        icon: MessageSquare,
        title: "Conversational AI",
        description: "Deploy intelligent chatbots and virtual assistants that understand context, handle complex queries, and provide human-like interactions.",
        features: [
            "Customer service bots",
            "Sales assistants",
            "Internal help desks",
            "Multi-language support",
            "Omnichannel deployment",
        ],
        color: "#38BDF8",
    },
    {
        icon: Database,
        title: "Data Analytics & ML",
        description: "Unlock insights hidden in your data. Our analytics solutions help you make data-driven decisions with confidence.",
        features: [
            "Data pipeline setup",
            "Business intelligence",
            "Real-time dashboards",
            "Predictive modeling",
            "Data visualization",
        ],
        color: "#3B82F6",
    },
    {
        icon: Users,
        title: "AI Training & Support",
        description: "Empower your team to work effectively with AI. We provide comprehensive training and ongoing support to ensure success.",
        features: [
            "Team workshops",
            "Executive briefings",
            "Technical training",
            "Documentation",
            "24/7 support",
        ],
        color: "#0EA5E9",
    },
    {
        icon: TrendingUp,
        title: "Process Automation",
        description: "Streamline operations with intelligent automation. Reduce manual work, minimize errors, and improve efficiency.",
        features: [
            "Workflow automation",
            "Document processing",
            "Quality assurance",
            "Inventory optimization",
            "Scheduling systems",
        ],
        color: "#38BDF8",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-30" />
                <div className="absolute inset-0 bg-grid opacity-30" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <Sparkles className="w-4 h-4" />
                            Comprehensive AI Solutions
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            AI Services That{" "}
                            <GradientText>Drive Results</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                            From strategy to implementation, we provide end-to-end AI solutions
                            designed to transform your business operations and accelerate growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <Section>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="grid lg:grid-cols-2 gap-8 items-center"
                        >
                            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                <Card className="h-full" hover={false}>
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${service.color}20` }}
                                    >
                                        <service.icon className="w-7 h-7" style={{ color: service.color }} />
                                    </div>
                                    <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                                    <CardDescription className="text-base mb-6">{service.description}</CardDescription>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-[var(--text-secondary)]">
                                                <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-[var(--accent-primary)]" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>

                            <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                <div
                                    className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center"
                                >
                                    <service.icon className="w-24 h-24 opacity-20" style={{ color: service.color }} />
                                </div>
                                <div
                                    className="absolute -inset-4 rounded-3xl blur-3xl opacity-20 -z-10"
                                    style={{ background: service.color }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* CTA */}
            <Section className="bg-[var(--bg-secondary)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] mb-8">
                        Let&apos;s discuss how our AI solutions can help transform your business.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg">
                                Schedule Consultation
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button variant="secondary" size="lg">
                                Try AI Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </Section>
        </>
    );
}
