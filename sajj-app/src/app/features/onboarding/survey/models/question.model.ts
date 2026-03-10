export type QuestionType =
  | "body-type"
  | "style-genre"
  | "occasions"
  | "color-palette"
  | "fit-vibe"
  | "budget-philosophy";

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: QuestionType;
}