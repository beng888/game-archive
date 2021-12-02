import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RawgService } from '@core/services/rawg.service';
import * as fromRawgActions from '../actions/rawg.actions';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/custom-route-serializer';

@Injectable()
export class RawgEffects {
  loadParentPlatforms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRawgActions.loadParentPlatforms),
      mergeMap(() =>
        this.rawgService.getParentPlatforms().pipe(
          map((data) => fromRawgActions.loadParentPlatformsSuccess(data)),
          catchError(({ error }) => {
            return of(fromRawgActions.loadParentPlatformsFailure(error));
          })
        )
      )
    );
  });

  loadGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRawgActions.loadGenres),
      mergeMap(() =>
        this.rawgService.getGenres().pipe(
          map((data) => fromRawgActions.loadGenresSuccess(data)),
          catchError(({ error }) => {
            return of(fromRawgActions.loadGenresFailure(error));
          })
        )
      )
    );
  });

  loadGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction<RouterStateUrl>) => {
        return (
          r.payload.routerState.url.startsWith('/games') ||
          r.payload.routerState.url === '/'
        );
      }),
      map((r: RouterNavigatedAction<RouterStateUrl>) => {
        return r.payload.routerState;
      }),
      switchMap((q) => {
        return this.rawgService.getGames(q).pipe(
          map((data) => fromRawgActions.loadGamesSuccess(data)),
          catchError(({ error }) => {
            return of(fromRawgActions.loadGamesFailure(error));
          })
        );
      })
    );
  });

  loadGameDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction<RouterStateUrl>) => {
        // console.log(r.payload.routerState.params.details);
        return r.payload.routerState.params.details;
      }),
      switchMap((q: RouterNavigatedAction<RouterStateUrl>) => {
        return this.rawgService
          .getGameDetails(q.payload.routerState.params.details)
          .pipe(
            map((data) => {
              return fromRawgActions.loadGameDetailsSuccess(data);
            }),
            catchError(({ error }) => {
              return of(fromRawgActions.loadGameDetailsFailure(error));
            })
          );
      })
    );
  });

  loadBrowse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction<RouterStateUrl>) => {
        return r.payload.routerState.url.startsWith('/browse');
      }),
      map((r: RouterNavigatedAction<RouterStateUrl>) => {
        return r.payload.routerState;
      }),
      switchMap((q) => {
        return this.rawgService.getBrowse(q).pipe(
          map((data) => fromRawgActions.loadBrowseSuccess(data)),
          catchError(({ error }) => {
            return of(fromRawgActions.loadGamesFailure(error));
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private rawgService: RawgService) {}
}
