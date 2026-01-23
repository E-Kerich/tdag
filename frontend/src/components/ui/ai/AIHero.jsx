import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AIHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop")'
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center py-20">
            {/* Left Column - Content */}
            <div>
              {/* Badge */}
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 mb-2">
                
                <span className="text-sm font-medium text-emerald-300">AI for Business</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl font-semibold mb-6">
                <span className="block text-white">Practical. Clear.</span>
                <span className="block text-emerald-400 mt-2">& Useful.</span>
              </h1>

              {/* Sub-headline */}
              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-300">
                  AI is not magic, and it's not just for tech companies.
                </p>
                <p className="text-sm md:text-lg text-gray-400">
                  We help businesses use AI intentionally, to save time, improve decisions, and build smarter systems.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-discovery"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Start AI Discovery
                </Link>

                
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative ">
                {/* Animated border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-2xl blur"></div>
                
                <div className="relative">
                  {/* Abstract AI visualization */}
                  <div className="relative h-74 rounded-xl overflow-hidden mb-6">
                    <div className="absolute inset-0  flex items-center justify-center">
                      <div className="text-center">
                        <img 
                            src="https://res.cloudinary.com/dz5crqyh2/image/upload/v1768911727/cartoon-ai-robot-scene_dcvkxe.jpg" 
                            alt="AI Visualization" 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHero;