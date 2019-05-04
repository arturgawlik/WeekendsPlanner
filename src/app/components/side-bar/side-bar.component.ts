import { Component, OnInit } from '@angular/core';

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

  upcomingTrips = [
    { name: 'Radom', icon: 'sun', degrees: 25 },
    { name: 'Sosnowiec', icon: 'cloud-drizzle', degrees: 12 },
    { name: 'Białystok', icon: 'cloud-snow', degrees: -4 },
  ];

  constructor() { }

  ngOnInit() {
  }

  addTrip() {
    console.log('add trip');
  }

}
