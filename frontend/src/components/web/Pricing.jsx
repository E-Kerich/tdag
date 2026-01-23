import { Check, Users, Shield, Clock, ArrowRight, DollarSign } from "lucide-react";
import { useState } from "react";
import ProjectRequestModal from "../forms/ProjectModal";




const Pricing = () => {


  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const webPackages = [
    {
      title: "Starter Business Website",
      price: "KES 35,000",
      description: "Perfect for small businesses establishing their online presence",
      features: [
        "Custom 5-7 page responsive website",
        "Modern, mobile-first design",
        "Contact form with email integration",
        "Basic SEO setup (meta tags, sitemap)",
        "Social media integration",
        "1-month post-launch support",
        "Basic analytics setup",
        "Content management system training",
        "Free Domain & Hosting for 1 Year"
      ],
      delivery: "2-3 weeks",
      popular: false,
      color: "border-gray-50"
    },
    {
      title: "Growth Business Website",
      price: "KES 60,000",
      description: "Ideal for growing businesses needing advanced functionality",
      features: [
        "Custom 7-10 page website with advanced layouts",
        "Interactive elements & animations",
        "Blog/News section with CMS",
        "Newsletter subscription system",
        "Advanced contact forms with file upload",
        "Integration with 1 third-party service",
        "Performance optimization",
        "3 months post-launch support",
        "Google Analytics advanced setup",
        "Basic e-commerce functionality"
      ],
      delivery: "4-5 weeks",
      popular: true,
      color: "border-emerald-500"
    },
    {
      title: "Custom Business Platform",
      price: "From KES 95,000",
      description: "For businesses needing custom digital systems",
      features: [
        "Complete custom web application",
        "User authentication system",
        "Admin dashboard with analytics",
        "Database design & implementation",
        "API development & integration",
        "Custom business logic implementation",
        "3-5 third-party integrations",
        "Advanced security features",
        "6 months post-launch support",
        "Documentation & admin training"
      ],
      delivery: "6-8 weeks",
      popular: false,
      color: "border-gray-50"
    }
  ];

  const ecommerce = {
    title: "E-Commerce Solution",
    price: "From KES 150,000",
    description: "Professional online stores with full functionality",
    features: [
      "Custom e-commerce website (up to 50 products)",
      "Secure payment gateway integration",
      "Shopping cart & checkout system",
      "Product catalog with categories & filters",
      "Inventory management system",
      "Order management dashboard",
      "Customer account management",
      "Shipping integration",
      "Tax calculation setup",
      "4 months post-launch support"
    ],
    delivery: "3-6 weeks"
  };


  const maintenancePlans = [
    {
      title: "Essential",
      price: "KES 6000",
      period: "/month",
      features: [
        "Monthly security updates",
        "Performance monitoring",
        "Weekly backups",
        "2 hours of updates/changes",
        "Uptime monitoring",
        "Email support"
      ],
      popular: false,
      color: "border-gray-50"
    },
    {
      title: "Professional",
      price: "KES 10,000",
      period: "/month",
      features: [
        "Everything in Essential",
        "5 hours of updates/changes",
        "Monthly performance reports",
        "SEO optimization",
        "Content updates",
        "Priority support",
        "Analytics review"
      ],
      popular: true,
      color: "border-emerald-500"
    },
    {
      title: "Enterprise",
      price: "KES 25,000",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited minor updates",
        "24/7 monitoring",
        "Advanced security measures",
        "Monthly strategy calls",
        "Performance optimization",
        "Emergency support"
      ],
      popular: false,
      color: "border-gray-50"
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Transparent Pricing</span>
          </div>
          
          <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto">
            Clear pricing for digital systems that drive business growth. No hidden fees, just professional results.
          </p>
        </div>

        {/* Web Development Packages */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">Choose Your Package</h3>
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">All projects include post-launch support</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {webPackages.map((pkg, index) => {
              const isPopular = pkg.popular;
              return (
                <div key={index} className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl ${pkg.color} overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300`}>
                  {isPopular && (
                    <div className="absolute top-2 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-white mb-2">{pkg.title}</h4>
                    <p className="text-gray-400 mb-4">{pkg.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-2xl font-bold italics text-gray-100">{pkg.price}</div>
                      <div className="flex items-center gap-2 text-gray-400 mt-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Delivery: {pkg.delivery}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* E-Commerce */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-white mb-8">E-Commerce Solutions</h3>
          <div className="bg-gradient-to-r from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-gray-200/30 p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-light text-white mb-3">{ecommerce.title}</h4>
                <p className="text-gray-400 mb-6">{ecommerce.description}</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-semibold text-white">{ecommerce.price}</div>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Delivery: {ecommerce.delivery}</span>
                  </div>
                </div>
                
                <button 
                onClick={() => {
                  setSelectedPackage("Growth Business Website");
                  setOpen(true);
                }}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg transition">
                  Get a Quote
                </button> 
                <ProjectRequestModal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  selectedPackage={selectedPackage}
                />

              </div>
              
              <div>
                <ul className="space-y-3">
                  {ecommerce.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

       

        {/* Maintenance Plans */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">Maintenance Plans</h3>
            <span className="text-gray-400 text-sm">Cancel anytime • Annual plans save 10%</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {maintenancePlans.map((plan, index) => {
              const isPopular = plan.popular;
              return (
                <div key={index} className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border ${plan.color} p-6 ${isPopular ? 'scale-105' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <h4 className="text-xl font-light text-white mb-2">{plan.title}</h4>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-semibold text-white">{plan.price}</div>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-8 text-center">
          <h3 className="text-2xl font-light text-white mb-4">Ready to Transform Your Digital Presence?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Submit your project details and let’s discuss how we can help you achieve your business goals with a custom digital solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => {
                  setSelectedPackage("Growth Business Website");
                  setOpen(true);
                }}
            
            className="px-8 py-3 bg-emerald-600 text-white font-light rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              Submit Your Project
              <ArrowRight className="w-4 h-4" />
            </button>

            <ProjectRequestModal
              isOpen={open}
              onClose={() => setOpen(false)}
              selectedPackage={selectedPackage}
            />

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;