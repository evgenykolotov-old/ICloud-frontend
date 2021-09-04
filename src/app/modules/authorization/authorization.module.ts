import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthorizationComponent } from "./authorization.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthorizationComponent,
    ],
    imports: [
        CardModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        AuthorizationComponent,
    ],
})
export class AuthorizationModule { }
