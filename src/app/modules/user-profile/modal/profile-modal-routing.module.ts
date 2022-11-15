import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModalPath } from "@core/modal/modal-routes.model";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { DeleteProfileImageComponent } from './components/delete-profile-image/delete-profile-image.component';
import { EditUserDetailsComponent } from './components/edit-user-details/edit-user-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {
    path: "modal",
    outlet: "modal",
    component: ModalComponent,
    children: [
      {
        path: ModalPath.DeleteProfileImage,
        component: DeleteProfileImageComponent,
      },
      {
        path: ModalPath.EditUserInfo,
        component: EditUserDetailsComponent,
      },
      {
        path: ModalPath.ChangePassword,
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileModalRoutingModule {}
