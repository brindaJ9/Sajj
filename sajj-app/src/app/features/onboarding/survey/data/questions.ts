import { Question } from "../models/question.model";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "What's your body type?",
    subtitle: "We'll suggest silhouettes that flatter your natural shape",
    type: "body-type",
  },
  {
    id: "q2",
    title: "What's your style?",
    subtitle: "Pick your main vibe — then dive deeper into sub-genres",
    type: "style-genre",
  },
  {
    id: "q3",
    title: "What occasions do you usually dress for?",
    subtitle: "Select all that apply — your wardrobe should match your life",
    type: "occasions",
  },
  {
    id: "q4",
    title: "What colors speak to you?",
    subtitle: "Pick the palette that feels most like you",
    type: "color-palette",
  },
  {
    id: "q5",
    title: "How do you like your clothes to fit?",
    subtitle: "Your silhouette preference shapes every recommendation",
    type: "fit-vibe",
  },
  {
    id: "q6",
    title: "What's your shopping philosophy?",
    subtitle: "How you shop tells us a lot about your style values",
    type: "budget-philosophy",
  },
];
