import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBar } from '../../components/progress-bar/progress-bar.component';
import { QuestionCard } from '../../components/question-card/question-card.component';
import { StyleSelectorComponent } from '../../components/style-selector/style-selector.component';
import { QUESTIONS } from '../../data/questions';
import { Question } from '../../models/question.model';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [ProgressBar, QuestionCard, StyleSelectorComponent],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent {

  // All survey questions
  questions: Question[] = QUESTIONS;

  // Current question index
  currentStep = 0;

  answers: Record<string, any> = {};

  // Track style selector data separately
  styleSelection: { style: string; traits: string[] } | null = null;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  get totalSteps(){
    return this.questions.length;
  }

  get isStyleSelectorStep(): boolean {
    // First question (styles) should use the new component
    return this.currentStep === 0 && this.questions[0]?.id === 'styles';
  }

  onStyleSelected(selection: { style: string; traits: string[] }) {
    this.styleSelection = selection;
    // Store in answers for consistency
    this.answers['styles'] = [selection.style];
    this.answers['style-traits'] = selection.traits;
  }

  selectAnswer(questionId: string, value: unknown) {
    this.answers[questionId] = value;
  }

  canProceed(): boolean {
    // If it's the style selector step, check if style is selected
    if (this.isStyleSelectorStep) {
      return this.styleSelection !== null;
    }

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
      style_vibe: this.styleSelection?.style || this.answers['styles'],
      style_traits: this.styleSelection?.traits || [],
      occasions: this.answers['occasions'],
      challenge: this.answers['challenge'],
      color_palette: this.answers['colors'],
      fit_vibe: this.answers['fit'],
      adventure_level: this.answers['adventure']
    };

    this.surveyService.saveQuizResult(result);

    console.log("Quiz result saved:", result);
    
    // Navigate to results page
    this.router.navigate(['/onboarding/results']);
  }

}