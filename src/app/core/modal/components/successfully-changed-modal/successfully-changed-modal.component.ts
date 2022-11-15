import { Component, OnInit } from '@angular/core';
import { ModalService } from "@shared/services/modal/modal.service";

@Component({
  selector: 'app-successfully-changed-modal',
  templateUrl: './successfully-changed-modal.component.html',
  styleUrls: ['./successfully-changed-modal.component.scss']
})
export class SuccessfullyChangedModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  handleCloseClick() {
    this.modalService.closeModal();
  }

}
