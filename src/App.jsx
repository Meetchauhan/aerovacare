
import React, { useState } from "react";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="font-sans bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-30 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2">
                <img src="https://cdn.worldvectorlogo.com/logos/aerovacare.svg" alt="aerovacare Logo" className="h-8 w-8 object-contain" onError={e => {e.target.onerror=null;e.target.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png';}} />
                <span className="font-bold text-xl text-blue-800">Aerovacare</span>
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-800 hover:text-blue-600 font-medium transition">Home</a>
              <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition">About</a>
              <a href="#services" className="text-blue-800 hover:text-blue-600 font-medium transition">Services</a>
              {/* <a href="#partners" className="text-blue-800 hover:text-blue-600 font-medium transition">Partners</a> */}
              <a href="#testimonials" className="text-blue-800 hover:text-blue-600 font-medium transition">Testimonials</a>
              <a href="#contact" className="text-blue-800 hover:text-blue-600 font-medium transition">Contact</a>
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
              <a href="#" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Home</a>
              <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>About</a>
              <a href="#services" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Services</a>
              {/* <a href="#partners" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Partners</a> */}
              <a href="#testimonials" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Testimonials</a>
              <a href="#contact" className="text-blue-800 hover:text-blue-600 font-medium transition" onClick={()=>setNavOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
      {/* Hero Section */}
  <section
        className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"
      >
        <div className="flex-1 flex flex-col items-center md:items-start justify-center z-10 py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Aerovacare Consultancy
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl text-blue-100 font-medium drop-shadow">
            Guiding Your Success, Empowering Your Growth
          </h2>
          <p className="mt-6 text-lg md:text-xl text-blue-50 bg-blue-900 bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl">
            Unlock your business potential with expert advice, strategic planning, and hands-on support. We help you navigate challenges, seize opportunities, and achieve sustainable growth.
          </p>
          <a href="#contact" className="mt-8 inline-block bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition">
            Book a Free Consultation
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center relative py-12">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600&q=80"
              alt="Consultancy Team"
              className="rounded-3xl shadow-2xl w-full h-full object-cover border-4 border-white"
            />
            <img
              src="https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg?auto=compress&w=400&q=80"
              alt="Business Meeting"
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-xl border-4 border-white shadow-xl object-cover bg-white"
              style={{zIndex:2}}
            />
            <img
              src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&w=400&q=80"
              alt="Strategy Discussion"
              className="absolute -top-8 -left-8 w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover bg-white"
              style={{zIndex:2}}
            />
          </div>
        </div>
      </section>

  {/* About Section */}
  <section id="about" className="py-20 bg-white px-6 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=800&q=80"
          alt="Consultancy"
          className="rounded-xl shadow-2xl border-4 border-blue-100"
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-800">About Aerovacare</h2>
          <p className="mt-4 text-gray-700 text-lg">
            Aerovacare is a leading consultancy firm dedicated to empowering businesses and individuals. Our team of seasoned experts brings years of experience in strategy, operations, and leadership development. We believe in building lasting partnerships and delivering actionable solutions tailored to your unique needs.
          </p>
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
            <p className="mt-2 text-gray-700">
              To inspire growth, drive innovation, and create sustainable value for our clients through expert guidance and unwavering support.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-blue-800">Why Choose Aerovacare?</h2>
        <div className="mt-10 grid md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
              title: "Proven Expertise",
              desc: "Decades of combined experience across industries."
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
              title: "Client-Centric Approach",
              desc: "Personalized solutions for every client."
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              title: "Innovative Solutions",
              desc: "Cutting-edge strategies for modern challenges."
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
              title: "Trusted Results",
              desc: "A track record of measurable success."
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center">
              <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

  {/* Services Section */}
  <section id="services" className="bg-gray-50 py-20 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Our Consultancy Services
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Business Strategy",
              img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=800&q=80",
              desc: "Tailored strategies to position your business for long-term success and resilience.",
            },
            {
              title: "Operational Consulting",
              img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800&q=80",
              desc: "Optimize your processes for maximum efficiency, productivity, and profitability.",
            },
            {
              title: "Leadership Coaching",
              img: "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&w=800&q=80",
              desc: "Develop leadership skills to inspire, motivate, and guide high-performing teams.",
            },
            {
              title: "Digital Transformation",
              img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=800&q=80",
              desc: "Leverage technology to drive innovation and streamline operations.",
            },
            {
              title: "Market Research",
              img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=800&q=80",
              desc: "In-depth analysis to identify opportunities and inform decision-making.",
            },
            {
              title: "Change Management",
              img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=800&q=80",
              desc: "Smooth transitions and lasting adoption for organizational change initiatives.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-blue-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 flex-1">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  {/* Partners Section */}
  {/* <section id="partners" className="py-12 bg-white px-6 lg:px-20">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-8">Our Trusted Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[
            "https://cdn.worldvectorlogo.com/logos/microsoft.svg",
            "https://cdn.worldvectorlogo.com/logos/accenture-2.svg",
            "https://cdn.worldvectorlogo.com/logos/ibm.svg",
            "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
            "https://cdn.worldvectorlogo.com/logos/deloitte-1.svg",
          ].map((logo, idx) => (
            <img key={idx} src={logo} alt="Partner Logo" className="h-10 md:h-14 grayscale hover:grayscale-0 transition bg-white p-2 rounded" />
          ))}
        </div>
      </section> */}

  {/* Testimonials Section */}
  <section id="testimonials" className="py-16 bg-white px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          What Our Clients Say
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Singh – CEO, Innovatech",
              quote:
                "Aerovacare's insights transformed our business strategy overnight.",
            },
            {
              name: "Rahul Mehta – Founder, GreenLeaf",
              quote:
                "Operational efficiency skyrocketed within weeks of working with them.",
            },
            {
              name: "Ananya Patel – Manager, SunPower",
              quote:
                "The leadership coaching was a game-changer for our team dynamics.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <p className="italic">“{t.quote}”</p>
              <p className="mt-4 font-semibold text-blue-800">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Our Process
        </h2>
        <div className="mt-10 grid md:grid-cols-4 gap-8 text-center">
          {[
            { step: "1. Discover", desc: "Assess your challenges and goals." },
            { step: "2. Strategize", desc: "Create a tailored roadmap." },
            { step: "3. Execute", desc: "Hands-on guidance every step." },
            { step: "4. Optimize", desc: "Ensure lasting impact and efficiency." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-800">{item.step}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog / Insights Section */}
      <section className="py-16 bg-white px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Insights & Resources
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "5 Steps to Strengthen Business Strategy",
              img: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&w=800&q=80",
            },
            {
              title: "Operational Hacks for Sustainable Growth",
              img: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&w=800&q=80",
            },
            {
              title: "Building Effective Leadership Teams",
              img: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&w=800&q=80",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">
                  {post.title}
                </h3>
                <a
                  href="#"
                  className="text-blue-600 hover:underline mt-4 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-20 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center text-blue-800">
          Get in Touch
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
            <p className="mb-2 text-gray-700"><span className="font-semibold">Address:</span> 123, Business Avenue, Mumbai, India</p>
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
        <p>© {new Date().getFullYear()} Aerovacare Consultancy. All rights reserved.</p>
      </footer>
    </div>
  );
}
