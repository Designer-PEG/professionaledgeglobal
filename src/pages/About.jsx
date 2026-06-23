import React from 'react';
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
    <>
      {/* Hero About Section */}
      <section id="about" className="py-28 bg-[#f8f8f6] mt-16 border-b border-slate-150 font-sans">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-3">
            <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Professional Edge Global
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              With over a decade of experience, we've helped hundreds of businesses transform their operations and achieve
              sustainable growth.
            </p>
          </div>

          {/* Founders Highlight Row */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
              <div className="relative border border-slate-200 bg-slate-950 group rounded-xl overflow-hidden shadow-md">
                <img
                  src={Suresh}
                  alt="Suresh Sharma, Founder"
                  className="w-full h-72 object-cover grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base font-semibold">Suresh Sharma</h4>
                  <p className="text-[10px] text-[#00a859] font-bold tracking-wider uppercase mt-0.5">Co-Founder & Director</p>
                </div>
              </div>
              
              <div className="relative border border-slate-200 bg-slate-950 group rounded-xl overflow-hidden shadow-md">
                <img
                  src={Damodar}
                  alt="Damodar Paudel, Founder"
                  className="w-full h-72 object-cover grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base font-semibold">Damodar Paudel</h4>
                  <p className="text-[10px] text-[#00a859] font-bold tracking-wider uppercase mt-0.5">Co-Founder & Consultant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote section */}
          <div className="max-w-2xl mx-auto py-8">
            <div className="relative text-center">
              <blockquote className="text-lg sm:text-xl font-light text-slate-700 leading-relaxed font-sans italic">
                "Leadership is the capacity to translate vision into reality."
                <footer className="mt-3 text-xs font-semibold tracking-wider text-[#0b4a93] uppercase font-sans not-italic">
                  — Founders, Suresh Sharma & Damodar Paudel
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Content Section */}
      <About_Section /> 

      {/* Our Team Section */}
      <section className="py-24 bg-white border-t border-slate-150 font-sans">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-3">
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
              Our Experts
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Meet Our Team
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Our dedicated team of professionals brings diverse expertise to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white border border-slate-200 rounded-lg transition-all duration-200 overflow-hidden h-full flex flex-col hover:shadow-md"
              >
                {/* Photo container */}
                <div className="h-64 overflow-hidden relative border-b border-slate-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                <div className="p-4 flex-grow flex flex-col justify-between"> 
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-bold text-[#00a859] tracking-wider uppercase mt-0.5 mb-2.5">
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
    </>
  );
};

export default About;