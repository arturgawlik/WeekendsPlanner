import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FetchPlacesResult } from './models/fetchPlacesResult.model';

@Injectable()
export class GeoDataService {

    constructor(private httpClient: HttpClient) {
    }

    fetchPlaces(lat: number, lon: number, radius: number = 10000): Observable<FetchPlacesResult[]> {
        return this.httpClient.jsonp(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=${radius}&gscoord=${lat}|${lon}&format=json&prop=description`, 'callback')
            .pipe(
                tap(n => console.log(n)),
                map((res: any) => {
                    return (res.query.geosearch as any[])
                        .map(val => new FetchPlacesResult(val.pageid, val.title, val.lat, val.lon));
                })
            );
    }

}
