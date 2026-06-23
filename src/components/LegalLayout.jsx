// src/components/LegalLayout.jsx
import { Link } from 'react-router-dom';

const LegalLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] mt-18">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
          <div className="flex space-x-4 text-sm text-slate-600">
            <Link to="/privacy-policy" className="hover:text-[#0b4a93] font-semibold transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">|</span>
            <Link to="/terms-and-conditions" className="hover:text-[#0b4a93] font-semibold transition-colors">Terms & Conditions</Link>
            <span className="text-slate-300">|</span>
            <Link to="/cookie-policy" className="hover:text-[#0b4a93] font-semibold transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm prose max-w-none text-slate-700">
          {children}
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default LegalLayout;
