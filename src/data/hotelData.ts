import { Room, Experience } from '../types/hotel';

export const HOTEL_INFO = {
  name: 'NEXORA SMART HOTEL',
  slogan: 'Una nueva dimensión de hospitalidad',
  stars: 4,
  starsLabel: 'Hotel Urbano Temático de Categoría 4 Estrellas',
  building: {
    floors: 8,
    totalRooms: 60,
    guestCapacity: 119,
    parkingSpaces: 25
  },
  location: {
    address: 'Av. Manuel Córdova Galarza, San Antonio de Pichincha',
    city: 'Quito, Provincia de Pichincha, Ecuador',
    landmark: 'Entorno de la Ciudad Mitad del Mundo (Línea Ecuatorial)',
    postalCode: '170116',
    coordinates: '0°00′00″N, 78°27′26″W',
    phone: '+593 2 299 8400',
    email: 'reservas@nexorahotel.com',
    supportEmail: 'concierge.nexu@nexorahotel.com',
    socials: {
      instagram: '@nexorasmarthotel',
      tiktok: '@nexorahotel_ec',
      twitter: '@nexorahotel',
      linkedin: 'nexora-smart-hotel-quito'
    }
  },
  valueProps: [
    {
      title: 'Tecnología Inteligente',
      desc: 'Habitaciones con control por Tablet, app móvil, cerradura digital, reconocimiento facial y comandos de voz sin tarjetas plásticas.'
    },
    {
      title: 'Temática Dimensional Rick & Morty',
      desc: 'Ambientación elegante inspirada en portales, el espacio y multiversos, creando una experiencia inmersiva e instagrameable única en Ecuador.'
    },
    {
      title: 'Sostenibilidad Predictiva',
      desc: 'Microrred solar fotovoltaica (120 kWp), reducción del 42% en consumo de agua/luz, gestión circular de alimentos y Eco-Puntos.'
    }
  ],
  stats: [
    { label: 'Categoría Oficial', value: '4 Estrellas Urbano' },
    { label: 'Habitaciones Inteligentes', value: '60 Habitaciones / 8 Pisos' },
    { label: 'Ubicación Emblemática', value: 'Mitad del Mundo, Quito' },
    { label: 'Energía Solar & BESS', value: '120 kWp Solar + Baterías' }
  ]
};

export const ROOMS: Room[] = [
  {
    id: 'junior-suite',
    name: 'Junior Suite',
    category: 'Suite Ejecutiva con Cama King & Sala Separada',
    image: '/src/assets/images/room_junior_king_bed_1792965654710.jpg',
    images: [
      '/src/assets/images/room_junior_king_bed_1792965654710.jpg',
      '/src/assets/images/room_junior_suite_living_1792963403392.jpg',
      '/src/assets/images/room_bathroom_smart_1792963403371.jpg',
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg'
    ],
    quantity: 8,
    capacity: '2 Personas',
    size: '48 m²',
    pricePerNight: 145,
    highlight: 'Máxima comodidad, amplitud y privacidad con cama King y sala de estar independiente',
    description: 'La habitación más exclusiva de NEXORA. Cuenta con una imponente cama King ergonómica de alto confort, sala de estar separada para recibir visitas o trabajar, dos pantallas Smart TV de 55" y una Tablet GRMS dedicada para el control de iluminación, temperatura y room service.',
    features: [
      'Cama King de gran tamaño de alto confort con lencería de algodón egipcio',
      'Sala de estar separada con sofá contemporáneo y mesa de diseño',
      'Closet grande vestidor con iluminación perimetral LED',
      'Escritorio ergonómico con conexión USB y USB-C de carga ultra-rápida',
      'Mini nevera gourmet con bebidas saludables y cortesías locales',
      'Caja fuerte digital con capacidad para ordenador portátil',
      'Baño moderno con espejo inteligente táctil y ducha de lluvia bioadaptativa'
    ],
    includedAccess: [
      'Acceso libre a la Piscina Climatizada Cuántica y Jacuzzi',
      'Desayuno Buffet Gourmet incluido en el Restaurante Principal',
      'Pase VIP a Rick\'s Lab Fitness y Zona Recreativa VR',
      '1 Cóctel de autor de bienvenida en Portal Bar por persona',
      'Plaza de estacionamiento techado con cargador eléctrico EV'
    ],
    smartTech: [
      'Control total de luces, cortinas y clima desde Tablet GRMS en mesa de noche',
      'Cerradura electrónica con apertura por smartphone NFC y reconocimiento facial opcional',
      'Doble Smart TV de 55 pulgadas con streaming 4K y conexión para videojuegos',
      'Asistente virtual Nexu integrado para asistencia y peticiones de servicio',
      'Climatización predictiva automatizada a 22°C al ingresar'
    ],
    ecoFeatures: [
      'Sensores volumétricos de presencia que activan modo Eco-Setback al ausentarse',
      'Ahorro del 38% en consumo de agua en griferías con aireadores inteligentes',
      'Acreditación de +200 Eco-Puntos en el programa de fidelización'
    ]
  },
  {
    id: 'matrimonial',
    name: 'Habitación Matrimonial',
    category: 'Habitación Matrimonial con Portal Galáctico',
    image: '/src/assets/images/room_dimension_horizon_1792960341129.jpg',
    images: [
      '/src/assets/images/room_dimension_horizon_1792960341129.jpg',
      '/src/assets/images/room_matrimonial_balcony_1792965218950.jpg',
      '/src/assets/images/room_bathroom_smart_1792963403371.jpg',
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg'
    ],
    quantity: 20,
    capacity: '2 Personas',
    size: '36 m²',
    pricePerNight: 105,
    highlight: 'Ideal para parejas que buscan una experiencia inmersiva y romántica de ciencia ficción',
    description: 'Espacio envolvente con cabecero decorativo de portal interdimensional iluminado en tonos azul y verde portal. Cuenta con pequeña sala de descanso, ventanales panorámicos hacia los Andes y control por voz de la iluminación ambiental.',
    features: [
      'Cama Matrimonial King con colchón viscoelástico ergonómico',
      'Área de pequeña sala de estar con sillón circular relajante',
      'Baño moderno con espejo inteligente (muestra hora, clima y noticias)',
      'Mini nevera surtida y estación de café de especialidad de origen ecuatoriano',
      'Iluminación ambiental temática con múltiples escenarios lumínicos'
    ],
    includedAccess: [
      'Acceso diario a la Piscina Climatizada Cuántica',
      'Desayuno Buffet con gastronomía ecuatoriana e internacional incluido',
      'Acceso al Fitness Center y máquinas de última generación',
      'Wi-Fi 6 de ultra alta velocidad (1 Gbps) en toda la propiedad'
    ],
    smartTech: [
      'Control por voz de luces, cortinas y música ambiental',
      'Cortinas fotónicas automatizadas programables con el amanecer',
      'Climatización digital inteligente y termostato predictivo',
      'Smart TV con acceso a catálogo de entretenimiento y servicios del hotel',
      'Cerradura digital inteligente con clave temporal o móvil'
    ],
    ecoFeatures: [
      'Modo "Green Stay" para declinar cambio diario de toallas por Eco-Puntos',
      'Iluminación LED de alta eficiencia con sensor de presencia'
    ]
  },
  {
    id: 'triple',
    name: 'Habitación Triple',
    category: 'Habitación Familiar / Grupal con 3 Camas',
    image: '/src/assets/images/room_triple_three_beds_1792965642809.jpg',
    images: [
      '/src/assets/images/room_triple_three_beds_1792965642809.jpg',
      '/src/assets/images/room_matrimonial_balcony_1792965218950.jpg',
      '/src/assets/images/room_bathroom_smart_1792963403371.jpg',
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg'
    ],
    quantity: 9,
    capacity: '3 Personas',
    size: '42 m²',
    pricePerNight: 120,
    highlight: 'Perfecta para grupos de amigos, familias o viajeros con 3 camas individuales independientes',
    description: 'Diseñada para tres huéspedes con exactamente 3 camas individuales confortables con ropa de cama de alta densidad, closet amplio, panel digital de servicios y cargadores inalámbricos independientes en cada cabecera.',
    features: [
      '3 camas individuales separadas de alta densidad con lencería hipoalergénica',
      'Baño completo amplio con cabina de ducha presurizada',
      'Closet espacioso con compartimentos individuales para equipaje',
      'Escritorio multifuncional y enchufes internacionales',
      'Smart TV de 50 pulgadas con modo multijugador y streaming'
    ],
    includedAccess: [
      'Acceso a la Piscina Climatizada y zona de relax',
      'Pase gratuito al Área Recreativa (VR, videojuegos y simuladores)',
      'Acceso a Rick\'s Lab Fitness Center',
      'Estacionamiento cubierto monitoreado con videovigilancia IA'
    ],
    smartTech: [
      'Panel digital interactivo para solicitar room service y toallas',
      'Cargadores inalámbricos por inducción en cada una de las 3 camas',
      'Control inteligente de iluminación con modos "Gaming" y "Lectura"',
      'Cerradura digital NFC con invitación de llave para los 3 huéspedes'
    ],
    ecoFeatures: [
      'Duchas con fluxómetro economizador regulado a 5.5 L/min',
      'Apagado automático de luces al salir de la habitación'
    ]
  },
  {
    id: 'doble-twin',
    name: 'Habitación Doble Twin',
    category: 'Dos Camas Individuales',
    image: '/src/assets/images/room_twin_interior_1792965232271.jpg',
    images: [
      '/src/assets/images/room_twin_interior_1792965232271.jpg',
      '/src/assets/images/room_bathroom_smart_1792963403371.jpg',
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg'
    ],
    quantity: 13,
    capacity: '2 Personas',
    size: '34 m²',
    pricePerNight: 95,
    highlight: 'Excelente opción para compañeros de viaje, colegas de negocios o amigos',
    description: 'Dos camas individuales separadas con vistas panorámicas hacia San Antonio de Pichincha y el monumento a la Mitad del Mundo. Equipada con tecnología de comandos de voz, Smart TV y sistema de sonido integrado.',
    features: [
      '2 camas individuales separadas de diseño contemporáneo',
      'Baño privado con ducha italiana y amenidades biodegradables',
      'Vistas panorámicas hacia el paisaje andino de la Mitad del Mundo',
      'Cortinas automáticas con accionamiento motorizado silencioso',
      'Closet ergonómico con espejo de cuerpo entero'
    ],
    includedAccess: [
      'Acceso ilimitado a Piscina Climatizada',
      'Gimnasio Rick\'s Lab Fitness Center',
      'Conexión Wi-Fi 6 de alta fidelidad',
      'Servicio de información turística y traslados guiado por Nexu'
    ],
    smartTech: [
      'Control por voz para encendido de luces y climatización',
      'Smart TV de gran tamaño con conectividad Chromecast/AirPlay',
      'Sistema de sonido ambiente Bluetooth de alta definición',
      'Cerradura inteligente con apertura desde smartphone'
    ],
    ecoFeatures: [
      'Climatización vinculada a sensor magnético en ventanas',
      'Uso de energía solar fotovoltaica generada in situ'
    ]
  },
  {
    id: 'individual',
    name: 'Habitación Individual',
    category: 'Single Smart Room',
    image: '/src/assets/images/room_dimension_horizon_1792960341129.jpg',
    images: [
      '/src/assets/images/room_dimension_horizon_1792960341129.jpg',
      '/src/assets/images/room_matrimonial_balcony_1792965218950.jpg',
      '/src/assets/images/room_bathroom_smart_1792963403371.jpg',
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg'
    ],
    quantity: 10,
    capacity: '1 Persona',
    size: '26 m²',
    pricePerNight: 75,
    highlight: 'Diseñada para el viajero solitario, nómada digital o profesional corporativo',
    description: 'Espacio optimizado que fusiona confort, vistas panorámicas y máxima eficiencia tecnológica. Cama individual de alta gama, panel táctil de control y conexión a internet simétrica ideal para videollamadas.',
    features: [
      'Cama individual de plaza y media con colchón viscoelástico',
      'Baño privado moderno con cabina de ducha ecológica',
      'Vista panorámica hacia el norte del Distrito Metropolitano',
      'Estación de trabajo con silla ergonómica y tomas de red RJ45',
      'Smart TV con canales internacionales y streaming'
    ],
    includedAccess: [
      'Uso de la Piscina Climatizada y zona de solarium',
      'Acceso a Rick\'s Lab Fitness Center 24/7',
      'Espacios comunes de coworking en el lobby',
      'Carga eléctrica para vehículos y scooters'
    ],
    smartTech: [
      'Sistema de iluminación inteligente LED programable',
      'Control por voz para todas las funciones de confort',
      'Cerradura inteligente con registro de acceso digital',
      'Panel digital táctil para control ambiental de la habitación'
    ],
    ecoFeatures: [
      'Monitoreo en tiempo real de huella ecológica en la app',
      'Aireadores en grifos que reducen el caudal a 2.0 L/min'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'piscina-climatizada',
    title: 'Piscina Climatizada Cuántica & Hidromasaje',
    subtitle: 'Relajación y Confort con Temperatura Constante de 29°C',
    category: 'Acuático & Bienestar',
    image: '/src/assets/images/hotel_pool_spa_1792963401718.jpg',
    images: [
      '/src/assets/images/hotel_pool_spa_1792963401718.jpg',
      '/src/assets/images/portal_bar_1792963402478.jpg'
    ],
    description: 'Una impresionante piscina cubierta climatizada con iluminación LED ambiental portal que simula un cielo interestelar. Cuenta con hidromasaje oxigenante, tumbonas térmicas y ventanales panorámicos hacia los paisajes de la Mitad del Mundo.',
    highlight: 'Agua purificada por nanotecnología mineral sin cloro químico irritante',
    techInnovation: 'Sistema de calefacción geotérmica y solar con control automático de pH y temperatura',
    ecoImpact: 'Reciclaje del calor residual de la piscina para precalentar el agua sanitaria de las habitaciones',
    iconName: 'Waves'
  },
  {
    id: 'restaurante-principal',
    title: 'Restaurante Principal con Menús Temáticos',
    subtitle: 'Comida Ecuatoriana e Internacional con Menú en Tablets y Gestión de Mermas por IA',
    category: 'Gastronomía & Buffet',
    image: '/src/assets/images/restaurant_tablet_menu_1792964694598.jpg',
    images: [
      '/src/assets/images/restaurant_tablet_menu_1792964694598.jpg',
      '/src/assets/images/portal_bar_1792963402478.jpg'
    ],
    description: 'El corazón culinario de NEXORA. Ofrece desayunos buffet andinos y continentales, almuerzos ejecutivos y cenas de autor con platos tradicionales ecuatorianos (ceviches, locros, hornado gourmet), con menú interactivo en tablets dispuestas en cada mesa y sistema de IA Winnow que reduce el 50% del desperdicio de alimentos.',
    highlight: 'Menú digital interactivo en tablets en cada mesa y gastronomía de autor',
    techInnovation: 'Tablets táctiles en mesa para explorar ingredientes, maridajes y ordenar en tiempo real',
    ecoImpact: 'Compostadora in situ que transforma los residuos orgánicos en abono vegetal en 24 horas',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'portal-bar',
    title: 'Portal Bar & Lounge',
    subtitle: 'Cócteles de Autor, Bebidas Premium y Música Ambiental',
    category: 'Bar & Coctelería',
    image: '/src/assets/images/portal_bar_1792963402478.jpg',
    images: [
      '/src/assets/images/portal_bar_1792963402478.jpg',
      '/src/assets/images/restaurant_tablet_menu_1792964694598.jpg'
    ],
    description: 'Punto de encuentro social nocturno con una deslumbrante instalación circular de portal dimensional iluminado con luz esmeralda y cian. Carta de cócteles temáticos con y sin alcohol ("Portal Gun Gin", "Citadel Mule", "Multiverse Sour") y tapas gourmet.',
    highlight: 'Un portal a otra dimensión en cada trago con mixología molecular',
    techInnovation: 'Vasos inteligentes con señalización lumínica interactiva y carta digital QR en hologramas',
    ecoImpact: 'Pajitas y copas 100% biodegradables y licores de destilerías sostenibles certificadas',
    iconName: 'Wine'
  },
  {
    id: 'fitness-center',
    title: 'Rick\'s Lab Fitness Center',
    subtitle: 'Entrena en el Laboratorio Científico del Futuro',
    category: 'Gimnasio & Salud',
    image: '/src/assets/images/hero_hotel_exterior_1792960339474.jpg',
    description: 'Gimnasio completamente equipado con caminadoras y elípticas interactivas, bicicletas estáticas con rutas virtuales por la Mitad del Mundo, mancuernas, bancos de pesas y pantallas digitales con rutinas guiadas, bajo una estética de laboratorio científico.',
    highlight: 'Máquinas de ejercicio que convierten la energía de tu pedaleo en electricidad para el hotel',
    techInnovation: 'Sensores de frecuencia cardíaca sincronizados con la app del huésped',
    ecoImpact: 'Generadores cinéticos integrados en las bicicletas que alimentan las pantallas del gym',
    iconName: 'Activity'
  },
  {
    id: 'recreational-area',
    title: 'Área Recreativa & Simuladores VR',
    subtitle: 'Realidad Virtual, Videojuegos y Zona Instagrameable',
    category: 'Entretenimiento & Gaming',
    image: '/src/assets/images/room_junior_suite_living_1792963403392.jpg',
    description: 'Uno de los espacios más diferenciales de NEXORA SMART HOTEL. Ofrece cabinas de Realidad Virtual (VR), consolas de videojuegos de última generación, simuladores de carreras interdimensionales y puntos fotográficos temáticos para TikTok e Instagram.',
    highlight: 'Punto fotográfico oficial con el portal dimensional de Rick y Morty a tamaño real',
    techInnovation: 'Gafas VR inalámbricas de ultra alta definición con experiencias inmersivas interactivas',
    ecoImpact: 'Iluminación LED adaptativa que reduce su intensidad en periodos de inactividad',
    iconName: 'Gamepad2'
  },
  {
    id: 'multiverse-room',
    title: 'Salas de Reuniones "Multiverse Room"',
    subtitle: 'Eventos Corporativos, Conferencias y Presentaciones',
    category: 'Business & Eventos',
    image: '/src/assets/images/restaurant_tablet_menu_1792964694598.jpg',
    description: 'Salas corporativas insonorizadas equipadas con pantallas táctiles interactivas, proyectores 4K de tiro ultracorto, sistemas de videoconferencia con encuadre automático por IA y conectividad Wi-Fi 6 de 1 Gbps para eventos de negocios.',
    highlight: 'Ideal para reuniones ejecutivas, talleres y presentaciones de alto impacto en Quito',
    techInnovation: 'Micrófonos de haz dirigido que aíslan el ruido exterior y pizarra digital colaborativa',
    ecoImpact: 'Reuniones 100% sin papel con memorias y actas enviadas directamente a la nube',
    iconName: 'Users'
  }
];

export const ECO_PROGRAM = {
  title: 'Eco-Guest Journey',
  subtitle: 'Donde tu descanso impulsa la regeneración del entorno en la Mitad del Mundo',
  description: 'En NEXORA SMART HOTEL la sostenibilidad no es decorativa: contamos con una microrred solar fotovoltaica de 120 kWp con baterías BESS, control inteligente de agua y climatización, y premiamos a nuestros huéspedes con Eco-Puntos canjeables por servicios, cócteles o descuentos en dólares.',
  levels: [
    {
      name: 'Explorador',
      threshold: '0 - 500 Puntos',
      perks: ['5% de descuento en reservas futuras en $', '1 Cóctel de bienvenida en Portal Bar', 'Visualización en tiempo real de tu ahorro de CO2 en la app']
    },
    {
      name: 'Viajero',
      threshold: '501 - 1,500 Puntos',
      perks: ['10% de descuento en tarifas en $', 'Pase de 1 hora exclusiva en zona de hidromasaje', 'Check-out tardío gratuito hasta las 15:00', 'Prioridad de recarga en Smart Parking EV']
    },
    {
      name: 'Guardián',
      threshold: '1,501+ Puntos',
      perks: ['Upgrade garantizado a Junior Suite si hay disponibilidad', 'Cena degustación para dos en el Restaurante Principal', '15% de descuento permanente en todas las tarifas', 'Árbol nativo plantado en la reserva del Pululahua con certificado']
    }
  ],
  pointEarningWays: [
    { action: 'Ducha eficiente menor a 5 minutos (indicador lumínico LED)', points: 50, unit: 'por día' },
    { action: 'Activar el "Modo Eco-Smart" en climatización de la habitación', points: 80, unit: 'por día' },
    { action: 'Renunciar voluntariamente al cambio diario innecesario de toallas y sábanas', points: 120, unit: 'por estancia' },
    { action: 'Utilizar el estacionamiento para recarga de auto o scooter eléctrico', points: 40, unit: 'por recarga' },
    { action: 'Disfrutar de los platos con menú residuo cero en el Restaurante Principal', points: 100, unit: 'por comida' },
    { action: 'Completar check-in y check-out 100% digital sin papel', points: 30, unit: 'por estancia' }
  ]
};

export const VIRTUAL_ASSISTANT_KNOWLEDGE = {
  name: 'Nexu',
  role: 'Concierge Turístico & Asistente Inteligente de NEXORA SMART HOTEL',
  personality: 'Amable, cordial, servicial, con identidad hotelera y turística de la Mitad del Mundo y Quito, combinada con toques sutiles de ciencia ficción y tecnología de portales.',
  welcomeSpeechBubble: 'Hola, soy Nexu. ¿Necesitas ayuda?',
  welcomeMessage: '¡Hola! Soy Nexu, tu concierge inteligente y guía turístico en NEXORA SMART HOTEL. Estoy aquí para asistirte con tus reservas, informarte sobre la piscina climatizada, el Restaurante Principal, Portal Bar, o planificar tus visitas a la Ciudad Mitad del Mundo. ¿En qué puedo colaborar contigo hoy?',
  quickTopics: [
    { id: 'consultar_reserva', label: 'Consultar mi Reserva', question: 'Quiero consultar la información de mi reserva existente' },
    { id: 'piscina', label: 'Piscina y Restaurante', question: '¿La piscina está climatizada y qué ofrece el restaurante principal?' },
    { id: 'habitaciones', label: 'Habitaciones y Precios en $', question: '¿Cuáles son las 5 habitaciones y los precios en dólares ($)?' },
    { id: 'reservar', label: 'Cómo Reservar & Inclusiones', question: '¿Qué incluye la reserva (piscina, desayuno, gym) y cómo obtengo mi llave digital?' },
    { id: 'mitad_mundo', label: 'Turismo en Mitad del Mundo', question: '¿Qué atractivos turísticos hay cerca en San Antonio de Pichincha y la Mitad del Mundo?' },
    { id: 'portal_bar', label: 'Portal Bar & Rick\'s Lab', question: 'Cuéntame sobre Portal Bar, el gimnasio Rick\'s Lab y la zona recreativa VR.' },
    { id: 'eco', label: 'Eco-Puntos & Sostenibilidad', question: '¿Cómo funciona la microrred solar y cómo gano Eco-Puntos?' },
    { id: 'checkin', label: 'Check-in Digital & Parking', question: '¿Cómo funciona el check-in digital con celular y el estacionamiento de 25 autos?' }
  ]
};
