import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Money formatting utilities for dollar amounts
export const formatMoney = (dollars: number): string => {
  return dollars.toFixed(2);
};

export const formatMoneyDisplay = (dollars: number): string => {
  return `$${formatMoney(dollars)}`;
};

export const addMoney = (dollars1: number, dollars2: number): number => {
  return dollars1 + dollars2;
};

export const multiplyMoney = (dollars: number, multiplier: number): number => {
  return dollars * multiplier;
};

export const artImages = [
  "/art1.png",
  "/art2.png",
  "/art3.png",
  "/art4.png",
  "/art5.png",
  "/art6.png",
  "/art7.png",
  "/art8.png",
  "/art9.png",
  "/art10.png",
  "/art11.png",
  "/art12.png",
];

export interface ArtData {
  id: number;
  title: string;
  artist: string;
  category: "painting" | "digital" | "realism";
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export const artData: ArtData[] = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "Elena Rodriguez",
    category: "painting",
    price: 850,
    description:
      "A vibrant oil painting capturing the ethereal beauty of a sunset over rolling hills. The warm oranges and purples create a dreamlike atmosphere that evokes feelings of peace and tranquility.",
    image: "/art1.png",
    inStock: true,
  },
  {
    id: 2,
    title: "Digital Symphony",
    artist: "Marcus Chen",
    category: "digital",
    price: 450,
    description:
      "A stunning digital artwork that blends geometric patterns with flowing organic forms. The interplay of neon colors and abstract shapes creates a futuristic aesthetic that's both bold and mesmerizing.",
    image: "/art2.png",
    inStock: true,
  },
  {
    id: 3,
    title: "Portrait of Wisdom",
    artist: "Sarah Mitchell",
    category: "realism",
    price: 1200,
    description:
      "An incredibly detailed realist portrait that captures every nuance of human emotion. The subject's eyes tell a story of experience and wisdom, rendered with exceptional precision and artistic skill.",
    image: "/art3.png",
    inStock: true,
  },
  {
    id: 4,
    title: "Ocean's Embrace",
    artist: "David Thompson",
    category: "painting",
    price: 675,
    description:
      "A breathtaking seascape that captures the raw power and beauty of ocean waves. The dynamic brushstrokes and cool color palette bring the scene to life, making you feel the spray of the sea.",
    image: "/art4.png",
    inStock: true,
  },
  {
    id: 5,
    title: "Cyber Forest",
    artist: "Alex Kim",
    category: "digital",
    price: 380,
    description:
      "A mesmerizing blend of nature and technology, featuring a digital forest with glowing elements and futuristic flora. The artwork explores the relationship between organic and synthetic worlds.",
    image: "/art5.png",
    inStock: false,
  },
  {
    id: 6,
    title: "Urban Reflections",
    artist: "Maria Garcia",
    category: "realism",
    price: 950,
    description:
      "A hyper-realistic cityscape captured during golden hour, with buildings reflecting the warm sunlight. Every detail of the urban environment is rendered with photographic precision and artistic flair.",
    image: "/art6.png",
    inStock: true,
  },
  {
    id: 7,
    title: "Floral Dreams",
    artist: "James Wilson",
    category: "painting",
    price: 520,
    description:
      "An impressionistic interpretation of a blooming garden, with loose brushstrokes and vibrant colors that capture the essence of spring. The painting radiates joy and natural beauty.",
    image: "/art7.png",
    inStock: true,
  },
  {
    id: 8,
    title: "Neon Genesis",
    artist: "Taylor Swift",
    category: "digital",
    price: 320,
    description:
      "A cyberpunk-inspired digital artwork featuring neon-lit cityscapes and futuristic architecture. The bold colors and sharp lines create an electrifying atmosphere that embodies the spirit of the digital age.",
    image: "/art8.png",
    inStock: true,
  },
  {
    id: 9,
    title: "Still Life Mastery",
    artist: "Robert Anderson",
    category: "realism",
    price: 780,
    description:
      "A masterfully executed still life featuring classic objects rendered with incredible detail and realism. The play of light and shadow creates depth and texture that brings the composition to life.",
    image: "/art9.png",
    inStock: true,
  },
  {
    id: 10,
    title: "Abstract Emotions",
    artist: "Lisa Park",
    category: "painting",
    price: 420,
    description:
      "An expressive abstract painting that conveys deep emotions through bold colors and dynamic compositions. Each brushstroke tells a story, creating a visual language that speaks directly to the soul.",
    image: "/art10.png",
    inStock: true,
  },
  {
    id: 11,
    title: "Virtual Reality",
    artist: "Kevin Zhang",
    category: "digital",
    price: 280,
    description:
      "A conceptual digital piece exploring themes of virtual existence and digital consciousness. The artwork combines surreal imagery with technological elements to create a thought-provoking visual experience.",
    image: "/art11.png",
    inStock: true,
  },
  {
    id: 12,
    title: "Wildlife Portrait",
    artist: "Amanda Foster",
    category: "realism",
    price: 1100,
    description:
      "An extraordinary wildlife portrait that captures the majesty and spirit of a wild animal in its natural habitat. The attention to detail in the fur texture and expressive eyes is absolutely stunning.",
    image: "/art12.png",
    inStock: false,
  },
];
