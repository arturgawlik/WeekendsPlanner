import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FetchData, UpcomingTripsActions } from 'src/app/state/upcomingTrips';
import { UpcomingTrip } from 'src/app/models/upcomingTrip/upcomingTrip.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sideBarOptions = [
    { name: 'Dashboard', icon: 'home', routerLink: '/home' },
    { name: 'Travels', icon: 'map', routerLink: '/travels' },
  ];

  upcomingTrips$: Observable<UpcomingTrip[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.upcomingTrips$ = this.store.pipe(
      select('upcomingTrips'),
      map((state: AppState) => state.upcomingTrips)
    );
    this.store.dispatch(new FetchData());
  }

}
