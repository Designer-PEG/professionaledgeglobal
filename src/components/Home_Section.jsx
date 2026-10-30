import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quotes from "../json/qoute.json";
import services from "../json/services.json";

import { 
  PieChart, 
  Briefcase, 
  Settings, 
  DollarSign,
  Users,
  FileText,
  Headphones,
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  TrendingUp,
  Globe
} from "lucide-react";

const iconComponents = {
  FiPieChart: PieChart,
  FiBriefcase: Briefcase,
  FiSettings: Settings,
  FiDollarSign: DollarSign,
  FiUsers: Users,
  FiFileText: FileText,
  FiHeadphones: Headphones,
  FiActivity: Activity
};

const Home_Section = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentQuotes, setCurrentQuotes] = useState(quotes.filter(q => !q.specialDate));
  const [activeFaq, setActiveFaq] = useState(0);

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
    return <Icon className={className} size={20} strokeWidth={1.75} />;
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
      {/* Editorial Perspective / Quote Strip */}
      <section className="bg-white border-b border-slate-200 py-10 px-6 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="border-l-2 border-brand-blue pl-5 max-w-3xl">
            <blockquote className="text-base sm:text-lg font-medium text-slate-800 font-heading italic leading-relaxed">
              &ldquo;{activeQuote.quote}&rdquo;
            </blockquote>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              — {activeQuote.author}
            </p>
          </div>

          {currentQuotes.length > 1 && (
            <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
              <button 
                onClick={handlePrevQuote}
                className="w-8 h-8 rounded border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNextQuote}
                className="w-8 h-8 rounded border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Core Advisory Services — Architectural Grid */}
      <section className="bg-white py-20 lg:py-28 px-6 font-sans" aria-labelledby="service-label">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block" id="service-label">
                Core Practice Areas
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
                Strategic Solutions Built for Growth
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Explore custom financial auditing, operations coaching, and corporate compliance strategies designed to protect and elevate enterprise value.
              </p>
            </div>

            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-primary-hover group flex-shrink-0"
            >
              <span>View all {services.length} practice areas</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Flush Architectural Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
            {services.slice(0, 4).map((service, idx) => (
              <div 
                key={service.id} 
                className="p-7 flex flex-col justify-between hover:bg-slate-50/70 transition-colors duration-150"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{idx + 1}
                    </span>
                    {getIconComponent(service.icon)}
                  </div>
                  
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-slate-900 font-heading tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="pt-4 border-t border-slate-100 space-y-2">
                    {(serviceFeatures[service.id] || ["Global Compliance", "Direct Consultations", "Data Transparency"]).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check className="text-brand-green flex-shrink-0" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-brand-blue hover:text-primary-hover font-semibold text-xs uppercase tracking-wider group"
                  >
                    <span>Examine Practice</span>
                    <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Marketing & Creative Practice Callout Strip */}
          <div className="mt-10 border border-slate-200 bg-slate-50 p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green block">
                Digital &amp; Creative Division
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                Digital Marketing, Web Engineering &amp; Brand Production
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Beyond financial and corporate advisory, our creative division delivers responsive web design, SEO, social media management, packaging design, and commercial video production.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                to="/marketing"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors group"
              >
                <span>Explore Digital &amp; Creative Suite</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Advisory Standards — Asymmetric Editorial Split (No Cards) */}
      <section className="bg-slate-50 py-20 lg:py-28 px-6 border-y border-slate-200 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Narrative Header */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
                Why Partner With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
                Our Core Advisory Standards
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                We align enterprise and startup operations to strict regulatory benchmarks while minimizing financial liabilities and administrative overhead.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-primary-hover group"
                >
                  <span>Meet our managing partners</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Ruled Editorial Rows */}
            <div className="lg:col-span-7 border-t border-slate-200 divide-y divide-slate-200">
              {[
                {
                  icon: ShieldCheck,
                  title: "Direct Founder Consultation",
                  desc: "Work directly with our senior Co-founders Suresh Sharma and Damodar Paudel to receive tailored strategic guidance, audit oversight, and board-level advisory."
                },
                {
                  icon: TrendingUp,
                  title: "Data-Driven Financial Diagnostics",
                  desc: "We evaluate key financial indicators, runway buffers, burn multiples, and tax exposure using rigorous analytical frameworks before prescribing operational changes."
                },
                {
                  icon: Globe,
                  title: "Scalable Cross-Border Delivery",
                  desc: "Our Business Process Outsourcing (BPO) and Knowledge Process Outsourcing (KPO) models enable companies to scale back-office accounting and support operations with 40–60% cost efficiency."
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="py-7 first:pt-6 last:pb-0 flex gap-5 items-start">
                    <div className="mt-1 text-brand-blue flex-shrink-0">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-slate-900 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Operational Delivery Pipeline — Top-Ruled Architectural Columns */}
      <section className="bg-white py-20 lg:py-28 px-6 border-b border-slate-200 font-sans">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
              Engagement Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Operational Delivery Pipeline
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              A structured four-phase engagement model designed for measurable execution and regulatory clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {[
              { step: "01", name: "Initial Diagnostic", desc: "Evaluate runway, tax posture, and back-office gaps through structured financial and operational assessments." },
              { step: "02", name: "Strategic Mapping", desc: "Draft a tailored regulatory, tax, and operational compliance roadmap directly with our managing partners." },
              { step: "03", name: "Systems & Upskilling", desc: "Deploy ERP/Odoo workflows, financial controls, and targeted staff capacity development programs." },
              { step: "04", name: "Ongoing Governance", desc: "Conduct periodic financial health reviews, statutory audits, and annual regulatory filings." }
            ].map((proc, idx) => (
              <div key={idx} className="border-t-2 border-slate-900 pt-5 space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-blue block">
                  Phase {proc.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug">
                  {proc.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions — Split Layout with Flush Dividers */}
      <section className="bg-slate-50 py-20 lg:py-28 px-6 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
                Client Support
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-heading">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Common inquiries regarding our advisory engagements, diagnostic tools, and cross-border outsourcing models.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-primary-hover group"
                >
                  <span>Ask a specific question</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border-t border-slate-200 divide-y divide-slate-200">
              {[
                {
                  q: "What areas of business does Professional Edge Global consult on?",
                  a: "We offer full-spectrum business services, including accounting and bookkeeping operations, expert tax advisory, corporate legal compliance, business process offshoring, Odoo/ERP installations, and digital marketing."
                },
                {
                  q: "How does the Startup Financial Health check-up work?",
                  a: "Our diagnostic evaluates your monthly revenues, operating burn rates, and cash reserves to calculate your runway buffer. Co-founders then guide you through budget restructuring or investment coaching."
                },
                {
                  q: "Can you support remote or offshore processes?",
                  a: "Yes, our BPO/KPO offshoring solutions provide secure data processing, backend accounting assistance, and customer support with up to 40–60% operational savings."
                },
                {
                  q: "Do you integrate Odoo or custom ERP modules?",
                  a: "Our engineering team provides comprehensive ERP systems setup—guiding selection, custom modules, database migration, and staff training to streamline workflows."
                }
              ].map((faq, idx) => (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-start justify-between text-left gap-4 focus:outline-none group"
                    aria-expanded={activeFaq === idx}
                  >
                    <span className="text-base font-semibold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {faq.q}
                    </span>
                    <span className="text-slate-400 group-hover:text-slate-700 mt-1 flex-shrink-0">
                      {activeFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home_Section;
