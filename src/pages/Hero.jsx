import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Rakhi from '../assets/Rakhi.webp';
import Gaijatra from '../assets/Gaijatra.webp';
import heroBg from '../assets/bg-1.webp';
import heroBg4 from '../assets/bg-4.webp';
import Suresh from '../assets/Suresh.webp';
import Damodar from '../assets/Damodar.webp';

const regularSlides = [
  {
    image: Suresh,
    focus: "FOUNDER & DIRECTOR",
    title: "Suresh Sharma — Advisory Lead",
    desc: "Co-founder directing corporate strategy, compliance architecture, and high-impact advisory.",
    link: "/about",
    linkLabel: "Meet Leadership"
  },
  {
    image: Damodar,
    focus: "FOUNDER & CONSULTANT",
    title: "Damodar Paudel — Operations Lead",
    desc: "Co-founder leading strategic business coaching, financial audits, and compliance planning.",
    link: "/about",
    linkLabel: "Meet Leadership"
  },
  {
    image: heroBg,
    focus: "STRATEGIC AUDITS",
    title: "Operations Audits & Restructuring",
    desc: "We deliver corporate upskilling roadmaps and tax compliance audits to build long-term value.",
    link: "/services",
    linkLabel: "View Advisory Practice"
  },
  {
    image: heroBg4,
    focus: "DIGITAL PRESENCE",
    title: "Digital Marketing & SEO",
    desc: "Comprehensive analytics and brand strategies to scale operations.",
    link: "/marketing",
    linkLabel: "Explore Digital & Creative Studio"
  }
];

const SPECIAL_DURATION = 30000;
const REGULAR_DURATION = 6000;

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState(regularSlides);
  const [currentDuration, setCurrentDuration] = useState(REGULAR_DURATION);
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  const [specialDayName, setSpecialDayName] = useState("");

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

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200 pt-28 pb-20 lg:pt-36 lg:pb-28 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-brand-blue" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  {isSpecialDay ? `Special Observance · ${specialDayName}` : "Corporate Advisory & Operations"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-900 leading-[1.12] font-heading">
                Unlock Your Business Edge Globally.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Professional Edge Global partners with enterprises and high-growth startups to deliver certified financial consulting, tax compliance architecture, ERP implementation, and digital growth strategies.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link 
                to="/contact" 
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors duration-150"
              >
                Schedule a Consultation
                <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={16} />
              </Link>
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 text-sm font-medium rounded-md transition-colors duration-150"
              >
                Explore Advisory Services
              </Link>
            </div>

            {/* Institutional Credentials Bar */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-heading">10+ Yrs</p>
                <p className="text-xs text-slate-500 mt-1">Advisory &amp; Audit Track Record</p>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-heading">40–60%</p>
                <p className="text-xs text-slate-500 mt-1">BPO/KPO Cost Efficiency</p>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-heading">Full-Stack</p>
                <p className="text-xs text-slate-500 mt-1">Tax, Legal, ERP &amp; Digital</p>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Editorial Frame */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
              
              {/* Image Viewport */}
              <div className="relative aspect-[4/4.4] bg-slate-100 overflow-hidden">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    {...(index === 0 ? { fetchPriority: "high" } : {})}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                      index === slideIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                    }`}
                  />
                ))}
              </div>

              {/* Caption & Controls Bar */}
              <div className="p-5 bg-white border-t border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
                    {activeSlide.focus}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-slate-400 font-mono tabular-nums">
                      0{slideIndex + 1} / 0{slides.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {activeSlide.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeSlide.desc}
                </p>
                {activeSlide.link && (
                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <Link
                      to={activeSlide.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-primary-hover group"
                    >
                      <span>{activeSlide.linkLabel || "Learn More"}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
