import { useScrollReveal } from "@/hooks/useScrollReveal";
import { clients } from "@/lib/constants";

const Clients = () => {
  const { ref } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">Our Clients</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We're proud to have collaborated with prestigious clients across Morocco and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-center grayscale hover:grayscale-0 transition-all">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center">
                <i className={`${client.icon} text-3xl text-gray-400`}></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 p-10 rounded-lg shadow-md">
          <div className="text-center">
            <i className="fas fa-quote-left text-gold text-4xl mb-6"></i>
            <blockquote className="text-xl font-serif italic text-gray-700">
              "Gromarbre's commitment to excellence and attention to detail transformed our hotel lobby into a true masterpiece. Their craftsmanship is unparalleled."
            </blockquote>
            <div className="mt-4">
              <p className="font-bold">Ahmed Benjelloun</p>
              <p className="text-gray-600">Facilities Director, Royal Mansour Hotel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
