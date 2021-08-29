import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthorizationComponent } from "./authorization.component";

@NgModule({
    declarations: [
        AuthorizationComponent,
    ],
    imports: [
        CardModule,
        InputTextModule,
        ButtonModule,
    ],
    exports: [
        AuthorizationComponent,
    ],
})
export class AuthorizationModule { }