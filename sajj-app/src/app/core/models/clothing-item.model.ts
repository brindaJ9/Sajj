export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

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
  season?: string[];
  occasions?: string[];
  styleTags?: string[];

  // Usage history
  wearCount: number;
  lastWorn?: string;

  // Metadata
  createdAt: string;
}