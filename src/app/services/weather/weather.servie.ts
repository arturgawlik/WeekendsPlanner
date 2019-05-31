import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FetchWeatherResult } from './models/fetchWeatherResult.model';

@Injectable()
export class WeatherService {

    constructor(private httpClient: HttpClient) {
    }

    fetchWeater(lat: number, lon: number): Observable<FetchWeatherResult[]> {
        return this.httpClient.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e29a270953c0c168364fc0e4f6f1b91f/${lat},${lon}?extend=daily&exclude=hourly|currently&units=si`)
            .pipe(
                tap(n => console.log(n)),
                map((val: any) => {
                    return (val.daily.data as any[]).map(val => {
                        console.log(val);
                        const tmpDate = new Date(val.time * 1000);
                        tmpDate.setHours(0, 0, 0, 0);
                        return new FetchWeatherResult(tmpDate, val.icon, Math.floor(val.temperatureHigh), Math.floor(val.temperatureLow));
                    })
                })
            );
    }

}
