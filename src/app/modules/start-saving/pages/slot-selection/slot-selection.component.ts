import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { UserRole } from '@core/models/user-role.model';
import { Store, Select } from '@ngxs/store';
import { CreateOffer, GetServices, ClearOfferCreationState, GetOfferById, CreateSubscription, ClearSubscriptionCreationState, SaveOfferDetails } from '@store/app/app.actions';
import { Service, Plan } from "@core/models/service.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from "@shared/services/modal/modal.service";
import { ModalPath } from '@core/modal/modal-routes.model';
import { Offer } from '@core/models/offers.model';
import { ServiceTerms } from '@core/models/service-terms.model';
import { environment } from 'src/environments/environment';
import { AuthGetterState } from '@store/auth/auth-getter.state';
import { AppGetterState } from '@store/app/app-getter.state';

declare var Stripe;

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss'],
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

export class SlotSelectionComponent implements OnInit, OnDestroy {
  public alive$: Subject<void> = new Subject();
  public plan: Plan;
  public currentRole: UserRole;
  public currentService: string;
  public serviceDescription: string;
  public currentPlan: string;
  public userRole = UserRole;
  public formGroup: FormGroup;
  public formSubscriberGroup: FormGroup;
  public errorMessage: string;
  public offer: Offer;
  public terms = ServiceTerms;
  public isLoggedIn: boolean;
  public termsLink: string;

  @Select(AppGetterState.isServicesLoading) isLoading$: Observable<boolean>;
  @Select(AppGetterState.servicesLoadedError) serviceLoadedError$: Observable<any>;

  @Select(AppGetterState.isOfferCreating) isOfferCreating$: Observable<boolean>;
  @Select(AppGetterState.offerCreatedSuccess) offerCreatedSuccess$: Observable<boolean>;
  @Select(AppGetterState.offerCreatedError) offerCreatedError$: Observable<boolean>;

  @Select(AuthGetterState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  @Select(AppGetterState.isOffersLoading) isOffersLoading$: Observable<boolean>;
  @Select(AppGetterState.offersLoadedSuccess) offersLoadedSuccess$: Observable<boolean>;
  @Select(AppGetterState.offersLoadedError) offersLoadedError$: Observable<any>;

  @Select(AppGetterState.isSubscribeLoading) isSubscribeLoading$: Observable<boolean>;
  @Select(AppGetterState.subscribedError) subscribedError$: Observable<any>;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.currentRole = <UserRole>this.route.snapshot.url[0].path;
    this.currentService = (<any>this.route.snapshot.params).service;
    this.currentPlan = (<any>this.route.snapshot.params).plan;

    const isUserRoleCorrect = Object.values(this.userRole).includes(this.currentRole);
    if (!isUserRoleCorrect) {
      this.router.navigate(['/market']);
      return;
    }

    this.store.dispatch(new GetServices())
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(AppGetterState.servicesInfo))
      ).subscribe((services: Service[]) => {
        const serviceNames = [this.currentService, this.currentService.replace(/_/g, ' ')];
        const correctServiceItem = services.find(({ name }) => serviceNames.includes(name.toLowerCase()));
        if (!correctServiceItem) {
          this.router.navigate(['/market', this.currentRole]);
          return;
        }

        this.serviceDescription = correctServiceItem.description;
        if (correctServiceItem.terms_link) {
          this.terms[this.currentService] = {
            name: correctServiceItem.name + ' T&Cs',
            url: correctServiceItem.terms_link,
            title: correctServiceItem.name + ' Terms and Conditions',
          };
        }

        if (this.currentRole === this.userRole.share) {
          const correctPlan = correctServiceItem.plans.find(({ name }) => name.toLowerCase() === this.currentPlan);

          if (!correctPlan) {
            this.router.navigate(['/market', this.currentRole, this.currentService]);
            return;
          }

          this.plan = correctPlan;
          this.createShareSlotForm();
        } else {
          this.getOfferById(this.currentPlan);
        }
      });

    this.offerCreatedSuccess$.pipe(takeUntil(this.alive$)).subscribe(isOfferCreatedSuccessfully => {
      if (isOfferCreatedSuccessfully) {
        this.router.navigate(['/my-subscriptions']);
        setTimeout(() => {
          this.modalService.openModal$(ModalPath.SuccessfullyPlaced, 'Successfully Placed').subscribe(()=> {
            this.store.dispatch(new ClearOfferCreationState());
          });
        }, 100);
      }
    });

    this.offerCreatedError$.pipe(takeUntil(this.alive$)).subscribe((error: any) => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = '';
      }
    });

    this.subscribedError$.pipe(takeUntil(this.alive$)).subscribe((error: any) => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = '';
      }
    });

    this.isAuthenticated$.pipe(takeUntil(this.alive$)).subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearSubscriptionCreationState());
  }

  get isSubmitDisabled() {
    return !this.formGroup.valid;
  }

  get isSubscriptionSubmitDisabled() {
    return !this.formSubscriberGroup.valid
        || this.formSubscriberGroup.get('quantity').value === 0
        || this.formSubscriberGroup.get('quantity').value > this.offer.freeSlotsCount;
  }

  createShareSlotForm() {
    this.formGroup = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(0), Validators.max(this.plan.maxSlots)]],
      isAcceptedTerms: [false, Validators.requiredTrue]
    });
  }

  createSubscribeForm() {
    this.formSubscriberGroup = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(0), Validators.max(this.offer.plan.maxSlots)]],
      isAcceptedTerms: [false, Validators.requiredTrue]
    });
  }

  handleFormSubmit() {
    if (!this.isLoggedIn) {
      this.store.dispatch(new SaveOfferDetails({ planId: this.plan.id, slotsCount: this.formGroup.get('quantity').value }))
      this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
      return;
    }
    this.sendShareRequest();
  }

  sendShareRequest() {
    if (this.isLoggedIn) {
      this.store.dispatch(new CreateOffer({ plan: { id: this.plan.id }, slotsCount: this.formGroup.get('quantity').value }));
    }
  }

  handleSubscriptionFormSubmit() {
    this.store.dispatch(new CreateSubscription({
      offerId: this.currentPlan,
      quantity: this.formSubscriberGroup.get('quantity').value
    })).pipe(
      takeUntil(this.alive$),
      mergeMap(() => this.store.select(AppGetterState.subscriptionSessionId))
    ).subscribe((sessionId: string ) => {
      const stripe = Stripe(environment.stripeKey);
      stripe.redirectToCheckout({ sessionId: sessionId });
    });
  }

  getOfferById(planId) {
    this.store.dispatch(new GetOfferById({ id: planId }))
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(AppGetterState.offersInfo))
      ).subscribe((offers: Offer[]) => {
        if (offers && offers.length) {
          this.offer = offers[0];
          this.createSubscribeForm();
        } else {
          this.router.navigate(['/market', this.currentRole, this.currentService]);
        }
      });
  }

}
