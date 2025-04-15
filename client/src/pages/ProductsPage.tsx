import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { products } from "@/lib/constants";

const categories = ["All", "White", "Beige", "Brown", "Black", "Colored"];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Marble Products | Gromarbre</title>
        <meta name="description" content="Explore our collection of premium marble products sourced from around the world." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604014056465-b3e0f842652b?q=80&w=2000" 
              alt="Marble Varieties" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                Marble Collection
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                Explore our selection of fine marble varieties from around the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeCategory === category
                      ? "bg-gold text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gold-light bg-opacity-20 text-gold-dark text-xs rounded-full mb-2">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal">{product.name}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{product.shortDescription}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Link href={`/products/${product.id}`}>
                        <a className="inline-block text-gold hover:underline text-sm">
                          View Details <i className="fas fa-arrow-right ml-1"></i>
                        </a>
                      </Link>
                      {product.priceRange && (
                        <span className="text-sm text-gray-600">
                          {product.priceRange}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Looking for a Specific Marble?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              We can source rare and custom marble varieties for your project. Contact us with your requirements.
            </p>
            <Link href="/contact">
              <a className="inline-block px-8 py-3 bg-gold text-white font-medium rounded hover:bg-gold-dark transition-colors">
                Request Custom Sourcing
              </a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductsPage;
