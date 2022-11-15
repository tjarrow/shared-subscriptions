import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AuthComponent } from './auth.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    ConfirmEmailComponent,
    RestorePasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule {}
