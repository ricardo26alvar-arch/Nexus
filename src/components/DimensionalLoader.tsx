import React from 'react';
import { LogoIcon } from './LogoIcon';

interface DimensionalLoaderProps {
  isLoading: boolean;
  message?: string;
  isDark?: boolean;
}

export const DimensionalLoader: React.FC<DimensionalLoaderProps> = ({
  isLoading,
  message = 'Sincronizando coordenadas dimensionales...',
  isDark = false
}) => {
  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 animate-fade-in ${
        isDark ? 'bg-slate-950/90' : 'bg-white/85'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className={`relative flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center border transition-colors ${
        isDark 
          ? 'bg-slate-900 border-slate-800 shadow-black/60 text-white' 
          : 'bg-white border-slate-100 shadow-sky-950/10 text-slate-900'
      }`}>
        {/* Glow ambient background behind the logo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-emerald-500/20 to-sky-500/20 rounded-3xl blur-xl opacity-75 -z-10 animate-pulse pointer-events-none" />

        {/* Logo with animated rotating ring */}
        <div className="relative my-2 transform transition-all duration-300">
          <LogoIcon size={84} animateRing={true} />
        </div>

        {/* Text and status */}
        <div className="mt-5 space-y-1">
          <p className="text-base font-bold tracking-wide font-display">
            NEXORA SMART HOTEL
          </p>
          <p className="text-xs text-emerald-400 font-medium tracking-wider flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            {message}
          </p>
        </div>

        {/* Progress bar line (1.5 seconds visual feedback) */}
        <div className={`w-48 h-1 rounded-full mt-5 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
            style={{
              animation: 'progress15 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress15 {
          0% { width: 0%; }
          50% { width: 68%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
