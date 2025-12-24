import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const footerLinks = {
    product: [
        { label: "Services", href: "/services" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "AI Demo", href: "/demo" },
        { label: "Pricing", href: "/pricing" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
        { label: "Support", href: "/support" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:contact@andriga.com", label: "Email" },
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div className="container py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center mb-4">
                            <Image
                                src="/andriga-logo.png"
                                alt="ANDRIGA Logo"
                                width={350}
                                height={125}
                                className="h-20 w-auto"
                            />
                        </Link>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-sm">
                            Empowering businesses with cutting-edge AI solutions. Transform your operations,
                            enhance customer experiences, and drive growth with intelligent automation.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-b border-[var(--border-subtle)] py-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-lg font-semibold mb-1">Stay updated</h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Get the latest AI insights and updates delivered to your inbox.
                            </p>
                        </div>
                        <form className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-tertiary)]">
                    <p>© {new Date().getFullYear()} ANDRIGA. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-[var(--text-secondary)] transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
