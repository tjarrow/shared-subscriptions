import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NothingFoundComponent } from './components/nothing-found/nothing-found.component';
import { SupportButtonComponent } from './components/support/support-button/support-button.component';
import { SupportSectionComponent } from './components/support/support-section/support-section.component';
import { SupportFormComponent } from './components/support/support-form/support-form.component'
import { SubscriptionCardComponent } from './components/subscription-card/subscription-card.component';
import { InputControlComponent } from './components/controls/input-control/input-control.component';
import { PasswordControlComponent } from './components/controls/password-control/password-control.component';
import { CreatePasswordControlComponent } from './components/controls/create-password-control/create-password-control.component';
import { CheckboxControlComponent } from './components/controls/checkbox-control/checkbox-control.component';
import { ValidationInputControlComponent } from './components/controls/validation-input-control/validation-input-control.component';
import { TextareaControlComponent } from './components/controls/textarea-control/textarea-control.component';
import { GetSubscriptionPrice } from './pipes/get-subscription-price.pipe';
import { IsArrayPipe } from './pipes/is-array.pipe';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { SnakeCasePipe } from './pipes/snake-case.pipe';
import { GetSinglePlanPricePipe } from './pipes/get-single-plan-price.pipe';

@NgModule({
  exports: [
    SvgIconComponent,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    AppHeaderComponent,
    AppFooterComponent,
    SupportButtonComponent,
    SpinnerComponent,
    SubscriptionCardComponent,
    ModalComponent,
    SwiperModule,
    InputControlComponent,
    PasswordControlComponent,
    CreatePasswordControlComponent,
    CheckboxControlComponent,
    IsArrayPipe,
    GetSubscriptionPrice,
    ValidationInputControlComponent,
    SupportSectionComponent,
    NothingFoundComponent,
    NotificationBarComponent,
    SupportFormComponent,
    TextareaControlComponent,
    SnakeCasePipe,
    GetSinglePlanPricePipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SwiperModule
  ],
  declarations: [
    SvgIconComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SupportButtonComponent,
    SpinnerComponent,
    SubscriptionCardComponent,
    ModalComponent,
    InputControlComponent,
    PasswordControlComponent,
    CreatePasswordControlComponent,
    CheckboxControlComponent,
    IsArrayPipe,
    GetSubscriptionPrice,
    ValidationInputControlComponent,
    SupportSectionComponent,
    NothingFoundComponent,
    NotificationBarComponent,
    SupportFormComponent,
    TextareaControlComponent,
    SnakeCasePipe,
    GetSinglePlanPricePipe,
  ]
})
export class SharedModule {

}
