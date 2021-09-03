import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { RegistrationUser } from "src/app/infrastructure/store/user-state/user.actions";
import { RegistrationData } from "src/app/infrastructure/types/types";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly store: Store,
  ) { }

  public registration(): void {
    this.store.dispatch(new RegistrationUser(this.getRegistrationData()));
  }

  private getRegistrationData(): RegistrationData {
    return {
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
    }
  }
}
