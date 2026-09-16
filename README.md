# Andriga AI Marketing Platform

Modern marketing website built with Next.js 16, React 19, Tailwind CSS v4, and Builder.io for content management.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Builder.io
- **TypeScript:** Full type safety

## 📋 Prerequisites

- Node.js 18+ and npm
- Builder.io account (for CMS features)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and add your Builder.io API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and replace `your_builder_io_api_key_here` with your actual Builder.io API key from https://builder.io/account/organization

```env
NEXT_PUBLIC_BUILDER_API_KEY=your_actual_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── case-studies/      # Case studies page
│   ├── contact/           # Contact form
│   ├── demo/              # Interactive demo
│   ├── builder/           # Builder.io catch-all route
│   └── api/chat/          # Chat API endpoint
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections (Hero, Features, etc.)
│   └── ui/                # Reusable UI components
└── lib/
    └── builder.ts         # Builder.io configuration
```

## 🎨 Key Features

- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Smooth Animations:** Framer Motion for engaging interactions
- **Content Management:** Builder.io integration for dynamic content
- **Contact Forms:** Built-in contact form with validation
- **Interactive Demo:** AI chat demo with speech-to-text/text-to-speech
- **Case Studies:** Portfolio showcasing completed projects

## 🌐 Routes

- `/` - Homepage with hero, services, features
- `/about` - Company information
- `/case-studies` - Project portfolio
- `/contact` - Contact form
- `/demo` - Interactive AI demo
- `/builder/*` - Builder.io managed pages

## 📝 Builder.io Setup

See [BUILDER_SETUP.md](BUILDER_SETUP.md) for detailed Builder.io configuration instructions.

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Builder.io Documentation](https://www.builder.io/c/docs/developers)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

When contributing to this project:

1. Follow existing code patterns
2. Use TypeScript for type safety
3. Test changes locally before committing
4. Run `npm run lint` to check for issues

## 📄 License

This project is proprietary and confidential.
