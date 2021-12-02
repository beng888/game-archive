import { createFeatureSelector, createSelector } from '@ngrx/store';
import { rawgFeatureKey, State } from '../reducers/rawg.reducer';

export const selectRawgFeature = createFeatureSelector<State>(rawgFeatureKey);

/* ---------------------------------- CARDS --------------------------------- */

export const selectGames = createSelector(
  selectRawgFeature,
  (state: State) => state.games
);

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
