import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'local-forecast',
  templateUrl: './local-forecast.component.html',
  styleUrls: ['./local-forecast.component.css']
})
export class LocalForecastComponent implements OnInit {

  lat: number;
  lng: number;
  forecast: Observable<any>;

  constructor(private weather: WeatherService) { }
  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      /// default coords
      this.lat = 50.05118481052026;
      this.lng = 19.942988800422427;
    }
  }

  getForecast() {
    this.forecast = this.weather.fetchWeater(this.lat, this.lng)
      .pipe(
        tap(data => console.log(data))
      );
  }

  weatherIcon(icon) {
    switch (icon) {
      case 'clear-night':
        return 'wi wi-night-clear';
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy'
      case 'cloudy':
        return 'wi wi-cloudy';
      case 'fog':
        return 'wi wi-fog';
      case 'rain':
        return 'wi wi-rain';
      case 'wind':
        return 'wi wi-day-windy';
      case 'snow':
        return 'wi wi-snow';
      case 'clear-day':
        return 'wi wi-day-sunny'
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy'
      default:
        return `wi wi-day-sunny`
    }
  }

}
