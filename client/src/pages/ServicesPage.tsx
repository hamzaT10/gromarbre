import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { services } from "@/lib/constants";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Gromarbre</title>
        <meta name="description" content="Discover our comprehensive range of premium marble services from design to installation and maintenance." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?q=80&w=2000" 
              alt="Marble Craftsmanship" 
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
                Our Services
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                From concept to completion, we provide comprehensive marble solutions tailored to your needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12">
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row lg:items-center gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/2">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="rounded-lg shadow-xl w-full h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gold-light rounded-full flex items-center justify-center mr-4">
                        <i className={`${service.icon} text-white text-xl`}></i>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-charcoal">
                        {service.title}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-4 text-gray-600">
                      <p>{service.description}</p>
                      <p>{service.longDescription}</p>
                    </div>
                    <ul className="mt-6 space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check-circle text-gold mt-1 mr-2"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
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
              Ready to Transform Your Space?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              Contact us today to discuss your marble needs and receive a personalized consultation.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-gold text-white font-medium rounded hover:bg-gold-dark transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
