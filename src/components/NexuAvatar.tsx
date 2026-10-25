import React from 'react';

interface NexuAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isThinking?: boolean;
  className?: string;
  mood?: 'happy' | 'thinking' | 'welcoming';
}

export const NexuAvatar: React.FC<NexuAvatarProps> = ({
  size = 'md',
  isThinking = false,
  className = '',
  mood = 'happy'
}) => {
  const sizeMap = {
    sm: { box: 'w-11 h-11', svg: 44 },
    md: { box: 'w-16 h-16', svg: 64 },
    lg: { box: 'w-24 h-24', svg: 96 },
    xl: { box: 'w-32 h-32', svg: 128 }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${currentSize.box} ${className}`}>
      {/* Ambient holographic pulse glow */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/30 via-emerald-400/25 to-teal-400/30 blur-md pointer-events-none transition-all duration-500 ${
          isThinking ? 'scale-125 opacity-100 animate-pulse' : 'opacity-70'
        }`} 
      />

      {/* SVG Avatar of NEXU: Cute Holographic Robot with Hotel Concierge Hat & Badge */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="nexuBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="nexuCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="nexuRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="nexuGoldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <filter id="nexuGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Floating Orbital Ring around Nexu (spins when thinking) */}
        <g 
          className="origin-center"
          style={{
            transformOrigin: '50px 52px',
            animation: isThinking 
              ? 'orbital-spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' 
              : 'orbital-spin 6s linear infinite'
          }}
        >
          <ellipse
            cx="50"
            cy="52"
            rx="46"
            ry="17"
            transform="rotate(-22 50 52)"
            stroke="url(#nexuRingGrad)"
            strokeWidth={isThinking ? '4.5' : '3'}
            strokeLinecap="round"
            strokeDasharray={isThinking ? '140 40' : '180 20'}
            filter="url(#nexuGlow)"
            className="transition-all duration-300"
          />
          {/* Orbital Satellite Bead */}
          <circle 
            cx="86" 
            cy="39" 
            r="3" 
            fill="#10b981" 
            filter="url(#nexuGlow)" 
          />
        </g>

        {/* Robot Head Base */}
        <rect
          x="26"
          y="29"
          width="48"
          height="40"
          rx="18"
          fill="url(#nexuBodyGrad)"
          stroke="#0284c7"
          strokeWidth="1.8"
        />

        {/* HOTEL CONCIERGE CAP / BELLHOP VISOR (Official Hotel & Tourism Distinctive) */}
        <path
          d="M30 29 C30 21 40 16 50 16 C60 16 70 21 70 29 Z"
          fill="url(#nexuCapGrad)"
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        {/* Cap Gold Trim Line */}
        <path
          d="M28 29 L72 29"
          stroke="url(#nexuGoldTrim)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Cap Visor Edge */}
        <path
          d="M27 30 Q50 34 73 30"
          stroke="#0f172a"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Golden Nexora Portal Pin on Cap */}
        <circle cx="50" cy="22" r="3.5" fill="url(#nexuGoldTrim)" filter="url(#nexuGlow)" />
        <circle cx="50" cy="22" r="1.5" fill="#10b981" />

        {/* Side Earphone Sensors / Audio Transceivers */}
        <rect x="22" y="39" width="5" height="16" rx="2.5" fill="#0284c7" />
        <rect x="73" y="39" width="5" height="16" rx="2.5" fill="#10b981" />

        {/* Visor Screen Glass */}
        <rect
          x="32"
          y="35"
          width="36"
          height="24"
          rx="9"
          fill="#090d16"
        />

        {/* Glowing Digital Cyan Visor Eyes */}
        {isThinking ? (
          <g filter="url(#nexuGlow)">
            <circle cx="43" cy="46" r="3.2" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="57" cy="46" r="3.2" fill="#38bdf8">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : (
          <g filter="url(#nexuGlow)">
            <ellipse cx="43" cy="46" rx="3.5" ry="4.5" fill="#38bdf8" />
            <ellipse cx="57" cy="46" rx="3.5" ry="4.5" fill="#34d399" />
            <circle cx="44.5" cy="44" r="1.3" fill="#ffffff" />
            <circle cx="58.5" cy="44" r="1.3" fill="#ffffff" />
          </g>
        )}

        {/* Cute Smiling Mouth */}
        {!isThinking && (
          <path
            d="M46 53 Q50 56 54 53"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Torso / Uniform with Hotel Lanyard & Tourism Badge */}
        <path
          d="M35 69 L65 69 C67 75 63 84 50 84 C37 84 33 75 35 69 Z"
          fill="url(#nexuCapGrad)"
          stroke="#0f172a"
          strokeWidth="1.2"
        />

        {/* Concierge Ribbon / Tourism Compass Badge */}
        <polygon
          points="50,71 54,76 50,81 46,76"
          fill="url(#nexuGoldTrim)"
          filter="url(#nexuGlow)"
        />
        <circle cx="50" cy="76" r="1.2" fill="#ffffff" />
      </svg>
    </div>
  );
};
