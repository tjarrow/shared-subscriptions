import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '@store/auth/auth.actions';
import { ModalService } from '@shared/services/modal/modal.service';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.scss']
})
export class SignOutModalComponent implements OnInit {

  constructor(private store: Store,
              private modalService: ModalService,) { }

  ngOnInit(): void {
  }

  handleCancel(e: MouseEvent) {
    e.preventDefault();
    this.modalService.closeModal();
  }

  handleSignOut(e: MouseEvent) {
    e.preventDefault();
    this.store.dispatch(new Logout());
    this.modalService.closeModal();
  }

}
