import {ThunkAction} from "redux-thunk";
import {TRootState} from "../rootReducer";
import {TSharedActions} from "../shared/sharedTypes";

export const USER_FETCHING_START = 'USER_FETCHING_START'
export const USER_FETCHING_FINISH = 'USER_FETCHING_FINISH'
export const USER_SET_TOKEN = 'USER_SET_TOKEN'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'

export type TUserFetchingStart = { type: typeof USER_FETCHING_START }
export type TUserFetchingFinish = { type: typeof USER_FETCHING_FINISH }
export type TUserSetToken = { type: typeof USER_SET_TOKEN, payload: { token: string } }
export type TUserLoginError = { type: typeof USER_LOGIN_ERROR, errorMessage: string }
export type TUserClearErrorMessage = { type: typeof CLEAR_ERROR_MESSAGE }


export type TUserLoginData = { login: string, password: string }

export type TUserActions =
  TUserFetchingStart
  | TUserFetchingFinish
  | TUserLoginError
  | TUserClearErrorMessage
  | TUserSetToken
  | TSharedActions

export type TUserThunk = ThunkAction<void, TRootState, unknown, TUserActions>