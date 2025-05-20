import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../supabaseClient";

// SVG Icon Components
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Update image imports to use the public directory - only keep logo
const logo = '/logo.png';

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const shouldShowMenu = localStorage.getItem("showUserMenu");
    if (storedEmail) {
      setUserEmail(storedEmail);
      if (shouldShowMenu === "true") {
        setShowLogout(true);
        // We'll remove this flag after a short delay to allow animation to complete
        setTimeout(() => {
          localStorage.removeItem("showUserMenu");
        }, 2000);
      }
    }
  }, [location.pathname]); // Re-run when path changes

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setShowLogout(false);
    navigate("/");
  };

  // Close dropdown when clicking outside (Desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close services dropdown when clicking outside (Mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    { name: "U.S. Corporate Tax Filings", url: "/corporate-tax" },
    { name: "U.S. Personal Tax Filings", url: "/personal-tax" },
    { name: "EB-5 Investor Services", url: "/investor-services" },
    { name: "Cross-Border Tax Advisory Services", url: "/tax-advisory" },
    { name: "FinCEN 114 & FATCA Filings", url: "/fin-advisory" },
    { name: "Estate and Succession Planning", url: "/estate" },
    { name: "Formation of Trusts (India & USA)", url: "/formation-advisory" },
    { name: "Gift Tax Returns", url: "/return-advisory" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-[#2E1A55] shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className={`relative z-50 ${menuOpen ? 'hidden' : 'block'}`}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logo}
              alt="KK Associates Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden z-50 ${
              menuOpen 
                ? 'fixed top-4 right-4 text-black' 
                : 'text-white relative flex items-center ml-4'
            }`}
          >
            {menuOpen ? (
              <CloseIcon className="text-gray-800" />
            ) : userEmail ? (
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-base font-bold shadow-lg ml-auto"
              >
                {userEmail.charAt(0).toUpperCase()}
              </motion.span>
            ) : (
              <MenuIcon className="text-white" />
            )}
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-0 bg-white z-40 lg:hidden"
              >
                <div className="pt-20 px-4">
                  <div className="space-y-2">
                    {[
                      { name: "Home", path: "/" },
                      { name: "Services", path: "#", isDropdown: true },
                      { name: "About Us", path: "/about" },
                      { name: "Blog", path: "/blog" },
                      { name: "Careers", path: "/careers" },
                      { name: "Contact Us", path: "/kka-contact-us" },
                      // Add Share Vantage menu item only when logged in
                      ...(userEmail ? [{ 
                        name: "Share Vantage", 
                        path: "https://ike1.ike.com/pcs?page=beginSession&function=loginMember&vendor=Seldix&expert=Slim&wID=KKA",
                        isExternal: true
                      }] : [])
                    ].map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 10 }}
                        className="border-b border-gray-100"
                      >
                        {item.isDropdown ? (
                          <div className="relative" ref={mobileDropdownRef}>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setServicesOpen(!servicesOpen)}
                              className="w-full text-left py-3 text-lg text-gray-800 flex items-center justify-between border-b border-gray-100"
                            >
                              <span>Services</span>
                              <ChevronDownIcon 
                                className={`transition-transform duration-200 ${
                                  servicesOpen ? "rotate-180" : ""
                                }`}
                              />
                            </motion.button>

                            <AnimatePresence>
                              {servicesOpen && (
                                <motion.div
                                  initial={{ x: "100%" }}
                                  animate={{ x: 0 }}
                                  exit={{ x: "100%" }}
                                  transition={{ type: "spring", damping: 20 }}
                                  className="fixed inset-0 bg-white z-50 lg:hidden"
                                >
                                  <div className="flex items-center border-b border-gray-100 p-4">
                                    <button
                                      onClick={() => setServicesOpen(false)}
                                      className="mr-4 text-gray-600"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                      </svg>
                                    </button>
                                    <h2 className="text-xl font-semibold text-gray-800">Our Services</h2>
                                  </div>
                                  <div className="p-4 space-y-2">
                                    {services.map((service) => (
                                      <motion.div
                                        key={service.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b border-gray-100 last:border-b-0"
                                      >
                                        <Link
                                          to={service.url}
                                          onClick={() => {
                                            setServicesOpen(false);
                                            setMenuOpen(false);
                                          }}
                                          className="block py-4 text-gray-700 hover:text-orange-500 text-lg"
                                        >
                                          {service.name}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : item.isExternal ? (
                          <a
                            href={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 text-lg font-medium ${
                              item.name === "Share Vantage" 
                                ? "text-green-600 hover:text-green-700" 
                                : "text-gray-800"
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 text-lg ${
                              location.pathname === item.path
                                ? "text-orange-500 font-semibold"
                                : "text-gray-800"
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}

                    {/* Mobile Auth Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="pt-4"
                    >
                      {userEmail ? (
                        <button
                          onClick={handleLogout}
                          className="w-full bg-red-500 text-white py-3 rounded-lg font-medium shadow-lg hover:bg-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium shadow-lg hover:bg-orange-600 transition-colors">
                            Login
                          </button>
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "#", isDropdown: true },
              { name: "About Us", path: "/about" },
              { name: "Blog", path: "/blog" },
              { name: "Careers", path: "/careers" },
              { name: "Contact Us", path: "/kka-contact-us" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                {item.isDropdown ? (
                  <div className="relative group">
                    <motion.button
                      whileHover={{ y: -2 }}
                      className="flex items-center space-x-1 text-lg font-medium text-white hover:text-orange-300 transition-colors"
                    >
                      <span>Services</span>
                      <ChevronDownIcon 
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </motion.button>

                    <div className="absolute left-0 top-full w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.url}
                          className="block px-4 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-500 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-lg font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-orange-500"
                        : "text-white hover:text-orange-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                {!item.isDropdown && location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                  />
                )}
              </motion.div>
            ))}

            {/* Desktop Auth Button */}
            {userEmail ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold shadow-lg"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  {userEmail.charAt(0).toUpperCase()}
                </motion.button>

                <AnimatePresence>
                  {showLogout && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2"
                    >
                      <a
                        href="https://ike1.ike.com/pcs?page=beginSession&function=loginMember&vendor=Seldix&expert=Slim&wID=KKA"
                        className="block w-full px-4 py-2 text-green-600 hover:bg-green-50 transition-colors text-left font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Share Vantage
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-orange-600 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}