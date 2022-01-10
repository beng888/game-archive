import {
    Browse,
    Game,
    List,
    RedditPost,
    Res,
    ScreenShot,
    Trailer,
    Vendor,
} from '@core/interfaces/rawg';
import { createAction, props } from '@ngrx/store';

/* -------------------------- LOAD PARENT PLATFORMS ------------------------- */

export const loadParentPlatforms = createAction(
    '[Header Component] Load Parent Platforms'
);

export const loadParentPlatformsSuccess = createAction(
    '[Header Component] Load Parent Platforms Success',
    (data: Res<List>) => data
);

export const loadParentPlatformsFailure = createAction(
    '[Header Component] Load Parent Platforms Failure',
    (data: any) => data
);

/* ------------------------------- LOAD GENRES ------------------------------ */

export const loadGenres = createAction('[Header Component] Load Genres');

export const loadGenresSuccess = createAction(
    '[Header Component] Load Genres Success',
    (data: Res<List>) => data
);

export const loadGenresFailure = createAction(
    '[Header Component] Load Genres Failure',
    (data: any) => data
);

/* ------------------------------- LOAD GAMES ------------------------------- */

export const loadGamesSuccess = createAction(
    '[Header Component] Load Games Success',
    (data: Res<Game>) => data
);

export const loadGamesFailure = createAction(
    '[Header Component] Load Games Failure',
    (data: any) => data
);

/* ------------------------------- LOAD BROWSE ------------------------------- */

export const loadBrowseSuccess = createAction(
    '[Browser Page] Load Browse Success',
    (data: Res<Browse>) => data
);

export const loadBrowseFailure = createAction(
    '[Browser Page] Load Browse Failure',
    (data: any) => data
);

/* ---------------------------- LOAD GAME DETAILS --------------------------- */

export const loadGameDetailsSuccess = createAction(
    '[Header Component] Load Game Details Success',
    (data: {
        screenshots: ScreenShot[];
        trailers: Trailer[];
        vendors: Vendor[];
        reddit_posts: RedditPost[];
        next_posts_page: string | null;
    }) => data
);

export const loadGameDetailsFailure = createAction(
    '[Header Component] Load Game Details Failure',
    (data: any) => data
);

/* -------------------------- LOAD NEXT POSTS PAGE -------------------------- */

export const loadNextPostsPage = createAction(
    '[game-posts Component] Load Game Details Next Reddit Posts Page',
    (data: any) => data
);

export const loadNextPostsPageSuccess = createAction(
    '[game-posts Component] Load Game Details Next Reddit Posts Page Success',
    (data: any) => data
);

export const loadNextPostsPageFailure = createAction(
    '[game-posts Component] Load Game Details Next Reddit Posts Page Failure',
    (data: any) => data
);

/* -------------------------- LOAD NEXT GAMES PAGE -------------------------- */

export const loadNextGamesPage = createAction(
    '[Home Component] Load Game Cards Next Page',
    (data: any) => data
);

export const loadNextGamesPageSuccess = createAction(
    '[Home Component] Load Game Cards Next Page Success',
    (data: any) => data
);

export const loadNextGamesPageFailure = createAction(
    '[Home Component] Load Game Cards Next Page Failure',
    (data: any) => data
);
