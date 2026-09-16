"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Briefcase, Users, Rocket, CheckCircle, Upload, Heart, Lightbulb, TrendingUp } from "lucide-react";

export default function CareersPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        linkedin: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <Briefcase className="w-4 h-4" />
                            Join Our Team
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1]" style={{ letterSpacing: '-0.02em' }}>
                            We build futures<br />
                            not just Tech.
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                            We only stop growing when we stop learning. We believe the best way to scale and still have fun is by fostering a child-like curiosity about everything around us.
                        </p>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                            Discover a workplace where your talents are nurtured, your ideas are valued, and your potential is limitless. Explore our diverse range of roles and find your place in a dynamic environment where passion meets purpose.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Us */}
            <Section className="bg-[var(--bg-secondary)]">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Andriga?</h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        Be part of a team that values innovation, growth, and making a real impact.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        {
                            icon: Lightbulb,
                            title: "Innovation First",
                            description: "Work on cutting-edge AI and technology projects that push boundaries.",
                        },
                        {
                            icon: TrendingUp,
                            title: "Career Growth",
                            description: "Continuous learning opportunities and clear paths for advancement.",
                        },
                        {
                            icon: Users,
                            title: "Collaborative Culture",
                            description: "Work with talented professionals in a supportive, team-oriented environment.",
                        },
                        {
                            icon: Heart,
                            title: "Work-Life Balance",
                            description: "Flexible work arrangements and a culture that values your well-being.",
                        },
                    ].map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center hover:border-[var(--border-default)] transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                                <benefit.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Application Form */}
            <Section>
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Apply Now
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)]">
                        Fill out the form below and we&apos;ll get back to you shortly.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Application Submitted!</h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Thank you for your interest in joining Andriga. We&apos;ll review your application and get back to you within 5 business days.
                                </p>
                                <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                                    Submit Another Application
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

                                <div className="grid md:grid-cols-2 gap-6">
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
                                            placeholder="john@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                            placeholder="+1 (234) 567-890"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium mb-2">
                                            Position of Interest *
                                        </label>
                                        <select
                                            id="position"
                                            name="position"
                                            required
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                        >
                                            <option value="">Select Position</option>
                                            <option value="software-engineer">Software Engineer</option>
                                            <option value="ai-ml-engineer">AI/ML Engineer</option>
                                            <option value="data-scientist">Data Scientist</option>
                                            <option value="product-manager">Product Manager</option>
                                            <option value="devops-engineer">DevOps Engineer</option>
                                            <option value="ui-ux-designer">UI/UX Designer</option>
                                            <option value="business-analyst">Business Analyst</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium mb-2">
                                            Years of Experience *
                                        </label>
                                        <select
                                            id="experience"
                                            name="experience"
                                            required
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                        >
                                            <option value="">Select Experience</option>
                                            <option value="0-1">0-1 years</option>
                                            <option value="1-3">1-3 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5-10">5-10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                                        LinkedIn Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Tell Us About Yourself *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                                        placeholder="Share your background, skills, and why you'd like to join Andriga..."
                                    />
                                </div>

                                <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Upload className="w-5 h-5 text-[var(--accent-primary)]" />
                                        <h4 className="font-medium text-sm">Resume/CV</h4>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mb-3">
                                        Please email your resume to <a href="mailto:careers@andriga.com" className="text-[var(--accent-primary)] hover:underline">careers@andriga.com</a> with the subject line: Application - [Position Name]
                                    </p>
                                </div>

                                <Button type="submit" size="lg" className="w-full">
                                    Submit Application
                                    <Rocket className="w-4 h-4" />
                                </Button>

                                <p className="text-xs text-[var(--text-tertiary)] text-center">
                                    By submitting, you agree to our Privacy Policy and consent to us contacting you about your application.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </Section>
        </>
    );
}
