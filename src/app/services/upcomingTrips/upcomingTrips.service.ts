import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';


@Injectable()
export class UpcomingTripsService {

    constructor() {
    }

    fetch(): Observable<UpcomingTrip[]> {
        //TODO: fetch data from firebase
        return of([
            { name: 'Radom', icon: 'sun', degrees: 25 },
            { name: 'Sosnowiec', icon: 'cloud-drizzle', degrees: 12 },
            { name: 'Białystok', icon: 'cloud-snow', degrees: -4 },
        ]);
    }

}
