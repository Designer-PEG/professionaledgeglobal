import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center overflow-hidden bg-[#f8f8f6] text-slate-800 mt-16 font-sans">
      
      {/* Background Graphic Accent (Subtle, professional) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0b4a93]/5 rounded-l-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#00a859]/5 rounded-r-full blur-3xl pointer-events-none z-0" />

      {/* Grid Container */}
      <div className="container mx-auto px-6 py-16 lg:py-24 max-w-5xl flex-grow flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider rounded-lg">
                10+ Years of Business Excellence
              </span>
              {isSpecialDay && (
                <span className="px-3 py-1 bg-[#0b4a93] text-white text-xs font-semibold uppercase tracking-wider animate-pulse rounded-lg">
                  Celebrating {currentBackgrounds[0] === Rakhi ? "Raksha Bandhan" : "Gaijatra"}!
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-heading">
              Unlock Your <span className="text-[#00a859]">Business Edge</span> Globally
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
              Professional Edge Global delivers high-impact financial consulting, dynamic corporate training, and digital marketing strategies designed to elevate operations and build sustainable business value.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Link 
                to="/contact" 
                className="px-6 py-3.5 bg-[#0b4a93] hover:bg-[#00a859] text-white text-sm font-semibold uppercase tracking-wider transition-colors duration-150 text-center rounded-lg shadow-sm"
              >
                Get a Free Consultation
              </Link>
              <Link 
                to="/services" 
                className="px-6 py-3.5 bg-transparent border border-slate-300 hover:border-[#00a859] hover:text-[#00a859] text-slate-700 text-sm font-semibold uppercase tracking-wider transition-colors duration-150 text-center rounded-lg"
              >
                Explore Services
              </Link>
            </div>

          </div>

          {/* Right Column: Contained Image Slideshow Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center items-center z-10">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden border border-slate-200 bg-slate-900 group rounded-2xl shadow-lg">
              
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
              <div className="absolute inset-0 bg-slate-950/60 z-10 pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-4 bg-slate-950/70 border border-white/10 text-white pointer-events-none rounded-xl">
                <p className="text-[10px] uppercase font-semibold text-[#00a859] tracking-wider mb-0.5">Empowering Growth</p>
                <h4 className="text-sm font-semibold">Professional Edge Global</h4>
                <p className="text-[11px] text-white/80 mt-1 leading-normal">Delivering reliable strategic insights and operations coaching.</p>
              </div>

              {/* Special Day badge */}
              {isSpecialDay && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#0b4a93]/90 text-white font-semibold text-[10px] tracking-wider uppercase border border-white/10 animate-bounce rounded-lg">
                  Celebrating {currentBackgrounds[0] === Rakhi ? "Raksha Bandhan" : "Gaijatra"}!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;