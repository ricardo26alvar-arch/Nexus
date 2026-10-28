import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BOOKINGS_FILE = path.resolve(__dirname, 'data', 'bookings.json');

// File-based persistence helpers for bookings
async function readBookings(): Promise<any[]> {
  try {
    if (!existsSync(BOOKINGS_FILE)) {
      return [];
    }
    const data = await fs.readFile(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer data/bookings.json:', err);
    return [];
  }
}

async function saveBooking(booking: any): Promise<any[]> {
  try {
    const dataDir = path.dirname(BOOKINGS_FILE);
    if (!existsSync(dataDir)) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    const bookings = await readBookings();
    const existingIndex = bookings.findIndex(
      (b: any) => b.confirmationCode && b.confirmationCode === booking.confirmationCode
    );
    if (existingIndex >= 0) {
      bookings[existingIndex] = { ...bookings[existingIndex], ...booking };
    } else {
      bookings.push(booking);
    }
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    return bookings;
  } catch (err) {
    console.error('Error al guardar en data/bookings.json:', err);
    throw err;
  }
}

const NEXU_BASE_SYSTEM_PROMPT = `Eres Nexu, el concierge turístico y asistente inteligente holográfico oficial de NEXORA SMART HOTEL.
Tu identidad combina la hospitalidad de alta gama de un hotel 4 estrellas en la Mitad del Mundo (Quito, Ecuador) con sutiles toques de ciencia ficción (multiversos, portales inspirados en Rick y Morty) y sostenibilidad predictiva.
Llevas puesto el distintivo oficial del hotel: gorra de concierge hotelero, pin dorado de portal dimensional y credencial turística al cuello.

INFORMACIÓN COMPLETA DEL HOTEL:
- Nombre: NEXORA SMART HOTEL. Slogan: "Una nueva dimensión de hospitalidad".
- Categoría: Hotel Urbano Temático de 4 Estrellas.
- Ubicación: Av. Manuel Córdova Galarza, San Antonio de Pichincha, Quito, Ecuador (a pocos metros de la Ciudad Mitad del Mundo, Latitud 0°00'00").
- Edificio: 8 pisos, 60 habitaciones inteligentes, capacidad para 119 huéspedes, 25 plazas de estacionamiento con cargadores para autos eléctricos (EV).
- Precios y Habitaciones (todas las tarifas son en Dólares Americanos $ USD por noche):
  1. Junior Suite (8 unidades): $145/noche. Cama King de gran tamaño, sala de estar independiente para reuniones, 2 Smart TV de 55", Tablet GRMS para control de luces, clima y room service.
  2. Habitación Triple (9 unidades): $120/noche. Cuenta con exactamente 3 camas individuales confortables independientes, panel digital y cargadores inductivos en cada cabecera.
  3. Habitación Matrimonial (20 unidades): $105/noche. Cama Matrimonial King con cabecero decorativo de portal galáctico iluminado en cian y esmeralda, pequeña sala, control por voz.
  4. Habitación Doble Twin (13 unidades): $95/noche. 2 camas individuales separadas con vistas panorámicas a los Andes y la Mitad del Mundo.
  5. Habitación Individual (10 unidades): $75/noche. Cama plaza y media, escritorio de trabajo, internet de 1 Gbps simétrico.

SERVICIOS INCLUIDOS EN CADA RESERVA (100% GRATIS):
- Acceso libre a la Piscina Climatizada Cuántica a 29°C constante con hidromasaje y cromoterapia.
- Desayuno buffet andino e internacional en el Restaurante Principal.
- Acceso a Rick's Lab Fitness Center (gimnasio con máquinas que convierten el ejercicio en energía limpia).
- Pase al Área Recreativa & Simuladores VR (videojuegos, punto fotográfico del portal de Rick y Morty).
- Llave Digital instantánea (NFC / código QR) directamente al smartphone tras la reserva.
- Wi-Fi 6 de alta velocidad en todo el complejo.

GASTRONOMÍA Y BEBIDAS:
- Restaurante Principal: Cuenta con tablets táctiles digitales en cada mesa para consultar el menú, alérgenos y ordenar en tiempo real. Platos tradicionales ecuatorianos (ceviches, locros, hornado gourmet) y toques de mixología/cocina molecular. Tecnología IA Winnow que previene el 50% del desperdicio de comida.
- Portal Bar & Lounge: Coctelería de autor ("Portal Gun Gin", "Citadel Mule", "Multiverse Sour"), música chill ambiental y tapas.

SOSTENIBILIDAD & ECO-GUEST JOURNEY:
- Microrred solar fotovoltaica propia de 120 kWp con baterías BESS de 150 kWh de litio.
- Programa de Fidelización "Eco-Guest Journey" con 3 niveles:
  * Nivel 1: Explorador (0 - 500 Eco-Puntos)
  * Nivel 2: Viajero (501 - 1,500 Eco-Puntos)
  * Nivel 3: Guardián (1,501+ Eco-Puntos)
- Los Eco-Puntos se ganan con duchas eficientes de menos de 5 min (+50 pts), modo eco de clima (+80 pts), no cambiar toallas diariamente (+120 pts), y se canjean por descuentos en dólares ($) o cócteles.

TURISMO Y ENTORNO:
- Muy cerca de: Ciudad Mitad del Mundo (monumento ecuatorial, efecto Coriolis), Museo Intiñan, Reserva Geobotánica del Pululahua (cráter habitado), a 25 min del Centro Histórico de Quito.

INSTRUCCIONES DE RESPUESTA:
- Responde siempre en español.
- Sé cordial, empático, entusiasta, servicial y profesional.
- Resuelve cualquier consulta que te haga el huésped, ya sea sobre el hotel, recomendaciones de paseos, horarios, dudas sobre la reserva, o cualquier pregunta fuera de lo habitual, usando tu razonamiento de concierge.
- Si preguntan precios, utiliza siempre el símbolo de dólar ($).
- Mantén las respuestas conversacionales, claras y legibles (puedes usar viñetas y emojis con moderación para dar calidez).`;

function buildNexuSystemPrompt(bookings: any[]): string {
  const bookingsJson = bookings.length > 0
    ? JSON.stringify(bookings, null, 2)
    : '[] (No hay reservas almacenadas actualmente)';

  return `${NEXU_BASE_SYSTEM_PROMPT}

ACCESO A LA BASE DE DATOS DE RESERVAS DEL HOTEL (ARCHIVO PERSISTENTE):
Tienes acceso directo y en tiempo real a las reservas registradas en el hotel:
\`\`\`json
${bookingsJson}
\`\`\`

PROTOCOLO ESTRICTO DE CONFIRMACIÓN DE IDENTIDAD PARA CONSULTAS DE RESERVAS:
1. SI EL USUARIO PREGUNTA POR UNA RESERVA O SU ESTADÍA:
   (Por ejemplo: "tengo una reserva?", "quiero saber de mi reserva", "cuándo llego?", "cuál es mi habitación?", "cuánto pagué?", "dame mis datos de reserva", etc.):
   
   - PASO OBLIGATORIO DE PRIVACIDAD: Si el usuario todavía NO ha proporcionado su NOMBRE COMPLETO ni su CORREO ELECTRÓNICO en este mensaje o en los mensajes previos de la conversación:
     * ¡BAJO NINGUNA CIRCUNSTANCIA reveles los datos de ninguna reserva de inmediato!
     * Pídele de manera muy atenta y profesional que confirme su identidad indicando su Nombre Completo o la dirección de Correo Electrónico asociada a la reserva.
     * Ejemplo de respuesta:
       "¡Hola! Con mucho gusto puedo darte toda la información de tu reserva. Por motivos de seguridad y privacidad del hotel, ¿podrías por favor confirmarme tu Nombre Completo o el Correo Electrónico con el que realizaste la reserva?"

2. CUANDO EL USUARIO PROPORCIONE SU NOMBRE O CORREO ELECTRÓNICO:
   - Busca en la base de datos de reservas de arriba si existe coincidencia con 'guestName' o 'guestEmail' (comparación flexible, sin distinguir mayúsculas/minúsculas ni acentos).
   
   - SI COINCIDE CON UNA RESERVA (IDENTIDAD CONFIRMADA):
     * Salúdalo con alegría confirmando su identidad: "¡Identidad confirmada exitosamente, [Nombre]! Aquí tienes los detalles completos de tu reserva en NEXORA SMART HOTEL:"
     * Presenta de manera impecable y completa:
       • Código de Confirmación: [confirmationCode]
       • Titular: [guestName] ([guestEmail])
       • Habitación Asignada: [roomName o roomId] - [roomNumber]
       • Fechas de Estadía: Check-in [checkIn] / Check-out [checkOut] ([totalNights] noches)
       • Número de Huéspedes: [guests] persona(s)
       • Plan de Alimentación: [mealPlanName o mealPlan]
       • Servicios Incluidos: Piscina Climatizada Cuántica a 29°C y Gimnasio Rick's Lab
       • Inversión Total: $[totalPrice] USD
       • Eco-Puntos Acumulados: [ecoPointsEarned] puntos (Programa Eco-Guest Journey)
       • Llave Digital: Activa vía NFC y Código QR en tu smartphone
     * Cierra preguntándole si desea alguna recomendación sobre el restaurante con tablets o actividades en la Mitad del Mundo.

   - SI NO COINCIDE CON NINGUNA RESERVA:
     * Responde con amabilidad que no se encontró ninguna reserva registrada bajo ese nombre o correo electrónico en la base de datos del hotel.
     * Invítalo a verificar si fue registrada con otro correo/nombre, o si desea que le ayudes a realizar una reserva en este momento.`;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // CORS and body parser
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json());

  // Initialize Gemini client on server with telemetry
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Helper with timeout to call Gemini API with dynamic system instructions
  async function callGemini(model: string, contents: any[], systemInstruction: string): Promise<string | null> {
    if (!ai) return null;
    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout en modelo Gemini')), 9000)
    );

    const callPromise = (async () => {
      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });
      return response.text || null;
    })();

    return Promise.race([callPromise, timeoutPromise]);
  }

  // REST endpoints for Bookings persistence
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await readBookings();
      res.json({ success: true, bookings });
    } catch (err: any) {
      res.status(500).json({ error: 'Error al consultar reservas', details: err?.message });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    try {
      const newBooking = req.body;
      if (!newBooking || !newBooking.guestName) {
        return res.status(400).json({ error: 'Datos de reserva incompletos' });
      }
      const updatedList = await saveBooking(newBooking);
      console.log(`[Bookings] Nueva reserva guardada exitosamente: ${newBooking.confirmationCode || 'Sin código'} para ${newBooking.guestName}`);
      res.json({ success: true, count: updatedList.length, booking: newBooking });
    } catch (err: any) {
      res.status(500).json({ error: 'Error al persistir la reserva', details: err?.message });
    }
  });

  // API endpoint for Nexu Virtual Assistant with fast model, booking database & identity confirmation
  app.post('/api/nexu/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensaje requerido' });
      }

      // Read current bookings from persistent file
      const currentBookings = await readBookings();
      const dynamicPrompt = buildNexuSystemPrompt(currentBookings);

      // Build contents array supporting conversation history
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      let reply: string | null = null;

      // Primary: gemini-3.1-flash-lite (ultra-fast ~1-2s response time)
      try {
        reply = await callGemini('gemini-3.1-flash-lite', contents, dynamicPrompt);
      } catch (err: any) {
        console.warn('gemini-3.1-flash-lite error, attempting fallback:', err?.message || err);
      }

      // Fallback: gemini-3.8-flash if primary timed out or failed
      if (!reply) {
        try {
          reply = await callGemini('gemini-3.8-flash', contents, dynamicPrompt);
        } catch (err2: any) {
          console.warn('gemini-3.8-flash error:', err2?.message || err2);
        }
      }

      if (reply) {
        return res.json({ reply, source: 'gemini-ai' });
      }

      // Intelligent local contextual fallback for bookings & hotel info if AI model unreachable
      const lowerMsg = message.toLowerCase();
      const isAskingBooking = lowerMsg.includes('reserva') || lowerMsg.includes('habitacion') || lowerMsg.includes('estadia') || lowerMsg.includes('check');
      
      if (isAskingBooking) {
        // Check if any booking name or email is in the message or history
        const matched = currentBookings.find((b: any) => {
          const namePart = (b.guestName || '').toLowerCase();
          const emailPart = (b.guestEmail || '').toLowerCase();
          return (namePart && lowerMsg.includes(namePart)) || (emailPart && lowerMsg.includes(emailPart));
        });

        if (matched) {
          return res.json({
            reply: `¡Identidad confirmada exitosamente, ${matched.guestName}! Aquí tienes los detalles de tu reserva:
• Código de Confirmación: ${matched.confirmationCode}
• Habitación: ${matched.roomNumber || matched.roomName || 'Asignada'}
• Estadía: Check-in ${matched.checkIn} / Check-out ${matched.checkOut} (${matched.totalNights || 1} noches)
• Huéspedes: ${matched.guests} persona(s)
• Inclusiones: Piscina Cuántica a 29°C y Restaurante con tablets
• Total: $${matched.totalPrice} USD | Eco-Puntos: ${matched.ecoPointsEarned || 0}
• Llave Digital: Activa en tu smartphone. ¡Te esperamos en la Mitad del Mundo!`,
            source: 'booking-engine-verified',
          });
        } else {
          return res.json({
            reply: `¡Hola! Con mucho gusto te ayudo a consultar tu reserva. Por motivos de seguridad y privacidad del hotel, ¿podrías por favor confirmarme tu Nombre Completo o el Correo Electrónico con el que realizaste la reserva?`,
            source: 'identity-verification-request',
          });
        }
      }

      // General fallback
      return res.json({
        reply: `¡Hola! Como concierge de NEXORA SMART HOTEL, con gusto respondo a tu consulta sobre "${message}".
• Nuestras 60 habitaciones inteligentes van desde $75 hasta $145 USD por noche (Junior Suite $145, Triple con 3 camas $120, Matrimonial $105, Doble Twin $95, Individual $75).
• Todas las estadías incluyen acceso a la Piscina Climatizada Cuántica a 29°C, Desayuno Buffet en nuestro Restaurante con tablets y gimnasio Rick's Lab.
• Nos encontramos en la Ciudad Mitad del Mundo (San Antonio de Pichincha, Quito). ¿Te gustaría consultar disponibilidad o revisar tu reserva?`,
        source: 'knowledge-engine',
      });
    } catch (error: any) {
      console.error('Error in /api/nexu/chat:', error);
      return res.json({
        reply: '¡Hola! Soy Nexu. Estoy a tu disposición para ayudarte con tarifas en $, habitaciones, la piscina climatizada a 29°C, gastronomía y reservas en la Mitad del Mundo. ¿Qué detalle te gustaría conocer?',
        source: 'fallback',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // Vite middleware in dev (with hmr: false to prevent WebSocket closed errors) or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: false, // explicitly disable HMR websocket to eliminate WebSocket closed rejections
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexora Smart Hotel server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
