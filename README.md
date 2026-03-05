# Asklepiy Clinic - Medical Architecture 2026

A production-grade, ultra-premium, mobile-first web ecosystem for Asklepiy Clinic - a leading Ukrainian medical clinic.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-pink)

## 🏥 Features

### Core Features
- **Multi-language Support** - Instant Ukrainian/English switching without page reload
- **Smart Booking System** - Multi-step animated appointment booking
- **AI Assistant** - Context-aware chatbot with medical guidance
- **Patient Dashboard** - Family profiles, medical history timeline, AI interpretations
- **Authentication** - Email, Phone, Google OAuth simulation with SMS verification

### Pages
- Home (Головна)
- Medical Directions (Напрямки)
- Doctors Directory with detail pages
- Prices (Ціни)
- News & Promotions (Новини та Акції)
- Lab Tests (Аналізи)
- Declaration Signing (Заключити декларацію)
- About Us (Про нас)
- Contacts with Interactive Map

### Technical Features
- **Performance Optimized** - Partial hydration, lazy loading, image optimization
- **SEO Ready** - JSON-LD schemas, OpenGraph, dynamic metadata
- **Responsive Design** - Mobile-first approach, works on all devices
- **Animation System** - Framer Motion powered micro-interactions
- **Glassmorphism UI** - Premium medical aesthetic

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Localization | next-intl |
| State | React Context + TanStack Query |
| Testing | Vitest + Playwright |
| Deployment | Vercel |

## 📁 Project Structure

```
asklepiy-clinic/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── doctors/       # Doctors directory
│   │   │   ├── dashboard/     # Patient dashboard
│   │   │   └── ...            # Other pages
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── layout/            # Layout components
│   ├── features/
│   │   ├── ai-assistant/      # AI chatbot widget
│   │   ├── booking/           # Booking system
│   │   ├── auth/              # Authentication
│   │   └── dashboard/         # Dashboard components
│   ├── contexts/              # React contexts
│   ├── i18n/
│   │   └── locales/           # Translation files
│   ├── lib/
│   │   └── utils/             # Utilities & helpers
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript types
├── tests/
│   ├── unit/                  # Vitest tests
│   └── e2e/                   # Playwright tests
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/asklepiy-clinic.git
cd asklepiy-clinic

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run unit tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

The project is pre-configured for Vercel deployment with optimal settings.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://asklepiy.com
NEXT_PUBLIC_API_URL=https://api.asklepiy.com
```

## 🎨 Design System

### Colors
- **Primary**: Deep Medical Blue (`#0A3D62`)
- **Accent**: Medical Cyan (`#00A8B5`)
- **Surface**: Pure White with glassmorphism layers

### Typography
- **Primary Font**: Inter
- **Secondary Font**: Montserrat
- **Weights**: 300 (light), 400 (regular), 500 (medium)

### Spacing
"Luxury Whitespace" - doubled standard spacing for premium feel

## 📱 Mobile-First UX

The application is designed mobile-first with:
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)
- Touch-friendly interactive elements
- Mobile-optimized navigation with glassmorphism overlay
- Optimized images for different screen sizes

## 🔒 Security

- HTTPS enforced via security headers
- XSS protection headers
- Content-Type-Options: nosniff
- Strict-Transport-Security enabled

## 📊 Performance Targets

- Lighthouse Performance: 100
- Accessibility: 100
- SEO: 100
- Best Practices: 100

## 📄 License

© 2026 Asklepiy Clinic. All rights reserved.

## 👥 Team

Built with ❤️ by the Asklepiy Digital Team
Force rebuild
