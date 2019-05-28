import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WikiInfoResult } from './models/fetchInfoResult.model';

@Injectable()
export class WikiInfoService {

    constructor(private httpClient: HttpClient) {
    }

    fetchInfo(pageIds: number[]): Observable<WikiInfoResult[]> {
        return this.httpClient.jsonp(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Ccoordinates%7Cpageimages%7Cdescription&list=&pageids=${pageIds.join('|')}&inprop=url&piprop=original`, 'callback')
            .pipe(
                tap(n => console.log(n)),
                map((res: any) => {
                    const tab: WikiInfoResult[] = [];
                    Object.keys(res.query.pages).forEach(e => {
                        const tmpObj = res.query.pages[e];
                        tab.push({
                            pageId: tmpObj.pageid,
                            title: tmpObj.title,
                            fullurl: tmpObj.fullurl,
                            lat: tmpObj.coordinates[0].lat,
                            lon: tmpObj.coordinates[0].lon,
                            description: tmpObj.description,
                            imageUrl: tmpObj.original ? tmpObj.original.source : null
                        });
                    });
                    return tab;
                })
            );
    }

}
