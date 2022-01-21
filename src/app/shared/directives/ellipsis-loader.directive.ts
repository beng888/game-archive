import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[ellipsisLoader]',
})
export class EllipsisLoaderDirective implements OnInit {
    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit(): void {
        this.renderer.addClass(this.el.nativeElement, 'lds-ellipsis');
        this.renderer.appendChild(
            this.el.nativeElement,
            this.renderer.createElement('div')
        );

        Array.from(Array(3).keys()).forEach(() =>
            this.renderer.appendChild(
                this.el.nativeElement,
                this.renderer.createElement('div')
            )
        );
    }
}
