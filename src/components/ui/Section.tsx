"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    withGrid?: boolean;
}

export default function Section({ children, className, id, withGrid = false }: SectionProps) {
    return (
        <section
            id={id}
            className={clsx(
                "relative py-20 md:py-28 overflow-hidden",
                withGrid && "bg-grid",
                className
            )}
        >
            <div className="container relative z-10">
                {children}
            </div>
        </section>
    );
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeader({ title, subtitle, badge, centered = true, className }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "mb-12 md:mb-16",
                centered && "text-center",
                className
            )}
        >
            {badge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
