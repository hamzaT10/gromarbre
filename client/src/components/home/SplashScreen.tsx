import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  
  // Handle logo animation completion
  const handleLogoComplete = () => {
    setLogoAnimationComplete(true);
    // Add a delay before transitioning out
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  };
  
  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Futuristic background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
            {/* Decorative tech pattern elements */}
            <div className="absolute w-full h-full">
              {/* Horizontal grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div 
                  key={`h-${i}`}
                  className="absolute h-px w-full bg-blue-400/10"
                  style={{ top: `${10 + i * 8}%` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.1 * i,
                    ease: "easeOut" 
                  }}
                />
              ))}
              
              {/* Vertical grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div 
                  key={`v-${i}`}
                  className="absolute w-px h-full bg-blue-400/10"
                  style={{ left: `${10 + i * 8}%` }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.1 * i,
                    ease: "easeOut" 
                  }}
                />
              ))}
              
              {/* Decorative circles for tech feel */}
              {Array.from({ length: 6 }).map((_, i) => {
                const size = 80 + Math.random() * 120;
                return (
                  <motion.div 
                    key={`circle-${i}`}
                    className="absolute rounded-full border border-blue-300/10"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ 
                      duration: 2, 
                      delay: 0.2 * i,
                      ease: "easeOut" 
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Radial overlay for better contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
          
          {/* Main content container */}
          <div className="relative h-full flex flex-col items-center justify-center max-w-screen-md mx-auto px-6">
            {/* Interactive logo component */}
            <div className="w-64 h-64 md:w-80 md:h-80 mb-4 relative">
              <AnimatedLogo onComplete={handleLogoComplete} className="w-full h-full" />
            </div>
            
            {/* Title appears after logo animation completes */}
            <AnimatePresence>
              {logoAnimationComplete && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl md:text-4xl font-light tracking-wider text-white">
                    GROMARBRE
                  </h1>
                  
                  <p className="text-sm uppercase tracking-widest text-blue-200 mt-2 opacity-80">
                    S.A.R.L
                  </p>
                  
                  <p className="text-xs md:text-sm text-blue-100/70 mt-6 max-w-xs mx-auto">
                    Luxury marble craftsmanship with modern excellence
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
