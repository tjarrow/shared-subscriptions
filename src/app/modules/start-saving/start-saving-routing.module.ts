import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleSelectionComponent } from './pages/role-selection/role-selection.component';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { PlanSelectionComponent } from './pages/plan-selection/plan-selection.component';
import { SlotSelectionComponent } from './pages/slot-selection/slot-selection.component';
import { AuthGuard } from '@core/auth-guard';
import { UserRole } from '@core/models/user-role.model';

const routes: Routes = [
  {
    path: '',
    component: RoleSelectionComponent,
  },
  {
    path: ':role',
    component: ServiceSelectionComponent,
  },
  {
    path: UserRole.share + '/:service',
    component: PlanSelectionComponent,
  },
  {
    path: UserRole.share + '/:service/:plan',
    component: SlotSelectionComponent,
  },
  {
    path: UserRole.subscribe + '/:service',
    component: PlanSelectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: UserRole.subscribe + '/:service/:plan',
    component: SlotSelectionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSavingRoutingModule {}
