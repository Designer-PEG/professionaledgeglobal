// src/pages/cc-page.jsx
import LegalLayout from '../components/LegalLayout';
import useSEO from '../hooks/useSEO';

const CookiePolicy = () => {
  useSEO(
    "Cookie Policy",
    "Read the Cookie Policy of Professional Edge Global to learn about how we use cookies, analytical metrics, and tracker mechanisms."
  );
  return (
    <LegalLayout title="Cookie Policy">
      <p className="mb-6">
        This Cookie Policy explains how we use cookies and similar technologies on our website.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">1. What Are Cookies</h2>
      <p className="mb-6">
        Cookies are small text files stored on your device when you visit a website. They help the 
        website remember information about your visit, which can make it easier to visit again.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">2. How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies for several purposes:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1.5">
        <li><strong className="text-slate-800">Essential Cookies:</strong> Necessary for the website to function properly</li>
        <li><strong className="text-slate-800">Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
        <li><strong className="text-slate-800">Functionality Cookies:</strong> Remember your preferences and settings</li>
        <li><strong className="text-slate-800">Targeting Cookies:</strong> Used to deliver relevant ads to you</li>
      </ul>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">3. Third-Party Cookies</h2>
      <p className="mb-6">
        We may also use various third-party cookies for analytics, advertising, and other services.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">4. Managing Cookies</h2>
      <p className="mb-6">
        You can control and/or delete cookies as you wish. You can delete all cookies that are already 
        on your computer and set most browsers to prevent them from being placed.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. We will notify you of any changes by 
        posting the new policy on this page.
      </p>
    </LegalLayout>
  );
};

export default CookiePolicy;
