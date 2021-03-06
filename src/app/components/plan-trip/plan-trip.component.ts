import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WikiInfoResult } from 'src/app/services/mediaWiki/info/models/fetchInfoResult.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FetchWeatherResult } from 'src/app/services/weather/models/fetchWeatherResult.model';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Trip } from 'src/app/models/dbModels/trip.model';

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.component.html',
  styleUrls: ['./plan-trip.component.css']
})
export class PlanTripComponent implements OnInit {

  newTripform: FormGroup;
  incomePlace: WikiInfoResult;
  fetchedWeathers: FetchWeatherResult[];
  weather: FetchWeatherResult;
  init = true;
  uId: string;

  // flags
  savingInProggress = false;
  savingError = false;
  savingSuccess = false;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private weatherService: WeatherService, private db: AngularFirestore, private auth: AngularFireAuth) {
    this.incomePlace = activatedRoute.snapshot.params as WikiInfoResult;
    auth.user.subscribe(u => {
      this.uId = u.uid;
      this.buildForm();
    });
  }

  ngOnInit() {
    this.weatherService.fetchWeater(this.incomePlace.lat, this.incomePlace.lon).subscribe(res => {
      this.fetchedWeathers = res;
      this.weather = this.getCurrentWeather(this.getTommorowDate());
    });
  }

  private buildForm() {
    this.newTripform = this.fb.group({
      uId: [this.uId],
      name: ['', Validators.required],
      notes: [''],
      place: [this.incomePlace.title],
      date: [this.getTommorowDate(), Validators.required],
      lat: [this.incomePlace.lat],
      lng: [this.incomePlace.lon],
      weatherType: [],
      minTemp: [],
      maxTemp: [],
      fullUrl: [this.incomePlace.fullurl]
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

  public onDateChage(event: Date) {
    console.log(event);
    if (!this.init) {
      this.weather = this.getCurrentWeather(event);
    }
    this.init = false;
  }

  public getCurrentWeather(date: Date) {
    date.setHours(0, 0, 0, 0);
    const res = this.fetchedWeathers.find(el => {
      return el.date.getDate() == date.getDate();
    });
    if (res) {
      this.minTemp.setValue(res.temperatureLow);
      this.maxTemp.setValue(res.temperatureHigh);
      this.weatherType.setValue(res.type);
    } else {
      this.minTemp.setValue(null);
      this.maxTemp.setValue(null);
      this.weatherType.setValue(null);
    }

    return res;
  }

  public saveForm() {
    if (this.newTripform.valid) {
      this.db.collection('trips').add({
        uId: this.newTripform.value.uId,
        name: this.newTripform.value.name,
        place: this.newTripform.value.place,
        date: (this.newTripform.value.date as Date).getTime(),
        notes: this.newTripform.value.notes,
        lat: this.newTripform.value.lat,
        lng: this.newTripform.value.lng,
        weatherType: this.newTripform.value.weatherType,
        minTemp: this.newTripform.value.minTemp,
        maxTemp: this.newTripform.value.maxTemp,
        fullUrl: this.newTripform.value.fullUrl
      }).then(val => {
        this.restartFlags();
        this.savingSuccess = true;
        console.log(val);
      }).catch(err => {
        this.restartFlags();
        this.savingError = true;
        console.log(err);
      });
      this.restartFlags();
      this.savingInProggress = true;
    } else {
      this.inputName.markAsTouched();
    }
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

  restartFlags() {
    this.savingInProggress = false;
    this.savingError = false;
    this.savingSuccess = false;
  }

}
