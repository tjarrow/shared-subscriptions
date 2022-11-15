import { NgModule } from '@angular/core';
import { MarketRoutingModule } from './market-routing.module';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { SharedModule } from '@shared/shared.module';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection.component';
import { SlotSelectionComponent } from './pages/slot-selection/slot-selection.component';

@NgModule({
  declarations: [
    ServiceSelectionComponent,
    PlanSelectionComponent,
    SlotSelectionComponent,
  ],
  imports: [
    MarketRoutingModule,
    SharedModule
  ],
})
export class MarketModule {}
