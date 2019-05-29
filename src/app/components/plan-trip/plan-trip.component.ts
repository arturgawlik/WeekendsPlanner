import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WikiInfoResult } from 'src/app/services/mediaWiki/info/models/fetchInfoResult.model';

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.component.html',
  styleUrls: ['./plan-trip.component.css']
})
export class PlanTripComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.params as WikiInfoResult);
  }

  ngOnInit() {
  }

}
