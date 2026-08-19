import React from 'react';

export const BhutanKnot = ({ className = "w-8 h-8", color = "#9e1b27", secondaryColor = "#d97706" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Traditional Bhutanese Endless Knot (Srivatsa / Auspicious Knot) */}
      <rect x="5" y="5" width="90" height="90" rx="16" fill="none" stroke={color} strokeWidth="2.5" opacity="0.2" />
      <circle cx="50" cy="50" r="42" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Interlacing Endless Knot Lines */}
      <path
        d="M 50 15 L 75 40 L 60 55 L 75 70 L 50 95 L 25 70 L 40 55 L 25 40 Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 50 28 L 65 43 L 50 58 L 35 43 Z"
        stroke={secondaryColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 50 42 L 65 57 L 50 72 L 35 57 Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Central Diamond Accent */}
      <rect x="47" y="47" width="6" height="6" fill={secondaryColor} transform="rotate(45 50 50)" />
      
      {/* Corner Flourishes */}
      <circle cx="15" cy="15" r="2.5" fill={color} opacity="0.6" />
      <circle cx="85" cy="15" r="2.5" fill={color} opacity="0.6" />
      <circle cx="15" cy="85" r="2.5" fill={color} opacity="0.6" />
      <circle cx="85" cy="85" r="2.5" fill={color} opacity="0.6" />
    </svg>
  );
};

export const BhutanOrnament = ({ className = "h-4", color = "#d97706" }) => {
  return (
    <svg className={className} viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 10 L 45 10 M 75 10 L 120 10" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="60,2 66,10 60,18 54,10" fill={color} />
      <circle cx="48" cy="10" r="2" fill={color} />
      <circle cx="72" cy="10" r="2" fill={color} />
    </svg>
  );
};
