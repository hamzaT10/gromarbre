import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { projects } from "@/lib/constants";

const categories = ["All", "Hotel", "Residential", "Commercial", "Educational"];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Projects | Gromarbre</title>
        <meta name="description" content="Explore our portfolio of luxury marble projects completed for hotels, residences, and commercial spaces." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000" 
              alt="Luxury Marble Interior" 
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
                Our Projects
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                Discover how we've transformed spaces with the timeless beauty of marble.
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

        {/* Projects Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card rounded-lg overflow-hidden shadow-lg group bg-white"
                >
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
                    <span className="inline-block px-3 py-1 bg-gold-light bg-opacity-20 text-gold-dark text-xs rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal">{project.title}</h3>
                    <p className="mt-2 text-gray-600">{project.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectsPage;
