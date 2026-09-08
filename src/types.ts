export interface DrinkVariant {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string; // Hex brand accent color (e.g. #E11D48)
  textColor?: string;
  mode?: 'dark' | 'light';
  sequencePattern: string; // URL pattern e.g. https://raw.githubusercontent.com/.../frame_{index}_delay-0.1s.webp
  frameCount: number;
  padLength: number; // e.g. 2 for "00", "01"
  startIndex: number; // usually 0
  calories: number;
  sugars: string;
  fiber: string;
  tastingNotes: string[];
  grapeCanColor?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  flavor: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  variantId: string;
  name: string;
  subtitle: string;
  packSize: '12-Pack' | '24-Pack' | 'Variety 12-Pack';
  price: number;
  quantity: number;
  themeColor: string;
}
