"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card, { CardTitle, CardDescription } from "@/components/ui/Card";
import { Sparkles, Bot, Code2, Target, UserSearch, Workflow } from "lucide-react";

const services = [
    {
        icon: Sparkles,
        title: "Digital Transformation",
        description: "We modernize businesses by replacing legacy technologies with scalable, cloud-native solutions. By embedding AI and agentic workflows, we eliminate manual processes, accelerate operations, and drive automation with measurable efficiency across the organization.",
        color: "#3B82F6",
    },
    {
        icon: Bot,
        title: "Contact Center & Conversational AI",
        description: "We build and modernize intelligent contact centers by integrating AI across voice, chat, and email to transform your customer support into a seamless, automated, and hyper-efficient operation.",
        color: "#0EA5E9",
    },
    {
        icon: Code2,
        title: "Web & Mobile App Development",
        description: "We build custom web and mobile applications tailored to your business needs, from concept to deployment. Our team also enhances existing applications and seamlessly integrates business systems to extend functionality, improve performance, and accelerate growth.",
        color: "#38BDF8",
    },
    {
        icon: UserSearch,
        title: "Talent Acquisition & Workforce Solutions",
        description: "We Bridge your capability gaps by providing technical and non-technical talent through flexible, contract-based workforce solutions tailored to your enterprise's specific project needs.",
        color: "#3B82F6",
    },
    {
        icon: Workflow,
        title: "Business Process Outsourcing",
        description: "We streamline your operations by providing scalable, expert BPO solutions ranging from customer support to specialized technical assistance.",
        color: "#0EA5E9",
    },
    {
        icon: Target,
        title: "Product, Project & Agile Delivery Coaching",
        description: "We coach organizations on effective product and project management, guiding teams from concept to delivery with strong strategic and execution discipline. In parallel, we enable Agile and lean delivery adoption, helping teams build the right frameworks to accelerate speed-to-market and deliver consistent business outcomes.",
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
                title="Digital Transformation and AI Solutions that drive results"
                subtitle="From strategy to implementation, we provide end-to-end Technology & AI services designed to transform your business operations."
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
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
