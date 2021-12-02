import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRawg from './reducers/rawg.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface Appstate {
  [fromRawg.rawgFeatureKey]: fromRawg.State;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<Appstate> = {
  [fromRawg.rawgFeatureKey]: fromRawg.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<Appstate>[] = !environment.production
  ? []
  : [];
