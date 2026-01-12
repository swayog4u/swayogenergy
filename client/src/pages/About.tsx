import { motion } from "framer-motion";
import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Users, Shield, Briefcase, Building2, CheckCircle2, MapPin, Rocket } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

export default function About() {
  const strengths = [
    { title: "Technical Expertise", desc: "Strong technical knowledge and collective team experience." },
    { title: "Turnkey EPC", desc: "Comprehensive engineering, procurement, and construction." },
    { title: "Strategic Liaisoning", desc: "Expertise in land liaisoning and project identification." },
    { title: "25+ Yrs Experience", desc: "Cumulative expertise in solar, electrical, and thermal power." }
  ];

  const services = [
    "Consultancy for Open Access solar, electrical project land Liaisoning",
    "Solar Power Plant Design & Engineering",
    "Turnkey Solar Power Plant EPC",
    "Solar Plant operations and maintenance (Rooftop & Ground Mount)",
    "Consultancy for Project financing for PPA and EMI projects"
  ];

  const groupCompanies = [
    "Swayog Consultancy Services",
    "Swayog Energy Pvt. Ltd.",
    "Swayog Wattfin JV Pvt Ltd",
    "Wattfin Ventures Pvt Ltd, Nagpur"
  ];

  const teamMembers = [
    { name: "Yogesh G. Tayade", role: "Proprietor & Technical Head", image: "/images/img1.jpeg" },
    { name: "Gokul Girdhar", role: "Senior Engineer", image: "/images/gokul girdhar.jpeg" },
    { name: "Balaji", role: "Project Manager", image: "/images/balaji.jpeg" },
    { name: "Project Management Team", role: "Solar & Thermal Experts", image: "/images/img2.jpeg" },
    { name: "Installation Team", role: "Skilled Technicians", image: "/images/com.jpeg" },
    { name: "Technical Team", role: "Engineering Specialists", image: "/images/WhatsApp Image 2025-07-21 at 11.26.34.jpeg" }
  ];

  const locations = [
    { city: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
    { city: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
    { city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
    { city: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 },
    { city: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
    { city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867 },
    { city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
    { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/industrial.jpg')] bg-cover bg-center opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-display font-bold mb-6"
          >
            Swayog Consultancy Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl mx-auto font-medium"
          >
            Complete Solar Energy and Electrical Solutions Under One Roof.
          </motion.p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">About Our Company</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Expert Solutions for a Sustainable Future</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Swayog Consultancy Services is honored to introduce itself as a company that brings complete Solar energy and electrical solutions under one roof. We provide Solar Energy and electrical Solutions, on turnkey basis or only for selective scope of work for small as well as utility scale projects.
                </p>
                <p>
                  Established in year 2017, we have installed around 25 MW+ of solar projects. Our team consists of expert engineers, technicians, and consultants with cumulative 25+ years of experience in solar energy, electrical, thermal power, and other industries.
                </p>
              </div>
            </div>
            <div className="relative">
              <img src="/images/himgiri.jpeg" alt="Swayog Solar Installation" className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl shadow-xl text-white hidden md:block">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-sm font-medium uppercase tracking-wider">Years Collective Exp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Swayog Consultancy Services designs, develops, maintains and deploys Solar PV technology to produce high-value electricity for the betterment of mankind.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Continuously work to make the solar energy economical for Society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-16">Our Core Strengths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((s, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/50 transition-colors text-center group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-xl mb-3">{s.title}</h4>
                <p className="text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of 30+ experienced professionals manages project execution with maximum efficiency and technical excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-primary transition-colors">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md"></div>
                </div>
                <div className="text-center">
                  <h4 className="text-base md:text-lg font-bold mb-1">{member.name}</h4>
                  <p className="text-sm md:text-base text-primary font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Presence in India */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Our Presence in India</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Serving clients across multiple states with our solar energy solutions and expertise.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            <div className="relative bg-white rounded-2xl p-8 md:p-12 min-h-[400px]">
              {/* India Map Representation */}
              
              
              {/* Location List */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {locations.map((location, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:bg-primary/10 hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-primary/30"
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{location.city}</p>
                      <p className="text-xs text-gray-500">{location.state}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">8+</p>
                    <p className="text-sm text-gray-600">Cities</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">6+</p>
                    <p className="text-sm text-gray-600">States</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">25+</p>
                    <p className="text-sm text-gray-600">MW Installed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurship Motto */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/industrial.jpg')] bg-cover bg-center opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
                Our Company Motto
              </h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
                <p className="text-xl md:text-2xl leading-relaxed mb-6 font-medium">
                  <span className="text-3xl md:text-4xl font-bold block mb-4">
                    "Encouraging Entrepreneurship"
                  </span>
                  We believe in empowering individuals from every state across India to take charge of their future. 
                  Anyone, from any state, can partner with us to sell solar solutions in their area. 
                  We provide the support, training, and resources you need to grow with us and build a sustainable business.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <Users className="h-8 w-8 mx-auto mb-3" />
                    <h4 className="font-bold text-lg mb-2">Open to All</h4>
                    <p className="text-sm opacity-90">Anyone from any state can join us</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <Shield className="h-8 w-8 mx-auto mb-3" />
                    <h4 className="font-bold text-lg mb-2">Full Support</h4>
                    <p className="text-sm opacity-90">Training and resources provided</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <Rocket className="h-8 w-8 mx-auto mb-3" />
                    <h4 className="font-bold text-lg mb-2">Grow Together</h4>
                    <p className="text-sm opacity-90">Build your business with our help</p>
                  </div>
                </div>
                <div className="mt-8">
                 <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-gray-100 text-lg px-8 h-14 rounded-full font-bold shadow-2xl"
                      onClick={() => navigate("/contact")}
                    >
                      Join Our Network
                    </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Group Companies */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-secondary text-white p-12 rounded-[2rem] shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <Briefcase className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold">Our Services</h3>
              </div>
              <ul className="space-y-4">
                {services.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg opacity-90">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="companies" className="bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <Building2 className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold">Group Companies</h3>
              </div>
              <ul className="space-y-6">
                {groupCompanies.map((company, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl font-semibold text-gray-800">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {company}
                  </li>
                ))}
              </ul>
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-600 italic">
                  "Working together across different portfolios to provide the best support for solar power projects nationwide."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-8">
            Ready to Switch to Solar?
          </h2>
          <FreeQuoteModal>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 h-16 rounded-full font-bold shadow-2xl">
              Get Your Free Quote Today
            </Button>
          </FreeQuoteModal>
        </div>
      </section>
    </div>
  );
}
