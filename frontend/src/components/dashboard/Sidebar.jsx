import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut, Settings, User, ChevronDown } from "lucide-react";

const links = [
  { name: "Dashboard", to: "/admin" },
  { name: "Leads", to: "/admin/leads" },
  { name: "Blogs", to: "/admin/blogs" },
  { name: "Portfolio", to: "/admin/portfolio" },
  { name: "Income", to: "/admin/income" },
  { name: "Email", to: "/admin/email" }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Header with Toggle Button */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <div className="font-bold text-lg text-gray-900">Digital A-Game</div>
          <div className="w-10" />
        </div>
      </header>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-0 left-0 h-screen 
          w-64 bg-white z-40 shadow-sm md:shadow-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-center p-5">
          <div className="flex-1">
            <div className="font-bold text-lg text-gray-900">Digital A-Game</div>
            <div className="text-xs text-emerald-600 font-medium">Admin Panel</div>
          </div>
        </div>

        {/* Mobile Header inside sidebar */}
        <div className="md:hidden flex items-center justify-between p-5">
          <div>
            <div className="font-bold text-lg text-gray-900">Digital A-Game</div>
            <div className="text-xs text-emerald-600 font-medium">Admin Panel</div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
            {({ isActive }) => (
              <>
                <div className={` ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <span className="flex-1">{link.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-3"></div>
                )}
              </>
            )}
            </NavLink>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="p-4 ">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-700 font-semibold text-sm">A</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@thedigitalagame.org</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border py-2 z-10">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4 text-gray-500" />
                  My Profile
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4 text-gray-500" />
                  Settings
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Version Info */}
          <div className="mt-3">
            <p className="text-xs text-gray-400 text-center">v2.1.0 Admin Panel</p>
          </div>
        </div>
      </aside>

      {/* Content offset for mobile header */}
      <div className="md:hidden h-14" />
    </>
  );
};

export default Sidebar;