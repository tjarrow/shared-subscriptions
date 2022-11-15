import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { ConfirmEmail, ClearConfirmEmailState } from '@store/auth/auth.actions';
import { NotifyUser } from '@store/app/app.actions';
import { NotificationType } from '@shared/models/notification-type.model';
import { takeUntil } from 'rxjs/operators';
import { AuthGetterState } from '@store/auth/auth-getter.state';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  public userEmail: string;
  public userRestoreCode: string;
  public alive$: Subject<void> = new Subject();

  @Select(AuthGetterState.confirmEmailSuccess) confirmEmailSuccess$: Observable<boolean>;
  @Select(AuthGetterState.confirmEmailError) confirmEmailError$: Observable<any>;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.queryParams['email'];
    this.userRestoreCode = this.route.snapshot.queryParams['code'];

    if (this.userEmail && this.userRestoreCode) {
      this.startVerificationEmail();
    } else {
      this.router.navigate(['/']);
    }

    this.confirmEmailSuccess$.pipe(takeUntil(this.alive$)).subscribe(isSuccess => {
      if (isSuccess) {
        this.router.navigate(['/']);
        this.store.dispatch(new NotifyUser({
          message: "Your email was successfully verified, thank you!",
          willCloseAfter: 3600
        }));
      }
    });

    this.confirmEmailError$.pipe(takeUntil(this.alive$)).subscribe(apiError => {
      if (apiError) {
        const errorMessage = apiError.error && apiError.error.message
          ? 'An error happened during verifying email: ' + apiError.error.message
          : 'An error happened during verifying email. Try again later, please.';
        this.router.navigate(['/']);
        this.store.dispatch(new NotifyUser({
          message: errorMessage,
          icon: 'attention',
          type: NotificationType.Error,
        }));
      }
    });

  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearConfirmEmailState());
  }

  startVerificationEmail() {
    this.store.dispatch(new ConfirmEmail({
      email: this.userEmail,
      code: this.userRestoreCode
    }));
  }

}
