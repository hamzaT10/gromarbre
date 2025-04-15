import { motion } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [textVisible, setTextVisible] = useState(false);
  
  useEffect(() => {
    // Delay showing the text until the logo animation has started
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Artistic background with marble-inspired texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Decorative elements resembling marble veins */}
        <div className="absolute w-full h-full opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white/20"
              style={{
                height: `${2 + Math.random() * 40}%`,
                width: `${1 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
                boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Handcrafted artistic overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Main content with artistic handmade feel */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Artistic frame */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative frame */}
          <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-amber-300/10 to-amber-600/10 blur-md"></div>
          
          {/* Logo */}
          <AnimatedLogo className="w-48 h-48 md:w-56 md:h-56 mb-8 relative z-10" />
        </motion.div>
        
        {/* Company name with artistic animation */}
        <motion.div
          className="relative text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: textVisible ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Gold highlights */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50 blur-sm">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-300">GROMARBRE</h1>
          </div>
          
          {/* Main text */}
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold text-amber-500 relative"
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.05em" }}
            transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
          >
            GROMARBRE
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-base font-serif tracking-widest text-amber-200 mt-2 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: textVisible ? 0.8 : 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            S.A.R.L
          </motion.p>
          
          {/* Handcrafted slogan with artistic feel */}
          <motion.p 
            className="text-xs md:text-sm text-blue-100/70 mt-6 max-w-xs mx-auto font-serif italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: textVisible ? 0.7 : 0, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            The Art of Luxury Marble
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
