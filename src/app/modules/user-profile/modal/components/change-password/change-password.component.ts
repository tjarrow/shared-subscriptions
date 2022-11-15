import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { passwordValidator } from '@shared/validators/password.validator';
import { ModalService } from "@shared/services/modal/modal.service";
import { Store, Select } from '@ngxs/store';
import { ChangePassword, ClearChangePassword } from '@store/auth/auth.actions';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();

  @Select(AuthGetterState.isChangePasswordLoading) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.changePasswordSuccess) changePasswordSuccess$: Observable<boolean>;
  @Select(AuthGetterState.changePasswordError) changePasswordError$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private modalService: ModalService,
              private store: Store) { }

  ngOnInit(): void {
    this.createForm();
    this.awaitSuccessChanging();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearChangePassword());
  }

  get isOldPasswordInvalid() {
    return this.formGroup.get('oldPassword').touched && this.formGroup.get('oldPassword').invalid;
  }

  get isPasswordConfirmationInvalid() {
    return this.formGroup.get('passwordConfirmation').touched && this.formGroup.hasError('passwordError');
  }

  get isSubmitEnabled() {
    return !this.formGroup.get('oldPassword').touched
      || !this.formGroup.get('newPassword').touched
      || (this.formGroup.valid);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirmation: ['', Validators.required],
    }, { validators: this.passwordConfirmationValidator });
  }

  handleChangingPasswordVisability(isPasswordVisible: boolean | null) {
    if (!isPasswordVisible) {
      this.formGroup.addControl('passwordConfirmation', new FormControl('', Validators.required,))
    } else {
      this.formGroup.removeControl('passwordConfirmation');
    }
  }

  passwordConfirmationValidator(formGroup: FormGroup): ValidationErrors {
    const password = formGroup.get('newPassword');
    const repeatPassword = formGroup.get('passwordConfirmation');
    if (!repeatPassword) return null;
    return password.value != repeatPassword.value ? { 'passwordError': true } : null;
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.store.dispatch(new ChangePassword({
        oldPassword: this.formGroup.get('oldPassword').value,
        newPassword: this.formGroup.get('newPassword').value
      }));
    }
  }

  handleCloseModal() {
    this.modalService.closeModal();
  }

  awaitSuccessChanging() {
    this.changePasswordSuccess$.pipe(takeUntil(this.alive$)).subscribe(isPasswordSuccessfullyChanged => {
      if (isPasswordSuccessfullyChanged) {
        this.modalService.closeModal();
      }
    });
  }
}
