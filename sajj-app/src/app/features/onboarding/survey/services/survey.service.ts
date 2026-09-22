import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QuizResult } from '../models/quiz-result.model';
import { StyleProfile } from '../models/style-profile.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly STORAGE_KEY = 'sajj_quiz_result';
  
  quizResult: QuizResult | null = null;

  loading = false;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Restore quiz result from sessionStorage on service initialization
    if (this.isBrowser) {
      this.restoreFromStorage();
    }
  }

  /**
   * Restore quiz result from sessionStorage
   */
  private restoreFromStorage(): void {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.quizResult = parsed;
      }
    } catch (error) {
      console.warn('Failed to restore quiz result from sessionStorage:', error);
      // Clear invalid data
      this.clearStoredData();
    }
  }

  /**
   * Save quiz result to sessionStorage
   */
  private saveToStorage(result: QuizResult): void {
    if (!this.isBrowser) {
      return;
    }
    
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(result));
    } catch (error) {
      console.error('Failed to save quiz result to sessionStorage:', error);
    }
  }

  /**
   * Clear stored data from sessionStorage
   */
  private clearStoredData(): void {
    if (!this.isBrowser) {
      return;
    }
    
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear quiz result from sessionStorage:', error);
    }
  }

  async saveQuizResult(result: QuizResult) {
    // Save to memory
    this.quizResult = result;
    
    // Persist to sessionStorage
    this.saveToStorage(result);
  }

  async clearQuizResult() {
    // Clear from memory
    this.quizResult = null;
    
    // Clear from sessionStorage
    this.clearStoredData();
  }

  getQuizResult(): QuizResult | null {
    return this.quizResult;
  }

  getLatestResult(): QuizResult | null {
    return this.quizResult;
  }

  /**
   * Map QuizResult to StyleProfile interface
   * Returns null if essential data is missing
   */
  getStyleProfile(): StyleProfile | null {
    if (!this.quizResult) {
      return null;
    }

    const result = this.quizResult;

    // Map QuizResult fields to StyleProfile
    return {
      preferredStyles: [
        result.style_vibe,
        ...(result.style_traits || [])
      ].filter(Boolean),
      occasions: result.occasions || [],
      primaryChallenge: result.challenge || '',
      colorPalette: result.color_palette || '',
      fitPreference: result.fit_vibe || '',
      adventureLevel: result.adventure_level || 5
    };
  }

}
