import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BODY_TYPES,
  STYLE_GENRES,
  OCCASIONS,
  COLOR_PALETTES,
  FIT_VIBES,
  BUDGET_STYLES
} from '../../data/survey-data';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCard implements OnChanges{

  @Input() question: any;
  @Input() selected: string[] = [];

  @Output() selectedOption = new EventEmitter<string>();

   options: any[] = [];

  ngOnChanges() {
    this.setOptions();
  }

  setOptions() {

    if (!this.question) return;

    switch (this.question.type) {

      case 'body-type':
        this.options = BODY_TYPES;
        break;

      case 'style-genre':
        this.options = STYLE_GENRES;
        break;

      case 'occasions':
        this.options = OCCASIONS;
        break;

      case 'color-palette':
        this.options = COLOR_PALETTES;
        break;

      case 'fit-vibe':
        this.options = FIT_VIBES;
        break;

      case 'budget-philosophy':
        this.options = BUDGET_STYLES;
        break;

      default:
        this.options = [];
    }

  }

  onSelect(option: any) {
    this.selectedOption.emit(option.id);
  }

}