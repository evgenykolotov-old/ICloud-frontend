import { NgModule } from "@angular/core";
import { RegistrationComponent } from "./registration.component";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        RegistrationComponent,
    ],
    imports: [
        CardModule,
        InputTextModule,
        ButtonModule,
    ],
    exports: [
        RegistrationComponent,
    ],
})
export class RegistrationModule { }