import { Routes } from '@angular/router';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: 'survey',
    loadComponent: () =>
      import('./survey/pages/survey-page/survey-page.component')
        .then(m => m.SurveyPageComponent)
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./survey/pages/results-page/results-page.component')
        .then(m => m.ResultsPageComponent)
  }
];
