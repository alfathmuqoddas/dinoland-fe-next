import type { TApiResponse } from "../api";

export type TAuth = {
  accessToken: string;
  refreshToken: string;
};

export type TAuthResponse = TApiResponse<TAuth>;
