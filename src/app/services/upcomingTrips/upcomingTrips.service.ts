import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Trip } from 'src/app/models/dbModels/trip.model';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class UpcomingTripsService {

    constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    }

    // fetchOld(): Observable<UpcomingTrip[]> {
    //     return this.db.collection<UpcomingTrip>('trips')
    //         .valueChanges()
    //         .pipe(
    //             switchMap(v => {
    //                 return this.auth.user.pipe(
    //                     map(u => u.uid),
    //                 )
    //             }),
    //             map((v: UpcomingTrip[]) => {
    //                 return v.sort((a, b) => {
    //                     return a.date - b.date;
    //                 }).filter(v => v.date > new Date().getTime())
    //             })
    //         );
    // }

    fetch(): Observable<UpcomingTrip[]> {
        return this.auth.user.pipe(
            switchMap(u => {
                return this.db.collection<UpcomingTrip>('trips')
                    .valueChanges().pipe(
                        map(v => {
                            return v.sort((a, b) => {
                                return a.date - b.date;
                            }).filter(v => v.uId === u.uid && v.date > new Date().getTime())
                        })
                    )
            })
        )
    }

}
