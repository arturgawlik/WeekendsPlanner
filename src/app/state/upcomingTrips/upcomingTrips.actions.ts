import { Action } from '@ngrx/store';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';

export enum UpcomingTripsActions {
    InitiateFetch = 'Initiate Fetch UpcomingTrips',
    FetchComplete = 'Fetch Complete UpcomingTrips',
}

export class FetchData implements Action {
    readonly type = UpcomingTripsActions.InitiateFetch;
}

export class FetchComplete implements Action {
    readonly type = UpcomingTripsActions.FetchComplete;

    constructor(public payload: UpcomingTrip[]) {
    }

}

export type UpcomingTripAction = FetchData | FetchComplete;
