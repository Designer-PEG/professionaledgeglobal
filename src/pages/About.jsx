import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Suresh from '../assets/Suresh.webp';
import Damodar from '../assets/Damodar.webp';
import Shashank from '../assets/img/shashank.webp';
import Jeshan from '../assets/img/Jeshan.webp';
import Prakash from '../assets/img/Prakash.webp';
import Bibek from '../assets/img/Bibek.webp';
import Pujan from '../assets/img/Pujan.webp';
import About_Section from '../components/About_Section';
import teamData from '../json/ourTeams.json';
import useSEO from '../hooks/useSEO';

const About = () => {
  useSEO(
    "Our Leadership & Team | About Us",
    "Learn about Professional Edge Global's history, mission, co-founders Suresh Sharma and Damodar Paudel, and our team of business advisory experts."
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const teamMembers = teamData.map(member => {
    let image;
    switch(member.image) {
      case '../assets/Suresh.webp': image = Suresh; break;
      case '../assets/Damodar.webp': image = Damodar; break;
      case '../assets/img/shashank.webp': image = Shashank; break;
      case '../assets/img/Jeshan.webp': image = Jeshan; break;
      case '../assets/img/Prakash.webp': image = Prakash; break;
      case '../assets/img/Bibek.webp': image = Bibek; break;
      case '../assets/img/Pujan.webp': image = Pujan; break;
      default: image = Suresh;
    }
    return { ...member, image };
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Editorial Intro & Managing Partners */}
      <section id="about" className="pt-28 pb-20 lg:pt-36 lg:pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Top Split Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 border-b border-slate-200">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-brand-blue" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  Who We Are
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
                Professional Edge Global
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Founded in 2013, we have spent over a decade helping enterprises and growing businesses transform operations, maintain regulatory compliance, and achieve sustainable financial growth.
              </p>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-8">
              <blockquote className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed font-heading italic">
                &ldquo;Leadership is the capacity to translate vision into reality.&rdquo;
              </blockquote>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                — Suresh Sharma &amp; Damodar Paudel, Co-Founders
              </p>
            </div>
          </div>

          {/* Managing Partners Grid */}
          <div className="pt-16">
            <div className="mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block mb-2">
                Executive Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight">
                Managing Partners
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl">
              {/* Suresh Sharma */}
              <div className="space-y-4">
                <div className="aspect-[4/4.3] overflow-hidden bg-slate-100 border border-slate-200 rounded-md">
                  <img
                    src={Suresh}
                    alt="Suresh Sharma, Co-Founder & Director"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Suresh Sharma</h3>
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mt-0.5">
                    Co-Founder &amp; Director
                  </p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Directs corporate strategy, statutory compliance architecture, and senior financial advisory across domestic and international client engagements.
                  </p>
                </div>
              </div>
              
              {/* Damodar Paudel */}
              <div className="space-y-4">
                <div className="aspect-[4/4.3] overflow-hidden bg-slate-100 border border-slate-200 rounded-md">
                  <img
                    src={Damodar}
                    alt="Damodar Paudel, Co-Founder & Consultant"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Damodar Paudel</h3>
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mt-0.5">
                    Co-Founder &amp; Consultant
                  </p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Leads operational restructuring, startup financial diagnostics, tax planning frameworks, and enterprise capacity building.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Vision, Mission & Goals Sections */}
      <About_Section /> 

      {/* Dedicated Experts Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue block">
              Our Specialists
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Meet Our Team
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Our audit officers, compliance specialists, and creative technologists work collaboratively to deliver rigorous execution.
            </p>
          </div>

          {/* Unboxed Editorial Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <div className="h-72 overflow-hidden bg-slate-100 border border-slate-200 rounded-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="space-y-1.5"> 
                  <h3 className="text-lg font-bold text-slate-900 font-heading tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pt-1">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Divisions Cross-Navigation */}
          <div className="mt-20 pt-14 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-7 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue block">
                  Corporate &amp; Financial Division
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Accounting, Tax, ERP &amp; BPO Advisory
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explore our 8 core corporate consulting disciplines, including statutory audits, startup diagnostics, and offshore operations.
                </p>
              </div>
              <div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-primary-hover group"
                >
                  <span>Explore Advisory Services</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-7 bg-slate-50 border border-slate-200 rounded-md flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-green block">
                  Digital &amp; Creative Division
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Digital Marketing, Web Design &amp; Brand Studio
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Discover our creative capabilities, live client website builds, SEO campaigns, packaging design, and media production.
                </p>
              </div>
              <div>
                <Link
                  to="/marketing"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-primary-hover group"
                >
                  <span>Explore Digital &amp; Creative Suite</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
