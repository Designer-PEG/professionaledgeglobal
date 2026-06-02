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

const getIconComponent = (iconName, className = "text-blue-900") => {
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
      <div className="min-h-screen mt-16 bg-slate-50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          
          {/* Main Hero Showcase Image */}
          <div className="w-full h-[45vh] overflow-hidden relative">
            <img 
              src={serviceImage} 
              alt={selectedService.title}
              className="w-full h-full object-cover"
            />
            {/* Elegant transparent overlay tint for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent pointer-events-none" />
            
            {/* Title block floated directly inside the image banner */}
            <div className="absolute bottom-6 left-8 right-8 text-white z-10 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-xs uppercase font-semibold text-blue-300 tracking-widest">Our Expertise</span>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-0.5 font-poppins">
                  {selectedService.title}
                </h1>
              </div>
            </div>
          </div>
          
          {/* Detailed Content Description */}
          <div className="p-8 sm:p-10">
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-poppins font-medium">
                {selectedService.description}
              </p>

              {selectedService.subDescription && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-base text-slate-600 leading-relaxed">
                  {selectedService.subDescription}
                </div>
              )}

              {/* Checklist details to enrich B2B trust signals */}
              <div className="border-t border-slate-100 pt-8 mt-8">
                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-4">Why Professional Edge Global?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Customized operations roadmap
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Continuous monitoring support
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    100% data transparency
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Direct consultation with founders
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back CTA */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm uppercase transition"
              >
                ← Back to all services
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition"
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
    <div className="min-h-screen mt-16 bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Our Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
            Our professional services meet your financial needs.
          </h1>
          <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
            High-converting solutions mapped across dynamic operational sectors to scale value safely.
          </p>
        </div>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-white border border-slate-100 shadow-sm hover:shadow-xl rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2"
            >
              {/* Floating Category Icon Circle */}
              <div className="absolute top-40 right-6 w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center z-20 border-2 border-white group-hover:from-blue-800 group-hover:to-blue-700 transition-all duration-300 transform group-hover:rotate-6">
                {getIconComponent(service.icon, "text-white")}
              </div>
              
              {/* Image Container with Hover zoom */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={imageMap[service.image_name]} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Soft Color Tint Overlay */}
                <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/20 transition-colors duration-500 pointer-events-none" />
              </div>
            
              {/* Service Card Content */}
              <div className="p-6 pt-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors duration-300 font-poppins">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm tracking-wider uppercase transition-all duration-300 focus:outline-none focus:underline"
                  >
                    LEARN MORE
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
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