import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchPlacesResult } from './models/fetchPlacesResult.model';

@Injectable()
export class GeoDataService {

    constructor(private httpClient: HttpClient) {
    }

    fetchPlaces(lat: number, lon: number, radius: number = 10000): Observable<FetchPlacesResult[]> {
        return this.httpClient.get(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=${radius}&gscoord=${lat}|${lon}&format=json`)
            .pipe(
                map((res: any) => {
                    return (res.query.geosearch as any[])
                        .map(val => new FetchPlacesResult(val.pageId, val.title, val.lat, val.lon));
                })
            );
    }

}
