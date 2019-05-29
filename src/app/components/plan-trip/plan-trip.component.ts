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

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    console.log(activatedRoute.snapshot.params as WikiInfoResult);
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.newTripform = this.fb.group({
      name: [''],
      notes: [''],
      place: [''],
      date: ['']
    });
  }

}
