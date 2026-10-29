import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockLabel',
})
export class StockLabelPipe implements PipeTransform {
  transform(stock:number): string {
    if(stock>3)
      return "En stock";
    else
      if(stock>0)
        return "Plus que "+stock+" en stock";
      else
        return "Rupture de stock."
  }
}
