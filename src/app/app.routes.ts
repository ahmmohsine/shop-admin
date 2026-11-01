import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogue',
    pathMatch: 'full',
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./pages/catalogue.routes').then((m) => m.CATALOGUE_ROUTES),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/customers-page/customers-page').then((m) => m.CustomersPage),
  },
  {
    path: 'panier',
    loadComponent: () => import('./pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
