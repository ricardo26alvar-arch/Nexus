import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { SectionId } from '../types/hotel';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size={42} isDark={true} showSubtitle={false} />
            </div>
            <p className="text-sm text-sky-400 font-medium">
              «{HOTEL_INFO.slogan}»
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hotel urbano de 4 estrellas superior con temática de exploración dimensional y sostenibilidad predictiva. Confort de vanguardia en armonía con el medio ambiente.
            </p>
          </div>

          {/* Navigation Links Mirror */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Explorar Estancia
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors">
                  Inicio & Vista General
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nuestro-hotel')} className="hover:text-white transition-colors">
                  Concepto Sci-Fi & Ecosistema IoT
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('habitaciones')} className="hover:text-white transition-colors">
                  Habitaciones (Quantum, Horizon, Penthouse)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors">
                  Singularity Bistro & Bio-Spa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservas')} className="hover:text-white transition-colors">
                  Motor de Reservas & Llave NFC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('eco-guest')} className="hover:text-white transition-colors">
                  Programa Eco-Guest Journey
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3 text-xs text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Coordenadas de Contacto
            </span>
            <p className="text-white font-medium">
              {HOTEL_INFO.location.address}
            </p>
            <p>{HOTEL_INFO.location.postalCode} {HOTEL_INFO.location.city}</p>
            <p className="pt-1">
              Teléfono: <strong className="text-white">{HOTEL_INFO.location.phone}</strong>
            </p>
            <p>
              Email: <span className="text-sky-400">{HOTEL_INFO.location.email}</span>
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <span>{HOTEL_INFO.location.socials.instagram}</span>
              <span>·</span>
              <span>{HOTEL_INFO.location.socials.twitter}</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NEXORA SMART HOTEL. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidad de Datos IoT</span>
            <span>Aviso Legal</span>
            <span>Certificación Huella de Carbono Neutral</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
