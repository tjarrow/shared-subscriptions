import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ModalService } from '@shared/services/modal/modal.service';
import { ModalPath } from '@core/modal/modal-routes.model';
import { ShowSupportForm } from '@store/app/app.actions';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  public currentYear: number;

  @Select(AuthGetterState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private modalService: ModalService,
              private store: Store) { }

  ngOnInit(): void {
    this.currentYear = (new Date).getFullYear();
  }

  handleShowSupport(e: MouseEvent) {
    e.preventDefault();
    this.store.dispatch(new ShowSupportForm());
  }

  handleSignInClick(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
  }

  handleSignUpClick(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignUp, 'Sign Up');
  }

}
