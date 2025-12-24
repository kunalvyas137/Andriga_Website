"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export default function Card({ children, className, hover = true, glow = false }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={clsx(
                "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 transition-all duration-300",
                hover && "hover:border-[var(--border-default)] hover:shadow-lg",
                glow && "hover:shadow-[0_0_30px_var(--accent-glow)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={clsx("mb-4", className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={clsx("text-xl font-semibold text-[var(--text-primary)]", className)}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <p className={clsx("text-[var(--text-secondary)] mt-2", className)}>
            {children}
        </p>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={clsx("", className)}>
            {children}
        </div>
    );
}
