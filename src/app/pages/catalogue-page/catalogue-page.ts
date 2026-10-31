import { Component, inject } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Panel } from '../../components/panel/panel';
import { CartItem } from '../../models/cart-item';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';

@Component({
  imports: [ProductCard, Panel],
  selector: 'app-catalogue-page',
  styleUrl: './catalogue-page.scss',
  templateUrl: './catalogue-page.html',
})
export class CataloguePage {
  private readonly shoppingCart = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  protected readonly cartItems = this.shoppingCart.shoppingCart;
  selectedCategory = this.categoryService.selectedCategory;
  count = this.shoppingCart.count;
  subTotal = this.shoppingCart.subTotal;
  montantTva = this.shoppingCart.montantTva;
  totalTtc = this.shoppingCart.totalTtc;
  categories = this.categoryService.listCategories;
  selectCategory(categoryName: string) {
    this.categoryService.selectCategory(categoryName);
  }
  filteredProducts = this.productService.filteredProducts;

  addToCart(item: CartItem) {
    this.shoppingCart.add(item);
  }
}
