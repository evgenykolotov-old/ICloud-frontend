import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './infrastructure/routes/app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from "@ngxs/store";
import { APP_STATES } from "./infrastructure/store";
import { NavbarModule } from './modules/navbar/navbar.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(APP_STATES),
    NavbarModule,
    RegistrationModule,
    AuthorizationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
