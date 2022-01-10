import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { ScreenShot } from '@core/interfaces/rawg';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent implements OnInit {
    @Input() images!: ScreenShot[];
    slide = 0;

    ngOnInit(): void {}
    constructor() {}
}
