import { Target, Settings, Cpu, Users, ArrowRight } from "lucide-react";

const WhatWeDo = () => {
  const services = [
    {
      icon: Target,
      title: "AI Strategy & Use-Case Discovery",
      description: "We help you identify where AI genuinely fits in your business — and where it doesn’t.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      color: "emerald"
    },
    {
      icon: Settings,
      title: "AI Tools Selection & Setup",
      description: "We recommend and configure tools based on your needs, not trends.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
      color: "blue"
    },
    {
      icon: Cpu,
      title: "Workflow Integration",
      description: "AI works best when embedded into systems you already use.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      color: "purple"
    },
    {
      icon: Users,
      title: "Team Orientation (Non-Technical)",
      description: "We help teams understand and adopt AI responsibly, without jargon or overwhelm.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      color: "amber"
    }
  ];

  return (
    <section className="py-5 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
        
            <span className="text-sm font-medium text-gray-700">Our Approach</span>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practical steps to implement AI effectively in your business operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-500"
              >
                {/* Image Background */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                  </div>
                  
                  {/* Icon Overlay */}
                  

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Number Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                      <div className="w-8 h-px bg-gray-300"></div>
                    </div>
                    <div className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 rounded-2xl pointer-events-none transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-semibold text-lg rounded-xl hover:bg-emerald-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Your AI Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-gray-500 text-sm mt-4">
            All services include ongoing support and optimization
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;