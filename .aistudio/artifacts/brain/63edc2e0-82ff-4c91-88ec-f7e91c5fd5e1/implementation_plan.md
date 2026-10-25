# NEXORA SMART HOTEL — Plataforma Web y Asistente Virtual Nexi

Diseño UI/UX minimalista y futurista para **NEXORA SMART HOTEL**, un hotel urbano inteligente de 4 estrellas que fusiona exploración dimensional, confort premium y sostenibilidad predictiva. Incluye el motor de reservas interactivo con llave digital QR, el programa Eco-Guest Journey, y la identidad interactiva del asistente holográfico **Nexi** con animación del anillo orbital del logo en transiciones.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones clave confirmadas en la fase de alineación:
> - **Nombre y personalidad del asistente**: **Nexi**, un asistente holográfico amable y futurista con avatar Sci-Fi estilizado en tonos azul y verde portal.
> - **Estilo de animación de carga (1.5s)**: Cargador flotante minimalista centrado con el anillo orbital del logotipo oficial (`image_2adc091d.png`) rotando y emitiendo un pulso cuántico entre transiciones de vistas y consultas.
> - **Experiencia de reserva**: Generación instantánea de **Llave Digital con código QR**, número de habitación dinámico y cálculo en vivo de **Eco-Puntos** acumulados en el programa de fidelización.

---

### 1. Overview & Core Concept

- **Qué es**: La plataforma web oficial de NEXORA SMART HOTEL (4 estrellas superior), concebida bajo una estética minimalista premium (fondo blanco y negro espacial, azul tecnológico e innovador `#0284c7` y verde portal `#10b981`).
- **Público Objetivo**: Viajeros de negocios tech-forward, entusiastas del diseño contemporáneo y turistas urbanos conscientes del medio ambiente que buscan confort sin fricciones mediante domótica IoT y sostenibilidad cuantificable.
- **Propuesta de Valor**: "Una nueva dimensión de hospitalidad" donde la eficiencia energética predictiva y la inteligencia ambiental coexisten con una experiencia inmersiva de ciencia ficción elegante.

---

### 2. User Experience & Visual Design

#### Estructura de Secciones de la Página Web
1. **Header (Top Bar Contract)**:
   - Zona 1: Logotipo oficial de NEXORA con su anillo orbital y tipografía geométrica Sci-Fi.
   - Zona 2: Enlaces limpios sin cápsulas: `Inicio`, `Nuestro Hotel`, `Habitaciones`, `Experiencias`, `Eco-Guest`, `Contacto`.
   - Zona 3: Botón de acción destacado `[Reservar Ahora]` en verde portal con brillo tecnológico.
2. **Hero (Inicio)**:
   - Headline: *Una nueva dimensión de hospitalidad.*
   - Subtítulo editorial con la tríada: *Tecnología predictiva, confort sin límites y sostenibilidad cuántica.*
   - Composición visual con el logotipo oficial y render de arquitectura urbana futurista de cristal y vegetación biofílica.
   - Acceso rápido: Barra de disponibilidad integrada de 1 línea con selector de fechas y huéspedes.
3. **Nuestro Hotel**:
   - Concepto Sci-Fi elegante: Hospitalidad inspirada en la física cuántica y las transiciones dimensionales.
   - Categoría: 4 Estrellas Superior Urbana.
   - Ubicación: *Distrito Metropolitano de Innovación, Av. Horizonte Cuántico 404*.
   - Diferenciador: *Ecosistema IoT centralizado* que reduce el consumo hídrico y eléctrico en un 42% antes de que el huésped note el cambio térmico.
4. **Habitaciones Inteligentes (Catálogo & Ficha Técnica)**:
   - **01. Quantum Comfort (Estándar)**: Cama King bioadaptativa, control lumínico circadiano, cerradura NFC móvil, ducha con medición hidrodinámica predictiva. *(Tarifa: 145€/noche)*.
   - **02. Dimension Horizon (Superior)**: Ventanal panorámico electrocrómico con vista a la ciudad, climatización biométrica, consola táctil de gravedad cero, café de origen sustentable. *(Tarifa: 220€/noche)*.
   - **03. Multiverse Penthouse (Suite Exclusiva)**: Terraza bioclimática privada, cama suspendida magnética, lounge holográfico, concierge virtual Nexi dedicado en pantalla ambiental. *(Tarifa: 385€/noche)*.
5. **Servicios y Experiencias**:
   - *Singularity Bistro & Lab*: Gastronomía molecular y de proximidad con gestión predictiva de mermas mediante IA.
   - *Nexus Hub Coworking*: Cabinas acústicas con enlace cuántico de ultra baja latencia y pantallas OLED translúcidas.
   - *Circadian Bio-Spa*: Pods de regeneración celular, flotación hipersalina y aromaterapia guiada por ritmos biológicos.
   - *E-Mobility Fleet*: Flota de lanzaderas autónomas y puntos de supercarga para vehículos limpios.
6. **Simulador de Reservas**:
   - Formulario fluido: Llegada $\rightarrow$ Salida $\rightarrow$ Huéspedes $\rightarrow$ Habitación $\rightarrow$ Resumen transparente de noches y tasa ecológica $\rightarrow$ `[Confirmar Reserva]`.
   - Al pulsar reservar: Transición de 1.5s con anillo orbital animado, desplegando la **Llave Digital NFC / QR**, asignación de piso y acreditación de Eco-Puntos.
7. **Programa Eco-Guest Journey (Fidelización)**:
   - Cómo funciona: Sensores IoT en habitación premian decisiones sostenibles (duchas óptimas, termostato eficiente, renuncia a lencería diaria innecesaria).
   - Tabla de equivalencias de Eco-Puntos y canjes (cenas, upgrades de habitación, descuentos).
8. **Contacto & Ubicación**:
   - Datos de contacto realistas (teléfono, email, coordenadas, concierge 24/7).
   - Formulario de contacto directo con respuesta interactiva inmediata.

#### Identidad y Módulo del Asistente Virtual: "Nexi"
- **Trigger**: Pop-up flotante en esquina inferior derecha con tooltip dinámico animado: *"¿Tienes dudas? Estoy aquí para ayudarte a navegar tu estancia"*.
- **Avatar**: Robot holográfico estilizado y minimalista en gradiente azul eléctrico y verde portal, con ojos amables y aureola orbital sincronizada con el logo.
- **Personalidad**: Hospitalaria, entusiasta, ágil y educada, con sutiles referencias a la exploración dimensional y el respeto ecológico.
- **Capacidades**:
  - Consulta interactiva por botones rápidos y chat libre: Habitaciones y Precios, Simulador de Reservas, Restaurante & Menú IA, Spa & Wellness, Eco-Puntos y Preguntas Frecuentes.
  - Al procesar respuestas: Muestra la animación de carga de 1.5s donde el anillo gira y emite destellos cuánticos antes de emitir la recomendación.

#### Sistema de Animación Dimensional (1.5 segundos)
- Componente `DimensionalLoader`:
  - Utiliza el anillo orbital del isotipo de NEXORA en SVG optimizado con gradiente `#0284c7` a `#10b981`.
  - Rotación 3D orbital con efecto giroscópico durante exactamente 1500ms al cambiar de sección o invocar a Nexi.
  - Respeta `prefers-reduced-motion`.

---

### 3. Key Product Decisions & Trade-Offs

- **Paleta Oficial Rigurosa**:
  - *Blanco Puro & Travertino Claro (`#FFFFFF`, `#F8FAFC`)*: Dominante (60%) para asegurar amplitud y pulcritud arquitectónica.
  - *Negro Obsidiana (`#0B0F17`, `#020617`)*: Estructural (30%) en tipografías, tarjetas exclusivas y footer espacial.
  - *Azul Tecno & Verde Portal (`#0284C7`, `#10B981`)*: Acento preciso (10%) para CTAs, estados activos y el anillo orbital del logo.
- **Tipografía**:
  - Display y Títulos: `Plus Jakarta Sans` y detalles en `Outfit` con tracking ceñido para un carácter tecnológico de vanguardia.
  - Datos numéricos y tarifas: `tabular-nums` con alineación vertical perfecta.
- **Asistente Virtual Híbrido**:
  - Sistema de conocimiento estructurado con menú de navegación rápida (acceso con un clic a dudas habituales) sumado a un motor de respuesta conversacional adaptado al lore de Nexora.
- **Persistencia Ligera**:
  - Guarda reservas generadas y Eco-Puntos en `localStorage` para que el usuario pueda visualizar su historial de llaves digitales activas durante la sesión.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXORA SMART HOTEL UI                           │
├────────────────────────────────────────────────────────────────────────┤
│  TopBar (Logo oficial con anillo + Navegación + CTA [Reservar Ahora])  │
├────────────────────────────────────────────────────────────────────────┤
│  Vistas Dinámicas:                                                     │
│   ├─ Hero & Concepto Sci-Fi con Selector Rápido                        │
│   ├─ Nuestro Hotel (4 Estrellas, Filosofía IoT & Sostenibilidad)       │
│   ├─ Catálogo 3 Habitaciones (Quantum, Horizon, Penthouse)             │
│   ├─ Servicios & Experiencias (Restaurante IA, Coworking, Spa)         │
│   ├─ Motor de Reservas Interactivo (Cálculo, QR Pass, Eco-Puntos)      │
│   ├─ Programa Eco-Guest Journey (Calculadora de Impacto Verde)         │
│   └─ Contacto & Ubicación                                              │
├────────────────────────────────────────────────────────────────────────┤
│  Componentes Transversales:                                            │
│   ├─ DimensionalLoader (Overlay con anillo orbital animado 1.5s)      │
│   └─ NexiAssistant (Chatbot flotante, avatar Sci-Fi, respuestas 1.5s) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Modelo de Datos en Memoria y Estado React:
- `ActiveSection`: Estado de navegación con activación del `DimensionalLoader` de 1.5s.
- `BookingState`: `{ checkIn, checkOut, guests, roomType, totalAmount, ecoPoints, bookingCode, digitalKey }`.
- `ChatHistory`: Mensajes entre el usuario y Nexi, con estados `idle`, `thinking` (1.5s con giro de anillo) y `responded`.
