# Style Selector Component

A premium, reusable Angular component for selecting fashion styles with expandable trait options.

## Features

- **Modern Angular Signals**: Uses Angular's latest signal-based reactivity
- **Smooth Animations**: Elegant expand/collapse transitions using Angular Animations
- **Data-Driven**: All styles and traits are configured in a separate data file
- **Fully Reusable**: No hardcoded style-specific logic
- **Premium Design**: Matches your existing design system with glassmorphism and smooth interactions
- **Accessible**: Keyboard navigation, focus states, and reduced motion support
- **Responsive**: Adapts beautifully to mobile and desktop

## Usage

### Basic Implementation

```typescript
import { Component } from '@angular/core';
import { StyleSelectorComponent } from './components/style-selector/style-selector.component';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [StyleSelectorComponent],
  template: `
    <app-style-selector 
      (selectionChange)="onStyleSelectionChange($event)" />
  `
})
export class SurveyPageComponent {
  onStyleSelectionChange(selection: { style: string; traits: string[] }) {
    console.log('Selected style:', selection.style);
    console.log('Selected traits:', selection.traits);
    
    // Update your survey state here
    this.surveyData.style = selection.style;
    this.surveyData.traits = selection.traits;
  }
}
```

### Integration with Existing Survey Flow

```typescript
import { Component, signal } from '@angular/core';

@Component({
  // ... component metadata
})
export class SurveyPageComponent {
  currentStep = signal(1);
  styleSelection = signal<{ style: string; traits: string[] } | null>(null);

  onStyleSelectionChange(selection: { style: string; traits: string[] }) {
    this.styleSelection.set(selection);
  }

  canProceed(): boolean {
    return this.styleSelection() !== null;
  }

  nextStep() {
    if (this.canProceed()) {
      // Save to your service/state
      this.currentStep.update(v => v + 1);
    }
  }
}
```

## Customization

### Adding New Styles

Edit `data/style-options.data.ts`:

```typescript
{
  id: 'new-style',
  label: 'New Style',
  emoji: '✨',
  description: 'Your description',
  color: '#FF6B9D',
  colorRgb: '255, 107, 157',
  traits: [
    { id: 'trait-1', label: 'Trait 1' },
    { id: 'trait-2', label: 'Trait 2' }
  ]
}
```

### Styling

All styles are in `style-selector.component.scss`. Key CSS variables from your design system:
- `--ink`: Primary text color
- `--ibis`: Accent color for highlights
- `--paper-glass`: Glass effect backgrounds

### Animation Timing

Adjust in the component decorator:

```typescript
transition('collapsed <=> expanded', [
  animate('400ms cubic-bezier(0.4, 0, 0.2, 1)') // Customize duration and easing
])
```

## Architecture

```
style-selector/
├── style-selector.component.ts      # Component logic with Signals
├── style-selector.component.html    # Template with @for/@if syntax
├── style-selector.component.scss    # Scoped styles
└── README.md                        # This file

data/
└── style-options.data.ts            # Style definitions (data-driven)
```

## Key Design Decisions

1. **Signals over RxJS**: Modern Angular signals for simpler, more performant reactivity
2. **Data Separation**: All style data in a separate file for easy maintenance
3. **Single Selection**: Only one style can be active at a time, but multiple traits
4. **Smooth UX**: Previous traits smoothly collapse when switching styles
5. **Output Events**: Parent components receive structured data via `selectionChange` output

## Accessibility

- Semantic HTML with proper button roles
- Keyboard navigation support
- Focus-visible styles for keyboard users
- Respects `prefers-reduced-motion`
- High contrast ratios for text

## Browser Support

Works in all modern browsers that support:
- Angular 17+
- CSS Grid
- CSS Custom Properties
- Backdrop Filter
