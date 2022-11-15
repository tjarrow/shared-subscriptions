import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { OfferOwner, OfferPlan } from '@core/models/offers.model';
import { Plan, Service, ServiceName } from "@core/models/service.model";
import { Store } from '@ngxs/store';
import { AppGetterState } from '@store/app/app-getter.state';
import { GetServices } from '@store/app/app.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-slot-input-control',
  templateUrl: './slot-input-control.component.html',
  styleUrls: ['./slot-input-control.component.scss']
})
export class SlotInputControlComponent implements OnInit, AfterViewInit, OnDestroy {
  public serviceNameEnum = ServiceName;
  public apiUrl: string = environment.apiUrl;

  @Input() plan: Plan | OfferPlan;
  @Input() freeSlotsCount: number;
  @Input() serviceName: string;
  @Input() serviceDescription: string;
  @Input() control: AbstractControl;
  @Input() termsControl: AbstractControl;
  @Input() terms: {url: string, name: string, title: string};
  @Input() isSubmitDisabled: boolean;
  @Input() isAutoFocus: boolean;
  @Input() isLoading: boolean;
  @Input() errorMessage: string;
  @Input() owner: OfferOwner;
  @Input() isOffer: boolean;
  @Output() onSubmit: EventEmitter<null> = new EventEmitter<null>();

  public service: Service;
  private _alive$: Subject<void> = new Subject<void>();

  @ViewChild('input') inputField: ElementRef;

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

  ngAfterViewInit(): void {
    if (this.isAutoFocus) {
      this.inputField.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this._alive$.next();
    this._alive$.complete();
  }

  get quantity(): number {
    return this.control.value ? this.control.value : 0;
  }

  get totalPrice(): number {
    const basePrice = this.isOffer ? this.plan.sellerSavingPrice : this.plan.buyerCostPrice;
    return this.quantity * (basePrice / 100);
  }

  get isReadTermsConfirmed(): boolean {
    return this.termsControl.touched && this.termsControl.valid;
  }

  get maxSlotsQuant(): number {
    return Boolean(this.owner) ? this.freeSlotsCount : this.plan.maxSlots;
  }


  handleFormSubmit(e: Event) {
    this.onSubmit.emit();
  }

  handleKeyUp() {
    if (Boolean(this.owner)) { // subscribe
      if (this.control.value > this.maxSlotsQuant) {
        this.control.setValue(this.maxSlotsQuant);
      }
    } else { // share
      if (this.control.value > this.plan.maxSlots - 1) {
        this.control.setValue(this.plan.maxSlots - 1);
      }
    }
  }

  handleMinusClick() {
    this.control.setValue(this.control.value - 1)
  }

  handlePlusClick() {
    this.control.setValue(this.control.value + 1)
  }

  checkNumber(e: KeyboardEvent) {
    if (e.keyCode === 69 || e.keyCode === 189) { // prevent 'e' and '-' key
      return false;
    }
  }

}
