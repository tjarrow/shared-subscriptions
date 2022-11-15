import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'confirm',
    component: ConfirmEmailComponent,
  },
  {
    path: 'restore',
    component: RestorePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
