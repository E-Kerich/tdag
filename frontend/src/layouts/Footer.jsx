import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* SECTION 1 — BRAND STATEMENT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">The Digital A-Game</h3>
            <p className="text-gray-300 mb-3">
              Clarity, systems, and practical technology for the modern digital world.
            </p>
            <p className="text-gray-400 italic">
              Short. Calm. Confident.
            </p>
          </div>

          {/* SECTION 2 — QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              {["Home", "What We Do", "Insights", "AI for Business", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 3 — FOCUS AREAS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Focus Areas</h4>
            <ul className="space-y-2">
              {[
                "Digital Systems & Web Development",
                "Digital Strategy & Marketing",
                "AI for Business",
                "Digital Literacy"
              ].map((area) => (
                <li key={area} className="text-gray-300">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4 — INSIGHTS / NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Informed</h4>
            <p className="text-gray-300 mb-4">
              Get thoughtful insights on digital clarity, emerging technology, and practical systems, straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-3">
              No spam promises. No hype.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* SECTION 5 — LEGAL / META */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>

          {/* FOOTER BOTTOM LINE */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © {new Date().getFullYear()} The Digital A-Game. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1 italic">
              Built with intention.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;