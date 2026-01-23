import { ArrowRight } from "lucide-react";
import ProjectRequestModal from "../forms/ProjectModal";
import { useState } from "react";

const WebHero = () => {

  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-gray-900/50 z-10"></div>
        <img
          src="https://res.cloudinary.com/dz5crqyh2/image/upload/v1769064528/person-front-computer-working-html_zstcav.jpg"
          alt="Developer workspace with code"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Launch Your Web & Digital Systems Today.
          </h1>
          
          <p className="text-sm md:text-lg text-gray-300 mb-10 max-w-xl">
            We create stunning, high-performance websites and digital solutions that drive growth and elevate your brand.
          </p>
          
          <button 
            onClick={() => {
              setSelectedPackage("Growth Business Website");
              setOpen(true);
            }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white font-light text-sm rounded-lg hover:bg-emerald-600 transition-colors hover:scale-105 transform duration-300">
            Launch Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <ProjectRequestModal
          isOpen={open}
          onClose={() => setOpen(false)}
          selectedPackage={selectedPackage}
        />

        </div>
      </div>
    </section>
  );
};

export default WebHero;