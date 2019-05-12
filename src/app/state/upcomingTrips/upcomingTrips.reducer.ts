import { UpcomingTripsActions, UpcomingTripAction } from './upcomingTrips.actions';


export function reducer(state: any, action: UpcomingTripAction) {
    switch(action.type) {
        case UpcomingTripsActions.FetchComplete: {
            return {
                ...state,
                upcomingTrips: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
