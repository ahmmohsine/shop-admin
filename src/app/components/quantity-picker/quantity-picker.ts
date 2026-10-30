import { Component, input, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quantity-picker',
  styleUrl: './quantity-picker.scss',
  templateUrl: './quantity-picker.html',
})
export class QuantityPicker {
  value = model(0);
  maxValue = input.required<number>();
   increment() {
    if(this.value() < this.maxValue() )
      this.value.update(v => v + 1);
  }
   decrement() {
    if(this.value()>1)
      this.value.update(v => v - 1);
  }
}
