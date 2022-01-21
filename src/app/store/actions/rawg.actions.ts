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
    'loadParentPlatforms: [Header Component]'
);

export const loadParentPlatformsSuccess = createAction(
    'loadParentPlatforms: [Header Component] Success',
    (data: Res<List>) => data
);

export const loadParentPlatformsFailure = createAction(
    'loadParentPlatforms: [Header Component] Failure',
    (data: any) => data
);

/* ------------------------------- LOAD GENRES ------------------------------ */

export const loadGenres = createAction('loadGenres: [Header Component]');

export const loadGenresSuccess = createAction(
    'loadGenres: [Header Component] Success',
    (data: Res<List>) => data
);

export const loadGenresFailure = createAction(
    'loadGenres: [Header Component] Failure',
    (data: any) => data
);

/* ------------------------------- LOAD GAMES ------------------------------- */

export const loadGames = createAction('LoadGames: [Header Component]');

export const loadGamesSuccess = createAction(
    'LoadGames: [Header Component] Success',
    (data: Res<Game>) => data
);

export const loadGamesFailure = createAction(
    'LoadGames: [Header Component] Failure',
    (data: any) => data
);

/* ------------------------------- LOAD BROWSE ------------------------------- */

export const loadBrowse = createAction('loadBrowse: [Browser Page]');

export const loadBrowseSuccess = createAction(
    'loadBrowse: [Browser Page] Success',
    (data: Res<Browse>) => data
);

export const loadBrowseFailure = createAction(
    'loadBrowse: [Browser Page] Failure',
    (data: any) => data
);

/* ---------------------------- LOAD GAME DETAILS --------------------------- */

export const loadGameDetails = createAction(
    'loadGameDetails: [Details Component]'
);

export const loadGameDetailsSuccess = createAction(
    'loadGameDetails: [Details Component] Success',
    (data: {
        screenshots: ScreenShot[];
        trailers: Trailer[];
        vendors: Vendor[];
        reddit_posts: RedditPost[];
        loadNextPostsPage: string | null;
    }) => data
);

export const loadGameDetailsFailure = createAction(
    'loadGameDetails: [Details Component] Failure',
    (data: any) => data
);

/* -------------------------- LOAD NEXT POSTS PAGE -------------------------- */

export const loadNextPostsPage = createAction(
    'loadNextPostsPage: [game-posts Component]',
    (data: any) => data
);

export const loadNextPostsPageSuccess = createAction(
    'loadNextPostsPage: [game-posts Component] Success',
    (data: any) => data
);

export const loadNextPostsPageFailure = createAction(
    'loadNextPostsPage: [game-posts Component] Failure',
    (data: any) => data
);

/* -------------------------- LOAD NEXT GAMES PAGE -------------------------- */

export const loadNextGamesPage = createAction(
    'loadNextGamesPage: [Home Component]',
    (data: any) => data
);

export const loadNextGamesPageSuccess = createAction(
    'loadNextGamesPage: [Home Component] Success',
    (data: any) => data
);

export const loadNextGamesPageFailure = createAction(
    'loadNextGamesPage: [Home Component] Failure',
    (data: any) => data
);

/* ---------------------------------- MISC ---------------------------------- */

export const hideScrollToTop = createAction(
    'loadParentPlatforms: [Header Component] Success',
    (data: any) => ({ bool: data })
);
