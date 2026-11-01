import { Service, signal, computed, inject, effect } from '@angular/core';
import { Product } from '../models/product';
import { CategoryService } from './category-service';

@Service()
export class ProductService {
  private readonly INITIAL_PRODUCTS: Product[] = [
    {
      id: 1,
      name: 'Clavier mécanique',
      price: 89.99,
      stock: 2,
      category: 'Informatique',
      imageUrl:
        'https://images.unsplash.com/photo-1756387462457-9afa97d2dbe8?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Compact', color: 'Noir' },
        { size: 'Full Size', color: 'Blanc' },
        { size: 'Compact', color: 'RGB' },
      ],
    },
    {
      id: 2,
      name: 'Souris sans fil',
      price: 29.99,
      stock: 30,
      category: 'Informatique',
      imageUrl:
        'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Standard', color: 'Noir' },
        { size: 'Standard', color: 'Blanc' },
        { size: 'Standard', color: 'Rose' },
      ],
    },
    {
      id: 3,
      name: 'Casque audio',
      price: 59.9,
      stock: 0,
      category: 'Audio',
      imageUrl:
        'https://images.unsplash.com/photo-1590845947676-fa2576f401b2?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Standard', color: 'Noir' },
        { size: 'Standard', color: 'Blanc' },
        { size: 'Standard', color: 'Bleu' },
      ],
    },
    {
      id: 4,
      name: 'Écran 27 pouces',
      price: 249.99,
      stock: 12,
      category: 'Informatique',
      imageUrl:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: '27 pouces', color: 'Noir' },
        { size: '27 pouces', color: 'Blanc' },
      ],
    },
    {
      id: 5,
      name: 'Ordinateur portable',
      price: 899.99,
      stock: 8,
      category: 'Informatique',
      imageUrl:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: '14 pouces', color: 'Gris' },
        { size: '15 pouces', color: 'Noir' },
        { size: '16 pouces', color: 'Argent' },
      ],
    },
    {
      id: 6,
      name: 'Casque gaming',
      price: 79.99,
      stock: 15,
      category: 'Audio',
      imageUrl:
        'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Standard', color: 'Noir' },
        { size: 'Standard', color: 'Rouge' },
        { size: 'Standard', color: 'Blanc' },
      ],
    },
    {
      id: 7,
      name: 'Appareil photo',
      price: 549.99,
      stock: 5,
      category: 'Photo',
      imageUrl:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Standard', color: 'Noir' },
        { size: 'Standard', color: 'Argent' },
      ],
    },
    {
      id: 8,
      name: 'Smartphone',
      price: 699.99,
      stock: 20,
      category: 'Téléphonie',
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: '128 Go', color: 'Noir' },
        { size: '256 Go', color: 'Bleu' },
        { size: '512 Go', color: 'Blanc' },
      ],
    },
    {
      id: 9,
      name: 'Montre connectée',
      price: 199.99,
      stock: 18,
      category: 'Accessoires',
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: '40 mm', color: 'Noir' },
        { size: '44 mm', color: 'Argent' },
        { size: '44 mm', color: 'Rose' },
      ],
    },
    {
      id: 10,
      name: 'Enceinte Bluetooth',
      price: 49.99,
      stock: 25,
      category: 'Audio',
      imageUrl:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&fm=jpg&q=80',
      variants: [
        { size: 'Compact', color: 'Noir' },
        { size: 'Compact', color: 'Bleu' },
        { size: 'Large', color: 'Gris' },
      ],
    },
  ];
  private readonly products = signal<Product[]>(this.load());

  readonly categoryService = inject(CategoryService);
  constructor() {
    effect(() => {
      localStorage.setItem('products', JSON.stringify(this.products()));
    });
  }
  load(): Product[] {
    const saved = localStorage.getItem('products');
    if (!saved) {
      return this.INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return this.INITIAL_PRODUCTS;
    }
  }
  listProducts = this.products.asReadonly();
  filteredProducts = computed(() =>
    this.categoryService.selectedCategory() === 'Toutes'
      ? this.products()
      : this.products().filter((p) => p.category === this.categoryService.selectedCategory()),
  );

  public changeStock(id: number, delta: number) {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, stock: p.stock + delta } : p)),
    );
  }
  public add(newProduct: Product) {
    const currentProduct = this.products().find(
      (p) => p.name === newProduct.name && p.category === newProduct.category,
    );
    if (currentProduct) {
      this.changeStock(currentProduct.id, newProduct.stock);
    } else {
      this.products.update((list) => [...list, { ...newProduct, id: this.getNextId() }]);
    }
  }
  public getNextId() {
    return Math.max(...this.products().map((p) => p.id)) + 1;
  }
  update(updatedProduct: Product) {
    this.products.update((products) =>
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  }
}
