import React from 'react';
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
  ArrowRight,
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
  Search: <Search className="h-6 w-6 transition-colors duration-300" />,
  TrendingUp: <TrendingUp className="h-6 w-6 transition-colors duration-300" />,
  MessageCircle: <MessageCircle className="h-6 w-6 transition-colors duration-300" />,
  FileText: <FileText className="h-6 w-6 transition-colors duration-300" />,
  Mail: <Mail className="h-6 w-6 transition-colors duration-300" />,
  BarChart2: <BarChart2 className="h-6 w-6 transition-colors duration-300" />,
  Users: <Users className="h-6 w-6 transition-colors duration-300" />,
  Layout: <Layout className="h-6 w-6 transition-colors duration-300" />,
  Calendar: <Calendar className="h-6 w-6 transition-colors duration-300" />,
  Code: <Code className="h-6 w-6 transition-colors duration-300" />,
  Monitor: <Monitor className="h-6 w-6 transition-colors duration-300" />,
  Smartphone: <Smartphone className="h-6 w-6 transition-colors duration-300" />,
  Palette: <Palette className="h-6 w-6 transition-colors duration-300" />,
  Zap: <Zap className="h-6 w-6 transition-colors duration-300" />,
  Instagram: <Instagram className="h-6 w-6 transition-colors duration-300" />,
  Package: <Package className="h-6 w-6 transition-colors duration-300" />,
  Film: <Film className="h-6 w-6 transition-colors duration-300" />,
  Clapperboard: <Clapperboard className="h-6 w-6 transition-colors duration-300" />,
  Camera: <Camera className="h-6 w-6 transition-colors duration-300" />,
  BoxSelect: <BoxSelect className="h-6 w-6 transition-colors duration-300" />
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
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 space-y-28 mt-12 animate-fade-in font-sans">

      {/* Services */}
      <section className="bg-[#f8f8f6] border border-slate-200 rounded-2xl p-8 sm:p-12">
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Creative Services
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Comprehensive solutions to elevate your brand's visual presence and drive structural engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200 rounded-lg transition-all duration-200 overflow-hidden flex flex-col hover:shadow-md"
            >
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-[#0b4a93] flex-shrink-0">
                    {iconMap[service.iconName]}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {truncateDescription(service.description, 15)}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-150 mt-6">
                  <ul className="space-y-2">
                    {service.metrics.map((metric, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-slate-600 text-xs font-medium">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Works */}
      <section>
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
            Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Recent Designs & Projects
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Explore our latest creative work and ongoing operational systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white border border-slate-200 rounded-lg transition-all duration-200 hover:border-slate-350 hover:shadow-md overflow-hidden h-full flex flex-col group relative"
            >
              {/* Visit Button */}
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 z-20 bg-slate-950/70 hover:bg-[#00a859] text-white text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg transition-colors duration-150 flex items-center gap-1"
                >
                  Visit
                </a>
              )}
              
              {/* Contained image block with zoom */}
              <div className="h-44 overflow-hidden relative border-b border-slate-200">
                <img
                  src={recentWorksImages[work.id]}
                  alt={work.title}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300"
                />
                
                <div className="absolute bottom-3 left-3 z-20">
                  <span
                    className={`text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-lg ${
                      work.status === "Completed"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                        : work.status === "In Progress"
                        ? "bg-amber-50 text-amber-800 border border-amber-100"
                        : "bg-blue-50 text-blue-800 border border-blue-100"
                    }`}
                  >
                    {work.status}
                  </span>
                </div>
              </div>

              {/* Work Card details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-heading mb-1">
                    {work.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">{work.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-2">
                  {work.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 border border-slate-150 font-medium rounded-md"
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

      {/* Portfolio */}
      <section>
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Success Stories
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            See how we've helped businesses achieve remarkable operational growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col group transition-all duration-200 hover:border-slate-350 hover:shadow-md"
            >
              <div className="h-48 overflow-hidden relative border-b border-slate-200">
                <img
                  src={portfolioImages[index]}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {item.results.map((result, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-150 p-3 rounded-lg text-center"
                      >
                        <p className="text-[#0b4a93] font-bold text-base sm:text-lg">
                          {result.value}
                        </p>
                        <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <button className="flex items-center gap-1 text-[#0b4a93] font-semibold text-xs tracking-wider uppercase hover:text-[#00a859] transition-colors duration-150">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f8f8f6] rounded-2xl p-8 sm:p-12 border border-slate-200">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block">
            Endorsements
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Client Testimonials
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our clients
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border border-slate-200 hover:border-[#00a859] transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-lg object-cover mr-3 grayscale"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">"{testimonial.content}"</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center text-yellow-500">
                  <span className="text-xs font-semibold text-slate-500">5.0 Rating</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}