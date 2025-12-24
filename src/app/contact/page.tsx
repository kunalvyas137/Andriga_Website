"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-20" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Let&apos;s Start a <GradientText>Conversation</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                            Ready to transform your business with AI? We&apos;d love to hear from you.
                            Reach out and let&apos;s discuss how we can help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <Section>
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-[var(--text-secondary)] mb-8">
                            Whether you have a question about our services, need a custom solution,
                            or want to discuss a potential partnership, our team is ready to help.
                        </p>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email Us</h4>
                                    <a href="mailto:contact@andriga.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                                        contact@andriga.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Call Us</h4>
                                    <a href="tel:+1234567890" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Visit Us</h4>
                                    <p className="text-[var(--text-secondary)]">
                                        123 Innovation Drive<br />
                                        Tech City, TC 12345
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Business Hours</h4>
                                    <p className="text-[var(--text-secondary)]">
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday - Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl">
                            {[
                                { value: "< 24h", label: "Response Time" },
                                { value: "98%", label: "Satisfaction" },
                                { value: "100+", label: "Clients" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-xs text-[var(--text-tertiary)]">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                                    <p className="text-[var(--text-secondary)] mb-6">
                                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                    </p>
                                    <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                            placeholder="Company Inc."
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Your Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                                            placeholder="Tell us about your project or how we can help..."
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full">
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </Button>

                                    <p className="text-xs text-[var(--text-tertiary)] text-center">
                                        By submitting, you agree to our Privacy Policy and Terms of Service.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* FAQ Section */}
            <Section className="bg-[var(--bg-secondary)]">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-[var(--text-secondary)]">
                        Quick answers to common questions about working with us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        {
                            q: "How long does a typical AI project take?",
                            a: "Project timelines vary based on complexity. A basic chatbot can be deployed in 2-4 weeks, while custom ML solutions may take 2-3 months. We'll provide a detailed timeline during our initial consultation.",
                        },
                        {
                            q: "Do you work with small businesses?",
                            a: "Absolutely! We specialize in helping small to medium-sized businesses adopt AI. We offer flexible solutions that scale with your needs and budget.",
                        },
                        {
                            q: "What industries do you serve?",
                            a: "We work across multiple industries including healthcare, retail, finance, manufacturing, and logistics. Our solutions are adaptable to any industry with specific customization.",
                        },
                        {
                            q: "How do you ensure data security?",
                            a: "Security is our top priority. We follow industry best practices, are SOC 2 compliant, and can work with your existing security requirements. All data is encrypted and handled according to strict protocols.",
                        },
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-6"
                        >
                            <h3 className="font-semibold mb-2">{faq.q}</h3>
                            <p className="text-[var(--text-secondary)] text-sm">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </>
    );
}
