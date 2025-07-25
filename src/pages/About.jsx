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
      <section id="about" className="py-20 bg-gray-50 mt-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Professional Edge Global</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over a decade of experience, we've helped hundreds of businesses transform their operations and achieve
              sustainable growth.
            </p>
          </div>

          {/* Images row */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-8 max-w-2xl">
              <img
                src={Suresh}
                alt="Suresh Sharma, Founder"
                className="w-[300px] h-auto rounded-lg shadow-lg object-cover"
              />
              <img
                src={Damodar}
                alt="Damodar Paudel, Founder"
                className="w-[300px] h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Quote section with both quotation marks */}
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 text-center">
              {/* Top-left quotation mark */}
              <div className="absolute top-0 left-0 text-gray-300 text-6xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              {/* Bottom-right quotation mark */}
              <div className="absolute bottom-0 right-0 text-gray-300 text-6xl transform rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <blockquote className="text-2xl italic text-gray-700 md:px-12 mt-6">
                "Leadership is the capacity to translate vision into reality."
                <footer className="mt-4 text-xl font-semibold text-gray-800">
                  Founders - Suresh Sharma & Damodar Paudel
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Content Section */}
      <About_Section /> 

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals brings diverse expertise to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover mb-4"
                />
                <div className='pt-2 px-6 pb-4'> 
                  <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-lg text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
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