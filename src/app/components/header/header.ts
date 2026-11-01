import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  standalone:true
})
export class Header {
  protected cart = inject(CartService);
  protected auth = inject(Auth);
}
