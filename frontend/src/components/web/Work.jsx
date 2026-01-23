import { CheckCircle, Code, Cpu, Zap, Layout, Server } from "lucide-react";

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
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            What we build
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This service focuses on designing and developing functional digital systems that support real business operations.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <div
                key={index}
                className="group relative p-8 border border-gray-200 rounded-2xl hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {system.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {system.description}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default WhatWeBuild;