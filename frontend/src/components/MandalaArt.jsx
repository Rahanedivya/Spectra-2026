import React from 'react';

export default function MandalaArt({ className = "w-64 h-64", color = "#741C35", accentColor = "#D4A72C" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Rangoli Ring */}
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="100" cy="100" r="88" stroke={accentColor} strokeWidth="1" />
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" />

      {/* Petals Ring 1 */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          <path 
            d="M100 20 C105 40 105 40 100 50 C95 40 95 40 100 20 Z" 
            fill={i % 2 === 0 ? color : accentColor} 
            opacity="0.8" 
          />
          <circle cx="100" cy="15" r="2.5" fill={accentColor} />
        </g>
      ))}

      {/* Mid Ring */}
      <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="100" r="54" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Inner Petals Ring 2 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          <path 
            d="M100 46 C108 65 108 65 100 75 C92 65 92 65 100 46 Z" 
            fill="#E87516" 
            opacity="0.9" 
          />
          <circle cx="100" cy="40" r="2" fill={color} />
        </g>
      ))}

      {/* Core Ring */}
      <circle cx="100" cy="100" r="32" fill={color} />
      <circle cx="100" cy="100" r="28" stroke={accentColor} strokeWidth="1.5" />

      {/* Central Dome Silhouette */}
      <path 
        d="M90 112 L90 100 C90 94 95 90 100 86 C105 90 110 94 110 100 L110 112 Z" 
        fill={accentColor} 
      />
      <path d="M100 82 L100 86" stroke={accentColor} strokeWidth="1.5" />
      <circle cx="100" cy="80" r="1.5" fill={accentColor} />
    </svg>
  );
}
