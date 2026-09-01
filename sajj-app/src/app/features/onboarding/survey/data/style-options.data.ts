export interface StyleTrait {
  id: string;
  label: string;
}

export interface StyleOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  colorRgb: string;
  traits: StyleTrait[];
}

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'minimalist',
    label: 'Minimalist',
    emoji: '🤍',
    description: 'Clean lines, quiet luxury',
    color: '#E5E5E5',
    colorRgb: '229, 229, 229',
    traits: [
      { id: 'scandinavian', label: 'Scandinavian' },
      { id: 'japanese-zen', label: 'Japanese Zen' },
      { id: 'monochrome', label: 'Monochrome' },
      { id: 'capsule-wardrobe', label: 'Capsule Wardrobe' },
      { id: 'quality-basics', label: 'Quality Basics' }
    ]
  },
  {
    id: 'old-money',
    label: 'Old Money',
    emoji: '🎩',
    description: 'Tailored, understated',
    color: '#D4B896',
    colorRgb: '212, 184, 150',
    traits: [
      { id: 'quiet-luxury', label: 'Quiet Luxury' },
      { id: 'ivy-league', label: 'Ivy League' },
      { id: 'european-summer', label: 'European Summer' },
      { id: 'classic-tailoring', label: 'Classic Tailoring' },
      { id: 'linen', label: 'Linen' }
    ]
  },
  {
    id: 'streetwear',
    label: 'Streetwear',
    emoji: '🛹',
    description: 'Bold, graphic, layered',
    color: '#7B68A6',
    colorRgb: '123, 104, 166',
    traits: [
      { id: 'skater', label: 'Skater' },
      { id: 'hip-hop', label: 'Hip Hop' },
      { id: 'techwear', label: 'Techwear' },
      { id: 'oversized', label: 'Oversized' },
      { id: 'sneaker-culture', label: 'Sneaker Culture' }
    ]
  },
  {
    id: 'romantic',
    label: 'Romantic',
    emoji: '🌸',
    description: 'Soft textures, florals',
    color: '#F5C5D4',
    colorRgb: '245, 197, 212',
    traits: [
      { id: 'cottagecore', label: 'Cottagecore' },
      { id: 'victorian', label: 'Victorian' },
      { id: 'french-romance', label: 'French Romance' },
      { id: 'lace-details', label: 'Lace & Details' },
      { id: 'pastels', label: 'Pastels' }
    ]
  },
  {
    id: 'sporty',
    label: 'Sporty',
    emoji: '⚡',
    description: 'Function meets form',
    color: '#FFD966',
    colorRgb: '255, 217, 102',
    traits: [
      { id: 'athleisure', label: 'Athleisure' },
      { id: 'performance', label: 'Performance' },
      { id: 'tennis-core', label: 'Tennis Core' },
      { id: 'track-street', label: 'Track & Street' },
      { id: 'sporty-chic', label: 'Sporty Chic' }
    ]
  },
  {
    id: 'vintage',
    label: 'Vintage',
    emoji: '🕰️',
    description: 'Era-inspired pieces',
    color: '#C9A56D',
    colorRgb: '201, 165, 109',
    traits: [
      { id: 'retro-60s', label: 'Retro 60s' },
      { id: '70s-disco', label: '70s Disco' },
      { id: '80s-power', label: '80s Power' },
      { id: '90s-grunge', label: '90s Grunge' },
      { id: 'y2k', label: 'Y2K' }
    ]
  },
  {
    id: 'edgy',
    label: 'Edgy',
    emoji: '🖤',
    description: 'Dark, bold, statement',
    color: '#4A4A4A',
    colorRgb: '74, 74, 74',
    traits: [
      { id: 'punk', label: 'Punk' },
      { id: 'grunge', label: 'Grunge' },
      { id: 'rocker', label: 'Rocker' },
      { id: 'gothic', label: 'Gothic' },
      { id: 'avant-garde', label: 'Avant-Garde' }
    ]
  },
  {
    id: 'chic',
    label: 'Chic',
    emoji: '💎',
    description: 'Polished, sophisticated',
    color: '#B8A6D1',
    colorRgb: '184, 166, 209',
    traits: [
      { id: 'parisian', label: 'Parisian' },
      { id: 'modern-classic', label: 'Modern Classic' },
      { id: 'effortless-elegance', label: 'Effortless Elegance' },
      { id: 'power-dressing', label: 'Power Dressing' },
      { id: 'minimalist-chic', label: 'Minimalist Chic' }
    ]
  }
];
