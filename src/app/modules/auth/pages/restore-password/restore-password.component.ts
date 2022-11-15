import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { RestorePassword, RestorePasswordClear } from '@store/auth/auth.actions';
import { NotifyUser } from '@store/app/app.actions';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { passwordValidator } from '@shared/validators/password.validator';
import { ModalService } from "@shared/services/modal/modal.service";
import { ModalPath } from '@core/modal/modal-routes.model';
import { takeUntil } from 'rxjs/operators';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {
  public userEmail: string;
  public userRestoreCode: string;
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();

  @Select(AuthGetterState.isRestoreLoading) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.restorePasswordSuccess) restorePasswordSuccess$: Observable<boolean>;
  @Select(AuthGetterState.restorePasswordError) restorePasswordError$: Observable<any>;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.queryParams['email'];
    this.userRestoreCode = this.route.snapshot.queryParams['code'];

    if (this.userEmail && this.userRestoreCode) {
      this.initRestorePasswordForm();
    } else {
      this.router.navigate(['/']);
    }

    this.restorePasswordSuccess$.pipe(takeUntil(this.alive$)).subscribe(isSuccesfulyChanged => {
      if (isSuccesfulyChanged) {
        this.router.navigate(['/']);
        this.store.dispatch(new NotifyUser({
          message: 'The password was successfully changed!',
          icon: 'check-rounded',
          willCloseAfter: 3500,
        }));
        setTimeout(() => {
          this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
        }, 200);
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new RestorePasswordClear());
  }

  get isPasswordConfirmationInvalid(): boolean {
    return this.formGroup.get('passwordConfirmation').touched && this.formGroup.hasError('passwordError');
  }

  get isSubmitEnabled(): boolean {
    return !this.formGroup.get('password').touched
      || (this.formGroup.valid);
  }

  initRestorePasswordForm() {
    this.formGroup = this.formBuilder.group({
      email: [this.userEmail],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirmation: ['', Validators.required],
    }, { validators: this.passwordConfirmationValidator });
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.store.dispatch(new RestorePassword({
        password: this.formGroup.get('password').value,
        code: this.userRestoreCode
      }));
    }
  }

  handleChangingPasswordVisability(isPasswordVisible: boolean | null) {
    if (!isPasswordVisible) {
      this.formGroup.addControl('passwordConfirmation', new FormControl('', Validators.required,))
    } else {
      this.formGroup.removeControl('passwordConfirmation');
    }
  }

  passwordConfirmationValidator(formGroup: FormGroup): ValidationErrors {
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('passwordConfirmation');
    if (!repeatPassword) return null;
    return password.value != repeatPassword.value ? { 'passwordError': true } : null;
  }

  handleOpenForgotPassword(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.ForgotPassword, 'Resend recovery link');
  }

}
