import { Component, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';
import { Highlight } from '../../directives/highlight';
import { LowStock } from '../../directives/low-stock';

@Component({
  imports: [CurrencyPipe,TitleCasePipe,StockLabelPipe,Highlight,LowStock],
  selector: 'app-catalogue-page',
  styleUrl: './catalogue-page.scss',
  templateUrl: './catalogue-page.html',
})
export class CataloguePage {
  PRODUCTS: readonly Product[] = [
  {
    id: 1, name: 'Clavier mécanique', price: 89.99, stock: 2, category: 'Informatique',
    imageUrl: 'https://images.unsplash.com/photo-1756387462457-9afa97d2dbe8?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
  {
    id: 2, name: 'Souris sans fil', price: 29.99, stock: 30, category: 'Informatique',
    imageUrl: 'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
  {
    id: 3, name: 'Casque audio', price: 59.90, stock: 0, category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1590845947676-fa2576f401b2?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
  {
  id: 4,
  name: 'Écran 27 pouces',
  price: 249.99,
  stock: 12,
  category: 'Informatique',
  imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 5,
  name: 'Ordinateur portable',
  price: 899.99,
  stock: 8,
  category: 'Informatique',
  imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 6,
  name: 'Casque gaming',
  price: 79.99,
  stock: 15,
  category: 'Audio',
  imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 7,
  name: 'Appareil photo',
  price: 549.99,
  stock: 5,
  category: 'Photo',
  imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 8,
  name: 'Smartphone',
  price: 699.99,
  stock: 20,
  category: 'Téléphonie',
  imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 9,
  name: 'Montre connectée',
  price: 199.99,
  stock: 18,
  category: 'Accessoires',
  imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&fm=jpg&q=80',
},
{
  id: 10,
  name: 'Enceinte Bluetooth',
  price: 49.99,
  stock: 25,
  category: 'Audio',
  imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&fm=jpg&q=80',
},
];
 
  count = signal(0);
  countClick() {
    this.count.update((c) => c + 1);
  }
}
