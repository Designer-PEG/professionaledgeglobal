// src/pages/pp-page.jsx
import LegalLayout from '../components/LegalLayout';
import useSEO from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO(
    "Privacy Policy",
    "Read the Privacy Policy of Professional Edge Global regarding data collection, storage, and user privacy compliance."
  );
  return (
    <LegalLayout title="Privacy Policy">
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-6 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We collect information that you provide directly to us, such as when you create an account, 
        fill out a form, or communicate with us. This may include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1.5">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Demographic information (age, gender, location, etc.)</li>
        <li>Payment and transaction information</li>
        <li>Content you submit to our services</li>
      </ul>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect to:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1.5">
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and send related information</li>
        <li>Respond to your comments, questions, and requests</li>
        <li>Send technical notices, updates, security alerts</li>
        <li>Monitor and analyze trends, usage, and activities</li>
      </ul>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">3. Information Sharing</h2>
      <p className="mb-4">
        We do not share your personal information with third parties except:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1.5">
        <li>With your consent</li>
        <li>For external processing with our service providers</li>
        <li>For legal reasons or to prevent harm</li>
      </ul>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">4. Data Security</h2>
      <p className="mb-6">
        We implement appropriate security measures to protect against unauthorized access, 
        alteration, disclosure, or destruction of your personal information.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">5. Your Rights</h2>
      <p className="mb-6">
        You may have the right to access, update, or delete your personal information. 
        Contact us at professionaledgeglobal@gmail.com to exercise these rights.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 font-heading mt-8 mb-3">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes 
        by posting the new policy on this page.
      </p>
    </LegalLayout>
  );
}
