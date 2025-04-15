import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/constants";

const Projects = () => {
  const { ref } = useScrollReveal();

  return (
    <section id="projects" ref={ref} className="py-20 bg-white reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">Our Portfolio</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Discover how we've transformed spaces with the timeless beauty of marble.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="project-card rounded-lg overflow-hidden shadow-lg group">
              <div className="relative h-80">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="project-overlay absolute inset-0 bg-blue-dark bg-opacity-70 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-serif font-bold">{project.title}</h3>
                    <p className="mt-2">{project.description}</p>
                    <Link href={`/projects/${project.id}`}>
                      <a className="mt-4 inline-block text-gold hover:underline">
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
        
        <div className="text-center mt-12">
          <Link href="/projects">
            <a className="marble-button inline-block px-8 py-3 border-2 border-gold text-gold font-medium rounded hover:bg-gold hover:text-white transition-colors">
              View All Projects
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
