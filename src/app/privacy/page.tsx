import Section from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-20" />
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            Privacy & Trust
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Our Commitment to <GradientText>Privacy</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                            We protect data with the same rigor we apply to building enterprise-grade solutions. This page outlines how we handle information for clients and visitors across the US, UK, India, and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Policy Overview */}
            <Section>
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">What This Policy Covers</h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            This Privacy Policy explains how we collect, use, store, and share information when you visit our website, engage with our services, or communicate with us. It is designed to align with common standards across major technology consulting markets (including GDPR in the UK/EU, U.S. privacy best practices, and Indian data protection principles).
                        </p>
                        <p className="text-sm text-[var(--text-tertiary)] mt-3">Effective date: January 15, 2026</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">Information We Collect</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>Contact details (name, email, phone, company) when you reach out or book a demo.</li>
                                <li>Professional details you share for careers or partnership inquiries.</li>
                                <li>Usage data (device, browser, pages viewed) to improve performance and security.</li>
                                <li>Content you provide in forms or uploaded documents for solution scoping.</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">How We Use Information</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>To respond to inquiries, demos, and support requests.</li>
                                <li>To deliver and improve our AI and digital transformation services.</li>
                                <li>To personalize content and measure site performance.</li>
                                <li>To meet legal, compliance, and security obligations.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">Legal Bases & Regional Notes</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>Consent for marketing communications where required.</li>
                                <li>Contractual necessity to deliver services you request.</li>
                                <li>Legitimate interests for security, fraud prevention, and product improvement.</li>
                                <li>Data subject rights honored per applicable laws (e.g., GDPR, UK GDPR, and local Indian regulations).</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">Sharing & Transfers</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>We do not sell personal data.</li>
                                <li>We share data with vetted providers under confidentiality and data processing terms.</li>
                                <li>Cross-border transfers use appropriate safeguards (e.g., Standard Contractual Clauses where applicable).</li>
                                <li>Access is limited to teams with a need-to-know for delivery and support.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">Security & Retention</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>Enterprise-grade controls, encryption in transit, and strict access management.</li>
                                <li>Regular reviews of vendors, infrastructure, and data handling practices.</li>
                                <li>Data retained only as long as necessary for the purposes collected or as required by law.</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3">
                            <h3 className="text-xl font-semibold">Your Choices</h3>
                            <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
                                <li>Request access, correction, or deletion of your data, subject to applicable law.</li>
                                <li>Opt out of marketing communications at any time.</li>
                                <li>Control cookies through your browser or device settings.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10 space-y-4">
                        <h3 className="text-xl font-semibold">Children&apos;s Data</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Our services are not directed to children. We do not knowingly collect personal data from individuals under the age permitted by local law. If you believe a child has provided us information, please contact us and we will take appropriate action.
                        </p>
                        <h3 className="text-xl font-semibold">Changes to This Policy</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Material updates will be noted on this page with a revised effective date.
                        </p>
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            If you have questions or wish to exercise your privacy rights, reach us at <Link href="/contact" className="text-[var(--accent-primary)] hover:underline">our Contact page</Link> or email privacy@andriga.com.
                        </p>
                    </div>
                </div>
            </Section>
        </>
    );
}
