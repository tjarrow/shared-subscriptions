import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject, Renderer2 } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetSupport, ClearGettingSupportState, NotifyUser } from '@store/app/app.actions';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from '@shared/models/user-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT } from '@angular/common';
import { shareitEmailValidator } from '@shared/validators/shareit-email.validator';
import { AuthGetterState } from '@store/auth/auth-getter.state';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})

export class SupportFormComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public alive$: Subject<void> = new Subject();
  public isUserSignedIn: boolean;
  public isRecaptchaError: boolean;

  @Output() onCloseSupportForm: EventEmitter<null> = new EventEmitter<null>();

  @Select(AuthGetterState.userInfo) userInfo$: Observable<UserInfo>;

  @Select(AppGetterState.isSupportRequesting) isLoading$: Observable<boolean>;
  @Select(AppGetterState.supportRequestedSuccess) supportRequestedSuccess$: Observable<boolean>;
  @Select(AppGetterState.supportRequestedError) supportRequestedError$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private recaptchaV3Service: ReCaptchaV3Service,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.createForm();
    this.getUserEmail();
    this.listenSuccessfulRequest();
    this.showInitedRecapcha();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearGettingSupportState());
  }

  get isEmailInvalid(): boolean {
    return this.formGroup.get('email').touched && this.formGroup.get('email').invalid;
  }

  get isMessageInvalid(): boolean {
    return this.formGroup.get('message').touched && this.formGroup.get('message').invalid;
  }

  get isSubmitEnabled(): boolean {
    return !this.formGroup.get('email').touched
      || !this.formGroup.get('message').touched
      || (this.formGroup.valid);
  }

  close() {
    this.renderer.addClass(this.document.querySelector('.grecaptcha-badge'), "grecaptcha-badge_hide");
    this.onCloseSupportForm.emit();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, shareitEmailValidator]],
      message: ['', [Validators.required]],
    });
  }

  getUserEmail() {
    this.userInfo$.pipe(take(1)).subscribe((user: UserInfo) => {
      if (user.email) this.formGroup.get('email').setValue(user.email);
      if (Boolean(user.id)) this.isUserSignedIn = true;
    })
  }

  listenSuccessfulRequest() {
    this.supportRequestedSuccess$.pipe(takeUntil(this.alive$)).subscribe((isReqestSuccessful: boolean) => {
      if (isReqestSuccessful) {
        this.onCloseSupportForm.emit();
        this.store.dispatch(new NotifyUser({
          message: 'Your message has been successfully sent. Thank you!',
          icon: 'plane',
          willCloseAfter: 2500,
        }));
      }
    });
  }

  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.recaptchaV3Service.execute('supportFormSubmit').pipe(takeUntil(this.alive$))
        .subscribe((token) => {
          this.isRecaptchaError = false;
          this.store.dispatch(new GetSupport({
            email: this.formGroup.get('email').value,
            message: this.formGroup.get('message').value
          }));
          this.renderer.addClass(this.document.querySelector('.grecaptcha-badge'), "grecaptcha-badge_hide");
        },
        (error) => {
          this.isRecaptchaError = true;
          console.warn('recaptcha error => ', error);
          this.renderer.addClass(this.document.querySelector('.grecaptcha-badge'), "grecaptcha-badge_hide");
        });
    }
  }

  showInitedRecapcha() {
    const recaptcaElement = this.document.querySelector('.grecaptcha-badge');
    if (recaptcaElement) {
      this.renderer.removeClass(recaptcaElement, "grecaptcha-badge_hide");
    }
  }

}
