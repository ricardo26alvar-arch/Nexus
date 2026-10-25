import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEXU_SYSTEM_PROMPT = `Eres Nexu, el concierge turístico y asistente inteligente holográfico oficial de NEXORA SMART HOTEL.
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

SERVICIOS INCLUIDOS EN CADA RESERVA:
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
- Mantén las respuestas conversacionales, claras y legibles (puedes usar emojis con moderación para dar calidez).`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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

  // API endpoint for Nexu Virtual Assistant
  app.post('/api/nexu/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensaje requerido' });
      }

      if (!ai) {
        return res.status(503).json({ 
          error: 'Gemini API no configurada en el servidor',
          useFallback: true 
        });
      }

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

      // Append current user query
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: NEXU_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Disculpa, no pude procesar la respuesta en este momento. ¿Cómo puedo ayudarte con las instalaciones del hotel?';

      return res.json({ reply });
    } catch (error: any) {
      console.error('Error in /api/nexu/chat:', error);
      return res.status(500).json({
        error: error?.message || 'Error al comunicarse con Gemini',
        useFallback: true,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
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
