import { inject, input } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../models/product';

export const productResolver: ResolveFn<Product| RedirectCommand> = (route, state) => {
   const productService = inject(ProductService);
   const router = inject(Router);
   const id = Number(route.paramMap.get('id'));
   const product = productService.listProducts()
    .find(p => p.id === id);

  if (!product) {
    return new RedirectCommand(router.parseUrl('/introuvable'));
  }
  return product;
};
