import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ModalService } from "@shared/services/modal/modal.service";
import { CheckEmailUniquality, SaveUserInfo, ClearSaveUserInfo } from '@store/auth/auth.actions';
import { UserInfo } from '@shared/models/user-info.model';
import { shareitEmailValidator } from '@shared/validators/shareit-email.validator';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit, OnDestroy {
  public readonly waitBeforeStartChecking = 1600;
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();
  public isEmailUniqueError: boolean;
  private previosEmail: string;
  private previosFirstName: string;
  private previosLastName: string;
  private checkedEmail: string;

  @Select(AuthGetterState.isUserInfoSaving) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.userInfoSuccess) userInfoSuccess$: Observable<boolean>;
  @Select(AuthGetterState.userInfoError) userInfoError$: Observable<any>;
  @Select(AuthGetterState.isCheckingEmailUniquality) isEmailChecking$: Observable<boolean>;
  @Select(AuthGetterState.checkEmailUniqualitySuccess) checkEmailUniqualitySuccess$: Observable<boolean>;
  @Select(AuthGetterState.checkEmailUniqualityError) checkEmailUniqualityError$: Observable<any>;
  @Select(AuthGetterState.userInfo) userInfo$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.createForm();
    this.awaitSuccessEdit();
    this.listenEmailChanging();
    this.listenResultOfCheckingEmailUniquality();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearSaveUserInfo());
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

  get isSubmitEnabled(): boolean {
    const isAnyFieldChanged = this.previosFirstName != this.formGroup.get('firstName').value
                          || this.previosLastName != this.formGroup.get('lastName').value
                          || this.previosEmail != this.formGroup.get('email').value;
    const hasNotEmailUniqueError = !this.isEmailUniqueError || this.isEmailUniqueError && this.previosEmail == this.formGroup.get('email').value;
    return isAnyFieldChanged && hasNotEmailUniqueError && this.formGroup.valid;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, shareitEmailValidator]],
    });

    this.userInfo$.pipe(take(1)).subscribe((user: UserInfo) => {
      this.formGroup.get('firstName').setValue(user.firstName);
      this.formGroup.get('lastName').setValue(user.lastName);
      this.formGroup.get('email').setValue(user.email);

      this.previosEmail = user.email;
      this.previosFirstName = user.firstName;
      this.previosLastName = user.lastName;
    });
  }

  awaitSuccessEdit() {
    this.userInfoSuccess$.pipe(takeUntil(this.alive$)).subscribe(isUserInfoSuccessfullySaved => {
      if (isUserInfoSuccessfullySaved) {
        this.modalService.closeModal();
      }
    });
  }

  listenEmailChanging() {
    this.formGroup.get('email').valueChanges.pipe(
      debounceTime(this.waitBeforeStartChecking),
      takeUntil(this.alive$),
    ).subscribe(() => {
      this.checkEmailUniquality();
    });
  }

  checkEmailUniquality() {
    if (this.formGroup.get('email').valid && this.previosEmail != this.formGroup.get('email').value) {
      this.checkedEmail = this.formGroup.get('email').value;
      this.store.dispatch(new CheckEmailUniquality({
        email: this.formGroup.get('email').value
      }));
    }
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid && !this.isEmailUniqueError) {
      this.store.dispatch(new SaveUserInfo({
        email: this.formGroup.get('email').value,
        first_name: this.formGroup.get('firstName').value,
        last_name: this.formGroup.get('lastName').value
      }));
    }
  }

  handleCloseModal() {
    this.modalService.closeModal();
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

}
