export type ResponseStatus = 'success' | 'error';

export interface User {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
}

export interface ResponseData {
  status: ResponseStatus;
  message?: string;
  token?: string;
  payload?: User;
}

export interface AuthorizationResponseData {
  token: string;
  user: User;
}