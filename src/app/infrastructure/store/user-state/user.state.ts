import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { asapScheduler, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from "../../services/user.service";
import { ResponseData, User } from "../../types/types";
import {AuthorizationUser, LoginUser, LoginUserFail, LoginUserSuccess, LogoutnUser, RegistrationUser } from "./user.actions";

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
    private readonly router: Router,
    private readonly zone: NgZone,
    private readonly userService: UserService,
  ) { }

  @Selector()
  public static isAuth(state: UserStateModel) {
    return state.isAuth;
  }

  @Selector()
  public static token(state: UserStateModel) {
    return state.token;
  }

  @Selector()
  public static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Action(RegistrationUser)
  public registrationUser(
    _: StateContext<UserStateModel>,
    { payload }: RegistrationUser,
  ) {
    return this.userService.registration(payload);
  }

  @Action(LoginUser)
  public loginnUser(
    { dispatch }: StateContext<UserStateModel>,
    { payload }: LoginUser,
  ) {
    return this.userService.login(payload).pipe(
      tap(
        (response: ResponseData) => response.status === 'success'
        ? asapScheduler.schedule(() => 
          dispatch(new LoginUserSuccess({user: response.payload as User, token: response.token as string })))
        : throwError(response.message),
      ),
      catchError((errorMessage: string) => dispatch(new LoginUserFail(errorMessage))),
    )
  }

  @Action(LoginUserSuccess)
  public loginUserSuccess(
    { setState }: StateContext<UserStateModel>,
    { payload: { user, token } }: LoginUserSuccess,
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

    return this.zone.run(() => void this.router.navigate(['/', 'login']));
  }

  @Action(AuthorizationUser)
  public authorizationUser(
    { dispatch }: StateContext<UserStateModel>
  ) {
    const token = window.localStorage.getItem('token');
    if (token) {
      return this.userService.authorization(token).pipe(
        tap(
          (response: ResponseData) => response.status === 'success'
          ? asapScheduler.schedule(() => 
            dispatch(new LoginUserSuccess({user: response.payload as User, token: response.token as string })))
          : throwError(response.message),
        ),
        catchError((errorMessage: string) => dispatch(new LoginUserFail(errorMessage))),
      );
    }
    return this.zone.run(() => void this.router.navigate(['/', 'login']));
  }
}
