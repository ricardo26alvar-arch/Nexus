import React from 'react';

interface LogoIconProps {
  className?: string;
  animateRing?: boolean;
  size?: number;
  showText?: boolean;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  className = '',
  animateRing = false,
  size = 48,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Isotype reproducing the exact orbital ring & star geometry */}
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
            {/* Primary gradient: Deep cyan to emerald portal green */}
            <linearGradient id="nexoraPortalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="45%" stopColor="#0ea5e9" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="nexoraRingGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <filter id="portalGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central main circle ring */}
          <circle
            cx="50"
            cy="50"
            r="33"
            stroke="url(#nexoraPortalGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="opacity-95"
          />

          {/* Glowing central 4-pointed star */}
          <path
            d="M50 24 C50 37 40 47 27 50 C40 53 50 63 50 76 C50 63 60 53 73 50 C60 47 50 37 50 24 Z"
            fill="url(#nexoraRingGrad)"
            filter="url(#portalGlow)"
            className="opacity-95"
          />

          {/* Angled orbital ring sweeping through the circle with 3D depth */}
          <g className={animateRing ? 'origin-center transition-transform' : ''}>
            <ellipse
              cx="50"
              cy="50"
              rx="46"
              ry="18"
              transform="rotate(-28 50 50)"
              stroke="url(#nexoraRingGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="180 30"
              filter="url(#portalGlow)"
              style={{
                transformOrigin: '50px 50px',
                animation: animateRing ? 'orbital-spin 1.8s linear infinite' : 'none'
              }}
            />
          </g>

          {/* Orbiting cosmic satellites / tiny stars */}
          <circle cx="82" cy="22" r="3.2" fill="#10b981" filter="url(#portalGlow)" />
          <circle cx="20" cy="74" r="2.2" fill="#0284c7" />
          <circle cx="88" cy="62" r="1.8" fill="#38bdf8" />
          <circle cx="16" cy="38" r="1.5" fill="#34d399" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-xl md:text-2xl font-extrabold tracking-[0.22em] text-slate-950 font-display leading-none">
            NEXORA
          </span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.35em] text-slate-600 mt-0.5 uppercase">
            Smart Hotel
          </span>
        </div>
      )}
    </div>
  );
};
