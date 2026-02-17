const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Headline with animated reveal */}
            <div className="overflow-hidden">
              <h1 className="text-2xl md:text-6xl font-light tracking-tight mt-6 mb-6">
                <div className="overflow-hidden">
                  <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    <span className="text-gray-100">Level up your</span>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                      Digital A-Game
                    </span>
                    <span className="text-gray-100">.</span>
                  </div>
                </div>
              </h1>
            </div>

            {/* Sub-headline with delay */}
            <div className="overflow-hidden">
              <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
                  Clarity, systems, and practical technology for businesses navigating the modern digital world.
                </p>
              </div>
            </div>

            {/* Support line with delay */}
            <div className="overflow-hidden">
              <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                <div className="pl-3 border-l border-emerald-500/30">
                  <p className="text-gray-300 text-sm md:text-lg italic">
                    We help businesses stop guessing, stop wasting tools, and start building digital systems that actually work.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons with delay */}
            <div className="overflow-hidden pt-4">
              <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="px-8 py-3.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-center"
                  >
                    Book a Consultation
                  </a>
                  <a
                    href="/blog"
                    className="px-8 py-3.5 bg-transparent text-gray-300 font-medium rounded-lg border border-gray-700 hover:border-emerald-500 hover:text-emerald-400 transition-colors text-center"
                  >
                    Read Insights
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative mb-10">
            <div className="overflow-hidden">
              <div className="animate-fadeIn opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-lg rounded-2xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <iframe
                          className="w-full h-full rounded-xl"
                          src="https://res.cloudinary.com/dz5crqyh2/video/upload/v1771263549/Digital_A-Game_Brand_Intro_jsomxr.mp4"
                          title="Introductory Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;