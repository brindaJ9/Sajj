import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCard {

  @Input() question!: Question;

  @Input() selectedAnswer: any;

  @Output() selectedOption = new EventEmitter<any>();

  onSelect(option: any) {
    this.selectedOption.emit(option.id);
  }

}