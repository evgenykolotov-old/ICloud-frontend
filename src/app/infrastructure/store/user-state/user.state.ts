import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { asapScheduler, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from "../../services/user.service";
import { ResponseData, User } from "../../types/types";
import {AuthorizationUser, AuthorizationUserFail, AuthorizationUserSuccess, LogoutnUser, RegistrationUser } from "./user.actions";

export interface UserStateModel {
  currentUser: User | null;
  token: string | null;
  isAuth: boolean;
}
export const userInitialState: UserStateModel = {
  currentUser: null,
  token: null,
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

  @Selector()
  public static isAuth(state: UserStateModel) {
    return state.isAuth;
  }

  @Action(RegistrationUser)
  public registrationUser(
    _: StateContext<UserStateModel>,
    { payload }: RegistrationUser,
  ) {
    return this.userService.registration(payload);
  }

  @Action(AuthorizationUser)
  public authorizationUser(
    { dispatch }: StateContext<UserStateModel>,
    { payload }: AuthorizationUser,
  ) {
    return this.userService.authorization(payload).pipe(
      tap(
        (response: ResponseData) => response.status === 'success'
        ? asapScheduler.schedule(() => 
          dispatch(new AuthorizationUserSuccess({user: response.payload as User, token: response.token as string })))
        : throwError(response.message),
      ),
      catchError((errorMessage: string) => dispatch(asapScheduler.schedule(() => new AuthorizationUserFail(errorMessage))))
    )
  }

  @Action(AuthorizationUserSuccess)
  public authorizationUserSuccess(
    { setState }: StateContext<UserStateModel>,
    { payload: { user, token } }: AuthorizationUserSuccess,
  ) {
    setState(patch<UserStateModel>({ currentUser: user, token, isAuth: true }));
    window.localStorage.setItem('token', token);
  }

  @Action(LogoutnUser)
  public logoutUser(
    { setState }: StateContext<UserStateModel>,
  ) {
    setState(patch<UserStateModel>({ currentUser: null, token: null, isAuth: false }));
    window.localStorage.removeItem('token');
  }
}
