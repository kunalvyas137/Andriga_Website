<!-- .github/copilot-instructions.md -->
# Copilot / AI contributor notes

Purpose: fast orientation for this Next.js 16 + React 19 + Tailwind v4 + Builder.io marketing site so agents can make safe, on-pattern edits.

Key commands (npm scripts only):
- Dev: npm run dev (http://localhost:3000)
- Build: npm run build; Prod: npm start
- Lint: npm run lint

Architecture & routing
- App Router lives in src/app; shared chrome in [src/app/layout.tsx](src/app/layout.tsx) wires global Header/Footer and Inter font; server components by default, many pages are client because of framer-motion/hooks.
- Home is section-composed in [src/app/page.tsx](src/app/page.tsx); other marketing routes under src/app/<route>/page.tsx (about, case-studies, demo, contact). Header nav anchors /#services.
- Builder catch-all page at [src/app/builder/[[...slug]]/page.tsx](src/app/builder/[[...slug]]/page.tsx) revalidates every 60s and skips “/”; uses generateStaticParams from Builder for pre-render.

Builder integration
- Builder SDK init in [src/lib/builder.ts](src/lib/builder.ts) with NEXT_PUBLIC_BUILDER_API_KEY (required even server-side here). Rendering goes through [src/components/BuilderContent.tsx](src/components/BuilderContent.tsx) using @builder.io/sdk-react Content.
- To add Builder-driven pages, keep fetch in the page file, respect userAttributes.urlPath, and return notFound() when absent.

UI primitives & styling
- Tailwind v4 via @import in [src/app/globals.css](src/app/globals.css); design tokens defined as CSS custom properties (bg, accent, radius, shadows). Use container utility for layout.
- Reuse UI primitives: Button, Card, Section/SectionHeader, GradientText in [src/components/ui](src/components/ui); sections assembled in [src/components/sections](src/components/sections). Prefer these over ad-hoc styling.
- Animations and icons rely on framer-motion and lucide-react (client components are marked "use client").

Content structure
- Hero/Services/DemoTeaser/Features/CTA compose the homepage; case-studies and about pages use Section + motion grids; contact page includes controlled form + success state; demo page is an interactive chat UI with speech-to-text/text-to-speech and context editor.

API surface
- Only API route today is [src/app/api/chat/route.ts](src/app/api/chat/route.ts): POST JSON { message, context }. Returns canned markdown-like strings for a hospital demo; validates message and 400s otherwise; 500 on exceptions. No streaming.

Patterns & conventions
- Create routes under src/app/<route>/page.tsx; add layout.tsx only if nested layout needed. Keep page-level data fetching colocated.
- Keep client-only code behind "use client" and avoid pulling server-only modules there. Prefer existing motion/utility patterns for animations and grids.
- Do not hardcode secrets; Builder key already read from NEXT_PUBLIC_BUILDER_API_KEY. No other envs in use.

Workflows / gotchas
- No automated tests; rely on manual verification. Run lint before commit.
- Pricing/careers/docs/support/privacy/terms routes are currently just footer links; creating them requires new pages under src/app.
- Header/Footer logos expect /public assets (andriga-logo-v2.png, hero-banner.png). Maintain those paths when changing imagery.

Ask for clarifications if editing outside these patterns or introducing new API/data flows.
