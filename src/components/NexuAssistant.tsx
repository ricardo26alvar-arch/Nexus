import React, { useState, useEffect, useRef } from 'react';
import { NexuAvatar } from './NexuAvatar';
import { VIRTUAL_ASSISTANT_KNOWLEDGE, ROOMS, HOTEL_INFO } from '../data/hotelData';
import { SectionId } from '../types/hotel';

interface NexuAssistantProps {
  onNavigateToSection: (section: SectionId) => void;
  onOpenBooking: () => void;
  isDarkMode?: boolean;
}

interface Message {
  id: string;
  sender: 'nexu' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const NexuAssistant: React.FC<NexuAssistantProps> = ({
  onNavigateToSection,
  onOpenBooking,
  isDarkMode = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitationBubble, setShowInvitationBubble] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'nexu',
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

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowInvitationBubble(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
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

    // Trigger the 1.5 seconds thinking animation with rotating orbital ring
    setIsThinking(true);
    const startTime = Date.now();

    // Prepare recent conversation history for Gemini API
    const historyPayload = messages.slice(-5).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch('/api/nexu/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, 1500 - elapsed);

          setTimeout(() => {
            setIsThinking(false);
            setMessages((prev) => [
              ...prev,
              {
                id: `n-${Date.now()}`,
                sender: 'nexu',
                text: data.reply,
                time: 'Ahora',
              },
            ]);
          }, remainingDelay);
          return;
        }
      }
    } catch {
      // Graceful fallback to rich local knowledge response if offline or timeout
    }

    // Fallback if offline or API unreachable
    const elapsed = Date.now() - startTime;
    const remainingDelay = Math.max(0, 1500 - elapsed);
    setTimeout(() => {
      setIsThinking(false);
      const answer = generateNexuAnswer(query);
      setMessages((prev) => [...prev, answer]);
    }, remainingDelay);
  };

  const generateNexuAnswer = (query: string): Message => {
    const lower = query.toLowerCase();
    const timeNow = 'Ahora';

    // 1. Piscina & Restaurante
    if (lower.includes('piscina') || lower.includes('pileta') || lower.includes('agua') || lower.includes('nadar') || lower.includes('restaurante') || lower.includes('comida') || lower.includes('desayun') || lower.includes('almuerz') || lower.includes('cena')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `🏊 Piscina Climatizada Cuántica:
Está climatizada a una temperatura agradable constante de 29°C mediante energía geotérmica y solar. Cuenta con hidromasaje relajante, tumbonas térmicas y ventanales panorámicos hacia los Andes. Su acceso está 100% INCLUIDO en todas las reservas.

🍽️ Restaurante Principal:
Ofrece desayunos buffet andinos e internacionales, almuerzos y cenas temáticas inspiradas en dimensiones de Rick y Morty, con deliciosa comida ecuatoriana (ceviches, locros, hornado de autor) y un sistema de IA Winnow que previene el 50% de desperdicio de alimentos.`,
        time: timeNow,
        action: {
          label: 'Ver Experiencias, Piscina & Restaurante',
          onClick: () => {
            onNavigateToSection('servicios');
            setIsOpen(false);
          }
        }
      };
    }

    // 2. Habitaciones & Precios en USD ($)
    if (lower.includes('habitaci') || lower.includes('tarifa') || lower.includes('precio') || lower.includes('costo') || lower.includes('$') || lower.includes('dolar') || lower.includes('cuanto')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `Contamos con 60 habitaciones inteligentes en 5 categorías (precios en $ USD):
1. Junior Suite (8 habs): $145/noche · Cama King, sala de estar separada, Tablet GRMS y 2 Smart TV 55".
2. Triple (9 habs): $120/noche · 3 camas individuales, panel digital y cargadores inalámbricos.
3. Matrimonial (20 habs): $105/noche · Cama King con portal galáctico LED, pequeña sala y control por voz.
4. Doble Twin (13 habs): $95/noche · 2 camas separadas con vistas panorámicas a la Mitad del Mundo.
5. Individual (10 habs): $75/noche · Plaza y media, escritorio de trabajo y ducha ecológica.`,
        time: timeNow,
        action: {
          label: 'Ver Catálogo y Fotos de Habitaciones',
          onClick: () => {
            onNavigateToSection('habitaciones');
            setIsOpen(false);
          }
        }
      };
    }

    // 3. Reservas / Simulador / Inclusiones
    if (lower.includes('reserva') || lower.includes('simulador') || lower.includes('incluye') || lower.includes('llave') || lower.includes('pase')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `¡Todas nuestras reservas en NEXORA incluyen:
✓ Acceso diario a la Piscina Climatizada Cuántica e hidromasaje.
✓ Acceso al gimnasio Rick's Lab Fitness Center y Área Recreativa VR.
✓ Generación inmediata de tu Llave Digital NFC / QR para tu smartphone.
✓ Wi-Fi 6 de 1 Gbps y estacionamiento con cargadores eléctricos.
✓ Posibilidad de agregar Desayuno Buffet Ecuatoriano e Internacional.
✓ Acreditación instantánea de Eco-Puntos para tu programa de fidelización.`,
        time: timeNow,
        action: {
          label: 'Ir al Simulador de Reservas',
          onClick: () => {
            onOpenBooking();
            setIsOpen(false);
          }
        }
      };
    }

    // 4. Ubicación & Mitad del Mundo
    if (lower.includes('ubicaci') || lower.includes('donde') || lower.includes('mitad del mundo') || lower.includes('san antonio') || lower.includes('quito') || lower.includes('turism') || lower.includes('llegar')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `📍 Ubicación Emblemática:
NEXORA SMART HOTEL está ubicado en San Antonio de Pichincha, Quito, Ecuador, en el entorno directo de la Ciudad Mitad del Mundo (Línea Ecuatorial 0°00'00").
Es el punto estratégico perfecto para visitar el monumento ecuatorial, el cráter del volcán Pululahua, museos etnográficos y disfrutar de la gastronomía típica de la zona, a solo 25 minutos del centro norte de Quito.`,
        time: timeNow,
        action: {
          label: 'Ver Coordenadas y Contacto',
          onClick: () => {
            onNavigateToSection('contacto');
            setIsOpen(false);
          }
        }
      };
    }

    // 5. Portal Bar & Rick's Lab & VR
    if (lower.includes('bar') || lower.includes('trago') || lower.includes('portal bar') || lower.includes('rick') || lower.includes('gym') || lower.includes('fitness') || lower.includes('vr') || lower.includes('juego')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `🍸 Portal Bar: Punto nocturno con cócteles temáticos en tonos verde y azul, ambientación de portales y música futurista.
🏋️ Rick's Lab Fitness: Gimnasio estilo laboratorio científico con caminadoras que convierten tu ejercicio en energía limpia.
🎮 Área Recreativa VR: Zona gamer con videojuegos, simuladores de carreras interdimensionales y puntos fotográficos de Rick y Morty.`,
        time: timeNow
      };
    }

    // 6. Eco-Puntos & Sostenibilidad
    if (lower.includes('eco') || lower.includes('punto') || lower.includes('sostenib') || lower.includes('solar') || lower.includes('planeta') || lower.includes('fideliz')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `NEXORA cuenta con una microrred solar fotovoltaica de 120 kWp acoplada a baterías de litio BESS de 150 kWh. Con el programa "Eco-Guest Journey", tus decisiones sostenibles (duchas eficientes, modo eco de clima, no cambiar toallas diariamente) te otorgan Eco-Puntos canjeables por descuentos en dólares ($), cócteles o árboles plantados a tu nombre.`,
        time: timeNow,
        action: {
          label: 'Calcular Eco-Puntos',
          onClick: () => {
            onNavigateToSection('eco-guest');
            setIsOpen(false);
          }
        }
      };
    }

    // 7. Check-in / Check-out / Estacionamiento
    if (lower.includes('check') || lower.includes('hora') || lower.includes('llegada') || lower.includes('salida') || lower.includes('estacionamiento') || lower.includes('parqueadero') || lower.includes('auto') || lower.includes('carro')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `🕒 Horarios y Accesos:
• Check-in: A partir de las 14:00 (Check-in 100% digital desde tu smartphone con llave NFC/QR instantánea).
• Check-out: Hasta las 12:00 (Huéspedes del nivel Viajero o Guardián disfrutan de Late Check-out sin recargo).
• Estacionamiento: 25 plazas techadas y monitoreadas con videovigilancia inteligente y estaciones de carga rápida para vehículos eléctricos (EV).`,
        time: timeNow
      };
    }

    // 8. Saludos y conversación general
    if (lower.includes('hola') || lower.includes('buenos dias') || lower.includes('buenas tardes') || lower.includes('buenas noches') || lower.includes('que tal') || lower.includes('quien eres')) {
      return {
        id: `n-${Date.now()}`,
        sender: 'nexu',
        text: `¡Hola! Un gusto saludarte. Soy Nexu, tu concierge hotelero holográfico en NEXORA SMART HOTEL.
¿En qué dimensión o servicio puedo orientarte hoy? Puedo ayudarte a elegir entre nuestras 5 habitaciones (Junior Suite, Triple con 3 camas, Matrimonial, Doble Twin o Individual), contarte sobre el agua a 29°C de la piscina climatizada, el restaurante con menús en tablets, los cócteles del Portal Bar o cómo acumular Eco-Puntos en tu viaje.`,
        time: timeNow
      };
    }

    // General contextual answer
    return {
      id: `n-${Date.now()}`,
      sender: 'nexu',
      text: `¡Con gusto te colaboro con tu consulta sobre "${query}"!
En NEXORA SMART HOTEL (San Antonio de Pichincha, Mitad del Mundo) nuestro equipo y yo estamos a tu completa disposición.
• Todas las habitaciones incluyen acceso a la Piscina Climatizada (29°C), gimnasio Rick's Lab y desayuno buffet.
• Los precios van desde $75 hasta $145 USD por noche con llave digital instantánea al reservar.
¿Deseas que te asista con la reserva de algún plan o necesitas más detalles sobre una experiencia en particular?`,
      time: timeNow,
      action: {
        label: 'Ver Catálogo de Habitaciones y Fotos',
        onClick: () => {
          onNavigateToSection('habitaciones');
          setIsOpen(false);
        }
      }
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Prominent Floating Speech Bubble & Avatar Launcher */}
      {!isOpen && (
        <div className="relative flex items-center justify-end">
          
          {/* Prominent Floating Speech Bubble: "Hola, soy Nexu. ¿Necesitas ayuda?" */}
          {showInvitationBubble && (
            <div 
              onClick={handleOpenChat}
              className={`mr-3.5 py-3 px-4 rounded-2xl shadow-2xl border cursor-pointer animate-float-subtle flex items-center gap-3 transition-all relative ${
                isDarkMode 
                  ? 'bg-slate-900 border-emerald-500/50 text-white shadow-black/60' 
                  : 'bg-white border-emerald-500/40 text-slate-900 shadow-sky-950/15'
              }`}
            >
              {/* Tail pointing towards avatar */}
              <div 
                className={`absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[8px] ${
                  isDarkMode ? 'border-l-slate-900' : 'border-l-white'
                }`} 
              />

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold font-display text-emerald-600 dark:text-emerald-400 leading-tight">
                  Hola, soy Nexu. ¿Necesitas ayuda?
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5">
                  Concierge Turístico & Reservas 24/7
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInvitationBubble(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs ml-1 p-1"
                aria-label="Cerrar globo"
              >
                ✕
              </button>
            </div>
          )}

          {/* Avatar Launcher Button with Hotel Concierge Distinction */}
          <button
            onClick={handleOpenChat}
            className="group relative p-2.5 bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 text-white rounded-full shadow-2xl shadow-sky-950/40 hover:scale-105 active:scale-95 transition-all focus:outline-none border-2 border-emerald-400/50"
            aria-label="Abrir asistente virtual Nexu"
          >
            <NexuAvatar size="md" isThinking={false} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
          </button>
        </div>
      )}

      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div className={`border rounded-3xl shadow-2xl w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh] flex flex-col overflow-hidden animate-fade-in transition-colors ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 shadow-black/70 text-white' 
            : 'bg-white border-slate-200/90 shadow-sky-950/20 text-slate-900'
        }`}>
          
          {/* Header with Nexu Distinction */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <NexuAvatar size="sm" isThinking={isThinking} />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-display text-white">
                    Nexu
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono font-bold">
                    Hotel & Turismo
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isThinking ? 'Procesando en el multiverso (1.5s)...' : 'San Antonio de Pichincha · Mitad del Mundo'}
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
          <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 text-xs transition-colors ${
            isDarkMode ? 'bg-slate-950/70' : 'bg-slate-50/50'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'nexu' && (
                  <div className="shrink-0 mt-0.5">
                    <NexuAvatar size="sm" isThinking={false} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-sm'
                      : isDarkMode
                        ? 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
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
                      msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
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
                  <NexuAvatar size="sm" isThinking={true} mood="thinking" />
                </div>
                <div className={`p-3.5 rounded-2xl border shadow-sm flex items-center gap-2 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-medium">
                    Nexu está consultando la información del hotel...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Topics */}
          <div className={`px-3 py-2 border-t flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap no-scrollbar ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/70 border-slate-200/80'
          }`}>
            {VIRTUAL_ASSISTANT_KNOWLEDGE.quickTopics.slice(0, 4).map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSendMessage(topic.question)}
                className={`py-1 px-2.5 font-medium rounded-lg border transition-colors shadow-2xs shrink-0 ${
                  isDarkMode 
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border-slate-200'
                }`}
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
            className={`p-3 border-t flex items-center gap-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <input
              type="text"
              placeholder="Pregúntale a Nexu sobre piscina, restaurante, precios en $..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isThinking}
              className={`flex-1 px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 border disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isThinking}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl disabled:opacity-40 transition-colors shrink-0"
              aria-label="Enviar mensaje a Nexu"
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
