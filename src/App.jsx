
import React, { useState } from "react";
import mayaProfile from "./images/maya_profile.jpeg";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="font-sans bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-30 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href="#home" className="flex items-center gap-2">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Aerovacare Logo" className="h-8 w-8 object-contain" />
                <span className="font-bold text-xl text-blue-800">Aerovacare</span>
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-blue-800 hover:text-blue-600 font-medium transition">Home</a>
              <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition">About Us</a>
              <a href="#about-tb" className="text-blue-800 hover:text-blue-600 font-medium transition">About TB</a>
              <a href="#redcross" className="text-blue-800 hover:text-blue-600 font-medium transition">Redcross Partnership</a>
              <a href="#contact" className="text-blue-800 hover:text-blue-600 font-medium transition">Contact Us</a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setNavOpen(!navOpen)}
                className="text-blue-800 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {navOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
            <div className="flex flex-col px-4 py-4 space-y-2">
              <a href="#home" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Home</a>
              <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>About Us</a>
              <a href="#about-tb" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>About TB</a>
              <a href="#redcross" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Redcross Partnership</a>
              <a href="#contact" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Contact Us</a>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400">
        <div className="flex-1 flex flex-col items-center md:items-start justify-center z-10 py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Aerovacare Medical 
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl text-blue-100 font-medium drop-shadow">
            Advancing TB Care, Empowering Healthier Communities
          </h2>
          <p className="mt-6 text-lg md:text-xl text-blue-50 bg-blue-900 bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl">
            Aerovacare is dedicated to providing expert medical , specializing in tuberculosis (TB) management, prevention, and treatment strategies. We partner with organizations and communities to deliver innovative, evidence-based solutions for a TB-free world.
          </p>
          <a href="#contact" className="mt-8 inline-block bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition">
            Contact Us
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center relative py-12">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <img
              src="https://www.tballiance.org/wp-content/uploads/2025/01/Transforming_01_NOBG.png"
              alt="Medical  Team"
              className="rounded-3xl shadow-2xl w-full h-full object-cover border-4 border-white bg-white"
            />
            <img
              src="https://www.tballiance.org/wp-content/uploads/2025/01/Delivering-Treatments_03_NOBG.png"
              alt="TB Awareness"
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-xl border-4 border-white shadow-xl object-cover bg-white"
              style={{zIndex:2}}
            />
            <img
              src="https://www.tballiance.org/wp-content/uploads/2025/01/Charting-the-Course_01-NOBG-1.png"
              alt="Healthcare Collaboration"
              className="absolute -top-8 -left-8 w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover bg-white"
              style={{zIndex:2}}
            />
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section id="about" className="py-20 bg-white px-6 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://www.tballiance.org/wp-content/uploads/2025/01/100K-85_graphic-01.png"
          alt="About Aerovacare"
          className="rounded-xl shadow-2xl border-4 border-blue-100 bg-white"
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-800">About Us</h2>
          <p className="mt-4 text-gray-700 text-lg">
            Aerovacare is a medical  organization focused on combating tuberculosis (TB) and other infectious diseases. Our multidisciplinary team collaborates with healthcare providers, NGOs, and governments to implement best practices in TB diagnosis, treatment, and prevention.
          </p>
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
            <p className="mt-2 text-gray-700">
              To advance global health by delivering innovative TB solutions, supporting research, and empowering communities for a TB-free future.
            </p>
          </div>
        </div>
      </section>
      {/* About TB Section */}
      <section id="about-tb" className="py-20 bg-blue-50 px-6 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">About Tuberculosis (TB)</h2>
          <p className="text-gray-700 text-lg">
            Tuberculosis (TB) is a serious infectious disease that primarily affects the lungs but can impact other parts of the body. Despite being preventable and curable, TB remains a leading cause of death worldwide. Aerovacare is committed to raising awareness, supporting early diagnosis, and ensuring access to effective TB treatments for all.
          </p>
          <ul className="mt-6 list-disc list-inside text-blue-800 text-lg">
            <li>Global pandemic: 1.3 million deaths annually</li>
            <li>Early detection and treatment save lives</li>
            <li>Community education and support are vital</li>
          </ul>
        </div>
        <img
          src="https://www.tballiance.org/wp-content/uploads/2025/04/ITE.png"
          alt="About TB"
          className="rounded-xl shadow-2xl border-4 border-blue-100 bg-white"
        />
      </section>
      {/* Redcross Partnership Section */}
      <section id="redcross" className="py-20 bg-white px-6 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80"
          alt="Medical  Team Meeting"
          className="rounded-xl shadow-2xl border-4 border-red-200 bg-white p-4 object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-red-700 mb-4">Redcross Partnership</h2>
          <p className="text-gray-700 text-lg">
            Aerovacare proudly partners with the Red Cross to expand access to TB care and prevention. Together, we deliver community outreach, training for healthcare workers, and support for vulnerable populations. Our collaboration strengthens the fight against TB and improves health outcomes worldwide.
          </p>
          <ul className="mt-6 list-disc list-inside text-red-700 text-lg">
            <li>Joint TB awareness campaigns</li>
            <li>Mobile clinics and community screenings</li>
            <li>Capacity building for local health systems</li>
          </ul>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profiles" className="py-20 bg-blue-50 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Maya Chitor */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <img src={mayaProfile} alt="Maya Chitor" className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg mb-4 object-cover" />
            <h3 className="text-2xl font-bold text-blue-900">Maya Chitor</h3>
            <p className="text-blue-700 font-medium mb-2">maya.chitor@gmail.com</p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              Hey everyone! My name is Maya Chitor and I’m a junior at BASIS Independent Fremont. I’m someone who is interested in research and medicine and I absolutely love making a difference in my community! For that reason, I have helped found this initiative and look forward to expanding its outreach to a larger audience throughout the nation. By doing so, I hope to grow tuberculosis awareness and educate others on related medical knowledge and relevant findings. Going forward, I will be putting in my full passion into these efforts.
            </p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              In the past few years, I have presented synthetic biology research (Developing Lipopeptides as a Bioactive against Drug Resistant Fungi) at the ACS and SCCUR conferences. This summer, I completed the Pre-Med summer program for high schoolers at University of Pennsylvania to gain a greater exposure to medicine. At school, I lead the BIF Science Olympiad team and Art Club. I am also an active member of Red Cross Club, Key Club, USABO, and have the sufficient knowledge that would benefit me in this initiative.
            </p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              I’m beyond excited to collaborate with everyone here, and also to meet new people that would help along this journey.
            </p>
          </div>
          {/* Srikshita Solipuram */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Srikshita Solipuram" className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg mb-4 object-cover" />
            <h3 className="text-2xl font-bold text-blue-900">Srikshita Solipuram</h3>
            <p className="text-blue-700 font-medium mb-2">srikshita@gmail.com</p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              Hello! My name is Srikshita Solipuram, a high school junior who is passionate about learning, leadership, and most importantly, giving back to my community. I believe these aspects have driven me to take part in this initiative.
            </p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              At school, I participate in clubs such as Speech and Debate, where I have learned fundamental public speaking skills; Future Business Leaders of America (FBLA), which has taught me crucial presentation skills; and Science Fair, where I have enhanced my understanding of biological sciences. These experiences allowed me to be better equipped when communicating with my peers and teachers. Beyond academics, I volunteer with the Red Cross Youth Campaign, Trenton Soup Kitchen, and Capital Health Hospital, where I've gained insight into compassionate, communicative, and effective healthcare. These volunteer endeavours have allowed me to gain more knowledge of true aspects of leadership, becoming more community-minded, and deepened my commitment to making a meaningful impact - especially in raising awareness about tuberculosis and improving lives through advocacy and service.
            </p>
            <p className="text-gray-700 text-base mt-2 text-justify">
              I am extremely grateful to take part in this enterprise, in the hope that it will expand across the nation, and I am honored to have the opportunity to cooperate with everyone.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-6 lg:px-20 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Contact Us
        </h2>
        <div className="mt-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <form className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full font-semibold"
            >
              Send Message
            </button>
          </form>
          <div className="flex flex-col justify-center bg-blue-100 p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Contact Details</h3>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Email:</span> info@aerovacare.com</p>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Phone:</span> +91 98765 43210</p>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Address:</span> 38803 Altura Street, Fremont CA 94536</p>
            <div className="mt-6">
              <h4 className="font-semibold text-blue-700 mb-2">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-80"><img src="https://img.icons8.com/ios-filled/30/4a90e2/linkedin.png" alt="LinkedIn" /></a>
                <a href="#" className="hover:opacity-80"><img src="https://img.icons8.com/ios-filled/30/4a90e2/twitterx--v2.png" alt="Twitter" /></a>
                <a href="#" className="hover:opacity-80"><img src="https://img.icons8.com/ios-filled/30/4a90e2/facebook-new.png" alt="Facebook" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Aerovacare Medical. All rights reserved.</p>
      </footer>
    </div>
  );
}
