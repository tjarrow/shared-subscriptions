import { NgModule } from '@angular/core';
import { StartSavingRoutingModule } from './start-saving-routing.module';
import { RoleSelectionComponent } from './pages/role-selection/role-selection.component';
import { SharedModule } from '@shared/shared.module';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection.component';
import { SlotSelectionComponent } from './pages/slot-selection/slot-selection.component';
import { ServicePlanComponent } from './components/service-plan/service-plan.component';
import { SlotInputControlComponent } from './components/slot-input-control/slot-input-control.component';
import { OfferComponent } from './components/offer/offer.component';

@NgModule({
  declarations: [
    RoleSelectionComponent,
    ServiceSelectionComponent,
    PlanSelectionComponent,
    SlotSelectionComponent,
    ServicePlanComponent,
    SlotInputControlComponent,
    OfferComponent,
  ],
  imports: [
    StartSavingRoutingModule,
    SharedModule
  ],
})
export class StartSavingModule {}
