import { Injectable } from '@angular/core';
import { QuizResult } from '../models/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  quizResult: QuizResult | null = null;

  loading = false;

  constructor() {}

  async saveQuizResult(result: QuizResult) {
    // later we will connect this to Supabase
    this.quizResult = result;
  }

  async clearQuizResult() {
    this.quizResult = null;
  }

  getQuizResult(){
    return this.quizResult;
  }

  getLatestResult(): QuizResult | null {
    return this.quizResult;
  }

}