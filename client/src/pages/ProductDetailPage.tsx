import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { products, projects } from "@/lib/constants";
import { Product } from "@/lib/types";

const ProductDetailPage = () => {
  const [, params] = useRoute("/products/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    if (params && params.id) {
      const foundProduct = products.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.gallery[0]);
        
        // Find projects that use this marble type
        const related = projects.filter(project => 
          project.materials.includes(foundProduct.id)
        ).slice(0, 3);
        
        setRelatedProjects(related);
      }
    }
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The marble product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <a className="inline-block px-6 py-3 bg-gold text-white rounded-md hover:bg-gold-dark transition-colors">
              Back to Products
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} Marble | Gromarbre Products</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 bg-gold text-white text-sm rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                {product.shortDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:gap-12">
              {/* Product Gallery */}
              <div className="lg:w-2/3 mb-10 lg:mb-0">
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                  <img 
                    src={selectedImage || product.image} 
                    alt={product.name} 
                    className="w-full h-[500px] object-cover object-center"
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {product.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`h-20 rounded-md overflow-hidden transition-all ${
                        selectedImage === img ? 'ring-4 ring-gold' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-serif font-bold mb-6 text-charcoal">Product Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Origin</h3>
                      <p className="mt-1 text-lg text-charcoal">{product.origin}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Available Finishes</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.finishes.map((finish, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {finish}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Applications</h3>
                      <ul className="mt-1 space-y-1 text-charcoal">
                        {product.applications.map((application, index) => (
                          <li key={index} className="flex items-start">
                            <i className="fas fa-check text-gold mt-1 mr-2"></i>
                            <span>{application}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {product.priceRange && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
                        <p className="mt-1 text-lg font-semibold text-charcoal">{product.priceRange}</p>
                      </div>
                    )}
                    
                    <div className="pt-4 mt-6 border-t border-gray-200">
                      <Link href="/contact">
                        <a className="w-full block text-center px-6 py-3 bg-gold text-white rounded-md hover:bg-gold-dark transition-colors">
                          Request Quote
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Description */}
            <div className="mt-16">
              <h2 className="text-3xl font-serif font-bold mb-6 text-charcoal">About {product.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p>{product.description}</p>
              </div>
            </div>
            
            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-serif font-bold mb-8 text-charcoal">Projects Using This Marble</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedProjects.map((project) => (
                    <div key={project.id} className="project-card rounded-lg overflow-hidden shadow-lg group">
                      <div className="relative h-64">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="project-overlay absolute inset-0 bg-blue-dark bg-opacity-70 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <div className="text-white">
                            <h3 className="text-xl font-serif font-bold">{project.title}</h3>
                            <Link href={`/projects/${project.id}`}>
                              <a className="mt-2 inline-block text-gold hover:underline">
                                View Project <i className="fas fa-arrow-right ml-1"></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-charcoal">{project.title}</h3>
                        <p className="mt-2 text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Navigation */}
            <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between">
              <Link href="/products">
                <a className="inline-flex items-center text-blue-dark hover:text-gold mb-4 sm:mb-0">
                  <i className="fas fa-arrow-left mr-2"></i> Back to All Products
                </a>
              </Link>
              <Link href="/contact">
                <a className="inline-block px-6 py-3 bg-gold text-white rounded-md hover:bg-gold-dark transition-colors">
                  Request Information
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetailPage;
