export type TAuth = {
  accessToken: string;
  refreshToken: string;
};
export type TAuthResponse = {
  status: string;
  message: string;
  data: TAuth;
};
