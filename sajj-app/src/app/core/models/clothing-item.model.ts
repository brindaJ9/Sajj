export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  imageUrl: string;
  color?: string;
  season?: string[];
  occasions?: string[];
  styleTags?: string[];
  wearCount: number;
  lastWorn?: string;
  createdAt: string;
}
