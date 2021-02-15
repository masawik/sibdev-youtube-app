import {TUserLoginData} from "../user/userTypes";
import {fakeServer} from "./fakeServer/fakeServer";

export enum EUserApiErrors {
  success = 0,
  userNotExist = 1,
  wrongPassword = 2,
  tokenInvalid = 3
}

export type TUserResponseSuccess<T> = {
  success: true,
  data: T
}

export type TUserResponseError = {
  success: false,
  message: string
}

export type TResponse<T> = TUserResponseSuccess<T> | TUserResponseError


type TUserAPI = {
  login: (loginData: TUserLoginData) => Promise<TResponse<string>>
}

export const userAPI: TUserAPI = {
  login: (loginData) => {
    return fakeServer.login(loginData)
  },
}