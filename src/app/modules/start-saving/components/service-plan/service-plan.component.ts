import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Plan, Service, ServiceName } from '@core/models/service.model';
import { Store } from '@ngxs/store';
import { AppGetterState } from '@store/app/app-getter.state';
import { GetServices } from '@store/app/app.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[app-service-plan]',
  templateUrl: './service-plan.component.html',
  styleUrls: ['./service-plan.component.scss']
})
export class ServicePlanComponent implements OnInit, OnDestroy {
  public serviceNameEnum = ServiceName;

  @Input() serviceName: string;
  @Input() plan: Plan;
  public service: Service;
  private _alive$: Subject<void> = new Subject<void>();

  get imageSrc() {
    if (this.service.logo) {
      return `${environment.apiUrl}/users/logo/${this.service.logo.id}`;
    }

    return `assets/images/services/${this.service.name.toLowerCase()}.svg`;
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(AppGetterState.servicesInfo)
      .pipe(takeUntil(this._alive$))
      .subscribe((services: Service[]) => {
        const serviceNames = [this.serviceName, this.serviceName.replace(/_/g, ' ')];
        this.service = services.find(({ name }) => serviceNames.includes(name.toLowerCase()));
      })

    this.store.dispatch(new GetServices());
  }

  ngOnDestroy() {
    this._alive$.next();
    this._alive$.complete();
  }
}
