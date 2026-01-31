import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef(null);

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      dropdown: [
        { label: "Digital Systems & Web Development", href: "/services/web-design" },
        { label: "Digital Strategy & Marketing", href: "/contact" },
        { label: "AI for Business", href: "/ai-business" },
        { label: "Digital Literacy & Insights", href: "/shop" },
      ]
    },
    { label: "Insights", href: "/blog" },
    { label: "AI for Business", href: "/ai-business" },
    { label: "Digital Literacy", href: "/shop" },
    { label: "Portfolio", href: "/portfolio" },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with icon */}
          <div className="flex items-center gap-3">
            
            <img 
              src="/assets/log.png"
              className="w-full h-12 md:h-15"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div ref={servicesRef} className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-all duration-200"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        isServicesOpen ? "rotate-180 text-emerald-600" : "text-gray-400"
                      }`} />
                    </button>

                    {/* Services Dropdown */}
                    {isServicesOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Our Services</p>
                        </div>
                        {item.dropdown.map((dropdownItem, index) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="group flex items-center px-4 py-3 hover:bg-emerald-50 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">
                                {dropdownItem.label}
                              </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Glass morphism effect */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        isServicesOpen ? "rotate-180 text-emerald-600" : ""
                      }`} />
                    </button>
                    
                    {isServicesOpen && (
                      <div className="ml-4 pl-4 border-l border-gray-200 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-4 px-4">
              <a
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-center rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;