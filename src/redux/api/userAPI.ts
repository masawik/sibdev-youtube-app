import {TUserLoginData} from "../user/userTypes";
import {fakeServer} from "./fakeServer/fakeServer";

export enum EUserApiErrors {
  success = 0,
  userNotExist = 1,
  wrongPassword = 2,
}

export type TUserResponseSuccess<T> = {
  success: true,
  data: T
}

export type TUserResponseError = {
  success: false,
  message: string
}

export type TUserResponse<T> = TUserResponseSuccess<T> | TUserResponseError


type TUserAPI = {
  login: (loginData: TUserLoginData) => Promise<TUserResponse<string>>
}

export const userAPI: TUserAPI = {
  login: (loginData) => {
    return fakeServer.login(loginData)
  },

  // isTokenValid: (token: string) => {
  //   return fakeServer.isTokenValid(token)
  // }
}