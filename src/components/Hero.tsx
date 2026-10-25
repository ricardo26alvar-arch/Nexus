import React, { useState, useEffect } from 'react';
import { HOTEL_INFO, ROOMS } from '../data/hotelData';
import { SectionId } from '../types/hotel';

interface HeroProps {
  onReserveClick: (preset?: { checkIn: string; checkOut: string; guests: number; roomId: string }) => void;
  onExploreClick: (section: SectionId) => void;
}

interface CarouselSlide {
  image: string;
  tag: string;
  title: string;
  description: string;
  category: string;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreClick }) => {
  const slides: CarouselSlide[] = [
    {
      image: '/src/assets/images/hero_hotel_exterior_1792960339474.jpg',
      tag: 'Portal Metropolitano',
      title: 'Fachada Bio-Arquitectónica Cuántica',
      description: 'Arquitectura viva con curvas orgánicas, ventanales fotocromáticos y luz biofílica en el Distrito de Innovación.',
      category: 'Exterior & Arquitectura'
    },
    {
      image: '/src/assets/images/room_triple_three_beds_1792965642809.jpg',
      tag: 'Habitación Triple',
      title: 'Habitación Triple ($120/noche)',
      description: '3 camas individuales independientes, panel digital, cerradura inteligente y cargadores inductivos.',
      category: 'Estancias Inteligentes'
    },
    {
      image: '/src/assets/images/room_dimension_horizon_1792960341129.jpg',
      tag: 'Habitación Matrimonial',
      title: 'Habitación Matrimonial ($105/noche)',
      description: 'Cama King con portal galáctico iluminado, pequeña sala, espejo inteligente y control por voz.',
      category: 'Parejas & Romance'
    },
    {
      image: '/src/assets/images/room_junior_king_bed_1792965654710.jpg',
      tag: 'Junior Suite',
      title: 'Junior Suite Ejecutiva ($145/noche)',
      description: 'Cama King de alto confort, sala de estar independiente, 2 Smart TV de 55" y Tablet GRMS.',
      category: 'Lujo & Negocios'
    },
    {
      image: '/src/assets/images/hotel_pool_spa_1792963401718.jpg',
      tag: 'Piscina & Relax',
      title: 'Piscina Climatizada Cuántica (29°C)',
      description: 'Piscina cubierta con cromoterapia, hidromasaje y ventanales panorámicos hacia los Andes. ¡Acceso 100% incluido!',
      category: 'Acuático & Bienestar'
    },
    {
      image: '/src/assets/images/restaurant_tablet_menu_1792964694598.jpg',
      tag: 'Restaurante & Tablets',
      title: 'Restaurante Principal con Menú Digital en Tablets',
      description: 'Gastronomía de autor con pedidos interactivos por tablet en mesa, desayunos buffet y cocina residuo cero.',
      category: 'Gastronomía & Buffet'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Quick booking state
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].id);

  // Automatic carousel slide timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onReserveClick({
      checkIn,
      checkOut,
      guests,
      roomId: selectedRoom
    });
  };

  return (
    <section 
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-14 overflow-hidden select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* BACKGROUND CAROUSEL IMAGES (Crossfade with subtle scale effect) */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Cinematic Multi-Layer Scrim for Perfect Text Legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-radial-to-c from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />
      </div>

      {/* OVERLAY CONTENT (Text & Call to Actions) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtle Category Kicker with Active Space Pill Indicator */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold tracking-widest text-emerald-400 uppercase">
            <span>{HOTEL_INFO.starsLabel}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Distrito Metropolitano</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-sky-400">Sostenibilidad Predictiva</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.05] text-balance drop-shadow-md">
            NEXORA SMART HOTEL
          </h1>

          {/* Slogan with Portal Gradient */}
          <p className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent font-display tracking-wide drop-shadow-sm">
            «{HOTEL_INFO.slogan}»
          </p>

          {/* Value Proposition Description */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
            El primer hotel urbano inteligente de 4 estrellas superior con temática de ciencia ficción, confort bioadaptativo y domótica IoT invisible que anticipa cada una de tus necesidades reduciendo el impacto ecológico.
          </p>

          {/* Primary Action Buttons on Top of Carousel */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onReserveClick()}
              className="px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 rounded-xl hover:from-emerald-600 hover:to-sky-700 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>RESERVAR AHORA</span>
              <span className="text-emerald-200">→</span>
            </button>

            <button
              onClick={() => onExploreClick('habitaciones')}
              className="px-6 py-4 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl transition-all whitespace-nowrap"
            >
              Explorar Habitaciones
            </button>
          </div>

          {/* Current Space Callout in Carousel */}
          <div className="pt-3 flex items-center gap-3 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>
              Espacio en pantalla: <strong className="text-white">{slides[currentSlide].title}</strong> ({slides[currentSlide].category})
            </span>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: CAROUSEL CONTROLS & AVAILABILITY BAR */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 space-y-4">
        
        {/* Quick Booking Strip (Glassmorphism dark style) */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-2xl">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Llegada
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Salida
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Huéspedes
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={1}>1 Huésped</option>
                <option value={2}>2 Huéspedes</option>
                <option value={3}>3 Huéspedes</option>
                <option value={4}>4 Huéspedes</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Habitación
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {ROOMS.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} (${room.pricePerNight} USD)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 rounded-xl transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                Verificar Disponibilidad
              </button>
            </div>
          </form>
        </div>

        {/* Carousel Space Tabs & Nav Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Thumb Tabs for all 5 Spaces */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {slides.map((s, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-emerald-500 text-white font-bold shadow-sm'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  <span>{s.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Carousel Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
              aria-label="Espacio anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs text-slate-400 font-mono tabular-nums px-1">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
              aria-label="Siguiente espacio"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
