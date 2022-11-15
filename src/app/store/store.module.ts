import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './app/app.state';
import { SubscriptionState } from './app/subscription.state';
import { AuthState } from './auth/auth.state';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      AppState,
      AuthState,
      SubscriptionState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth.token',
        'auth.id',
        'auth.email',
        'auth.isEmailConfirmed',
        'auth.firstName',
        'auth.lastName',
        'auth.userRoles',
        'auth.userAvatarId',
        'app.demoOfferRequest'
      ]
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  declarations: [],
  providers: []
})
export class StoreModule { }
