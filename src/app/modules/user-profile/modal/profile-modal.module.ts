import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from '@shared/shared.module';
import { ProfileModalRoutingModule } from "./profile-modal-routing.module";
import { DeleteProfileImageComponent } from './components/delete-profile-image/delete-profile-image.component';
import { EditUserDetailsComponent } from './components/edit-user-details/edit-user-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    DeleteProfileImageComponent,
    EditUserDetailsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ProfileModalRoutingModule,
    SharedModule,
  ],
})
export class ProfileModalModule {}
