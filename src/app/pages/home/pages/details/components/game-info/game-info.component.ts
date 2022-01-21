import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    HostListener,
} from '@angular/core';
import { Rating } from '@core/interfaces/rawg';
import { getColor, getImage } from '@shared/helpers/functions';
import { hideScrollToTop } from '@store/actions/rawg.actions';
import { State } from '@store/reducers/rawg.reducer';
import { Appstate } from '@store/index';
import { Store } from '@ngrx/store';

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

    public loadedImages: number[] = [];

    hideOrShowScroller = (bool: boolean) =>
        this.store.dispatch(hideScrollToTop(bool));

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
    };

    ngOnInit(): void {}
    constructor(private store: Store<Appstate>) {}
}
