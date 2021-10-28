import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { AuthorizationUser } from "src/app/infrastructure/store/user-state/user.actions";
import { User } from "src/app/infrastructure/types/types";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {
  public authorizationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly store: Store,
  ) { }

  public authorization(): void {
    this.store.dispatch(new AuthorizationUser(this.getAuthorizationData()));
  }

  private getAuthorizationData(): Partial<User> {
    return {
      email: this.authorizationForm.get('email')?.value,
      password: this.authorizationForm.get('password')?.value,
    }
  }
}
