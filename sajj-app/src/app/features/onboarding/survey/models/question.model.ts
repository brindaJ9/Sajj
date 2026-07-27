export type QuestionType = "single" | "multiple" | "slider";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;

  // How should this question behave?
  type: QuestionType;

  // Only used for multiple choice questions
  maxSelections?: number;

  // Not used for sliders
  options?: QuestionOption[];
}