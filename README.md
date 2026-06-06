# FashionHub | Catch The Style

A high-fidelity, premium, and fully responsive e-commerce web application UI built using **React** and **Tailwind CSS v4**. 

The landing section precisely matches the warm-beige vignette layout, typography, and visual assets of the design. This storefront is extended into a complete shopping experience with real-time catalogs, filtering, cart management, and visual customizers.

---

## ✨ Features

- **Storefront Hero & Navigation**: Transparent absolute header overlaying a full-screen layout. Features cyan-blue wishlist/cart badges, rounded search query handling, and mobile toggle drawer menu.
- **5 Bespoke Dynamic Themes**: Toggleable visual identity schemes from the floating palette selector at the bottom left. Modifies CSS custom variables on the document root in real-time:
  - 🟤 **Warm Beige** (Default)
  - 🌑 **Luxury Dark** (Midnight slate & gold)
  - 🟢 **Emerald Velvet** (Deep green & brass)
  - 🌸 **Rose Quartz** (Cream & pastel rose)
  - 🔵 **Ocean Navy** (Deep blue & coral peach)
- **Product Catalog (`/shop`)**: Premium grid with dynamic filters (Category, Sizing, Colors, Max Price range slider, and Ratings stars) and sorting options.
- **Details Page (`/product/:id`)**: Dual-column layout displaying high-res visual category thumbnails, detailed specifications accordions, custom reviews, variants selection (size, colors), and quantity increment selectors.
- **Cart Drawer & Checkout**: Interactive right slide-over cart panel calculating prices, tax, and custom shipping rates. Features coupon validations (e.g. use code `STYLE10` for 10% off). Complete Checkout billing form with simulated transaction loading states and final digital receipts.
- **Floating Contact Widgets**: Pulse-animated floating WhatsApp button in the bottom-right corner opening direct contact links.
- **SEO & Performance Optimization**: Strict HTML5 structure, semantic elements, Inter and Playfair Display Google Fonts integrations, and optimized assets compiled in milliseconds.

---

## 🛠️ Built With

- **Vite** + **React** (Component-driven UI architecture)
- **Tailwind CSS v4** (Utility styling, transitions, variables, and dark theme support)
- **Lucide React** (Clean, modern vector icons)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lakshithamadumal/fashion-hub.git
   cd fashion-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Compile the production build:
   ```bash
   npm run build
   ```
