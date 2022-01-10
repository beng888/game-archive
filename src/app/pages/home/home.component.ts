import { Component, OnInit } from '@angular/core';
import { Game } from '@core/interfaces/rawg';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import {
    selectGames,
    selectNextGamesPage,
} from '@store/selectors/rawg.selectors';
import { map } from 'rxjs/operators';
import * as fromRawgActions from '@store/actions/rawg.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    games$!: Observable<Array<Game>>;
    next$!: Observable<string | null>;
    isCalender: boolean = false;

    public view: string = 'grid_view';
    public viewSelect: boolean = false;
    public views = ['crop_square', 'grid_view', 'grid_on', 'view_list'];

    onVisible = (str: string | null) => {
        if (!str) return;
        const page = str.split('api').pop();
        this.store.dispatch(
            fromRawgActions.loadNextGamesPage({
                page,
                pageType: 'games',
                next: 'next_games_page',
            })
        );
    };

    ngOnInit(): void {
        this.games$ = this.store.pipe(select(selectGames));
        this.next$ = this.store.pipe(select(selectNextGamesPage));
        // this.route.params.subscribe((p) => (this.params = p));
        this.route.params.subscribe(
            (p) => (this.isCalender = Object.keys(p)?.includes('year'))
        );

        // console.log((this.params = this.route.snapshot.params));
        // this.route.params.subscribe((p) => {
        //   if (Object.keys(p)?.length > 0) {
        //     console.log(p);
        //   }
        // });
    }

    constructor(private store: Store<Appstate>, private route: ActivatedRoute) {
        const id: Observable<string> = route.params.pipe(map((p) => p.id));
    }
}
