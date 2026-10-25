import React, { useState } from 'react';
import { ROOMS } from '../data/hotelData';
import { BookingData, Room } from '../types/hotel';

interface BookingSimulatorProps {
  initialRoomId?: string;
  onBookingComplete?: (booking: BookingData) => void;
  triggerDimensionalLoad: (message: string, callback: () => void) => void;
}

export const BookingSimulator: React.FC<BookingSimulatorProps> = ({
  initialRoomId = ROOMS[0].id,
  onBookingComplete,
  triggerDimensionalLoad
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>(tomorrow);
  const [guests, setGuests] = useState<number>(2);
  const [roomId, setRoomId] = useState<string>(initialRoomId);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [mealPlan, setMealPlan] = useState<'room_only' | 'breakfast_included' | 'all_inclusive'>('breakfast_included');
  const [ecoOptIn, setEcoOptIn] = useState<boolean>(true);

  // Modal room preview gallery state
  const [previewRoom, setPreviewRoom] = useState<Room | null>(null);
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState<number>(0);

  // Completed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);
  const [isNfcUnlocked, setIsNfcUnlocked] = useState<boolean>(false);

  const selectedRoom = ROOMS.find((r) => r.id === roomId) || ROOMS[0];

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const roomBasePrice = selectedRoom.pricePerNight * nights;

  // Meal plan extra in USD
  const mealPlanCostPerNight = mealPlan === 'all_inclusive' ? 35 : (mealPlan === 'breakfast_included' ? 15 : 0);
  const totalMealCost = mealPlanCostPerNight * guests * nights;

  const subtotal = roomBasePrice + totalMealCost;
  const ecoDiscount = ecoOptIn ? Math.round(subtotal * 0.05) : 0;
  const totalAmount = subtotal - ecoDiscount;
  const ecoPointsEarned = Math.round(totalAmount * 1.5) + (ecoOptIn ? 100 : 0);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger the mandatory 1.5 second dimensional loading animation with spinning orbital ring!
    triggerDimensionalLoad(
      'Generando Llave Digital y asignando accesos a Piscina y Restaurante...',
      () => {
        const floor = roomId === 'junior-suite' ? 8 : (roomId === 'matrimonial' ? 5 : 3);
        const roomNum = `${floor}${Math.floor(10 + Math.random() * 89)}`;
        const code = `NX-${Math.floor(1000 + Math.random() * 9000)}-${floor}D`;

        const newBooking: BookingData = {
          checkIn,
          checkOut,
          guests,
          roomId,
          guestName: guestName || 'Viajero Cuántico',
          guestEmail: guestEmail || 'viajero@nexorahotel.com',
          mealPlan,
          includePoolAccess: true,
          includeFitnessAccess: true,
          totalNights: nights,
          totalPrice: totalAmount,
          ecoPointsEarned,
          confirmationCode: code,
          roomNumber: `Habitación ${roomNum}`,
          keyPassToken: `NFC_KEY_${roomNum}_${Date.now()}`
        };

        setConfirmedBooking(newBooking);
        if (onBookingComplete) onBookingComplete(newBooking);
      }
    );
  };

  const handleSimulateDoorUnlock = () => {
    setIsNfcUnlocked(true);
    setTimeout(() => {
      setIsNfcUnlocked(false);
    }, 3500);
  };

  return (
    <section id="reservas" className="py-12 lg:py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-3">
            <span>04. Motor de Reservas & Llave Digital</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Tarifas en Dólares ($ USD)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
            Reserva tu estancia con piscina y restaurante incluidos
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Personaliza tu plan en NEXORA SMART HOTEL (Quito - Mitad del Mundo): elige tu habitación, plan gastronómico, obtén acceso a la piscina climatizada y genera tu Llave Digital NFC al instante.
          </p>
        </div>

        {confirmedBooking ? (
          /* CONFIRMED BOOKING: DIGITAL KEY PASS & QR CODE WITH INCLUSIONS */
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 max-w-3xl mx-auto animate-fade-in relative overflow-hidden">
            {/* Ambient portal light */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Header of Key Pass */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
                    Reserva Confirmada en la Mitad del Mundo
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                    Pase de Acceso & Llave Digital NFC
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Huésped: <strong className="text-white">{confirmedBooking.guestName}</strong> ({confirmedBooking.guestEmail})
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Código Localizador</span>
                  <span className="text-lg font-mono font-bold text-sky-400">
                    {confirmedBooking.confirmationCode}
                  </span>
                </div>
              </div>

              {/* Pass Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Details Column */}
                <div className="md:col-span-7 space-y-4 text-xs sm:text-sm">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Habitación Asignada</span>
                    <strong className="text-xl font-bold text-emerald-300 font-display block mt-0.5">
                      {confirmedBooking.roomNumber}
                    </strong>
                    <span className="text-xs text-slate-300">
                      {selectedRoom.name} · {selectedRoom.size} · Piso Cuántico
                    </span>
                  </div>

                  {/* Included Services Verified */}
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                      Accesos y Servicios Incluidos en el Hotel:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Acceso Ilimitado a la Piscina Climatizada Cuántica (29°C)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>
                          {confirmedBooking.mealPlan === 'all_inclusive' 
                            ? 'Pensión Completa Galáctica en Restaurante Principal' 
                            : confirmedBooking.mealPlan === 'breakfast_included' 
                            ? 'Desayuno Buffet Ecuatoriano & Internacional en Restaurante' 
                            : 'Solo Alojamiento (Restaurante a la carta disponible)'}
                        </span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Acceso libre a Rick's Lab Fitness Center & Área Recreativa VR</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Estacionamiento Inteligente con cargador eléctrico EV</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">Llegada</span>
                      <strong className="text-white font-mono">{confirmedBooking.checkIn} (15:00)</strong>
                    </div>
                    <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">Salida</span>
                      <strong className="text-white font-mono">{confirmedBooking.checkOut} (12:00)</strong>
                    </div>
                  </div>

                  {/* Eco-Points Reward Box in USD */}
                  <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 p-4 rounded-2xl border border-emerald-800/50 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                        Recompensa Eco-Guest
                      </span>
                      <span className="text-xs text-slate-300">
                        Acreditados a tu cuenta de viajero
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-300 font-display tabular-nums">
                        +{confirmedBooking.ecoPointsEarned}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Eco-Puntos</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                    <span>Total Pagado: <strong className="text-white">${confirmedBooking.totalPrice} USD</strong></span>
                    <span className="text-emerald-400">Cancelación gratuita 24h</span>
                  </div>
                </div>

                {/* QR Code and NFC Door Simulation */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white text-slate-900 rounded-2xl shadow-inner text-center">
                  <div className="relative p-2 bg-slate-50 border-2 border-slate-900 rounded-xl">
                    <svg viewBox="0 0 120 120" className="w-32 h-32" fill="currentColor">
                      <rect x="10" y="10" width="30" height="30" rx="3" fill="#0f172a" />
                      <rect x="16" y="16" width="18" height="18" rx="2" fill="#ffffff" />
                      <rect x="20" y="20" width="10" height="10" rx="1" fill="#0f172a" />
                      <rect x="80" y="10" width="30" height="30" rx="3" fill="#0f172a" />
                      <rect x="86" y="16" width="18" height="18" rx="2" fill="#ffffff" />
                      <rect x="90" y="20" width="10" height="10" rx="1" fill="#0f172a" />
                      <rect x="10" y="80" width="30" height="30" rx="3" fill="#0f172a" />
                      <rect x="16" y="86" width="18" height="18" rx="2" fill="#ffffff" />
                      <rect x="20" y="90" width="10" height="10" rx="1" fill="#0f172a" />
                      <rect x="46" y="15" width="8" height="8" fill="#0284c7" />
                      <rect x="58" y="22" width="12" height="6" fill="#0f172a" />
                      <rect x="46" y="36" width="6" height="12" fill="#10b981" />
                      <rect x="60" y="42" width="10" height="10" fill="#0f172a" />
                      <rect x="76" y="48" width="6" height="18" fill="#0284c7" />
                      <rect x="20" y="52" width="16" height="6" fill="#0f172a" />
                      <rect x="46" y="62" width="14" height="6" fill="#10b981" />
                      <rect x="68" y="68" width="8" height="8" fill="#0f172a" />
                      <rect x="84" y="82" width="12" height="12" fill="#0284c7" />
                      <rect x="50" y="86" width="18" height="8" fill="#10b981" />
                      <rect x="74" y="100" width="10" height="6" fill="#0f172a" />
                      <rect x="44" y="102" width="6" height="8" fill="#0f172a" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center shadow-md">
                        <span className="text-[10px] font-black">NX</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 mt-2 font-medium">
                    {confirmedBooking.keyPassToken?.slice(0, 16)}...
                  </span>

                  <button
                    onClick={handleSimulateDoorUnlock}
                    className={`mt-4 w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isNfcUnlocked
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 animate-pulse'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isNfcUnlocked ? (
                      <>
                        <span className="text-base">🔓</span>
                        <span>¡Cerradura Cuántica Abierta!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base">📱</span>
                        <span>Probar Apertura NFC de Puerta</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Presenta este pase digital en el lobby de San Antonio de Pichincha o activa el NFC de tu móvil para entrar directo a tu piso.
                </span>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap"
                >
                  Configurar Otra Reserva
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BOOKING SIMULATOR FORM */
          <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto transition-colors">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Step 1: Dates & Guests */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Fechas de Estadía & Número de Huéspedes</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Fecha de Llegada (Check-in)
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Fecha de Salida (Check-out)
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Número de Huéspedes
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                    >
                      <option value={1}>1 Huésped</option>
                      <option value={2}>2 Huéspedes</option>
                      <option value={3}>3 Huéspedes (Hab. Triple)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Room Selection with USD pricing */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Selección de Habitación (Tarifas en $ USD / noche)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {ROOMS.map((room) => {
                    const isSelected = room.id === roomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setRoomId(room.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-sm ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                            <span>{room.size}</span>
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-display tabular-nums">
                              ${room.pricePerNight}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                            {room.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {room.capacity}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                          {/* Image icon button to preview room photos in popup */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewRoom(room);
                              setPreviewPhotoIndex(0);
                            }}
                            className="py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1 text-[10px] font-semibold"
                            title={`Ver fotos de ${room.name}`}
                          >
                            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Fotos</span>
                          </button>

                          <span className={isSelected ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
                            {isSelected ? '✓ Elegida' : 'Elegir'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Hotel Inclusions & Meal Plan Options */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Servicios Incluidos & Opciones Gastronómicas</span>
                </h3>

                {/* Free Included Amenities Strip */}
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 mb-4">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block mb-2">
                    Servicios de la Infraestructura Incluidos sin costo adicional:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-emerald-950 dark:text-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <span>🏊</span>
                      <span>Piscina Climatizada (29°C)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🏋️</span>
                      <span>Rick's Lab Fitness Center</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🎮</span>
                      <span>Área Recreativa VR</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>Smart Parking con carga EV</span>
                    </div>
                  </div>
                </div>

                {/* Meal Plan Radio Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label 
                    onClick={() => setMealPlan('room_only')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      mealPlan === 'room_only'
                        ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900 dark:text-white">Solo Alojamiento</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono">$0 extra</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Piscina, gym y Wi-Fi 6 incluidos. Restaurante a la carta disponible.
                      </p>
                    </div>
                  </label>

                  <label 
                    onClick={() => setMealPlan('breakfast_included')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      mealPlan === 'breakfast_included'
                        ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900 dark:text-white">Con Desayuno Buffet</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono">+$15 / día</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Buffet ecuatoriano e internacional completo en el Restaurante Principal.
                      </p>
                    </div>
                  </label>

                  <label 
                    onClick={() => setMealPlan('all_inclusive')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      mealPlan === 'all_inclusive'
                        ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900 dark:text-white">Pensión Completa</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono">+$35 / día</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Desayuno, almuerzo y cena temática en el Restaurante + cóctel en Portal Bar.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 4: Guest Contact & Eco Option */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Datos del Huésped & Sostenibilidad</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Nombre y Apellidos
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Sebastián León"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Correo Electrónico (para llave digital)
                    </label>
                    <input
                      type="email"
                      placeholder="sebastian.leon@email.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Eco Opt-in */}
                <div className="mt-4 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-800/40 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="ecoOptIn"
                    checked={ecoOptIn}
                    onChange={(e) => setEcoOptIn(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="ecoOptIn" className="text-xs text-emerald-950 dark:text-emerald-200 cursor-pointer">
                    <strong className="block text-emerald-900 dark:text-emerald-300 font-bold">
                      Activar protocolo «Eco-Stay Consciente» (-5% descuento directo + 100 Eco-Puntos)
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400">
                      Acepto el ajuste automático del termostato a rangos de alta eficiencia energética y el no cambio innecesario diario de toallas.
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown in USD ($) */}
              <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{selectedRoom.name} x {nights} {nights === 1 ? 'noche' : 'noches'} (${selectedRoom.pricePerNight}/noche)</span>
                  <span className="font-mono tabular-nums">${roomBasePrice} USD</span>
                </div>

                {mealPlanCostPerNight > 0 && (
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Plan Gastronómico en Restaurante ({guests} huéspedes x {nights} días)</span>
                    <span className="font-mono tabular-nums">+${totalMealCost} USD</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Acceso a Piscina Climatizada & Rick's Lab Fitness</span>
                  <span>GRATIS (Incluido)</span>
                </div>

                {ecoOptIn && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Bonificación Eco-Stay (5% de descuento)</span>
                    <span className="font-mono tabular-nums">-${ecoDiscount} USD</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Total a Pagar en Dólares</span>
                    <span className="text-3xl font-black text-slate-950 dark:text-white font-display tabular-nums">
                      ${totalAmount} <span className="text-sm font-semibold text-slate-400">USD</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                      +{ecoPointsEarned} Eco-Puntos a ganar
                    </span>
                    <span className="text-[11px] text-slate-400">Llave Digital Inmediata</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all transform active:scale-98 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <span>CONFIRMAR RESERVA Y RECIBIR LLAVE DIGITAL</span>
                  <span className="text-emerald-200">→</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Pop-up Modal: Galería de Fotos de la Habitación */}
      {previewRoom && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewRoom(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Galería del Plan de Habitación
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
                  {previewRoom.name}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tarifa oficial</span>
                  <span className="text-xl font-bold font-display text-emerald-500">
                    ${previewRoom.pricePerNight} <span className="text-xs font-normal text-slate-400">/ noche</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewRoom(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-bold"
                  aria-label="Cerrar ventana de fotos"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Photo Showcase */}
            <div className="relative bg-slate-950 h-64 sm:h-96 flex items-center justify-center overflow-hidden">
              <img
                src={previewRoom.images?.[previewPhotoIndex] || previewRoom.image}
                alt={`${previewRoom.name} - Foto ${previewPhotoIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Prev / Next controls */}
              {previewRoom.images && previewRoom.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setPreviewPhotoIndex((prev) => (prev - 1 + previewRoom.images.length) % previewRoom.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700 shadow-md transition-transform hover:scale-110"
                    aria-label="Foto anterior"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewPhotoIndex((prev) => (prev + 1) % previewRoom.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700 shadow-md transition-transform hover:scale-110"
                    aria-label="Siguiente foto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="absolute bottom-3 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs border border-slate-800 font-mono">
                    Foto 0{previewPhotoIndex + 1} / 0{previewRoom.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {previewRoom.images && previewRoom.images.length > 1 && (
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                {previewRoom.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewPhotoIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      idx === previewPhotoIndex 
                        ? 'border-emerald-500 scale-105 shadow-md ring-2 ring-emerald-500/30' 
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Footer / Details & Select Button */}
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900">
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 w-full sm:w-auto">
                <p>
                  <strong>Capacidad:</strong> {previewRoom.capacity} &nbsp;·&nbsp; <strong>Superficie:</strong> {previewRoom.size}
                </p>
                <p className="line-clamp-1 text-slate-500 dark:text-slate-400">
                  {previewRoom.highlight}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPreviewRoom(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRoomId(previewRoom.id);
                    setPreviewRoom(null);
                  }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Elegir este Plan</span>
                  <span>✓</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
