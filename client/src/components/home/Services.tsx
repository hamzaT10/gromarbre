import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { services } from "@/lib/constants";

const Services = () => {
  const { ref } = useScrollReveal();

  return (
    <section id="services" ref={ref} className="py-20 bg-gray-50 reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">Our Expertise</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Premium Marble Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            From consultation to installation, we provide comprehensive solutions for all your marble needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gold-light rounded-full flex items-center justify-center mb-5">
                <i className={`${service.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <a className="marble-button inline-block px-8 py-3 border-2 border-gold text-gold font-medium rounded hover:bg-gold hover:text-white transition-colors">
              View All Services
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
