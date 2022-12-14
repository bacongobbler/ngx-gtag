import {
  Directive,
  HostListener,
  Renderer2,
  Input,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { GtagService } from './gtag.service';

@Directive({
  selector: '[gtagEvent]'
})
export class GtagEventDirective implements AfterViewInit {
  @Input() trackOn = '';
  @Input() action = '';
  @Input() category = '';
  @Input() params: any;

  constructor(
    private gtag: GtagService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    try {
      this.renderer.listen(this.el.nativeElement, this.trackOn, () => {
        this.gtag.event(this.action || this.trackOn, {
          event_category: this.category,
          ...this.params
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}
