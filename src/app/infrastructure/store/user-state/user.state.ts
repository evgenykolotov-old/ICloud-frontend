import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

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
export class UserState {}
