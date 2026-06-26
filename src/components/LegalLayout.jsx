// src/components/LegalLayout.jsx
import { Link } from 'react-router-dom';

const LegalLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-36 pb-20 font-sans relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none opacity-5" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="mb-10 space-y-4">
          <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
            Legal Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-450 pt-1">
            <Link to="/privacy-policy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link>
            <span className="text-slate-350 select-none">|</span>
            <Link to="/terms-and-conditions" className="hover:text-brand-blue transition-colors">Terms & Conditions</Link>
            <span className="text-slate-350 select-none">|</span>
            <Link to="/cookie-policy" className="hover:text-brand-blue transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
        {/* Main Content Container */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/80 shadow-md prose max-w-none text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
          {children}
        </div>
        
        <div className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}

export default LegalLayout;
