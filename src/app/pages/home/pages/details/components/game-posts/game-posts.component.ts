import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedditPost } from '@core/interfaces/rawg';
import { Appstate } from '@store/index';
import { select, Store } from '@ngrx/store';
import * as fromRawgActions from '@store/actions/rawg.actions';
import { selectLoading } from '@store/selectors/rawg.selectors';

@Component({
    selector: 'app-game-posts',
    templateUrl: './game-posts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePostsComponent implements OnInit {
    @Input() posts!: RedditPost[];
    @Input() next!: string | null;

    public page!: number | null;
    public nextPostsPageLoading$ = this.store.pipe(
        select(selectLoading('loadNextPostsPage'))
    );

    getNextPage = (str: string | null) => {
        if (str === null) return;
        const page = str.split('api').pop();

        this.store.dispatch(
            fromRawgActions.loadNextPostsPage({
                page,
                pageType: 'reddit_posts',
            })
        );
    };

    ngOnInit(): void {
        this.route.queryParams.subscribe((s) => this.page);
    }

    constructor(
        private route: ActivatedRoute,
        private store: Store<Appstate>
    ) {}
}
