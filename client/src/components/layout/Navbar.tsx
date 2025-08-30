import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";
import { useLanguage, Language } from "../../contexts/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

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
  }, [location]);

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/services", label: t('nav.services') },
    { href: "/projects", label: t('nav.projects') },
    { href: "/products", label: t('nav.products') },
    { href: "/contact", label: t('nav.contact') },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
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
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className={`bg-transparent border border-gold rounded px-2 py-1 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                } hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-charcoal">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
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
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-white border border-gold rounded px-2 py-2 text-sm font-medium text-charcoal hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white text-charcoal">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
