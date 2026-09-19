import { Routes } from '@angular/router';

export const PLAN_AHEAD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/plan-ahead-page/plan-ahead-page.component')
        .then(m => m.PlanAheadPageComponent)
  }
];
