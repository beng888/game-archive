import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AlertService } from '@full-fledged/alerts';
import * as fromRawgActions from '../actions/rawg.actions';

@Injectable()
export class AlertEffects {
  // showAlerts(): void {
  //   this.alertService.info('this is an info alert');
  //   this.alertService.danger('this is a danger alert');
  //   this.alertService.success('this is a success alert');
  //   this.alertService.warning('this is a warning alert');
  // }

  LoadingFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromRawgActions.loadParentPlatformsFailure,
          fromRawgActions.loadGenresFailure,
          fromRawgActions.loadGamesFailure,
          fromRawgActions.loadBrowseFailure,
          fromRawgActions.loadGameDetailsFailure
        ),
        tap((action) => this.alertService.danger(action.message))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private alertService: AlertService) {}
}
