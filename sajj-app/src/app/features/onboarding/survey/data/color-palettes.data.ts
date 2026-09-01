export interface ColorPalette {
  id: string;
  label: string;
  colors: string[];
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'monochrome',
    label: 'Monochrome',
    colors: ['#111111', '#3A3A3A', '#707070', '#B8B8B8', '#E8E8E8']
  },
  {
    id: 'earth',
    label: 'Earth Tones',
    colors: ['#4A3728', '#76583F', '#9A8062', '#C5AD8A', '#E4D5BD']
  },
  {
    id: 'neutral',
    label: 'Neutral Colors',
    colors: ['#F3EEE7', '#D8D0C5', '#B8AEA1', '#8A8075', '#514B45']
  },
  {
    id: 'pastel',
    label: 'Soft Pastels',
    colors: ['#F4DDE3', '#DCCEE8', '#C9DCE5', '#DDE8D5', '#F3E5C8']
  },
  {
    id: 'warm',
    label: 'Warm Autumn',
    colors: ['#8C3F2F', '#B4613E', '#C88A52', '#D1A65A', '#6B4A38']
  },
  {
    id: 'cool',
    label: 'Cool Blues',
    colors: ['#DCEAF2', '#AFCBDA', '#7199B0', '#416A82', '#263F52']
  },
  {
    id: 'vibrant',
    label: 'Bold & Vibrant',
    colors: ['#E63946', '#F4A261', '#F6C945', '#2A9D8F', '#4361EE']
  }
];

export function getPaletteColors(paletteId: string): string[] {
  return COLOR_PALETTES.find(p => p.id === paletteId)?.colors || [];
}
