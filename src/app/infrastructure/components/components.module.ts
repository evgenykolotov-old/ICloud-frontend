import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from "./Button/button.component";

@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  providers: [],
  exports: [
    ButtonComponent,
  ],
})
export class ComponentsModule { }
