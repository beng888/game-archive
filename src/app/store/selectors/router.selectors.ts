import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/custom-route-serializer';

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectCurrentRoute = createSelector(getRouterState, (router) => {
  return router?.state;
});
