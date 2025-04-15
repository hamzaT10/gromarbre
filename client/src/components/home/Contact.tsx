import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { ref } = useScrollReveal();
  const { toast } = useToast();
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
    <section id="contact" ref={ref} className="py-20 bg-gray-50 reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-gold uppercase tracking-wider">Get In Touch</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-charcoal">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Ready to bring your vision to life? Reach out to our team to discuss your project.
          </p>
        </div>
        
        <div className="lg:flex lg:space-x-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
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
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-gold focus:border-transparent`}
                  placeholder="Tell us about your project..."
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
          
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-serif font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gold">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>321 Avenue Mohammed V</p>
                    <p>Casablanca, Morocco</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gold">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>+212-5xx-xxxxxx</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gold">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>info@gromarbre.ma</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gold">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="ml-3 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gold hover:text-gold-dark" aria-label="Facebook">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gold hover:text-gold-dark" aria-label="Instagram">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gold hover:text-gold-dark" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>
            
            <div className="h-64 rounded-lg overflow-hidden shadow-md">
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
  );
};

export default Contact;
