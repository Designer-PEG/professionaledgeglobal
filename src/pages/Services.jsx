import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesData from '../json/services.json';
import { 
  FiPieChart, FiBriefcase, FiSettings, FiDollarSign, 
  FiUsers, FiFileText, FiHeadphones, FiActivity, FiArrowRight 
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

// Create an image map using the image_name as key
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

const getIconComponent = (iconName, className = "text-[#0b4a93]") => {
  const Icon = iconComponents[iconName];
  if (!Icon) return null;
  return <Icon className={className} size={22} />;
};

export default function Services() {
  const { id } = useParams();

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  // If ID exists, show single service, otherwise show all
  const selectedService = id 
    ? servicesData.find(service => service.id === id)
    : null;

  if (selectedService) {
    const IconComponent = iconComponents[selectedService.icon];
    const serviceImage = imageMap[selectedService.image_name];
    
    return (
      <div className="min-h-screen mt-16 bg-[#f8f8f6] py-16 px-6 font-sans">
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
          
          {/* Main Hero Showcase Image */}
          <div className="w-full h-80 overflow-hidden relative bg-slate-900">
            <img 
              src={serviceImage} 
              alt={selectedService.title}
              className="w-full h-full object-cover opacity-60 grayscale"
            />
            
            {/* Title block floated directly inside the image banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10 flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0b4a93] flex items-center justify-center border border-white/10 shadow-none rounded-lg">
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-350 tracking-wider">Our Expertise</span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5 font-heading">
                  {selectedService.title}
                </h1>
              </div>
            </div>
          </div>
          
          {/* Detailed Content Description */}
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-normal">
                {selectedService.description}
              </p>

              {selectedService.subDescription && (
                <div className="p-4 bg-slate-50 border border-slate-200 text-sm text-slate-500 leading-relaxed rounded-lg">
                  {selectedService.subDescription}
                </div>
              )}

              {/* Checklist details */}
              <div className="border-t border-slate-150 pt-6 mt-6">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#0b4a93] mb-3">Why Professional Edge Global?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a859]"></span>
                    Customized operations roadmap
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a859]"></span>
                    Continuous monitoring support
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a859]"></span>
                    100% data transparency
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a859]"></span>
                    Direct consultation with founders
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back CTA */}
            <div className="mt-8 pt-6 border-t border-slate-150 flex justify-between items-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-[#0b4a93] hover:text-[#00a859] font-semibold text-xs uppercase transition-colors duration-150"
              >
                ← Back to all services
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2.5 bg-[#0b4a93] hover:bg-[#00a859] text-white font-semibold text-xs uppercase tracking-wider transition-colors duration-150 rounded-lg"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  // Show all services if no ID or service not found
  return (
    <div className="min-h-screen mt-16 bg-[#f8f8f6] py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
            Our Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our professional services meet your financial needs.
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            High-converting solutions mapped across dynamic operational sectors to scale value safely.
          </p>
        </div>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white border border-slate-200 rounded-lg transition-all duration-200 hover:border-slate-350 hover:shadow-md overflow-hidden h-full flex flex-col focus-within:ring-1 focus-within:ring-[#0b4a93]"
            >
              {/* Image Container with Hover zoom */}
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={imageMap[service.image_name]} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            
              {/* Service Card Content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0b4a93]">
                    {getIconComponent(service.icon, "text-[#0b4a93] w-5 h-5")}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-[#0b4a93] hover:text-[#00a859] font-semibold text-xs tracking-wider uppercase transition-colors duration-150 focus:outline-none"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}