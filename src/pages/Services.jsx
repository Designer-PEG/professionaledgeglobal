import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesData from '../json/services.json';
import { 
  FiPieChart, FiBriefcase, FiSettings, FiDollarSign, 
  FiUsers, FiFileText, FiHeadphones, FiActivity, FiArrowRight,
  FiTrendingUp, FiActivity as FiCalc, FiAlertTriangle, FiCheckCircle
} from 'react-icons/fi';

// Import all div images
import div1 from '../assets/div-1.png';
import div2 from '../assets/div-2.png';
import div3 from '../assets/div-3.png';
import div4 from '../assets/div-4.png';
import div5 from '../assets/div-5.png';
import div6 from '../assets/div-6.png';
import div7 from '../assets/div-7.png';
import div8 from '../assets/div-8.png';

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
  FiPieChart,
  FiBriefcase,
  FiSettings,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity
};

const getIconComponent = (iconName, className = "text-brand-blue") => {
  const Icon = iconComponents[iconName];
  if (!Icon) return null;
  return <Icon className={className} size={22} />;
};

export default function Services() {
  const { id } = useParams();

  // Scroll to top when id changes
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
  const [fundingStage, setFundingStage] = useState('Bootstrap');
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
    const IconComponent = iconComponents[selectedService.icon] || FiBriefcase;
    const serviceImage = imageMap[selectedService.image_name];
    
    return (
      <div className="min-h-screen pt-36 pb-20 bg-slate-50 font-sans relative overflow-hidden">
        {/* Layer background decorative accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xl">
            
            {/* Hero Banner inside the card wrapper */}
            <div className="w-full h-80 overflow-hidden relative bg-slate-950">
              <img 
                src={serviceImage} 
                alt={selectedService.title}
                className="w-full h-full object-cover opacity-65 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-20 flex items-center gap-3.5">
                <div className="w-12 h-12 bg-brand-blue flex items-center justify-center border border-white/10 rounded-xl shadow-md">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-300 tracking-widest block">Expert Advisory</span>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1 font-heading">
                    {selectedService.title}
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Card Content Details */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="space-y-4 text-slate-650">
                <p className="text-sm sm:text-base leading-relaxed font-normal">
                  {selectedService.description}
                </p>

                {selectedService.subDescription && (
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {selectedService.subDescription}
                  </div>
                )}
              </div>

              {/* Service features checklists */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-brand-blue mb-4">
                  Why Choose Professional Edge Global?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Customized operations roadmap",
                    "Continuous monitoring support",
                    "100% data transparency",
                    "Direct consultation with founders"
                  ].map((feat, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] text-brand-green font-extrabold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special interactive diagnostic embed on the startup diagnostic detailed page */}
              {selectedService.id === 'startup-diagnostic' && (
                <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 mt-8">
                  <h3 className="text-sm font-extrabold text-slate-900 font-heading mb-4 flex items-center gap-2">
                    <FiCalc className="text-brand-blue" />
                    Quick Runway Diagnostic Tool
                  </h3>
                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Monthly Revenue ($)</label>
                        <input 
                          type="number" 
                          value={revenue} 
                          onChange={(e) => setRevenue(e.target.value)} 
                          className="w-full px-3 py-2 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                          placeholder="e.g. 5000" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Monthly Expenses ($)</label>
                        <input 
                          type="number" 
                          value={burnRate} 
                          onChange={(e) => setBurnRate(e.target.value)} 
                          className="w-full px-3 py-2 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                          placeholder="e.g. 8000" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Cash Reserves ($)</label>
                        <input 
                          type="number" 
                          value={reserves} 
                          onChange={(e) => setReserves(e.target.value)} 
                          className="w-full px-3 py-2 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                          placeholder="e.g. 30000" 
                          required 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-brand-blue hover:bg-brand-green text-white text-xs font-bold uppercase tracking-wider transition-colors duration-250 rounded-lg"
                    >
                      Analyze Health
                    </button>
                  </form>

                  {calcResult && (
                    <div className="mt-5 p-4 border border-slate-200 bg-white rounded-xl animate-fade-in space-y-2">
                      <div className="flex items-center gap-2">
                        {calcResult.status === 'critical' ? (
                          <FiAlertTriangle className="text-red-500" />
                        ) : (
                          <FiCheckCircle className="text-brand-green" />
                        )}
                        <span className="text-xs font-extrabold uppercase tracking-wide">
                          Calculated Runway: <span className={calcResult.status === 'critical' ? 'text-red-500' : 'text-brand-green'}>{calcResult.runway}</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{calcResult.message}</p>
                    </div>
                  )}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-green font-bold text-xs uppercase tracking-wider transition-colors duration-150"
                >
                  ← All services
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-5 py-3 bg-brand-blue hover:bg-brand-green text-white font-bold text-xs uppercase tracking-widest transition-colors duration-150 text-center rounded-xl shadow-xs"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  // General Services Layout
  return (
    <div className="min-h-screen pt-36 pb-20 bg-slate-50 font-sans relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20 space-y-4">
          <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
            Our Offerings
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Corporate Operations & Consulting
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            High-converting solutions mapped across dynamic operational sectors to scale business value safely.
          </p>
        </div>
         
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white border border-slate-200/80 rounded-xl transition-all duration-300 hover:border-brand-blue/30 hover:shadow-lg overflow-hidden h-full flex flex-col hover-lift focus-within:ring-2 focus-within:ring-brand-blue/20"
            >
              {/* Photo section */}
              <div className="h-44 overflow-hidden relative bg-slate-950">
                <img 
                  src={imageMap[service.image_name]} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
              </div>
            
              {/* Text detail section */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue">
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-green font-bold text-[10px] tracking-widest uppercase transition-colors duration-150 focus:outline-none"
                  >
                    LEARN MORE
                    <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Startup Financial Health Calculator embed inside the main layout */}
        <div className="mt-28 bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[45%] bg-gradient-to-br from-brand-blue/5 to-brand-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Header info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-full">
                <FiTrendingUp />
                Interactive Diagnostic Tool
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Startup Financial Health Check-up
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Estimate your operational runway and calculate burn multiples instantly. Let us help you audit startup cash flows and draft strategic roadmaps.
              </p>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Monthly Revenue ($)</label>
                    <input 
                      type="number" 
                      value={revenue} 
                      onChange={(e) => setRevenue(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                      placeholder="e.g. 10000" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Monthly Expenses ($)</label>
                    <input 
                      type="number" 
                      value={burnRate} 
                      onChange={(e) => setBurnRate(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                      placeholder="e.g. 15000" 
                      required 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Current Cash Reserves ($)</label>
                    <input 
                      type="number" 
                      value={reserves} 
                      onChange={(e) => setReserves(e.target.value)} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-lg text-xs" 
                      placeholder="e.g. 60000" 
                      required 
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-brand-blue hover:bg-brand-green text-white text-xs font-bold uppercase tracking-widest transition-colors duration-250 rounded-xl"
                >
                  Analyze Operations Runway
                </button>
              </form>

              {calcResult && (
                <div className="mt-6 p-5 border border-slate-200 bg-white rounded-xl animate-fade-in space-y-2.5">
                  <div className="flex items-center gap-2">
                    {calcResult.status === 'critical' ? (
                      <FiAlertTriangle className="text-red-500" size={16} />
                    ) : (
                      <FiCheckCircle className="text-brand-green" size={16} />
                    )}
                    <span className="text-xs font-extrabold uppercase tracking-widest">
                      Health Status: <span className={calcResult.status === 'critical' ? 'text-red-500' : 'text-brand-green'}>{calcResult.runway}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{calcResult.message}</p>
                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold">Want a detailed audit?</span>
                    <Link to="/contact" className="text-brand-blue hover:text-brand-green font-bold text-[10px] tracking-widest uppercase flex items-center gap-1">
                      Book Founder Review
                      <FiArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}