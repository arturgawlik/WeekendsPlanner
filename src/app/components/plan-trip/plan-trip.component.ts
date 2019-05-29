import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WikiInfoResult } from 'src/app/services/mediaWiki/info/models/fetchInfoResult.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.component.html',
  styleUrls: ['./plan-trip.component.css']
})
export class PlanTripComponent implements OnInit {

  newTripform: FormGroup;
  incomePlace: WikiInfoResult;
  weather: any;

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
      console.log(activatedRoute.snapshot.params as WikiInfoResult);
      this.incomePlace = activatedRoute.snapshot.params as WikiInfoResult;
      this.buildForm();
    }

ngOnInit() {
}

  private buildForm() {
  this.newTripform = this.fb.group({
    name: [''],
    notes: [''],
    place: [this.incomePlace.title],
    date: [this.getTommorowDate()],
    lat: [this.incomePlace.lat],
    lng: [this.incomePlace.lon]
  });
}

  private getTommorowDate() {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

  public openWiki() {
  window.open(this.incomePlace.fullurl, "_blank");
}

  public onDateChage(event) {
  console.log(event);
}

}
