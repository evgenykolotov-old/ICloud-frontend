import { AuthorizationResponseData, User } from "../../types/types";

export class RegistrationUser {
  public static readonly type = '[User State] Registration'
  constructor(public readonly payload: Partial<User>) { }
}

export class AuthorizationUser {
  public static readonly type = '[User State] Authorization'
  constructor(public readonly payload: Partial<User>) { }
}

export class AuthorizationUserSuccess {
  public static readonly type = '[User State] Authorization Success';
  constructor(public readonly payload: AuthorizationResponseData) { }
}

export class AuthorizationUserFail {
  public static readonly type = '[User State] Authorization Fail';
  constructor(public readonly errorMessage: string) { }
}

export class LogoutnUser {
  public static readonly type = '[User State] Logout';
}