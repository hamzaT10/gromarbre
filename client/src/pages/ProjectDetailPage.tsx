import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import { Project } from "@/lib/types";

const ProjectDetailPage = () => {
  const [, params] = useRoute("/projects/:id");
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (params && params.id) {
      const foundProject = projects.find(p => p.id === params.id);
      if (foundProject) {
        setProject(foundProject);
        setSelectedImage(foundProject.gallery[0]);
      }
    }
  }, [params]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/projects">
            <a className="inline-block px-6 py-3 bg-gold text-white rounded-md hover:bg-gold-dark transition-colors">
              Back to Projects
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Gromarbre Projects</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
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
                {project.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                {project.title}
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                {project.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:gap-12">
              {/* Project Info */}
              <div className="lg:w-1/3 mb-10 lg:mb-0">
                <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-serif font-bold mb-6 text-charcoal">Project Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Client</h3>
                      <p className="mt-1 text-lg text-charcoal">{project.client}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="mt-1 text-lg text-charcoal">{project.location}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Completion Date</h3>
                      <p className="mt-1 text-lg text-charcoal">{project.completionDate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Services Provided</h3>
                      <ul className="mt-1 space-y-1 text-charcoal">
                        {project.services.map((service, index) => (
                          <li key={index} className="flex items-start">
                            <i className="fas fa-check text-gold mt-1 mr-2"></i>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Gallery */}
              <div className="lg:w-2/3">
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                  <img 
                    src={selectedImage || project.image} 
                    alt={project.title} 
                    className="w-full h-[500px] object-cover object-center"
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {project.gallery.map((img, index) => (
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
            </div>
            
            {/* Project Description */}
            <div className="mt-16">
              <h2 className="text-3xl font-serif font-bold mb-6 text-charcoal">Project Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p>{project.longDescription}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between">
              <Link href="/projects">
                <a className="inline-flex items-center text-blue-dark hover:text-gold mb-4 sm:mb-0">
                  <i className="fas fa-arrow-left mr-2"></i> Back to All Projects
                </a>
              </Link>
              <Link href="/contact">
                <a className="inline-block px-6 py-3 bg-gold text-white rounded-md hover:bg-gold-dark transition-colors">
                  Start Your Project
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectDetailPage;
