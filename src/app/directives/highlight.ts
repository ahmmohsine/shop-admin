import { Directive,ElementRef,input,inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
  '(mouseenter)': 'setColor(color())',
  '(mouseleave)': 'setColor(null)',
},
})
export class Highlight {
  color = input('yellow', { alias: 'appHighlight' });
   private el = inject(ElementRef);
  setColor(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
