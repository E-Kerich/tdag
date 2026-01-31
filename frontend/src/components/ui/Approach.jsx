import { CheckCircle } from "lucide-react";

const Approach = () => {
  const principles = [
    {
      icon: CheckCircle,
      title: "Problem First",
      description: "We start by understanding your unique challenges before designing solutions."
    },
    {
      icon: CheckCircle,
      title: "Workflow Native",
      description: "Systems designed around how you actually work, not generic templates."
    },
    {
      icon: CheckCircle,
      title: "Purposeful Tech",
      description: "Technology implemented only where it creates tangible value and solves real problems."
    },
    {
      icon: CheckCircle,
      title: "Clarity Focused",
      description: "Complex ideas translated into simple, actionable steps you can implement."
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column - Title */}
          <div className="lg:w-2/5">
            <div className="sticky top-20">
              <div className="mb-8">
                <div className="w-20 h-px bg-emerald-500 mb-4"></div>
                <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                  Our Approach
                </span>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
                How We Work
              </h2>
              <p className="text-gray-600 text-lg">
                We believe in practical, intentional technology that serves your goals, not the other way around.
              </p>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  The Digital A-Game exists to bring clarity and structure to digital work.
                </p>
              </div>

              <img 
                src="/assets/team.jpg"
                alt="Approach Illustration"
                className="mt-10 w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Column - Principles */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 gap-8">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="group">
                    <div className="flex items-start gap-6">
                      {/* Icon Container */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative w-14 h-14 rounded-lg bg-white border border-gray-200 group-hover:border-emerald-200 flex items-center justify-center transition-all duration-300">
                            <Icon className="w-6 h-6 text-gray-700 group-hover:text-emerald-600 transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {principle.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Divider (except last) */}
                    {index < principles.length - 1 && (
                      <div className="mt-8 pt-8 border-t border-gray-100"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700">
                <span className="font-medium">Our promise:</span> We treat every project with the same commitment to clarity, practicality, and meaningful results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;

