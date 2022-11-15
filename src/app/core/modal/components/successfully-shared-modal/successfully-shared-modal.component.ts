import { Component, OnInit } from '@angular/core';
import { ModalService } from "@shared/services/modal/modal.service";

@Component({
  selector: 'app-successfully-shared-modal',
  templateUrl: './successfully-shared-modal.component.html',
  styleUrls: ['./successfully-shared-modal.component.scss']
})
export class SuccessfullySharedModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  handleCloseClick() {
    this.modalService.closeModal();
  }

}
