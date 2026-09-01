# Style Selector Integration Guide

## Quick Start

Replace your existing style question with the new component:

### Step 1: Import the Component

```typescript
// In your survey page component
import { StyleSelectorComponent } from './components/style-selector/style-selector.component';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    CommonModule,
    StyleSelectorComponent, // Add this
    // ... other imports
  ],
  // ...
})
```

### Step 2: Add to Template

```html
<!-- In your survey-page.component.html -->
<div class="survey-card">
  
  @if (currentQuestion === 'style') {
    <app-style-selector 
      (selectionChange)="onStyleSelected($event)" />
  }

  <!-- Other questions -->
  
  <div class="navigation">
    <button 
      class="next-button"
      [disabled]="!canProceed()"
      (click)="nextQuestion()">
      Continue
      <span>→</span>
    </button>
  </div>
</div>
```

### Step 3: Handle the Selection

```typescript
export class SurveyPageComponent {
  // State
  currentQuestion = signal<string>('style');
  styleData = signal<{ style: string; traits: string[] } | null>(null);

  // Handler
  onStyleSelected(selection: { style: string; traits: string[] }) {
    this.styleData.set(selection);
    console.log('Style selected:', selection);
  }

  // Validation
  canProceed(): boolean {
    if (this.currentQuestion() === 'style') {
      return this.styleData() !== null;
    }
    // ... other question validations
    return true;
  }

  // Navigation
  nextQuestion() {
    if (!this.canProceed()) return;

    // Save current answer
    if (this.currentQuestion() === 'style') {
      this.saveStyleToProfile(this.styleData()!);
    }

    // Move to next question
    // ... your navigation logic
  }

  private saveStyleToProfile(data: { style: string; traits: string[] }) {
    // Update your StyleProfile model
    // Example: this.surveyService.updateProfile({ 
    //   preferredStyles: [data.style], 
    //   styleTraits: data.traits 
    // });
  }
}
```

## Advanced Integration

### With Survey Service

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private profile = signal<Partial<StyleProfile>>({});

  updateStyleSelection(style: string, traits: string[]) {
    this.profile.update(current => ({
      ...current,
      preferredStyles: [style],
      styleTraits: traits
    }));
  }

  getProfile() {
    return this.profile.asReadonly();
  }
}
```

### With Form Validation

```typescript
export class SurveyPageComponent {
  styleSelected = signal(false);

  onStyleSelected(selection: { style: string; traits: string[] }) {
    this.styleSelected.set(true);
    this.surveyService.updateStyleSelection(
      selection.style, 
      selection.traits
    );
  }

  canProceed = computed(() => {
    return this.styleSelected();
  });
}
```

### Multi-Step Progress

```typescript
export class SurveyPageComponent {
  readonly TOTAL_STEPS = 6;
  currentStep = signal(1);
  
  answers = signal({
    style: null as { style: string; traits: string[] } | null,
    occasions: null as string[] | null,
    // ... other answers
  });

  onStyleSelected(selection: { style: string; traits: string[] }) {
    this.answers.update(current => ({
      ...current,
      style: selection
    }));
  }

  nextStep() {
    if (this.canProceed()) {
      this.currentStep.update(v => v + 1);
    }
  }

  canProceed(): boolean {
    const step = this.currentStep();
    if (step === 1) return this.answers().style !== null;
    // ... other step validations
    return true;
  }
}
```

## Updating the StyleProfile Model

If you need to store traits separately:

```typescript
// models/style-profile.model.ts
export interface StyleProfile {
  preferredStyles: string[];
  styleTraits?: string[]; // Add this
  occasions: string[];
  primaryChallenge: string;
  colorPalette: string;
  fitPreference: string;
  adventureLevel: number;
}
```

## Migration Checklist

- [ ] Import `StyleSelectorComponent` in your survey page
- [ ] Replace old style question markup with `<app-style-selector>`
- [ ] Add `onStyleSelected()` handler
- [ ] Update validation logic in `canProceed()`
- [ ] Update `StyleProfile` model if needed
- [ ] Test selection state management
- [ ] Test navigation between questions
- [ ] Verify data is saved correctly
- [ ] Test on mobile devices
- [ ] Verify animations work smoothly

## Troubleshooting

### Animations not working
Make sure you have `BrowserAnimationsModule` or `provideAnimations()` in your app config:

```typescript
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // ... other providers
  ]
};
```

### Styles not matching
Ensure CSS variables are defined in your global styles or theme.

### Type errors
Make sure you're using Angular 17+ with signals support.
