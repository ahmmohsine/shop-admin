import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { LowStock } from '../../directives/low-stock';
import { TitleCasePipe,CurrencyPipe } from '@angular/common';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';

@Component({
  imports: [LowStock,TitleCasePipe,CurrencyPipe,StockLabelPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();
  addProductToCart() {
   this.addToCart.emit(this.product());
  }
}
