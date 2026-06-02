import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiTrendingUp, FiBriefcase } from 'react-icons/fi';
import Rakhi from '../assets/Rakhi.png';
import Gaijatra from '../assets/Gaijatra.png';
import heroBg from '../assets/bg-1.jpg';
import heroBg3 from '../assets/bg-3.jpg';
import heroBg4 from '../assets/bg-4.jpg';
import about from '../assets/About.png';
import './hero.css';

const regularBackgrounds = [heroBg, about, heroBg3, heroBg4];
const REGULAR_DURATION = 5000; // 5 seconds
const SPECIAL_DURATION = 30000; // 30 seconds (3x longer)

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [currentBackgrounds, setCurrentBackgrounds] = useState(regularBackgrounds);
  const [currentDuration, setCurrentDuration] = useState(REGULAR_DURATION);
  const [isSpecialDay, setIsSpecialDay] = useState(false);

  useEffect(() => {
    // Check current date and modify backgrounds array accordingly
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentDay = currentDate.getDate();

    // August 9, 2025 - Rakhi
    if (currentYear === 2025 && currentMonth === 8 && currentDay === 9) {
      setCurrentBackgrounds([Rakhi, Rakhi, ...regularBackgrounds]);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
    } 
    // August 10, 2025 - Gaijatra
    else if (currentYear === 2025 && currentMonth === 8 && currentDay === 10) {
      setCurrentBackgrounds([Gaijatra, Gaijatra, ...regularBackgrounds]);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
    } else {
      setCurrentBackgrounds(regularBackgrounds);
      setCurrentDuration(REGULAR_DURATION);
      setIsSpecialDay(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % currentBackgrounds.length);
    }, currentDuration);
    return () => clearInterval(interval);
  }, [currentBackgrounds, currentDuration]);

  const marqueeItems = [
    {
      icon: <FiZap className="text-cyan-300 flex-shrink-0" size={16} />,
      text: "New Training Classes have opened! Connect with us to Join Now"
    },
    {
      icon: <FiTrendingUp className="text-emerald-400 flex-shrink-0" size={16} />,
      text: "Limited-time offer: Get 20% off on all consulting services this month"
    },
    {
      icon: <FiBriefcase className="text-blue-300 flex-shrink-0" size={16} />,
      text: "Exclusive webinar: Digital Transformation Strategies on July 25th"
    }
  ];

  return (
    <section className="hero-section bg-slate-50 overflow-hidden flex flex-col justify-between">
      {/* Split Grid Container */}
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-7xl flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Benefit-focused content hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">

            {/* Outcome-focused H1 headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6 font-poppins">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Business Edge</span> Globally
            </h1>

            {/* Subheading value proposition */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Professional Edge Global delivers high-impact financial consulting, dynamic corporate training, and digital marketing strategies designed to elevate operations and build sustainable business value.
            </p>

            {/* Double Action Button (CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get a Free Consultation
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl text-center shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right Column: Contained Image Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group bg-slate-900">
              
              {/* Fade Slideshow */}
              {currentBackgrounds.map((bg, index) => (
                <img
                  key={index}
                  src={bg}
                  alt={`Business Showcase Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
                    index === bgIndex ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}

              {/* Elegant Linear Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent z-10 pointer-events-none" />

              {/* Floating Glassmorphism Badge */}
              <div className="absolute bottom-5 left-5 right-5 z-20 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white pointer-events-none">
                <p className="text-[10px] uppercase font-semibold text-cyan-300 tracking-wider mb-0.5">Empowering Growth</p>
                <h4 className="text-lg font-bold">10+ Years of Business Excellence</h4>
                <p className="text-xs text-white/85 mt-1 leading-normal">Delivering reliable strategic insights and operations coaching.</p>
              </div>

              {/* Special Day notice */}
              {isSpecialDay && (
                <div className="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider shadow-md uppercase border border-blue-400/20 animate-bounce">
                  Celebrating {currentBackgrounds[0] === Rakhi ? "Raksha Bandhan" : "Gaijatra"}!
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Marquee Banner - Beautifully positioned at the bottom of the section */}
      <div className="hero-marquee-container w-full bg-blue-900/95 py-2.5 z-20 border-t border-blue-800">
        <div className="hero-marquee-wrapper">
          <div className="hero-marquee-content text-white font-medium text-xs sm:text-sm tracking-wide">
            {marqueeItems.map((item, index) => (
              <span key={index} className="hero-marquee-item mx-10 inline-flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {marqueeItems.map((item, index) => (
              <span key={`duplicate-${index}`} className="hero-marquee-item mx-10 inline-flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;