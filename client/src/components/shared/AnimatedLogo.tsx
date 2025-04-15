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
  const maxSteps = 8;
  
  // Create refs for animation elements
  const centerCircleRef = useRef<SVGCircleElement>(null);
  const patternRefs = useRef<Array<SVGPathElement | null>>([]);
  
  // Set up array of pattern segments - each is a different part of the logo
  const patterns = [
    // Top segment
    "M 100 30 L 100 15 A 85 85 0 0 1 135 32 L 120 40",
    // Top-right segment
    "M 150 70 L 168 63 A 85 85 0 0 1 168 137 L 150 130",
    // Right segment
    "M 120 160 L 135 168 A 85 85 0 0 1 65 168 L 80 160",
    // Bottom segment
    "M 50 130 L 32 137 A 85 85 0 0 1 32 63 L 50 70",
    // Inner star pattern top
    "M 100 50 L 100 85 L 135 60 Z",
    // Inner star pattern right
    "M 150 100 L 115 100 L 140 135 Z",
    // Inner star pattern bottom
    "M 100 150 L 100 115 L 65 140 Z",
    // Inner star pattern left
    "M 50 100 L 85 100 L 60 65 Z"
  ];
  
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
  
  return (
    <div className={`splash-logo-container relative ${className}`}>
      {/* Futuristic SVG Logo */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background gradients and effects */}
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f0f8ff" />
            <stop offset="100%" stopColor="#e6f0ff" />
          </radialGradient>
          
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0062b3" />
            <stop offset="100%" stopColor="#004080" />
          </linearGradient>
          
          <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="1" />
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Logo background */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="url(#blue-gradient)" 
          opacity="0.8"
        />
        
        {/* Center circle - appears first */}
        <motion.circle
          ref={centerCircleRef}
          cx="100"
          cy="100"
          r={currentStep >= 0 ? "40" : "0"}
          fill="url(#center-glow)"
          stroke="#fff"
          strokeWidth="1"
          filter="url(#glow-effect)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: hasStarted ? 1 : 0,
            opacity: hasStarted ? 1 : 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Logo patterns - each appears in sequence */}
        <g filter="url(#glow-effect)">
          {patterns.map((pattern, index) => (
            <motion.path
              key={index}
              ref={el => patternRefs.current[index] = el}
              d={pattern}
              fill={index < 4 ? "none" : "rgba(255, 255, 255, 0.8)"}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: currentStep > index ? 1 : 0,
                opacity: currentStep > index ? 1 : 0
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                delay: 0.1 * index
              }}
            />
          ))}
        </g>
        
        {/* Outer ring */}
        <motion.circle 
          cx="100" 
          cy="100" 
          r="85"
          fill="none" 
          stroke="#fff"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentStep >= 1 ? 0.7 : 0
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Outer glow */}
        <motion.circle 
          cx="100" 
          cy="100" 
          r="92"
          fill="none" 
          stroke="#80b3ff"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentStep >= maxSteps - 1 ? 0.3 : 0
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Company name appears at the final step */}
        <motion.text
          x="100"
          y="185"
          fontFamily="sans-serif"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          fill="#fff"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentStep >= maxSteps ? 1 : 0
          }}
          transition={{ duration: 1 }}
        >
          GROMARBRE
        </motion.text>
      </svg>
      
      {/* Interactive controls */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 gap-4">
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
                ? "rgba(255, 255, 255, 0.9)" 
                : "rgba(255, 255, 255, 0.3)"
            }}
          />
        ))}
      </div>
      
      {/* Skip button */}
      {animate && (
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
            filter: drop-shadow(0px 0px 15px rgba(0, 128, 255, 0.3));
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
