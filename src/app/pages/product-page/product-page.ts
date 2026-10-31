import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product';
import { applyEach, form, FormField, min, minLength, required, FormRoot} from '@angular/forms/signals';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-product-page',
  styleUrl: './product-page.scss',
  templateUrl: './product-page.html',
})
export class ProductPage {
 private productService = inject(ProductService);
 protected categoryService = inject(CategoryService);
 private router = inject(Router);
  productModel = signal<Product>({
    id: 0,
    category: '',
    imageUrl: '',
    name: '',
    price: 0,
    stock: 0,
  variants: [
    { size: '', color: '' }
  ]
  });
  productForm = form(this.productModel, (path) => {
    required(path.name, {
      message: 'Le nom du produit est obligatoire.',
    });

    minLength(path.name, 3, {
      message: 'Le nom doit contenir au moins 3 caractères.',
    });

    required(path.category, {
      message: 'La catégorie est obligatoire.',
    });

    required(path.price, {
      message: 'Le prix est obligatoire.',
    });

    min(path.price, 0.01, {
      message: 'Le prix doit être supérieur à 0.',
    });

    min(path.stock, 0, {
      message: 'Le stock ne peut pas être négatif.',
    });

    required(path.imageUrl, {
      message: "L'URL de l'image est obligatoire.",
    });
  applyEach(path.variants,(variant)=>{
    required(variant.color,{message:"Couleur obligatoire!"});
    required(variant.size,{message:"Taille obligatoire!"});
  })
  },{
    submission:{
      action:async (field)=>{ this.productService.add(field().value());
      this.router.navigate(['/catalogue']);}
  }
  });
  addVariant() {
  this.productModel.update(product => ({
    ...product,
    variants: [
      ...product.variants,
      { size: '', color: ''}
    ]
  }));
}
removeVariant(index: number) {
  this.productModel.update(product => ({
    ...product,
    variants: product.variants.filter(
      (_, i) => i !== index
    )
  }));
}
}
