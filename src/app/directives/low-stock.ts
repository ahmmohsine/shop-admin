import { Directive,input } from '@angular/core';

@Directive({
  selector: '[appLowStock]',
  host:{ '[class.low-stock]': 'stock() > 0 && stock() <= 3' }
  
})
export class LowStock {
  stock = input(0,{alias:'appLowStock'});
}