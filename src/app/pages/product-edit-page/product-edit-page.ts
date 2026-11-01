import { Component, inject, signal, input, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import {
  applyEach,
  form,
  min,
  minLength,
  required,
  FormField,
  FormRoot,
} from '@angular/forms/signals';
import { CategoryService } from '../../services/category-service';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-product-edit-page',
  styleUrl: './product-edit-page.scss',
  templateUrl: './product-edit-page.html',
})
export class ProductEditPage {
  saved = signal(false);
  private router = inject(Router);
  id = input.required<string>();
  productService = inject(ProductService);
product = input.required<Product>();

productModel = linkedSignal(() => ({
  ...this.product(),
  variants: this.product().variants.map((v) => ({ ...v })),
}));
protected categoryService = inject(CategoryService);
  goBack() {
    this.router.navigate(['/catalogue']);
  }
  productForm = form(
    this.productModel,
    (path) => {
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
      applyEach(path.variants, (variant) => {
        required(variant.color, { message: 'Couleur obligatoire!' });
        required(variant.size, { message: 'Taille obligatoire!' });
      });
    },
    {
      submission: {
        action: async (field) => {
          this.productService.update(field().value());
           this.saved.set(true);   
          this.router.navigate(['/catalogue', Number(this.id())])
        },
      },
    },
  );
  addVariant() {
    this.productModel.update((product) => ({
      ...product,
      variants: [...product.variants, { size: '', color: '' }],
    }));
  }
  removeVariant(index: number) {
    this.productModel.update((product) => ({
      ...product,
      variants: product.variants.filter((_, i) => i !== index),
    }));
  }
}
