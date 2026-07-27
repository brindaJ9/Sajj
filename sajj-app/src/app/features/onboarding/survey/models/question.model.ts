export type QuestionType = 'single' | 'multiple' | 'slider';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: QuestionType;
  maxSelections?: number;
  options?: QuestionOption[];
  sliderMin?: number;
  sliderMax?: number;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
}
