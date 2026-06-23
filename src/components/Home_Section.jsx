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

  const { quote, author } = currentQuotes[quoteIndex] || { quote: "Precision is key.", author: "Firm" };

  const getIconComponent = (iconName, className = "text-[#0b4a93]") => {
    const Icon = iconComponents[iconName];
    if (!Icon) return null;
    return <Icon className={className} size={22} />;
  };

  return (
    <>
      {/* Quote Section */}
      <section className="bg-[#f8f8f6] py-28 px-6 text-center border-b border-slate-150">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative z-10 max-w-2xl mx-auto">
            <blockquote className="text-xl sm:text-2xl font-light text-slate-700 leading-relaxed font-sans italic">
              "{quote}"
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-slate-300"></span>
              <span className="text-xs font-semibold tracking-wider text-[#0b4a93] uppercase font-sans">- {author}</span>
              <span className="w-4 h-[1px] bg-slate-300"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24 px-6 animate-fade-in" aria-labelledby="service-label">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg" id="service-label">
              What We Do?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Our professional services meet your financial needs.
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Explore dynamic, results-driven solutions designed to navigate financial challenges and optimize operational growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <div 
                key={service.id} 
                className="group bg-white border border-slate-200 rounded-lg transition-all duration-200 hover:border-slate-350 hover:shadow-md overflow-hidden h-full flex flex-col focus-within:ring-1 focus-within:ring-[#0b4a93]"
              >
                {/* Image Container */}
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={divImages[index]} 
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
      </section>
    </>
  );
};

export default Home_Section;