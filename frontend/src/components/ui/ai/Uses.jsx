import { Cpu, MessageSquare, Brain, BarChart3, ChevronLeft, ChevronRight, TicketCheck } from "lucide-react";
import { useState } from "react";

const AIUseCases = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const useCases = [
    {
      icon: Cpu,
      title: "AI for Operations",
      description: "Automate repetitive tasks and reduce manual work.",
      features: [
        "Document handling",
        "Scheduling & workflows",
        "Internal knowledge access"
      ],
      outcome: "More time for high-value work.",
      color: "emerald"
    },
    {
      icon: MessageSquare,
      title: "AI for Marketing & Content",
      description: "Use AI to support consistency and insight, not replace thinking.",
      features: [
        "Content planning & drafting",
        "Customer insights",
        "Messaging alignment"
      ],
      outcome: "Faster execution, clearer messaging.",
      color: "emerald"
    },
    {
      icon: Brain,
      title: "AI for Customer Support",
      description: "Improve responsiveness without losing the human touch.",
      features: [
        "AI-assisted responses",
        "Knowledge-based support",
        "First-level automation"
      ],
      outcome: "Better service, less burnout.",
      color: "emerald"
    },
    {
      icon: BarChart3,
      title: "AI for Decision-Making",
      description: "Turn information into usable insight.",
      features: [
        "Data summarization",
        "Scenario analysis",
        "Pattern recognition"
      ],
      outcome: "More confident, informed decisions.",
      color: "emerald"
    }
  ];

  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      iconBg: "bg-emerald-500",
      text: "text-emerald-700",
      dot: "bg-emerald-500"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconBg: "bg-blue-500",
      text: "text-blue-700",
      dot: "bg-blue-500"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      iconBg: "bg-purple-500",
      text: "text-purple-700",
      dot: "bg-purple-500"
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconBg: "bg-amber-500",
      text: "text-amber-700",
      dot: "bg-amber-500"
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === useCases.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? useCases.length - 1 : prev - 1));
  };

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-4">
        
            <span className="text-sm font-medium text-gray-700">Real Use Cases</span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practical AI applications delivering tangible value across different business functions.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const colors = colorMap[useCase.color];
            
            return (
              <div 
                key={index}
                className={`${colors.bg} rounded-xl border ${colors.border} p-6 transition-transform hover:scale-[1.02] duration-300`}
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-5">
                  
                  <h3 className="text-lg font-bold text-gray-900">{useCase.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{useCase.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {useCase.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className={`pt-5 border-t ${colors.border}`}>
                  <p className="text-sm text-gray-500 mb-1">Outcome</p>
                  <p className={`font-semibold ${colors.text}`}>{useCase.outcome}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                const colors = colorMap[useCase.color];
                
                return (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className={`${colors.bg} rounded-xl border ${colors.border} p-6`}>
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 mb-5">
                        
                        <h3 className="text-lg font-bold text-gray-900">{useCase.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6">{useCase.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {useCase.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Outcome */}
                      <div className={`pt-5 border-t ${colors.border}`}>
                        <p className="text-sm text-gray-500 mb-1">Outcome</p>
                        <p className={`font-semibold ${colors.text}`}>{useCase.outcome}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-emerald-500 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All use cases focus on practical implementation and measurable business value
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIUseCases;