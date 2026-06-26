import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiStar } from 'react-icons/fi';
import Rakhi from '../assets/Rakhi.jpg';
import Gaijatra from '../assets/Gaijatra.jpg';
import heroBg from '../assets/bg-1.jpg';
import heroBg4 from '../assets/bg-4.jpg';
import Suresh from '../assets/Suresh.jpg';
import Damodar from '../assets/Damodar.jpg';

const regularSlides = [
  {
    image: Suresh,
    focus: "FOUNDER & DIRECTOR",
    title: "Suresh Sharma — Advisory Lead",
    desc: "Co-founder directing corporate strategy, compliance architecture, and high-impact advisory."
  },
  {
    image: Damodar,
    focus: "FOUNDER & CONSULTANT",
    title: "Damodar Paudel — Operations Lead",
    desc: "Co-founder leading strategic business coaching, financial audits, and compliance planning."
  },
  {
    image: heroBg,
    focus: "STRATEGIC AUDITS",
    title: "Operations Audits & Restructuring",
    desc: "We deliver corporate upskilling roadmaps and tax compliance audits to build long-term value."
  },
  {
    image: heroBg4,
    focus: "DIGITAL PRESENCE",
    title: "Digital Marketing & SEO",
    desc: "Comprehensive analytics and brand strategies to scale operations."
  }
];

const SPECIAL_DURATION = 30000;
const REGULAR_DURATION = 5000;

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState(regularSlides);
  const [currentDuration, setCurrentDuration] = useState(REGULAR_DURATION);
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  const [specialDayName, setSpecialDayName] = useState("");
  const [visitedSlides, setVisitedSlides] = useState({ 0: true });

  useEffect(() => {
    setVisitedSlides((prev) => (prev[slideIndex] ? prev : { ...prev, [slideIndex]: true }));
  }, [slideIndex]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Rakhi: August 9
    if (currentMonth === 8 && currentDay === 9) {
      const festivalSlides = regularSlides.map((slide, idx) => {
        if (idx === 0) {
          return {
            ...slide,
            image: Rakhi,
            focus: "FESTIVAL SPECIAL",
            title: "Happy Raksha Bandhan",
            desc: "Celebrating values, trust, and binding partnerships globally."
          };
        }
        return slide;
      });
      setSlides(festivalSlides);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
      setSpecialDayName("Raksha Bandhan");
    } 
    // Gaijatra: August 10
    else if (currentMonth === 8 && currentDay === 10) {
      const festivalSlides = regularSlides.map((slide, idx) => {
        if (idx === 0) {
          return {
            ...slide,
            image: Gaijatra,
            focus: "FESTIVAL SPECIAL",
            title: "Happy Gaijatra",
            desc: "Honoring cultural heritage, resilience, and growth."
          };
        }
        return slide;
      });
      setSlides(festivalSlides);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
      setSpecialDayName("Gaijatra");
    } else {
      setSlides(regularSlides);
      setCurrentDuration(REGULAR_DURATION);
      setIsSpecialDay(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, currentDuration);
    return () => clearInterval(interval);
  }, [slides, currentDuration]);

  const activeSlide = slides[slideIndex] || slides[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50 text-slate-800 pt-28 pb-16 font-sans">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-br from-brand-blue/10 via-brand-green/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[50%] bg-gradient-to-tr from-brand-green/6 to-brand-blue/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center w-full">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left animate-slide-up">
            
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold tracking-tight text-slate-900 leading-[1.08] font-heading">
                Unlock Your <br />
                <span className="text-[#0b4a93] italic font-serif font-normal pr-2">
                  Business Edge
                </span> <br />
                Globally.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl font-normal">
              Professional Edge Global delivers high-impact financial consulting, dynamic corporate operations coaching, and creative digital strategies to scale global enterprises.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Link 
                to="/contact" 
                className="group px-8 py-4 bg-brand-blue hover:bg-brand-green text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300 text-center rounded-xl shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
              >
                Free Consultation
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 bg-white border border-slate-200 hover:border-brand-blue/30 text-slate-700 hover:text-brand-blue text-[11px] font-bold uppercase tracking-widest transition-all duration-300 text-center rounded-xl shadow-xs hover:shadow-sm"
              >
                Explore Services
              </Link>
            </div>

          </div>

          {/* Right Column: Custom Offset Leaf Frame Layout */}
          <div className="lg:col-span-5 w-full flex justify-center items-center z-10 animate-fade-in pr-6 lg:pr-0">
            <div className="relative w-[310px] sm:w-[350px]">
              
              {/* Outer offset outline box */}
              <div className="absolute inset-0 border-2 border-slate-900 rounded-[120px_120px_0px_120px] translate-x-3 translate-y-3 pointer-events-none z-0" />
              
              {/* Main Image Container */}
              <div className="relative bg-white p-2 border-2 border-slate-900 rounded-[120px_120px_0px_120px] overflow-hidden aspect-[4/5] z-10 shadow-lg">
                <div className="w-full h-full rounded-[110px_110px_0px_110px] overflow-hidden bg-slate-100 relative">
                  {slides.map((slide, index) => {
                    const isVisited = visitedSlides[index];
                    return isVisited ? (
                      <img
                        key={index}
                        src={slide.image}
                        alt={`Slide showcase ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        {...(index === 0 ? { fetchPriority: "high" } : {})}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
                          index === slideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-103 pointer-events-none'
                        }`}
                      />
                    ) : (
                      <div key={index} className="absolute inset-0 bg-slate-50" />
                    );
                  })}
                  <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />
                </div>
              </div>

              {/* Overlapping Info Card (Bottom Right) */}
              <div className="absolute bottom-[-15px] right-[-25px] z-20 p-5 bg-[#0a1120] border border-white/10 text-white rounded-xl shadow-xl max-w-[260px] text-left transition-all duration-500">
                <span className="text-[8px] uppercase font-bold text-brand-green tracking-widest mb-1.5 block">
                  {activeSlide.focus}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-white font-heading leading-snug">
                  {activeSlide.title}
                </h4>
                <p className="text-[10px] text-slate-300 mt-1 leading-normal font-medium">
                  {activeSlide.desc}
                </p>
              </div>

              {/* 85% scaled Excellence badge (Floating Right) */}
              <div className="absolute right-[-45px] top-[30%] z-20 bg-white border border-slate-200 shadow-md px-3.5 py-2.5 rounded-full flex items-center gap-2.5 scale-85 origin-left hover:scale-90 transition-transform">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <FiAward size={16} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900 leading-none">10+ Years</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Excellence</p>
                </div>
              </div>

              {/* Interactive Badge (Floating Left) */}
              <div className="absolute left-[-25px] bottom-[25%] z-20 w-8 h-8 rounded-full bg-brand-green text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <FiStar size={14} />
              </div>

              {/* Special Day badge indicator */}
              {isSpecialDay && (
                <div className="absolute top-5 left-5 z-20 px-3.5 py-1 bg-brand-blue text-white font-bold text-[9px] tracking-wider uppercase border border-white/10 rounded-full shadow-md animate-bounce">
                  {specialDayName}
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