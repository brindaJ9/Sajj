// ---------------------------------------------------------------------------
// Body Type entries — image strip (5 columns: pear, pear-variant, inverted-triangle, rectangle, hourglass)
// We map each to a horizontal offset in the strip image (0%–100% in 4 steps)
// ---------------------------------------------------------------------------

import { Question } from "../models/question.model";

export const BODY_TYPES = [
  {
    id: "hourglass",
    label: "Hourglass",
    description: "Balanced bust & hips, defined waist",
    imgPosition: "0% 50%",
  },
  {
    id: "pear",
    label: "Pear",
    description: "Hips wider than bust",
    imgPosition: "25% 50%",
  },
  {
    id: "inverted-triangle",
    label: "Inv. Triangle",
    description: "Broad shoulders, narrower hips",
    imgPosition: "50% 50%",
  },
  {
    id: "rectangle",
    label: "Rectangle",
    description: "Similar bust, waist & hips",
    imgPosition: "75% 50%",
  },
  {
    id: "apple",
    label: "Apple",
    description: "Fuller midsection, slimmer legs",
    imgPosition: "100% 50%",
  },
  {
    id: "petite",
    label: "Petite",
    description: "Smaller frame overall",
    imgPosition: "0% 50%",
  },
];

// ---------------------------------------------------------------------------
// Style genres (Spotify-style expandable)
// ---------------------------------------------------------------------------
export const STYLE_GENRES = [
  {
    id: "minimalist",
    label: "Minimalist",
    emoji: "🤍",
    subs: ["Clean lines", "Monochrome", "Capsule wardrobe", "Scandinavian", "Quiet luxury"],
  },
  {
    id: "streetwear",
    label: "Streetwear",
    emoji: "🧢",
    subs: ["Hypebeast", "Urban casual", "Skate style", "Athleisure", "Oversized fits"],
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "🌸",
    subs: ["Cottagecore", "Vintage florals", "Soft girl", "Dark romance", "Lace & ruffle"],
  },
  {
    id: "classic",
    label: "Classic",
    emoji: "✨",
    subs: ["Preppy", "Old money", "Business chic", "Timeless tailoring", "French girl"],
  },
  {
    id: "boho",
    label: "Bohemian",
    emoji: "🍂",
    subs: ["Festival boho", "Earthy textures", "Artisan pieces", "Wanderlust", "70s inspired"],
  },
  {
    id: "edgy",
    label: "Edgy",
    emoji: "🖤",
    subs: ["Gothic", "Punk", "Leather & chains", "All-black", "Moto style"],
  },
  {
    id: "sporty",
    label: "Sporty",
    emoji: "⚡",
    subs: ["Gym-to-street", "Tennis chic", "Coastal cool", "Performance wear", "Sporty luxe"],
  },
  {
    id: "glam",
    label: "Glam",
    emoji: "💛",
    subs: ["Red carpet", "Party glam", "Sequins & shine", "Bold color", "Statement looks"],
  },
];

// ---------------------------------------------------------------------------
// Occasions
// ---------------------------------------------------------------------------
export const OCCASIONS = [
  { id: "everyday", label: "Everyday casual", emoji: "☕" },
  { id: "work", label: "Work / Office", emoji: "💼" },
  { id: "brunch", label: "Brunch & social", emoji: "🥂" },
  { id: "date", label: "Date nights", emoji: "🌙" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "gym", label: "Gym & fitness", emoji: "🏋️" },
  { id: "events", label: "Events & parties", emoji: "🎉" },
  { id: "formal", label: "Formal occasions", emoji: "👗" },
  { id: "outdoor", label: "Outdoor & nature", emoji: "🌿" },
];

// ---------------------------------------------------------------------------
// Color palettes
// ---------------------------------------------------------------------------
export const COLOR_PALETTES = [
  {
    id: "neutrals",
    label: "Neutrals & Nudes",
    description: "Ivory, beige, camel, white",
    swatches: ["#F5F0E8", "#C8B89A", "#A0897A", "#D4C5B0", "#1A1A1A"],
  },
  {
    id: "earth",
    label: "Earth & Warm Tones",
    description: "Rust, terracotta, olive, brown",
    swatches: ["#C19A6B", "#B85C38", "#7D6B4F", "#556B2F", "#8B4513"],
  },
  {
    id: "pastels",
    label: "Soft Pastels",
    description: "Blush, lavender, mint, sky blue",
    swatches: ["#F9C5D1", "#C8A2C8", "#B5EAD7", "#AED6F1", "#FADADD"],
  },
  {
    id: "bold",
    label: "Bold & Vivid",
    description: "Red, cobalt, emerald, mustard",
    swatches: ["#E74C3C", "#2980B9", "#27AE60", "#F39C12", "#8E44AD"],
  },
  {
    id: "monochrome",
    label: "Monochrome & Dark",
    description: "Black, charcoal, navy, deep tones",
    swatches: ["#1A1A1A", "#2C2C2C", "#1E2D4A", "#4A4A4A", "#6B6B6B"],
  },
  {
    id: "prints",
    label: "Prints & Patterns",
    description: "Animal print, floral, plaid",
    swatches: ["#C8923A", "#5C3A1E", "#8B4B62", "#3A6B45", "#6B3A8B"],
  },
];

// ---------------------------------------------------------------------------
// Fit & vibe
// ---------------------------------------------------------------------------
export const FIT_VIBES = [
  { id: "oversized", label: "Oversized & relaxed", emoji: "🫶", description: "Roomy, effortless, lived-in" },
  { id: "fitted", label: "Fitted & sleek", emoji: "💅", description: "Body-conscious, defined silhouette" },
  { id: "tailored", label: "Tailored & structured", emoji: "🪡", description: "Sharp lines, polished cuts" },
  { id: "flowy", label: "Flowy & draped", emoji: "🌊", description: "Soft fabrics, movement-forward" },
];

// ---------------------------------------------------------------------------
// Budget philosophy
// ---------------------------------------------------------------------------
export const BUDGET_STYLES = [
  { id: "invest", label: "Invest in fewer, better", emoji: "💎", description: "Quality over quantity — pieces that last" },
  { id: "mix", label: "Mix high & low", emoji: "🎯", description: "Splurge on staples, save on trends" },
  { id: "thrift", label: "Thrift & vintage first", emoji: "♻️", description: "Second-hand finds & one-of-a-kind" },
  { id: "trend", label: "Ride the trend cycle", emoji: "🔄", description: "Affordable fast-fashion, always fresh" },
];