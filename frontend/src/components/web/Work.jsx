import { CheckCircle, Code, Cpu, Zap, Layout, Server, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhatWeBuild = () => {
  const systems = [
    {
      icon: Layout,
      title: "Business Websites with Clear Purpose",
      description: "Strategic websites designed to convert visitors into customers, not just look pretty."
    },
    {
      icon: CheckCircle,
      title: "Booking & Client Management Systems",
      description: "Streamlined systems that automate scheduling, follow-ups, and client communication."
    },
    {
      icon: Server,
      title: "Internal Dashboards & Admin Tools",
      description: "Custom dashboards that provide real-time insights and simplify daily operations."
    },
    {
      icon: Zap,
      title: "Integrated Automation Tools",
      description: "Seamless connections between payment, email, CRM, and other essential business tools."
    },
    {
      icon: Cpu,
      title: "Scalable Foundations",
      description: "Future-proof architectures designed to grow with your business needs."
    },
    {
      icon: Code,
      title: "Functional Digital Systems",
      description: "Purpose-built solutions that support real business operations, not just technology."
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Screen Header */}
        <div className="hidden lg:block mb-24">
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-px bg-emerald-500"></div>
                <span className="text-sm font-medium text-emerald-600 uppercase tracking-widest">
                  Our Work
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-8 leading-tight">
                Get Digital systems
                <br />
                that actually work
              </h2>
              <p className="text-lg text-gray-600">
                We combine strategic thinking with practical technology to build digital systems that solve real business problems.
              </p>
            </div>
            
            <div className="pt-12">
              <p className="text-lg text-gray-600">
                We have worked with startups, SMEs, NGOs and enterprises across various industries, helping them leverage technology to streamline operations and enhance customer experiences.
              </p>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium group">
                  View our portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden mb-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What We Build
            </h2>
            
            
            <p className="text-gray-600 text-lg">
              Functional digital systems that support real business operations.
            </p>
          </div>
        </div>

        {/* Large Screen Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <div key={index} className="group relative">
                {/* Top Connector Line */}
                <div className="absolute -top-8 left-8 right-8 h-px bg-gray-100 group-hover:bg-emerald-200 transition-colors duration-300"></div>
                
                {/* Card */}
                <div className="relative h-full p-10 bg-white border border-gray-100 rounded-3xl hover:border-emerald-100 hover:shadow-2xl transition-all duration-500">
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 transform rotate-45 translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-10">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-10 h-10 rounded-2xl bg-white border border-gray-200 group-hover:border-emerald-200 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                        <Icon className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-emerald-600 leading-snug">
                      {system.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {system.description}
                    </p>
                  </div>
                  
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Grid */}
        <div className="lg:hidden">
          <div className="grid md:grid-cols-2 gap-6">
            {systems.map((system, index) => {
              const Icon = system.icon;
              return (
                <div key={index} className="group p-6 border border-gray-200 rounded-2xl hover:border-emerald-200 transition-colors">
                  <div className="relative mb-6">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {system.title}
                  </h3>
                  <p className="text-gray-600">
                    {system.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Large Screen Footer */}
        <div className="hidden lg:block mt-32 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-20">
            <div className="col-span-2">
              <p className="text-3xl text-gray-900 font-light">
                <span className="font-bold">Every system we build</span> starts with a simple question: 
                "What problem are we solving, and how can technology solve it better?"
              </p>
            </div>
            
            <div className="pt-8">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 font-medium">Digital A-Game</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            <span className="font-medium">Every system we build</span> starts with understanding the problem first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;