import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import * as RawgSelectors from '@store/selectors/rawg.selectors';
import { Browse } from '@core/interfaces/rawg';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
    browse$: Observable<Browse[]> = this.store.select(
        RawgSelectors.selectBrowse
    );

    public browseLoading$ = this.store.pipe(
        select(RawgSelectors.selectLoading('loadBrowse'))
    );

    ngOnInit(): void {}

    constructor(private store: Store<Appstate>) {}
}
