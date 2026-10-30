import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Lazy load route pages with retry logic to recover from chunk load errors due to redeployments
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error("Chunk loading failed:", error);
      const isChunkError = 
        error.message && 
        (error.message.includes("Failed to fetch dynamically imported module") || 
         error.message.includes("error loading dynamically imported module"));
         
      if (isChunkError) {
        // Force refresh the page from the server to get the latest build chunks
        window.location.reload();
        // Return a pending promise to prevent rendering broken components before reload
        return new Promise(() => {});
      }
      throw error;
    }
  });

const Home = lazyWithRetry(() => import("./pages/Home"));
const About = lazyWithRetry(() => import("./pages/About"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const Marketing = lazyWithRetry(() => import("./pages/Marketing"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const CareersPage = lazyWithRetry(() => import("./pages/Careers"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/pp-page"));
const Terms = lazyWithRetry(() => import("./pages/Terms.jsx"));
const CookiePolicy = lazyWithRetry(() => import("./pages/cc-page"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

// Minimal fallback component for router loading
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 font-sans">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-7 h-7 border-2 border-slate-200 border-t-brand-blue rounded-full animate-spin" />
      <p className="text-xs font-medium text-slate-500">
        Loading...
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
      <div className="App min-h-screen flex flex-col bg-white text-slate-800">
        {/* Hidden HTML element (invisible but appears in Elements tab) */}
        <div 
          style={{ display: 'none' }}
          aria-hidden="true"
          data-dev-message="This website was built by Pujan Joci. GitHub: github.com/pujanjoci - Please don't copy without permission."
        />
        
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
