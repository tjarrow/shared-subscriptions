import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, mergeMap } from 'rxjs/operators';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { UserRole } from '@core/models/user-role.model';
import { Store, Select } from '@ngxs/store';
import { UserInfo } from '@shared/models/user-info.model';
import { GetOffers, GetServices, GetSupport, NotifyUser, ClearGettingSupportState } from '@store/app/app.actions';
import { Service, Plan } from '@core/models/service.model';
import { Offer } from '@core/models/offers.model';
import { NotificationType } from '@shared/models/notification-type.model';
import { environment } from 'src/environments/environment';
import { AuthGetterState } from '@store/auth/auth-getter.state';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, transform: 'translateY(100px)' }),
        animate('.3s', keyframes([
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(100px)', offset: 0.66 }),
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('.3s', keyframes([
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(0)', offset: 0.33 }),
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class PlanSelectionComponent implements OnInit, OnDestroy {
  public alive$: Subject<void> = new Subject();
  public plans: Plan[];
  public currentRole: UserRole;
  public currentService: string;
  public userRole = UserRole;
  public offers: Offer[];
  private userEmail: string;
  private _service: Service;

  @Select(AppGetterState.isServicesLoading) isLoading$: Observable<boolean>;
  @Select(AppGetterState.servicesLoadedError) serviceLoadedError$: Observable<any>;

  @Select(AppGetterState.isOffersLoading) isOffersLoading$: Observable<boolean>;
  @Select(AppGetterState.offersLoadedSuccess) offersLoadedSuccess$: Observable<boolean>;
  @Select(AppGetterState.offersLoadedError) offersLoadedError$: Observable<any>;

  @Select(AuthGetterState.userInfo) userInfo$: Observable<UserInfo>;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.currentRole = <UserRole>this.route.snapshot.url[0].path;
    this.currentService = (<any>this.route.snapshot.params).service;

    const isUserRoleCorrect = Object.values(this.userRole).includes(this.currentRole);
    if (!isUserRoleCorrect) {
      this.router.navigate(['/market']);
      return;
    }

    this.getServices();
    this.getUserEmail();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  getServices() {
    this.store.dispatch(new GetServices())
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(AppGetterState.servicesInfo))
      ).subscribe((services: Service[]) => {
        const serviceNames = [this.currentService, this.currentService.replace(/_/g, ' ')];
        this._service = services.find(({ name }) => serviceNames.includes(name.toLowerCase()));
        if (!this._service) {
          this.router.navigate(['/market', this.currentRole]);
        } else {
          if (this.currentRole === this.userRole.share) {
            this.plans = this._service.plans;
          } else {
            this.getOffers(this._service.id);
          }
        }
      });
  }

  getOffers(serviceId: number) {
    this.store.dispatch(new GetOffers({ id: serviceId }))
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(AppGetterState.offersInfo))
      ).subscribe((offers: Offer[]) => {
        this.offers = offers;
      });
  }

  handleNotifyUser() {
    this.store.dispatch(new GetSupport({
      email: this.userEmail,
      message: `Could you notify me, please, when ${this.currentService} offers will appear? Thank you!`
    })).pipe(take(1)).subscribe(store => {
      if (store.app.supportRequestedSuccess) {
        this.store.dispatch([
          new NotifyUser({
            message: 'Your request sent.<br> We will get you to know when something appears. Thank you!',
            icon: 'plane',
            willCloseAfter: 2500,
          }),
          new ClearGettingSupportState()
        ]);
      } else if (store.app.supportRequestedError) {
        this.store.dispatch([
          new NotifyUser({
            message: 'We are so sorry — some error was happened. Try again later.',
            type: NotificationType.Error,
            icon: 'attention',
            willCloseAfter: 2500,
          }),
          new ClearGettingSupportState()
        ]);
      }
    });
  }

  getUserEmail() {
    this.userInfo$.pipe(takeUntil(this.alive$)).subscribe((user: UserInfo) => {
      this.userEmail = user.email;
    })
  }

  getServiceImg() {
    if (!this._service) return undefined;

    if (this._service.logo) {
      return `${environment.apiUrl}/users/logo/${this._service.logo.id}`;
    }

    return `assets/images/services/${this._service.name.toLowerCase()}.svg`;
  }

}
