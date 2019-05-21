import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plan-new',
  templateUrl: './plan-new.component.html',
  styleUrls: ['./plan-new.component.css']
})
export class PlanNewComponent implements OnInit {

  places: Array<number> = new Array();
  lat: number;
  lng: number;
  modalRef: BsModalRef;

  modalConfig: ModalOptions = {
    class: 'modal-lg'
  }

  constructor(private modalService: BsModalService) {
    // for (let index = 0; index < 1; index++) {
    //   this.places.push(0);
    // }
  }

  ngOnInit() {
  }

  mapClicked(event: any, modalRef: TemplateRef<any>) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.modalRef = this.modalService.show(modalRef, this.modalConfig);
  }

}
