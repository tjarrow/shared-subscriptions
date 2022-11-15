import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { NotifyUser, HideNotification } from '@store/app/app.actions';
import { ResendVerificationEmail } from '@store/auth/auth.actions';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { NotificationType } from '@shared/models/notification-type.model';
import { NotificationAction } from '@shared/models/notification-action.model';
import { takeUntil } from 'rxjs/operators';
import { AuthGetterState } from '@store/auth/auth-getter.state';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, transform: 'translateY(100px)' }),
        animate('.2s', keyframes([
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(100px)', offset: 0.66 }),
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('.2s', keyframes([
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(0)', offset: 0.33 }),
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class NotificationBarComponent implements OnInit, OnDestroy {
  public notificationType = NotificationType;
  public notificationAction = NotificationAction;
  public alive$: Subject<void> = new Subject();


  @Select(AppGetterState.notifications) notifications$: Observable<boolean>;

  @Select(AuthGetterState.isVerificationEmailSending) isVerificationEmailSending$: Observable<boolean>;
  @Select(AuthGetterState.verificationEmailSentSuccess) verificationEmailSentSuccess$: Observable<boolean>;
  @Select(AuthGetterState.verificationEmailSentError) verificationEmailSentError$: Observable<any>;

  constructor(private store: Store,) { }

  ngOnInit(): void {
    this.verificationEmailSentSuccess$.pipe(takeUntil(this.alive$)).subscribe(isSentSuccess => {
      if (isSentSuccess) {
        this.store.dispatch(new NotifyUser({
          message: 'We re-sent you the verification email. Check your email and follow the verification link, please.',
          willCloseAfter: 2500,
          icon: 'check-rounded'
        }));
      }
    });

    this.verificationEmailSentError$.pipe(takeUntil(this.alive$)).subscribe(error => {
      if (error) {
        this.store.dispatch(new NotifyUser({
          type: NotificationType.Error,
          message: 'Some error happened during resending the verification email. Try later or contact support, please.',
          willCloseAfter: 2500,
          icon: 'attention'
        }));
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  handleResendClick() {
    this.store.dispatch(new ResendVerificationEmail());
  }

  handleCloseClick(id: number) {
    this.store.dispatch(new HideNotification({id: id}));
  }

}
