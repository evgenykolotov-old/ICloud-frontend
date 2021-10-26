import { NgModule } from "@angular/core";
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./navbar.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        MenubarModule,
        ButtonModule,
    ],
    exports: [
        NavbarComponent,
    ],
})
export class NavbarModule { }