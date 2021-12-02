import {
  Browse,
  Game,
  List,
  Res,
  ScreenShot,
  Trailer,
} from '@core/interfaces/res';
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
  props<{ message: string }>()
);

/* ------------------------------- LOAD GENRES ------------------------------ */

export const loadGenres = createAction('[Header Component] Load Genres');

export const loadGenresSuccess = createAction(
  '[Header Component] Load Genres Success',
  (data: Res<List>) => data
);

export const loadGenresFailure = createAction(
  '[Header Component] Load Genres Failure',
  props<{ message: string }>()
);

/* ------------------------------- LOAD GAMES ------------------------------- */

export const loadGamesSuccess = createAction(
  '[Header Component] Load Games Success',
  (data: Res<Game>) => data
);

export const loadGamesFailure = createAction(
  '[Header Component] Load Games Failure',
  props<{ message: string }>()
);

/* ------------------------------- LOAD BROWSE ------------------------------- */

export const loadBrowseSuccess = createAction(
  '[Browser Page] Load Browse Success',

  (data: Res<Browse>) => data
);

export const loadBrowseFailure = createAction(
  '[Browser Page] Load Browse Failure',
  props<{ message: string }>()
);

/* ---------------------------- LOAD GAME DETAILS --------------------------- */

export const loadGameDetailsSuccess = createAction(
  '[Header Component] Load Game Details Success',
  (data: { screenshots: ScreenShot[]; trailers: Trailer[] }) => data
);

export const loadGameDetailsFailure = createAction(
  '[Header Component] Load Game Details Failure',
  props<{ message: string }>()
);
