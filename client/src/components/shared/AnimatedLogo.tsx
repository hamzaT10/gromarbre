import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
}

const AnimatedLogo = ({ className = "", animate = true }: AnimatedLogoProps) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (animate && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, [animate]);

  return (
    <motion.svg
      className={`splash-logo ${className}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      initial={animate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Circular background */}
      <circle cx="100" cy="100" r="80" fill="#1C5682" />
      
      {/* Ornamental pattern - simplified version of the logo */}
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
          C 65 80, 80 65, 100 50
          M 70 80 L 130 80
          M 70 120 L 130 120
          M 80 70 L 80 130
          M 120 70 L 120 130"
        stroke="#E3A13B"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Outer ring */}
      <circle 
        cx="100" 
        cy="100" 
        r="90" 
        fill="none" 
        stroke="#E3A13B" 
        strokeWidth="3" 
      />
    </motion.svg>
  );
};

export default AnimatedLogo;
