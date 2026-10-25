import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { BrandLogo } from './BrandLogo';

export const OurHotel: React.FC = () => {
  return (
    <section id="nuestro-hotel" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase mb-3">
            <span>01. Identidad & Filosofía</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Hospitalidad Cuántica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight text-balance">
            Donde la exploración dimensional se une con la sostenibilidad predictiva
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            NEXORA no es solo un lugar de descanso; es un umbral arquitectónico hacia una hospitalidad inteligente que respeta los límites de nuestro planeta mientras expande tus horizontes.
          </p>
        </div>

        {/* 2-Column Asymmetric Narrative: Historia & Concepto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block: Concepto & Historia */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Concepto Sci-Fi de Vanguardia
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Categoría Oficial: {HOTEL_INFO.starsLabel}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Una nueva física para el confort urbano
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Fundado en 2024 por un colectivo interdisciplinar de arquitectos bioclimáticos, ingenieros de datos y soñadores de la ciencia ficción, <strong>NEXORA SMART HOTEL</strong> nació para resolver una contradicción moderna: ¿puede la vanguardia tecnológica más avanzada ser a la vez la más ecológica y humana?
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Inspirados en las teorías de universos múltiples y los icónicos portales dimensionales de la cultura pop, concebimos cada espacio como un portal donde cruzar una puerta significa dejar atrás el ruido urbano y acceder a una atmósfera calibrada específicamente para tu bienestar celular y descanso profundo.
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Ubicación Estratégica:</strong>
                  <span>{HOTEL_INFO.location.address}, {HOTEL_INFO.location.city}</span>
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold mb-1">Coordenadas Dimensionales:</strong>
                  <span className="font-mono tabular-nums text-sky-600 dark:text-sky-400">{HOTEL_INFO.location.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Subtle Brand Quote */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <BrandLogo size={42} showSubtitle={false} />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 font-display italic">
                  «El futuro no es un destino distante; es la frecuencia en la que decidimos vivir hoy.»
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400">Comité Fundador de Nexora</span>
              </div>
            </div>
          </div>

          {/* Right Block: Principal Diferenciador (Ecosistema IoT Predictivo) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-8 sm:p-10 rounded-3xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-slate-800">
            {/* Background orbital rings pattern */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-sky-500/20 pointer-events-none" />
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-emerald-500/20 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Elemento Diferenciador
              </span>

              <h3 className="text-2xl font-bold font-display text-white">
                Ecosistema IoT & Sostenibilidad Predictiva
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                A diferencia de los hoteles convencionales con sensores pasivos, NEXORA implementa un <strong>cerebro ambiental no intrusivo</strong>:
              </p>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>
                    <strong>Microclima predictivo:</strong> Analiza la inercia térmica exterior y el ritmo cardíaco estimado del huésped para modular la climatización con 0% de saltos bruscos.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>
                    <strong>Cero desperdicio de agua:</strong> Griferías hidrodinámicas de flujo laminar que reducen el gasto en un 42% sin perder la placentera sensación de cascada natural.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>
                    <strong>Auditoría en tiempo real:</strong> Cada huésped visualiza en su app cuántos kg de CO2 ha evitado y recibe Eco-Puntos directamente acreditados a su cuenta.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Tecnología 100% Inalámbrica</span>
              <span className="text-emerald-400 font-semibold font-mono">EN ISO 14001 / LEED Platinum</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
