import { Routes } from '@angular/router';
import { productResolver } from '../resolvers/product-resolver';
import { adminGuard } from '../guards/admin-guard';
import { unsavedChangesGuard } from '../guards/unsaved-changes-guard';

export const CATALOGUE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./catalogue-page/catalogue-page').then(m => m.CataloguePage),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./product-page/product-page').then(m => m.ProductPage),
    canActivate: [adminGuard],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./product-edit-page/product-edit-page').then(m => m.ProductEditPage),
    resolve: {
      product: productResolver,
    },
    canActivate: [adminGuard],
    canDeactivate:[unsavedChangesGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail-page/product-detail-page').then(m => m.ProductDetailPage),
    resolve: {
      product: productResolver,
    },
  },
];