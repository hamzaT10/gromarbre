import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";
import { useLanguage, Language } from "../../contexts/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setMobileMenuOpen(false);
    setLanguageDropdownOpen(false);
    
    // Scroll to top on navigation
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/services", label: t('nav.services') },
    { href: "/projects", label: t('nav.projects') },
    { href: "/products", label: t('nav.products') },
    { href: "/contact", label: t('nav.contact') },
  ];

  const languages: { code: Language; name: string; display: string }[] = [
    { code: 'fr', name: 'Français', display: 'FR' },
    { code: 'en', name: 'English', display: 'EN' },
    { code: 'ar', name: 'العربية', display: 'AR' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <AnimatedLogo className="h-10 w-10" animate={false} />
              <span className={`ml-2 font-serif font-bold text-xl ${isScrolled ? 'text-blue-dark' : 'text-white'}`}>
                GROMARBRE
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`font-medium transition-colors ${isScrolled ? 'text-charcoal hover:text-gold' : 'text-white hover:text-gold'}`}>
                {link.label}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded transition-colors ${
                  isScrolled 
                    ? 'text-charcoal hover:bg-gold hover:text-white'
                    : 'text-white hover:bg-gold hover:text-white'
                }`}
              >
                {languages.find(lang => lang.code === language)?.display}
                <i className={`fas fa-chevron-down ml-2 text-xs transition-transform ${
                  languageDropdownOpen ? 'rotate-180' : ''
                }`}></i>
              </button>
              
              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[100px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang.code 
                            ? 'bg-gold text-white' 
                            : 'text-charcoal hover:bg-gold hover:text-white'
                        }`}
                        title={lang.name}
                      >
                        {lang.display}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${isScrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute w-full overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2 hover:bg-gold hover:text-white rounded-md transition-colors">
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-600 mb-2">Language</div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                        language === lang.code 
                          ? 'bg-gold text-white' 
                          : 'text-charcoal hover:bg-gold hover:text-white'
                      }`}
                      title={lang.name}
                    >
                      {lang.display} - {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
