import { Component,inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { Panel } from '../../components/panel/panel';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, Panel,RouterLink],
  selector: 'app-cart-page',
  styleUrl: './cart-page.scss',
  templateUrl: './cart-page.html',
})
export class CartPage {
  protected readonly cart = inject(CartService);

}


