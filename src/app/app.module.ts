import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './infrastructure/routes/app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from "@ngxs/store";
import { APP_STATES } from "./infrastructure/store";
import { ComponentsModule } from "./infrastructure/components/components.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(APP_STATES),
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
