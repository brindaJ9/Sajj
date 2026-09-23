import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'onboarding',
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes')
        .then(m => m.ONBOARDING_ROUTES)
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)
  },

  {
    path: 'wardrobe',
    loadChildren: () =>
      import('./features/wardrobe/wardrobe.routes')
        .then(m => m.WARDROBE_ROUTES)
  },

  {
    path: 'style-me',
    loadChildren: () =>
      import('./features/style-me/style-me.routes')
        .then(m => m.STYLE_ME_ROUTES)
  },

  {
    path: 'plan-ahead',
    loadChildren: () =>
      import('./features/plan-ahead/plan-ahead.routes')
        .then(m => m.PLAN_AHEAD_ROUTES)
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.routes')
        .then(m => m.PROFILE_ROUTES)
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
