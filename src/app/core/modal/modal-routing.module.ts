import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModalPath } from "@core/modal/modal-routes.model";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { SignOutModalComponent } from './components/sign-out-modal/sign-out-modal.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { SuccessfullyPlacedModalComponent } from './components/successfully-placed-modal/successfully-placed-modal.component';
import { SuccessfullySharedModalComponent } from './components/successfully-shared-modal/successfully-shared-modal.component';
import { SuccessfullyChangedModalComponent } from "./components/successfully-changed-modal/successfully-changed-modal.component";
import { CancelSubscriptionModalComponent } from "@core/modal/components/cancel-subscription-modal/cancel-subscription-modal.component";

const routes: Routes = [
  {
    path: "modal",
    outlet: "modal",
    component: ModalComponent,
    children: [
      {
        path: ModalPath.SignIn,
        component: SignInModalComponent,
      },
      {
        path: ModalPath.SignUp,
        component: SignUpModalComponent,
      },
      {
        path: ModalPath.SignOut,
        component: SignOutModalComponent,
      },
      {
        path: ModalPath.ForgotPassword,
        component: ForgotPasswordModalComponent,
      },
      {
        path: ModalPath.SuccessfullyPlaced,
        component: SuccessfullyPlacedModalComponent,
      },
      {
        path: ModalPath.SuccessfullyShared,
        component: SuccessfullySharedModalComponent,
      },
      {
        path: ModalPath.SuccessfullyChanged,
        component: SuccessfullyChangedModalComponent,
      },
      {
        path: ModalPath.CancelSubscription,
        component: CancelSubscriptionModalComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRoutingModule {}
