import { Routes } from '@angular/router';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: 'survey',
    loadComponent: () =>
      import('./survey/pages/survey-page/survey-page')
        .then(m => m.SurveyPageComponent)
  }
];
