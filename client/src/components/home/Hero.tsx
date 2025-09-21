import { Link } from "wouter";
import { useLanguage } from "../../contexts/LanguageContext";
import MultimediaSlider from "../shared/MultimediaSlider";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative">
      <MultimediaSlider
        autoplayDelay={6000}
        className="h-screen"
      >
        {/* Action buttons overlay */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/projects" data-testid="link-projects">
            <span className="marble-button inline-block px-8 py-3 border-2 border-gold text-gold font-medium rounded hover:bg-gold hover:text-white transition-colors cursor-pointer">
              {t('home.hero.cta')}
            </span>
          </Link>
          <Link href="/contact" data-testid="link-contact">
            <span className="marble-button inline-block px-8 py-3 bg-gold text-white font-medium rounded hover:bg-gold-dark transition-colors cursor-pointer">
              {t('home.hero.cta2')}
            </span>
          </Link>
        </div>
      </MultimediaSlider>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-30">
        <a href="#about" aria-label="Scroll to About section" data-testid="link-scroll-about">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
