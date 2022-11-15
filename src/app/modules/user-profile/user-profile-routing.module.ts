import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        component: PersonalInfoComponent,
        data: {activeTab: 0},
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent,
        data: { activeTab: 1 },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
