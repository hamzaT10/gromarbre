import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
}

const AnimatedLogo = ({ className = "", animate = true }: AnimatedLogoProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const ornamentalPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (animate && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      
      // Animate the path drawing
      if (pathRef.current) {
        pathRef.current.style.animation = `drawPath 3s ease-in-out forwards`;
      }
      
      // Animate the ornamental path with delay
      if (ornamentalPathRef.current) {
        const ornamentalLength = ornamentalPathRef.current.getTotalLength();
        ornamentalPathRef.current.style.strokeDasharray = `${ornamentalLength}`;
        ornamentalPathRef.current.style.strokeDashoffset = `${ornamentalLength}`;
        ornamentalPathRef.current.style.animation = `drawPath 2.5s ease-in-out 0.5s forwards`;
      }
    }
  }, [animate]);

  // Handcrafted artistic logo with more intricate design
  return (
    <motion.div
      className={`splash-logo-container ${className}`}
      initial={animate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Base SVG with handcrafted look */}
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: animate ? 360 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {/* Textured background - handcrafted marble-like effect */}
        <defs>
          <radialGradient id="marble-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1e6ca4" />
            <stop offset="85%" stopColor="#164e77" />
            <stop offset="100%" stopColor="#0e3654" />
          </radialGradient>
          
          <pattern id="gold-texture" patternUnits="userSpaceOnUse" width="40" height="40">
            <rect width="40" height="40" fill="#e3a13b" />
            <path d="M0 20 Q 10 18, 20 20 T 40 20" stroke="#f1bf5f" strokeWidth="0.5" fill="none" opacity="0.7" />
            <path d="M0 10 Q 10 8, 20 10 T 40 10" stroke="#d4922c" strokeWidth="0.5" fill="none" opacity="0.5" />
            <path d="M0 30 Q 10 32, 20 30 T 40 30" stroke="#f1bf5f" strokeWidth="0.5" fill="none" opacity="0.6" />
          </pattern>
          
          <filter id="paper-texture" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
        
        {/* Circle with marble-like texture */}
        <circle cx="100" cy="100" r="85" fill="url(#marble-bg)" filter="url(#paper-texture)" />
        
        {/* Main ornate pattern with hand-drawn look */}
        <path
          ref={pathRef}
          d="M100 30
            C 130 50, 150 70, 150 100
            C 150 130, 130 150, 100 170
            C 70 150, 50 130, 50 100
            C 50 70, 70 50, 100 30
            M 100 50
            C 120 65, 135 80, 135 100
            C 135 120, 120 135, 100 150
            C 80 135, 65 120, 65 100
            C 65 80, 80 65, 100 50"
          stroke="url(#gold-texture)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{ 
            strokeDasharray: "0",
            strokeDashoffset: "0",
            filter: "drop-shadow(0px 0px 2px rgba(255, 215, 0, 0.5))"
          }}
        />
        
        {/* Ornamental details with hand-drawn style */}
        <path
          ref={ornamentalPathRef}
          d="M 70 80 Q 85 78, 100 80 Q 115 82, 130 80
             M 70 120 Q 85 122, 100 120 Q 115 118, 130 120
             M 80 70 Q 78 85, 80 100 Q 82 115, 80 130
             M 120 70 Q 122 85, 120 100 Q 118 115, 120 130
             M 60 60 Q 75 75, 90 90
             M 140 60 Q 125 75, 110 90
             M 60 140 Q 75 125, 90 110
             M 140 140 Q 125 125, 110 110"
          stroke="url(#gold-texture)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ 
            strokeDasharray: "0",
            strokeDashoffset: "0",
            filter: "drop-shadow(0px 0px 2px rgba(255, 215, 0, 0.5))"
          }}
        />
        
        {/* Handcrafted outer circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="90"
          fill="none" 
          stroke="url(#gold-texture)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ 
            filter: "drop-shadow(0px 0px 3px rgba(255, 215, 0, 0.6))"
          }}
        />
        
        {/* Artistic small details */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: "backOut" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              cx={100 + 75 * Math.cos(angle * Math.PI / 180)}
              cy={100 + 75 * Math.sin(angle * Math.PI / 180)}
              r="3"
              fill="#f1bf5f"
              style={{ filter: "drop-shadow(0px 0px 2px gold)" }}
            />
          ))}
        </motion.g>
      </motion.svg>
      
      {/* Add handcrafted style with CSS */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          .splash-logo-container {
            filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3));
          }
        `
      }} />
    </motion.div>
  );
};

export default AnimatedLogo;
