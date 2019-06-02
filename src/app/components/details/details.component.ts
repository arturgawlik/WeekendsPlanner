import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Trip } from 'src/app/models/dbModels/trip.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  newTripform: FormGroup;

  trip: Trip;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.trip = activatedRoute.snapshot.params as Trip;
    console.log(this.trip.name);
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.newTripform = this.fb.group({
      name: [this.trip.name],
      notes: [this.trip.notes],
      place: [this.trip.place],
      date: [new Date(this.trip.date*1).toLocaleDateString()],
      weatherType: [],
      minTemp: [this.trip.minTemp],
      maxTemp: [this.trip.maxTemp]
    });
  }

  private getTommorowDate() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }

  public openWiki() {
    window.open(this.trip.fullUrl, "_blank");
  }

  get inputName(): AbstractControl {
    return this.newTripform.get('name');
  }

  get minTemp(): AbstractControl {
    return this.newTripform.get('minTemp');
  }

  get maxTemp(): AbstractControl {
    return this.newTripform.get('maxTemp');
  }

  get weatherType(): AbstractControl {
    return this.newTripform.get('weatherType');
  }

}
