import { ActionReducerMap } from '@ngrx/store';
import * as upcomingTripsStore from './state/upcomingTrips';

export interface AppState {
    upcomingTrips: upcomingTripsStore.State[],
}

export const initialState: AppState =  {
    upcomingTrips: upcomingTripsStore.initialState
}

export const reducers: ActionReducerMap<AppState> = {
    upcomingTrips: upcomingTripsStore.reducer
}

export const effects: Array<any> = [
    upcomingTripsStore.UpcomingTripsEffects
]
