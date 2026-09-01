# Exact Integration Steps for Style Selector

## Overview

The new `StyleSelectorComponent` replaces the first question in your survey (the "styles" question) with a premium, interactive design that includes expandable trait selection.

## Step-by-Step Integration

### Step 1: Update Questions Data (Optional)

If you want to completely replace the old question, you can either:

**Option A: Keep both** - Keep the old question and add the new component as a separate step
**Option B: Replace** - Replace the "styles" question entirely

For **Option B** (recommended), update `data/questions.ts`:

```typescript
// data/questions.ts

// REMOVE or COMMENT OUT the old styles question:
/*
{
  id: "styles",
  title: "What styles resonate with you?",
  subtitle: "Select all that apply.",
  type: "multiple",
  options: [...]
}
*/

// The StyleSelectorComponent will handle this question now
```

### Step 2: Update Survey Page Component

```typescript
// pages/survey-page/survey-page.component.ts

import { Component } from '@angular/core';
import { ProgressBar } from '../../components/progress-bar/progress-bar.component';
import { QuestionCard } from '../../components/question-card/question-card.component';
import { StyleSelectorComponent } from '../../components/style-selector/style-selector.component'; // ADD THIS
import { QUESTIONS } from '../../data/questions';
import { Question } from '../../models/question.model';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    ProgressBar, 
    QuestionCard, 
    StyleSelectorComponent // ADD THIS
  ],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent {

  questions: Question[] = QUESTIONS;
  currentStep = 0;
  answers: Record<string, any> = {};

  // ADD: Track style selector separately
  styleSelection: { style: string; traits: string[] } | null = null;

  constructor(private surveyService: SurveyService) {}

  get totalSteps(){
    // +1 for the style selector component
    return this.questions.length + 1;
  }

  get isStyleSelectorStep(): boolean {
    return this.currentStep === 0; // First step is style selector
  }

  // ADD: Handle style selection
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
    // Style selector step
    if (this.isStyleSelectorStep) {
      return this.styleSelection !== null;
    }

    // Regular questions
    const questionIndex = this.currentStep - 1; // Adjust for style selector
    const question = this.questions[questionIndex];
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
    } else {
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
      archetype: "placeholder",
      // NEW: Use style selector data
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
  }
}
```

### Step 3: Update Survey Page Template

```html
<!-- pages/survey-page/survey-page.component.html -->

<div class="bg-aura">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="blob blob-4"></div>
  <div class="blob blob-5"></div>
</div>
<div class="grain"></div>

<div class="survey-container">
  
  <header class="survey-header">
    <h1 class="brand-title">Sajj</h1>
  </header>

  <div class="survey-card">
    
    <!-- Progress Bar -->
    <app-progress-bar 
      [current]="currentStep + 1" 
      [total]="totalSteps">
    </app-progress-bar>

    <!-- NEW: Style Selector Component (First Step) -->
    @if (isStyleSelectorStep) {
      <app-style-selector 
        (selectionChange)="onStyleSelected($event)">
      </app-style-selector>
    }

    <!-- Regular Questions (Remaining Steps) -->
    @if (!isStyleSelectorStep) {
      <app-question-card
        [question]="questions[currentStep - 1]"
        [selectedAnswer]="answers[questions[currentStep - 1].id]"
        (answerSelected)="selectAnswer($event.questionId, $event.value)">
      </app-question-card>
    }

    <!-- Navigation -->
    <div class="navigation">
      @if (currentStep > 0) {
        <button class="back-button" (click)="previousQuestion()">
          ← Back
        </button>
      }
      
      <button 
        class="next-button"
        [disabled]="!canProceed()"
        (click)="nextQuestion()">
        @if (currentStep === totalSteps - 1) {
          Finish
        } @else {
          Continue
        }
        <span>→</span>
      </button>
    </div>

  </div>

</div>
```

### Step 4: Add Back Button Styles (Optional)

```scss
// pages/survey-page/survey-page.component.scss

// ADD this at the bottom:

.back-button {
  padding: 14px 28px;
  border-radius: 99px;
  border: 1.5px solid rgba(44, 31, 48, 0.15);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.5px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s var(--ease);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(44, 31, 48, 0.25);
    transform: translateY(-1px);
  }
}

.navigation {
  display: flex;
  justify-content: space-between; // Changed from flex-end
  align-items: center;
  margin-top: 30px;
  gap: 12px;
}
```

## Alternative: Insert Between Existing Questions

If you want the style selector as the 2nd or 3rd question instead:

```typescript
get isStyleSelectorStep(): boolean {
  return this.currentStep === 2; // Make it the 3rd step
}
```

## Testing Checklist

After integration:

- [ ] Navigate to the survey page
- [ ] Verify style selector appears on the first step
- [ ] Click a style card - verify it becomes selected
- [ ] Verify traits expand smoothly below
- [ ] Select multiple traits
- [ ] Switch to a different style - verify traits change
- [ ] Click "Continue" button
- [ ] Verify you move to the next question
- [ ] Complete the survey
- [ ] Check console log for final result
- [ ] Verify `style_vibe` and `style_traits` are saved correctly

## Troubleshooting

### Issue: Animations not working
**Solution**: Ensure animations are provided in your app config:

```typescript
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // ...
  ]
};
```

### Issue: Styles look different
**Solution**: Make sure CSS variables are defined in `src/styles.scss` (they already are in your project).

### Issue: Type errors
**Solution**: Run `npm install` to ensure all dependencies are up to date.

### Issue: Component not found
**Solution**: Double-check the import path. It should be:
```typescript
import { StyleSelectorComponent } from '../../components/style-selector/style-selector.component';
```

## Summary

1. ✅ Created `StyleSelectorComponent` with 7 style options
2. ✅ Each style has 5 trait options
3. ✅ Smooth animations and premium design
4. ✅ Fully data-driven and reusable
5. ✅ Integrated with your existing survey flow
6. ✅ Maintains your design system (colors, fonts, animations)

The component is ready to use! Just follow the steps above to integrate it into your survey.
