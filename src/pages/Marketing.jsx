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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24 space-y-24 mt-12">

      {/* Services */}
      <section className="bg-slate-50 border border-slate-100/80 rounded-3xl p-8 sm:p-12">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
            Our Creative Services
          </h2>
          <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
            Comprehensive solutions to elevate your brand's visual presence and drive structural engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Contained image backdrop with scale on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-15 transition-all duration-700 ease-out group-hover:scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${serviceImages[service.title]})` }}
              />
              <div className="relative p-6 z-10 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-2xl shadow-sm text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white flex-shrink-0">
                    {iconMap[service.iconName]}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 font-poppins">
                    {service.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {truncateDescription(service.description, 15)}
                </p>
                <div className="pt-5 border-t border-slate-100 mt-auto">
                  <ul className="space-y-2">
                    {service.metrics.map((metric, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-slate-600 text-xs font-semibold">{metric}</span>
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
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
            Recent Designs & Projects
          </h2>
          <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
            Explore our latest creative work and ongoing operational systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-xl rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col group relative"
            >
              {/* Visit Button - Top Right with Glassmorphism */}
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-md font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 flex items-center gap-1 border border-white/10"
                >
                  Visit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              
              {/* Contained image block with zoom */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={recentWorksImages[work.id]}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Visual backdrop for status tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 z-20">
                  <span
                    className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg ${
                      work.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : work.status === "In Progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {work.status}
                  </span>
                </div>
              </div>

              {/* Work Card details */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors duration-300 font-poppins mb-1.5">
                    {work.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">{work.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-50 mt-4">
                  {work.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100/80 font-medium"
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
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
            Success Stories
          </h2>
          <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
            See how we've helped businesses achieve remarkable operational growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-xl rounded-3xl overflow-hidden flex flex-col group transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={portfolioImages[index]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 font-poppins mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {item.results.map((result, i) => (
                      <div
                        key={i}
                        className="bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-2xl text-center shadow-sm"
                      >
                        <p className="text-blue-700 font-bold text-lg sm:text-xl">
                          {result.value}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-5 border-t border-slate-50">
                  <button className="flex items-center gap-1 text-blue-600 font-bold text-sm tracking-wider uppercase hover:text-blue-800 transition">
                    View Case Study <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our clients
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-600 transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">
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