import { ESlugError } from "../enums/auth.enum";

export interface LoginParams {
  username: string;
  password: string;
}
export interface SignUpParams {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface ILoginResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  session_id: string;
  user: IUserLogin;
}

export interface IUserLogin {
  created_at: string;
  email: string;
  name: string;
  password_changed_at: string;
  username: string;
}
export interface IResponseDataError {
  slug: ESlugError;
  HttpStatus: number;
}
export interface IResponseError {
  status: number;
  data: IResponseDataError;
}
