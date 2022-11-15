import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { Store, Select } from '@ngxs/store';
import { GetServices } from '@store/app/app.actions';
import { Service } from "@core/models/service.model";
import { UserRole } from '@core/models/user-role.model';
import { environment } from 'src/environments/environment';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.scss'],
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
export class ServiceSelectionComponent implements OnInit, OnDestroy {
  public alive$: Subject<void> = new Subject();
  public services: Service[];
  public userRole = UserRole;
  public currentRole: UserRole;

  @Select(AppGetterState.isServicesLoading) isLoading$: Observable<boolean>;
  @Select(AppGetterState.servicesLoadedError) serviceLoadedError$: Observable<any>;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.store.dispatch(new GetServices())
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(AppGetterState.servicesInfo))
      ).subscribe((services: Service[]) => {
        this.services = services;
      });

    this.currentRole = (<any>this.route.snapshot.params).role;


    const isUserRoleCorrect = Object.values(this.userRole).includes(this.currentRole);
    if (!isUserRoleCorrect) {
      this.router.navigate(['/market']);
    }

  }

  getServiceImg(service: Service) {
    if (service.logo) {
      return `${environment.apiUrl}/users/logo/${service.logo.id}`;
    }

    return `assets/images/services/${service.name.toLowerCase()}.svg`;
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

}
