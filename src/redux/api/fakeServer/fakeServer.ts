import {TUserLoginData} from "../../user/userTypes";
import users_JSON from './users.json'
import {utils} from "./utils";
import {lsDB} from "./localStorageAsDB";
const users_DB: {[index: string]: string} = users_JSON

export enum EUserApiErrors {
  success = 0,
  userNotExist = 1,
  wrongPassword = 2,
}

export type TResponseSuccess<T> = {
  success: true,
  data: T
}

export type TResponseError = {
  success: false,
  message: string
}

type TResponse<T> = TResponseSuccess<T> | TResponseError

function createResponse<T>(data: T): TResponseSuccess<T> {
  return {success: true, data}
}

function createError(code: EUserApiErrors, message: string): TResponseError {
  return{success: false, message}
}


export const fakeServer = {
  login: ({login, password}: TUserLoginData): Promise<TResponse<string>>  =>
    new Promise((resolve) => {
      if (!users_DB[login]) return resolve(createError(EUserApiErrors.userNotExist, 'user not exist'))
      if (users_DB[login] !== password) return resolve(createError(EUserApiErrors.wrongPassword, 'wrong password'))
      const token = utils.randString()
      lsDB.addUserToken(login, token)
      resolve(createResponse<string>(token))
    })
}