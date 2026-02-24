import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef(null);

  const navItems = [
    { label: "Home", to: "/" },
    {
      label: "Services",
      to: "#",
      dropdown: [
        { label: "Digital Systems & Web Development", to: "/services/web-design" },
        { label: "Digital Strategy & Marketing", to: "/contact" },
        { label: "AI for Business", to: "/ai-business" },
        { label: "Digital Literacy & Insights", to: "/shop" },
      ]
    },
    { label: "Insights", to: "/blog" },
    { label: "AI for Business", to: "/ai-business" },
    { label: "Digital Literacy", to: "/shop" },
    { label: "Portfolio", to: "/portfolio" },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            <Link to="/">
              <img 
                src="/assets/log.png"
                className="w-full h-12 md:h-15"
                alt="Digital A-Game Logo"
              />
            </Link>
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

                    {/* Desktop Services Dropdown */}
                    {isServicesOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Our Services</p>
                        </div>
                        {item.dropdown.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.to}
                            className="group flex items-center px-4 py-3 hover:bg-emerald-50 transition-all duration-200"
                            onClick={() => {
                              setIsServicesOpen(false);
                            }}
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">
                                {dropdownItem.label}
                              </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className="group relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMobileServicesOpen(false); // Close mobile services when closing menu
              }}
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileServicesOpen(!isMobileServicesOpen);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileServicesOpen ? "rotate-180 text-emerald-600" : "text-gray-400"
                      }`} />
                    </button>
                    
                    {isMobileServicesOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-emerald-200 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.to}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileServicesOpen(false);
                            }}
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-4 px-4">
              <Link
                to="/contact"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileServicesOpen(false);
                }}
                className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-center rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;