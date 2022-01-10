import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditPost } from '@core/interfaces/rawg';
import { Appstate } from '@store/index';
import { Store } from '@ngrx/store';
import * as fromRawgActions from '@store/actions/rawg.actions';

@Component({
    selector: 'app-game-posts',
    templateUrl: './game-posts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePostsComponent implements OnInit {
    @Input() posts!: RedditPost[];
    @Input() next!: string | null;

    public page!: number | null;

    getNextPage = (str: string | null) => {
        if (str === null) return;
        const page = str.split('api').pop();

        this.store.dispatch(
            fromRawgActions.loadNextPostsPage({
                page,
                pageType: 'reddit_posts',
                next: 'next_posts_page',
            })
        );
    };

    ngOnInit(): void {
        this.route.queryParams.subscribe((s) => this.page);
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<Appstate>
    ) {}
}
