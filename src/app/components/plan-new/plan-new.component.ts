import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CoolPlace } from 'src/app/models/coolplace/coolPlace.model';
import { GeoDataService } from 'src/app/services/mediaWiki/geoData/geoData.service';
import { Observable } from 'rxjs';
import { FetchPlacesResult } from 'src/app/services/mediaWiki/geoData/models/fetchPlacesResult.model';
import { WikiInfoService } from 'src/app/services/mediaWiki/info/wikiInfo.service';
import { switchMap, flatMap, mergeMap, map } from 'rxjs/operators';
import { WikiInfoResult } from 'src/app/services/mediaWiki/info/models/fetchInfoResult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-new',
  templateUrl: './plan-new.component.html',
  styleUrls: ['./plan-new.component.css']
})
export class PlanNewComponent implements OnInit {

  coolPlaces: Observable<Array<WikiInfoResult>>
  initLat: number = 50.05118481052026;
  initLng: number = 19.942988800422427;
  lat: number;
  lng: number;
  modalRef: BsModalRef;

  modalConfig: ModalOptions = {
    class: 'modal-lg'
  }

  constructor(private modalService: BsModalService, private geoDataService: GeoDataService,
   private wikiInfoService: WikiInfoService, private router: Router
   ) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(s => {
        this.initLat = s.coords.latitude;
        this.initLng = s.coords.longitude;
      }, err => {
        console.log(err);
      });
    }
  }

  mapClicked(event: any, modalRef: TemplateRef<any>) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.modalRef = this.modalService.show(modalRef, this.modalConfig);
    this.coolPlaces = this.geoDataService.fetchPlaces(event.coords.lat, event.coords.lng).pipe(
      map(v => v.map(v2 => v2.pageId)),
      mergeMap(val => this.wikiInfoService.fetchInfo(val))
    );
  }

  planTrip(item: WikiInfoResult) {
    this.router.navigate(['/plan-trip', item]);
    this.modalRef.hide();
  } 

}
