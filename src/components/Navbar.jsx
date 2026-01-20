
import React, { use, useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  User,
  Home,
  BarChart3,
  Wallet,
  Plus,
  List,
  Settings,
  Contact,
  Info,
  Contact2
} from "lucide-react";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
 
  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  //   { 
  //     name: "Home", 
  //     to: "/",
  //     icon: Home
  //   },
  //   {
  //     name: "Transactions",
  //     icon: Wallet,
  //     sublinks: [
  //       { name: "Add Transaction", to: "/transaction", icon: Plus },
  //       { name: "My Transactions", to: "/transaction/my", icon: List },
  //     ],
  //   },
  //   { 
  //     name: "Reports", 
  //     to: "/reports",
  //     icon: BarChart3
  //   },
  //   { 
  //     name: "Profile", 
  //     to: "/my-profile",
  //     icon: User
  //   },
  // ];
  
  const links = [
  { name: "Home", to: "/", icon: Home },
  { name: "Dashboard", to: "/dashboard", icon: BarChart3 }, 
  { name: "Reports", to: "/dashboard/reports", icon: BarChart3 },
  { name: "Profile", to: "/dashboard/profile", icon: User },
  { name: "About", to: "/about", icon: Info },
  { name: "Contact", to: "/contact", icon: Contact2 },
];

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!", {
        icon: "👋",
        duration: 3000
      });
    } catch (err) {
      console.error("Logout failed!", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`${newTheme === "dark" ? "Dark" : "Light"} mode activated`, {
      icon: newTheme === "dark" ? "🌙" : "☀️",
      duration: 2000
    });
  };

  const isActivePath = (path) => location.pathname === path;
  
  const isActiveDropdown = (sublinks) => 
    sublinks.some(sub => sub.to === location.pathname);

  return (
    <nav className={`shadow-md fixed top-0 left-0 right-0 z-50 transition-colors ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                className="w-10 h-10 object-contain transition-transform group-hover:scale-110" 
                alt="FinEase Logo"
              />
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FinEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link, i) => {
              const LinkIcon = link.icon;
              
              if (link.sublinks) {
                return (
                  <div 
                    key={i} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActiveDropdown(link.sublinks)
                          ? 'bg-indigo-50 text-indigo-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <LinkIcon size={18} />
                      {link.name}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {activeDropdown === link.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.sublinks.map((sub, j) => {
                          const SubIcon = sub.icon;
                          return (
                            <NavLink
                              key={j}
                              to={sub.to}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 transition-colors ${
                                  isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`
                              }
                            >
                              <SubIcon size={18} />
                              {sub.name}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={i}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <LinkIcon size={18} />
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-indigo-600" />
              )}
            </button>

            {/* User Section */}
            {loading ? (
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link 
                  to="/my-profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.photoURL || "/default-profile.png"}
                    alt={user.displayName || "User"}
                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.displayName || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden lg:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-1">
              {links.map((link, i) => {
                const LinkIcon = link.icon;
                
                if (link.sublinks) {
                  return (
                    <div key={i}>
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === link.name ? null : link.name
                        )}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActiveDropdown(link.sublinks)
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <LinkIcon size={20} />
                          {link.name}
                        </div>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {activeDropdown === link.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.sublinks.map((sub, j) => {
                            const SubIcon = sub.icon;
                            return (
                              <NavLink
                                key={j}
                                to={sub.to}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                    isActive
                                      ? 'bg-blue-50 text-blue-600 font-semibold'
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`
                                }
                              >
                                <SubIcon size={18} />
                                {sub.name}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={i}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <LinkIcon size={20} />
                    {link.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile User Section */}
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/my-profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.photoURL || "/default-profile.png"}
                    alt={user.displayName || "User"}
                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;