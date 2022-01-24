import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChildren,
    QueryList,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Trailer } from '@core/interfaces/rawg';
import { getImage } from '@shared/helpers/functions';

@Component({
    selector: 'app-media-card',
    templateUrl: './media-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaCardComponent implements OnInit {
    @Input() trailers!: Trailer[];
    @Input() background_image: string | null = null;
    @ViewChildren('videoEl') videoEl!: QueryList<ElementRef>;
    @ViewChild('mainVideoEl') mainVideoEl!: ElementRef<any>;
    @Input() loading!: boolean | null;

    Array = Array;
    selectedMedia: number = 0;
    hoveredClip: number | null = null;
    getImage = getImage;

    clipBlurred = () => {
        this.hoveredClip = null;
        this.videoEl.map((el) => {
            el.nativeElement.currentTime = 0;
            el.nativeElement.pause();
        });
    };

    clipHovered = (I: number) => {
        this.hoveredClip = I;
        const Elements = this.videoEl.toArray();
        Elements[I].nativeElement.play();
    };

    selectMedia = (i: number) => {
        this.selectedMedia = i;
        this.mainVideoEl?.nativeElement?.load();
    };

    ngOnInit(): void {
        if (Array.isArray(this.trailers) && this.trailers.length)
            this.mainVideoEl?.nativeElement?.load();
    }

    constructor() {}
}
