import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    constructor(
        private readonly router: Router,
    ) { }

    public authorizationHandler(): void {
        this.router.navigate(['/', 'authorization']);
    }

    public registrationHandler(): void {
        this.router.navigate(['/', 'registration']);
    }
}