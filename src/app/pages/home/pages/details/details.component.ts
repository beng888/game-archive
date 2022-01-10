import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from '@store/index';
import { selectGameDetails } from '@store/selectors/rawg.selectors';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
    details$ = this.store.pipe(select(selectGameDetails));
    Array = Array;
    ngOnInit(): void {
        this.store
            .pipe(select(selectGameDetails))
            .subscribe((s) => console.log('%c⧭', 'color: white', s));
    }

    constructor(private store: Store<Appstate>) {}
}
