import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CoolPlace } from 'src/app/models/coolplace/coolPlace.model';

@Component({
  selector: 'app-plan-new',
  templateUrl: './plan-new.component.html',
  styleUrls: ['./plan-new.component.css']
})
export class PlanNewComponent implements OnInit {

  coolPlaces: Array<CoolPlace> = new Array();
  lat: number;
  lng: number;
  modalRef: BsModalRef;

  modalConfig: ModalOptions = {
    class: 'modal-lg'
  }

  constructor(private modalService: BsModalService) {
    for (let index = 0; index < 1; index++) {
      this.coolPlaces.push({
        name: 'Bar pod kotem',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        showMoreAboutPlaceUrl: 'http://wikop.ru/',
        weatherIcon: 'sun',
        weatherDegrees: 28,
        showMoreAboutWeatherUrl: 'http://wikop.ru/'
      });
    }
  }

  ngOnInit() {
  }

  mapClicked(event: any, modalRef: TemplateRef<any>) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.modalRef = this.modalService.show(modalRef, this.modalConfig);
  }

}
