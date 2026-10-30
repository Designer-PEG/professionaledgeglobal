import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesData from '../json/services.json';
import { 
  PieChart, Briefcase, Settings, DollarSign, 
  Users, FileText, Headphones, Activity, ArrowRight, ArrowLeft,
  TrendingUp, Calculator, AlertTriangle, CheckCircle2, Check
} from 'lucide-react';

// Import all div images
import div1 from '../assets/div-1.png';
import div2 from '../assets/div-2.png';
import div3 from '../assets/div-3.png';
import div4 from '../assets/div-4.png';
import div5 from '../assets/div-5.png';
import div6 from '../assets/div-6.png';
import div7 from '../assets/div-7.png';
import div8 from '../assets/div-8.png';

import useSEO from '../hooks/useSEO';

const imageMap = {
  'div_1': div1,
  'div_2': div2,
  'div_3': div3,
  'div_4': div4,
  'div_5': div5,
  'div_6': div6,
  'div_7': div7,
  'div_8': div8
};

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

const getIconComponent = (iconName, className = "text-brand-blue") => {
  const Icon = iconComponents[iconName];
  if (!Icon) return null;
  return <Icon className={className} size={20} strokeWidth={1.75} />;
};

export default function Services() {
  const { id } = useParams();
  
  const activeService = servicesData.find(s => s.id === id);
  const pageTitle = activeService 
    ? `${activeService.title} | Services`
    : "Strategic Advisory & Consulting Services";
  const pageDesc = activeService
    ? activeService.description || "Learn about this key service from Professional Edge Global."
    : "Explore our range of professional advisory offerings, including Operations Audit, Corporate Restructuring, Financial Planning, and Business Transformation.";

  useSEO(pageTitle, pageDesc);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  // States for diagnostic tool
  const [revenue, setRevenue] = useState('');
  const [burnRate, setBurnRate] = useState('');
  const [reserves, setReserves] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const revNum = parseFloat(revenue) || 0;
    const burnNum = parseFloat(burnRate) || 0;
    const resNum = parseFloat(reserves) || 0;

    if (burnNum <= 0) {
      setCalcResult({
        status: 'sustainable',
        runway: 'Infinite',
        message: 'Your monthly expenses are zero. You are in a sustainable operational state.'
      });
      return;
    }

    const netBurn = burnNum - revNum;
    if (netBurn <= 0) {
      setCalcResult({
        status: 'profitable',
        runway: 'Profitable / Sustainable',
        message: 'Your revenue exceeds your burn rate. Operations are self-sustaining.'
      });
    } else {
      const runwayMonths = (resNum / netBurn).toFixed(1);
      let status = 'healthy';
      let message = 'Your runway exceeds 12 months. This gives you time to build value.';
      
      if (runwayMonths < 6) {
        status = 'critical';
        message = 'Critical Runway. We advise immediate operations cost restructuring and fundraising planning.';
      } else if (runwayMonths <= 12) {
        status = 'warning';
        message = 'Moderate Runway buffer. Consider tightening budget operations and auditing startup cash flows.';
      }

      setCalcResult({
        status,
        runway: `${runwayMonths} Months`,
        message
      });
    }
  };

  const selectedService = id 
    ? servicesData.find(service => service.id === id)
    : null;

  if (selectedService) {
    const IconComponent = iconComponents[selectedService.icon] || Briefcase;
    const serviceImage = imageMap[selectedService.image_name];
    
    return (
      <div className="min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 bg-white font-sans">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Top Back Navigation */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors"
            >
              <ArrowLeft size={16} />
              <span>All Advisory Practice Areas</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Primary Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-brand-blue">
                  <IconComponent size={20} strokeWidth={1.75} />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Advisory Practice Area
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading leading-tight">
                  {selectedService.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Service Image Frame */}
              <div className="w-full h-72 sm:h-80 overflow-hidden bg-slate-100 border border-slate-200 rounded-md">
                <img 
                  src={serviceImage} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detailed Scope */}
              {selectedService.subDescription && (
                <div className="space-y-3 pt-2">
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    Scope of Advisory &amp; Execution
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {selectedService.subDescription}
                  </p>
                </div>
              )}

              {/* Engagement Standards */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-slate-500 mb-5">
                  Standard Engagement Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Customized operations & compliance roadmap",
                    "Continuous periodic monitoring support",
                    "Complete audit & data transparency",
                    "Direct consultation with managing partners"
                  ].map((feat, index) => (
                    <div key={index} className="flex items-start gap-3 text-slate-700 text-sm">
                      <Check className="text-brand-green flex-shrink-0 mt-0.5" size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special callout on market-research page linking to /marketing */}
              {selectedService.id === 'market-research' && (
                <div className="bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-8 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1.5 max-w-lg">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-green block">
                      Creative &amp; Digital Portfolio
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Explore Our Full Digital &amp; Creative Suite
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      View our 9 specialized creative capabilities, live client website builds, and digital campaign case studies.
                    </p>
                  </div>
                  <Link
                    to="/marketing"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors flex-shrink-0"
                  >
                    <span>View Digital Portfolio</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}

              {/* Interactive Diagnostic Embed on startup-diagnostic page */}
              {selectedService.id === 'startup-diagnostic' && (
                <div className="bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-8 mt-8 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-blue">
                      <Calculator size={18} />
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Quick Runway Diagnostic Tool
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Enter your current monthly figures to calculate net burn and cash runway.
                    </p>
                  </div>

                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Monthly Revenue ($)
                        </label>
                        <input 
                          type="number" 
                          value={revenue} 
                          onChange={(e) => setRevenue(e.target.value)} 
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                          placeholder="e.g. 5000" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Monthly Expenses ($)
                        </label>
                        <input 
                          type="number" 
                          value={burnRate} 
                          onChange={(e) => setBurnRate(e.target.value)} 
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                          placeholder="e.g. 8000" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Cash Reserves ($)
                        </label>
                        <input 
                          type="number" 
                          value={reserves} 
                          onChange={(e) => setReserves(e.target.value)} 
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                          placeholder="e.g. 30000" 
                          required 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="px-5 py-2.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium transition-colors rounded-md"
                    >
                      Calculate Runway
                    </button>
                  </form>

                  {calcResult && (
                    <div className="p-4 border border-slate-200 bg-white rounded-md space-y-1.5">
                      <div className="flex items-center gap-2">
                        {calcResult.status === 'critical' ? (
                          <AlertTriangle className="text-red-600" size={16} />
                        ) : (
                          <CheckCircle2 className="text-brand-green" size={16} />
                        )}
                        <span className="text-sm font-bold text-slate-900">
                          Calculated Runway:{" "}
                          <span className={calcResult.status === 'critical' ? 'text-red-600' : 'text-brand-green'}>
                            {calcResult.runway}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{calcResult.message}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar: Practice Directory & Consultation CTA */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Engage Our Partners
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Schedule a confidential consultation regarding {selectedService.title.toLowerCase()} and receive a tailored scope proposal.
                </p>
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-primary-hover text-white font-medium text-sm transition-colors rounded-md"
                >
                  <span>Request Consultation</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    All Practice Areas
                  </h4>
                </div>
                <ul className="divide-y divide-slate-200">
                  {servicesData.map((s) => {
                    const isCurrent = s.id === selectedService.id;
                    return (
                      <li key={s.id}>
                        <Link
                          to={`/services/${s.id}`}
                          className={`flex items-center justify-between px-5 py-3 text-xs font-medium transition-colors ${
                            isCurrent
                              ? "bg-slate-50 text-brand-blue font-semibold border-l-2 border-brand-blue"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/60"
                          }`}
                        >
                          <span className="truncate pr-2">{s.title}</span>
                          <ArrowRight size={13} className={isCurrent ? "text-brand-blue" : "text-slate-300"} />
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      to="/marketing"
                      className="flex items-center justify-between px-5 py-3 text-xs font-semibold text-brand-blue hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="truncate pr-2">Digital &amp; Creative Studio</span>
                      <ArrowRight size={13} className="text-brand-blue" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>

          </div>
        </div>
      </div>
    );
  }

  // Main Services Directory Layout
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Our Offerings
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
              Corporate Operations &amp; Consulting
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Full-spectrum financial, legal, tax, and operational advisory built to help enterprises and startups scale with institutional discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Services Architectural Grid */}
      <section className="py-20 lg:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className="group bg-white border-r border-b border-slate-200 p-7 sm:p-9 flex flex-col justify-between hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-6">
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                    <div className="text-brand-blue">
                      {getIconComponent(service.icon)}
                    </div>
                  </div>

                  {/* Image & Copy Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    <div className="sm:col-span-5 h-36 overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
                      <img 
                        src={imageMap[service.image_name]} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h2 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-brand-blue transition-colors">
                        <Link to={`/services/${service.id}`}>
                          {service.title}
                        </Link>
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-brand-blue hover:text-primary-hover font-semibold text-xs uppercase tracking-wider group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                  {service.id === 'market-research' && (
                    <Link
                      to="/marketing"
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-blue font-semibold text-xs uppercase tracking-wider"
                    >
                      <span>Creative Portfolio</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Cross-Link Banner to /marketing */}
          <div className="mt-12 border border-slate-200 bg-slate-50 p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green block">
                Creative &amp; Digital Division
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                Looking for Web Engineering, Branding, SEO, or Media Production?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore our dedicated Digital Marketing &amp; Creative practice to view our 9 creative capabilities, recent website launches, and client growth metrics.
              </p>
            </div>
            <Link
              to="/marketing"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors flex-shrink-0 self-start lg:self-center group"
            >
              <span>Visit Digital &amp; Creative Studio</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Startup Financial Health Calculator Section */}
      <section className="py-20 lg:py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-brand-blue">
                <TrendingUp size={18} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                  Interactive Diagnostic Tool
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
                Startup Financial Health Check-up
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Estimate your operational runway and evaluate net burn instantly. Our advisory team uses these baseline indicators to structure cash-flow audits and fundraising roadmaps.
              </p>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-md p-6 sm:p-8 shadow-2xs">
              <form onSubmit={handleCalculate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Monthly Revenue ($)
                    </label>
                    <input 
                      type="number" 
                      value={revenue} 
                      onChange={(e) => setRevenue(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                      placeholder="e.g. 10000" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Monthly Expenses ($)
                    </label>
                    <input 
                      type="number" 
                      value={burnRate} 
                      onChange={(e) => setBurnRate(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                      placeholder="e.g. 15000" 
                      required 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Cash Reserves ($)
                    </label>
                    <input 
                      type="number" 
                      value={reserves} 
                      onChange={(e) => setReserves(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900" 
                      placeholder="e.g. 60000" 
                      required 
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium transition-colors rounded-md"
                >
                  Analyze Operations Runway
                </button>
              </form>

              {calcResult && (
                <div className="mt-6 p-5 border border-slate-200 bg-slate-50 rounded-md space-y-3">
                  <div className="flex items-center gap-2">
                    {calcResult.status === 'critical' ? (
                      <AlertTriangle className="text-red-600" size={18} />
                    ) : (
                      <CheckCircle2 className="text-brand-green" size={18} />
                    )}
                    <span className="text-sm font-bold text-slate-900">
                      Health Status:{" "}
                      <span className={calcResult.status === 'critical' ? 'text-red-600' : 'text-brand-green'}>
                        {calcResult.runway}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{calcResult.message}</p>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Need a comprehensive cash-flow audit?</span>
                    <Link to="/contact" className="text-brand-blue hover:text-primary-hover font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1">
                      <span>Book Founder Review</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
