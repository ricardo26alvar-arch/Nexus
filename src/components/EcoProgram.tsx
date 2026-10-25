import React, { useState } from 'react';
import { ECO_PROGRAM } from '../data/hotelData';

export const EcoProgram: React.FC = () => {
  // Interactive Calculator State
  const [selectedActions, setSelectedActions] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    4: true
  });

  const toggleAction = (index: number) => {
    setSelectedActions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const calculatedPoints = ECO_PROGRAM.pointEarningWays.reduce((sum, item, idx) => {
    return sum + (selectedActions[idx] ? item.points : 0);
  }, 0);

  const getSimulatedTier = (points: number) => {
    if (points > 1500) return ECO_PROGRAM.levels[2];
    if (points > 500) return ECO_PROGRAM.levels[1];
    return ECO_PROGRAM.levels[0];
  };

  const currentTier = getSimulatedTier(calculatedPoints * 3); // Estancia media de 3 noches

  return (
    <section id="eco-guest" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-3">
            <span>05. Fidelización Sostenible</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Programa Eco-Guest Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight text-balance">
            {ECO_PROGRAM.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {ECO_PROGRAM.subtitle}. Mediante nuestra red de sensores IoT transparentes, cada decisión inteligente que tomas durante tu visita se convierte en Eco-Puntos con beneficios reales e inmediatos.
          </p>
        </div>

        {/* 3 Loyalty Tiers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ECO_PROGRAM.levels.map((level, idx) => {
            const isTop = idx === 2;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  isTop
                    ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white border-slate-800 shadow-xl'
                    : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isTop ? 'text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>
                      Nivel 0{idx + 1}
                    </span>
                    <span className={`text-xs font-mono font-semibold ${isTop ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                      {level.threshold}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display">
                    {level.name}
                  </h3>

                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm">
                    {level.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className={`font-bold mt-0.5 ${isTop ? 'text-emerald-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          ✓
                        </span>
                        <span className={isTop ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-8 pt-4 border-t text-xs ${isTop ? 'border-slate-800 text-slate-400' : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  Acumulación automática vía Llave NFC
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Eco-Points Simulator */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Checklist of Eco Habits */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Simulador de Hábitos Sostenibles
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display mt-1">
                  ¿Cuántos Eco-Puntos acumularías en una estancia típica?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Marca las acciones que llevarías a cabo durante tu estancia de 3 noches:
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {ECO_PROGRAM.pointEarningWays.map((way, index) => {
                  const isChecked = !!selectedActions[index];
                  return (
                    <div
                      key={index}
                      onClick={() => toggleAction(index)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                        isChecked
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600 pointer-events-none"
                        />
                        <span className={isChecked ? 'font-medium' : ''}>
                          {way.action}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap ml-2">
                        +{way.points} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Result Calculation Box */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-slate-800">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block">
                  Proyección de Estancia (3 Noches)
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-display text-emerald-300 tabular-nums">
                    {calculatedPoints * 3}
                  </span>
                  <span className="text-sm text-slate-400">Eco-Puntos estimados</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Equivalente a <strong className="text-emerald-400">~${Math.round((calculatedPoints * 3) / 25)} USD</strong> en créditos de experiencia o descuentos en reservas futuras.
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Nivel Alcanzable Proyectado:
                </span>
                <div className="flex items-center justify-between">
                  <strong className="text-base font-bold text-sky-400 font-display">
                    {currentTier.name}
                  </strong>
                  <span className="text-xs text-slate-300 font-mono">
                    {currentTier.threshold}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Beneficio destacado: {currentTier.perks[0]}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Los Eco-Puntos nunca caducan y se transfieren automáticamente con tu email.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
