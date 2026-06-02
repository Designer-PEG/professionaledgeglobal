import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quotes from "../json/qoute.json";
import services from "../json/services.json";
// Import all div images
import div1 from "../assets/div-1.png";
import div2 from "../assets/div-2.png";
import div3 from "../assets/div-3.png";
import div4 from "../assets/div-4.png";
import div5 from "../assets/div-5.png";
import div6 from "../assets/div-6.png";
import div7 from "../assets/div-7.png";
import div8 from "../assets/div-8.png";

import { 
  FiPieChart, 
  FiBriefcase, 
  FiSettings, 
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity
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

const divImages = [div1, div2, div3, div4, div5, div6, div7, div8];

const Home_Section = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentQuotes, setCurrentQuotes] = useState(quotes.filter(q => !q.specialDate));

  useEffect(() => {
    // Check if today is a special day
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    const specialQuote = quotes.find(q => q.specialDate === todayString);
    
    if (specialQuote) {
      // Show only the special quote on its day
      setCurrentQuotes([specialQuote]);
    } else {
      // Show regular quotes (filter out special quotes)
      setCurrentQuotes(quotes.filter(q => !q.specialDate));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % currentQuotes.length);
    }, 60000);
    return () => clearInterval(interval);
  }, [currentQuotes]);

  const { quote, author } = currentQuotes[quoteIndex];

  const getIconComponent = (iconName, className = "text-blue-900") => {
    const Icon = iconComponents[iconName];
    if (!Icon) return null;
    return <Icon className={className} size={22} />;
  };

  return (
    <>
      {/* Quote Section */}
      <section className="bg-slate-50 py-16 px-6 text-center border-y border-slate-100/80">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-slate-50/50 to-white py-12 px-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Subtle Decorative SVG Quotes in Background */}
          <div className="absolute top-4 left-6 text-slate-100 text-8xl font-serif select-none pointer-events-none">“</div>
          <div className="absolute bottom-[-20px] right-6 text-slate-100 text-8xl font-serif select-none pointer-events-none">”</div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed font-poppins italic">
              "{quote}"
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="w-5 h-[1px] bg-slate-300"></span>
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase font-poppins">- {author}</span>
              <span className="w-5 h-[1px] bg-slate-300"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20 px-6" aria-labelledby="service-label">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block" id="service-label">
              What We Do?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
              Our professional services meet your financial needs.
            </h2>
            <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
              Explore dynamic, results-driven solutions designed to navigate financial challenges and optimize operational growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) => (
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
                    src={divImages[index]} 
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
      </section>
    </>
  );
};

export default Home_Section;