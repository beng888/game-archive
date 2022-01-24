import { Component, OnInit } from '@angular/core';
import { Game } from '@core/interfaces/rawg';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import {
    selectGames,
    selectNextGamesPage,
    selectLoading,
} from '@store/selectors/rawg.selectors';
import { map, tap } from 'rxjs/operators';
import * as fromRawgActions from '@store/actions/rawg.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    games$ = this.store.pipe(select(selectGames));
    next$ = this.store.pipe(select(selectNextGamesPage));

    public nextGamesPageLoading$ = this.store.pipe(
        select(selectLoading('loadNextGamesPage'))
    );
    public isCalender: boolean = false;
    public gamesLoading$ = this.store.pipe(select(selectLoading('LoadGames')));
    public view: string = 'grid_view';
    public viewSelect: boolean = false;
    public views = ['crop_square', 'grid_view', 'grid_on', 'view_list'];
    public changeView = (v: string) => {
        localStorage.setItem('GameArchiveView', v);
        this.view = v;
    };

    onVisible = (str: string | null) => {
        if (!str) return;
        const page = str.split('api').pop();
        this.store.dispatch(
            fromRawgActions.loadNextGamesPage({
                page,
                pageType: 'games',
            })
        );
    };

    ngOnInit(): void {
        this.route.params.subscribe(
            (p) => (this.isCalender = Object.keys(p)?.includes('year'))
        );

        this.view = localStorage.getItem('GameArchiveView') || 'grid_view';
    }

    constructor(private store: Store<Appstate>, private route: ActivatedRoute) {
        const id: Observable<string> = route.params.pipe(map((p) => p.id));
    }
}
