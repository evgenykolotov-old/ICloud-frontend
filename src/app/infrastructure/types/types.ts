export type ResponseStatus = 'success' | 'error';
export type FileType = 'dir';

export interface User {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
}

export interface File {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: User | string;
  parent?: File | string;
  children: string[];
}

export interface CreateFileRequest {
  name: string;
  type: FileType;
  parent: string;
}

export interface ResponseData {
  status: ResponseStatus;
  message?: string;
  token?: string;
  payload?: User;
  files?: File[];
  file?: File;
}

export interface AuthorizationResponseData {
  token: string;
  user: User;
}