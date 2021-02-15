import {TUserLoginData} from "../../user/userTypes";
import users_JSON from './users.json'
import {utils} from "./utils";
import {lsDB} from "./localStorageAsDB";
import {EUserApiErrors, TUserResponse, TUserResponseError, TUserResponseSuccess} from "../userAPI";

const users_DB: { [index: string]: string } = users_JSON

function createResponse<T>(data: T): TUserResponseSuccess<T> {
  return {success: true, data}
}

function createError(code: EUserApiErrors, message: string): TUserResponseError {
  return {success: false, message}
}

const lag = utils.randInt(0,0)

export const fakeServer = {
  login: ({login, password}: TUserLoginData): Promise<TUserResponse<string>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (!users_DB[login]) return resolve(createError(EUserApiErrors.userNotExist, 'user not exist'))
        if (users_DB[login] !== password) return resolve(createError(EUserApiErrors.wrongPassword, 'wrong password'))
        const token = utils.randString()
        lsDB.addUserToken(login, token)
        resolve(createResponse(token))
      }, lag)
    }),

  isTokenValid: (token: string): Promise<TUserResponse<boolean>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const login = lsDB.getLoginByToken(token)
        return resolve(createResponse(Boolean(login)))
      }, lag)
    })
}