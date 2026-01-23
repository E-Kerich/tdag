import React, { useState } from "react";
import {
  Search,
  Layers,
  Code,
  RefreshCw,
  Rocket,
  Shield,
  ArrowRight,
  ArrowLeft,
  Target,
  CheckCircle,
  Zap,
  Users,
  Wrench,
  ChevronRight,
  Globe,
  Server,
  CreditCard,
  Mail,
  BarChart,
  Key,
  DollarSign,
} from "lucide-react";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "Strategic Clarity Session (1 Hour)",
      purpose: "Before anything is built, we understand the business.",
      icon: Search,
      color: "bg-blue-50 text-blue-600",
      image: "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769073755/2903846_p1e52c.jpg",
      items: [
        "We discuss how your business currently operates",
        "Identify friction points and inefficiencies",
        "Clarify what must work vs what is optional",
        "Define what technology should solve — and what it shouldn't",
      ],
      outcome:
        "Clear problem definition, system-level solution direction, alignment on scope, priorities, and expectations",
      highlight: "This session saves time, money, and misalignment.",
    },
    {
      number: "02",
      title: "Requirements",
      subtitle: "Setting the Foundation",
      purpose: "Ensure the project is realistic and sustainable.",
      icon: Layers,
      color: "bg-purple-50 text-purple-600",
      image: "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769073749/2096509_i3w83x.jpg",
      items: [
        "Domain and hosting (frontend & backend)",
        "Required third-party tools (payments, email, analytics, etc.)",
        "Access credentials where applicable",
        "Expected monthly operational costs",
        "Success metrics and scope boundaries",
      ],
      outcome: "Transparency at this stage prevents surprises later.",
      highlight: "",
    },
    {
      number: "03",
      title: "Design & Development",
      subtitle: "Building the System",
      purpose: "Turn strategy into a working digital system.",
      icon: Code,
      color: "bg-emerald-50 text-emerald-600",
      image: "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769073751/4380747_ernvdz.jpg",
      items: [
        "System architecture planning",
        "UX/UI design based on real user flows",
        "Frontend and backend development",
        "Tool and API integrations",
        "Performance and security considerations",
      ],
      outcome:
        "We prioritize: Clarity over cleverness, Function over aesthetics, Scalability over shortcuts",
      highlight: "",
    },
    {
      number: "04",
      title: "Revisions",
      subtitle: "Refinement, Not Rework",
      purpose: "Improve, not restart.",
      icon: RefreshCw,
      color: "bg-amber-50 text-amber-600",
      image: "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769073752/6895824_lafumq.jpg",
      items: [
        "Feedback-driven refinements",
        "Usability improvements",
        "Fixing edge cases from testing",
      ],
      outcome:
        "Because discovery was done properly, revisions stay controlled and efficient.",
      highlight: "",
    },
    {
      number: "05",
      title: "Deployment",
      subtitle: "Going Live Properly",
      purpose: "Launch with confidence.",
      icon: Rocket,
      color: "bg-red-50 text-red-600",
      image: "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769073754/Wavy_Tech-22_Single-06_ofi4s5.jpg",
      items: [
        "Production environment setup",
        "Hosting and domain configuration",
        "Security and performance checks",
        "Final testing before launch",
      ],
      outcome: "Your system goes live stable, secure, and usable.",
      highlight: "",
    },
    {
      number: "06",
      title: "Maintenance",
      subtitle: "Long-Term Reliability",
      purpose: "Keep the system healthy as the business evolves.",
      icon: Shield,
      color: "bg-indigo-50 text-indigo-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Updates and fixes",
        "Performance monitoring",
        "Minor enhancements",
        "Ongoing technical support",
      ],
      outcome:
        "Maintenance is optional, but recommended for long-term value.",
      highlight: "",
    },
  ];

  const ActiveIcon = steps[activeStep].icon;
  const activeStepData = steps[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // For requirements step, show specific icons
  const getRequirementIcons = () => {
    if (activeStep !== 1) return null;
    
    const requirementIcons = [
      { icon: Globe, label: "Domain & Hosting", color: "bg-blue-100 text-blue-600" },
      { icon: CreditCard, label: "Payments", color: "bg-green-100 text-green-600" },
      { icon: Mail, label: "Email", color: "bg-amber-100 text-amber-600" },
      { icon: BarChart, label: "Analytics", color: "bg-purple-100 text-purple-600" },
      { icon: Key, label: "Credentials", color: "bg-red-100 text-red-600" },
      { icon: DollarSign, label: "Costs", color: "bg-emerald-100 text-emerald-600" },
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {requirementIcons.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg">
            <div className={`p-2 rounded-lg ${item.color} mb-2`}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-xs text-center text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-5 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-6">
            <span className="text-sm font-medium text-emerald-700">
              Our Process
            </span>
          </div>
          
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            A structured approach to building digital systems that actually work for your business.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Steps */}
            <div className="col-span-4">
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = activeStep === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        isActive ? "scale-[1.02]" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Active Indicator Line */}
                      {isActive && (
                        <div className="absolute -left-8 top-0 h-full w-1 bg-emerald-500 rounded-full" />
                      )}

                      <div className={`p-6 rounded-xl border border-gray-200 transition-all ${
                        isActive
                          ? "bg-white shadow-lg border-emerald-200"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${step.color}`}>
                            <StepIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-500">
                                Step {step.number}
                              </span>
                              {isActive && (
                                <ChevronRight className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <h3 className={`font-semibold text-lg mb-1 ${
                              isActive ? "text-emerald-700" : "text-gray-900"
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {step.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Active Step Content */}
            <div className="col-span-8">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Image Header */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={activeStepData.image}
                    alt={activeStepData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-8">
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg ${activeStepData.color} backdrop-blur-sm`}>
                      <ActiveIcon className="w-5 h-5" />
                      <span className="font-medium">Step {activeStepData.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="space-y-8">
                    {/* Step Header */}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {activeStepData.title}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {activeStepData.subtitle}
                      </p>
                    </div>

                    {/* Requirements Specific Icons */}
                    {activeStep === 1 && getRequirementIcons()}

                    {/* Purpose */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-gray-500" />
                        <h4 className="font-medium text-gray-700">Purpose</h4>
                      </div>
                      <p className="text-gray-900 text-lg">
                        {activeStepData.purpose}
                      </p>
                    </div>

                    {/* What Happens */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Wrench className="w-5 h-5 text-gray-500" />
                        <h4 className="font-medium text-gray-700">What happens</h4>
                      </div>
                      <ul className="space-y-3">
                        {activeStepData.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-gray-500" />
                        <h4 className="font-medium text-gray-700">Outcome</h4>
                      </div>
                      <p className="text-gray-900">
                        {activeStepData.outcome}
                      </p>
                    </div>

                    {/* Highlight */}
                    {activeStepData.highlight && (
                      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <div className="flex items-start gap-4">
                          <Zap className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-emerald-900 mb-1">
                              Key Insight
                            </p>
                            <p className="text-emerald-800">
                              {activeStepData.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Active Step Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={activeStepData.image}
                alt={activeStepData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${activeStepData.color} backdrop-blur-sm`}>
                  <ActiveIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Step {activeStepData.number}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Step Header */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {activeStepData.title}
                  </h3>
                  <p className="text-gray-600">
                    {activeStepData.subtitle}
                  </p>
                </div>

                {/* Requirements Specific Icons */}
                {activeStep === 1 && getRequirementIcons()}

                {/* Purpose */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Purpose</h4>
                  <p className="text-gray-900">
                    {activeStepData.purpose}
                  </p>
                </div>

                {/* What Happens */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">What happens</h4>
                  <ul className="space-y-2">
                    {activeStepData.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Outcome</h4>
                  <p className="text-gray-900">
                    {activeStepData.outcome}
                  </p>
                </div>

                {/* Highlight */}
                {activeStepData.highlight && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-800 font-medium">
                        {activeStepData.highlight}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 px-2">
                {activeStep + 1} of {steps.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeStep === index
                      ? "w-6 bg-emerald-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;