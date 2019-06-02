import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/dbModels/trip.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class TravelsService {

    constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    }

    fetch(): Observable<Trip[]> {
        return this.auth.user.pipe(
            switchMap(u => {
                return this.db.collection<Trip>('trips')
                    .valueChanges();
            })
        )
    }

}
