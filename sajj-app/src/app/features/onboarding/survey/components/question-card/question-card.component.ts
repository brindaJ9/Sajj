import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Question } from '../../models/question.model';
import { getPaletteColors } from '../../data/color-palettes.data';

export type SurveyAnswerValue = string | number | string[];

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCard implements OnChanges {
  @Input() question!: Question;

  @Input() selectedAnswer: SurveyAnswerValue | null | undefined;

  @Output() selectedOption = new EventEmitter<SurveyAnswerValue>();

  get sliderMin(): number {
    return this.question?.sliderMin ?? 0;
  }

  get sliderMax(): number {
    return this.question?.sliderMax ?? 100;
  }

  get sliderValue(): number {
    if (this.selectedAnswer != null && typeof this.selectedAnswer === 'number') {
      return this.selectedAnswer;
    }
    return Math.round((this.sliderMin + this.sliderMax) / 2);
  }

  get isColorPaletteQuestion(): boolean {
    return this.question?.id === 'colors';
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.question?.type === 'slider' && this.selectedAnswer == null) {
      this.selectedOption.emit(this.sliderValue);
    }
  }

  isOptionSelected(optionId: string): boolean {
    if (this.question.type === 'multiple') {
      return (
        Array.isArray(this.selectedAnswer) &&
        this.selectedAnswer.includes(optionId)
      );
    }
    return this.selectedAnswer === optionId;
  }

  onSingleSelect(option: { id: string }) {
    this.selectedOption.emit(option.id);
  }

  onMultiSelect(option: { id: string }) {
    const current = Array.isArray(this.selectedAnswer)
      ? [...this.selectedAnswer]
      : [];
    const index = current.indexOf(option.id);

    if (index >= 0) {
      current.splice(index, 1);
    } else {
      const max = this.question.maxSelections;
      if (max != null && current.length >= max) {
        return;
      }
      current.push(option.id);
    }

    this.selectedOption.emit(current);
  }

  onSliderChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.selectedOption.emit(value);
  }

  getPaletteColors(optionId: string): string[] {
    return getPaletteColors(optionId);
  }
}
