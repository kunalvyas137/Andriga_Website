"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, Clock, User, Tag, BookOpen } from "lucide-react";

const blogPosts = [
    {
        id: "future-of-ai-customer-service",
        title: "The Future of AI in Customer Service: Trends to Watch in 2024",
        excerpt: "Explore how conversational AI and machine learning are reshaping customer experiences and what businesses need to prepare for.",
        author: "Alex Chen",
        date: "Dec 20, 2024",
        readTime: "8 min read",
        category: "Industry Trends",
        featured: true,
    },
    {
        id: "implementing-rag-systems",
        title: "A Practical Guide to Implementing RAG Systems",
        excerpt: "Learn the fundamentals of Retrieval-Augmented Generation and how to build context-aware AI applications for your business.",
        author: "Michael Park",
        date: "Dec 15, 2024",
        readTime: "12 min read",
        category: "Technical",
        featured: false,
    },
    {
        id: "ai-roi-measurement",
        title: "Measuring ROI on AI Investments: A Framework for SMBs",
        excerpt: "A comprehensive guide to calculating and tracking the return on investment for your AI initiatives.",
        author: "Sarah Johnson",
        date: "Dec 10, 2024",
        readTime: "6 min read",
        category: "Business",
        featured: false,
    },
    {
        id: "ethical-ai-practices",
        title: "Building Ethical AI: Best Practices for Responsible Development",
        excerpt: "How to ensure your AI systems are fair, transparent, and aligned with ethical guidelines and regulations.",
        author: "Emma Williams",
        date: "Dec 5, 2024",
        readTime: "10 min read",
        category: "Best Practices",
        featured: false,
    },
    {
        id: "llm-fine-tuning-guide",
        title: "Fine-Tuning Large Language Models for Enterprise Use Cases",
        excerpt: "Step-by-step guide to customizing LLMs for domain-specific applications with practical examples.",
        author: "Michael Park",
        date: "Nov 28, 2024",
        readTime: "15 min read",
        category: "Technical",
        featured: false,
    },
    {
        id: "ai-digital-transformation",
        title: "AI-Driven Digital Transformation: Success Stories and Lessons",
        excerpt: "Real-world examples of businesses that successfully transformed their operations using AI solutions.",
        author: "Alex Chen",
        date: "Nov 20, 2024",
        readTime: "9 min read",
        category: "Case Studies",
        featured: false,
    },
];

const categories = ["All", "Industry Trends", "Technical", "Business", "Best Practices", "Case Studies"];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
    const featuredPost = blogPosts.find((post) => post.featured);
    const regularPosts = blogPosts.filter((post) => !post.featured);

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="absolute inset-0 bg-grid opacity-30" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <BookOpen className="w-4 h-4" />
                            ANDRIGA Blog
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Insights & <GradientText>Ideas</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                            Stay updated with the latest trends in AI, practical guides, and
                            thought leadership from our team of experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <Section className="py-8">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === "All"
                                    ? "bg-[var(--accent-primary)] text-white"
                                    : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </Section>

            {/* Featured Post */}
            {featuredPost && (
                <Section className="py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href={`/blog/${featuredPost.id}`}>
                            <div className="group relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] rounded-3xl border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--border-default)] transition-all">
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center">
                                        <BookOpen className="w-24 h-24 text-[var(--accent-primary)] opacity-30" />
                                    </div>
                                    <div className="p-8 lg:py-12">
                                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-4">
                                            Featured
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-[var(--text-secondary)] mb-6">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {featuredPost.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.readTime}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                {featuredPost.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </Section>
            )}

            {/* Blog Grid */}
            <Section>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {regularPosts.map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                            <Link href={`/blog/${post.id}`}>
                                <div className="group h-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden hover:border-[var(--border-default)] transition-all duration-300 hover:shadow-lg">
                                    {/* Thumbnail */}
                                    <div className="aspect-video bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-secondary)] flex items-center justify-center border-b border-[var(--border-subtle)]">
                                        <BookOpen className="w-12 h-12 text-[var(--accent-primary)] opacity-30" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-[var(--text-tertiary)]">{post.date}</span>
                                        </div>

                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)]">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Newsletter CTA */}
            <Section className="bg-[var(--bg-secondary)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] mb-8">
                        Get the latest AI insights delivered directly to your inbox. No spam, just valuable content.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                        <button className="btn btn-primary whitespace-nowrap">
                            Subscribe
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </Section>
        </>
    );
}
