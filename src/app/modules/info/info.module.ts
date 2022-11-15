import { NgModule } from '@angular/core';
import { InfoRoutingModule } from './info-routing.module';
import { FaqComponent } from './pages/faq/faq.component';
import { SharedModule } from '@shared/shared.module';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CookiesComponent } from './pages/cookies/cookies.component';

@NgModule({
  declarations: [
    FaqComponent,
    TermsComponent,
    PrivacyComponent,
    CookiesComponent,
  ],
  imports: [
    InfoRoutingModule,
    SharedModule
  ],
})
export class InfoModule {}
