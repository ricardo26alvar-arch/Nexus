import React from 'react';

interface NexiAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isThinking?: boolean;
  className?: string;
  mood?: 'happy' | 'thinking' | 'welcoming';
}

export const NexiAvatar: React.FC<NexiAvatarProps> = ({
  size = 'md',
  isThinking = false,
  className = '',
  mood = 'happy'
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', svg: 40 },
    md: { box: 'w-14 h-14', svg: 56 },
    lg: { box: 'w-20 h-20', svg: 80 },
    xl: { box: 'w-28 h-28', svg: 112 }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${currentSize.box} ${className}`}>
      {/* Holographic aura background */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/30 via-emerald-400/20 to-sky-500/30 blur-md pointer-events-none transition-all duration-500 ${
          isThinking ? 'scale-125 opacity-100 animate-pulse' : 'opacity-70'
        }`} 
      />

      {/* SVG Avatar with cute Sci-Fi Robot + Rotating Orbital Ring */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="nexiBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="nexiVisor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0f17" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="nexiRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="nexiGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Floating Orbital Ring around Nexi (spins when thinking) */}
        <g 
          className="origin-center"
          style={{
            transformOrigin: '50px 50px',
            animation: isThinking 
              ? 'orbital-spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' 
              : 'orbital-spin 6s linear infinite'
          }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="18"
            transform="rotate(-25 50 50)"
            stroke="url(#nexiRingGrad)"
            strokeWidth={isThinking ? '4.5' : '3'}
            strokeLinecap="round"
            strokeDasharray={isThinking ? '140 40' : '180 20'}
            filter="url(#nexiGlow)"
            className="transition-all duration-300"
          />
          {/* Orbital Satellite Bead */}
          <circle 
            cx="85" 
            cy="36" 
            r="3" 
            fill="#10b981" 
            filter="url(#nexiGlow)" 
          />
        </g>

        {/* Cute Robot Antenna with glowing portal beacon */}
        <line x1="50" y1="26" x2="50" y2="17" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="14" r="4" fill="#10b981" filter="url(#nexiGlow)">
          <animate 
            attributeName="r" 
            values="3.5;5;3.5" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>

        {/* Robot Head / Helmet Base */}
        <rect
          x="26"
          y="26"
          width="48"
          height="42"
          rx="18"
          fill="url(#nexiBody)"
          stroke="#0284c7"
          strokeWidth="1.8"
        />

        {/* Cute Robot Ears / Side Sensors */}
        <rect x="22" y="38" width="5" height="18" rx="2.5" fill="#0284c7" />
        <rect x="73" y="38" width="5" height="18" rx="2.5" fill="#10b981" />

        {/* Glossy Visor Screen */}
        <rect
          x="32"
          y="34"
          width="36"
          height="26"
          rx="10"
          fill="url(#nexiVisor)"
        />

        {/* Expressive Glowing Digital Cyan Eyes */}
        {mood === 'thinking' || isThinking ? (
          // Thinking wave eyes
          <g filter="url(#nexiGlow)">
            <circle cx="43" cy="46" r="3.2" fill="#34d399">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="57" cy="46" r="3.2" fill="#38bdf8">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : (
          // Friendly smiling open eyes
          <g filter="url(#nexiGlow)">
            <ellipse cx="43" cy="46" rx="3.5" ry="4.5" fill="#38bdf8" />
            <ellipse cx="57" cy="46" rx="3.5" ry="4.5" fill="#34d399" />
            <circle cx="44.5" cy="44" r="1.3" fill="#ffffff" />
            <circle cx="58.5" cy="44" r="1.3" fill="#ffffff" />
          </g>
        )}

        {/* Subtle cute smile arc */}
        {!isThinking && (
          <path
            d="M46 53 Q50 56 54 53"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Robot Torso / Collar */}
        <path
          d="M36 68 L64 68 C66 74 62 82 50 82 C38 82 34 74 36 68 Z"
          fill="url(#nexiBody)"
          stroke="#cbd5e1"
          strokeWidth="1.2"
        />

        {/* Center chest eco-core gemstone */}
        <polygon
          points="50,71 54,75 50,79 46,75"
          fill="#10b981"
          filter="url(#nexiGlow)"
        />
      </svg>
    </div>
  );
};
