import { Code, Target, Cpu, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {

  
  const services = [
    {
      icon: Code,
      title: "Digital Systems & Web Development",
      description: "We design and build digital systems, not just websites. From business websites and dashboards to internal tools and workflows, everything we build is designed to support real goals and long-term growth.",
      outcome: "Structure, clarity, and scalability.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070",
      cta: "Build Your System",
      link: "/services/web-design"
    },
    {
      icon: Target,
      title: "Digital Strategy & Marketing",
      description: "Most digital problems are not execution problems, they're strategy problems. We help businesses move from scattered online activity to focused, intentional digital strategies that make sense and deliver results.",
      outcome: "Direction, consistency, and measurable progress.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
      cta: "Contact Us",
      link: "/contact"
    },
    {
      icon: Cpu,
      title: "AI for Business (Practical, Not Technical)",
      description: "AI shouldn't feel intimidating or experimental. We help organizations understand where AI actually fits, from automation and operations to decision-making and customer support, without needing technical expertise.",
      outcome: "Efficiency, leverage, and smarter systems.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070",
      cta: "Explore AI Solutions",
      link: "/ai-business"

    },
    {
      icon: BookOpen,
      title: "Digital Literacy & Clarity",
      description: "Understanding the digital world is no longer optional. Through articles, guides, and learning resources, we help people understand how digital tools, platforms, and systems actually work, responsibly and confidently.",
      outcome: "Informed decisions, not blind adoption.",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2070",
      cta: "Learn With Us",
      link: "/shop"
    }
  ];

  return (
    <section className="py-5 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
            
            <span className="text-sm font-medium text-emerald-300">Core Pillars</span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold mb-6">
            <span className="text-white">What We </span>
            <span className="text-emerald-400">Do</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Four pillars that define our approach to helping businesses thrive in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                  </div>
                  
                  
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Outcome */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 rounded-xl border border-emerald-500/20">
                    <p className="text-sm text-emerald-300 font-medium">Outcome:</p>
                    <p className="text-lg text-white mt-1">{service.outcome}</p>
                  </div>

                  {/* CTA Button */}
                  <Link
                      to={service.link}
                      className="inline-flex items-center gap-3 text-white font-light hover:scale-105 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {service.cta}
                    </Link>

                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mt-4">
            All four pillars work together to deliver comprehensive digital excellence
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;