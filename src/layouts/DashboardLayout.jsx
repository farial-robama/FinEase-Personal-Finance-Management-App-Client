// import { Outlet, NavLink, useNavigate } from "react-router";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import toast from "react-hot-toast";
// import {
//   LayoutDashboard,
//   PlusCircle,
//   List,
//   LogOut,
//   User,
//   Home,
//   BarChart3,
//   Menu,
//   X,
//   Moon,
//   Sun,
// } from "lucide-react";

// const DashboardLayout = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  

//   // Apply theme on mount and when it changes
//   useEffect(() => {
//   const html = document.querySelector("html");
//   if (theme === "dark") {
//     html.classList.add("dark");
//   } else {
//     html.classList.remove("dark");
//   }
//   localStorage.setItem("theme", theme);
// }, [theme]);


//   const handleLogout = async () => {
//     try {
//       await signOutUser();
//       toast.success("Logged out successfully!", {
//         icon: "👋",
//         duration: 3000,
//       });
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed!", err);
//       toast.error("Failed to logout. Please try again.");
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     toast.success(`${newTheme === "dark" ? "Dark" : "Light"} mode activated`, {
//       icon: newTheme === "dark" ? "🌙" : "☀️",
//       duration: 2000,
//     });
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
//       {/* Top Navbar */}
//       <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo & Mobile Menu Button */}
//             <div className="flex items-center gap-4">
//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                 ) : (
//                   <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                 )}
//               </button>

//               {/* Logo */}
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   FinEase
//                 </span>
//                 <span className="text-2xl">💰</span>
//               </div>
//             </div>

//             {/* Right Section - Theme Toggle & User Info */}
//             <div className="flex items-center gap-4">
//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 aria-label="Toggle theme"
//               >
//                 {theme === "dark" ? (
//                   <Sun className="w-5 h-5 text-yellow-500" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-gray-700" />
//                 )}
//               </button>

//               {/* User Profile */}
//               <div className="hidden sm:flex items-center gap-3">
//                 <img
//                   src={user?.photoURL || "/default-profile.png"}
//                   alt="Profile"
//                   onError={(e) => {
//                     e.target.src = "/default-profile.png";
//                   }}
//                   className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
//                 />
//                 <div className="hidden lg:block">
//                   <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                     {user?.displayName || "User"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {user?.email}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Desktop Sidebar */}
//         <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-800 shadow-lg transition-colors">
//           {/* Navigation Links - Scrollable Area */}
//           <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             <NavItem to="/" icon={Home} onClick={closeMobileMenu}>
//               Home
//             </NavItem>
//             <NavItem
//               to="/dashboard"
//               icon={LayoutDashboard}
//               onClick={closeMobileMenu}
//             >
//               Dashboard
//             </NavItem>
//             <NavItem
//               to="/dashboard/transactions/add"
//               icon={PlusCircle}
//               onClick={closeMobileMenu}
//             >
//               Add Transaction
//             </NavItem>
//             <NavItem
//               to="/dashboard/transactions/my"
//               icon={List}
//               onClick={closeMobileMenu}
//             >
//               My Transactions
//             </NavItem>
//             <NavItem
//               to="/dashboard/reports"
//               icon={BarChart3}
//               onClick={closeMobileMenu}
//             >
//               Reports
//             </NavItem>
//             <NavItem
//               to="/dashboard/profile"
//               icon={User}
//               onClick={closeMobileMenu}
//             >
//               Profile
//             </NavItem>
//           </nav>

//           {/* Logout Button - Sticky at Bottom */}
//           <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-700 dark:hover:text-red-300 transition-all"
//             >
//               <LogOut className="w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         </aside>

//         {/* Mobile Sidebar - Overlay */}
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//               onClick={closeMobileMenu}
//             ></div>

//             {/* Mobile Menu */}
//             <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden flex flex-col transition-colors">
//               {/* Navigation Links - Scrollable Area */}
//               <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//                 <NavItem to="/" icon={Home} onClick={closeMobileMenu}>
//                   Home
//                 </NavItem>
//                 <NavItem
//                   to="/dashboard"
//                   icon={LayoutDashboard}
//                   onClick={closeMobileMenu}
//                 >
//                   Dashboard
//                 </NavItem>
//                 <NavItem
//                   to="/dashboard/transactions/add"
//                   icon={PlusCircle}
//                   onClick={closeMobileMenu}
//                 >
//                   Add Transaction
//                 </NavItem>
//                 <NavItem
//                   to="/dashboard/transactions/my"
//                   icon={List}
//                   onClick={closeMobileMenu}
//                 >
//                   My Transactions
//                 </NavItem>
//                 <NavItem
//                   to="/dashboard/reports"
//                   icon={BarChart3}
//                   onClick={closeMobileMenu}
//                 >
//                   Reports
//                 </NavItem>
//                 <NavItem
//                   to="/dashboard/profile"
//                   icon={User}
//                   onClick={closeMobileMenu}
//                 >
//                   Profile
//                 </NavItem>
//               </nav>

//               {/* Mobile User Info & Logout - Sticky at Bottom */}
//               <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//                 {/* User Info */}
//                 <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
//                   <img
//                     src={user?.photoURL || "/default-profile.png"}
//                     alt="Profile"
//                     onError={(e) => {
//                       e.target.src = "/default-profile.png";
//                     }}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
//                   />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                       {user?.displayName || "User"}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
//                       {user?.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="p-4">
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       closeMobileMenu();
//                     }}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-700 dark:hover:text-red-300 transition-all"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </aside>
//           </>
//         )}

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// const NavItem = ({ to, icon: Icon, children, onClick }) => (
//   <NavLink
//     to={to}
//     end
//     onClick={onClick}
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
//         isActive
//           ? "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 shadow-sm"
//           : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100"
//       }`
//     }
//   >
//     <Icon className="w-5 h-5" />
//     {children}
//   </NavLink>
// );

// export default DashboardLayout;


import { Outlet, NavLink, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  LogOut,
  User,
  Home,
  BarChart3,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on mount and when it changes
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!", {
        icon: "👋",
        duration: 3000,
      });
      navigate("/");
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
      duration: 2000,
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      background: theme === 'dark' 
        ? 'linear-gradient(to bottom right, #1f2937, #111827)' 
        : 'linear-gradient(to bottom right, #faf5ff, #eff6ff)' 
    }}>
      {/* Top Navbar */}
      <nav className={`shadow-md sticky top-0 z-50 transition-colors ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FinEase
                </span>
                <span className="text-2xl">💰</span>
              </div>
            </div>

            {/* Right Section - Theme Toggle & User Info */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* User Profile */}
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                  className={`w-9 h-9 rounded-full object-cover border-2 ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                  }`}
                />
                <div className="hidden lg:block">
                  <p className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {user?.displayName || "User"}
                  </p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:flex md:flex-col md:w-64 shadow-lg transition-colors ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Navigation Links - Scrollable Area */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavItem to="/" icon={Home} onClick={closeMobileMenu} theme={theme}>
              Home
            </NavItem>
            <NavItem to="/dashboard" icon={LayoutDashboard} onClick={closeMobileMenu} theme={theme}>
              Dashboard
            </NavItem>
            <NavItem
              to="/dashboard/transactions/add"
              icon={PlusCircle}
              onClick={closeMobileMenu}
              theme={theme}
            >
              Add Transaction
            </NavItem>
            <NavItem
              to="/dashboard/transactions/my"
              icon={List}
              onClick={closeMobileMenu}
              theme={theme}
            >
              My Transactions
            </NavItem>
            <NavItem to="/dashboard/reports" icon={BarChart3} onClick={closeMobileMenu} theme={theme}>
              Reports
            </NavItem>
            <NavItem to="/dashboard/profile" icon={User} onClick={closeMobileMenu} theme={theme}>
              Profile
            </NavItem>
          </nav>

          {/* Logout Button - Sticky at Bottom */}
          <div className={`sticky bottom-0 p-4 border-t transition-colors ${
            theme === 'dark' 
              ? 'border-gray-700 bg-gray-900' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar - Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={closeMobileMenu}
            ></div>

            {/* Mobile Menu */}
            <aside className={`fixed top-16 left-0 bottom-0 w-64 shadow-lg z-50 md:hidden flex flex-col transition-colors ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Navigation Links - Scrollable Area */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <NavItem to="/" icon={Home} onClick={closeMobileMenu} theme={theme}>
                  Home
                </NavItem>
                <NavItem
                  to="/dashboard"
                  icon={LayoutDashboard}
                  onClick={closeMobileMenu}
                  theme={theme}
                >
                  Dashboard
                </NavItem>
                <NavItem
                  to="/dashboard/transactions/add"
                  icon={PlusCircle}
                  onClick={closeMobileMenu}
                  theme={theme}
                >
                  Add Transaction
                </NavItem>
                <NavItem
                  to="/dashboard/transactions/my"
                  icon={List}
                  onClick={closeMobileMenu}
                  theme={theme}
                >
                  My Transactions
                </NavItem>
                <NavItem
                  to="/dashboard/reports"
                  icon={BarChart3}
                  onClick={closeMobileMenu}
                  theme={theme}
                >
                  Reports
                </NavItem>
                <NavItem
                  to="/dashboard/profile"
                  icon={User}
                  onClick={closeMobileMenu}
                  theme={theme}
                >
                  Profile
                </NavItem>
              </nav>

              {/* Mobile User Info & Logout - Sticky at Bottom */}
              <div className={`sticky bottom-0 border-t transition-colors ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-900' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                {/* User Info */}
                <div className={`p-4 flex items-center gap-3 border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <img
                    src={user?.photoURL || "/default-profile.png"}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = "/default-profile.png";
                    }}
                    className={`w-12 h-12 rounded-full object-cover border-2 ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                    }`}
                  />
                  <div>
                    <p className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {user?.displayName || "User"}
                    </p>
                    <p className={`text-xs truncate max-w-[150px] ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="p-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300'
                        : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto" style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom right, #1f2937, #111827)' 
            : 'linear-gradient(to bottom right, #faf5ff, #eff6ff)' 
        }}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, children, onClick, theme }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
        isActive
          ? theme === 'dark'
            ? 'bg-indigo-900/30 text-indigo-300 shadow-sm'
            : 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 shadow-sm'
          : theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    {children}
  </NavLink>
);

export default DashboardLayout;