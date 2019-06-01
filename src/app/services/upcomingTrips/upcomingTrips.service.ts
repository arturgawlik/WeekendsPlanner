import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Trip } from 'src/app/models/dbModels/trip.model';


@Injectable()
export class UpcomingTripsService {

    constructor(private db: AngularFirestore) {
    }

    fetch(): Observable<UpcomingTrip[]> {
        //TODO: fetch data from firebase
        return of([
            { name: 'Radom', icon: 'sun', degrees: 25 },
            { name: 'Sosnowiec', icon: 'cloud-drizzle', degrees: 12 },
            { name: 'Białystok', icon: 'cloud-snow', degrees: -4 },
        ]);
        // return this.db.collection('trips').get(null).pipe(
        //     map((v: QuerySnapshot<Trip>) => {
        //         const items = v.docs;
        //         return items.
        //     });
        // );
    }

}
