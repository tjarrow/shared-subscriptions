import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from '@shared/shared.module';
import { ModalRoutingModule } from "./modal-routing.module";
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { SuccessfullyPlacedModalComponent } from './components/successfully-placed-modal/successfully-placed-modal.component';
import { SignOutModalComponent } from './components/sign-out-modal/sign-out-modal.component';
import { SuccessfullySharedModalComponent } from './components/successfully-shared-modal/successfully-shared-modal.component';
import { SuccessfullyChangedModalComponent } from "./components/successfully-changed-modal/successfully-changed-modal.component";
import { CancelSubscriptionModalComponent } from './components/cancel-subscription-modal/cancel-subscription-modal.component';

@NgModule({
  declarations: [
    SignInModalComponent,
    SignUpModalComponent,
    ForgotPasswordModalComponent,
    SuccessfullyPlacedModalComponent,
    SignOutModalComponent,
    SuccessfullySharedModalComponent,
    SuccessfullyChangedModalComponent,
    CancelSubscriptionModalComponent,
  ],
  imports: [
    CommonModule,
    ModalRoutingModule,
    SharedModule,

  ],
})
export class ModalModule {}
