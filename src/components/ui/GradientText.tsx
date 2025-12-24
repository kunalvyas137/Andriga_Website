"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

export default function GradientText({ children, className = "", animate = false }: GradientTextProps) {
    return (
        <motion.span
            className={`bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent ${animate ? "bg-[length:200%_200%] animate-gradient" : ""} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.span>
    );
}
