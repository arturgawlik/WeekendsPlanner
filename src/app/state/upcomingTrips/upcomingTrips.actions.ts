import { Action } from '@ngrx/store';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';

export enum UpcomingTripsActions {
    InitiateFetch = 'Initiate Fetch UpcomingTrips',
    FetchComplete = 'Fetch Complete UpcomingTrips',
}

export class InitiateFetch implements Action {
    readonly type = UpcomingTripsActions.InitiateFetch;
}

export class FetchComplete implements Action {
    readonly type = UpcomingTripsActions.FetchComplete;

    constructor(public payload: UpcomingTrip[]) {
    }

}

export type UpcomingTripAction = InitiateFetch | FetchComplete;
