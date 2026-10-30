import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  BoxSelect,
  ArrowRight,
  ArrowUpRight,
  Check
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

import useSEO from '../hooks/useSEO';

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
  Search: <Search className="h-5 w-5" strokeWidth={1.75} />,
  TrendingUp: <TrendingUp className="h-5 w-5" strokeWidth={1.75} />,
  MessageCircle: <MessageCircle className="h-5 w-5" strokeWidth={1.75} />,
  FileText: <FileText className="h-5 w-5" strokeWidth={1.75} />,
  Mail: <Mail className="h-5 w-5" strokeWidth={1.75} />,
  BarChart2: <BarChart2 className="h-5 w-5" strokeWidth={1.75} />,
  Users: <Users className="h-5 w-5" strokeWidth={1.75} />,
  Layout: <Layout className="h-5 w-5" strokeWidth={1.75} />,
  Calendar: <Calendar className="h-5 w-5" strokeWidth={1.75} />,
  Code: <Code className="h-5 w-5" strokeWidth={1.75} />,
  Monitor: <Monitor className="h-5 w-5" strokeWidth={1.75} />,
  Smartphone: <Smartphone className="h-5 w-5" strokeWidth={1.75} />,
  Palette: <Palette className="h-5 w-5" strokeWidth={1.75} />,
  Zap: <Zap className="h-5 w-5" strokeWidth={1.75} />,
  Instagram: <Instagram className="h-5 w-5" strokeWidth={1.75} />,
  Package: <Package className="h-5 w-5" strokeWidth={1.75} />,
  Film: <Film className="h-5 w-5" strokeWidth={1.75} />,
  Clapperboard: <Clapperboard className="h-5 w-5" strokeWidth={1.75} />,
  Camera: <Camera className="h-5 w-5" strokeWidth={1.75} />,
  BoxSelect: <BoxSelect className="h-5 w-5" strokeWidth={1.75} />
};

const SERVICE_IMAGES = {
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

export default function Marketing() {
  useSEO(
    "Digital Marketing & Creative Solutions",
    "Partner with Professional Edge Global for expert Social Media Management, Graphic Design, Website Design & SEO, Package Design, and 3D Animation solutions."
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Page Header */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-brand-blue" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  Digital &amp; Creative Practice
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
                Our Creative Services
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Comprehensive brand architecture, web engineering, search optimization, and commercial production built to drive measurable customer acquisition.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors flex-shrink-0 self-start md:self-auto"
            >
              <span>Start a Creative Brief</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Creative Services — Flush 3-Column Matrix */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-r border-b border-slate-200 p-7 sm:p-8 flex flex-col justify-between bg-white hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                    <div className="text-brand-blue">
                      {iconMap[service.iconName] || <Palette className="h-5 w-5" strokeWidth={1.75} />}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 font-heading tracking-tight leading-snug">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-5 mt-6 border-t border-slate-100">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Deliverables
                  </p>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {service.metrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check size={13} className="text-brand-green flex-shrink-0" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Recent Designs & Projects — 2-Column Showcase */}
      <section className="py-20 lg:py-28 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Recent Designs &amp; Projects
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Web platforms, client portals, and brand campaigns delivered for professional services and corporate enterprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Project Screenshot */}
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-200 relative">
                    <img
                      src={recentWorksImages[work.id]}
                      alt={work.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green">
                        {work.status}
                      </span>
                      {work.url && (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-primary-hover"
                        >
                          <span>Visit Live Site</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 font-heading leading-snug">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {work.description}
                    </p>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap gap-2">
                  {work.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-slate-600 bg-white px-2.5 py-1 border border-slate-200 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Case Studies / Growth Metrics — Structured Editorial Rows */}
      <section className="py-20 lg:py-28 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
              Measured Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Success Stories &amp; Growth Metrics
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Quantifiable operational and acquisition outcomes across our client engagements.
            </p>
          </div>
          
          <div className="border-t border-slate-200 divide-y divide-slate-200">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual */}
                <div className="lg:col-span-4 h-48 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  <img
                    src={portfolioImages[index]}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                {/* Narrative */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Case Study 0{index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-brand-blue hover:text-primary-hover font-semibold text-xs uppercase tracking-wider"
                    >
                      <span>Discuss Similar Scope</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="lg:col-span-4 grid grid-cols-2 border-t border-l border-slate-200">
                  {item.results.map((result, i) => (
                    <div
                      key={i}
                      className="border-r border-b border-slate-200 p-4 bg-slate-50/50"
                    >
                      <p className="text-brand-blue font-bold text-xl font-heading tabular-nums">
                        {result.value}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Testimonials — Clean Top-Ruled Columns */}
      <section className="py-20 lg:py-28 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
              Client Endorsements
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-heading">
              Client Testimonials
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Feedback from partners and business owners who have worked with our advisory and digital teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-t-2 border-slate-900 pt-6 flex flex-col justify-between space-y-6"
              >
                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-heading">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
