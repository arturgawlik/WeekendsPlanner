import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WikiInfoResult } from 'src/app/services/mediaWiki/info/models/fetchInfoResult.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather/weather.servie';
import { FetchWeatherResult } from 'src/app/services/weather/models/fetchWeatherResult.model';

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
  weatherIcon = 'fa-sun';

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private weatherService: WeatherService) {
    this.incomePlace = activatedRoute.snapshot.params as WikiInfoResult;
    this.buildForm();
  }

  ngOnInit() {
    this.weatherService.fetchWeater(this.incomePlace.lat, this.incomePlace.lon).subscribe(res => {
        this.fetchedWeathers = res;
        this.weather = this.getCurrentWeather(this.getTommorowDate());
    });
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

  public onDateChage(event: Date) {
    console.log(event);
    if (!this.init) {
      this.weather = this.getCurrentWeather(event);
      this.setIcon();
    }
    this.init = false;
  }

  public getCurrentWeather(date: Date) {
    date.setHours(0, 0, 0, 0);
    return this.fetchedWeathers.find(el => {
      return el.date.getDate() == date.getDate();
    });
  }

  public setIcon() {
    const tmpIcon = this.weather.type;
    if (tmpIcon === 'clear-day' || tmpIcon === 'clear-night') {
      this.weatherIcon = 'fa-sun';
    }
    if (tmpIcon === 'rain') {
      this.weatherIcon = 'fa-cloud-rain';
    }
    if (tmpIcon === 'snow' || tmpIcon === 'sleet') {
      this.weatherIcon = 'fa-snowflake';
    }
    if (tmpIcon === 'cloudy') {
      this.weatherIcon = 'fa-cloud';
    }
    if (tmpIcon === 'partly-cloudy-day' || tmpIcon === 'partly-cloudy-night') {
      this.weatherIcon = 'fa-cloud-sun';
    }
  }

}
