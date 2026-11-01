import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';
import { LowStock } from '../../directives/low-stock';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';
import { QuantityPicker } from '../quantity-picker/quantity-picker';
import { RouterLink } from '@angular/router';

@Component({
  imports: [LowStock, TitleCasePipe, CurrencyPipe,
     StockLabelPipe, QuantityPicker,RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<{ product: Product; quantity: number }>();
  selectedQuantity = signal(1);
  addProductToCart() {
    this.addToCart.emit({
      product: this.product(),
      quantity: this.selectedQuantity(),
    });
    this.selectedQuantity.set(1);
  }
}
