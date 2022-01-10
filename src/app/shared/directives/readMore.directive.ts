import {
    Directive,
    Renderer2,
    ElementRef,
    AfterViewChecked,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[readMore]',
})
export class readMoreDirective implements AfterViewChecked, OnChanges {
    constructor(private renderer: Renderer2, private el: ElementRef) {}

    @Input() innerText: null | string = null;

    textAppended: boolean = false;
    expandAppended: boolean = false;
    _class = ['overflow-hidden', 'duration-1000'];
    expand_class = ['w-max', 'my-6', 'cursor-pointer'];
    readMore: boolean = false;
    p = this.renderer.createElement('p');
    readMoreLess = this.renderer.createElement('p');

    reset() {
        this.renderer.removeChild(this.el.nativeElement, this.p);
        this.renderer.removeChild(this.el.nativeElement, this.readMoreLess);
        this.textAppended = false;
        this.expandAppended = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { currentValue, previousValue } = changes.innerText;
        if (previousValue && currentValue !== previousValue) this.reset();
    }

    ngAfterViewChecked() {
        if (!this.innerText) this.reset();
        if (this.innerText && !this.textAppended) {
            this.textAppended = true;
            this._class.forEach((c) => this.renderer.addClass(this.p, c));
            this.renderer.setProperty(this.p, 'innerHTML', this.innerText);
            this.renderer.appendChild(this.el.nativeElement, this.p);

            if (this.el.nativeElement.offsetHeight >= 95) {
                if (!this.expandAppended) {
                    this.readMoreLess.textContent = '+ Read More';
                    this.expandAppended = true;
                    this.renderer.appendChild(
                        this.el.nativeElement,
                        this.readMoreLess
                    );
                    this.expand_class.forEach((c) =>
                        this.renderer.addClass(this.readMoreLess, c)
                    );
                    this.renderer.addClass(this.p, 'max-h-24');
                    this.renderer.listen(this.readMoreLess, 'click', (e) => {
                        e.stopImmediatePropagation();
                        this.readMore = !this.readMore;
                        e.target.innerHTML = this.readMore
                            ? '- Read Less'
                            : '+ Read More';
                        this.p.style.maxHeight = this.readMore
                            ? '100vh'
                            : '6rem';
                    });
                }
            }
        }
    }
}
