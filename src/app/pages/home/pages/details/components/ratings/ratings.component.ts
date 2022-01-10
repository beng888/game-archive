import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { Rating } from '@core/interfaces/rawg';

@Component({
    selector: 'app-ratings',
    templateUrl: './ratings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingsComponent implements OnInit {
    @Input() ratings!: Rating[];
    Object = Object;

    ratingColors: any = {
        exceptional: '#7CC03A',
        recommended: '#5E8EF2',
        meh: '#FAC554',
        skip: '#FC4B58',
    };

    getRatingOrder = (Arr: Rating[]) =>
        Object.keys(this.ratingColors).map((r) =>
            Arr.find((arr) => arr.title === r)
        );

    ngOnInit(): void {}
    constructor() {}
}
