import { NgModule } from '@angular/core';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { ProfileModalModule } from './modal/profile-modal.module';
import { FileInputControlComponent } from './components/file-input-control/file-input-control.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    PersonalInfoComponent,
    PaymentMethodComponent,
    FileInputControlComponent,
    PaymentHistoryComponent,
  ],
  imports: [
    UserProfileRoutingModule,
    SharedModule,
    ProfileModalModule,
  ],
})
export class UserProfileModule {}
