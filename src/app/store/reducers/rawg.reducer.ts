import * as res from '@core/interfaces/rawg';
import { createReducer, on } from '@ngrx/store';
import { ordering } from '@pages/home/components/filter/static';
import { getLoadType } from '@shared/helpers/functions';
import * as fromRawgActions from '../actions/rawg.actions';

export const rawgFeatureKey = 'rawg';

export interface State {
    games: res.Game[];
    browse: res.Browse[];
    genres: res.List[];
    parent_platforms: res.List[] | any;
    platforms: res.List[] | any;
    list: res.List[];
    related_tags: res.Tag[];
    tags: res.Tag[];
    name: string | null;
    tba: boolean | null;
    released: string | null;
    name_original: string | null;
    description_raw: string | null;
    reddit_url: string | null;
    metacritic_url: string | null;
    description: string | null;
    background_image: string | null;
    background_image_additional: string | null;
    seo_description: string | null;
    seo_h1: string | null;
    seo_keywords: string | null;
    website: string | null;
    reviews_count: number | null;
    metacritic: number | null;
    playtime: number | null;
    added: number | null;
    seo_title: string | null;
    filters: res.RawgFilters;
    months: res.Month[];
    ordering: { name: string; id: string }[];
    screenshots: res.ScreenShot[];
    trailers: res.Trailer[];
    stores: res.Store[];
    ratings: res.Rating[];
    developers: res.Developer[] | null;
    publishers: res.Publisher[] | null;
    esrb_rating: res.Esrb_rating | null;
    vendors: res.Vendor[];
    reddit_posts: res.RedditPost[];
    loadNextGamesPage: string | null;
    loadNextPostsPage: string | null;
    loading: string[];
    metacritic_platforms: any[];
    scrollToTop: boolean;
}

export const initialState: State = {
    games: [],
    browse: [],
    genres: [],
    parent_platforms: [],
    platforms: [],
    list: [],
    related_tags: [],
    tags: [],
    months: [],
    background_image: null,
    website: null,
    developers: null,
    reddit_url: null,
    metacritic_url: null,
    publishers: null,
    esrb_rating: null,
    background_image_additional: null,
    name: null,
    metacritic: null,
    playtime: null,
    name_original: null,
    description: null,
    description_raw: null,
    tba: null,
    released: null,
    seo_description: null,
    seo_h1: null,
    added: null,
    seo_keywords: null,
    seo_title: null,
    reviews_count: null,
    filters: { genres: [], parent_platforms: [], stores: [], years: [] },
    ordering: ordering,
    screenshots: [],
    trailers: [],
    vendors: [],
    stores: [],
    ratings: [],
    reddit_posts: [],
    loadNextGamesPage: null,
    loadNextPostsPage: null,
    loading: [],
    metacritic_platforms: [],
    scrollToTop: true,
};

export const reducer = createReducer(
    initialState,
    on(fromRawgActions.loadParentPlatformsSuccess, (state, { results }) => {
        return {
            ...state,
            parent_platforms: results,
        };
    }),
    on(fromRawgActions.loadGenresSuccess, (state, { results }) => {
        return {
            ...state,
            genres: results,
        };
    }),

    on(fromRawgActions.loadGamesSuccess, (state, action) => {
        return {
            ...state,
            games: action.results || [],
            ...action,
            loadNextGamesPage: action.next,
            description: action.description || '',
            seo_description: action.seo_description || '',
            seo_h1: action.seo_h1 || '',
        };
    }),
    on(fromRawgActions.loadBrowseSuccess, (state, { results }) => {
        return {
            ...state,
            browse: results,
        };
    }),
    on(
        fromRawgActions.loadGameDetailsSuccess,
        (
            state,
            { screenshots, trailers, vendors, reddit_posts, loadNextPostsPage }
        ) => {
            return {
                ...state,
                screenshots,
                trailers,
                vendors,
                reddit_posts,
                loadNextPostsPage,
            };
        }
    ),
    /* -------------------------------------------------------------------------- */
    /*                                   LOADERS                                  */
    /* -------------------------------------------------------------------------- */
    on(
        fromRawgActions.loadGames,
        fromRawgActions.loadBrowse,
        fromRawgActions.loadGameDetails,
        fromRawgActions.loadNextPostsPage,
        fromRawgActions.loadNextGamesPage,
        (state, { type }) => ({
            ...state,
            loading: [...state.loading, getLoadType(type)],
        })
    ),
    on(
        fromRawgActions.loadGamesSuccess,
        fromRawgActions.loadGamesFailure,
        fromRawgActions.loadBrowseSuccess,
        fromRawgActions.loadBrowseFailure,
        fromRawgActions.loadGameDetailsSuccess,
        fromRawgActions.loadGameDetailsFailure,
        fromRawgActions.loadNextPostsPageSuccess,
        fromRawgActions.loadNextGamesPageSuccess,
        fromRawgActions.loadNextGamesPageFailure,
        fromRawgActions.loadNextPostsPageFailure,
        (state, action) => {
            const { pageType, type, results } = action;
            const loadType = getLoadType(type);

            if (!pageType)
                return {
                    ...state,
                    loading: state.loading.filter((v) => v !== loadType),
                };

            return {
                ...state,
                loading: state.loading.filter((v) => v !== loadType),
                [pageType]: [...state[pageType as keyof State], ...results],
                [loadType]: action[loadType],
            };
        }
    ),

    /* -------------------------------------------------------------------------- */
    /*                                    MISC                                    */
    /* -------------------------------------------------------------------------- */
    on(fromRawgActions.hideScrollToTop, (state, action) => {
        return { ...state, scrollToTop: action.bool };
    })
);
