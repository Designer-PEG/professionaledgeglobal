# Professional Edge Global 🌐💼

[![Production Deploy](https://img.shields.io/badge/Deploy-Published-success?style=for-the-badge&logo=github&logoColor=white)](https://professionaledgeglobal.com.np/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Vite%207%20%7C%20Tailwind%204-blue?style=for-the-badge&logo=react)](package.json)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](package.json)

**Professional Edge Global** delivers high-impact financial consulting, dynamic corporate training, and digital marketing strategies designed to elevate operations and build sustainable business value. 

This repository hosts the official modern web application built for [professionaledgeglobal.com.np](https://professionaledgeglobal.com.np/), featuring premium design aesthetics, fluid layouts, and state-of-the-art interactive micro-animations.

---

## ✨ Features & Design Highlights

Our frontend is engineered with visual excellence, responsive layouts, and modern accessibility standards in mind.

### 🎨 Visual & UI Design
* **Glassmorphic Navigation Bar**: A rich, dark glass header (`bg-slate-900/95 backdrop-blur-md`) that dynamically shrinks its vertical padding on scroll. Featuring animated active tab indicator underlines.
* **Responsive Slide-Over Drawer**: Replaced standard mobile dropdown menus with a beautiful, slide-over right drawer complete with backdrop blurs and fluid entry triggers.
* **Modern Split-Hero Layout**: A 12-column split-hero container supporting fluid typography sizes calculated via CSS `clamp()`, benefit CTAs, trust badges, and a custom image slideshow wrapped in cinematic linear gradient overlay tints.
* **Premium Cards & Interaction**: Image-card lists equipped with automatic scale zooms, border alignment, elevation shadows, circular white SVG icon badges, and glassmorphic overlays.
* **Global Selection Highlight**: Tailored cursor select parameters to paint selection highlights purple (`#9333ea`) for clean brand consistency.
* **100% Emoji-Free Standard**: Completely eliminated basic text-based emojis and swapped them for crisp, consistent vector SVG React Icons (`react-icons/fi`).

### 📅 Advanced Dynamic Engine
* **Special Holiday Calendaring**: The homepage features built-in calendar logic that automatically updates the site backgrounds, overlay durations, and layout themes when detecting special holiday periods (e.g., *Rakhi* or *Gaijatra*) relative to the visitor's local system time.

---

## 🛠️ Technology Stack

This application is built with modern, ultra-fast dev tooling:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture, state management, and lifecycle |
| **Bundler & Server** | [Vite 7](https://vitejs.dev/) | Lightning-fast hot module reloading (HMR) and optimized building |
| **Styling Engine** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation CSS-first layout, utility classes, and system filters |
| **Routing** | [React Router v7](https://reactrouter.com/) | Secure, component-based navigation and route transitions |
| **Icons** | [React Icons / Lucide](https://react-icons.github.io/react-icons/) | Crisp, scale-invariant SVG vectors |
| **Deployment** | [gh-pages](https://github.com/tschaub/gh-pages) | Programmatic compilation and deployment tool |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally, build it, or publish live changes.

### 📥 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### ⚙️ 2. Local Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Designer-PEG/professionaledgeglobal.git
cd professionaledgeglobal
npm install
```

### 💻 3. Run Development Server
Fire up the local hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 🏗️ 4. Build for Production
Compile the files into optimized, minified, and tree-shaken static assets inside the `dist/` directory:
```bash
npm run build
```

### 🚀 5. Live Production Deployment
Deploy the updated files directly to the production GitHub Pages environment:
```bash
npm run deploy
```
> [!NOTE]
> The `deploy` script automatically compiles your files via `predeploy` (running `npm run build`), bundles your custom domain `CNAME` file from `public/CNAME`, and pushes the result directly to the hosting server.

---

## 📂 Codebase Architecture

```text
professionaledgeglobal/
├── public/                 # Static assets copied directly to dist/
│   ├── CNAME               # Custom domain config (professionaledgeglobal.com.np)
│   └── PEG-Logo.png        # Brand assets
├── src/
│   ├── assets/             # Core local images and illustration assets
│   ├── components/         # Reusable structural components (Header, Footer, ServiceCards)
│   ├── json/               # Local JSON models (quotes, statistics)
│   ├── pages/              # Main page layouts (Hero, About, Services, Marketing, Contact)
│   ├── App.jsx             # Main router registry & initialization
│   ├── index.css           # Global custom typography and Tailwind config imports
│   └── main.jsx            # React root mount point
├── package.json            # Script registries & dependency locks
└── vite.config.js          # Vite plugins and server configurations
```

---

## 🔒 License & Copyright

Copyright © 2026 **Professional Edge Global**. All rights reserved.  
*Private and proprietary repository.*
