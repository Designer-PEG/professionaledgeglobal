import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Lazy load route pages to improve initial load performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Marketing = lazy(() => import("./pages/Marketing"));
const Contact = lazy(() => import("./pages/Contact"));
const CareersPage = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/pp-page"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const CookiePolicy = lazy(() => import("./pages/cc-page"));

// A clean, glassmorphic fallback component for router loading
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-brand-blue font-sans relative z-50">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />
    <div className="relative flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-blue rounded-full animate-spin" />
      <p className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">
        Loading Experience...
      </p>
    </div>
  </div>
);

// Flag to ensure console.log only happens once
let hasLogged = false;

function App() {
  // Hidden console message (only visible when dev tools are open)
  if (typeof window !== 'undefined' && !hasLogged) {
    console.log(
      `%cHello, Hi there..\n` +
      `%cIf you're seeing this, you're probably inspecting the code. It is our curiosity so\n` +
      `Check out how this site was built on GitHub:\n` +
      `https://github.com/pujanjoci\n\n` +
      `%cYou can always check the code and make changes according to your will. But after you star the repo.`,
      'color: #4CAF50; font-size: 14px; font-weight: bold;',
      'color: #2196F3; font-size: 13px;',
      'color: #F44336; font-size: 12px; font-style: italic;'
    );
    hasLogged = true;
  }

  return (
    <BrowserRouter basename="/">
      <div className="App">
        {/* Hidden HTML element (invisible but appears in Elements tab) */}
        <div 
          style={{ display: 'none' }}
          aria-hidden="true"
          data-dev-message="This website was built by Pujan Joci. GitHub: github.com/pujanjoci - Please don't copy without permission."
        />
        
        <ScrollToTop />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/:id?" element={<Services />} />
            <Route path="/career" element={<CareersPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;