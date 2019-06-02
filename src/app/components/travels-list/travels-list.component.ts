import { Component, OnInit } from '@angular/core';
import { TravelsService } from 'src/app/services/travels/travels.service';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/dbModels/trip.model';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-travels-list',
  templateUrl: './travels-list.component.html',
  styleUrls: ['./travels-list.component.css']
})
export class TravelsListComponent implements OnInit {

  upcomingTravels$: Observable<Trip[]>;
  previousTravels$: Observable<Trip[]>;

  constructor(private travelsService: TravelsService, private router: Router, private db: AngularFirestore) {
    const tempCurrentTime = new Date().getTime();
    this.previousTravels$ = this.travelsService.fetch()
      .pipe(
        map(ta => ta.filter(t => t.date < tempCurrentTime).sort((a, b) => a.date - b.date))
      );
    this.upcomingTravels$ = this.travelsService.fetch()
      .pipe(
        map(ta => ta.filter(t => t.date >= tempCurrentTime).sort((a, b) => a.date - b.date))
      );
  }

  ngOnInit() {
  }

  goToDetails(item: Trip) {
    this.router.navigate(['/details', item]);
  }

  removeTrip(id: string) {
    console.log('remove ' + id);
    this.db
       .collection("trips")
       .doc(id)
       .delete()
       .then(s => {
         console.log(s);
       })
       .catch(err => {
         console.log(err);
       });
  }

}
