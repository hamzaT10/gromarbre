import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/lib/constants";

const Products = () => {
  const { ref } = useScrollReveal();

  return (
    <section id="products" ref={ref} className="py-20 bg-gray-50 reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">Our Collection</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Premium Marble Products
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Explore our selection of fine marble varieties from around the world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal">{product.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{product.shortDescription}</p>
                <Link href={`/products/${product.id}`}>
                  <a className="mt-4 inline-block text-gold hover:underline text-sm">
                    View Details <i className="fas fa-arrow-right ml-1"></i>
                  </a>
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
