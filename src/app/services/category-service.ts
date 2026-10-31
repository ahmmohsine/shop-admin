import { Service, inject, signal, computed, linkedSignal } from '@angular/core';
import { ProductService } from './product-service';

@Service()
export class CategoryService {
  private readonly categories = signal<string[]>([
    'Informatique',
    'Audio',
    'Photo',
    'Téléphonie',
    'Accessoires',
  ]);
  listCategories = this.categories.asReadonly();

  selectedCategory = linkedSignal(() => {
    this.categories();
    return 'Toutes';
  });
  selectCategory(categoryName: string) {
    this.selectedCategory.set(categoryName);
  }
}
