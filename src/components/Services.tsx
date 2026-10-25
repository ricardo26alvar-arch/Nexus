import React from 'react';
import { EXPERIENCES } from '../data/hotelData';

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase mb-3">
            <span>03. Experiencias & Espacios</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Ecosistema Urbano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
            Servicios calibrados para una estancia sin fricciones
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Cada espacio de NEXORA ha sido concebido para enriquecer tu estancia urbana mediante inteligencia artificial aplicada a la gastronomía, conectividad cuántica y bio-regeneración.
          </p>
        </div>

        {/* Bento Grid: Featured Large Card (Singularity Bistro with AI) + 3 Sister Spaces */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Large Card: Singularity Bistro & Lab */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between group transition-colors">
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-950">
              <img
                src={EXPERIENCES[0].image}
                alt={EXPERIENCES[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {EXPERIENCES[0].category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
                  {EXPERIENCES[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {EXPERIENCES[0].subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {EXPERIENCES[0].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Innovación IA:</strong>
                  <span className="text-slate-600 dark:text-slate-400">{EXPERIENCES[0].techInnovation}</span>
                </div>
                <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-100/60 dark:border-emerald-800/40">
                  <strong className="block text-emerald-900 dark:text-emerald-300 font-bold mb-1">Impacto Verde:</strong>
                  <span className="text-emerald-700 dark:text-emerald-400">{EXPERIENCES[0].ecoImpact}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Horario: 07:30 - 23:30</span>
                <span className="font-semibold text-sky-600 dark:text-sky-400">Reservas gastronómicas vía Nexu o Recepción</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Sister Spaces (Nexus Hub, Spa, E-Mobility) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. Restaurante Principal con Menú en Tablets */}
            <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="relative h-44 overflow-hidden bg-slate-950 group">
                <img
                  src={EXPERIENCES[1].image}
                  alt={EXPERIENCES[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {EXPERIENCES[1].category}
                  </span>
                  <span className="text-[10px] bg-slate-900/90 border border-emerald-500/40 px-2 py-0.5 rounded-full text-emerald-300 font-mono">
                    Tablets en Mesa
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px]">
                    Desayunos Buffet & Gastronomía
                  </span>
                  <span>Acceso Huéspedes</span>
                </div>
                <h4 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  {EXPERIENCES[1].title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {EXPERIENCES[1].description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{EXPERIENCES[1].highlight}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Gestión IA Winnow</span>
                </div>
              </div>
            </div>

            {/* 2. Circadian Bio-Spa */}
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {EXPERIENCES[2].category}
                  </span>
                  <span>Reserva Previa</span>
                </div>
                <h4 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  {EXPERIENCES[2].title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {EXPERIENCES[2].description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{EXPERIENCES[2].highlight}</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">Gravedad Cero</span>
              </div>
            </div>

            {/* 3. E-Mobility Fleet */}
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {EXPERIENCES[3].category}
                  </span>
                  <span>Cero Emisiones</span>
                </div>
                <h4 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  {EXPERIENCES[3].title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {EXPERIENCES[3].description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{EXPERIENCES[3].highlight}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Eléctrico</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
