import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash-es';
import { rawgFeatureKey, State } from '../reducers/rawg.reducer';

export const selectRawgFeature = createFeatureSelector<State>(rawgFeatureKey);

export const selectTitle = createSelector(
    selectRawgFeature,
    (state: State) => state.seo_h1
);

export const selectBackground = createSelector(
    selectRawgFeature,
    (state: State) => state.background_image_additional
);

export const selectDescription = createSelector(
    selectRawgFeature,
    (state: State) => state.description || state.seo_description
);

export const selectNextGamesPage = createSelector(
    selectRawgFeature,
    (state: State) => state.loadNextGamesPage
);

/* ---------------------------------- CARDS --------------------------------- */

export const selectGames = createSelector(selectRawgFeature, (state: State) => {
    return state.games;
});

export const selectGameDetails = createSelector(
    selectRawgFeature,
    (state: State) => state
);

export const selectBrowse = createSelector(
    selectRawgFeature,
    (state: State) => state.browse
);

/* --------------------------------- FILTERS -------------------------------- */

export const selectPlatformsFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.parent_platforms
);

export const selectGenresFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.genres
);

export const selectYearsFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.filters?.years
);

export const selectOrderFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.ordering
);

export const selectTagsFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.related_tags
);

export const selectMonthsFilter = createSelector(
    selectRawgFeature,
    (state: State) => state.months
);

/* --------------------------------- LOADERS -------------------------------- */

export const selectLoading = (props: string) =>
    createSelector(selectRawgFeature, (state: State): boolean =>
        state.loading.includes(props)
    );

/* ---------------------------------- MISC ---------------------------------- */

export const selectScrollToTop = createSelector(
    selectRawgFeature,
    (state: State) => state.scrollToTop
);

export const selectIsMobile = createSelector(
    selectRawgFeature,
    (state: State) => state.isMobile
);
