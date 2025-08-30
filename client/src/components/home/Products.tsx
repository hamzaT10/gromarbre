import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "../../contexts/LanguageContext";

const Products = () => {
  const { ref } = useScrollReveal();
  const { t } = useLanguage();

  const products = [
    {
      id: 'calacatta-gold',
      nameKey: 'home.products.calacatta',
      descKey: 'home.products.calacatta.desc',
      image: '/images/marble/calacatta-gold.svg'
    },
    {
      id: 'carrara-white', 
      nameKey: 'home.products.carrara',
      descKey: 'home.products.carrara.desc',
      image: '/images/marble/carrara-white.svg'
    },
    {
      id: 'emperador-dark',
      nameKey: 'home.products.emperador', 
      descKey: 'home.products.emperador.desc',
      image: '/images/marble/emperador-dark.svg'
    }
  ];

  return (
    <section id="products" ref={ref} className="py-20 bg-gray-50 reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">{t('nav.products')}</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            {t('home.products.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={t(product.nameKey)} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal">{t(product.nameKey)}</h3>
                <p className="mt-2 text-gray-600 text-sm">{t(product.descKey)}</p>
                <Link href={`/products/${product.id}`} className="mt-4 inline-block text-gold hover:underline text-sm">
                  {t('nav.products')} <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <a className="marble-button inline-block px-8 py-3 border-2 border-gold text-gold font-medium rounded hover:bg-gold hover:text-white transition-colors">
              Explore All Marble Products
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
