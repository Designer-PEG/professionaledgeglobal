import Suresh from '../assets/Suresh.png';
import Damodar from '../assets/Damodar.png';
import Shashank from '../assets/img/shashank.jpg';
import Jeshan from '../assets/img/Jeshan.png';
import Prakash from '../assets/img/Prakash.jpg';
import Bibek from '../assets/img/Bibek.jpg';
import Pujan from '../assets/img/Pujan.png';
import About_Section from '../components/About_Section';
import teamData from '../json/ourTeams.json'; // Import the JSON data

const About = () => {
  // Map image imports to team data
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
      <section id="about" className="py-24 bg-slate-50 mt-16 border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 font-poppins">
              Professional Edge Global
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              With over a decade of experience, we've helped hundreds of businesses transform their operations and achieve
              sustainable growth.
            </p>
          </div>

          {/* Founders Highlight Row */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900 group">
                <img
                  src={Suresh}
                  alt="Suresh Sharma, Founder"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h4 className="text-lg font-bold">Suresh Sharma</h4>
                  <p className="text-xs text-blue-300 font-semibold tracking-wider uppercase mt-0.5">Co-Founder & Director</p>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900 group">
                <img
                  src={Damodar}
                  alt="Damodar Paudel, Founder"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h4 className="text-lg font-bold">Damodar Paudel</h4>
                  <p className="text-xs text-blue-300 font-semibold tracking-wider uppercase mt-0.5">Co-Founder & Consultant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote section with custom quotation marks */}
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 text-center bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              {/* Top-left quotation mark */}
              <div className="absolute top-4 left-6 text-slate-100 text-8xl font-serif select-none pointer-events-none">“</div>
              {/* Bottom-right quotation mark */}
              <div className="absolute bottom-[-20px] right-6 text-slate-100 text-8xl font-serif select-none pointer-events-none">”</div>
              
              <blockquote className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed font-poppins italic z-10 relative md:px-8">
                "Leadership is the capacity to translate vision into reality."
                <footer className="mt-4 text-sm font-bold tracking-wider text-slate-500 uppercase font-poppins not-italic">
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
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Our Experts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 font-poppins">
              Meet Our Team
            </h2>
            <p className="text-slate-500 text-md max-w-xl mx-auto mt-3">
              Our dedicated team of professionals brings diverse expertise to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col"
              >
                {/* Photo container with scale effect */}
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle shadow gradient overlay to ground the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between"> 
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 font-poppins">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
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
  )
}

export default About