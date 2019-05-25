import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CoolPlace } from 'src/app/models/coolplace/coolPlace.model';
import { GeoDataService } from 'src/app/services/mediaWiki/geoData/geoData.service';
import { Observable } from 'rxjs';
import { FetchPlacesResult } from 'src/app/services/mediaWiki/geoData/models/fetchPlacesResult.model';

@Component({
  selector: 'app-plan-new',
  templateUrl: './plan-new.component.html',
  styleUrls: ['./plan-new.component.css']
})
export class PlanNewComponent implements OnInit {

  coolPlaces: Observable<Array<FetchPlacesResult>>
  initLat: number = 50.05118481052026;
  initLng: number = 19.942988800422427;
  lat: number;
  lng: number;
  modalRef: BsModalRef;

  modalConfig: ModalOptions = {
    class: 'modal-lg'
  }

  constructor(private modalService: BsModalService, private geoDataService: GeoDataService) {
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
    this.coolPlaces = this.geoDataService.fetchPlaces(event.coords.lat, event.coords.lng);
  }

}
