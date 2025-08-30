interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
  onComplete?: () => void;
}

const AnimatedLogo = ({ className = "", animate = true, onComplete }: AnimatedLogoProps) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 300 300">
        {/* Background Circle */}
        <circle cx="150" cy="150" r="140" fill="#b0c4de" stroke="#f7941d" strokeWidth="10"/>
        
        {/* Mandala Pattern */}
        <g transform="translate(150,150)" stroke="#f7941d" strokeWidth="3" fill="none">
          {/* Define the arm pattern */}
          <defs>
            <g id="arm">
              <path d="M0,-60 L10,-40 L0,-20 L-10,-40 Z" />
              <path d="M0,-20 Q5,-10 0,0 Q-5,-10 0,-20 Z" />
            </g>
          </defs>
          {/* Rotate around center */}
          <use href="#arm" transform="rotate(0)"/>
          <use href="#arm" transform="rotate(30)"/>
          <use href="#arm" transform="rotate(60)"/>
          <use href="#arm" transform="rotate(90)"/>
          <use href="#arm" transform="rotate(120)"/>
          <use href="#arm" transform="rotate(150)"/>
          <use href="#arm" transform="rotate(180)"/>
          <use href="#arm" transform="rotate(210)"/>
          <use href="#arm" transform="rotate(240)"/>
          <use href="#arm" transform="rotate(270)"/>
          <use href="#arm" transform="rotate(300)"/>
          <use href="#arm" transform="rotate(330)"/>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;