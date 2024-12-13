export type AuthInstance = {
  isAuth: boolean;
  accessToken: string;
  userLogin: string;
};

export type AuthPostParams = { login: string; password: string };
