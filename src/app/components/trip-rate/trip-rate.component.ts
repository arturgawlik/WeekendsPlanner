import { Component, OnInit } from '@angular/core';
import { TravelsService } from 'src/app/services/travels/travels.service';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/dbModels/trip.model';
import { map } from 'rxjs/internal/operators/map';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-trip-rate',
  templateUrl: './trip-rate.component.html',
  styleUrls: ['./trip-rate.component.css']
})
export class TripRateComponent implements OnInit {

  previousTravels$: Observable<Trip[]>;

  constructor(private travelsService: TravelsService, private db: AngularFirestore) {
    const tempCurrentTime = new Date().getTime();
    this.previousTravels$ = this.travelsService.fetch()
      .pipe(
        map(ta => ta.filter(t => t.date < tempCurrentTime).sort((a, b) => a.date - b.date))
      );
  }

  ngOnInit() {
  }

  starChanged(id: string, rate: number) {
    return this.db.collection<any>('trips').doc(id).update({rate});
  }

}
