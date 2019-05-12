import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UpcomingTripsService } from 'src/app/services/upcomingTrips/upcomingTrips.service';
import { UpcomingTripsActions, InitiateFetch, FetchComplete } from './upcomingTrips.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UpcomingTripsEffects {

    constructor(private action$: Actions, private upcomingTripsService: UpcomingTripsService) {
    }

    @Effect()
    public initiateFetch$ = this.action$.pipe(
        ofType(UpcomingTripsActions.InitiateFetch),
        switchMap((action: InitiateFetch) => {
          return this.upcomingTripsService.fetch().pipe(
            map(res => {
              return new FetchComplete(res);
            })
          );
        })
    );

}
