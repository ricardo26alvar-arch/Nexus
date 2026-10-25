import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Información General',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase mb-3">
            <span>06. Canales de Comunicación</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Atención 24/7</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
            Conecta con nuestro equipo dimensional
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Estamos disponibles las 24 horas del día tanto en recepción física como a través de nuestro concierge virtual Nexu para resolver cualquier duda sobre tu llegada, eventos privados o traslados.
          </p>
        </div>

        {/* 2-Column Layout: Direct Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Metro Station Card */}
            <div className="p-6 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 transition-colors">
              <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                Ubicación Central
              </span>
              <p className="text-base font-bold text-slate-900 dark:text-white font-display">
                {HOTEL_INFO.location.address}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {HOTEL_INFO.location.postalCode} {HOTEL_INFO.location.city}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                Coordenadas GPS: {HOTEL_INFO.location.coordinates}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                A 3 minutos de la Ciudad Mitad del Mundo (Línea Ecuatorial) con conexión directa por la Av. Manuel Córdova Galarza.
              </p>
            </div>

            {/* Direct Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-colors">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Teléfono Directo
                </span>
                <a
                  href={`tel:${HOTEL_INFO.location.phone}`}
                  className="text-base font-bold text-slate-900 dark:text-white font-display hover:text-sky-600 dark:hover:text-emerald-400 transition-colors block mt-1"
                >
                  {HOTEL_INFO.location.phone}
                </a>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Atención en ES / EN 24h</span>
              </div>

              <div className="p-5 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-colors">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Reservas & Dudas
                </span>
                <a
                  href={`mailto:${HOTEL_INFO.location.email}`}
                  className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-emerald-400 transition-colors block mt-1 truncate"
                >
                  {HOTEL_INFO.location.email}
                </a>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Respuesta &lt; 15 min</span>
              </div>
            </div>

            {/* Social Networks */}
            <div className="p-5 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2 transition-colors">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Comunidad Dimensional & Redes
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Instagram:</span>
                <span className="text-sky-600 dark:text-sky-400">{HOTEL_INFO.location.socials.instagram}</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="font-semibold text-slate-900 dark:text-white">X:</span>
                <span className="text-sky-600 dark:text-sky-400">{HOTEL_INFO.location.socials.twitter}</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="font-semibold text-slate-900 dark:text-white">LinkedIn:</span>
                <span className="text-sky-600 dark:text-sky-400">{HOTEL_INFO.location.socials.linkedin}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display">
                  ¡Mensaje transmitido con éxito!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Gracias {formData.name}. Nuestro equipo o Nexu responderán a <strong>{formData.email}</strong> en menos de 15 minutos dimensionales.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Información General', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  Envíanos una solicitud directa
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tucorreo@dominio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Motivo de la Consulta
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                  >
                    <option value="Información General">Información General & Servicios</option>
                    <option value="Modificación de Reserva">Modificación o Cancelación de Reserva</option>
                    <option value="Singularity Bistro">Reserva Gastronómica en Singularity Bistro</option>
                    <option value="Eventos & Coworking">Eventos Corporativos o Salas Nexus Hub</option>
                    <option value="Programa Eco-Puntos">Dudas sobre Eco-Puntos & Certificación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Mensaje o Requerimiento Especial
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe en qué podemos colaborar para hacer tu estancia inolvidable..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 rounded-xl shadow-md transition-all transform active:scale-98"
                >
                  Transmitir Mensaje
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
