import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ForgotPassword, ClearForgotPassword } from '@store/auth/auth.actions';
import { ModalService } from "@shared/services/modal/modal.service";
import { ModalPath } from '@core/modal/modal-routes.model';
import { shareitEmailValidator } from '@shared/validators/shareit-email.validator';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  @Select(AuthGetterState.isForgotLoading) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.forgotPasswordSuccess) forgotPasswordSuccess$: Observable<boolean>;
  @Select(AuthGetterState.forgotPasswordError) forgotPasswordError$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearForgotPassword());
  }

  get isEmailInvalid(): boolean {
    return this.formGroup.get('email').touched && this.formGroup.get('email').invalid;
  }

  get isSubmitEnabled(): boolean {
    return !this.formGroup.get('email').touched || this.formGroup.valid;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, shareitEmailValidator]],
    });
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.store.dispatch(new ForgotPassword({
        email: this.formGroup.get('email').value
      }));
    }
  }

  handleSignUp() {
    this.modalService.openModal$(ModalPath.SignUp, 'Sign Up');
  }

  handleCloseModal() {
    this.modalService.closeModal();
  }

}
