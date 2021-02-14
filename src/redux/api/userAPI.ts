import {TUserLoginData} from "../user/userTypes";
import {fakeServer} from "./fakeServer/fakeServer";




export const userAPI = {
  login: (loginData: TUserLoginData) => {
    return fakeServer.login(loginData)
  },

  isTokenValid: (token: string) => {
    return fakeServer.isTokenValid(token)
  }
}