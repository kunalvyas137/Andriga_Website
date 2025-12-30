# Builder.io Setup Guide

## 1. Create Builder.io Account
1. Go to [builder.io](https://www.builder.io)
2. Sign up for a free account
3. Create a new "Space" for your project

## 2. Get Your API Key
1. Go to **Settings** → **API** in Builder.io dashboard
2. Copy your **Public API Key**

## 3. Add API Key to Your Project
Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=your-api-key-here
```

## 4. Restart Dev Server
```bash
npm run dev
```

## 5. Create Your First Page in Builder
1. In Builder.io dashboard, click **+ New Entry**
2. Choose **Page** model
3. Set the URL (e.g., `/builder-test`)
4. Design your page with drag-drop
5. Click **Publish**
6. Visit `http://localhost:3000/builder/builder-test`

## File Structure Created
```
src/
├── lib/
│   └── builder.ts          # Builder.io initialization
├── components/
│   └── BuilderContent.tsx  # Reusable Builder component
└── app/
    └── builder/
        └── [[...slug]]/
            └── page.tsx    # Dynamic route for Builder pages
```
