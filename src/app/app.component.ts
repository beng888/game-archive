import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from './store';
import { selectBackground } from '@store/selectors/rawg.selectors';
import { loadParentPlatforms } from '@store/actions/rawg.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    title = 'game-archive';

    BG$ = this.store.pipe(select(selectBackground));

    ngOnInit(): void {
        this.store.dispatch(loadParentPlatforms());
    }
    constructor(private store: Store<Appstate>) {}
}
