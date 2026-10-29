import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'catalogue',
        pathMatch:'full'
    },
    {
        path:'catalogue',
        loadComponent:()=>import('./pages/catalogue-page/catalogue-page').then(m=>m.CataloguePage)
    },
    {
        path:'clients',
        loadComponent:()=>import('./pages/customers-page/customers-page').then(m=>m.CustomersPage)
    },
    {
        path:'panier',
        loadComponent:()=>import('./pages/cart-page/cart-page').then(m=>m.CartPage)
    },
];
