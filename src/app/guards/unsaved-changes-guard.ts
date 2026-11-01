import { CanDeactivateFn } from '@angular/router';
import { ProductEditPage } from '../pages/product-edit-page/product-edit-page';

export const unsavedChangesGuard: CanDeactivateFn<ProductEditPage> = (component) => {
  if (component.saved() || !component.productForm().dirty()) {
    return true;                                 
  }
  return confirm('Des modifications ne sont pas enregistrées. Quitter quand même ?');
};