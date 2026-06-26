import React, { useEffect } from 'react';
import Suresh from '../assets/Suresh.png';
import Damodar from '../assets/Damodar.png';
import Shashank from '../assets/img/shashank.jpg';
import Jeshan from '../assets/img/Jeshan.png';
import Prakash from '../assets/img/Prakash.jpg';
import Bibek from '../assets/img/Bibek.jpg';
import Pujan from '../assets/img/Pujan.png';
import About_Section from '../components/About_Section';
import teamData from '../json/ourTeams.json';

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const teamMembers = teamData.map(member => {
    let image;
    switch(member.image) {
      case '../assets/Suresh.png': image = Suresh; break;
      case '../assets/Damodar.png': image = Damodar; break;
      case '../assets/img/shashank.jpg': image = Shashank; break;
      case '../assets/img/Jeshan.png': image = Jeshan; break;
      case '../assets/img/Prakash.jpg': image = Prakash; break;
      case '../assets/img/Bibek.jpg': image = Bibek; break;
      case '../assets/img/Pujan.png': image = Pujan; break;
      default: image = Suresh;
    }
    return { ...member, image };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header Section */}
      <section id="about" className="pt-36 pb-20 bg-slate-50 border-b border-slate-200/50 font-sans relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#cbd5e1/15,transparent_80%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Professional Edge Global
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-normal">
              With over a decade of experience, we've helped hundreds of businesses transform operations, manage compliance, and achieve sustainable growth.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full">
              {/* Suresh */}
              <div className="group relative border border-slate-200/80 bg-slate-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-102">
                <img
                  src={Suresh}
                  alt="Suresh Sharma, Founder"
                  className="w-full h-80 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="text-base font-extrabold tracking-tight font-heading">Suresh Sharma</h4>
                  <p className="text-[10px] text-brand-green font-bold tracking-widest uppercase mt-1">Co-Founder & Director</p>
                </div>
              </div>
              
              {/* Damodar */}
              <div className="group relative border border-slate-200/80 bg-slate-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-102">
                <img
                  src={Damodar}
                  alt="Damodar Paudel, Founder"
                  className="w-full h-80 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="text-base font-extrabold tracking-tight font-heading">Damodar Paudel</h4>
                  <p className="text-[10px] text-brand-green font-bold tracking-widest uppercase mt-1">Co-Founder & Consultant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Founders Quote Card */}
          <div className="max-w-2xl mx-auto mt-16 p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl text-center shadow-xs">
            <blockquote className="text-base sm:text-lg font-normal text-slate-600 leading-relaxed font-sans italic">
              "Leadership is the capacity to translate vision into reality."
            </blockquote>
            <p className="mt-4 text-[10px] font-bold tracking-widest text-brand-blue uppercase font-sans">
              — Suresh Sharma & Damodar Paudel
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Vision, Mission & Goals Sections */}
      <About_Section /> 

      {/* Dedicated Experts Section */}
      <section className="py-28 bg-white font-sans relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center mb-20 space-y-4">
            <span className="px-3.5 py-1 bg-slate-50 border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
              Our Experts
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Meet Our Team
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Our dedicated team of professionals brings diverse expertise to deliver exceptional operations coaching and compliance support.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white border border-slate-200/80 rounded-xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-brand-blue/30 hover:shadow-lg hover-lift"
              >
                {/* Photo container */}
                <div className="h-64 overflow-hidden relative bg-slate-950">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                </div>
                
                {/* Profile detail details */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4"> 
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[9px] font-bold text-brand-green tracking-widest uppercase mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;