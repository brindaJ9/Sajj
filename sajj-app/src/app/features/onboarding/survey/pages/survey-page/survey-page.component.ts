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

  selectAnswer(questionId: string, value: any) {
    this.answers[questionId] = value;
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
      body_type: this.answers['q1'],
      style_genre: this.answers['q2'],
      occasions: this.answers['q3'],
      color_palette: this.answers['q4'],
      fit_vibe: this.answers['q5'],
      budget_style: this.answers['q6']
    };

  this.surveyService.saveQuizResult(result);

    console.log("Quiz result saved:", result);
  }

}