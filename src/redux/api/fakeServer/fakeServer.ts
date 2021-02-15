import {TUserLoginData} from "../../user/userTypes";
import users_JSON from './users.json'
import {utils} from "../utils";
import {lsDB} from "./localStorageAsDB";
import {EUserApiErrors, TResponse, TUserResponseError, TUserResponseSuccess} from "../userAPI";
import {IFavouritesItem, IFavouritesItemToServer} from "../../favourites/favouritesTypes";

const users_DB: { [index: string]: string } = users_JSON

function createResponse<T>(data: T): TUserResponseSuccess<T> {
  return {success: true, data}
}

function createError(code: EUserApiErrors, message: string): TUserResponseError {
  return {success: false, message}
}

const lag = utils.randInt(0,0)

type TFakeServer = {
  login: (data: TUserLoginData) => Promise<TResponse<string>>,
  getLoginByToken: (token: string) => Promise<TResponse<string>>,
  getFavouritesList: (token: string) => Promise<TResponse<IFavouritesItem[]>>,
  favouritesListAddRecord: (token: string, record: IFavouritesItemToServer) => Promise<TResponse<{id: string}>>,
  favouritesListDeleteRecord: (token: string, id: string) => Promise<TResponse<'ok'>>,
  favouritesListEditRecord: (token: string, record: IFavouritesItem) => Promise<TResponse<'ok'>>,
}

export const fakeServer: TFakeServer = {
  login: ({login, password}) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (!users_DB[login]) return resolve(createError(EUserApiErrors.userNotExist, 'user not exist'))
        if (users_DB[login] !== password) return resolve(createError(EUserApiErrors.wrongPassword, 'wrong password'))
        const token = utils.randString()
        lsDB.addUserToken(login, token)
        resolve(createResponse(token))
      }, lag)
    }),

  getLoginByToken: (token) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const login = lsDB.getLoginByToken(token)
        if (!login) return resolve(createError(EUserApiErrors.tokenInvalid, 'token is invalid'))
        return resolve(createResponse(login))
      }, lag)
    }),

  getFavouritesList: (token) =>
    new Promise((resolve) => {
      const login = lsDB.getLoginByToken(token)
      if (!login) return resolve(createError(EUserApiErrors.tokenInvalid, 'token is invalid'))
      return resolve(createResponse(lsDB.getFavouritesList(login)))
    }),

  favouritesListAddRecord: (token, record) =>
    new Promise((resolve) => {
      const login = lsDB.getLoginByToken(token)
      if (!login) return resolve(createError(EUserApiErrors.tokenInvalid, 'token is invalid'))
      const newRecordId = utils.randString()
      const recordToDb: IFavouritesItem = {...record, id: newRecordId}
      lsDB.favouritesListAddRecord(login, recordToDb)
      return resolve(createResponse({id: newRecordId}))
    }),

  favouritesListDeleteRecord: (token, id) =>
    new Promise((resolve) => {
      const login = lsDB.getLoginByToken(token)
      if (!login) return resolve(createError(EUserApiErrors.tokenInvalid, 'token is invalid'))
      lsDB.favouritesListDeleteRecord(login, id)
      return resolve(createResponse('ok'))
    }),

  favouritesListEditRecord: (token, record) =>
    new Promise((resolve) => {
      const login = lsDB.getLoginByToken(token)
      if (!login) return resolve(createError(EUserApiErrors.tokenInvalid, 'token is invalid'))
      lsDB.favouritesListEditRecord(login, record)
      return resolve(createResponse('ok'))
    })
}