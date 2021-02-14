import {ThunkAction} from "redux-thunk";
import {TRootState} from "../rootReducer";

export const USER_LOGIN_START = 'USER_LOGIN_START'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'

export type TUserLoginStart = {type: typeof USER_LOGIN_START}
export type TUserLoginSuccess = {type: typeof USER_LOGIN_SUCCESS, payload: {token: string}}
export type TUserLoginError = {type: typeof USER_LOGIN_ERROR, errorMessage: string}
export type TUserLoginData = {login: string, password: string}
export type TUserClearErrorMessage = {type: typeof CLEAR_ERROR_MESSAGE}

export type TUserActions = TUserLoginStart | TUserLoginSuccess | TUserLoginError | TUserClearErrorMessage

export type TUserThunk = ThunkAction<void, TRootState, unknown, TUserActions>