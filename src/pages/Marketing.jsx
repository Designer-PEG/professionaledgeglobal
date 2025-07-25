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
  Search: <Search className="h-6 w-6 text-blue-600" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-blue-600" />,
  MessageCircle: <MessageCircle className="h-6 w-6 text-blue-600" />,
  FileText: <FileText className="h-6 w-6 text-blue-600" />,
  Mail: <Mail className="h-6 w-6 text-blue-600" />,
  BarChart2: <BarChart2 className="h-6 w-6 text-blue-600" />,
  Users: <Users className="h-6 w-6 text-blue-600" />,
  Layout: <Layout className="h-6 w-6 text-blue-600" />,
  Calendar: <Calendar className="h-6 w-6 text-blue-600" />,
  Code: <Code className="h-6 w-6 text-blue-600" />,
  Monitor: <Monitor className="h-6 w-6 text-blue-600" />,
  Smartphone: <Smartphone className="h-6 w-6 text-blue-600" />,
  Palette: <Palette className="h-6 w-6 text-blue-600" />,
  Zap: <Zap className="h-6 w-6 text-blue-600" />,
  Instagram: <Instagram className="h-6 w-6 text-blue-600" />,
  Package: <Package className="h-6 w-6 text-blue-600" />,
  Film: <Film className="h-6 w-6 text-blue-600" />,
  Clapperboard: <Clapperboard className="h-6 w-6 text-blue-600" />,
  Camera: <Camera className="h-6 w-6 text-blue-600" />,
  BoxSelect: <BoxSelect className="h-6 w-6 text-blue-600" />
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

      {/* Services */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Creative Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to elevate your brand's visual presence
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
        <div
            key={index}
            className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md overflow-hidden"
        >
            <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-50 transition-opacity duration-300"
            style={{ backgroundImage: `url(${serviceImages[service.title]})` }}
            />
            <div className="relative p-6 z-10">
            <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full mr-4">
                {iconMap[service.iconName]}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
                </h3>
            </div>
            <p className="text-gray-600 mb-4">
                {truncateDescription(service.description, 15)}
            </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2">
                    {service.metrics.map((metric, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{metric}</span>
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
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recent Designs & Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest creative work and ongoing projects
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentWorks.map((work) => (
            <div
                key={work.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group relative"
            >
                {/* Visit Button - Top Right */}
                {work.url && (
                <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1 rounded-full shadow-sm transition-all duration-200 flex items-center"
                >
                    Visit
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                    </svg>
                </a>
                )}
                
                <div className="relative">
                <img
                    src={recentWorksImages[work.id]}
                    alt={work.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                        work.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : work.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                    >
                    {work.status}
                    </span>
                </div>
                </div>
                <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {work.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{work.description}</p>
                <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
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
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Success Stories
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        See how we've helped businesses achieve remarkable results
        </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
        <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
            <img
            src={portfolioImages[index]}
            alt={item.title}
            className="w-full h-56 object-cover"
            />
            <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="grid grid-cols-2 gap-4">
                {item.results.map((result, i) => (
                <div
                    key={i}
                    className="bg-blue-50 p-3 rounded-lg text-center"
                >
                    <p className="text-blue-600 font-bold text-xl">
                    {result.value}
                    </p>
                    <p className="text-sm text-gray-600">{result.label}</p>
                </div>
                ))}
            </div>
            <button className="mt-6 flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                View case study <ArrowRight className="ml-1 h-4 w-4" />
            </button>
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