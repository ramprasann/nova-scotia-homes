# Nova Scotia Homes — Real Estate Platform

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.11-EF4444.svg?logo=turborepo)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-12.4-orange.svg?logo=pnpm)](https://pnpm.io/)

A modern, high-performance real estate web and mobile application built for **Nova Scotia Homes** (Thomas Majcan Real Estate — Century 21 Optimum), serving Halifax, Dartmouth, Cole Harbour, and communities across Nova Scotia.

---

## 🌟 Highlights

- **Dual Platform Experience**: Dedicated responsive Desktop Website (`apps/web`) and native app-like Mobile experience (`apps/mobile`).
- **Tailored Maritime Editorial Design**: Deep Atlantic Navy (`#12212F`), Muted Gold (`#B3935A`), Slate (`#5B6670`), and Warm Linen Canvas (`#F7F4EE`).
- **Shared Design System & Components**: Reusable shadcn/ui-inspired primitives across both apps via `@nova/ui`.
- **High-Performance Monorepo**: Blazing-fast cached builds and orchestrations via Turborepo and pnpm workspaces.
- **Full Type Safety**: End-to-end typed domain models and property schemas via `@nova/types`.

---

## 🏛️ Monorepo Architecture

```
Nova/
├── apps/
│   ├── web/                     # Desktop Website Application (Port 5173)
│   │   ├── src/
│   │   │   ├── layouts/         # RootLayout, Header, TopAuxiliaryNav, Footer
│   │   │   ├── pages/           # HomePage, AboutPage, ContactPage
│   │   │   ├── routes/          # React Router configuration
│   │   │   └── index.css        # Tailwind CSS + Material Symbols + Custom Tokens
│   │   └── vite.config.ts
│   │
│   └── mobile/                  # Mobile-First App Experience (Port 5174)
│       ├── src/
│       │   ├── layouts/         # MobileRootLayout, MobileTopAppBar, MobileBottomNavBar, FloatingCallButton
│       │   ├── pages/           # MobileHomePage, MobileAboutPage, MobileSearchPage, MobileContactPage
│       │   ├── components/      # SwipeCarousel, PropertyCard, PropertyDetailsModal
│       │   ├── routes/          # Mobile Route Map
│       │   └── index.css        # Touch-Optimized Tailwind styles
│       └── vite.config.ts
│
├── packages/
│   ├── config/                  # Shared Tailwind CSS Preset & Theme Tokens
│   ├── types/                   # TypeScript interfaces, property schemas, realtor data
│   ├── ui/                      # Shared UI components (Button, Input, Textarea, Card, Badge, StarRating)
│   └── utils/                   # Shared utility functions (cn, formatters)
│
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

## ✨ Features

### Desktop Website (`apps/web`)
- **Architectural Editorial Grid**: 12-column layout with 5:7 asymmetric splits and full-bleed hero banners.
- **Advisor Profile Showcase**: High-resolution, edge-to-edge advisor portrait with credentials and direct call actions.
- **Featured Listing Presentation**: High-impact cards highlighting pricing, bed/bath specs, and local community details.
- **Dual Intent Inquiry Forms**: Seamlessly toggle between Selling and Buying with instant validation.
- **Verified Client Testimonials**: Verified homeowner reviews and ratings.

### Mobile Application (`apps/mobile`)
- **Native App Feel**: App-style top navigation bar, bottom tab bar (`Home`, `Search`, `About`, `Contact`), and floating dialer.
- **Touch & Mouse Swipe Carousels**: Drag-to-scroll and swipe interaction for property cards and client commitments.
- **Interactive Search & Filtering**: Real-time keyword search, community filter chips, and live listing count.
- **Property Details Modal**: Rich pop-up sheet with complete property specs, imagery, and booking forms.
- **Quick-Access Search Drawer**: Top-down animated search bar accessible from any mobile screen.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (recommended: `v20+`)
- **pnpm**: `v9.0.0` or higher (`npm install -g pnpm`)

### Installation
```bash
# Clone the repository
git clone https://github.com/ramprasann/nova-scotia-homes.git
cd nova-scotia-homes

# Install dependencies across all packages
pnpm install
```

### Development
```bash
# Run both Web & Mobile concurrently
pnpm dev

# Run Desktop Website only (http://localhost:5173)
pnpm dev:web

# Run Mobile App only (http://localhost:5174)
pnpm dev:mobile
```

### Building for Production
```bash
# Typecheck all packages
pnpm typecheck

# Build all applications and packages
pnpm build
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Turborepo** | Monorepo build system & task orchestrator |
| **pnpm Workspaces** | Fast, disk-efficient package management |
| **React 18** | UI component architecture |
| **TypeScript** | Strict end-to-end type safety |
| **Vite 6** | Ultra-fast HMR and bundling |
| **Tailwind CSS** | Utility-first styling with shared design tokens |
| **React Router v7** | Client-side routing |
| **Lucide / Material Symbols**| Crisp, modern iconography |

---

## 📞 Realtor & Contact Info

- **Realtor**: Thomas Majcan
- **Brokerage**: Century 21 Optimum
- **Serving Since**: 2003
- **Office**: 24 Logiealmond Close, Unit 24 – Dartmouth, NS B3B 0C8
- **Direct Phone**: [902-233-5111](tel:9022335111)
- **Email**: [sutomusic@bellaliant.net](mailto:sutomusic@bellaliant.net)
- **Website**: [www.novascotiahomes.ca](https://www.novascotiahomes.ca)

---

## 📄 License

Private & Proprietary — Nova Scotia Homes.
