export type SectionId = 
  | 'inicio' 
  | 'nuestro-hotel' 
  | 'habitaciones' 
  | 'servicios' 
  | 'reservas' 
  | 'eco-guest' 
  | 'contacto';

export interface Room {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[]; // Carousel of multiple images per room plan
  quantity: number; // e.g., 8, 9, 20, 13, 10
  capacity: string;
  size: string;
  pricePerNight: number; // In USD ($)
  highlight: string;
  description: string;
  features: string[];
  includedAccess: string[]; // Piscina, Restaurante, Rick's Lab, etc.
  smartTech: string[];
  ecoFeatures: string[];
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlight: string;
  techInnovation: string;
  ecoImpact: string;
  image?: string;
  images?: string[];
  iconName: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  guestName: string;
  guestEmail: string;
  mealPlan: 'room_only' | 'breakfast_included' | 'all_inclusive';
  includePoolAccess: boolean;
  includeFitnessAccess: boolean;
  specialRequests?: string;
  totalNights: number;
  totalPrice: number;
  ecoPointsEarned: number;
  confirmationCode?: string;
  roomNumber?: string;
  keyPassToken?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'nexu' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: () => void }[];
}
