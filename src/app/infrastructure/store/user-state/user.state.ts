import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { UserService } from "../../services/user.service";
import {AuthorizationUser, RegistrationUser } from "./user.actions";

export interface UserStateModel {
  currentUser: any;
  isAuth: boolean;
}
export const userInitialState: UserStateModel = {
  currentUser: {},
  isAuth: false,
}

@State<UserStateModel>({
  name: 'userState',
  defaults: userInitialState
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
  ) { }

  @Action(RegistrationUser)
  public registrationUser(
    context: StateContext<UserStateModel>,
    { payload }: RegistrationUser,
  ) {
    return this.userService.registration(payload);
  }

  @Action(AuthorizationUser)
  public authorizationUser(
    context: StateContext<UserStateModel>,
    { payload }: AuthorizationUser,
  ) {
    return this.userService.authorization(payload);
  }
}
