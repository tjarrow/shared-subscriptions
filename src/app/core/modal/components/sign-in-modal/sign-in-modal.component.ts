import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Login, ClearLogin } from '@store/auth/auth.actions';
import { ModalService } from "@shared/services/modal/modal.service";
import { ModalPath } from '@core/modal/modal-routes.model';
import { environment } from 'src/environments/environment';
import { shareitEmailValidator } from '@shared/validators/shareit-email.validator';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();

  @Select(AuthGetterState.isLoginLoading) isLoginLoading$: Observable<boolean>;
  @Select(AuthGetterState.loginSuccess) loginSuccess$: Observable<boolean>;
  @Select(AuthGetterState.loginError) loginError$: Observable<any>;
  @Select(AuthGetterState.registerSuccess) registerSuccess$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private window: Window,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.createForm();

    this.loginSuccess$.pipe(takeUntil(this.alive$)).subscribe(isLoginSuccess => {
      if (isLoginSuccess) {
        this.modalService.closeModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearLogin());
  }

  get isSubmitEnabled(): boolean {
    return !this.formGroup.get('email').touched || !this.formGroup.get('password').touched || this.formGroup.valid;
  }

  get isEmailInvalid(): boolean {
    return this.formGroup.get('email').touched && this.formGroup.get('email').invalid;
  }

  get isPasswordInvalid(): boolean {
    return this.formGroup.get('password').touched && this.formGroup.get('password').invalid
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, shareitEmailValidator]],
      password: ['', Validators.required]
    });
  }

  handleResendVerificationEmail(e: MouseEvent) {
    e.preventDefault();
    console.log('Resend Verification Email');
  }

  handleSignInViaGoogle (e: MouseEvent) {
    e.preventDefault();
    this.window.location.assign(`${environment.apiUrl}/auth/google`);
  }

  handleSignInViaFacebook(e: MouseEvent) {
    e.preventDefault();
    this.window.location.assign(`${environment.apiUrl}/auth/facebook`);
  }

  handleForgotPassword(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.ForgotPassword, 'Forgot Password');
  }

  handleSignUp(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignUp, 'Sign Up');
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.store.dispatch(new Login({
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value
      }));
    }
  }
}
