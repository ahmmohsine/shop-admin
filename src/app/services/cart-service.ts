import { Service, signal, computed, inject, effect } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { ProductService } from './product-service';

@Service()
export class CartService {
  private productService = inject(ProductService);
  private readonly cartItems = signal<CartItem[]>(this.load());
  shoppingCart = this.cartItems.asReadonly();
  count = computed(() => this.cartItems().reduce((sum, i) => sum + i.quantity, 0));
  subTotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );
  tva = 0.21;
  montantTva = computed(() => this.subTotal() * this.tva);
  totalTtc = computed(() => this.subTotal() + this.montantTva());

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }
  remove(id: number) {
    const item = this.cartItems().find((i) => i.product.id === id);
    if (item != undefined) {
      this.productService.changeStock(item.product.id, item.quantity);
      this.cartItems.set(this.cartItems().filter((i) => i.product.id !== id));
    }
  }
  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem('cart') ?? '[]');
    } catch {
      return [];
    }
  }
  add(newElement: CartItem) {
    this.productService.changeStock(newElement.product.id, -newElement.quantity);
    if (this.cartItems().some((i) => i.product.id === newElement.product.id)) {
      this.cartItems.update((items) =>
        items.map((i) =>
          i.product.id === newElement.product.id
            ? { ...i, quantity: i.quantity + newElement.quantity }
            : i,
        ),
      );
    } else {
      this.cartItems.update((c) => [...c, newElement]);
    }
  }

  update(product: Product, qty: number) {
    const item = this.cartItems().find((i) => i.product.id === product.id);
    const current = this.productService.listProducts().find((p) => p.id === product.id);
    if (!item || !current) {
      return;
    }
    if (qty <= 0) {
      this.remove(product.id);
      return;
    }
    const difference = qty - item.quantity;
    if (difference > current.stock) {
      console.log('Quantité insuffisante !');
      return;
    }
    this.productService.changeStock(product.id, -difference);
    this.cartItems.update((items) =>
      items.map((i) => (i.product.id === product.id ? { ...i, quantity: qty } : i)),
    );
  }
  clear() {
    this.cartItems().forEach((item) => {
      this.productService.changeStock(item.product.id, item.quantity);
    });
    this.cartItems.set([]);
  }
  checkout(){
    this.cartItems.set([]);
  }
}
