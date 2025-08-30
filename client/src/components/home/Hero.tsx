import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=2000" 
          alt="Luxury Marble Interior" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-dark bg-opacity-40"></div>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/projects">
              <a className="marble-button inline-block px-8 py-3 border-2 border-gold text-gold font-medium rounded hover:bg-gold hover:text-white transition-colors">
                {t('home.hero.cta')}
              </a>
            </Link>
            <Link href="/contact">
              <a className="marble-button inline-block px-8 py-3 bg-gold text-white font-medium rounded hover:bg-gold-dark transition-colors">
                {t('home.hero.cta2')}
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#about" aria-label="Scroll to About section">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
