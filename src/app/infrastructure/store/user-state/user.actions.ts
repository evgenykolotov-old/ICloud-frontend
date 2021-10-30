import { AuthorizationResponseData, User } from "../../types/types";

export class RegistrationUser {
  public static readonly type = '[User State] Registration'
  constructor(public readonly payload: Partial<User>) { }
}

export class LoginUser {
  public static readonly type = '[User State] Login'
  constructor(public readonly payload: Partial<User>) { }
}

export class LoginUserSuccess {
  public static readonly type = '[User State] Login Success';
  constructor(public readonly payload: AuthorizationResponseData) { }
}

export class LoginUserFail {
  public static readonly type = '[User State] Login Fail';
  constructor(public readonly errorMessage: string) { }
}

export class LogoutnUser {
  public static readonly type = '[User State] Logout';
}

export class AuthorizationUser {
  public static readonly type = '[User State] Authorization';
}