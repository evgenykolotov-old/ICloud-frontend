import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LogoutnUser } from "src/app/infrastructure/store/user-state/user.actions";
import { UserState } from "src/app/infrastructure/store/user-state/user.state";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    @Select(UserState.isAuth) isAuth!: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly router: Router,
    ) { }

    public authorizationHandler(): void {
        this.router.navigate(['/', 'authorization']);
    }

    public registrationHandler(): void {
        this.router.navigate(['/', 'registration']);
    }

    public logoutHandler(): void {
        this.store.dispatch(new LogoutnUser())
            .pipe(tap(() => void this.router.navigate(['/', 'authorization'])));
    }
}