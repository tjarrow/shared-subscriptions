import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { skip, debounceTime, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Register, ClearRegister, CheckEmailUniquality } from '@store/auth/auth.actions';
import { ModalService } from "@shared/services/modal/modal.service";
import { ModalPath } from '@core/modal/modal-routes.model';
import { passwordValidator } from '@shared/validators/password.validator';
import { environment } from 'src/environments/environment';
import { shareitEmailValidator } from '@shared/validators/shareit-email.validator';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit, OnDestroy {
  public readonly waitBeforeStartChecking = 1600;
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();
  public isEmailUniqueError: boolean;

  @Select(AuthGetterState.isRegisterLoading) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.registerSuccess) registerSuccess$: Observable<boolean>;
  @Select(AuthGetterState.registerError) registerError$: Observable<any>;
  @Select(AuthGetterState.isCheckingEmailUniquality) isEmailChecking$: Observable<boolean>;
  @Select(AuthGetterState.checkEmailUniqualitySuccess) checkEmailUniqualitySuccess$: Observable<boolean>;
  @Select(AuthGetterState.checkEmailUniqualityError) checkEmailUniqualityError$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private window: Window,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.createForm();
    this.awaitSuccessRegistration();
    this.listenEmailChanging();
    this.listenResultOfCheckingEmailUniquality();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearRegister());
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, shareitEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirmation: ['', Validators.required],
      isReadTerms: [false, Validators.requiredTrue],
    }, { validators: this.passwordConfirmationValidator });
  }

  get isFirstNameInvalid(): boolean {
    return this.formGroup.get('firstName').touched && this.formGroup.get('firstName').invalid;
  }

  get isLastNameInvalid(): boolean {
    return this.formGroup.get('lastName').touched && this.formGroup.get('lastName').invalid;
  }

  get isEmailInvalid(): boolean {
    return this.formGroup.get('email').touched && this.formGroup.get('email').invalid;
  }

  get isPasswordInvalid(): boolean {
    return this.formGroup.get('password').touched && this.formGroup.get('password').invalid;
  }

  get isPasswordConfirmationInvalid(): boolean {
    return this.formGroup.get('passwordConfirmation').touched && this.formGroup.hasError('passwordError');
  }

  get isReadTermsConfirmed(): boolean {
    return this.formGroup.get('isReadTerms').touched && this.formGroup.get('isReadTerms').invalid;
  }

  get isSubmitEnabled(): boolean {
    return !this.formGroup.get('firstName').touched
        || !this.formGroup.get('lastName').touched
        || !this.formGroup.get('email').touched
        || !this.formGroup.get('password').touched
        || (this.formGroup.valid && !this.isEmailUniqueError);
  }

  handleSignUpViaGoogle(e: MouseEvent) {
    e.preventDefault();
    this.window.location.assign(`${environment.apiUrl}/auth/google`);
  }

  handleSignUpViaFacebook(e: MouseEvent) {
    e.preventDefault();
    this.window.location.assign(`${environment.apiUrl}/auth/facebook`);
  }

  handleSignIn(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid && !this.isEmailUniqueError) {
      this.store.dispatch(new Register({
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value,
        first_name: this.formGroup.get('firstName').value,
        last_name: this.formGroup.get('lastName').value
      }));
    }
  }

  awaitSuccessRegistration() {
    this.registerSuccess$.pipe(takeUntil(this.alive$)).subscribe(isSignUpSuccess => {
      if (isSignUpSuccess) {
        this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
      }
    });
  }

  listenEmailChanging() {
    this.formGroup.get('email').valueChanges.pipe(
      skip(1),
      debounceTime(this.waitBeforeStartChecking),
      takeUntil(this.alive$),

    ).subscribe(() => {
      if (this.formGroup.get('email').valid) {
        this.store.dispatch(new CheckEmailUniquality({
          email: this.formGroup.get('email').value
        }));
      }
    });
  }

  listenResultOfCheckingEmailUniquality() {
    this.checkEmailUniqualitySuccess$.pipe(
      takeUntil(this.alive$),
    ).subscribe((result) => {
      if (!result) return;
      this.isEmailUniqueError = !(<any>result).isUnique;
    });

    this.checkEmailUniqualityError$.pipe(
      takeUntil(this.alive$),
    ).subscribe((error) => {
      this.isEmailUniqueError = false;
    });
  }

  handleChangingPasswordVisability(isPasswordVisible: boolean | null) {
    if (!isPasswordVisible) {
      this.formGroup.addControl('passwordConfirmation', new FormControl('', Validators.required, ))
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
}
