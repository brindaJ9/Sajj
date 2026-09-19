import { Routes } from '@angular/router';

export const STYLE_ME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/style-me-page/style-me-page.component')
        .then(m => m.StyleMePageComponent)
  }
];
