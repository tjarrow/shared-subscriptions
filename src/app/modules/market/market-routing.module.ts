import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection.component';
import { SlotSelectionComponent } from './pages/slot-selection/slot-selection.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceSelectionComponent,
  },
  {
    path: ':service',
    component: PlanSelectionComponent,
  },
  {
    path: ':service/:plan',
    component: SlotSelectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
