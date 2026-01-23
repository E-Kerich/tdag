import { ArrowRight, Play, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        {/* Main abstract gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Headline */}
            <h1 className="text-3xl md:text-6xl font-bold mb-6">
              <span className="block text-white leading-tight">Level up your</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Digital A-Game
                </span>
                <span className="text-white">.</span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-l md:text-xl text-gray-300 mb-8 leading-relaxed">
              Clarity, systems, and practical technology for businesses and professionals navigating the modern digital world.
            </p>

            {/* Support line */}
            <div className="mb-10">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-white/5 to-white/0 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <p className="text-l md:text-lg text-gray-300">
                  We help businesses to stop guessing, wasting tools, and start building digital systems that actually work.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <a
                href="/book-consultation"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative">
                  <span className="animate-ping absolute -inset-1 bg-emerald-400/30 rounded-full opacity-75"></span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </span>
                Book a Consultation
                
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </a>

              {/* Secondary CTA */}
              <a
                href="/blog"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                Read Insights
              </a>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              {/* Animated border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-emerald-500/30 rounded-2xl blur opacity-50 animate-gradient"></div>
              
              <div className="relative">
                {/* Dashboard Preview */}
                <div className="relative h-44 md:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center h-full w-full">
                      <iframe 
                        src="https://res.cloudinary.com/dz5crqyh2/video/upload/v1768905619/samples/dance-2.mp4"
                        title="Digital A-Game Introduction"
                        className="w-full h-full rounded-lg shadow-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Feature List */}
                <div className="mt-8 space-y-3">
                  {[
                    "Custom Digital Systems",
                    "AI-Powered Solutions",
                    "Real-time Analytics",
                    "Scalable Infrastructure"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;