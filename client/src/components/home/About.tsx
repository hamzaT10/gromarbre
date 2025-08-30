import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "../../contexts/LanguageContext";

const About = () => {
  const { ref } = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="about" ref={ref} className="py-20 bg-white reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2000" 
              alt="Marble Craftsmanship" 
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="text-sm font-medium text-gold uppercase tracking-wider">{t('home.about.title')}</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
              {t('home.about.title')}
            </h2>
            <div className="mt-6 space-y-5 text-gray-600">
              <p>
                {t('home.about.description')}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="font-serif text-gold text-4xl font-bold">25+</div>
                <div className="mt-2 text-gray-600">{t('home.about.experience')}</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">500+</div>
                <div className="mt-2 text-gray-600">{t('home.about.projects')}</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">98%</div>
                <div className="mt-2 text-gray-600">{t('home.about.satisfaction')}</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">50+</div>
                <div className="mt-2 text-gray-600">Artisans Experts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
