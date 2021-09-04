import {AuthorizationData, RegistrationData } from "../../types/types";

export class RegistrationUser {
  public static readonly type = '[User State] Registration'
  constructor(public readonly payload: RegistrationData) { }
}

export class AuthorizationUser {
  public static readonly type = '[User State] Authorization'
  constructor(public readonly payload: AuthorizationData) { }
}
