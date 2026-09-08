import { DrinkVariant, ReviewItem, FaqItem } from '../types';

export const INITIAL_DRINK_VARIANTS: DrinkVariant[] = [
  {
    id: 'cherry',
    name: 'CHERRY',
    subtitle: 'VINTAGE SODA',
    description: 'A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor and gut-supporting prebiotics.',
    themeColor: '#E11D48', // Ruby Cherry
    mode: 'dark',
    sequencePattern: 'https://raw.githubusercontent.com/jachinbakhtsingh/website-images/main/images/frame_{index}_delay-0.1s.webp',
    frameCount: 80,
    padLength: 2,
    startIndex: 0,
    calories: 35,
    sugars: '2g',
    fiber: '9g',
    tastingNotes: ['Tart Morello Cherry', 'Vanilla Pod', 'Ceylon Cinnamon', 'Sparkling Crispness'],
  },
  {
    id: 'grape',
    name: 'GRAPE',
    subtitle: 'CONCORD SODA',
    description: 'A modern functional soda brand inspired by classic flavors but made with better ingredients, rich concord depth, and pure plant botanicals.',
    themeColor: '#9333EA', // Royal Concord Purple
    mode: 'dark',
    sequencePattern: 'https://raw.githubusercontent.com/jachinbakhtsingh/website-images/main/images/frame_{index}_delay-0.1s.webp',
    frameCount: 80,
    padLength: 2,
    startIndex: 0,
    calories: 40,
    sugars: '3g',
    fiber: '9g',
    tastingNotes: ['Concord Grape Must', 'Lime Zest', 'Tartaric Spark', 'Velvety Finish'],
  },
  {
    id: 'lemon',
    name: 'LEMON',
    subtitle: 'GINGER SODA',
    description: 'Bright and refreshing citrus soda with natural lemon spark, cold-pressed ginger root, and crisp micro-bubbles.',
    themeColor: '#EAB308', // Citrus Lemon Spark
    mode: 'dark',
    sequencePattern: 'https://raw.githubusercontent.com/jachinbakhtsingh/website-images/main/images/frame_{index}_delay-0.1s.webp',
    frameCount: 80,
    padLength: 2,
    startIndex: 0,
    calories: 35,
    sugars: '2g',
    fiber: '9g',
    tastingNotes: ['Sun-Ripened Lemon', 'Spicy Ginger Root', 'Apple Cider Hint', 'Effervescent Spark'],
  },
];

export function resolveFrameUrl(pattern: string, index: number, padLength: number = 2): string {
  let cleanPattern = pattern.trim();
  
  // Convert GitHub blob to raw if user pasted github.com/.../blob/...
  if (cleanPattern.includes('github.com') && cleanPattern.includes('/blob/')) {
    cleanPattern = cleanPattern
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }

  const paddedIndex = String(index).padStart(padLength, '0');

  if (cleanPattern.includes('{index}')) {
    return cleanPattern.replace('{index}', paddedIndex);
  }

  // If pattern has frame_00 or frame_000, replace with paddedIndex
  if (/frame_\d+/i.test(cleanPattern)) {
    return cleanPattern.replace(/frame_\d+/i, `frame_${paddedIndex}`);
  }

  // If ends with a number before extension e.g. /00.webp
  if (/\/\d+(\.[a-zA-Z0-9]+)$/.test(cleanPattern)) {
    return cleanPattern.replace(/\/\d+(\.[a-zA-Z0-9]+)$/, `/${paddedIndex}$1`);
  }

  return cleanPattern;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Camila Vance',
    rating: 5,
    title: 'Hands down the best soda ever created.',
    content: 'I kicked my 10-year traditional soda addiction with Olipop. The tart cherry has the exact nostalgic kick without the sugar crash or gut inflammation.',
    verified: true,
    flavor: 'Cherry',
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Marcus Chen, MD',
    rating: 5,
    title: 'Finally, real science in a refreshing beverage.',
    content: 'As a gastroenterologist, getting 9 grams of prebiotic plant fiber per can while maintaining genuine beverage joy is revolutionary for microbiome diversity.',
    verified: true,
    flavor: 'Grape',
    date: '1 week ago',
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    rating: 5,
    title: 'Crisp, perfectly carbonated ginger lemon.',
    content: 'The ginger has real warmth and the lemon tastes like freshly squeezed zest, not artificial flavoring. Keeps me energized all afternoon!',
    verified: true,
    flavor: 'Lemon',
    date: '2 weeks ago',
  },
  {
    id: 'rev-4',
    author: 'Jordan Patel',
    rating: 5,
    title: 'My whole family is obsessed.',
    content: 'We order the 24-pack monthly on subscription. Grape soda reminds me of childhood summers, but with only 3g of sugar!',
    verified: true,
    flavor: 'Grape',
    date: '3 weeks ago',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Product & Health',
    question: 'What makes Olipop different from traditional soda?',
    answer: 'Traditional soda typically contains around 39 grams of high fructose corn syrup or artificial sweeteners with zero nutritional value. Olipop pairs nostalgic flavors with OLISMART®, our proprietary blend of 8 unique botanicals, plant fibers, and prebiotics that nourish your gut microbiome with only 2-5g of natural sugar and 9g of dietary fiber per can.',
  },
  {
    category: 'Ingredients',
    question: 'What prebiotic ingredients are inside the OLISMART® blend?',
    answer: 'Our formulation includes chicory root inulin, Jerusalem artichoke inulin, cassava root fiber, nopal cactus, marshmallow root, calendula flower, and kudzu root. These diverse fibers provide fuel for beneficial bifidobacteria and lactobacilli in the digestive tract.',
  },
  {
    category: 'Storage',
    question: 'Does Olipop need to be kept refrigerated?',
    answer: 'Yes! Because we use genuine fruit juices and botanical extracts without harsh synthetic preservatives, we recommend keeping Olipop cold at all times for peak flavor, crisp effervescence, and probiotic support. Olipop can safely spend up to 4 days transit at room temperature during shipping.',
  },
  {
    category: 'Lifestyle',
    question: 'Can I drink Olipop every single day?',
    answer: 'Absolutely. Many of our customers drink 1 to 2 cans daily to reach their recommended dietary fiber goals (most adults only consume 15g of the recommended 28-35g fiber per day). If you are new to prebiotic fiber, we suggest starting with one can daily as your microbiome adapts.',
  },
  {
    category: 'Orders & Shipping',
    question: 'How does the subscription work?',
    answer: 'Subscribers save 15% on every order with free carbon-neutral shipping, flexible delivery intervals (every 2, 3, or 4 weeks), and the freedom to swap flavors, pause, or cancel anytime directly from your account in one click.',
  },
];
