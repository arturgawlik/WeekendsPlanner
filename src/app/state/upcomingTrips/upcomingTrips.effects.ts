import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UpcomingTripsService } from 'src/app/services/upcomingTrips/upcomingTrips.service';
import { UpcomingTripsActions, FetchData, FetchComplete } from './upcomingTrips.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class UpcomingTripsEffects {

    constructor(private action$: Actions, private upcomingTripsService: UpcomingTripsService) {
    }

    @Effect()
    public initiateFetch$ = this.action$.pipe(
        ofType(UpcomingTripsActions.InitiateFetch),
        switchMap((action: FetchData) => {
          return this.upcomingTripsService.fetch().pipe(
            map(res => {
              return new FetchComplete(res);
            }),
            // catchError(err => EMPTY)
            catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
          );
        })
    );

}
