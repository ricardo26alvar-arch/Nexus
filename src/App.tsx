import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurHotel } from './components/OurHotel';
import { Rooms } from './components/Rooms';
import { Services } from './components/Services';
import { BookingSimulator } from './components/BookingSimulator';
import { EcoProgram } from './components/EcoProgram';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NexuAssistant } from './components/NexuAssistant';
import { DimensionalLoader } from './components/DimensionalLoader';
import { SectionId } from './types/hotel';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [isDimensionalLoading, setIsDimensionalLoading] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>('Sincronizando coordenadas dimensionales...');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string | undefined>(undefined);

  // Dark Mode State (default true for modern Sci-Fi cosmic aesthetics, toggleable)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexora_theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexora_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Trigger 1.5s dimensional loading transition with spinning orbital ring
  const triggerDimensionalLoad = (message: string, callback: () => void) => {
    setLoaderMessage(message);
    setIsDimensionalLoading(true);

    setTimeout(() => {
      callback();
      setIsDimensionalLoading(false);
      // Ensure the newly loaded section is displayed right at the top without scrolling down!
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 1500);
  };

  const handleNavigate = (section: SectionId) => {
    if (section === activeSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Trigger the 1.5s orbital ring animation and then directly present the selected section at top!
    triggerDimensionalLoad(
      `Cargando apartado: ${getSectionTitle(section)}...`,
      () => {
        setActiveSection(section);
      }
    );
  };

  const getSectionTitle = (section: SectionId): string => {
    switch (section) {
      case 'inicio': return 'Inicio';
      case 'nuestro-hotel': return 'Nuestro Hotel (San Antonio de Pichincha)';
      case 'habitaciones': return 'Habitaciones Inteligentes';
      case 'servicios': return 'Piscina, Restaurante & Espacios';
      case 'reservas': return 'Motor de Reservas & Llave Digital';
      case 'eco-guest': return 'Eco-Guest Journey & Sostenibilidad';
      case 'contacto': return 'Contacto & Coordenadas';
      default: return 'Portal';
    }
  };

  const handleBookNow = (preset?: { checkIn: string; checkOut: string; guests: number; roomId: string }) => {
    if (preset?.roomId) {
      setSelectedRoomForBooking(preset.roomId);
    }
    handleNavigate('reservas');
  };

  const handleSelectRoomToBook = (roomId: string) => {
    setSelectedRoomForBooking(roomId);
    handleNavigate('reservas');
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col justify-between ${
      isDarkMode 
        ? 'dark bg-slate-950 text-slate-100 selection:bg-emerald-900 selection:text-emerald-100' 
        : 'bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900'
    }`}>
      {/* 1.5s Dimensional Transition Loader with Animated Orbital Ring */}
      <DimensionalLoader 
        isLoading={isDimensionalLoading} 
        message={loaderMessage}
        isDark={isDarkMode}
      />

      {/* Top Bar Navigation with BrandLogo (transparent vector) and Theme Toggle */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBookClick={() => handleBookNow()}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Quick Section Switcher Bar (Appears under TopBar on non-inicio views for seamless direct jumping) */}
      {activeSection !== 'inicio' && (
        <div className="pt-20 pb-3 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <button 
                onClick={() => handleNavigate('inicio')}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>← Volver al Inicio</span>
              </button>
              <span className="text-slate-400">/</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate">
                {getSectionTitle(activeSection)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
              <button
                onClick={() => handleNavigate('habitaciones')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeSection === 'habitaciones'
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                Habitaciones
              </button>
              <button
                onClick={() => handleNavigate('servicios')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeSection === 'servicios'
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                Piscina & Servicios
              </button>
              <button
                onClick={() => handleNavigate('reservas')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                  activeSection === 'reservas'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }`}
              >
                Motor de Reservas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC VIEW ROUTER: Directly renders the chosen section without scrolling down the page */}
      <main className="flex-1 w-full animate-fade-in">
        {activeSection === 'inicio' && (
          <div className="w-full">
            <Hero
              onReserveClick={handleBookNow}
              onExploreClick={handleNavigate}
            />
          </div>
        )}

        {activeSection === 'nuestro-hotel' && (
          <div className="w-full pt-4">
            <OurHotel />
          </div>
        )}

        {activeSection === 'habitaciones' && (
          <div className="w-full pt-4">
            <Rooms
              onSelectRoomToBook={handleSelectRoomToBook}
            />
          </div>
        )}

        {activeSection === 'servicios' && (
          <div className="w-full pt-4">
            <Services />
          </div>
        )}

        {activeSection === 'reservas' && (
          <div className="w-full pt-4">
            <BookingSimulator
              initialRoomId={selectedRoomForBooking}
              triggerDimensionalLoad={triggerDimensionalLoad}
            />
          </div>
        )}

        {activeSection === 'eco-guest' && (
          <div className="w-full pt-4">
            <EcoProgram />
          </div>
        )}

        {activeSection === 'contacto' && (
          <div className="w-full pt-4">
            <Contact />
          </div>
        )}
      </main>

      {/* Virtual Assistant "Nexu" with Hotel Concierge Distinction, 1.5s Ring Animation, and Speech Bubble */}
      <NexuAssistant
        onNavigateToSection={handleNavigate}
        onOpenBooking={() => handleBookNow()}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
