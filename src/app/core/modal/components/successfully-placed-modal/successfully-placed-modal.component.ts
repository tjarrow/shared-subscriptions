import { Component, OnInit } from '@angular/core';
import { ModalService } from "@shared/services/modal/modal.service";

@Component({
  selector: 'app-successfully-placed-modal',
  templateUrl: './successfully-placed-modal.component.html',
  styleUrls: ['./successfully-placed-modal.component.scss']
})
export class SuccessfullyPlacedModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  handleCloseClick() {
    this.modalService.closeModal();
  }

}
