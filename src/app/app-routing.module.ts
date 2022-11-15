import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { AuthGuard} from '@core/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'info',
    loadChildren: () => import('./modules/info/info.module').then(m => m.InfoModule),
  },
  {
    path: 'market',
    loadChildren: () => import('./modules/start-saving/start-saving.module').then(m => m.StartSavingModule),
  },
  {
    path: 'my-subscriptions',
    loadChildren: () => import('./modules/my-subscriptions/my-subscriptions.module').then(m => m.MySubscriptionsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
