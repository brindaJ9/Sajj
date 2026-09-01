export interface StyleArchetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  brands: string[];
  wardrobe: {
    top: string;
    bottom: string;
    layer: string;
    shoe: string;
    bag: string;
  };
}

export const ARCHETYPES: Record<string, StyleArchetype> = {
  minimalist: {
    id: 'minimalist',
    name: 'The Minimalist',
    emoji: '🤍',
    tagline: 'Curated for your clean aesthetic',
    description: 'Your aesthetic is like a breath of fresh air — simple, intentional, and beautifully understated. Clean lines, neutral tones, and quality over quantity define your wardrobe.',
    traits: ['Clean lines', 'Capsule wardrobe', 'Quality basics', 'Neutral tones', 'Timeless pieces'],
    brands: ['COS', 'Everlane', 'Uniqlo', 'ARKET'],
    wardrobe: {
      top: 'White silk blouse or black turtleneck',
      bottom: 'Tailored trousers or straight-leg jeans',
      layer: 'Structured blazer or wool coat',
      shoe: 'Leather loafers or minimal sneakers',
      bag: 'Structured tote or crossbody'
    }
  },
  
  'old-money': {
    id: 'old-money',
    name: 'The Classic',
    emoji: '✨',
    tagline: 'Timeless picks, just for you',
    description: 'Your style whispers elegance — refined, polished, and effortlessly sophisticated. You gravitate toward tailored pieces, classic silhouettes, and an air of understated luxury.',
    traits: ['Quiet luxury', 'Tailored fits', 'Classic silhouettes', 'Timeless elegance', 'Investment pieces'],
    brands: ['Ralph Lauren', 'J.Crew', 'Massimo Dutti', 'Reiss'],
    wardrobe: {
      top: 'Cashmere sweater or silk shirt',
      bottom: 'Pleated trousers or midi skirt',
      layer: 'Trench coat or blazer',
      shoe: 'Ballet flats or oxford shoes',
      bag: 'Leather satchel or structured handbag'
    }
  },
  
  streetwear: {
    id: 'streetwear',
    name: 'The Trendsetter',
    emoji: '🔥',
    tagline: 'Fresh drops & bold picks ahead',
    description: 'Your style is bold, graphic, and unapologetically cool. You love mixing high and low, layering statement pieces, and staying ahead of the curve.',
    traits: ['Bold graphics', 'Layered looks', 'Sneaker culture', 'Oversized fits', 'Statement pieces'],
    brands: ['Nike', 'Stüssy', 'Carhartt WIP', 'The North Face'],
    wardrobe: {
      top: 'Graphic tee or hoodie',
      bottom: 'Cargo pants or relaxed jeans',
      layer: 'Bomber jacket or oversized flannel',
      shoe: 'High-top sneakers or chunky trainers',
      bag: 'Crossbody bag or backpack'
    }
  },
  
  romantic: {
    id: 'romantic',
    name: 'The Romantic',
    emoji: '🌸',
    tagline: 'Dreamy finds await',
    description: 'Your aesthetic is like a beautiful poem — gentle, layered, and full of feeling. Florals, soft fabrics, and delicate details are your language.',
    traits: ['Florals always', 'Soft color lover', 'Delicate details', 'Feminine silhouettes', 'Dreamy dresser'],
    brands: ['LoveShackFancy', 'Zimmermann', '& Other Stories', 'Sister Jane'],
    wardrobe: {
      top: 'Floral or lace-trim blouse',
      bottom: 'Midi floral skirt or wide-leg pants',
      layer: 'Pastel cropped cardigan',
      shoe: 'Mary Janes or strappy heels',
      bag: 'Embroidered or floral mini bag'
    }
  },
  
  sporty: {
    id: 'sporty',
    name: 'The Athleisure Lover',
    emoji: '⚡',
    tagline: 'Function meets form',
    description: 'Your style is active, comfortable, and effortlessly put-together. You blur the lines between gym and street, prioritizing pieces that move with you.',
    traits: ['Athleisure', 'Performance fabrics', 'Comfortable fits', 'Sporty chic', 'Active lifestyle'],
    brands: ['Lululemon', 'Alo Yoga', 'Outdoor Voices', 'Nike'],
    wardrobe: {
      top: 'Sports bra or performance tee',
      bottom: 'Leggings or joggers',
      layer: 'Zip-up hoodie or windbreaker',
      shoe: 'Running sneakers or slip-on trainers',
      bag: 'Gym tote or belt bag'
    }
  },
  
  vintage: {
    id: 'vintage',
    name: 'The Time Traveler',
    emoji: '🕰️',
    tagline: 'Vintage vibes & timeless style',
    description: 'Your style draws from the past — nostalgic, unique, and full of character. You love era-inspired pieces and one-of-a-kind finds.',
    traits: ['Retro-inspired', 'Thrifted finds', 'Era aesthetics', 'Unique pieces', 'Nostalgic charm'],
    brands: ['Urban Outfitters', 'Reformation', 'Free People', 'Beyond Retro'],
    wardrobe: {
      top: 'Vintage band tee or retro blouse',
      bottom: 'High-waisted jeans or slip skirt',
      layer: 'Leather jacket or denim vest',
      shoe: 'Platform boots or Mary Janes',
      bag: 'Vintage shoulder bag or mini backpack'
    }
  },
  
  edgy: {
    id: 'edgy',
    name: 'The Rebel',
    emoji: '🖤',
    tagline: 'Dark, bold, statement',
    description: 'Your style is fearless, dark, and unapologetically bold. You love pushing boundaries, mixing textures, and making statements.',
    traits: ['Dark aesthetics', 'Bold statements', 'Mixed textures', 'Avant-garde', 'Rule breaker'],
    brands: ['AllSaints', 'ZARA', 'Dr. Martens', 'Acne Studios'],
    wardrobe: {
      top: 'Black turtleneck or band tee',
      bottom: 'Leather pants or distressed jeans',
      layer: 'Leather jacket or long coat',
      shoe: 'Combat boots or chunky platforms',
      bag: 'Chain bag or leather crossbody'
    }
  },
  
  chic: {
    id: 'chic',
    name: 'The Effortless Icon',
    emoji: '💎',
    tagline: 'Polished, sophisticated, timeless',
    description: 'Your style is polished yet effortless — sophisticated, modern, and always put-together. You have an eye for elevated basics and refined details.',
    traits: ['Parisian flair', 'Modern classic', 'Effortless elegance', 'Power dressing', 'Minimalist chic'],
    brands: ['Mango', 'Sézane', '& Other Stories', 'Ganni'],
    wardrobe: {
      top: 'Silk camisole or fitted knit',
      bottom: 'High-waisted trousers or pencil skirt',
      layer: 'Tailored blazer or trench coat',
      shoe: 'Pointed-toe heels or loafers',
      bag: 'Structured handbag or clutch'
    }
  }
};

// Determine archetype based on survey answers
export function determineArchetype(answers: {
  styles?: string;
  occasions?: string[];
  challenge?: string;
  colors?: string;
  fit?: string;
  adventure?: number;
  styleTraits?: string[];
}): StyleArchetype {
  const style = answers.styles || 'minimalist';
  
  // Return the archetype matching the selected style
  return ARCHETYPES[style] || ARCHETYPES['minimalist'];
}
