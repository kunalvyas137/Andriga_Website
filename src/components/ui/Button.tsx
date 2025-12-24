"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function Button({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    children,
    disabled,
    type = "button",
    onClick,
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)] hover:-translate-y-0.5",
        secondary: "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)]",
        ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
        outline: "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-full",
        lg: "px-8 py-3.5 text-base rounded-full",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            type={type}
            onClick={onClick}
        >
            {isLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : null}
            {children}
        </motion.button>
    );
}
