import { Question } from "../models/question.model";

export const QUESTIONS: Question[] = [

  {
    id: "styles",
    title: "What styles resonate with you?",
    subtitle: "Choose up to 3 styles that best represent your aesthetic.",
    type: "multiple",
    maxSelections: 3,
    options: [
      { id: "minimalist", label: "Minimalist" },
      { id: "old-money", label: "Old Money" },
      { id: "streetwear", label: "Streetwear" },
      { id: "casual", label: "Casual" },
      { id: "smart-casual", label: "Smart Casual" },
      { id: "formal", label: "Formal" },
      { id: "sporty", label: "Sporty" },
      { id: "vintage", label: "Vintage" },
      { id: "korean", label: "Korean" },
      { id: "boho", label: "Boho" },
      { id: "y2k", label: "Y2K" },
      { id: "chic", label: "Chic" },
      { id: "ethnic", label: "Ethnic" },
      { id: "cottagecore", label: "Cottagecore" }
    ]
  },

  {
    id: "occasions",
    title: "What occasions do you usually dress for?",
    subtitle: "Select all that apply.",
    type: "multiple",
    options: [
      { id: "college", label: "College" },
      { id: "office", label: "Office" },
      { id: "casual", label: "Casual Outings" },
      { id: "travel", label: "Travel" },
      { id: "gym", label: "Gym" },
      { id: "parties", label: "Parties" },
      { id: "dates", label: "Date Nights" },
      { id: "traditional", label: "Traditional Events" },
      { id: "weddings", label: "Weddings" }
    ]
  },

  {
    id: "challenge",
    title: "What's your biggest styling challenge?",
    subtitle: "Everyone has one. We'll focus on solving yours first.",
    type: "single",
    options: [
      {
        id: "matching",
        label: "I don't know what matches"
      },
      {
        id: "repeating",
        label: "I keep wearing the same outfits"
      },
      {
        id: "style",
        label: "I'm still figuring out my personal style"
      },
      {
        id: "shopping",
        label: "Shopping feels overwhelming"
      },
      {
        id: "wardrobe",
        label: "I don't make the most of the clothes I own"
      },
      {
        id: "occasions",
        label: "I struggle to dress for different occasions"
      }
    ]
  },

  {
    id: "colors",
    title: "Which color palette feels most like you?",
    subtitle: "Choose the palette you naturally gravitate towards.",
    type: "single",
    options: [
      { id: "monochrome", label: "Monochrome" },
      { id: "earth", label: "Earth Tones" },
      { id: "neutral", label: "Neutral Colors" },
      { id: "pastel", label: "Soft Pastels" },
      { id: "warm", label: "Warm Autumn" },
      { id: "cool", label: "Cool Blues" },
      { id: "vibrant", label: "Bold & Vibrant" }
    ]
  },

  {
    id: "fit",
    title: "How do you like your clothes to fit?",
    subtitle: "Your preferred silhouette shapes every recommendation.",
    type: "single",
    options: [
      { id: "oversized", label: "Oversized" },
      { id: "relaxed", label: "Relaxed" },
      { id: "regular", label: "Regular Fit" },
      { id: "tailored", label: "Tailored" },
      { id: "slim", label: "Slim Fit" }
    ]
  },

  {
    id: "adventure",
    title: "How adventurous is your style?",
    subtitle: "Tell us how open you are to trying something new.",
    type: "slider"
  }

];