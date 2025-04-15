import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  
  // Define theme colors
  const colors = {
    gold: "#c9a050",
    darkBlue: "#0e4b78"
  };
  
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
          {/* Moroccan-inspired background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
            {/* Decorative Moroccan pattern elements */}
            <div className="absolute w-full h-full opacity-10">
              {/* Pattern at corners */}
              {[
                { top: "5%", left: "5%" },
                { top: "5%", right: "5%" },
                { bottom: "5%", left: "5%" },
                { bottom: "5%", right: "5%" }
              ].map((position, i) => (
                <motion.div 
                  key={`corner-${i}`}
                  className="absolute w-32 h-32 md:w-48 md:h-48"
                  style={{ 
                    backgroundImage: "url('/images/moroccan-pattern.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.15,
                    ...position
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.15 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.3 * i,
                    ease: "easeOut" 
                  }}
                />
              ))}
              
              {/* Decorative arches - Moroccan architecture inspired */}
              {Array.from({ length: 8 }).map((_, i) => {
                const size = 50 + Math.random() * 100;
                const angle = (i * 45) * (Math.PI / 180);
                const radius = 40; // % from center
                
                const xPos = 50 + radius * Math.cos(angle);
                const yPos = 50 + radius * Math.sin(angle);
                
                return (
                  <motion.div 
                    key={`arch-${i}`}
                    className="absolute opacity-10"
                    style={{
                      width: `${size}px`,
                      height: `${size * 1.5}px`,
                      left: `${xPos}%`,
                      top: `${yPos}%`,
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                      borderRadius: `${size / 2}px ${size / 2}px 0 0`,
                      border: `2px solid ${colors.gold}`,
                      borderBottom: 'none'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.15 * i,
                      ease: "easeOut" 
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Ornamental background frame */}
          <div className="absolute inset-8 border-4 border-opacity-10 rounded-lg" style={{ borderColor: colors.gold, borderOpacity: 0.1 }}>
            <div className="absolute inset-0 border border-white border-opacity-5"></div>
          </div>
          
          {/* Radial overlay for better contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
          
          {/* Main content container */}
          <div className="relative h-full flex flex-col items-center justify-center max-w-screen-md mx-auto px-6">
            {/* Decorative top arc */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-20 md:w-64 md:h-32"
              style={{
                borderRadius: "100% 100% 0 0",
                border: `2px solid ${colors.gold}`,
                borderBottom: "none",
                opacity: 0.2
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            {/* Interactive logo component */}
            <div className="w-64 h-64 md:w-80 md:h-80 mb-4 relative">
              <AnimatedLogo onComplete={handleLogoComplete} className="w-full h-full" />
            </div>
            
            {/* Title appears after logo animation completes */}
            <AnimatePresence>
              {logoAnimationComplete && (
                <motion.div
                  className="text-center mt-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 
                    className="text-3xl md:text-4xl font-serif tracking-wider relative z-10"
                    style={{ color: colors.gold }}
                  >
                    GROMARBRE
                  </h1>
                  
                  <p 
                    className="text-sm uppercase tracking-widest mt-2 opacity-80 font-serif"
                    style={{ color: colors.gold }}
                  >
                    S.A.R.L
                  </p>
                  
                  <p className="text-xs md:text-sm text-white mt-6 max-w-xs mx-auto font-serif italic">
                    "The Artistry of Luxury Marble"
                  </p>
                  
                  {/* Decorative line under motto */}
                  <div className="w-24 h-px mx-auto mt-4" style={{ backgroundColor: colors.gold, opacity: 0.5 }}></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Decorative bottom corners */}
          {[
            { left: "10%", bottom: "10%" },
            { right: "10%", bottom: "10%" }
          ].map((position, i) => (
            <motion.div 
              key={`corner-decor-${i}`}
              className="absolute w-16 h-16"
              style={{ 
                ...position,
                opacity: 0.2,
                border: `2px solid ${colors.gold}`,
                borderWidth: i === 0 ? "0 2px 2px 0" : "0 0 2px 2px",
                borderRadius: i === 0 ? "0 0 16px 0" : "0 0 0 16px",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
