import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RawgService } from '@core/services/rawg.service';
import * as fromRawgActions from '../actions/rawg.actions';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/custom-route-serializer';
import { getLoadType } from '@shared/helpers/functions';

@Injectable()
export class RawgEffects {
    loadParentPlatforms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromRawgActions.loadParentPlatforms),
            mergeMap(() =>
                this.rawgService.getParentPlatforms().pipe(
                    map((data) =>
                        fromRawgActions.loadParentPlatformsSuccess(data)
                    ),
                    catchError(({ error }) => {
                        return of(
                            fromRawgActions.loadParentPlatformsFailure(error)
                        );
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
            filter((r: RouterNavigationAction<RouterStateUrl>) => {
                return (
                    r.payload.routerState.url.startsWith('/games') ||
                    r.payload.routerState.url === '/'
                );
            }),
            switchMap((q: RouterNavigationAction<RouterStateUrl>) => {
                return this.rawgService.getGames(q.payload.routerState).pipe(
                    map((data) => {
                        return fromRawgActions.loadGamesSuccess(data);
                    }),
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
            filter((r: RouterNavigationAction<RouterStateUrl>) => {
                return r.payload.routerState.params.hasOwnProperty('details');
            }),
            switchMap((q: RouterNavigationAction<RouterStateUrl>) => {
                return this.rawgService
                    .getGameDetails(q.payload.routerState)
                    .pipe(
                        map((data) => {
                            return fromRawgActions.loadGameDetailsSuccess(data);
                        }),
                        catchError(({ error }) => {
                            return of(
                                fromRawgActions.loadGameDetailsFailure(error)
                            );
                        })
                    );
            })
        );
    });

    loadBrowse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigationAction<RouterStateUrl>) => {
                return r.payload.routerState.url.startsWith('/browse');
            }),
            switchMap((q: RouterNavigationAction<RouterStateUrl>) => {
                return this.rawgService.getBrowse(q.payload.routerState).pipe(
                    map((data) => fromRawgActions.loadBrowseSuccess(data)),
                    catchError(({ error }) => {
                        return of(fromRawgActions.loadBrowseFailure(error));
                    })
                );
            })
        );
    });

    loadNextPage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                fromRawgActions.loadNextPostsPage,
                fromRawgActions.loadNextGamesPage
            ),
            mergeMap((q: any) => {
                const loadType = getLoadType(q.type);

                interface Next {
                    loadNextPostsPage: Function;
                    loadNextGamesPage: Function;
                }

                const success: Next = {
                    loadNextPostsPage: fromRawgActions.loadNextPostsPageSuccess,
                    loadNextGamesPage: fromRawgActions.loadNextGamesPageSuccess,
                };

                const failure: Next = {
                    loadNextPostsPage: fromRawgActions.loadNextPostsPageFailure,
                    loadNextGamesPage: fromRawgActions.loadNextGamesPageFailure,
                };

                return this.rawgService.getNextPage({ ...q, loadType }).pipe(
                    map((data) => success[loadType as keyof Next](data)),
                    catchError(({ error }) => {
                        return of(failure[loadType as keyof Next](error));
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private rawgService: RawgService) {}
}
