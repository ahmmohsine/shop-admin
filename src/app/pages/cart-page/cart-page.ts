import { Component, signal,computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/cart-item';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-cart-page',
  styleUrl: './cart-page.scss',
  templateUrl: './cart-page.html',
})
export class CartPage {
  items = signal<CartItem[]>([]);
  total = computed(()=>this.items().reduce((sum,i)=>sum+i.product.price*i.quantity,0));
  empty = computed(()=>this.items().length===0);
}


