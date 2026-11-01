import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-product-detail-page',
  styleUrl: './product-detail-page.scss',
  templateUrl: './product-detail-page.html',
})
export class ProductDetailPage {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    protected productService = inject(ProductService);
    id = this.route.snapshot.paramMap.get('id');
    productId = Number(this.id);
    product=computed(()=>this.productService.listProducts().find(p=>p.id==this.productId)) ;
    goBack() {
   this.router.navigate(['/catalogue']);
}
}
