import Section from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import Link from "next/link";

export default function TermsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-20" />
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            Legal & Compliance
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Terms of <GradientText>Service</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                            These terms govern your use of our website and services. By engaging with Andriga, you agree to these fair and flexible terms designed to foster collaborative partnerships.
                        </p>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <Section>
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Introduction</h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Welcome to Andriga. These Terms of Service outline the rules and regulations for using our website and engaging with our digital transformation and AI consulting services. By accessing our site or working with us, you acknowledge and accept these terms.
                        </p>
                        <p className="text-sm text-[var(--text-tertiary)] mt-3">Last updated: January 15, 2026</p>
                    </div>

                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">1. Use of Our Website</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                You may use our website to learn about our services, access demos, and contact us for business inquiries. We ask that you:
                            </p>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>Use the site lawfully and respectfully.</li>
                                <li>Provide accurate information when submitting forms or inquiries.</li>
                                <li>Respect intellectual property rights and refrain from unauthorized copying or distribution.</li>
                                <li>Avoid any activity that could harm our systems or other users.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">2. Services & Engagement</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                Our consulting and technology services are provided under separate agreements tailored to each client&apos;s needs. These Terms of Service do not constitute a contract for professional services. Specific project terms, deliverables, timelines, and fees will be documented in individual statements of work or service agreements.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">3. Intellectual Property</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                All content on this website—including text, graphics, logos, and code—is owned by Andriga or our licensors and protected by copyright and trademark laws. You may not reproduce, modify, or distribute our content without prior written permission. Client deliverables and intellectual property ownership will be defined in project-specific agreements.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">4. Third-Party Links & Integrations</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                Our website may contain links to third-party sites or integrate with external tools. We are not responsible for the content, accuracy, or practices of these third parties. Your use of external sites is at your own risk and subject to their terms.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">5. Disclaimers & Limitations</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                Our website and general information are provided &quot;as is&quot; without warranties of any kind. While we strive for accuracy, we do not guarantee that all content is error-free or current. To the extent permitted by law, Andriga is not liable for indirect, incidental, or consequential damages arising from your use of this site.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                For professional services engagements, liability and indemnification terms will be addressed in your service agreement.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">6. Privacy & Data Protection</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                Your privacy matters to us. Please review our <Link href="/privacy" className="text-[var(--accent-primary)] hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information. We comply with applicable data protection regulations across the US, UK, India, and other jurisdictions where we operate.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">7. Termination</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                We reserve the right to restrict or terminate access to our website for any user who violates these terms or engages in harmful conduct. You may stop using our site at any time. Professional service engagements have their own termination provisions defined in the respective agreements.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">8. Governing Law</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                These Terms of Service are governed by the laws of the jurisdiction where we operate and where services are delivered, as applicable. Any disputes will be resolved through good faith negotiation first. If formal proceedings are required, jurisdiction will be determined based on the nature of the engagement and mutual agreement.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">9. Changes to These Terms</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                We may update these Terms of Service from time to time to reflect changes in our practices or legal requirements. Updates will be posted on this page with a revised date. Continued use of the website after changes indicates your acceptance of the new terms.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">10. Contact Us</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                                If you have questions about these Terms of Service or need clarification on any provisions, please reach out through our <Link href="/contact" className="text-[var(--accent-primary)] hover:underline">Contact page</Link> or email legal@andriga.com.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border-2 border-[var(--border-subtle)] rounded-2xl p-8 md:p-10 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl mx-auto">
                            We believe in building transparent, collaborative partnerships. If you&apos;re ready to explore how Andriga can help transform your business, let&apos;s connect.
                        </p>
                        <Link href="/contact">
                            <button className="btn btn-primary px-8 py-3">
                                Get in Touch
                            </button>
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}
