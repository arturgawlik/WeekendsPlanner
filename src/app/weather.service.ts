import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  currentForecast(lat: number, lng: number): Observable<any> {
    let params = new HttpParams()
    params = params.set('lat', lat.toString() )
    params = params.set('lng', lng.toString() )

    return this.http.get(`https://api.darksky.net/forecast/e29a270953c0c168364fc0e4f6f1b91f/${lat},${lng}`);
  }

}
