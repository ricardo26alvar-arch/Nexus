import React from 'react';

interface BrandLogoProps {
  className?: string;
  animateRing?: boolean;
  size?: number;
  showSubtitle?: boolean;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  animateRing = false,
  size = 46,
  showSubtitle = true,
  isDark = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Precision Vector Emblem with zero background (100% transparent) */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="blPortalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="45%" stopColor="#0ea5e9" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="blRingGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <filter id="blGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central main circle ring */}
          <circle
            cx="50"
            cy="50"
            r="33"
            stroke="url(#blPortalGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="opacity-95"
          />

          {/* Central 4-pointed star */}
          <path
            d="M50 24 C50 37 40 47 27 50 C40 53 50 63 50 76 C50 63 60 53 73 50 C60 47 50 37 50 24 Z"
            fill="url(#blRingGrad)"
            filter="url(#blGlow)"
            className="opacity-95"
          />

          {/* 3D Angled Orbital Ring */}
          <g
            style={{
              transformOrigin: '50px 50px',
              animation: animateRing ? 'orbital-spin 2s linear infinite' : 'none'
            }}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="46"
              ry="18"
              transform="rotate(-28 50 50)"
              stroke="url(#blRingGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="180 30"
              filter="url(#blGlow)"
            />
          </g>

          {/* Orbiting cosmic satellites */}
          <circle cx="82" cy="22" r="3.2" fill="#10b981" filter="url(#blGlow)" />
          <circle cx="20" cy="74" r="2.2" fill="#0284c7" />
          <circle cx="88" cy="62" r="1.8" fill="#38bdf8" />
          <circle cx="16" cy="38" r="1.5" fill="#34d399" />
        </svg>
      </div>

      {/* Brand Typography (Adapts to light and dark modes with NO white box) */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`text-xl sm:text-2xl font-extrabold tracking-[0.25em] font-display transition-colors ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            NEXORA
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-2.5 h-[1.5px] bg-sky-500 rounded-full" />
          <span 
            className={`text-[9px] sm:text-[10px] font-bold tracking-[0.32em] uppercase transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            SMART HOTEL
          </span>
          <span className="w-2.5 h-[1.5px] bg-emerald-500 rounded-full" />
        </div>

        {showSubtitle && (
          <span 
            className={`text-[8px] sm:text-[9px] tracking-wider mt-0.5 transition-colors font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Una nueva dimensión de hospitalidad
          </span>
        )}
      </div>
    </div>
  );
};
