import React, { useEffect } from 'react';
import {
  Search,
  TrendingUp,
  MessageCircle,
  FileText,
  Mail,
  BarChart2,
  Users,
  Layout,
  Calendar,
  Code,
  Monitor,
  Smartphone,
  Palette,
  Instagram,
  Zap,
  Package,
  Film,
  Clapperboard,
  Camera,
  BoxSelect
} from "lucide-react";
import { FiArrowRight, FiAward } from "react-icons/fi";

import services from "../json/services";
import portfolioItems from "../json/portfolioItems";
import testimonials from "../json/testimonials";
import recentWorks from "../json/recentWorks";

// Import all service background images
import SocialMediaBG from "../assets/img/social_media.png";
import GraphicDesignBG from "../assets/img/graphic_designing.png";
import PackageDesignBG from "../assets/img/package_designing.png";
import QuickCommerce from "../assets/img/quick_commerce.png";
import WebDesignBG from "../assets/img/web_designing.png";
import VideoEditingBG from "../assets/img/video_editing.png";
import MovieMakingBG from "../assets/img/movie_making.png";
import PhotoshootBG from "../assets/img/photoshoot.png";
import Animation3DBG from "../assets/img/3d_animation.png";

// Import recent works images
import SureshAssociatesImg from "../assets/img/website_design(SSA).png";
import EverestClaimsImg from "../assets/img/website_design(ECA).png";
import ProfessionalEdgeImg from "../assets/img/website_design(PEG).png";
import ProfessionalEdgeSocialImg from "../assets/img/social_media.png";

const recentWorksImages = {
  1: SureshAssociatesImg,
  2: EverestClaimsImg,
  3: ProfessionalEdgeImg,
  4: ProfessionalEdgeSocialImg
};

const portfolioImages = [
  SureshAssociatesImg,
  EverestClaimsImg,
  ProfessionalEdgeImg
];

const iconMap = {
  Search: <Search className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  BarChart2: <BarChart2 className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Layout: <Layout className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Monitor: <Monitor className="h-5 w-5" />,
  Smartphone: <Smartphone className="h-5 w-5" />,
  Palette: <Palette className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  Film: <Film className="h-5 w-5" />,
  Clapperboard: <Clapperboard className="h-5 w-5" />,
  Camera: <Camera className="h-5 w-5" />,
  BoxSelect: <BoxSelect className="h-5 w-5" />
};

const serviceImages = {
  "Social Media Management": SocialMediaBG,
  "Graphic Designing": GraphicDesignBG,
  "Quick Commerce Solutions": QuickCommerce, 
  "Package Designing": PackageDesignBG,
  "Website Designing & SEO": WebDesignBG,
  "Video Editing/Production": VideoEditingBG,
  "Movie Making": MovieMakingBG,
  "Photoshoot": PhotoshootBG,
  "3D Animation": Animation3DBG
};

const truncateDescription = (text, wordCount) => {
  const words = text.split(' ');
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

export default function Marketing() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white pt-36 pb-20 font-sans">
      {/* Visual Back Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 space-y-28 relative z-10">
        
        {/* Creative Offerings */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-16 space-y-4">
            <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Creative Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Our Creative Services
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Comprehensive designs and digital solutions to elevate your brand presence and drive high structural engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white border border-slate-200/80 rounded-xl transition-all duration-300 overflow-hidden flex flex-col hover:border-brand-blue/30 hover:shadow-lg hover-lift"
              >
                <div className="p-5 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/5 transition-colors duration-300">
                      {iconMap[service.iconName] || <Palette className="h-5 w-5" />}
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {truncateDescription(service.description, 14)}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <ul className="space-y-2">
                      {service.metrics.map((metric, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0"></span>
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Designs grid */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <span className="px-3.5 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Recent Designs & Projects
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Explore our latest creative work and active operational digital campaigns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white border border-slate-200/80 rounded-xl transition-all duration-300 hover:border-brand-blue/30 hover:shadow-lg overflow-hidden h-full flex flex-col group relative hover-lift"
              >
                {/* External link visit trigger */}
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-brand-green text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors duration-250 flex items-center gap-1 shadow-md"
                  >
                    Visit
                  </a>
                )}
                
                {/* Visual frame with zoom */}
                <div className="h-44 overflow-hidden relative bg-slate-950">
                  <img
                    src={recentWorksImages[work.id]}
                    alt={work.title}
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <span
                      className={`text-[8px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full ${
                        work.status === "Completed"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-100/50"
                          : work.status === "In Progress"
                          ? "bg-amber-50 text-amber-800 border border-amber-100/50"
                          : "bg-blue-50 text-blue-800 border border-blue-100/50"
                      }`}
                    >
                      {work.status}
                    </span>
                  </div>
                </div>

                {/* Details body */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 font-heading mb-1.5 leading-snug">
                      {work.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{work.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 border border-slate-200/60 font-semibold rounded-md uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies / Success Metrics */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <span className="px-3.5 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Success Stories & Growth Metrics
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Real outcomes delivered to companies scaling operational reach and brand awareness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-brand-blue/30 hover:shadow-lg hover-lift"
              >
                <div className="h-48 overflow-hidden relative bg-slate-950">
                  <img
                    src={portfolioImages[index]}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                    
                    {/* Performance metrics display */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      {item.results.map((result, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl text-center"
                        >
                          <p className="text-brand-blue font-extrabold text-base">
                            {result.value}
                          </p>
                          <p className="text-[8px] uppercase font-bold tracking-widest text-slate-400 mt-1">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-brand-blue group-hover:text-brand-green font-bold text-[10px] tracking-widest uppercase transition-colors">
                      View Case Study
                      <FiArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Endorsements Card slider */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Client Testimonials
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xl mx-auto">
              Our partners share their feedback on working with Professional Edge Global co-founders and experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-slate-200/80 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-lg object-cover grayscale"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{testimonial.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed italic">"{testimonial.content}"</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 text-[8px] font-extrabold tracking-wider uppercase border border-amber-100 rounded-full">
                    ★ 5.0 Rating
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 font-mono">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}