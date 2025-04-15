import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
  onComplete?: () => void;
}

const AnimatedLogo = ({ className = "", animate = true, onComplete }: AnimatedLogoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const maxSteps = 8; // Total animation steps
  
  // Define colors
  const colors = {
    gold: "#c9a050",
    darkBlue: "#0e4b78",
    white: "#ffffff"
  };
  
  // Track whether user has completed viewing all steps
  useEffect(() => {
    if (currentStep >= maxSteps && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);
  
  // Auto-advance animation if playing
  useEffect(() => {
    if (!animate || !isPlaying || currentStep >= maxSteps) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, maxSteps));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [animate, currentStep, isPlaying, maxSteps]);
  
  // Start the initial animation
  useEffect(() => {
    if (animate && !hasStarted) {
      setHasStarted(true);
    }
  }, [animate, hasStarted]);
  
  // Handle play/pause toggle
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  // Handle advancing to next step
  const advanceStep = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Moroccan pattern elements to be animated in sequence
  const renderMoroccanPattern = () => {
    return (
      <>
        {/* Center point */}
        <motion.circle 
          cx="100" 
          cy="100" 
          r="10" 
          fill={colors.white}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: currentStep >= 0 ? 1 : 0,
            opacity: currentStep >= 0 ? 1 : 0
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Inner circle with decorative elements */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: currentStep >= 1 ? 1 : 0,
            opacity: currentStep >= 1 ? 1 : 0
          }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <circle cx="100" cy="100" r="20" fill="none" stroke={colors.gold} strokeWidth="1.5" />
          
          {/* Inner flower petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={`inner-petal-${i}`}
              d="M 100 85 Q 95 80, 100 75 Q 105 80, 100 85 Z"
              fill={colors.darkBlue}
              transform={`rotate(${angle} 100 100)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 1 ? 1 : 0,
                opacity: currentStep >= 1 ? 1 : 0
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 + (i * 0.05)
              }}
            />
          ))}
        </motion.g>
        
        {/* Middle ring with motifs */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: currentStep >= 2 ? 1 : 0,
            opacity: currentStep >= 2 ? 1 : 0
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <circle cx="100" cy="100" r="35" fill="none" stroke={colors.darkBlue} strokeWidth="1.5" />
          
          {/* Middle decorative elements */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={`middle-element-${i}`}
              d="M 100 65 L 105 60 L 100 55 L 95 60 Z"
              fill={colors.gold}
              transform={`rotate(${angle} 100 100)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 3 ? 1 : 0,
                opacity: currentStep >= 3 ? 1 : 0
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + (i * 0.05)
              }}
            />
          ))}
        </motion.g>
        
        {/* Outer flower petals */}
        <motion.g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={`petal-${i}`}
              d="M 100 35 Q 90 25, 100 15 Q 110 25, 100 35 Z"
              fill={colors.darkBlue}
              transform={`rotate(${angle} 100 100)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 4 ? 1 : 0,
                opacity: currentStep >= 4 ? 1 : 0
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (i * 0.05)
              }}
            />
          ))}
        </motion.g>
        
        {/* Large decorative elements */}
        <motion.g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={`large-petal-${i}`}
              d="M 100 50 Q 85 25, 100 0 Q 115 25, 100 50 Z"
              fill={colors.darkBlue}
              stroke={colors.white}
              strokeWidth="0.5"
              transform={`rotate(${angle} 100 100)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 5 ? 1 : 0,
                opacity: currentStep >= 5 ? 1 : 0
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.5 + (i * 0.05)
              }}
            />
          ))}
        </motion.g>
        
        {/* Decorative dots */}
        <motion.g>
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={100 + 95 * Math.cos(angle * Math.PI / 180)}
              cy={100 + 95 * Math.sin(angle * Math.PI / 180)}
              r="4"
              fill={colors.gold}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 6 ? 1 : 0,
                opacity: currentStep >= 6 ? 1 : 0
              }}
              transition={{ 
                duration: 0.3, 
                delay: 0.7 + (i * 0.03)
              }}
            />
          ))}
        </motion.g>
        
        {/* Outer ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={colors.gold}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: currentStep >= 7 ? 1 : 0,
            opacity: currentStep >= 7 ? 1 : 0
          }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        {/* Company name appears at the final step */}
        <motion.text
          x="100"
          y="185"
          fontFamily="serif"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          fill={colors.gold}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentStep >= maxSteps ? 1 : 0
          }}
          transition={{ duration: 1 }}
        >
          GROMARBRE
        </motion.text>
      </>
    );
  };
  
  return (
    <div className={`splash-logo-container relative ${className}`}>
      {/* Moroccan Pattern SVG */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background */}
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={colors.darkBlue} />
            <stop offset="100%" stopColor="#072b4a" />
          </radialGradient>
          
          <filter id="shadow-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main background circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="100" 
          fill="url(#bg-gradient)" 
        />
        
        {/* Render the Moroccan pattern elements */}
        <g filter="url(#shadow-glow)">
          {renderMoroccanPattern()}
        </g>
      </svg>
      
      {/* Interactive controls */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 gap-4 z-10">
        {/* Play/Pause button */}
        <motion.button
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21" />
            </svg>
          )}
        </motion.button>
        
        {/* Next step button */}
        <motion.button
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
          onClick={advanceStep}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep >= maxSteps}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 4 15 12 5 20" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </motion.button>
      </div>
      
      {/* Step indicator */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
        {Array.from({ length: maxSteps }).map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            animate={{ 
              backgroundColor: currentStep > index 
                ? `rgba(201, 160, 80, 0.9)` 
                : "rgba(255, 255, 255, 0.3)"
            }}
          />
        ))}
      </div>
      
      {/* Skip button */}
      {animate && onComplete && (
        <motion.button
          className="absolute bottom-4 right-4 text-xs text-white/70 underline"
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: hasStarted ? 1 : 0 }}
          transition={{ delay: 2 }}
        >
          Skip
        </motion.button>
      )}
      
      {/* CSS for animations */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
          .splash-logo-container {
            filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.3));
          }
          
          @keyframes rotateLogo {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default AnimatedLogo;
