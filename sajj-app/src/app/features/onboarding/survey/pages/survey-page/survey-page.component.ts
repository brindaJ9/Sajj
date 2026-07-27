import { Component } from '@angular/core';
import { ProgressBar } from '../../components/progress-bar/progress-bar.component';
import { QuestionCard } from '../../components/question-card/question-card.component';
import { QUESTIONS } from '../../data/questions';
import { Question } from '../../models/question.model';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [ProgressBar, QuestionCard],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent {

  // All survey questions
  questions: Question[] = QUESTIONS;

  // Current question index
  currentStep = 0;

  answers: Record<string, any> = {};

  constructor(private surveyService: SurveyService) {}

  get totalSteps(){
    return this.questions.length;
  }

  selectAnswer(questionId: string, value: unknown) {
    this.answers[questionId] = value;
  }

  canProceed(): boolean {
    const question = this.questions[this.currentStep];
    const answer = this.answers[question.id];

    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }

    if (question.type === 'slider') {
      return answer !== undefined && answer !== null;
    }

    return answer != null && answer !== '';
  }

  nextQuestion() {
    if(this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }else{
      this.finishQuiz();
    }
  }

  previousQuestion() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

   finishQuiz() {

    const result = {
      archetype: "placeholder", // will compute later
      style_vibe: this.answers['q1'],
      body_type: this.answers['q2'],
      occasions: this.answers['q3'],
      color_palette: this.answers['q4'],
      fit_vibe: this.answers['q5'],
      budget_style: this.answers['q6'],
      adventure_level: this.answers['adventure']
    };

  this.surveyService.saveQuizResult(result);

    console.log("Quiz result saved:", result);
  }

}