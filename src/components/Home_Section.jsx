import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quotes from "../json/qoute.json";
import services from "../json/services.json";

import { 
  FiPieChart, 
  FiBriefcase, 
  FiSettings, 
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiPlus,
  FiMinus,
  FiShield,
  FiTrendingUp,
  FiGlobe
} from "react-icons/fi";

const iconComponents = {
  FiPieChart,
  FiBriefcase,
  FiSettings,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity
};

const Home_Section = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentQuotes, setCurrentQuotes] = useState(quotes.filter(q => !q.specialDate));
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const specialQuote = quotes.find(q => q.specialDate === todayString);
    
    if (specialQuote) {
      setCurrentQuotes([specialQuote]);
    } else {
      setCurrentQuotes(quotes.filter(q => !q.specialDate));
    }
  }, []);

  useEffect(() => {
    if (currentQuotes.length <= 1) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % currentQuotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [currentQuotes]);

  const activeQuote = currentQuotes[quoteIndex] || { quote: "The most valuable commodity I know of is information.", author: "Gordon Gekko" };

  const getIconComponent = (iconName, className = "text-brand-blue") => {
    const Icon = iconComponents[iconName];
    if (!Icon) return null;
    return <Icon className={className} size={24} />;
  };

  const handlePrevQuote = () => {
    setQuoteIndex((prev) => (prev === 0 ? currentQuotes.length - 1 : prev - 1));
  };

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev === currentQuotes.length - 1 ? 0 : prev + 1));
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const serviceFeatures = {
    "accounting-consulting": ["Certified Bookkeeping", "Financial Planning", "Operations Restructuring"],
    "tax-advisory": ["Compliance Auditing", "Tax Planning Strategy", "Regulatory Filings Support"],
    "startup-diagnostic": ["Runway Buffer Estimate", "Burn Multiple Audit", "Valuation Coaching"],
    "bpo-kpo-services": ["Offshore Customer Care", "Backoffice Accounting", "Cost Reduction Model"]
  };

  return (
    <>
      {/* Premium Interactive Quote Carousel Block */}
      <section className="bg-slate-50 py-24 px-6 text-center border-b border-slate-200/60 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative bg-white border border-slate-200/85 rounded-2xl p-8 sm:p-14 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-3xl mx-auto group">
            
            <span className="absolute top-4 left-6 text-slate-100/70 text-7xl font-serif select-none pointer-events-none">“</span>
            
            <div className="relative z-10 px-4 sm:px-8 min-h-[110px] flex flex-col justify-center">
              <blockquote className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed font-heading italic">
                "{activeQuote.quote}"
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="w-5 h-[1px] bg-slate-350"></span>
                <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase font-sans">
                  {activeQuote.author}
                </span>
                <span className="w-5 h-[1px] bg-slate-350"></span>
              </div>
            </div>

            {currentQuotes.length > 1 && (
              <>
                <button 
                  onClick={handlePrevQuote}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-95"
                  aria-label="Previous quote"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNextQuote}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-95"
                  aria-label="Next quote"
                >
                  <FiChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Redesigned Premium Services Showcase */}
      <section className="bg-white py-28 px-6 animate-fade-in relative z-10 font-sans" aria-labelledby="service-label">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-20 space-y-4">
            <span className="px-3.5 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs" id="service-label">
              Our Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight max-w-2xl mx-auto">
              Strategic Solutions Built for Growth
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Explore custom financial auditing, operations coaching, and corporate compliance strategies designed to elevate value.
            </p>
          </div>

          {/* Cards Grid: Clean visual boxes with accent check features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <div 
                key={service.id} 
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 transition-all duration-300 hover:border-brand-blue/30 hover:shadow-lg flex flex-col justify-between space-y-8 hover-lift"
              >
                <div className="space-y-4">
                  {/* Icon Frame */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-all duration-300 shadow-sm">
                    {getIconComponent(service.icon)}
                  </div>
                  
                  {/* Title & Body */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Checklist Features */}
                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  {(serviceFeatures[service.id] || ["Global Compliance", "Direct Consultations", "Data Transparency"]).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-[10px] text-slate-600 font-medium">
                      <FiCheck className="text-brand-green flex-shrink-0" size={12} />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Read Strategy Call */}
                <div className="pt-2">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-brand-blue group-hover:text-brand-green font-bold text-[10px] tracking-widest uppercase transition-colors duration-250 focus:outline-none"
                  >
                    View Strategy
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-brand-blue/30 text-slate-700 hover:text-brand-blue text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl hover:shadow-xs"
            >
              Explore All Services
            </Link>
          </div>

        </div>
      </section>

      {/* Added Content 1: Strategic Value Strategy Segment */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-200/60 relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none opacity-40" />
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Why Partner With Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Our Core Advisory Standards
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              We align startup operations to absolute regulatory benchmarks while minimizing financial liabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShield className="text-brand-blue" size={24} />,
                title: "Direct Founder Consultation",
                desc: "Work closely with our senior Co-founders Suresh Sharma & Damodar Paudel to receive customized strategic insights."
              },
              {
                icon: <FiTrendingUp className="text-brand-green" size={24} />,
                title: "Data-Driven Diagnostics",
                desc: "We analyze financial indicators, runway buffers, and operational compliance with robust analytical frameworks."
              },
              {
                icon: <FiGlobe className="text-brand-blue" size={24} />,
                title: "International Reach",
                desc: "Offering business process outsourcing (BPO) and KPO solutions to scale operations globally with high cost efficiencies."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-3xs mb-5">
                  {item.icon}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 font-heading mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Added Content 2: Operational Onboarding Process Timeline */}
      <section className="bg-white py-28 px-6 font-sans relative z-10 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-20 space-y-4">
            <span className="px-3.5 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Our Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Operational Delivery Pipeline
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Our step-by-step methodology ensures seamless alignment with your corporate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: "01", name: "Initial Diagnostic", desc: "Evaluate runway, tax status, and backoffice gaps through our questionnaire tools." },
              { step: "02", name: "Strategic Mapping", desc: "Draft a personalized regulatory and operational compliance roadmap with co-founders." },
              { step: "03", name: "Upskilling & Setup", desc: "Deploy customized ERP/Odoo configurations and corporate coaching routines." },
              { step: "04", name: "Continuous Monitoring", desc: "Perform periodic financial health check-ups and annual compliance filings." }
            ].map((proc, idx) => (
              <div key={idx} className="relative space-y-4 text-left p-4 border border-slate-200/60 rounded-2xl bg-white shadow-3xs">
                <span className="text-3xl font-extrabold text-slate-200 tracking-wider block font-heading">{proc.step}</span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{proc.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{proc.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Added Content 3: FAQ Accordion for Client Conversions & SEO */}
      <section className="bg-slate-50 py-24 px-6 border-b border-slate-200/60 font-sans relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Get answers to standard inquiries about our advisory services and integrations.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What areas of business does Professional Edge Global consult on?",
                a: "We offer full-spectrum business services, including accounting and booking operations, expert tax advisory, corporate legal compliance, business process offshoring, Odoo/ERP installations, and digital marketing."
              },
              {
                q: "How does the Startup Financial Health check-up work?",
                a: "Our diagnostic evaluates your monthly revenues, operating burn rates, and cash reserves to calculate your runway buffer. Co-founders then guide you through budget restructuring or investment coaching."
              },
              {
                q: "Can you support remote/offshore processes?",
                a: "Yes, our BPO/KPO offshoring solutions provide secure data processing, backend accounting assistance, and customer support with up to 40-60% operational savings."
              },
              {
                q: "Do you integrate Odoo or custom ERP modules?",
                a: "Our engineering team provides comprehensive ERP systems setup—guiding selection, custom modules, database migration, and staff training to streamline workflows."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={activeFaq === idx}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">{faq.q}</span>
                  <span className="text-slate-400 ml-4">
                    {activeFaq === idx ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    activeFaq === idx ? 'max-h-48 border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 py-5 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal bg-slate-50/30">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Home_Section;