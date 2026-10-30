// src/components/LegalLayout.jsx
import { Link, useLocation } from 'react-router-dom';

const LegalLayout = ({ title, children }) => {
  const { pathname } = useLocation();

  const legalDocs = [
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/cookie-policy', label: 'Cookie Policy' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Legal &amp; Governance
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-heading">
              {title}
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav aria-label="Legal Documents" className="border-t border-slate-200 divide-y divide-slate-200">
              {legalDocs.map((doc) => {
                const isActive = pathname === doc.to;
                return (
                  <Link
                    key={doc.to}
                    to={doc.to}
                    className={`block py-3 text-sm transition-colors ${
                      isActive
                        ? 'text-brand-blue font-semibold border-l-2 border-brand-blue pl-3'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {doc.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Document Body */}
          <div className="lg:col-span-9 max-w-3xl text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            {children}
          </div>

        </div>
      </section>
    </div>
  );
};

export default LegalLayout;
