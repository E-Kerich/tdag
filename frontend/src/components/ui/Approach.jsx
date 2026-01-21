import { Zap, Lightbulb, BarChart3, TargetIcon, CheckCircle } from "lucide-react";

const Approach = () => {
  const principles = [
    {
      icon: TargetIcon,
      title: "Understand the problem first",
      description: "We begin by deeply understanding your unique challenges before proposing any solutions."
    },
    {
      icon: Zap,
      title: "Design systems around real workflows",
      description: "We build digital systems that integrate seamlessly with how you actually work."
    },
    {
      icon: Lightbulb,
      title: "Apply technology where it creates value",
      description: "We implement tech that solves real problems, not just what's trendy."
    },
    {
      icon: BarChart3,
      title: "Explain complex ideas simply",
      description: "We break down complex concepts into practical, actionable steps you can understand."
    }
  ];

  return (
    <section className="py-5 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            OUR APPROACH
          </div>
          <p className="text-xl text-gray-600">
            The Digital A-Game exists to bring clarity and structure to digital work.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>


        </div>
    </section>
  );
};

export default Approach;