import React from 'react';

export default function WarliArt({ className = "w-full h-16", color = "#741C35" }) {
  return (
    <div className={`overflow-hidden flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 800 60" 
        className="w-full h-full" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill={color} opacity="0.85">
          {/* Repeat Warli Figures Pattern Across 800px Width */}
          {[0, 160, 320, 480, 640].map((offset, idx) => (
            <g key={idx} transform={`translate(${offset}, 0)`}>
              
              {/* Figure 1: Drummer */}
              <circle cx="20" cy="20" r="4" />
              <path d="M20 24 L14 38 L26 38 Z" />
              <path d="M20 24 L14 48 M20 24 L26 48" stroke={color} strokeWidth="1.5" />
              <path d="M12 28 L28 28 M12 34 L28 34" stroke={color} strokeWidth="2" /> {/* Dhol drum */}

              {/* Figure 2: Tarpa Dancer holding hands */}
              <circle cx="45" cy="18" r="4" />
              <path d="M45 22 L39 36 L51 36 Z" />
              <path d="M45 36 L39 50 M45 36 L51 50" stroke={color} strokeWidth="1.5" />
              <path d="M35 25 L45 22 L55 25" stroke={color} strokeWidth="1.5" />

              {/* Figure 3: Dancing Woman with Bun */}
              <circle cx="70" cy="18" r="4" />
              <circle cx="74" cy="16" r="2" /> {/* Hair bun */}
              <path d="M70 22 L64 36 L76 36 Z" />
              <path d="M70 36 L64 50 M70 36 L76 50" stroke={color} strokeWidth="1.5" />
              <path d="M60 25 L70 22 L80 25" stroke={color} strokeWidth="1.5" />

              {/* Tree Motif */}
              <path d="M100 15 L100 50" stroke={color} strokeWidth="2" />
              <path d="M100 20 L88 30 M100 25 L112 35 M100 30 L88 40 M100 35 L112 45" stroke={color} strokeWidth="1.5" />

              {/* Figure 4: Musician blowing Horn */}
              <circle cx="125" cy="20" r="4" />
              <path d="M125 24 L119 38 L131 38 Z" />
              <path d="M125 38 L119 50 M125 38 L131 50" stroke={color} strokeWidth="1.5" />
              <path d="M125 24 C135 20 145 15 150 12" stroke={color} strokeWidth="2" /> {/* Horn */}

              {/* Small Bird */}
              <path d="M140 25 C143 20 148 20 150 25 C147 28 143 28 140 25 Z" fill={color} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
