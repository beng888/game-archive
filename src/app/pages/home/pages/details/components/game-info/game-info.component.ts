import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    HostListener,
} from '@angular/core';
import { Rating } from '@core/interfaces/rawg';
import { getColor, getImage } from '@shared/helpers/functions';
import { State } from '@store/reducers/rawg.reducer';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent implements OnInit {
    @Input() info!: State;
    readMore: boolean = false;
    activeImage: number | null = null;

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
        event: KeyboardEvent
    ) {
        this.activeImage = null;
    }

    getColor = getColor;
    getImage = getImage;

    getRating = (arr: Rating[]) =>
        arr.reduce(
            (prev: any, current: Rating) =>
                +prev.percent > +current.percent ? prev : current,
            {}
        );

    onClick = (event: any) => {
        var target = event.target || event.srcElement || event.currentTarget;

        console.log('%c⧭', 'color: #00e600', target.scrollLeft);
    };

    ngOnInit(): void {}
    constructor() {}
}
