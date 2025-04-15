import { Link } from "wouter";
import AnimatedLogo from "../shared/AnimatedLogo";

const Footer = () => {
  return (
    <footer className="bg-blue-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <AnimatedLogo className="h-12 w-12" animate={false} />
              <span className="ml-2 font-serif font-bold text-xl text-white">
                GROMARBRE
              </span>
            </div>
            <p className="text-gray-300">
              Premium marble solutions for luxury spaces. With over 20 years of expertise, we bring timeless elegance to every project.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-gold transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="text-gray-300 hover:text-gold transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-gold transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-300 hover:text-gold transition-colors">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-gold transition-colors">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-gold transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#custom-design">
                  <a className="text-gray-300 hover:text-gold transition-colors">Custom Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services#installation">
                  <a className="text-gray-300 hover:text-gold transition-colors">Installation</a>
                </Link>
              </li>
              <li>
                <Link href="/services#restoration">
                  <a className="text-gray-300 hover:text-gold transition-colors">Restoration</a>
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance">
                  <a className="text-gray-300 hover:text-gold transition-colors">Maintenance</a>
                </Link>
              </li>
              <li>
                <Link href="/services#sourcing">
                  <a className="text-gray-300 hover:text-gold transition-colors">Sourcing</a>
                </Link>
              </li>
              <li>
                <Link href="/services#consultation">
                  <a className="text-gray-300 hover:text-gold transition-colors">Consultation</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on new products and projects.
            </p>
            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  className="bg-gold text-white px-4 py-2 rounded-r-md hover:bg-gold-dark transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-opacity-20 border-blue-light text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Gromarbre S.A.R.L. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
