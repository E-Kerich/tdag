import { Target, Clock, Cpu, Zap, CheckCircle } from "lucide-react";

const Philosophy = () => {
  const principles = [
    {
      icon: Target,
      title: "Start with the problem, not the tool",
      description: "We identify real business challenges first, then determine if and how AI can provide a genuine solution."
    },
    {
      icon: Clock,
      title: "Focus on clarity before automation",
      description: "Clear processes and understanding come before automation. AI should enhance, not obscure."
    },
    {
      icon: Cpu,
      title: "Integrate AI into existing processes",
      description: "We seamlessly weave AI into your current workflows, minimizing disruption and maximizing adoption."
    },
    {
      icon: Zap,
      title: "Prioritize usefulness over novelty",
      description: "Practical applications that deliver tangible results take precedence over flashy, impractical features."
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Philosophy Statement */}
          <div>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Our Philosophy</span>
            </div>

            {/* Main Statement */}
            <h2 className="text-2xl md:text-4xl font-semibold mb-6">
              <span className="text-gray-900">We treat AI as</span>
              <br />
              <span className="text-emerald-600">infrastructure, not a shortcut.</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              At The Digital A-Game, we approach AI the same way we approach digital systems:
            </p>

            {/* Core Principle Summary */}
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg text-gray-800">
                    If AI doesn't save time, improve outcomes, or reduce friction, we don't recommend it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Principles Grid */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div 
                    key={index}
                    className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300"
                  >
                    {/* Animated Corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500 transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    </div>

                    

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>

                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;