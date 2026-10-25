import React, { useState } from 'react';
import { ROOMS } from '../data/hotelData';

interface RoomsProps {
  onSelectRoomToBook: (roomId: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onSelectRoomToBook }) => {
  const [activeTab, setActiveTab] = useState<string>(ROOMS[0].id);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  const selectedRoom = ROOMS.find((r) => r.id === activeTab) || ROOMS[0];
  const roomImages = selectedRoom.images && selectedRoom.images.length > 0 
    ? selectedRoom.images 
    : [selectedRoom.image];

  const handleTabChange = (roomId: string) => {
    setActiveTab(roomId);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % roomImages.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };

  return (
    <section id="habitaciones" className="py-12 lg:py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-3">
            <span>02. Alojamiento Inteligente</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>60 Habitaciones en 5 Categorías</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
            Habitaciones temáticas y confort predictivo
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Inspiradas en los portales dimensionales de Rick y Morty, combinando domótica integral, control por Tablet GRMS, cerradura digital y acceso incluido a piscina climatizada y áreas de entretenimiento.
          </p>
        </div>

        {/* 5 Room Category Interactive Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-full overflow-x-auto mb-10 no-scrollbar transition-colors">
          {ROOMS.map((room) => {
            const isCurrent = room.id === activeTab;
            return (
              <button
                key={room.id}
                onClick={() => handleTabChange(room.id)}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm font-bold border border-slate-200/60 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <span>{room.name}</span>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ${room.pricePerNight}
                </span>
              </button>
            );
          })}
        </div>

        {/* Master Showcase Card with Interactive Multi-Photo Carousel */}
        <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Visual Photography Carousel */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-950 group h-[340px] sm:h-[440px]">
                <img
                  src={roomImages[currentPhotoIndex]}
                  alt={`${selectedRoom.name} - Foto ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Rate Tag in USD ($) */}
                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-slate-800 text-right z-10 shadow-lg">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                    Tarifa Oficial
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display tabular-nums">
                    ${selectedRoom.pricePerNight}
                  </span>
                  <span className="text-xs text-slate-400"> / noche</span>
                </div>

                {/* Previous / Next Arrow Controls */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 transition-all opacity-90 hover:opacity-100 z-10 shadow-md"
                  aria-label="Foto anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 transition-all opacity-90 hover:opacity-100 z-10 shadow-md"
                  aria-label="Siguiente foto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Bottom Bar on photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{selectedRoom.category}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-slate-300">{selectedRoom.capacity}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">
                    Foto 0{currentPhotoIndex + 1} / 0{roomImages.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails of Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {roomImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      idx === currentPhotoIndex
                        ? 'border-emerald-500 scale-102 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Deep Details & Inclusions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {selectedRoom.highlight}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    {selectedRoom.quantity} unidades disponibles
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-display mt-1">
                  {selectedRoom.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {selectedRoom.description}
                </p>
              </div>

              {/* Included Access to Hotel Amenities (Piscina, Restaurante, Rick's Lab) */}
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/25 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <span className="text-base">🏊</span>
                  <span>Servicios del Hotel Incluidos con esta Habitación:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                  {selectedRoom.includedAccess.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Physical Features & Amenities */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Características de Confort en Habitación
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {selectedRoom.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-500 font-bold">›</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Incorporated IoT & Smart Tech */}
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    Tecnología Domótica (Documento UNEMI)
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Tablet GRMS + Voz</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedRoom.smartTech.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-500 dark:text-sky-400 font-bold">✓</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
                  <strong className="text-slate-800 dark:text-slate-200 block">Tarifa en Dólares:</strong>
                  <span>${selectedRoom.pricePerNight} USD / noche (impuestos y piscina incluidos)</span>
                </div>

                <button
                  onClick={() => onSelectRoomToBook(selectedRoom.id)}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all transform active:scale-95 whitespace-nowrap"
                >
                  Reservar {selectedRoom.name} (${selectedRoom.pricePerNight})
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 5-Cards Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                room.id === activeTab
                  ? 'border-sky-500 dark:border-emerald-500 bg-sky-50/40 dark:bg-emerald-950/25 shadow-md ring-2 ring-sky-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
              onClick={() => handleTabChange(room.id)}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>{room.size}</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-display tabular-nums">
                    ${room.pricePerNight}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-950 dark:text-white font-display">
                  {room.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {room.highlight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{room.capacity}</span>
                <span className="text-sky-600 dark:text-sky-400 font-medium">Ver fotos ({room.images.length}) →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
