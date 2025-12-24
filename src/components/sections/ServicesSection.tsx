"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import { Brain, Cpu, Users, TrendingUp, MessageSquare, Database, ArrowRight } from "lucide-react";

const services = [
    {
        icon: Brain,
        title: "AI Strategy & Consulting",
        description: "Expert guidance to identify AI opportunities and create a roadmap for digital transformation tailored to your business goals.",
        color: "#3B82F6",
    },
    {
        icon: Cpu,
        title: "Custom AI Development",
        description: "Build intelligent solutions from scratch - chatbots, recommendation engines, predictive analytics, and more.",
        color: "#0EA5E9",
    },
    {
        icon: MessageSquare,
        title: "Conversational AI",
        description: "Deploy AI-powered chatbots and virtual assistants that understand context and provide human-like interactions.",
        color: "#38BDF8",
    },
    {
        icon: Database,
        title: "Data Analytics & ML",
        description: "Transform your data into actionable insights with advanced machine learning models and analytics dashboards.",
        color: "#3B82F6",
    },
    {
        icon: Users,
        title: "AI Training & Support",
        description: "Empower your team with comprehensive training programs and ongoing support to maximize AI adoption.",
        color: "#0EA5E9",
    },
    {
        icon: TrendingUp,
        title: "Process Automation",
        description: "Streamline operations with intelligent automation that learns and improves, reducing costs and increasing efficiency.",
        color: "#38BDF8",
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
        transition: { duration: 0.5 },
    },
};

export default function ServicesSection() {
    return (
        <Section id="services" withGrid>
            <SectionHeader
                badge="Our Services"
                title="AI Solutions That Drive Results"
                subtitle="From strategy to implementation, we provide end-to-end AI services designed to transform your business operations."
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {services.map((service, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card glow className="h-full group">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${service.color}20` }}
                            >
                                <service.icon className="w-6 h-6" style={{ color: service.color }} />
                            </div>
                            <CardTitle>{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[var(--accent-primary)] hover:gap-2 transition-all"
                            >
                                Learn more
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
