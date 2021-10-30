import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './infrastructure/routes/app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from "@ngxs/store";
import { APP_STATES } from "./infrastructure/store";
import { NavbarModule } from './modules/navbar/navbar.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { HttpClientModule } from '@angular/common/http';
import { asapScheduler } from 'rxjs';
import { AuthorizationUser } from './infrastructure/store/user-state/user.actions';

const initializeAppFactory = (store: Store) =>
  () => asapScheduler.schedule(() => store.dispatch(new AuthorizationUser()));

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
    HttpClientModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [Store],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
