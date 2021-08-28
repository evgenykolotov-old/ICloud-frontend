import { NgModule } from "@angular/core";
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./navbar.component";

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        MenubarModule,
        ButtonModule,
    ],
    exports: [
        NavbarComponent,
    ],
})
export class NavbarModule { }