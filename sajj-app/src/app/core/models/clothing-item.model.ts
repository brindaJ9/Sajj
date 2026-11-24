export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
export type Occasion = 'Everyday' | 'Casual' | 'Work' | 'Formal' | 'Party' | 'Festive';

export interface ClothingItem {
  // Identity
  id: string;
  name: string;
  category: ClothingCategory;

  // Visual
  imageUrl: string;
  color?: string;
  pattern?: string;

  // Clothing characteristics
  subcategory?: string;
  material?: string;
  fit?: string;
  formality?: string;
  warmth?: number;

  // Personalization
  seasons?: Season[];
  occasions?: Occasion[];
  styleTags?: string[];

  // Usage history
  wearCount: number;
  lastWorn?: string;

  // Metadata
  createdAt: string;
}