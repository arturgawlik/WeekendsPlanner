import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class WeatherService {

    constructor(private httpClient: HttpClient) {
    }

    fetchWeater(lat: number, lon: number): Observable<FetchWeatherResult[]> {
        return this.httpClient.get(`https://api.darksky.net/forecast/e29a270953c0c168364fc0e4f6f1b91f/${lat},${lon}`)
            .pipe(
                tap(n => console.log(n)),
                map((res: any) => {
                    return (res.query.geosearch as any[])
                        .map(val => new FetchPlacesResult(val.pageid, val.title, val.lat, val.lon));
                })
            );
    }

}
