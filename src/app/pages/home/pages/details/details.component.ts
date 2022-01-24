import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getColor } from '@shared/helpers/functions';
import { Appstate } from '@store/index';
import {
    selectGameDetails,
    selectLoading,
} from '@store/selectors/rawg.selectors';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
    details$ = this.store.pipe(select(selectGameDetails));
    public gameDetailsLoading$ = this.store.pipe(
        select(selectLoading('loadGameDetails'))
    );

    getColor = getColor;

    Array = Array;
    ngOnInit(): void {}

    constructor(private store: Store<Appstate>) {}
}
