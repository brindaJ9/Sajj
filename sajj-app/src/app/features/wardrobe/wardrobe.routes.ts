import { Routes } from '@angular/router';

export const WARDROBE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/wardrobe-page/wardrobe-page.component')
        .then(m => m.WardrobePageComponent)
  }
];
