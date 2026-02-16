import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding/survey',
    pathMatch: 'full'
  },

  {
    path: 'onboarding',
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes')
        .then(m => m.ONBOARDING_ROUTES)
  },

  //{
    //path: 'dashboard',
    //loadChildren: () =>
      //import('./features/dashboard/dashboard.routes')
        //.then(m => m.DASHBOARD_ROUTES)
 // },

  {
    path: '**',
    redirectTo: 'onboarding/survey'
  }
];
