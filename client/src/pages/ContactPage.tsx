import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "../contexts/LanguageContext";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Gromarbre</title>
        <meta name="description" content="Get in touch with Gromarbre for all your luxury marble needs. Request a quote or consultation for your project." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-dark">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2000" 
              alt="Marble Close-up" 
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
                {t('contact.title')}
              </h1>
              <div className="w-24 h-1 bg-gold mx-auto my-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:space-x-12">
              {/* Contact Information */}
              <div className="lg:w-1/3 mb-12 lg:mb-0">
                <div className="bg-blue-dark text-white p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-gold">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">Visit Us</h3>
                        <p className="mt-1 text-gray-300">
                          321 Avenue Mohammed V<br />
                          Casablanca, Morocco
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-gold">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">Call Us</h3>
                        <p className="mt-1 text-gray-300">
                          +212-5xx-xxxxxx<br />
                          Monday-Friday, 9am-6pm
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-gold">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">Email Us</h3>
                        <p className="mt-1 text-gray-300">
                          info@gromarbre.ma<br />
                          sales@gromarbre.ma
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-blue-light border-opacity-30">
                    <h3 className="font-medium mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-white hover:text-gold" aria-label="Facebook">
                        <i className="fab fa-facebook-f text-xl"></i>
                      </a>
                      <a href="#" className="text-white hover:text-gold" aria-label="Instagram">
                        <i className="fab fa-instagram text-xl"></i>
                      </a>
                      <a href="#" className="text-white hover:text-gold" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-serif font-bold mb-6 text-charcoal">Business Hours</h2>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-serif font-bold mb-6 text-charcoal">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                        <input 
                          type="text" 
                          id="name" 
                          className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                          placeholder="Your name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                        <input 
                          type="email" 
                          id="email" 
                          className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                          placeholder="Your email"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                          placeholder="Your phone number"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-red-500 text-xs">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                        <input 
                          type="text" 
                          id="subject" 
                          className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                          placeholder="Message subject"
                          {...register("subject")}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-red-500 text-xs">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                      <textarea 
                        id="message" 
                        rows={6} 
                        className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                        placeholder="Tell us about your project or inquiry..."
                        {...register("message")}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-red-500 text-xs">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-gold text-white py-3 px-6 rounded-md hover:bg-gold-dark transition-colors disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                        </span>
                      ) : "Send Message"}
                    </button>
                  </form>
                </div>
                
                {/* Map */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-md h-[400px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691566196!2d-7.669966069658781!3d33.57240330064237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1660488764201!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gromarbre Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
