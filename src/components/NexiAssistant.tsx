import React, { useState, useEffect, useRef } from 'react';
import { NexiAvatar } from './NexiAvatar';
import { VIRTUAL_ASSISTANT_KNOWLEDGE } from '../data/hotelData';
import { SectionId } from '../types/hotel';

interface NexiAssistantProps {
  onNavigateToSection: (section: SectionId) => void;
  onOpenBooking: () => void;
  isDarkMode?: boolean;
}

interface Message {
  id: string;
  sender: 'nexi' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const NexiAssistant: React.FC<NexiAssistantProps> = ({
  onNavigateToSection,
  onOpenBooking
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitationBadge, setShowInvitationBadge] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'nexi',
      text: VIRTUAL_ASSISTANT_KNOWLEDGE.welcomeMessage,
      time: 'Ahora'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, isOpen]);

  // Hide invitation badge after delay if not opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInvitationBadge(false);
    }, 14000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowInvitationBadge(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || userInput.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Ahora'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput('');

    // Trigger the mandatory 1.5 seconds thinking animation with rotating ring!
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const answer = generateNexiAnswer(query);
      setMessages((prev) => [...prev, answer]);
    }, 1500);
  };

  const generateNexiAnswer = (query: string): Message => {
    const lower = query.toLowerCase();
    const timeNow = 'Ahora';

    // 1. Habitaciones & Tarifas
    if (lower.includes('habitaci') || lower.includes('tarifa') || lower.includes('precio') || lower.includes('costo')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `En NEXORA disponemos de 3 tipologías de alojamiento calibradas:
1. Quantum Comfort (Estándar): 145€/noche. 32 m², cama King bioadaptativa, domótica circadiana y cerradura NFC.
2. Dimension Horizon (Superior): 220€/noche. 46 m², ventanales electrocrómicos panorámicos y sensor de descanso biométrico.
3. Multiverse Penthouse (Suite de Autor): 385€/noche. 88 m², doble altura, terraza bioclimática con hidromasaje y mi asistencia holográfica dedicada.`,
        time: timeNow,
        action: {
          label: 'Ver Habitaciones en Detalle',
          onClick: () => {
            onNavigateToSection('habitaciones');
            setIsOpen(false);
          }
        }
      };
    }

    // 2. Reservas / Simulador / Llave Digital
    if (lower.includes('reserva') || lower.includes('simulador') || lower.includes('disponib') || lower.includes('llave')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `¡Excelente iniciativa! Nuestro motor de reservas genera al instante tu Llave Digital NFC y código QR interactivo para acceder a tu habitación sin pasar por mostradores, además de bonificarte con Eco-Puntos.`,
        time: timeNow,
        action: {
          label: 'Abrir Simulador de Reservas',
          onClick: () => {
            onOpenBooking();
            setIsOpen(false);
          }
        }
      };
    }

    // 3. Restaurante & Mermas IA
    if (lower.includes('restaurante') || lower.includes('singularity') || lower.includes('comida') || lower.includes('cena') || lower.includes('desayun') || lower.includes('ia') || lower.includes('merma')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `Nuestro restaurante Singularity Bistro & Lab combina alta cocina molecular y productos hidropónicos. Lo más innovador es su algoritmo de IA predictiva, que calcula las raciones en tiempo real y ha logrado reducir el desperdicio alimentario al 0%. Horario: 07:30 a 23:30.`,
        time: timeNow,
        action: {
          label: 'Explorar Singularity Bistro',
          onClick: () => {
            onNavigateToSection('servicios');
            setIsOpen(false);
          }
        }
      };
    }

    // 4. Eco-Puntos & Sostenibilidad
    if (lower.includes('eco') || lower.includes('punto') || lower.includes('sostenib') || lower.includes('planeta') || lower.includes('verde') || lower.includes('fideliz')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `Con el programa Eco-Guest Journey, cada acción consciente suma Eco-Puntos automáticos:
• Duchas eficientes (<5 min): +50 pts/día
• Climatización en Modo Eco: +80 pts/día
• Renuncia a cambio diario de lencería: +120 pts
Puedes canjearlos por descuentos del 5% al 15%, cócteles cuánticos, sesiones de Bio-Spa o plantar un árbol con geolocalización.`,
        time: timeNow,
        action: {
          label: 'Calcular mis Eco-Puntos',
          onClick: () => {
            onNavigateToSection('eco-guest');
            setIsOpen(false);
          }
        }
      };
    }

    // 5. Spa & Wellness
    if (lower.includes('spa') || lower.includes('circadian') || lower.includes('masaje') || lower.includes('flotaci') || lower.includes('relax') || lower.includes('crio')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `El Circadian Bio-Spa cuenta con pods de gravedad cero con sales de magnesio, cámaras de crioterapia suave y túneles de luz biofílica diseñados para neutralizar el jet-lag en 45 minutos. Los huéspedes tienen tarifa preferencial y prioridad de cita.`,
        time: timeNow
      };
    }

    // 6. Check-in y Políticas
    if (lower.includes('check') || lower.includes('hora') || lower.includes('cancel') || lower.includes('mascota') || lower.includes('perro') || lower.includes('gato')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `Datos clave de tu estancia:
• Check-in: A partir de las 15:00 (Check-in anticipado digital disponible con tu llave NFC).
• Check-out: Hasta las 12:00 (hasta las 15:00 para miembros Viajero Dimensional).
• Cancelación: 100% gratuita hasta 24 horas antes de la llegada.
• Mascotas: ¡Somos Pet-Friendly! Aceptamos compañeros de hasta 15kg con camita ergonómica y kit bio.`,
        time: timeNow
      };
    }

    // 7. Ubicación y Transporte
    if (lower.includes('ubicaci') || lower.includes('direcci') || lower.includes('llegar') || lower.includes('aeropuerto') || lower.includes('metro') || lower.includes('donde')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexi',
        text: `Estamos ubicados en Av. Horizonte Cuántico 404, en el Distrito de Innovación de la metrópolis. Disponemos de conexión directa con la Línea 10 de Metro a 80 metros y nuestra flota E-Mobility de lanzaderas eléctricas autónomas con enlace directo al aeropuerto en 18 minutos.`,
        time: timeNow,
        action: {
          label: 'Ver Mapa y Contacto',
          onClick: () => {
            onNavigateToSection('contacto');
            setIsOpen(false);
          }
        }
      };
    }

    // General fallback
    return {
      id: `n-${Date.now()}`,
      sender: 'nexi',
      text: `Entiendo tu consulta sobre "${query}". Como asistente cuántico de NEXORA, estoy capacitado para ayudarte con reservas, servicios gastronómicos, especificaciones de habitaciones o detalles de sostenibilidad. ¿Deseas explorar alguna sección en particular?`,
      time: timeNow
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Invitation Pop-up Badge */}
      {!isOpen && (
        <div className="relative flex items-center justify-end">
          {showInvitationBadge && (
            <div 
              onClick={handleOpenChat}
              className="mr-3 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-black/40 cursor-pointer animate-float-subtle flex items-center gap-2.5 hover:border-emerald-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-950 dark:text-white font-display flex items-center gap-1">
                  ¿Tienes dudas?
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  ¡Hola! Soy Nexi. Habla conmigo
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInvitationBadge(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs ml-1"
                aria-label="Cerrar aviso"
              >
                ✕
              </button>
            </div>
          )}

          {/* Avatar Launcher Button */}
          <button
            onClick={handleOpenChat}
            className="group relative p-2.5 bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 text-white rounded-full shadow-2xl shadow-sky-950/30 hover:scale-105 active:scale-95 transition-all focus:outline-none border border-sky-400/30"
            aria-label="Abrir asistente virtual Nexi"
          >
            <NexiAvatar size="md" isThinking={false} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
          </button>
        </div>
      )}

      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl shadow-sky-950/20 dark:shadow-black/60 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col overflow-hidden animate-fade-in transition-colors">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <NexiAvatar size="sm" isThinking={isThinking} />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-display text-white">
                    Nexi Concierge
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                    IA Hotelera
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isThinking ? 'Calculando respuesta (1.5s)...' : 'En línea · Asistente Cuántico'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/60 text-xs transition-colors">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'nexi' && (
                  <div className="shrink-0 mt-0.5">
                    <NexiAvatar size="sm" isThinking={false} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional action button */}
                  {msg.action && (
                    <button
                      onClick={msg.action.onClick}
                      className="mt-3 w-full py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>{msg.action.label}</span>
                      <span>→</span>
                    </button>
                  )}

                  <span
                    className={`text-[9px] block text-right mt-1.5 ${
                      msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Thinking / Orbital ring rotating state for 1.5 seconds */}
            {isThinking && (
              <div className="flex gap-2.5 items-center justify-start animate-fade-in">
                <div className="shrink-0">
                  <NexiAvatar size="sm" isThinking={true} mood="thinking" />
                </div>
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Sincronizando información dimensional...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Clickable Suggestion Topics */}
          <div className="px-3 py-2 bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap no-scrollbar">
            {VIRTUAL_ASSISTANT_KNOWLEDGE.quickTopics.slice(0, 4).map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSendMessage(topic.question)}
                className="py-1 px-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium rounded-lg border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs shrink-0"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregúntale a Nexi sobre tarifas, spa, check-in..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isThinking}
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isThinking}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl disabled:opacity-40 transition-colors shrink-0"
              aria-label="Enviar mensaje a Nexi"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
