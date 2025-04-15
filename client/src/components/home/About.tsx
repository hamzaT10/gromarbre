import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const { ref } = useScrollReveal();

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
            <div className="text-sm font-medium text-gold uppercase tracking-wider">About Gromarbre</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
              Two Decades of Marble Excellence
            </h2>
            <div className="mt-6 space-y-5 text-gray-600">
              <p>
                Based in Casablanca, Morocco, Gromarbre S.A.R.L has established itself as the premier provider of luxury marble solutions for discerning clients throughout the region.
              </p>
              <p>
                Our master craftsmen work with the world's finest marble, transforming raw material into breathtaking design elements for hotels, universities, prestigious residences, and commercial spaces.
              </p>
              <p>
                What sets us apart is our commitment to blending traditional craftsmanship with innovative design techniques, ensuring every project meets the highest standards of excellence.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="font-serif text-gold text-4xl font-bold">20+</div>
                <div className="mt-2 text-gray-600">Years of Experience</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">500+</div>
                <div className="mt-2 text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">100+</div>
                <div className="mt-2 text-gray-600">Marble Varieties</div>
              </div>
              <div>
                <div className="font-serif text-gold text-4xl font-bold">50+</div>
                <div className="mt-2 text-gray-600">Expert Craftsmen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
